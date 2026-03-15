/**
 * Electron main: window + IPC for filesystem USB scan and PIN/key decryption.
 * Renderer stays sandboxed; only whitelisted IPC for /auth/ bundle paths.
 */
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const argon2 = require("argon2");

// @noble/ed25519 (signAsync) expects globalThis.crypto.subtle (Web Crypto). Main process
// only has node:crypto by default — install the webcrypto object.
const { webcrypto } = require("node:crypto");
if (!globalThis.crypto?.subtle) {
  globalThis.crypto = webcrypto;
}

const ARGON_MEMORY_KIB = 65536;
const ARGON_TIME = 3;
const ARGON_PARALLELISM = 1;

function bundleComplete(authDir) {
  const need = ["key.enc", "token.bin", "salt.bin", "meta.json"];
  return need.every((n) => fs.existsSync(path.join(authDir, n)));
}

function pushBundle(found, mountPoint, authDir) {
  found.push({ mountPoint, authDir });
}

function listAuthBundles() {
  const roots = ["/media", "/run/media", "/mnt"];
  const found = [];
  const seen = new Set();
  for (const root of roots) {
    try {
      if (!fs.existsSync(root)) continue;
      const level1 = fs.readdirSync(root, { withFileTypes: true });
      for (const d1 of level1) {
        const p1 = path.join(root, d1.name);
        if (!d1.isDirectory()) continue;
        const authSingle = path.join(p1, "auth");
        if (bundleComplete(authSingle) && !seen.has(authSingle)) {
          seen.add(authSingle);
          pushBundle(found, p1, authSingle);
        }
        try {
          const level2 = fs.readdirSync(p1, { withFileTypes: true });
          for (const d2 of level2) {
            const mount = path.join(p1, d2.name);
            if (!d2.isDirectory()) continue;
            const authDir = path.join(mount, "auth");
            if (bundleComplete(authDir) && !seen.has(authDir)) {
              seen.add(authDir);
              pushBundle(found, mount, authDir);
            }
          }
        } catch {
          /* unreadable subdir */
        }
      }
    } catch {
      /* unreadable root */
    }
  }
  return found;
}

function readBundleFiles(authDir) {
  const tokenPath = path.join(authDir, "token.bin");
  const saltPath = path.join(authDir, "salt.bin");
  const metaPath = path.join(authDir, "meta.json");
  const keyEncPath = path.join(authDir, "key.enc");
  return {
    tokenB64: fs.readFileSync(tokenPath).toString("base64"),
    saltB64: fs.readFileSync(saltPath).toString("base64"),
    keyEncB64: fs.readFileSync(keyEncPath).toString("base64"),
    metaJson: fs.readFileSync(metaPath, "utf8"),
  };
}

/**
 * key.enc layout (must match enrollment tooling): 12-byte nonce || AES-256-GCM ciphertext
 * (ciphertext includes 16-byte auth tag at end), same as Python cryptography.hazmat AESGCM.
 */
function decryptEd25519Seed(pin, saltBuf, keyEncBuf) {
  return argon2.hash(pin, {
    type: argon2.argon2id,
    salt: saltBuf,
    raw: true,
    hashLength: 32,
    memoryCost: ARGON_MEMORY_KIB,
    timeCost: ARGON_TIME,
    parallelism: ARGON_PARALLELISM,
  }).then((aesKey) => {
    if (keyEncBuf.length < 12 + 16 + 1) {
      throw new Error("key.enc too short");
    }
    const iv = keyEncBuf.subarray(0, 12);
    const rest = keyEncBuf.subarray(12);
    const tag = rest.subarray(rest.length - 16);
    const enc = rest.subarray(0, rest.length - 16);
    const decipher = crypto.createDecipheriv("aes-256-gcm", aesKey, iv);
    decipher.setAuthTag(tag);
    const plain = Buffer.concat([decipher.update(enc), decipher.final()]);
    if (plain.length !== 32) {
      throw new Error("decrypted key must be 32-byte Ed25519 seed");
    }
    return plain;
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 960,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });
  // loadFile("file://…") breaks Set-Cookie for /api (session); use same origin as API.
  const url =
    process.env.DASHBOARD_URL || "http://127.0.0.1:8000/operator/index.html";
  win
    .loadURL(url)
    .catch((err) => {
      console.error(
        "Load failed (start backend: uvicorn …, then retry):",
        err?.message || err,
      );
    });
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("usb:list-bundles", () => listAuthBundles());

ipcMain.handle("usb:read-bundle", (_e, authDir) => readBundleFiles(authDir));

ipcMain.handle("usb:decrypt-seed", async (_e, { pin, saltB64, keyEncB64 }) => {
  try {
    const saltBuf = Buffer.from(saltB64, "base64");
    const keyEncBuf = Buffer.from(keyEncB64, "base64");
    const seed = await decryptEd25519Seed(pin, saltBuf, keyEncBuf);
    return { ok: true, seedB64: seed.toString("base64") };
  } catch (err) {
    return { ok: false, error: err.message || String(err) };
  }
});

ipcMain.handle("usb:sign-challenge", async (_e, { seedB64, challengeHex }) => {
  const seed = Buffer.from(seedB64, "base64");
  if (seed.length !== 32) {
    throw new Error("invalid seed length");
  }
  const msg = Buffer.from(challengeHex, "hex");
  const ed = await import("@noble/ed25519");
  const sig = await ed.signAsync(new Uint8Array(msg), new Uint8Array(seed));
  return Buffer.from(sig).toString("hex");
});

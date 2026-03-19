/**
 * Login step 1 + USB 2FA step 2 against FastAPI session cookies.
 * Requires window.usbAuth from preload (Electron only).
 */

const $ = (id) => document.getElementById(id);

function apiBase() {
  return $("apiBase").value.replace(/\/$/, "");
}

async function fetchApi(path, options = {}) {
  const url = `${apiBase()}${path}`;
  const headers = { "Content-Type": "application/json", ...options.headers };
  return fetch(url, {
    credentials: "include",
    ...options,
    headers,
  });
}

function setView(view) {
  $("step-password").classList.toggle("hidden", view !== "password");
  $("step-usb").classList.toggle("hidden", view !== "usb");
  $("step-done").classList.toggle("hidden", view !== "done");
}

function showError(node, text) {
  node.textContent = text;
  node.hidden = false;
}

function clearError(node) {
  node.hidden = true;
  node.textContent = "";
}

/** SHA-256 → 64-char lowercase hex (matches backend token_hash). */
async function sha256HexFromBase64(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

let usbPollTimer = null;
let selectedAuthDir = null;

async function refreshMe() {
  const r = await fetchApi("/api/auth/me");
  if (!r.ok) return null;
  return r.json();
}

function stopUsbPoll() {
  if (usbPollTimer) {
    clearInterval(usbPollTimer);
    usbPollTimer = null;
  }
}

async function scanOnce(expectedUserId) {
  if (!window.usbAuth) return false;
  const bundles = await window.usbAuth.listBundles();
  for (const b of bundles) {
    const files = await window.usbAuth.readBundle(b.authDir);
    let meta;
    try {
      meta = JSON.parse(files.metaJson);
    } catch {
      continue;
    }
    if (meta.user_id == null) continue;
    const mid = Number(meta.user_id);
    if (mid === Number(expectedUserId)) {
      selectedAuthDir = b.authDir;
      stopUsbPoll();
      $("usbStatus").textContent = `USB bundle matched (user_id ${mid}).`;
      $("usbActions").classList.remove("hidden");
      return true;
    }
  }
  return false;
}

async function startUsbPolling(expectedUserId) {
  $("usbStatus").textContent =
    "Scanning mounts for /auth/ (key.enc, token.bin, salt.bin, meta.json)…";
  $("usbActions").classList.add("hidden");
  clearError($("usbError"));

  stopUsbPoll();
  const tick = async () => {
    try {
      const ok = await scanOnce(expectedUserId);
      if (!ok && $("usbStatus").textContent.startsWith("Scanning")) {
        $("usbStatus").textContent =
          "Still scanning… insert USB or check mount path (/media, /run/media).";
      }
    } catch (e) {
      showError($("usbError"), e.message || String(e));
    }
  };
  await tick();
  usbPollTimer = setInterval(tick, 1500);
}

async function completeUsbLogin() {
  clearError($("usbError"));
  const pin = $("pin").value;
  if (!pin || !selectedAuthDir) {
    showError($("usbError"), "PIN required and USB bundle must be detected.");
    return;
  }

  $("btnUsbContinue").disabled = true;
  $("usbStatus").textContent = "Decrypting key / contacting server…";

  try {
    const files = await window.usbAuth.readBundle(selectedAuthDir);
    const dec = await window.usbAuth.decryptSeed({
      pin,
      saltB64: files.saltB64,
      keyEncB64: files.keyEncB64,
    });
    if (!dec.ok) {
      throw new Error(dec.error || "Wrong PIN or corrupted key.enc");
    }

    const token_hash_hex = await sha256HexFromBase64(files.tokenB64);

    let r = await fetchApi("/api/auth/usb/verify-token", {
      method: "POST",
      body: JSON.stringify({ token_hash_hex }),
    });
    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      throw new Error(
        typeof err.detail === "string"
          ? err.detail
          : JSON.stringify(err.detail || err) || r.statusText,
      );
    }
    const vt = await r.json();
    const challenge_hex = vt.challenge_hex;

    const signature_hex = await window.usbAuth.signChallenge({
      seedB64: dec.seedB64,
      challengeHex: challenge_hex,
    });

    r = await fetchApi("/api/auth/usb/verify-signature", {
      method: "POST",
      body: JSON.stringify({ signature_hex }),
    });
    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      throw new Error(
        typeof err.detail === "string"
          ? err.detail
          : JSON.stringify(err.detail || err) || r.statusText,
      );
    }

    $("pin").value = "";
    stopUsbPoll();
    showDoneView();
  } catch (e) {
    showError($("usbError"), e.message || String(e));
    $("usbStatus").textContent = "Try again.";
  } finally {
    $("btnUsbContinue").disabled = false;
  }
}

async function showDoneView() {
  setView("done");
  const m = await refreshMe();
  if (m) {
    $("doneMsg").textContent = `Authenticated as ${m.username} (auth_state=${m.auth_state}).`;
  }
}

$("btnLogin").addEventListener("click", async () => {
  clearError($("pwError"));
  const username = $("username").value.trim();
  const password = $("password").value;
  if (!username || !password) {
    showError($("pwError"), "Enter username and password.");
    return;
  }

  $("btnLogin").disabled = true;
  try {
    const r = await fetchApi("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const data = await r.json();
    if (!r.ok) {
      showError($("pwError"), data.detail || "Login failed");
      return;
    }

    if (data.requires_usb_2fa) {
      setView("usb");
      const me = await refreshMe();
      if (!me || me.auth_state !== "pending_usb_2fa") {
        showError($("usbError"), "Expected pending USB 2FA session.");
        return;
      }
      await startUsbPolling(me.user_id);
    } else {
      await showDoneView();
    }
  } catch (e) {
    showError($("pwError"), e.message || String(e));
  } finally {
    $("btnLogin").disabled = false;
  }
});

$("btnUsbContinue").addEventListener("click", () => completeUsbLogin());

$("btnCancelUsb").addEventListener("click", async () => {
  stopUsbPoll();
  await fetchApi("/api/auth/logout", { method: "POST", body: "{}" });
  selectedAuthDir = null;
  $("pin").value = "";
  setView("password");
  clearError($("usbError"));
});

$("btnLogout").addEventListener("click", async () => {
  await fetchApi("/api/auth/logout", { method: "POST", body: "{}" });
  setView("password");
});

if (!window.usbAuth) {
  document.body.insertAdjacentHTML(
    "afterbegin",
    '<p style="color:#f85149;padding:1rem">Open this app with Electron (<code>npm start</code> in <code>dashboard/</code>). USB APIs are unavailable in a plain browser.</p>',
  );
}

# Dashboard (Electron) — login & USB 2FA

Runs the operator **password → USB second factor** flow against the FastAPI backend (`credentials: 'include'` session cookies).

## Requirements

- Node.js 18+
- Linux paths for USB auto-discovery: `/media`, `/run/media`, `/mnt` (see `electron-main.js`)

## Install & run

```bash
cd dashboard
npm install
npm start
```

**Linux / Chromium sandbox:** The default `npm start` runs with **`--no-sandbox`** so it works on distros where the setuid `chrome-sandbox` helper is not installed (common on WSL, some Ubuntu/Debian setups). For a stricter dev setup, install the helper and use **`npm run start:sandbox`** instead:

```bash
sudo chown root:root node_modules/electron/dist/chrome-sandbox
sudo chmod 4755 node_modules/electron/dist/chrome-sandbox
npm run start:sandbox
```

Do **not** run Electron with **`sudo`**; it is blocked on purpose. If you must pass flags by hand: `npm start -- --no-sandbox` (the `--` forwards to `electron`).

Set **API base URL** in the UI (default `http://127.0.0.1:8000`). Backend must allow CORS with credentials from Electron (already enabled in `backend/main.py`).

## Flow

1. **POST /api/auth/login** — if `requires_usb_2fa`, the app scans for `/auth/` on mounted volumes and matches `meta.json` `user_id` to `/api/auth/me`.
2. **PIN** — Argon2id + AES-256-GCM decrypt `key.enc` in the main process (`argon2` memory 64 MiB, time 3, parallelism 1 — same as project notes).
3. **SHA-256** `token.bin` → `token_hash_hex` → **POST /api/auth/usb/verify-token**
4. **Ed25519** sign `challenge_hex` (message = 32-byte raw challenge) → **POST /api/auth/usb/verify-signature**

## Contract

Machine-readable summary: **`docs/usb-auth-contract.json`**.

Enrollment tooling must write **`key.enc`** in the same layout as `electron-main.js` (12-byte IV + AES-GCM body with tag) or decryption will fail.

## Full dashboard UI

This package is the **auth shell**. Map, alerts, and WebSocket wiring can be added later as separate routes in the same Electron app.

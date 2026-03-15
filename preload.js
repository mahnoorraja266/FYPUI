const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("usbAuth", {
  listBundles: () => ipcRenderer.invoke("usb:list-bundles"),
  readBundle: (authDir) => ipcRenderer.invoke("usb:read-bundle", authDir),
  decryptSeed: (payload) => ipcRenderer.invoke("usb:decrypt-seed", payload),
  signChallenge: (payload) => ipcRenderer.invoke("usb:sign-challenge", payload),
});

// Polyfill for legacy libs expecting Node-like process in browser.
if (!globalThis.process) {
  globalThis.process = { env: {} };
} else if (!globalThis.process.env) {
  globalThis.process.env = {};
}

if (!globalThis.process.env.NODE_ENV) {
  globalThis.process.env.NODE_ENV = import.meta.env.MODE;
}

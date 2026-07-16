// ===============================
// src/storage/key-value-store.web.ts
// ===============================

import type { KeyValueStore } from "./key-value-store";

/** Weblagring med nettleserens localStorage. */
export const keyValueStore: KeyValueStore = {
  async getItem(key) {
    return globalThis.localStorage?.getItem(key) ?? null;
  },
  async setItem(key, value) {
    globalThis.localStorage?.setItem(key, value);
  },
  async removeItem(key) {
    globalThis.localStorage?.removeItem(key);
  },
};

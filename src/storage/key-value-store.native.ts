// ===============================
// src/storage/key-value-store.native.ts
// ===============================

import Storage from "expo-sqlite/kv-store";

import type { KeyValueStore } from "./key-value-store";

/** Native lagring med SQLite via Expo. */
export const keyValueStore: KeyValueStore = {
  async getItem(key) {
    return Storage.getItem(key);
  },
  async setItem(key, value) {
    await Storage.setItem(key, value);
  },
  async removeItem(key) {
    await Storage.removeItem(key);
  },
};

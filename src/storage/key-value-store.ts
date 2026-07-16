// ===============================
// src/storage/key-value-store.ts
// ===============================

/**
 * Felles lagringsgrensesnitt for web og native plattformer.
 */
export type KeyValueStore = {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
};

export { keyValueStore } from "./key-value-store.native";

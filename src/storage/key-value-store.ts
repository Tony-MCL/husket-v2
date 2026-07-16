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

const memoryFallback = new Map<string, string>();

/**
 * Generisk fallback brukt av TypeScript og miljøer uten plattformfil.
 * Metro velger .native.ts eller .web.ts når appen kjøres.
 */
export const keyValueStore: KeyValueStore = {
  async getItem(key) {
    return memoryFallback.get(key) ?? null;
  },
  async setItem(key, value) {
    memoryFallback.set(key, value);
  },
  async removeItem(key) {
    memoryFallback.delete(key);
  },
};

// ===============================
// src/storage/json-collection-repository.ts
// ===============================

import { keyValueStore } from "./key-value-store";

export type EntityWithId = {
  id: string;
};

/**
 * Enkel lokal samlingslagring for typedata som Album og Memory.
 */
export class JsonCollectionRepository<T extends EntityWithId> {
  constructor(private readonly storageKey: string) {}

  async getAll(): Promise<T[]> {
    const rawValue = await keyValueStore.getItem(this.storageKey);

    if (!rawValue) {
      return [];
    }

    try {
      const parsedValue: unknown = JSON.parse(rawValue);
      return Array.isArray(parsedValue) ? (parsedValue as T[]) : [];
    } catch {
      return [];
    }
  }

  async getById(id: string): Promise<T | null> {
    const entities = await this.getAll();
    return entities.find((entity) => entity.id === id) ?? null;
  }

  async save(entity: T): Promise<void> {
    const entities = await this.getAll();
    const existingIndex = entities.findIndex((item) => item.id === entity.id);

    if (existingIndex >= 0) {
      entities[existingIndex] = entity;
    } else {
      entities.push(entity);
    }

    await keyValueStore.setItem(this.storageKey, JSON.stringify(entities));
  }

  async delete(id: string): Promise<void> {
    const entities = await this.getAll();
    const remainingEntities = entities.filter((entity) => entity.id !== id);
    await keyValueStore.setItem(
      this.storageKey,
      JSON.stringify(remainingEntities),
    );
  }

  async clear(): Promise<void> {
    await keyValueStore.removeItem(this.storageKey);
  }
}

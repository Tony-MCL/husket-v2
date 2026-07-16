// ===============================
// src/storage/memory-repository.ts
// ===============================

import type { Memory } from "../models";
import { JsonCollectionRepository } from "./json-collection-repository";

const STORAGE_KEY = "husket.memories.v1";

class MemoryRepository extends JsonCollectionRepository<Memory> {
  async getByAlbumId(albumId: string): Promise<Memory[]> {
    const memories = await this.getAll();

    return memories
      .filter((memory) => memory.albumId === albumId)
      .sort((first, second) => {
        const firstDate = first.capturedAt ?? first.createdAt;
        const secondDate = second.capturedAt ?? second.createdAt;
        return firstDate.localeCompare(secondDate);
      });
  }
}

/** Lokal lagring for minner. */
export const memoryRepository = new MemoryRepository(STORAGE_KEY);

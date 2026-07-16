// ===============================
// src/features/memories/services/memoryService.ts
// ===============================

import type {
  ImportedMemory,
  Memory,
  MemoryMedia,
  MemoryMood,
} from "../../../models";
import { memoryRepository } from "../../../storage";

export type CreateMemoryInput = {
  albumId: string;
  importedMemory: ImportedMemory;
  comment?: string;
  mood?: MemoryMood;
};

function createId(prefix: string): string {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Oppretter og lagrer et ferdig minne fra det normaliserte importformatet. */
export async function createMemory(input: CreateMemoryInput): Promise<Memory> {
  if (!input.albumId.trim()) {
    throw new Error("ALBUM_REQUIRED");
  }

  const now = new Date().toISOString();
  const imported = input.importedMemory;

  const media: MemoryMedia = {
    id: createId("media"),
    type: "image",
    localUri: imported.localUri,
    originalFileName: imported.originalFileName,
    mimeType: imported.mimeType,
    width: imported.width,
    height: imported.height,
    createdAt: now,
  };

  const comment = input.comment?.trim();

  const memory: Memory = {
    id: createId("memory"),
    albumId: input.albumId,
    media: [media],
    comment: comment || undefined,
    mood: input.mood,
    capturedAt: imported.capturedAt,
    location: imported.location,
    source: imported.source,
    createdAt: now,
    updatedAt: now,
  };

  await memoryRepository.save(memory);
  return memory;
}

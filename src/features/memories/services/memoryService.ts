// ===============================
// src/features/memories/services/memoryService.ts
// ===============================

import {
  MAX_MEMORY_MEDIA_ITEMS,
  type ImportedMemory,
  type Memory,
  type MemoryMedia,
  type MemoryMood,
} from "../../../models";
import { memoryRepository } from "../../../storage";

export type CreateMemoryInput = {
  albumId: string;
  /** Eksisterende ettbilde-flyt. Beholdes til opprettelsesskjermen er bygget om. */
  importedMemory?: ImportedMemory;
  /** Ny flerbilde-flyt. Ett minne kan inneholde mellom ett og tre bilder. */
  importedMemories?: ImportedMemory[];
  comment?: string;
  mood?: MemoryMood;
};

export type UpdateMemoryInput = {
  albumId: string;
  comment?: string;
  mood?: MemoryMood;
};

function createId(prefix: string): string {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function resolveImportedMemories(input: CreateMemoryInput): ImportedMemory[] {
  const hasSingleMemory = Boolean(input.importedMemory);
  const hasMultipleMemories = Boolean(input.importedMemories);

  if (hasSingleMemory && hasMultipleMemories) {
    throw new Error("AMBIGUOUS_MEDIA_INPUT");
  }

  const importedMemories = input.importedMemories
    ? [...input.importedMemories]
    : input.importedMemory
      ? [input.importedMemory]
      : [];

  if (importedMemories.length === 0) {
    throw new Error("MEDIA_REQUIRED");
  }

  if (importedMemories.length > MAX_MEMORY_MEDIA_ITEMS) {
    throw new Error("TOO_MANY_MEDIA_ITEMS");
  }

  return importedMemories;
}

function createMemoryMedia(importedMemory: ImportedMemory, createdAt: string): MemoryMedia {
  return {
    id: createId("media"),
    type: "image",
    localUri: importedMemory.localUri,
    originalFileName: importedMemory.originalFileName,
    mimeType: importedMemory.mimeType,
    width: importedMemory.width,
    height: importedMemory.height,
    createdAt,
  };
}

/** Oppretter og lagrer ett minne med mellom ett og tre bilder. */
export async function createMemory(input: CreateMemoryInput): Promise<Memory> {
  if (!input.albumId.trim()) {
    throw new Error("ALBUM_REQUIRED");
  }

  const importedMemories = resolveImportedMemories(input);
  const primaryImportedMemory = importedMemories[0];
  const now = new Date().toISOString();
  const comment = input.comment?.trim();

  const memory: Memory = {
    id: createId("memory"),
    albumId: input.albumId,
    media: importedMemories.map((importedMemory) =>
      createMemoryMedia(importedMemory, now),
    ),
    comment: comment || undefined,
    mood: input.mood,
    capturedAt: primaryImportedMemory.capturedAt,
    location: primaryImportedMemory.location,
    source: primaryImportedMemory.source,
    createdAt: now,
    updatedAt: now,
  };

  await memoryRepository.save(memory);
  return memory;
}

/** Henter ett minne fra lokal lagring. */
export async function getMemoryById(memoryId: string): Promise<Memory | null> {
  if (!memoryId) return null;
  return memoryRepository.getById(memoryId);
}

/** Oppdaterer kommentar, følelse eller album for et eksisterende minne. */
export async function updateMemory(
  memoryId: string,
  input: UpdateMemoryInput,
): Promise<Memory> {
  const existingMemory = await getMemoryById(memoryId);

  if (!existingMemory) {
    throw new Error("MEMORY_NOT_FOUND");
  }

  if (!input.albumId.trim()) {
    throw new Error("ALBUM_REQUIRED");
  }

  const comment = input.comment?.trim();
  const updatedMemory: Memory = {
    ...existingMemory,
    albumId: input.albumId,
    comment: comment || undefined,
    mood: input.mood,
    updatedAt: new Date().toISOString(),
  };

  await memoryRepository.save(updatedMemory);
  return updatedMemory;
}

/** Henter minnene i ett album i kronologisk rekkefølge. */
export async function getMemoriesByAlbumId(albumId: string): Promise<Memory[]> {
  if (!albumId) return [];

  const memories = await memoryRepository.getAll();
  return memories
    .filter((memory) => memory.albumId === albumId)
    .sort((a, b) => {
      const aDate = a.capturedAt ?? a.createdAt;
      const bDate = b.capturedAt ?? b.createdAt;
      return aDate.localeCompare(bDate);
    });
}

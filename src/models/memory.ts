// ===============================
// src/models/memory.ts
// ===============================

import type { MemoryLocation } from "./location";
import type { MemoryMedia } from "./media";
import type { MemoryMood } from "./mood";

/** Maksimalt antall bilder i ett minne i første albumversjon. */
export const MAX_MEMORY_MEDIA_ITEMS = 3;

/**
 * Et arkivert minne i brukerens album.
 *
 * Ett minne vises som én albumside og kan inneholde ett, to eller tre bilder.
 * Kommentar, følelse, dato og sted gjelder hele minnet, ikke hvert enkelt bilde.
 */
export type Memory = {
  id: string;
  albumId: string;
  media: MemoryMedia[];
  comment?: string;
  mood?: MemoryMood;
  capturedAt?: string;
  location?: MemoryLocation;
  source?: MemorySource;
  createdAt: string;
  updatedAt: string;
};

/**
 * Opprinnelig kilde for et minne. Feltet er intern metadata og skal ikke styre albumvisningen.
 */
export type MemorySource =
  | "camera"
  | "photo-library"
  | "shared-memory"
  | "system-share"
  | "file"
  | "scanner"
  | "backup"
  | "external";

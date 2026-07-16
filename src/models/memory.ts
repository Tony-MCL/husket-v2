// ===============================
// src/models/memory.ts
// ===============================

import type { MemoryLocation } from "./location";
import type { MemoryMedia } from "./media";
import type { MemoryMood } from "./mood";

/**
 * Et arkivert minne i brukerens album.
 * Kommentar og følelse tilhører minnet, mens albumet har sin egen overordnede tekst.
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

// ===============================
// src/models/media.ts
// ===============================

export type MemoryMediaType = "image";

/**
 * Mediefilen som inngår i et minne.
 * Modellen starter med bilder, men kan utvides med video og andre medietyper senere.
 */
export type MemoryMedia = {
  id: string;
  type: MemoryMediaType;
  localUri: string;
  originalFileName?: string;
  mimeType?: string;
  width?: number;
  height?: number;
  createdAt: string;
};

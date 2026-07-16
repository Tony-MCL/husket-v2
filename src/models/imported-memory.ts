// ===============================
// src/models/imported-memory.ts
// ===============================

import type { MemoryLocation } from "./location";
import type { MemorySource } from "./memory";

/**
 * Normalisert mellomformat brukt av alle importkilder før et minne arkiveres.
 */
export type ImportedMemory = {
  source: MemorySource;
  localUri: string;
  originalFileName?: string;
  mimeType?: string;
  capturedAt?: string;
  location?: MemoryLocation;
  width?: number;
  height?: number;
  sourceMetadata?: Record<string, unknown>;
};

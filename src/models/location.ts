// ===============================
// src/models/location.ts
// ===============================

/**
 * Valgfri geografisk informasjon knyttet til et minne.
 */
export type MemoryLocation = {
  latitude: number;
  longitude: number;
  placeName?: string;
};

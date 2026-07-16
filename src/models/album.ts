// ===============================
// src/models/album.ts
// ===============================

/**
 * Et album samler mange minner og kan ha egen tekst på albumnivå.
 */
export type Album = {
  id: string;
  title: string;
  description?: string;
  coverMediaId?: string;
  createdAt: string;
  updatedAt: string;
};

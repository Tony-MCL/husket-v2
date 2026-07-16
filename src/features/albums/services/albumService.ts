// ===============================
// src/features/albums/services/albumService.ts
// ===============================

import type { Album } from "../../../models";
import { albumRepository } from "../../../storage";

export type CreateAlbumInput = {
  title: string;
  description?: string;
};

function createId(): string {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  return `album-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Oppretter og lagrer et nytt album lokalt. */
export async function createAlbum(input: CreateAlbumInput): Promise<Album> {
  const title = input.title.trim();
  const description = input.description?.trim();

  if (!title) {
    throw new Error("ALBUM_TITLE_REQUIRED");
  }

  const now = new Date().toISOString();
  const album: Album = {
    id: createId(),
    title,
    description: description || undefined,
    createdAt: now,
    updatedAt: now,
  };

  await albumRepository.save(album);
  return album;
}

/** Henter alle album, nyeste først. */
export async function getAlbums(): Promise<Album[]> {
  const albums = await albumRepository.getAll();
  return [...albums].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Henter ett album eller null dersom det ikke finnes. */
export async function getAlbumById(albumId: string): Promise<Album | null> {
  if (!albumId) return null;
  return albumRepository.getById(albumId);
}

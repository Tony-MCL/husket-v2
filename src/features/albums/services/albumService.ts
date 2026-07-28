// ===============================
// src/features/albums/services/albumService.ts
// ===============================

import type { Album } from "../../../models";
import { albumRepository, memoryRepository } from "../../../storage";

export type CreateAlbumInput = {
  title: string;
  description?: string;
};

export type UpdateAlbumInput = {
  title: string;
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

/** Henter alle album i opprettelsesrekkefølge, eldste først. */
export async function getAlbums(): Promise<Album[]> {
  const albums = await albumRepository.getAll();
  return [...albums].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

/** Henter ett album eller null dersom det ikke finnes. */
export async function getAlbumById(albumId: string): Promise<Album | null> {
  if (!albumId) return null;
  return albumRepository.getById(albumId);
}

/** Oppdaterer albumtittelen og lagrer endringen lokalt. */
export async function updateAlbum(
  albumId: string,
  input: UpdateAlbumInput,
): Promise<Album> {
  const title = input.title.trim();

  if (!albumId) {
    throw new Error("ALBUM_ID_REQUIRED");
  }

  if (!title) {
    throw new Error("ALBUM_TITLE_REQUIRED");
  }

  const existingAlbum = await albumRepository.getById(albumId);

  if (!existingAlbum) {
    throw new Error("ALBUM_NOT_FOUND");
  }

  const updatedAlbum: Album = {
    ...existingAlbum,
    title,
    updatedAt: new Date().toISOString(),
  };

  await albumRepository.save(updatedAlbum);
  return updatedAlbum;
}

/** Sletter albumet og alle minnene som tilhører albumet. */
export async function deleteAlbum(albumId: string): Promise<void> {
  if (!albumId) {
    throw new Error("ALBUM_ID_REQUIRED");
  }

  const memories = await memoryRepository.getByAlbumId(albumId);
  await Promise.all(memories.map((memory) => memoryRepository.delete(memory.id)));
  await albumRepository.delete(albumId);
}

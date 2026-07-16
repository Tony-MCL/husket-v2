// ===============================
// src/storage/album-repository.ts
// ===============================

import type { Album } from "../models";
import { JsonCollectionRepository } from "./json-collection-repository";

const STORAGE_KEY = "husket.albums.v1";

/** Lokal lagring for album. */
export const albumRepository = new JsonCollectionRepository<Album>(STORAGE_KEY);

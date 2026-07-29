// ===============================
// src/features/memories/sources/imagePickerSource.ts
// ===============================

import * as ImagePicker from "expo-image-picker";

import {
  MAX_MEMORY_MEDIA_ITEMS,
  type ImportedMemory,
  type MemorySource,
} from "../../../models";

function normalizeAsset(
  asset: ImagePicker.ImagePickerAsset,
  source: MemorySource,
): ImportedMemory {
  return {
    source,
    localUri: asset.uri,
    originalFileName: asset.fileName ?? undefined,
    mimeType: asset.mimeType ?? undefined,
    width: asset.width,
    height: asset.height,
    sourceMetadata: {
      assetId: asset.assetId ?? undefined,
      fileSize: asset.fileSize ?? undefined,
      mediaType: asset.type ?? "image",
    },
  };
}

/** Velger mellom ett og tre bilder fra kamerarullen. */
export async function importFromPhotoLibrary(
  selectionLimit = MAX_MEMORY_MEDIA_ITEMS,
): Promise<ImportedMemory[] | null> {
  const safeSelectionLimit = Math.max(
    1,
    Math.min(selectionLimit, MAX_MEMORY_MEDIA_ITEMS),
  );
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: false,
    allowsMultipleSelection: safeSelectionLimit > 1,
    selectionLimit: safeSelectionLimit,
    quality: 1,
    exif: true,
  });

  if (result.canceled || result.assets.length === 0) return null;

  return result.assets
    .slice(0, safeSelectionLimit)
    .map((asset) => normalizeAsset(asset, "photo-library"));
}

/** Tar ett nytt bilde. Flere bilder tas ved å åpne kameraet flere ganger. */
export async function importFromCamera(): Promise<ImportedMemory | null> {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) {
    throw new Error("CAMERA_PERMISSION_DENIED");
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ["images"],
    allowsEditing: false,
    quality: 1,
    exif: true,
  });

  if (result.canceled || !result.assets[0]) return null;
  return normalizeAsset(result.assets[0], "camera");
}

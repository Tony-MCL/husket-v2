// ===============================
// src/features/memories/sources/imagePickerSource.ts
// ===============================

import * as ImagePicker from "expo-image-picker";

import type { ImportedMemory, MemorySource } from "../../../models";

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

export async function importFromPhotoLibrary(): Promise<ImportedMemory | null> {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: false,
    quality: 1,
    exif: true,
  });

  if (result.canceled || !result.assets[0]) return null;
  return normalizeAsset(result.assets[0], "photo-library");
}

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

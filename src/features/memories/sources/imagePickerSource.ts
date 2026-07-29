// ===============================
// src/features/memories/sources/imagePickerSource.ts
// ===============================

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import {
  MAX_MEMORY_MEDIA_ITEMS,
  type ImportedMemory,
  type MemorySource,
} from "../../../models";

// ===============================
// GPS helpers
// ===============================

type CapturedCoordinates = {
  latitude: number;
  longitude: number;
};

async function getCurrentCoordinates(): Promise<CapturedCoordinates | undefined> {
  const permission = await Location.requestForegroundPermissionsAsync();

  if (!permission.granted) {
    return undefined;
  }

  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch {
    return undefined;
  }
}

// ===============================
// Asset normalization
// ===============================

function normalizeAsset(
  asset: ImagePicker.ImagePickerAsset,
  source: MemorySource,
  capturedCoordinates?: CapturedCoordinates,
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
      exif: asset.exif ?? undefined,
      capturedCoordinates,
    },
  };
}

// ===============================
// Photo library import
// ===============================

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

// ===============================
// Camera import
// ===============================

/** Tar ett nytt bilde og forsøker å lagre telefonens GPS-posisjon. */
export async function importFromCamera(): Promise<ImportedMemory | null> {
  const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
  if (!cameraPermission.granted) {
    throw new Error("CAMERA_PERMISSION_DENIED");
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ["images"],
    allowsEditing: false,
    quality: 1,
    exif: true,
  });

  if (result.canceled || !result.assets[0]) return null;

  const capturedCoordinates = await getCurrentCoordinates();

  return normalizeAsset(result.assets[0], "camera", capturedCoordinates);
}

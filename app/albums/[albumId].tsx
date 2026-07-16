// ===============================
// app/albums/[albumId].tsx
// ===============================

import { useLocalSearchParams } from "expo-router";

import { AlbumDetailScreen } from "../../src/features/albums/screens/AlbumDetailScreen";

export default function AlbumDetailRoute() {
  const { albumId } = useLocalSearchParams<{ albumId: string }>();

  return <AlbumDetailScreen albumId={albumId ?? ""} />;
}

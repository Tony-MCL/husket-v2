// ===============================
// app/add-memory.tsx
// ===============================

import { useLocalSearchParams } from "expo-router";

import { AddMemoryScreen } from "../src/features/memories/screens/AddMemoryScreen";

export default function AddMemoryRoute() {
  const { source } = useLocalSearchParams<{
    source?: "camera" | "photo-library";
  }>();

  return <AddMemoryScreen initialSource={source} />;
}

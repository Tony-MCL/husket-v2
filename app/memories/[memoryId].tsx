// ===============================
// app/memories/[memoryId].tsx
// ===============================

import { useLocalSearchParams } from "expo-router";

import { MemoryDetailScreen } from "../../src/features/memories/screens/MemoryDetailScreen";

export default function MemoryDetailRoute() {
  const { memoryId } = useLocalSearchParams<{ memoryId: string }>();

  return <MemoryDetailScreen memoryId={memoryId ?? ""} />;
}

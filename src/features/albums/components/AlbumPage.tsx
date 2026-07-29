// ===============================
// src/features/albums/components/AlbumPage.tsx
// ===============================

import { Pressable, StyleSheet, Text } from "react-native";

import type { Memory, MemoryMood } from "../../../models";
import { useAppTheme } from "../../../theme/useAppTheme";
import {
  SinglePhotoLayout,
  ThreePhotoLayout,
  TwoPhotoLayout,
} from "./MemoryPhotoLayouts";

const moodEmoji: Record<MemoryMood, string> = {
  love: "❤️",
  happy: "😊",
  funny: "😂",
  excited: "🤩",
  calm: "😌",
  surprised: "😮",
  sad: "😢",
};

type AlbumPageProps = {
  memory: Memory;
  onPress: () => void;
};

// ===============================
// Photo layout selection
// ===============================

function renderPhotoLayout(memory: Memory) {
  const [firstMedia, secondMedia, thirdMedia] = memory.media;

  if (firstMedia && secondMedia && thirdMedia) {
    return <ThreePhotoLayout media={[firstMedia, secondMedia, thirdMedia]} />;
  }

  if (firstMedia && secondMedia) {
    return <TwoPhotoLayout media={[firstMedia, secondMedia]} />;
  }

  if (firstMedia) {
    return <SinglePhotoLayout media={firstMedia} />;
  }

  return null;
}

// ===============================
// Album page
// ===============================

/** Viser ett minne som én albumside med mellom ett og tre bilder. */
export function AlbumPage({ memory, onPress }: AlbumPageProps) {
  const theme = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.page,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radii.lg,
          padding: theme.spacing.lg,
          gap: theme.spacing.md,
          opacity: pressed ? 0.88 : 1,
        },
      ]}
    >
      {renderPhotoLayout(memory)}

      {memory.mood ? (
        <Text style={styles.mood} accessibilityLabel={memory.mood}>
          {moodEmoji[memory.mood]}
        </Text>
      ) : null}

      {memory.comment ? (
        <Text
          style={[
            styles.comment,
            {
              color: theme.colors.text,
              fontSize: theme.typography.body,
            },
          ]}
        >
          {memory.comment}
        </Text>
      ) : null}
    </Pressable>
  );
}

// ===============================
// Styles
// ===============================

const styles = StyleSheet.create({
  page: {
    borderWidth: 1,
    width: "100%",
  },
  mood: {
    fontSize: 28,
  },
  comment: {
    lineHeight: 25,
  },
});

// ===============================
// src/features/albums/components/AlbumPage.tsx
// ===============================

import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import type { Memory, MemoryMood } from "../../../models";
import { useAppTheme } from "../../../theme/useAppTheme";

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

/** Første albumside: ett minne med god luft, bilde, følelse og kommentar. */
export function AlbumPage({ memory, onPress }: AlbumPageProps) {
  const theme = useAppTheme();
  const primaryMedia = memory.media[0];

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
      {primaryMedia ? (
        <Image
          source={{ uri: primaryMedia.localUri }}
          resizeMode="contain"
          style={[
            styles.image,
            {
              backgroundColor: theme.colors.background,
              borderRadius: theme.radii.md,
            },
          ]}
        />
      ) : null}

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

const styles = StyleSheet.create({
  page: {
    borderWidth: 1,
    width: "100%",
  },
  image: {
    width: "100%",
    aspectRatio: 4 / 3,
  },
  mood: {
    fontSize: 28,
  },
  comment: {
    lineHeight: 25,
  },
});

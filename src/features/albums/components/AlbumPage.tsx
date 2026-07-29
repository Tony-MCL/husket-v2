// ===============================
// src/features/albums/components/AlbumPage.tsx
// ===============================

import { Pressable, StyleSheet, Text, View } from "react-native";

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
  onOpenPhoto: (photoIndex: number) => void;
};

// ===============================
// Photo layout selection
// ===============================

function renderPhotoLayout(
  memory: Memory,
  onOpenPhoto: (photoIndex: number) => void,
) {
  const [firstMedia, secondMedia, thirdMedia] = memory.media;

  if (firstMedia && secondMedia && thirdMedia) {
    return (
      <ThreePhotoLayout
        media={[firstMedia, secondMedia, thirdMedia]}
        onOpenPhoto={onOpenPhoto}
      />
    );
  }

  if (firstMedia && secondMedia) {
    return (
      <TwoPhotoLayout
        media={[firstMedia, secondMedia]}
        onOpenPhoto={onOpenPhoto}
      />
    );
  }

  if (firstMedia) {
    return <SinglePhotoLayout media={firstMedia} onOpenPhoto={onOpenPhoto} />;
  }

  return null;
}

// ===============================
// Album page
// ===============================

/** Viser ett minne som én albumside med mellom ett og tre bilder. */
export function AlbumPage({ memory, onPress, onOpenPhoto }: AlbumPageProps) {
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.page,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radii.lg,
          padding: theme.spacing.lg,
          gap: theme.spacing.md,
        },
      ]}
    >
      {renderPhotoLayout(memory, onOpenPhoto)}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open memory details"
        onPress={onPress}
        style={({ pressed }) => [
          styles.detailsButton,
          {
            backgroundColor: pressed
              ? theme.colors.surfaceMuted
              : "transparent",
            borderRadius: theme.radii.md,
            padding: theme.spacing.sm,
          },
        ]}
      >
        <View style={styles.detailsContent}>
          <View style={styles.memoryText}>
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
            ) : (
              <Text
                style={[
                  styles.emptyDetails,
                  { color: theme.colors.textMuted },
                ]}
              >
                Åpne minnet
              </Text>
            )}
          </View>

          <Text
            accessibilityElementsHidden
            importantForAccessibility="no"
            style={[styles.editIndicator, { color: theme.colors.textMuted }]}
          >
            ›
          </Text>
        </View>
      </Pressable>
    </View>
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
  detailsButton: {
    width: "100%",
  },
  detailsContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  memoryText: {
    flex: 1,
    gap: 8,
  },
  mood: {
    fontSize: 28,
  },
  comment: {
    lineHeight: 25,
  },
  emptyDetails: {
    fontSize: 14,
    fontWeight: "700",
  },
  editIndicator: {
    fontSize: 28,
    lineHeight: 30,
    fontWeight: "400",
  },
});
// ===============================
// src/features/albums/components/AlbumPage.tsx
// ===============================

import { Pressable, StyleSheet, Text, View } from "react-native";

import { useLanguage } from "../../../i18n/LanguageProvider";
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
// Metadata formatting
// ===============================

function formatMemoryDate(memory: Memory, language: "no" | "en"): string {
  const dateValue = memory.capturedAt ?? memory.createdAt;
  const parsedDate = new Date(dateValue);

  if (Number.isNaN(parsedDate.getTime())) return "";

  return new Intl.DateTimeFormat(language === "no" ? "nb-NO" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

function formatMemoryLocation(memory: Memory): string | null {
  if (!memory.location) return null;
  if (memory.location.placeName?.trim()) return memory.location.placeName.trim();

  return `${memory.location.latitude.toFixed(4)}, ${memory.location.longitude.toFixed(4)}`;
}

// ===============================
// Album page
// ===============================

/** Viser ett minne som én albumside med mellom ett og tre bilder. */
export function AlbumPage({ memory, onPress, onOpenPhoto }: AlbumPageProps) {
  const { language } = useLanguage();
  const theme = useAppTheme();
  const formattedDate = formatMemoryDate(memory, language);
  const formattedLocation = formatMemoryLocation(memory);
  const editLabel = language === "no" ? "Rediger minnet" : "Edit memory";
  const openLabel = language === "no" ? "Åpne minnet" : "Open memory";

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
        accessibilityLabel={editLabel}
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
            <View style={styles.metadataRow}>
              {formattedDate ? (
                <Text
                  style={[styles.metadataText, { color: theme.colors.textMuted }]}
                >
                  {formattedDate}
                </Text>
              ) : null}

              {formattedLocation ? (
                <Text
                  numberOfLines={1}
                  style={[styles.metadataText, { color: theme.colors.textMuted }]}
                >
                  📍 {formattedLocation}
                </Text>
              ) : null}
            </View>

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
            ) : !formattedDate && !formattedLocation && !memory.mood ? (
              <Text
                style={[
                  styles.emptyDetails,
                  { color: theme.colors.textMuted },
                ]}
              >
                {openLabel}
              </Text>
            ) : null}
          </View>

          <View style={styles.editAction}>
            <Text style={[styles.editLabel, { color: theme.colors.accent }]}> 
              {editLabel}
            </Text>
            <Text
              accessibilityElementsHidden
              importantForAccessibility="no"
              style={[styles.editIndicator, { color: theme.colors.accent }]}
            >
              ›
            </Text>
          </View>
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
  metadataRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  metadataText: {
    fontSize: 13,
    fontWeight: "600",
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
  editAction: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 0,
  },
  editLabel: {
    fontSize: 13,
    fontWeight: "700",
  },
  editIndicator: {
    fontSize: 28,
    lineHeight: 30,
    fontWeight: "400",
  },
});
// ===============================
// src/features/memories/screens/MemoryDetailScreen.tsx
// ===============================

import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLanguage } from "../../../i18n/LanguageProvider";
import type {
  Album,
  Memory,
  MemoryMedia,
  MemoryMood,
} from "../../../models";
import { useAppTheme } from "../../../theme/useAppTheme";
import { getAlbums } from "../../albums/services/albumService";
import { getMemoryById, updateMemory } from "../services/memoryService";

const moods: Array<{ value: MemoryMood; emoji: string }> = [
  { value: "love", emoji: "❤️" },
  { value: "happy", emoji: "😊" },
  { value: "funny", emoji: "😂" },
  { value: "excited", emoji: "🤩" },
  { value: "calm", emoji: "😌" },
  { value: "surprised", emoji: "😮" },
  { value: "sad", emoji: "😢" },
];

type MemoryDetailScreenProps = {
  memoryId: string;
};

export function MemoryDetailScreen({ memoryId }: MemoryDetailScreenProps) {
  const { t } = useLanguage();
  const theme = useAppTheme();
  const [memory, setMemory] = useState<Memory | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [media, setMedia] = useState<MemoryMedia[]>([]);
  const [comment, setComment] = useState("");
  const [mood, setMood] = useState<MemoryMood | undefined>();
  const [albumId, setAlbumId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setError(null);
      const [loadedMemory, loadedAlbums] = await Promise.all([
        getMemoryById(memoryId),
        getAlbums(),
      ]);

      setMemory(loadedMemory);
      setAlbums(loadedAlbums);

      if (loadedMemory) {
        setMedia(loadedMemory.media);
        setComment(loadedMemory.comment ?? "");
        setMood(loadedMemory.mood);
        setAlbumId(loadedMemory.albumId);
      }
    } catch {
      setError(t("memoryDetail.loadError"));
    } finally {
      setIsLoading(false);
    }
  }, [memoryId, t]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  function moveMedia(fromIndex: number, toIndex: number) {
    if (toIndex < 0 || toIndex >= media.length) return;

    setMedia((current) => {
      const reordered = [...current];
      const [movedItem] = reordered.splice(fromIndex, 1);
      reordered.splice(toIndex, 0, movedItem);
      return reordered;
    });
  }

  function removeMedia(indexToRemove: number) {
    if (media.length <= 1) return;
    setMedia((current) =>
      current.filter((_, index) => index !== indexToRemove),
    );
  }

  async function handleSave() {
    if (!memory || !albumId || media.length === 0 || isSaving) return;

    try {
      setIsSaving(true);
      setError(null);
      const updatedMemory = await updateMemory(memory.id, {
        albumId,
        media,
        comment,
        mood,
      });

      if (updatedMemory.albumId === memory.albumId) {
        router.back();
      } else {
        router.replace(`/albums/${updatedMemory.albumId}`);
      }
    } catch {
      setError(t("memoryDetail.saveError"));
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}> 
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.content,
          { padding: theme.spacing.lg, gap: theme.spacing.lg },
        ]}
      >
        <Pressable onPress={() => router.back()}>
          <Text style={{ color: theme.colors.accent, fontWeight: "700" }}>
            {t("memoryDetail.back")}
          </Text>
        </Pressable>

        {isLoading ? <ActivityIndicator color={theme.colors.accent} /> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {!isLoading && !error && !memory ? (
          <Text style={{ color: theme.colors.textMuted }}>
            {t("memoryDetail.notFound")}
          </Text>
        ) : null}

        {memory ? (
          <>
            <View style={{ gap: theme.spacing.sm }}>
              <Text style={[styles.eyebrow, { color: theme.colors.accent }]}> 
                {t("memoryDetail.eyebrow")}
              </Text>
              <Text
                style={[
                  styles.title,
                  { color: theme.colors.text, fontSize: theme.typography.title },
                ]}
              >
                {t("memoryDetail.title")}
              </Text>
            </View>

            <View style={styles.mediaGrid}>
              {media.map((item, index) => (
                <View key={item.id} style={styles.mediaItem}>
                  <Image
                    source={{ uri: item.localUri }}
                    resizeMode="cover"
                    style={[
                      styles.image,
                      {
                        backgroundColor: theme.colors.surface,
                        borderRadius: theme.radii.lg,
                      },
                    ]}
                  />
                  <View style={styles.mediaControls}>
                    <Pressable
                      disabled={index === 0}
                      onPress={() => moveMedia(index, index - 1)}
                      style={[
                        styles.mediaControlButton,
                        index === 0 ? styles.disabledControl : null,
                      ]}
                    >
                      <Text style={styles.mediaControlText}>←</Text>
                    </Pressable>
                    <Pressable
                      disabled={media.length <= 1}
                      onPress={() => removeMedia(index)}
                      style={[
                        styles.mediaControlButton,
                        media.length <= 1 ? styles.disabledControl : null,
                      ]}
                    >
                      <Text style={styles.mediaControlText}>×</Text>
                    </Pressable>
                    <Pressable
                      disabled={index === media.length - 1}
                      onPress={() => moveMedia(index, index + 1)}
                      style={[
                        styles.mediaControlButton,
                        index === media.length - 1 ? styles.disabledControl : null,
                      ]}
                    >
                      <Text style={styles.mediaControlText}>→</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>

            <TextInput
              value={comment}
              onChangeText={setComment}
              placeholder={t("memoryDetail.commentPlaceholder")}
              placeholderTextColor={theme.colors.textMuted}
              multiline
              style={[
                styles.input,
                styles.commentInput,
                {
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                  borderRadius: theme.radii.md,
                  padding: theme.spacing.md,
                },
              ]}
            />

            <View style={{ gap: theme.spacing.sm }}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}> 
                {t("memoryDetail.moodTitle")}
              </Text>
              <View style={styles.moodRow}>
                {moods.map((item) => {
                  const selected = mood === item.value;

                  return (
                    <Pressable
                      key={item.value}
                      onPress={() => setMood(selected ? undefined : item.value)}
                      style={[
                        styles.moodButton,
                        {
                          borderColor: selected
                            ? theme.colors.accent
                            : theme.colors.border,
                          backgroundColor: selected
                            ? theme.colors.surface
                            : "transparent",
                          borderRadius: theme.radii.pill,
                        },
                      ]}
                    >
                      <Text style={styles.moodEmoji}>{item.emoji}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={{ gap: theme.spacing.sm }}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}> 
                {t("memoryDetail.albumTitle")}
              </Text>
              <View style={{ gap: theme.spacing.sm }}>
                {albums.map((album) => {
                  const selected = album.id === albumId;

                  return (
                    <Pressable
                      key={album.id}
                      onPress={() => setAlbumId(album.id)}
                      style={[
                        styles.albumOption,
                        {
                          borderColor: selected
                            ? theme.colors.accent
                            : theme.colors.border,
                          backgroundColor: theme.colors.surface,
                          borderRadius: theme.radii.md,
                          padding: theme.spacing.md,
                        },
                      ]}
                    >
                      <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
                        {album.title}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <Pressable
              disabled={!albumId || media.length === 0 || isSaving}
              onPress={() => void handleSave()}
              style={({ pressed }) => [
                styles.saveButton,
                {
                  backgroundColor: theme.colors.accent,
                  borderRadius: theme.radii.md,
                  padding: theme.spacing.md,
                  opacity:
                    !albumId || media.length === 0 || isSaving
                      ? 0.45
                      : pressed
                        ? 0.8
                        : 1,
                },
              ]}
            >
              <Text style={styles.saveButtonText}>
                {isSaving
                  ? t("memoryDetail.saving")
                  : t("memoryDetail.saveButton")}
              </Text>
            </Pressable>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { width: "100%", maxWidth: 720, alignSelf: "center" },
  eyebrow: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  title: { fontWeight: "800" },
  mediaGrid: {
    flexDirection: "row",
    gap: 10,
  },
  mediaItem: {
    flex: 1,
    minWidth: 0,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  mediaControls: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: 8,
  },
  mediaControlButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: "#00000018",
  },
  disabledControl: {
    opacity: 0.25,
  },
  mediaControlText: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "700",
  },
  input: { borderWidth: 1, fontSize: 16 },
  commentInput: { minHeight: 112, textAlignVertical: "top" },
  sectionTitle: { fontSize: 18, fontWeight: "700" },
  moodRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  moodButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  moodEmoji: { fontSize: 24 },
  albumOption: { borderWidth: 2 },
  saveButton: { alignItems: "center" },
  saveButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "700" },
  error: { color: "#b42318", fontWeight: "600" },
});
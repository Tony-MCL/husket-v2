// ===============================
// src/features/memories/screens/AddMemoryScreen.tsx
// ===============================

import { router } from "expo-router";
import { useEffect, useState } from "react";
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

import { getAlbums } from "../../albums/services/albumService";
import { useLanguage } from "../../../i18n/LanguageProvider";
import type { Album, ImportedMemory, MemoryMood } from "../../../models";
import { useAppTheme } from "../../../theme/useAppTheme";
import { createMemory } from "../services/memoryService";
import {
  importFromCamera,
  importFromPhotoLibrary,
} from "../sources/imagePickerSource";

const moodOptions: Array<{ value: MemoryMood; emoji: string }> = [
  { value: "love", emoji: "❤️" },
  { value: "happy", emoji: "😊" },
  { value: "funny", emoji: "😂" },
  { value: "excited", emoji: "🤩" },
  { value: "calm", emoji: "😌" },
  { value: "surprised", emoji: "😮" },
  { value: "sad", emoji: "😢" },
];

export function AddMemoryScreen() {
  const { t } = useLanguage();
  const theme = useAppTheme();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [importedMemory, setImportedMemory] = useState<ImportedMemory | null>(null);
  const [comment, setComment] = useState("");
  const [selectedMood, setSelectedMood] = useState<MemoryMood | undefined>();
  const [isImporting, setIsImporting] = useState(false);
  const [isLoadingAlbums, setIsLoadingAlbums] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAlbums() {
      try {
        const storedAlbums = await getAlbums();
        setAlbums(storedAlbums);
        setSelectedAlbumId((current) => current ?? storedAlbums[0]?.id ?? null);
      } catch {
        setError(t("memories.albumLoadError"));
      } finally {
        setIsLoadingAlbums(false);
      }
    }

    void loadAlbums();
  }, [t]);

  async function handleImport(source: "camera" | "photo-library") {
    try {
      setError(null);
      setIsImporting(true);
      const result =
        source === "camera"
          ? await importFromCamera()
          : await importFromPhotoLibrary();

      if (result) setImportedMemory(result);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error &&
          caughtError.message === "CAMERA_PERMISSION_DENIED"
          ? t("memories.cameraPermissionError")
          : t("memories.importError"),
      );
    } finally {
      setIsImporting(false);
    }
  }

  async function handleSave() {
    if (!importedMemory || !selectedAlbumId || isSaving) return;

    try {
      setError(null);
      setIsSaving(true);
      await createMemory({
        albumId: selectedAlbumId,
        importedMemory,
        comment,
        mood: selectedMood,
      });
      router.replace("/");
    } catch {
      setError(t("memories.saveError"));
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
            {t("memories.back")}
          </Text>
        </Pressable>

        <View style={{ gap: theme.spacing.sm }}>
          <Text style={[styles.eyebrow, { color: theme.colors.accent }]}> 
            {t("memories.eyebrow")}
          </Text>
          <Text
            style={[
              styles.title,
              { color: theme.colors.text, fontSize: theme.typography.title },
            ]}
          >
            {t("memories.title")}
          </Text>
          <Text
            style={[
              styles.body,
              { color: theme.colors.textMuted, fontSize: theme.typography.body },
            ]}
          >
            {t("memories.body")}
          </Text>
        </View>

        {!importedMemory ? (
          <View style={{ gap: theme.spacing.md }}>
            <Pressable
              disabled={isImporting}
              onPress={() => void handleImport("camera")}
              style={({ pressed }) => [
                styles.sourceButton,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                  borderRadius: theme.radii.lg,
                  padding: theme.spacing.lg,
                  opacity: isImporting ? 0.55 : pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text style={[styles.sourceTitle, { color: theme.colors.text }]}> 
                {t("memories.camera")}
              </Text>
              <Text style={[styles.body, { color: theme.colors.textMuted }]}> 
                {t("memories.cameraBody")}
              </Text>
            </Pressable>

            <Pressable
              disabled={isImporting}
              onPress={() => void handleImport("photo-library")}
              style={({ pressed }) => [
                styles.sourceButton,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                  borderRadius: theme.radii.lg,
                  padding: theme.spacing.lg,
                  opacity: isImporting ? 0.55 : pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text style={[styles.sourceTitle, { color: theme.colors.text }]}> 
                {t("memories.photoLibrary")}
              </Text>
              <Text style={[styles.body, { color: theme.colors.textMuted }]}> 
                {t("memories.photoLibraryBody")}
              </Text>
            </Pressable>
          </View>
        ) : (
          <View
            style={[
              styles.editorPanel,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                borderRadius: theme.radii.lg,
                padding: theme.spacing.md,
                gap: theme.spacing.md,
              },
            ]}
          >
            <Image
              source={{ uri: importedMemory.localUri }}
              resizeMode="contain"
              style={[styles.previewImage, { borderRadius: theme.radii.md }]}
            />

            <TextInput
              value={comment}
              onChangeText={setComment}
              placeholder={t("memories.commentPlaceholder")}
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
                {t("memories.moodTitle")}
              </Text>
              <View style={styles.moodRow}>
                {moodOptions.map((option) => {
                  const isSelected = selectedMood === option.value;
                  return (
                    <Pressable
                      key={option.value}
                      onPress={() =>
                        setSelectedMood(isSelected ? undefined : option.value)
                      }
                      style={({ pressed }) => [
                        styles.moodButton,
                        {
                          borderColor: isSelected
                            ? theme.colors.accent
                            : theme.colors.border,
                          backgroundColor: isSelected
                            ? `${theme.colors.accent}22`
                            : theme.colors.background,
                          borderRadius: theme.radii.md,
                          opacity: pressed ? 0.75 : 1,
                        },
                      ]}
                    >
                      <Text style={styles.moodEmoji}>{option.emoji}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={{ gap: theme.spacing.sm }}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}> 
                {t("memories.albumTitle")}
              </Text>
              {isLoadingAlbums ? (
                <ActivityIndicator color={theme.colors.accent} />
              ) : albums.length === 0 ? (
                <Text style={[styles.body, { color: theme.colors.textMuted }]}> 
                  {t("memories.noAlbums")}
                </Text>
              ) : (
                albums.map((album) => {
                  const isSelected = selectedAlbumId === album.id;
                  return (
                    <Pressable
                      key={album.id}
                      onPress={() => setSelectedAlbumId(album.id)}
                      style={({ pressed }) => [
                        styles.albumOption,
                        {
                          borderColor: isSelected
                            ? theme.colors.accent
                            : theme.colors.border,
                          backgroundColor: isSelected
                            ? `${theme.colors.accent}18`
                            : theme.colors.background,
                          borderRadius: theme.radii.md,
                          padding: theme.spacing.md,
                          opacity: pressed ? 0.8 : 1,
                        },
                      ]}
                    >
                      <Text style={[styles.albumName, { color: theme.colors.text }]}> 
                        {album.title}
                      </Text>
                    </Pressable>
                  );
                })
              )}
            </View>

            <Pressable
              disabled={!selectedAlbumId || isSaving}
              onPress={() => void handleSave()}
              style={({ pressed }) => [
                styles.saveButton,
                {
                  backgroundColor: theme.colors.accent,
                  borderRadius: theme.radii.md,
                  padding: theme.spacing.md,
                  opacity: !selectedAlbumId || isSaving ? 0.45 : pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text style={styles.saveButtonText}>
                {isSaving ? t("memories.saving") : t("memories.saveButton")}
              </Text>
            </Pressable>
          </View>
        )}

        {isImporting ? <ActivityIndicator color={theme.colors.accent} /> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}
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
  body: { lineHeight: 24 },
  sourceButton: { borderWidth: 1, gap: 6 },
  sourceTitle: { fontSize: 18, fontWeight: "700" },
  editorPanel: { borderWidth: 1 },
  previewImage: { width: "100%", aspectRatio: 4 / 3, backgroundColor: "#00000010" },
  input: { borderWidth: 1, fontSize: 16 },
  commentInput: { minHeight: 92, textAlignVertical: "top" },
  sectionTitle: { fontSize: 17, fontWeight: "700" },
  moodRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  moodButton: {
    width: 48,
    height: 48,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  moodEmoji: { fontSize: 24 },
  albumOption: { borderWidth: 1 },
  albumName: { fontSize: 16, fontWeight: "700" },
  saveButton: { alignItems: "center" },
  saveButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "700" },
  error: { color: "#b42318", fontWeight: "600" },
});

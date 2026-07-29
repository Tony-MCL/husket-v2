// ===============================
// src/features/memories/screens/AddMemoryScreen.tsx
// ===============================

import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
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
import {
  MAX_MEMORY_MEDIA_ITEMS,
  type Album,
  type ImportedMemory,
  type MemoryMood,
} from "../../../models";
import { useAppTheme } from "../../../theme/useAppTheme";
import { getAlbums } from "../../albums/services/albumService";
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

type MemorySource = "camera" | "photo-library";

type AddMemoryScreenProps = {
  initialSource?: MemorySource;
};

function appendUniqueMedia(
  current: ImportedMemory[],
  incoming: ImportedMemory[],
): ImportedMemory[] {
  const knownUris = new Set(current.map((item) => item.localUri));
  const uniqueIncoming = incoming.filter((item) => !knownUris.has(item.localUri));

  return [...current, ...uniqueIncoming].slice(0, MAX_MEMORY_MEDIA_ITEMS);
}

export function AddMemoryScreen({ initialSource }: AddMemoryScreenProps) {
  const { t } = useLanguage();
  const theme = useAppTheme();
  const initialSourceOpened = useRef(false);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [importedMemories, setImportedMemories] = useState<ImportedMemory[]>([]);
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

  async function handleImport(source: MemorySource) {
    if (importedMemories.length >= MAX_MEMORY_MEDIA_ITEMS) return;

    try {
      setError(null);
      setIsImporting(true);
      const remainingSlots = MAX_MEMORY_MEDIA_ITEMS - importedMemories.length;

      if (source === "camera") {
        const result = await importFromCamera();
        if (result) {
          setImportedMemories((current) => appendUniqueMedia(current, [result]));
        }
      } else {
        const result = await importFromPhotoLibrary(remainingSlots);
        if (result) {
          setImportedMemories((current) => appendUniqueMedia(current, result));
        }
      }
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

  useEffect(() => {
    if (!initialSource || initialSourceOpened.current) return;
    initialSourceOpened.current = true;
    void handleImport(initialSource);
  }, [initialSource]);

  function removeImportedMemory(indexToRemove: number) {
    setImportedMemories((current) =>
      current.filter((_, index) => index !== indexToRemove),
    );
  }

  async function handleSave() {
    if (importedMemories.length === 0 || !selectedAlbumId || isSaving) return;

    try {
      setError(null);
      setIsSaving(true);
      await createMemory({
        albumId: selectedAlbumId,
        importedMemories,
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

  const canAddMore = importedMemories.length < MAX_MEMORY_MEDIA_ITEMS;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
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

        {importedMemories.length === 0 ? (
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
            <View style={styles.mediaHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}> 
                {importedMemories.length} / {MAX_MEMORY_MEDIA_ITEMS}
              </Text>
            </View>

            <View style={styles.previewGrid}>
              {importedMemories.map((item, index) => (
                <View key={`${item.localUri}-${index}`} style={styles.previewItem}>
                  <Image
                    source={{ uri: item.localUri }}
                    resizeMode="cover"
                    style={[
                      styles.previewImage,
                      { borderRadius: theme.radii.md },
                    ]}
                  />
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => removeImportedMemory(index)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeButtonText}>×</Text>
                  </Pressable>
                </View>
              ))}
            </View>

            {canAddMore ? (
              <View style={styles.addMoreRow}>
                <Pressable
                  disabled={isImporting}
                  onPress={() => void handleImport("camera")}
                  style={({ pressed }) => [
                    styles.addMoreButton,
                    {
                      borderColor: theme.colors.border,
                      borderRadius: theme.radii.md,
                      opacity: isImporting ? 0.55 : pressed ? 0.75 : 1,
                    },
                  ]}
                >
                  <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
                    {t("memories.camera")}
                  </Text>
                </Pressable>
                <Pressable
                  disabled={isImporting}
                  onPress={() => void handleImport("photo-library")}
                  style={({ pressed }) => [
                    styles.addMoreButton,
                    {
                      borderColor: theme.colors.border,
                      borderRadius: theme.radii.md,
                      opacity: isImporting ? 0.55 : pressed ? 0.75 : 1,
                    },
                  ]}
                >
                  <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
                    {t("memories.photoLibrary")}
                  </Text>
                </Pressable>
              </View>
            ) : null}

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
  mediaHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  previewGrid: {
    flexDirection: "row",
    gap: 10,
  },
  previewItem: {
    flex: 1,
    minWidth: 0,
    aspectRatio: 1,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#00000010",
  },
  removeButton: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#000000A8",
  },
  removeButtonText: {
    color: "#FFFFFF",
    fontSize: 22,
    lineHeight: 24,
    fontWeight: "700",
  },
  addMoreRow: {
    flexDirection: "row",
    gap: 10,
  },
  addMoreButton: {
    flex: 1,
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
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

// ===============================
// src/features/albums/screens/AlbumListScreen.tsx
// ===============================

import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLanguage } from "../../../i18n/LanguageProvider";
import type { Album } from "../../../models";
import { useAppTheme } from "../../../theme/useAppTheme";
import { createAlbum, getAlbums } from "../services/albumService";

export function AlbumListScreen() {
  const { t } = useLanguage();
  const theme = useAppTheme();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAlbums = useCallback(async () => {
    try {
      setError(null);
      setAlbums(await getAlbums());
    } catch {
      setError(t("albums.loadError"));
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void loadAlbums();
  }, [loadAlbums]);

  async function handleCreateAlbum() {
    if (!title.trim() || isSaving) return;

    try {
      setIsSaving(true);
      setError(null);
      await createAlbum({ title, description });
      setTitle("");
      setDescription("");
      await loadAlbums();
    } catch {
      setError(t("albums.saveError"));
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
        <View style={{ gap: theme.spacing.sm }}>
          <Text style={[styles.eyebrow, { color: theme.colors.accent }]}> 
            {t("albums.eyebrow")}
          </Text>
          <Text style={[styles.title, { color: theme.colors.text, fontSize: theme.typography.title }]}>
            {t("albums.title")}
          </Text>
          <Text style={[styles.body, { color: theme.colors.textMuted, fontSize: theme.typography.body }]}>
            {t("albums.body")}
          </Text>
        </View>

        <Pressable
          onPress={() => router.push("/add-memory")}
          style={({ pressed }) => [
            styles.primaryButton,
            {
              backgroundColor: theme.colors.accent,
              borderRadius: theme.radii.md,
              opacity: pressed ? 0.8 : 1,
              padding: theme.spacing.md,
            },
          ]}
        >
          <Text style={styles.buttonText}>{t("albums.addMemory")}</Text>
        </Pressable>

        <View
          style={[
            styles.panel,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.radii.lg,
              padding: theme.spacing.lg,
              gap: theme.spacing.md,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text, fontSize: theme.typography.heading }]}>
            {t("albums.createTitle")}
          </Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder={t("albums.titlePlaceholder")}
            placeholderTextColor={theme.colors.textMuted}
            style={[
              styles.input,
              {
                color: theme.colors.text,
                borderColor: theme.colors.border,
                borderRadius: theme.radii.md,
                padding: theme.spacing.md,
              },
            ]}
          />

          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder={t("albums.descriptionPlaceholder")}
            placeholderTextColor={theme.colors.textMuted}
            multiline
            style={[
              styles.input,
              styles.descriptionInput,
              {
                color: theme.colors.text,
                borderColor: theme.colors.border,
                borderRadius: theme.radii.md,
                padding: theme.spacing.md,
              },
            ]}
          />

          <Pressable
            disabled={!title.trim() || isSaving}
            onPress={() => void handleCreateAlbum()}
            style={({ pressed }) => [
              styles.primaryButton,
              {
                backgroundColor: theme.colors.accent,
                borderRadius: theme.radii.md,
                opacity: !title.trim() || isSaving ? 0.45 : pressed ? 0.8 : 1,
                padding: theme.spacing.md,
              },
            ]}
          >
            <Text style={styles.buttonText}>
              {isSaving ? t("albums.saving") : t("albums.createButton")}
            </Text>
          </Pressable>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={{ gap: theme.spacing.md }}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text, fontSize: theme.typography.heading }]}>
            {t("albums.yourAlbums")}
          </Text>

          {isLoading ? (
            <ActivityIndicator color={theme.colors.accent} />
          ) : albums.length === 0 ? (
            <View
              style={[
                styles.emptyState,
                {
                  borderColor: theme.colors.border,
                  borderRadius: theme.radii.lg,
                  padding: theme.spacing.lg,
                },
              ]}
            >
              <Text style={[styles.body, { color: theme.colors.textMuted }]}>
                {t("albums.empty")}
              </Text>
            </View>
          ) : (
            albums.map((album) => (
              <Pressable
                key={album.id}
                onPress={() =>
                  router.push({
                    pathname: "/albums/[albumId]",
                    params: { albumId: album.id },
                  })
                }
                style={({ pressed }) => [
                  styles.album,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                    borderRadius: theme.radii.lg,
                    padding: theme.spacing.lg,
                    gap: theme.spacing.xs,
                    opacity: pressed ? 0.82 : 1,
                  },
                ]}
              >
                <Text style={[styles.albumTitle, { color: theme.colors.text }]}>
                  {album.title}
                </Text>
                {album.description ? (
                  <Text style={[styles.body, { color: theme.colors.textMuted }]}>
                    {album.description}
                  </Text>
                ) : null}
                <Text style={[styles.openAlbum, { color: theme.colors.accent }]}>
                  {t("albums.openAlbum")}
                </Text>
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { width: "100%", maxWidth: 720, alignSelf: "center" },
  eyebrow: { fontSize: 13, fontWeight: "700", letterSpacing: 1.2, textTransform: "uppercase" },
  title: { fontWeight: "800" },
  body: { lineHeight: 24 },
  panel: { borderWidth: 1 },
  sectionTitle: { fontWeight: "700" },
  input: { borderWidth: 1, fontSize: 16 },
  descriptionInput: { minHeight: 96, textAlignVertical: "top" },
  primaryButton: { alignItems: "center" },
  buttonText: { color: "#ffffff", fontSize: 16, fontWeight: "700" },
  error: { color: "#b42318", fontWeight: "600" },
  emptyState: { borderWidth: 1, borderStyle: "dashed" },
  album: { borderWidth: 1 },
  albumTitle: { fontSize: 20, fontWeight: "700" },
  openAlbum: { fontWeight: "700", marginTop: 8 },
});

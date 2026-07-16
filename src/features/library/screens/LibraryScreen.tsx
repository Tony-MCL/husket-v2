// ===============================
// src/features/library/screens/LibraryScreen.tsx
// ===============================

import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLanguage } from "../../../i18n/LanguageProvider";
import type { Album } from "../../../models";
import { useAppTheme } from "../../../theme/useAppTheme";
import { getAlbums } from "../../albums/services/albumService";

export function LibraryScreen() {
  const { t } = useLanguage();
  const theme = useAppTheme();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAlbums = useCallback(async () => {
    try {
      setError(null);
      setAlbums(await getAlbums());
    } catch {
      setError(t("library.loadError"));
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void loadAlbums();
  }, [loadAlbums]);

  function openAlbum(albumId: string) {
    router.push({
      pathname: "/albums/[albumId]",
      params: { albumId },
    });
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingHorizontal: theme.spacing.lg,
            paddingTop: theme.spacing.lg,
            paddingBottom: theme.spacing.xl,
            gap: theme.spacing.lg,
          },
        ]}
      >
        <View style={{ gap: theme.spacing.xs }}>
          <Text style={[styles.eyebrow, { color: theme.colors.accent }]}> 
            {t("library.eyebrow")}
          </Text>
          <Text
            style={[
              styles.title,
              { color: theme.colors.text, fontSize: theme.typography.title },
            ]}
          >
            {t("library.title")}
          </Text>
          <Text
            style={[
              styles.body,
              {
                color: theme.colors.textMuted,
                fontSize: theme.typography.body,
              },
            ]}
          >
            {t("library.body")}
          </Text>
        </View>

        <View
          style={[
            styles.bookshelf,
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radii.lg,
            },
          ]}
        >
          <View style={[styles.topSurface, { borderBottomColor: theme.colors.border }]}> 
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("library.camera")}
              onPress={() =>
                router.push({ pathname: "/add-memory", params: { source: "camera" } })
              }
              style={({ pressed }) => [
                styles.object,
                { opacity: pressed ? 0.72 : 1 },
              ]}
            >
              <Text style={styles.cameraIcon}>📷</Text>
              <Text style={[styles.objectLabel, { color: theme.colors.text }]}> 
                {t("library.camera")}
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("library.photoFrame")}
              onPress={() =>
                router.push({
                  pathname: "/add-memory",
                  params: { source: "photo-library" },
                })
              }
              style={({ pressed }) => [
                styles.object,
                { opacity: pressed ? 0.72 : 1 },
              ]}
            >
              <View
                style={[
                  styles.photoFrame,
                  {
                    borderColor: theme.colors.accent,
                    backgroundColor: theme.colors.background,
                  },
                ]}
              >
                <Text style={styles.photoIcon}>🖼️</Text>
              </View>
              <Text style={[styles.objectLabel, { color: theme.colors.text }]}> 
                {t("library.photoFrame")}
              </Text>
            </Pressable>
          </View>

          <View style={[styles.shelf, { borderBottomColor: theme.colors.border }]}> 
            {isLoading ? (
              <ActivityIndicator color={theme.colors.accent} />
            ) : error ? (
              <Text style={styles.error}>{error}</Text>
            ) : albums.length === 0 ? (
              <Pressable
                onPress={() => router.push("/albums")}
                style={({ pressed }) => [
                  styles.emptyBook,
                  {
                    borderColor: theme.colors.border,
                    opacity: pressed ? 0.72 : 1,
                  },
                ]}
              >
                <Text style={[styles.emptyTitle, { color: theme.colors.text }]}> 
                  {t("library.emptyTitle")}
                </Text>
                <Text style={[styles.emptyBody, { color: theme.colors.textMuted }]}> 
                  {t("library.emptyBody")}
                </Text>
              </Pressable>
            ) : (
              <View style={styles.bookRow}>
                {albums.map((album, index) => (
                  <Pressable
                    key={album.id}
                    accessibilityRole="button"
                    accessibilityLabel={album.title}
                    onPress={() => openAlbum(album.id)}
                    style={({ pressed }) => [
                      styles.book,
                      {
                        backgroundColor:
                          index % 3 === 0
                            ? theme.colors.accent
                            : index % 3 === 1
                              ? theme.colors.textMuted
                              : theme.colors.text,
                        borderColor: theme.colors.border,
                        opacity: pressed ? 0.76 : 1,
                      },
                    ]}
                  >
                    <Text numberOfLines={3} style={styles.bookTitle}>
                      {album.title}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          <Pressable
            onPress={() => router.push("/albums")}
            style={({ pressed }) => [
              styles.manageAlbums,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Text style={[styles.manageAlbumsText, { color: theme.colors.accent }]}> 
              {t("library.manageAlbums")}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { width: "100%", maxWidth: 760, alignSelf: "center" },
  eyebrow: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  title: { fontWeight: "800" },
  body: { lineHeight: 24, maxWidth: 560 },
  bookshelf: { overflow: "hidden", borderWidth: 1 },
  topSurface: {
    minHeight: 170,
    borderBottomWidth: 8,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 14,
  },
  object: { minWidth: 112, alignItems: "center", gap: 8 },
  cameraIcon: { fontSize: 64 },
  photoFrame: {
    width: 88,
    height: 72,
    borderWidth: 7,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "-2deg" }],
  },
  photoIcon: { fontSize: 38 },
  objectLabel: { fontSize: 14, fontWeight: "700" },
  shelf: {
    minHeight: 250,
    borderBottomWidth: 12,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  bookRow: {
    minHeight: 210,
    flexDirection: "row",
    alignItems: "flex-end",
    flexWrap: "wrap",
    gap: 8,
  },
  book: {
    width: 54,
    minHeight: 172,
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  bookTitle: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 15,
    textAlign: "center",
    transform: [{ rotate: "-90deg" }],
    width: 142,
  },
  emptyBook: {
    minHeight: 150,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    marginBottom: 18,
  },
  emptyTitle: { fontSize: 18, fontWeight: "700", textAlign: "center" },
  emptyBody: { marginTop: 6, lineHeight: 21, textAlign: "center" },
  manageAlbums: { alignItems: "center", padding: 16 },
  manageAlbumsText: { fontWeight: "700" },
  error: { color: "#b42318", fontWeight: "600", marginBottom: 20 },
});
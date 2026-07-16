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

const bookHeights = [174, 162, 186, 168, 180];
const bookWidths = [56, 48, 62, 52, 58];

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

  function getBookColor(index: number) {
    if (index % 4 === 0) return theme.colors.accent;
    if (index % 4 === 1) return theme.colors.textMuted;
    if (index % 4 === 2) return theme.colors.text;
    return theme.colors.surfaceMuted;
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingHorizontal: theme.spacing.md,
            paddingTop: theme.spacing.md,
            paddingBottom: theme.spacing.xl,
          },
        ]}
      >
        <View style={[styles.heading, { paddingHorizontal: theme.spacing.sm }]}> 
          <Text style={[styles.eyebrow, { color: theme.colors.accent }]}> 
            {t("library.eyebrow")}
          </Text>
          <Text
            style={[
              styles.title,
              { color: theme.colors.text, fontSize: theme.typography.heading },
            ]}
          >
            {t("library.title")}
          </Text>
        </View>

        <View
          style={[
            styles.cabinet,
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radii.lg,
            },
          ]}
        >
          <View
            style={[
              styles.backPanel,
              { backgroundColor: theme.colors.surfaceMuted },
            ]}
          >
            <View style={styles.topObjects}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t("library.camera")}
                onPress={() =>
                  router.push({
                    pathname: "/add-memory",
                    params: { source: "camera" },
                  })
                }
                style={({ pressed }) => [
                  styles.object,
                  { opacity: pressed ? 0.68 : 1 },
                ]}
              >
                <View
                  style={[
                    styles.cameraBody,
                    {
                      backgroundColor: theme.colors.text,
                      borderColor: theme.colors.border,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.cameraTop,
                      { backgroundColor: theme.colors.textMuted },
                    ]}
                  />
                  <View
                    style={[
                      styles.cameraLens,
                      {
                        backgroundColor: theme.colors.background,
                        borderColor: theme.colors.textMuted,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.cameraLensInner,
                        { backgroundColor: theme.colors.accent },
                      ]}
                    />
                  </View>
                </View>
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
                  { opacity: pressed ? 0.68 : 1 },
                ]}
              >
                <View
                  style={[
                    styles.photoFrame,
                    {
                      borderColor: theme.colors.textMuted,
                      backgroundColor: theme.colors.background,
                    },
                  ]}
                >
                  <View style={styles.framePicture}>
                    <View
                      style={[
                        styles.frameSun,
                        { backgroundColor: theme.colors.accent },
                      ]}
                    />
                    <View
                      style={[
                        styles.frameHillBack,
                        { backgroundColor: theme.colors.surfaceMuted },
                      ]}
                    />
                    <View
                      style={[
                        styles.frameHillFront,
                        { backgroundColor: theme.colors.textMuted },
                      ]}
                    />
                  </View>
                </View>
                <Text style={[styles.objectLabel, { color: theme.colors.text }]}> 
                  {t("library.photoFrame")}
                </Text>
              </Pressable>
            </View>

            <View
              style={[
                styles.topBoard,
                {
                  backgroundColor: theme.colors.textMuted,
                  borderColor: theme.colors.border,
                },
              ]}
            />

            <View style={styles.shelfArea}>
              {isLoading ? (
                <ActivityIndicator color={theme.colors.accent} />
              ) : error ? (
                <Text style={styles.error}>{error}</Text>
              ) : (
                <View style={styles.bookRow}>
                  {albums.map((album, index) => {
                    const bookHeight = bookHeights[index % bookHeights.length];
                    const bookWidth = bookWidths[index % bookWidths.length];
                    const bookColor = getBookColor(index);

                    return (
                      <Pressable
                        key={album.id}
                        accessibilityRole="button"
                        accessibilityLabel={album.title}
                        onPress={() => openAlbum(album.id)}
                        style={({ pressed }) => [
                          styles.book,
                          {
                            width: bookWidth,
                            height: bookHeight,
                            backgroundColor: bookColor,
                            borderColor: theme.colors.border,
                            opacity: pressed ? 0.72 : 1,
                            transform: [{ translateY: pressed ? 2 : 0 }],
                          },
                        ]}
                      >
                        <View style={styles.bookBandTop} />
                        <Text numberOfLines={1} style={styles.bookTitle}>
                          {album.title}
                        </Text>
                        <View style={styles.bookBandBottom} />
                      </Pressable>
                    );
                  })}

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={t("library.manageAlbums")}
                    onPress={() => router.push("/albums")}
                    style={({ pressed }) => [
                      styles.addBook,
                      {
                        borderColor: theme.colors.border,
                        backgroundColor: theme.colors.background,
                        opacity: pressed ? 0.68 : 1,
                      },
                    ]}
                  >
                    <Text style={[styles.addBookPlus, { color: theme.colors.accent }]}>+
                    </Text>
                  </Pressable>
                </View>
              )}

              {!isLoading && !error && albums.length === 0 ? (
                <Text style={[styles.emptyHint, { color: theme.colors.textMuted }]}> 
                  {t("library.emptyBody")}
                </Text>
              ) : null}
            </View>

            <View
              style={[
                styles.shelfBoard,
                {
                  backgroundColor: theme.colors.textMuted,
                  borderColor: theme.colors.border,
                },
              ]}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { width: "100%", maxWidth: 760, alignSelf: "center" },
  heading: { marginBottom: 12, gap: 2 },
  eyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  title: { fontWeight: "800" },
  cabinet: {
    overflow: "hidden",
    borderWidth: 1,
    padding: 10,
  },
  backPanel: {
    minHeight: 430,
    borderRadius: 14,
    overflow: "hidden",
  },
  topObjects: {
    minHeight: 145,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    paddingHorizontal: 28,
    paddingTop: 22,
    paddingBottom: 12,
  },
  object: { minWidth: 104, alignItems: "center", gap: 8 },
  objectLabel: { fontSize: 12, fontWeight: "700" },
  cameraBody: {
    width: 76,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraTop: {
    position: "absolute",
    top: -7,
    left: 13,
    width: 26,
    height: 9,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  cameraLens: {
    width: 31,
    height: 31,
    borderRadius: 16,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraLensInner: { width: 13, height: 13, borderRadius: 7 },
  photoFrame: {
    width: 76,
    height: 64,
    borderWidth: 7,
    padding: 4,
    transform: [{ rotate: "-2deg" }],
  },
  framePicture: { flex: 1, overflow: "hidden", position: "relative" },
  frameSun: {
    position: "absolute",
    right: 7,
    top: 6,
    width: 11,
    height: 11,
    borderRadius: 6,
  },
  frameHillBack: {
    position: "absolute",
    left: -8,
    right: -8,
    bottom: -18,
    height: 38,
    borderRadius: 30,
    transform: [{ rotate: "7deg" }],
  },
  frameHillFront: {
    position: "absolute",
    left: -10,
    right: -10,
    bottom: -24,
    height: 42,
    borderRadius: 34,
    transform: [{ rotate: "-8deg" }],
  },
  topBoard: { height: 10, borderTopWidth: 1, borderBottomWidth: 1 },
  shelfArea: {
    minHeight: 235,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingTop: 26,
  },
  bookRow: {
    minHeight: 190,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5,
  },
  book: {
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  bookBandTop: {
    width: "100%",
    height: 2,
    backgroundColor: "#ffffff40",
  },
  bookBandBottom: {
    width: "100%",
    height: 2,
    backgroundColor: "#ffffff40",
  },
  bookTitle: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "800",
    lineHeight: 14,
    textAlign: "center",
    transform: [{ rotate: "-90deg" }],
    width: 126,
  },
  addBook: {
    width: 42,
    height: 112,
    borderWidth: 1,
    borderStyle: "dashed",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  addBookPlus: { fontSize: 28, fontWeight: "400", lineHeight: 30 },
  emptyHint: {
    marginTop: 12,
    marginBottom: 10,
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
  },
  shelfBoard: { height: 13, borderTopWidth: 1, borderBottomWidth: 1 },
  error: { color: "#b42318", fontWeight: "600", marginBottom: 20 },
});

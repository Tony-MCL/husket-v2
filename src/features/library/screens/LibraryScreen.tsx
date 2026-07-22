// ===============================
// src/features/library/screens/LibraryScreen.tsx
// ===============================

import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
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
import {
  albumSpineAssets,
  bookshelfAssets,
  libraryObjectAssets,
} from "../libraryAssets";

const BOOKS_PER_SHELF = 5;
const BOOK_SHELF_TOPS = [29, 47.2, 65.5, 83.5];
const BOOK_LEFT_POSITIONS = [10.5, 26, 41.5, 57, 72.5];

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

  const visibleAlbums = useMemo(
    () => albums.slice(0, BOOKS_PER_SHELF * BOOK_SHELF_TOPS.length),
    [albums],
  );

  function openAlbum(albumId: string) {
    router.push({
      pathname: "/albums/[albumId]",
      params: { albumId },
    });
  }

  function getBookPosition(index: number) {
    const shelfIndex = Math.floor(index / BOOKS_PER_SHELF);
    const slotIndex = index % BOOKS_PER_SHELF;

    return {
      left: `${BOOK_LEFT_POSITIONS[slotIndex]}%` as const,
      top: `${BOOK_SHELF_TOPS[shelfIndex]}%` as const,
    };
  }

  const addBookIndex = Math.min(
    visibleAlbums.length,
    BOOKS_PER_SHELF * BOOK_SHELF_TOPS.length - 1,
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingHorizontal: theme.spacing.sm,
            paddingTop: theme.spacing.sm,
            paddingBottom: theme.spacing.xl,
          },
        ]}
      >
        <View style={styles.heading}>
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

        <View style={styles.libraryStage}>
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
                styles.cameraObject,
                pressed ? styles.pressedObject : null,
              ]}
            >
              <Image
                source={libraryObjectAssets.camera}
                resizeMode="contain"
                style={styles.objectImage}
              />
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
                styles.frameObject,
                pressed ? styles.pressedObject : null,
              ]}
            >
              <View style={styles.frameCrop}>
                <Image
                  source={libraryObjectAssets.pictureFrames.oak}
                  resizeMode="cover"
                  style={styles.frameImage}
                />
              </View>
            </Pressable>
          </View>

          <ImageBackground
            source={bookshelfAssets.oak}
            resizeMode="contain"
            style={styles.bookshelf}
            imageStyle={styles.bookshelfImage}
          >
            {isLoading ? (
              <View style={styles.statusOverlay}>
                <ActivityIndicator color={theme.colors.accent} />
              </View>
            ) : error ? (
              <View style={styles.statusOverlay}>
                <Text style={[styles.statusText, { color: theme.colors.text }]}> 
                  {error}
                </Text>
              </View>
            ) : (
              <>
                {visibleAlbums.map((album, index) => (
                  <Pressable
                    key={album.id}
                    accessibilityRole="button"
                    accessibilityLabel={album.title}
                    onPress={() => openAlbum(album.id)}
                    style={({ pressed }) => [
                      styles.albumBook,
                      getBookPosition(index),
                      pressed ? styles.pressedBook : null,
                    ]}
                  >
                    <View style={styles.bookCrop}>
                      <Image
                        source={albumSpineAssets[index % albumSpineAssets.length]}
                        resizeMode="cover"
                        style={styles.bookImage}
                      />
                    </View>
                    <View style={styles.bookLabelArea} pointerEvents="none">
                      <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        minimumFontScale={0.62}
                        style={styles.bookTitle}
                      >
                        {album.title}
                      </Text>
                    </View>
                  </Pressable>
                ))}

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={t("library.manageAlbums")}
                  onPress={() => router.push("/albums")}
                  style={({ pressed }) => [
                    styles.albumBook,
                    getBookPosition(addBookIndex),
                    pressed ? styles.pressedBook : null,
                  ]}
                >
                  <View style={styles.bookCrop}>
                    <Image
                      source={albumSpineAssets[addBookIndex % albumSpineAssets.length]}
                      resizeMode="cover"
                      style={styles.bookImage}
                    />
                  </View>
                  <View style={styles.bookLabelArea} pointerEvents="none">
                    <Text style={styles.addBookPlus}>+</Text>
                  </View>
                </Pressable>
              </>
            )}
          </ImageBackground>
        </View>

        {!isLoading && !error && albums.length === 0 ? (
          <Text style={[styles.emptyHint, { color: theme.colors.textMuted }]}> 
            {t("library.emptyBody")}
          </Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
  },
  heading: {
    paddingHorizontal: 8,
    marginBottom: 4,
    gap: 1,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.35,
    textTransform: "uppercase",
  },
  title: {
    fontWeight: "800",
  },
  libraryStage: {
    width: "100%",
    alignItems: "center",
    position: "relative",
    marginTop: -8,
  },
  topObjects: {
    width: "88%",
    height: 88,
    marginBottom: -12,
    zIndex: 5,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 28,
  },
  cameraObject: {
    width: 92,
    height: 68,
  },
  frameObject: {
    width: 82,
    height: 76,
  },
  objectImage: {
    width: "100%",
    height: "100%",
  },
  frameCrop: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  frameImage: {
    width: "124%",
    height: "124%",
    left: "-12%",
    top: "-12%",
  },
  pressedObject: {
    opacity: 0.76,
    transform: [{ translateY: 2 }, { scale: 0.98 }],
  },
  bookshelf: {
    width: "132%",
    aspectRatio: 2 / 3,
    alignSelf: "center",
    position: "relative",
  },
  bookshelfImage: {
    width: "100%",
    height: "100%",
  },
  albumBook: {
    position: "absolute",
    width: "14.5%",
    height: "16.5%",
    zIndex: 3,
  },
  pressedBook: {
    opacity: 0.78,
    transform: [{ translateY: 2 }, { scale: 0.98 }],
  },
  bookCrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  bookImage: {
    position: "absolute",
    width: "128%",
    height: "104%",
    left: "-14%",
    top: "-2%",
  },
  bookLabelArea: {
    position: "absolute",
    left: "19%",
    top: "28%",
    width: "62%",
    height: "39%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  bookTitle: {
    width: 108,
    color: "#332317",
    fontSize: 11,
    lineHeight: 13,
    fontWeight: "800",
    textAlign: "center",
    transform: [{ rotate: "-90deg" }],
  },
  addBookPlus: {
    color: "#332317",
    fontSize: 29,
    lineHeight: 31,
    fontWeight: "500",
  },
  statusOverlay: {
    position: "absolute",
    left: "12%",
    right: "12%",
    top: "39%",
    minHeight: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#ffffffd9",
    paddingHorizontal: 14,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },
  emptyHint: {
    marginTop: 4,
    paddingHorizontal: 24,
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
  },
});
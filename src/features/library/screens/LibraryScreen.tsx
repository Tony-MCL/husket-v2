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
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useLanguage } from "../../../i18n/LanguageProvider";
import type { Album } from "../../../models";
import { getAlbums } from "../../albums/services/albumService";
import {
  albumSpineAssets,
  libraryObjectAssets,
  libraryWallAsset,
} from "../libraryAssets";

const BOOKS_PER_SHELF = 5;
const ALBUM_SHELF_TOPS = [14.1, 28.4, 42.7, 57];
const BOOK_LEFT_POSITIONS = [8.5, 24, 39.5, 55, 70.5];
const WALL_ASPECT_RATIO = 1024 / 1792;
const LIGHT_WALL_TEXT = "#30251F";
const LIGHT_WALL_MUTED_TEXT = "#6A574D";

export function LibraryScreen() {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
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
    () => albums.slice(0, BOOKS_PER_SHELF * ALBUM_SHELF_TOPS.length),
    [albums],
  );

  const wallLayout = useMemo(() => {
    const screenAspectRatio = screenWidth / screenHeight;

    if (screenAspectRatio > WALL_ASPECT_RATIO) {
      const renderedWidth = screenWidth;
      const renderedHeight = renderedWidth / WALL_ASPECT_RATIO;

      return {
        width: renderedWidth,
        height: renderedHeight,
        left: 0,
        top: (screenHeight - renderedHeight) / 2,
      };
    }

    const renderedHeight = screenHeight;
    const renderedWidth = renderedHeight * WALL_ASPECT_RATIO;

    return {
      width: renderedWidth,
      height: renderedHeight,
      left: (screenWidth - renderedWidth) / 2,
      top: 0,
    };
  }, [screenHeight, screenWidth]);

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
      top: `${ALBUM_SHELF_TOPS[shelfIndex]}%` as const,
    };
  }

  const addBookIndex = Math.min(
    visibleAlbums.length,
    BOOKS_PER_SHELF * ALBUM_SHELF_TOPS.length - 1,
  );

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={libraryWallAsset}
        resizeMode="cover"
        style={styles.background}
        imageStyle={styles.backgroundImage}
      />

      <View
        pointerEvents="box-none"
        style={[
          styles.wallCoordinateSpace,
          {
            width: wallLayout.width,
            height: wallLayout.height,
            left: wallLayout.left,
            top: wallLayout.top,
          },
        ]}
      >
        <View
          pointerEvents="none"
          style={[
            styles.heading,
            {
              top: Math.max(12, insets.top - wallLayout.top + 4),
            },
          ]}
        >
          <Text style={styles.eyebrow}>{t("library.eyebrow")}</Text>
          <Text style={styles.title}>{t("library.title")}</Text>
        </View>

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

        {isLoading ? (
          <View style={styles.statusOverlay}>
            <ActivityIndicator color={LIGHT_WALL_TEXT} />
          </View>
        ) : error ? (
          <View style={styles.statusOverlay}>
            <Text style={styles.statusText}>{error}</Text>
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

        {!isLoading && !error && albums.length === 0 ? (
          <Text style={styles.emptyHint}>{t("library.emptyBody")}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#E9CDBF",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  wallCoordinateSpace: {
    position: "absolute",
  },
  heading: {
    position: "absolute",
    left: "5%",
    zIndex: 10,
  },
  eyebrow: {
    color: LIGHT_WALL_MUTED_TEXT,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.35,
    textTransform: "uppercase",
  },
  title: {
    color: LIGHT_WALL_TEXT,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "800",
  },
  cameraObject: {
    position: "absolute",
    left: "34%",
    top: "6.1%",
    width: "10.5%",
    height: "6.4%",
    zIndex: 8,
  },
  frameObject: {
    position: "absolute",
    left: "51%",
    top: "3.9%",
    width: "13.5%",
    height: "9.2%",
    zIndex: 8,
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
  albumBook: {
    position: "absolute",
    width: "13.5%",
    height: "13.2%",
    zIndex: 6,
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
    width: 112,
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
    top: "25%",
    minHeight: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#fff7efd9",
    paddingHorizontal: 14,
  },
  statusText: {
    color: LIGHT_WALL_TEXT,
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },
  emptyHint: {
    position: "absolute",
    left: "14%",
    right: "14%",
    top: "77%",
    color: LIGHT_WALL_MUTED_TEXT,
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
  },
});
// ===============================
// src/features/library/screens/LibraryScreen.tsx
// ===============================

import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useLanguage } from "../../../i18n/LanguageProvider";
import type { Album } from "../../../models";
import {
  deleteAlbum,
  getAlbums,
  updateAlbum,
} from "../../albums/services/albumService";
import {
  albumSpineAssets,
  libraryObjectAssets,
  libraryShelfAssets,
  libraryWallAsset,
} from "../libraryAssets";

const BOOKS_PER_SHELF = 10;
const SHELF_COUNT = 4;
const WALL_ASPECT_RATIO = 1024 / 1792;
const LIGHT_WALL_TEXT = "#30251F";
const LIGHT_WALL_MUTED_TEXT = "#6A574D";
const SPINE_TITLE_MAX_CHARACTERS_PER_LINE = 18;
const SPINE_TITLE_MAX_LINES = 2;
const ALBUM_WIDTH_RATIO = 0.072;
const ALBUM_HEIGHT_RATIO = 0.132;
const SPINE_LABEL_WIDTH_RATIO = 0.5;
const SPINE_LABEL_HEIGHT_RATIO = 0.58;
const SPINE_LABEL_TOP_RATIO = 0.21;
const OBJECT_SHELF_TOP = 20;
const ALBUM_SHELF_TOPS = [36.4, 52.8, 69.2, 85.6];
const SHELF_LEFT = 7.5;
const SHELF_WIDTH = 85;
const SHELF_HEIGHT = 7.2;
const ALBUM_BOTTOM_OFFSET = 1.7;
const ALBUM_ROW_LEFT = 19;
const ALBUM_ROW_RIGHT = 19;
const ACTIVE_SHELF_THEME = "oak" as const;

// ===============================
// Album spine title formatting
// ===============================

function formatSpineTitle(title: string): string {
  const normalizedTitle = title.trim().replace(/\s+/g, " ");

  if (normalizedTitle.length <= SPINE_TITLE_MAX_CHARACTERS_PER_LINE) {
    return normalizedTitle;
  }

  const lines: string[] = [];
  let remainingTitle = normalizedTitle;

  while (remainingTitle.length > 0 && lines.length < SPINE_TITLE_MAX_LINES) {
    if (remainingTitle.length <= SPINE_TITLE_MAX_CHARACTERS_PER_LINE) {
      lines.push(remainingTitle);
      remainingTitle = "";
      break;
    }

    const candidateLine = remainingTitle.slice(
      0,
      SPINE_TITLE_MAX_CHARACTERS_PER_LINE + 1,
    );
    const lastSpaceIndex = candidateLine.lastIndexOf(" ");
    const splitIndex =
      lastSpaceIndex > 0
        ? lastSpaceIndex
        : SPINE_TITLE_MAX_CHARACTERS_PER_LINE;

    lines.push(remainingTitle.slice(0, splitIndex).trim());
    remainingTitle = remainingTitle.slice(splitIndex).trim();
  }

  if (remainingTitle.length > 0 && lines.length > 0) {
    const finalLine = lines[lines.length - 1];
    lines[lines.length - 1] = `${finalLine.slice(
      0,
      SPINE_TITLE_MAX_CHARACTERS_PER_LINE - 1,
    )}…`;
  }

  return lines.join("\n");
}

// ===============================
// Library screen
// ===============================

export function LibraryScreen() {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [isRenameVisible, setIsRenameVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [isSavingRename, setIsSavingRename] = useState(false);
  const [isDeletingAlbum, setIsDeletingAlbum] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

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
    () => albums.slice(0, BOOKS_PER_SHELF * SHELF_COUNT),
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

  const spineLabelLayout = useMemo(() => {
    const albumWidth = wallLayout.width * ALBUM_WIDTH_RATIO;
    const albumHeight = wallLayout.height * ALBUM_HEIGHT_RATIO;
    const labelWidth = albumWidth * SPINE_LABEL_WIDTH_RATIO;
    const labelHeight = albumHeight * SPINE_LABEL_HEIGHT_RATIO;

    return {
      area: {
        left: (albumWidth - labelWidth) / 2,
        top: albumHeight * SPINE_LABEL_TOP_RATIO,
        width: labelWidth,
        height: labelHeight,
      },
      rotatedLayer: {
        width: labelHeight,
        height: labelWidth,
      },
    };
  }, [wallLayout.height, wallLayout.width]);

  const albumPositions = useMemo(() => {
    const usableWidth = 100 - ALBUM_ROW_LEFT - ALBUM_ROW_RIGHT;
    const slotWidth = usableWidth / BOOKS_PER_SHELF;

    return Array.from({ length: BOOKS_PER_SHELF }, (_, slotIndex) => {
      const centeredSlotOffset = (slotWidth - ALBUM_WIDTH_RATIO * 100) / 2;
      return ALBUM_ROW_LEFT + slotIndex * slotWidth + centeredSlotOffset;
    });
  }, []);

  function openAlbum(albumId: string) {
    router.push({
      pathname: "/albums/[albumId]",
      params: { albumId },
    });
  }

  function getBookPosition(index: number) {
    const shelfIndex = Math.floor(index / BOOKS_PER_SHELF);
    const slotIndex = index % BOOKS_PER_SHELF;
    const shelfTop = ALBUM_SHELF_TOPS[shelfIndex];
    const albumTop = shelfTop - ALBUM_HEIGHT_RATIO * 100 + ALBUM_BOTTOM_OFFSET;

    return {
      left: `${albumPositions[slotIndex]}%` as const,
      top: `${albumTop}%` as const,
    };
  }

  function openAlbumMenu(album: Album) {
    setModalError(null);
    setSelectedAlbum(album);
  }

  function closeAlbumMenu() {
    setSelectedAlbum(null);
    setModalError(null);
  }

  function openRenameModal() {
    if (!selectedAlbum) return;
    setRenameValue(selectedAlbum.title);
    setModalError(null);
    setIsRenameVisible(true);
  }

  function closeRenameModal() {
    if (isSavingRename) return;
    setIsRenameVisible(false);
    setRenameValue("");
    setModalError(null);
    setSelectedAlbum(null);
  }

  function openDeleteModal() {
    setModalError(null);
    setIsDeleteVisible(true);
  }

  function closeDeleteModal() {
    if (isDeletingAlbum) return;
    setIsDeleteVisible(false);
    setModalError(null);
    setSelectedAlbum(null);
  }

  async function handleRenameAlbum() {
    if (!selectedAlbum || !renameValue.trim()) return;

    try {
      setIsSavingRename(true);
      setModalError(null);
      await updateAlbum(selectedAlbum.id, { title: renameValue });
      await loadAlbums();
      setIsRenameVisible(false);
      setRenameValue("");
      setSelectedAlbum(null);
    } catch {
      setModalError(t("library.renameError"));
    } finally {
      setIsSavingRename(false);
    }
  }

  async function handleDeleteAlbum() {
    if (!selectedAlbum) return;

    try {
      setIsDeletingAlbum(true);
      setModalError(null);
      await deleteAlbum(selectedAlbum.id);
      await loadAlbums();
      setIsDeleteVisible(false);
      setSelectedAlbum(null);
    } catch {
      setModalError(t("library.deleteError"));
    } finally {
      setIsDeletingAlbum(false);
    }
  }

  const addBookIndex = Math.min(
    visibleAlbums.length,
    BOOKS_PER_SHELF * SHELF_COUNT - 1,
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

        <Image
          pointerEvents="none"
          source={libraryShelfAssets[ACTIVE_SHELF_THEME]}
          resizeMode="contain"
          style={[
            styles.shelf,
            {
              left: `${SHELF_LEFT}%`,
              top: `${OBJECT_SHELF_TOP}%`,
              width: `${SHELF_WIDTH}%`,
              height: `${SHELF_HEIGHT}%`,
            },
          ]}
        />

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

        {ALBUM_SHELF_TOPS.map((shelfTop, shelfIndex) => (
          <Image
            key={`shelf-${shelfIndex}`}
            pointerEvents="none"
            source={libraryShelfAssets[ACTIVE_SHELF_THEME]}
            resizeMode="contain"
            style={[
              styles.shelf,
              {
                left: `${SHELF_LEFT}%`,
                top: `${shelfTop}%`,
                width: `${SHELF_WIDTH}%`,
                height: `${SHELF_HEIGHT}%`,
              },
            ]}
          />
        ))}

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
                onLongPress={() => openAlbumMenu(album)}
                delayLongPress={350}
                style={({ pressed }) => [
                  styles.albumBook,
                  getBookPosition(index),
                  pressed ? styles.pressedBook : null,
                ]}
              >
                <Image
                  source={albumSpineAssets[index % albumSpineAssets.length]}
                  resizeMode="contain"
                  style={styles.bookImage}
                />
                <View
                  pointerEvents="none"
                  style={[styles.bookLabelArea, spineLabelLayout.area]}
                >
                  <View
                    style={[
                      styles.bookTitleRotation,
                      spineLabelLayout.rotatedLayer,
                    ]}
                  >
                    <Text numberOfLines={2} style={styles.bookTitle}>
                      {formatSpineTitle(album.title)}
                    </Text>
                  </View>
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
              <Image
                source={albumSpineAssets[addBookIndex % albumSpineAssets.length]}
                resizeMode="contain"
                style={styles.bookImage}
              />
              <View
                pointerEvents="none"
                style={[styles.bookLabelArea, spineLabelLayout.area]}
              >
                <Text style={styles.addBookPlus}>+</Text>
              </View>
            </Pressable>
          </>
        )}

        {!isLoading && !error && albums.length === 0 ? (
          <Text style={styles.emptyHint}>{t("library.emptyBody")}</Text>
        ) : null}
      </View>

      <Modal
        visible={selectedAlbum !== null && !isRenameVisible && !isDeleteVisible}
        transparent
        animationType="fade"
        onRequestClose={closeAlbumMenu}
      >
        <View style={styles.modalBackdrop}>
          <Pressable style={StyleSheet.absoluteFill} onPress={closeAlbumMenu} />
          <View style={styles.modalCard}>
            <Text style={styles.modalEyebrow}>{t("library.albumMenuTitle")}</Text>
            <Text style={styles.modalTitle}>{selectedAlbum?.title}</Text>

            <Pressable style={styles.modalAction} onPress={openRenameModal}>
              <Text style={styles.modalActionText}>{t("library.renameAlbum")}</Text>
            </Pressable>

            <Pressable style={styles.modalAction} onPress={openDeleteModal}>
              <Text style={styles.modalDestructiveText}>
                {t("library.deleteAlbum")}
              </Text>
            </Pressable>

            <Pressable style={styles.modalCancel} onPress={closeAlbumMenu}>
              <Text style={styles.modalCancelText}>{t("library.cancel")}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isRenameVisible}
        transparent
        animationType="fade"
        onRequestClose={closeRenameModal}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{t("library.renameTitle")}</Text>
            <TextInput
              value={renameValue}
              onChangeText={setRenameValue}
              placeholder={t("library.renamePlaceholder")}
              placeholderTextColor="#8A7568"
              autoFocus
              maxLength={80}
              returnKeyType="done"
              onSubmitEditing={() => void handleRenameAlbum()}
              style={styles.renameInput}
            />

            {modalError ? <Text style={styles.modalError}>{modalError}</Text> : null}

            <View style={styles.modalButtonRow}>
              <Pressable
                style={styles.secondaryButton}
                onPress={closeRenameModal}
                disabled={isSavingRename}
              >
                <Text style={styles.secondaryButtonText}>{t("library.cancel")}</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.primaryButton,
                  !renameValue.trim() || isSavingRename
                    ? styles.disabledButton
                    : null,
                ]}
                onPress={() => void handleRenameAlbum()}
                disabled={!renameValue.trim() || isSavingRename}
              >
                <Text style={styles.primaryButtonText}>
                  {isSavingRename ? t("albums.saving") : t("library.save")}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isDeleteVisible}
        transparent
        animationType="fade"
        onRequestClose={closeDeleteModal}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{t("library.deleteTitle")}</Text>
            <Text style={styles.modalBody}>
              {selectedAlbum?.title ? `«${selectedAlbum.title}»\n\n` : ""}
              {t("library.deleteBody")}
            </Text>

            {modalError ? <Text style={styles.modalError}>{modalError}</Text> : null}

            <View style={styles.modalButtonRow}>
              <Pressable
                style={styles.secondaryButton}
                onPress={closeDeleteModal}
                disabled={isDeletingAlbum}
              >
                <Text style={styles.secondaryButtonText}>{t("library.cancel")}</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.deleteButton,
                  isDeletingAlbum ? styles.disabledButton : null,
                ]}
                onPress={() => void handleDeleteAlbum()}
                disabled={isDeletingAlbum}
              >
                <Text style={styles.deleteButtonText}>
                  {isDeletingAlbum
                    ? t("albums.saving")
                    : t("library.deleteConfirm")}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ===============================
// Styles
// ===============================

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
    zIndex: 20,
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
    left: "28.25%",
    top: "15.8%",
    width: "16%",
    height: "9.6%",
    zIndex: 18,
  },
  frameObject: {
    position: "absolute",
    left: "49.25%",
    top: "10.6%",
    width: "16%",
    height: "10.9%",
    zIndex: 18,
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
  shelf: {
    position: "absolute",
    zIndex: 5,
  },
  albumBook: {
    position: "absolute",
    width: `${ALBUM_WIDTH_RATIO * 100}%`,
    height: `${ALBUM_HEIGHT_RATIO * 100}%`,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  pressedBook: {
    opacity: 0.78,
    transform: [{ translateY: 2 }, { scale: 0.98 }],
  },
  bookImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  bookLabelArea: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  bookTitleRotation: {
    alignItems: "flex-start",
    justifyContent: "center",
    transform: [{ rotate: "-90deg" }],
  },
  bookTitle: {
    width: "100%",
    paddingLeft: 8,
    color: "#332317",
    fontSize: 8,
    lineHeight: 9,
    fontWeight: "400",
    textAlign: "left",
  },
  addBookPlus: {
    color: "#332317",
    fontSize: 24,
    lineHeight: 26,
    fontWeight: "500",
  },
  statusOverlay: {
    position: "absolute",
    left: "12%",
    right: "12%",
    top: "31%",
    minHeight: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#fff7efd9",
    paddingHorizontal: 14,
    zIndex: 30,
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
    top: "91%",
    color: LIGHT_WALL_MUTED_TEXT,
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
  },
  modalBackdrop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E2118A8",
    paddingHorizontal: 24,
  },
  modalCard: {
    width: "100%",
    maxWidth: 360,
    borderRadius: 24,
    backgroundColor: "#FFF8F2",
    padding: 22,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 12,
  },
  modalEyebrow: {
    color: LIGHT_WALL_MUTED_TEXT,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  modalTitle: {
    color: LIGHT_WALL_TEXT,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700",
    marginBottom: 18,
  },
  modalBody: {
    color: LIGHT_WALL_MUTED_TEXT,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
  },
  modalAction: {
    minHeight: 52,
    justifyContent: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#D9C8BB",
  },
  modalActionText: {
    color: LIGHT_WALL_TEXT,
    fontSize: 16,
    fontWeight: "500",
  },
  modalDestructiveText: {
    color: "#A34035",
    fontSize: 16,
    fontWeight: "500",
  },
  modalCancel: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  modalCancelText: {
    color: LIGHT_WALL_MUTED_TEXT,
    fontSize: 15,
    fontWeight: "500",
  },
  renameInput: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: "#D6C3B5",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    color: LIGHT_WALL_TEXT,
    fontSize: 16,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  modalError: {
    color: "#A34035",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  modalButtonRow: {
    flexDirection: "row",
    gap: 10,
  },
  secondaryButton: {
    flex: 1,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CDB8AA",
    borderRadius: 14,
    backgroundColor: "#FFF8F2",
  },
  secondaryButtonText: {
    color: LIGHT_WALL_TEXT,
    fontSize: 15,
    fontWeight: "600",
  },
  primaryButton: {
    flex: 1,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#4A3324",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  deleteButton: {
    flex: 1,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#A34035",
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.5,
  },
});

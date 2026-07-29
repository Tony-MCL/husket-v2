// ===============================
// src/features/albums/screens/AlbumDetailScreen.tsx
// ===============================

import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLanguage } from "../../../i18n/LanguageProvider";
import type { Album, Memory } from "../../../models";
import { useAppTheme } from "../../../theme/useAppTheme";
import { getMemoriesByAlbumId } from "../../memories/services/memoryService";
import { AlbumSpread } from "../components/AlbumSpread";
import { MemoryFullscreenViewer } from "../components/MemoryFullscreenViewer";
import { getAlbumById } from "../services/albumService";

const COMPACT_ALBUM_BREAKPOINT = 720;

type AlbumDetailScreenProps = {
  albumId: string;
};

// ===============================
// Album detail screen
// ===============================

export function AlbumDetailScreen({ albumId }: AlbumDetailScreenProps) {
  const { t } = useLanguage();
  const theme = useAppTheme();
  const { width: screenWidth } = useWindowDimensions();
  const hasLoadedAlbum = useRef(false);

  const [album, setAlbum] = useState<Album | null>(null);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);
  const [viewerMemory, setViewerMemory] = useState<Memory | null>(null);
  const [viewerPhotoIndex, setViewerPhotoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isCompact = screenWidth < COMPACT_ALBUM_BREAKPOINT;
  const memoriesPerSpread = isCompact ? 1 : 2;
  const spreadCount = Math.ceil(memories.length / memoriesPerSpread);

  const currentSpreadMemories = useMemo(() => {
    const firstMemoryIndex = currentSpreadIndex * memoriesPerSpread;

    return {
      leftMemory: memories[firstMemoryIndex],
      rightMemory: isCompact ? undefined : memories[firstMemoryIndex + 1],
    };
  }, [currentSpreadIndex, isCompact, memories, memoriesPerSpread]);

  const loadAlbum = useCallback(
    async (resetSpread: boolean) => {
      try {
        setError(null);
        const [loadedAlbum, loadedMemories] = await Promise.all([
          getAlbumById(albumId),
          getMemoriesByAlbumId(albumId),
        ]);

        setAlbum(loadedAlbum);
        setMemories(loadedMemories);

        if (resetSpread) {
          setCurrentSpreadIndex(0);
        }
      } catch {
        setError(t("albumDetail.loadError"));
      } finally {
        setIsLoading(false);
      }
    },
    [albumId, t],
  );

  useFocusEffect(
    useCallback(() => {
      const resetSpread = !hasLoadedAlbum.current;
      hasLoadedAlbum.current = true;
      void loadAlbum(resetSpread);
    }, [loadAlbum]),
  );

  useEffect(() => {
    setCurrentSpreadIndex((currentIndex) =>
      Math.min(currentIndex, Math.max(spreadCount - 1, 0)),
    );
  }, [spreadCount]);

  function openMemory(memoryId: string) {
    router.push(`/memories/${memoryId}`);
  }

  function openPhoto(memory: Memory, photoIndex: number) {
    setViewerPhotoIndex(photoIndex);
    setViewerMemory(memory);
  }

  function closePhotoViewer() {
    setViewerMemory(null);
    setViewerPhotoIndex(0);
  }

  function showPreviousSpread() {
    setCurrentSpreadIndex((currentIndex) => Math.max(currentIndex - 1, 0));
  }

  function showNextSpread() {
    setCurrentSpreadIndex((currentIndex) =>
      Math.min(currentIndex + 1, Math.max(spreadCount - 1, 0)),
    );
  }

  const canShowPreviousSpread = currentSpreadIndex > 0;
  const canShowNextSpread = currentSpreadIndex < spreadCount - 1;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { padding: theme.spacing.lg, gap: theme.spacing.lg },
        ]}
      >
        <Pressable onPress={() => router.replace("/")}>
          <Text style={{ color: theme.colors.accent, fontWeight: "700" }}>
            {t("albumDetail.back")}
          </Text>
        </Pressable>

        {isLoading ? <ActivityIndicator color={theme.colors.accent} /> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {!isLoading && !error && !album ? (
          <Text style={{ color: theme.colors.textMuted }}>
            {t("albumDetail.notFound")}
          </Text>
        ) : null}

        {album ? (
          <>
            <View style={{ gap: theme.spacing.sm }}>
              <Text style={[styles.eyebrow, { color: theme.colors.accent }]}> 
                {t("albumDetail.eyebrow")}
              </Text>
              <Text
                style={[
                  styles.title,
                  { color: theme.colors.text, fontSize: theme.typography.title },
                ]}
              >
                {album.title}
              </Text>
              {album.description ? (
                <Text
                  style={[
                    styles.body,
                    {
                      color: theme.colors.textMuted,
                      fontSize: theme.typography.body,
                    },
                  ]}
                >
                  {album.description}
                </Text>
              ) : null}
            </View>

            {memories.length === 0 ? (
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
                <Text style={{ color: theme.colors.textMuted }}>
                  {t("albumDetail.empty")}
                </Text>
              </View>
            ) : currentSpreadMemories.leftMemory ? (
              <>
                <AlbumSpread
                  leftMemory={currentSpreadMemories.leftMemory}
                  rightMemory={currentSpreadMemories.rightMemory}
                  isCompact={isCompact}
                  onOpenMemory={openMemory}
                  onOpenPhoto={openPhoto}
                />

                <View style={styles.navigationRow}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Previous album spread"
                    disabled={!canShowPreviousSpread}
                    onPress={showPreviousSpread}
                    style={({ pressed }) => [
                      styles.navigationButton,
                      {
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.border,
                        borderRadius: theme.radii.pill,
                        opacity: !canShowPreviousSpread
                          ? 0.3
                          : pressed
                            ? 0.7
                            : 1,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.navigationButtonText,
                        { color: theme.colors.text },
                      ]}
                    >
                      ‹
                    </Text>
                  </Pressable>

                  <Text
                    style={[
                      styles.pageIndicator,
                      { color: theme.colors.textMuted },
                    ]}
                  >
                    {currentSpreadIndex + 1} / {spreadCount}
                  </Text>

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Next album spread"
                    disabled={!canShowNextSpread}
                    onPress={showNextSpread}
                    style={({ pressed }) => [
                      styles.navigationButton,
                      {
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.border,
                        borderRadius: theme.radii.pill,
                        opacity: !canShowNextSpread
                          ? 0.3
                          : pressed
                            ? 0.7
                            : 1,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.navigationButtonText,
                        { color: theme.colors.text },
                      ]}
                    >
                      ›
                    </Text>
                  </Pressable>
                </View>
              </>
            ) : null}
          </>
        ) : null}
      </ScrollView>

      <MemoryFullscreenViewer
        memory={viewerMemory}
        initialPhotoIndex={viewerPhotoIndex}
        onClose={closePhotoViewer}
      />
    </SafeAreaView>
  );
}

// ===============================
// Styles
// ===============================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    width: "100%",
    maxWidth: 1120,
    alignSelf: "center",
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  title: {
    fontWeight: "800",
  },
  body: {
    lineHeight: 24,
  },
  emptyState: {
    borderWidth: 1,
    borderStyle: "dashed",
  },
  navigationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
  },
  navigationButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  navigationButtonText: {
    fontSize: 32,
    lineHeight: 34,
    fontWeight: "500",
  },
  pageIndicator: {
    minWidth: 64,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
  },
  error: {
    color: "#b42318",
    fontWeight: "600",
  },
});
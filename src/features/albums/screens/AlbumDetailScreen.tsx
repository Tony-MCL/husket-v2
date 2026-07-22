// ===============================
// src/features/albums/screens/AlbumDetailScreen.tsx
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
import type { Album, Memory } from "../../../models";
import { useAppTheme } from "../../../theme/useAppTheme";
import { getMemoriesByAlbumId } from "../../memories/services/memoryService";
import { AlbumPage } from "../components/AlbumPage";
import { getAlbumById } from "../services/albumService";

type AlbumDetailScreenProps = {
  albumId: string;
};

export function AlbumDetailScreen({ albumId }: AlbumDetailScreenProps) {
  const { t } = useLanguage();
  const theme = useAppTheme();
  const [album, setAlbum] = useState<Album | null>(null);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAlbum = useCallback(async () => {
    try {
      setError(null);
      const [loadedAlbum, loadedMemories] = await Promise.all([
        getAlbumById(albumId),
        getMemoriesByAlbumId(albumId),
      ]);
      setAlbum(loadedAlbum);
      setMemories(loadedMemories);
    } catch {
      setError(t("albumDetail.loadError"));
    } finally {
      setIsLoading(false);
    }
  }, [albumId, t]);

  useEffect(() => {
    void loadAlbum();
  }, [loadAlbum]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}> 
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
          <Text style={{ color: theme.colors.textMuted }}>{t("albumDetail.notFound")}</Text>
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
                    { color: theme.colors.textMuted, fontSize: theme.typography.body },
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
            ) : (
              <View style={{ gap: theme.spacing.xl }}>
                {memories.map((memory) => (
                  <AlbumPage
                    key={memory.id}
                    memory={memory}
                    onPress={() => router.push(`/memories/${memory.id}`)}
                  />
                ))}
              </View>
            )}
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { width: "100%", maxWidth: 760, alignSelf: "center" },
  eyebrow: { fontSize: 13, fontWeight: "700", letterSpacing: 1.2, textTransform: "uppercase" },
  title: { fontWeight: "800" },
  body: { lineHeight: 24 },
  emptyState: { borderWidth: 1, borderStyle: "dashed" },
  error: { color: "#b42318", fontWeight: "600" },
});
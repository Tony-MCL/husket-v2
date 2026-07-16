// ===============================
// src/features/memories/screens/AddMemoryScreen.tsx
// ===============================

import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLanguage } from "../../../i18n/LanguageProvider";
import type { ImportedMemory } from "../../../models";
import { useAppTheme } from "../../../theme/useAppTheme";
import {
  importFromCamera,
  importFromPhotoLibrary,
} from "../sources/imagePickerSource";

export function AddMemoryScreen() {
  const { t } = useLanguage();
  const theme = useAppTheme();
  const [importedMemory, setImportedMemory] = useState<ImportedMemory | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}> 
      <ScrollView
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

        {isImporting ? <ActivityIndicator color={theme.colors.accent} /> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {importedMemory ? (
          <View
            style={[
              styles.previewPanel,
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
            <Text style={[styles.sourceTitle, { color: theme.colors.text }]}> 
              {t("memories.readyTitle")}
            </Text>
            <Text style={[styles.body, { color: theme.colors.textMuted }]}> 
              {t("memories.readyBody")}
            </Text>
          </View>
        ) : null}
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
  previewPanel: { borderWidth: 1 },
  previewImage: { width: "100%", aspectRatio: 4 / 3, backgroundColor: "#00000010" },
  error: { color: "#b42318", fontWeight: "600" },
});

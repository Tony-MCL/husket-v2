// ===============================
// src/features/albums/screens/AlbumListScreen.tsx
// ===============================

import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLanguage } from "../../../i18n/LanguageProvider";
import { useAppTheme } from "../../../theme/useAppTheme";
import { createAlbum } from "../services/albumService";

export function AlbumListScreen() {
  const { t } = useLanguage();
  const theme = useAppTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreateAlbum() {
    if (!title.trim() || isSaving) return;

    try {
      setIsSaving(true);
      setError(null);
      await createAlbum({ title, description });
      router.replace("/");
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
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("albums.back")}
          onPress={() => router.replace("/")}
          style={({ pressed }) => [
            styles.backButton,
            {
              borderColor: theme.colors.border,
              borderRadius: theme.radii.md,
              opacity: pressed ? 0.72 : 1,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
            },
          ]}
        >
          <Text style={[styles.backText, { color: theme.colors.accent }]}> 
            {t("albums.back")}
          </Text>
        </Pressable>

        <View style={{ gap: theme.spacing.sm }}>
          <Text style={[styles.eyebrow, { color: theme.colors.accent }]}> 
            {t("albums.eyebrow")}
          </Text>
          <Text
            style={[
              styles.title,
              { color: theme.colors.text, fontSize: theme.typography.title },
            ]}
          >
            {t("albums.title")}
          </Text>
          <Text
            style={[
              styles.body,
              { color: theme.colors.textMuted, fontSize: theme.typography.body },
            ]}
          >
            {t("albums.body")}
          </Text>
        </View>

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
          <Text
            style={[
              styles.sectionTitle,
              { color: theme.colors.text, fontSize: theme.typography.heading },
            ]}
          >
            {t("albums.createTitle")}
          </Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder={t("albums.titlePlaceholder")}
            placeholderTextColor={theme.colors.textMuted}
            autoFocus
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { width: "100%", maxWidth: 720, alignSelf: "center" },
  backButton: {
    alignSelf: "flex-start",
    borderWidth: 1,
  },
  backText: {
    fontSize: 14,
    fontWeight: "700",
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  title: { fontWeight: "800" },
  body: { lineHeight: 24 },
  panel: { borderWidth: 1 },
  sectionTitle: { fontWeight: "700" },
  input: { borderWidth: 1, fontSize: 16 },
  descriptionInput: { minHeight: 96, textAlignVertical: "top" },
  primaryButton: { alignItems: "center" },
  buttonText: { color: "#ffffff", fontSize: 16, fontWeight: "700" },
  error: { color: "#b42318", fontWeight: "600" },
});
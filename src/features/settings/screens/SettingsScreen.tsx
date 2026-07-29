// ===============================
// src/features/settings/screens/SettingsScreen.tsx
// ===============================

import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useLanguage } from "../../../i18n/LanguageProvider";
import { useAppTheme } from "../../../theme/useAppTheme";

export function SettingsScreen() {
  const { t, language } = useLanguage();
  const insets = useSafeAreaInsets();
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor: theme.colors.background,
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 24,
        },
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t("settings.back")}
        onPress={() => router.back()}
        style={({ pressed }) => [
          styles.backButton,
          pressed ? styles.pressed : null,
        ]}
      >
        <Text style={[styles.backText, { color: theme.colors.text }]}>← {t("settings.back")}</Text>
      </Pressable>

      <View style={styles.content}>
        <Text style={[styles.eyebrow, { color: theme.colors.mutedText }]}>
          {t("settings.eyebrow")}
        </Text>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {t("settings.title")}
        </Text>
        <Text style={[styles.body, { color: theme.colors.mutedText }]}>
          {t("settings.body")}
        </Text>

        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text style={[styles.cardLabel, { color: theme.colors.mutedText }]}>
            {t("settings.language")}
          </Text>
          <Text style={[styles.cardValue, { color: theme.colors.text }]}>
            {language === "no" ? t("settings.norwegian") : t("settings.english")}
          </Text>
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <Text style={[styles.cardLabel, { color: theme.colors.mutedText }]}>
            {t("settings.appearance")}
          </Text>
          <Text style={[styles.cardValue, { color: theme.colors.text }]}>
            {theme.isDark ? t("settings.dark") : t("settings.light")}
          </Text>
        </View>

        <Text style={[styles.note, { color: theme.colors.mutedText }]}>
          {t("settings.note")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 24,
  },
  backButton: {
    alignSelf: "flex-start",
    minHeight: 44,
    justifyContent: "center",
  },
  backText: {
    fontSize: 15,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.65,
  },
  content: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    paddingTop: 28,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.35,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 28,
  },
  card: {
    minHeight: 74,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  cardValue: {
    fontSize: 17,
    fontWeight: "600",
  },
  note: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 10,
  },
});

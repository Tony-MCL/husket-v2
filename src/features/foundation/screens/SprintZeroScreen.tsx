import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLanguage } from "../../../i18n/LanguageProvider";
import { useAppTheme } from "../../../theme/useAppTheme";

export function SprintZeroScreen() {
  const { t } = useLanguage();
  const theme = useAppTheme();

  const cards = [
    {
      title: t("foundation.albumTitle"),
      body: t("foundation.albumBody"),
    },
    {
      title: t("foundation.languageTitle"),
      body: t("foundation.languageBody"),
    },
    {
      title: t("foundation.structureTitle"),
      body: t("foundation.structureBody"),
    },
  ];

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
        <View style={{ gap: theme.spacing.sm }}>
          <Text style={[styles.eyebrow, { color: theme.colors.accent }]}> 
            {t("foundation.eyebrow")}
          </Text>
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.text,
                fontSize: theme.typography.title,
              },
            ]}
          >
            {t("app.name")}
          </Text>
          <Text
            style={[
              styles.heading,
              {
                color: theme.colors.text,
                fontSize: theme.typography.heading,
              },
            ]}
          >
            {t("foundation.title")}
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
            {t("foundation.body")}
          </Text>
        </View>

        <View style={{ gap: theme.spacing.md }}>
          {cards.map((card) => (
            <View
              key={card.title}
              style={[
                styles.card,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                  borderRadius: theme.radii.lg,
                  padding: theme.spacing.lg,
                  gap: theme.spacing.sm,
                },
              ]}
            >
              <Text
                style={[
                  styles.cardTitle,
                  {
                    color: theme.colors.text,
                    fontSize: theme.typography.heading,
                  },
                ]}
              >
                {card.title}
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
                {card.body}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    width: "100%",
    maxWidth: 720,
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
  heading: {
    fontWeight: "700",
    lineHeight: 30,
  },
  body: {
    lineHeight: 24,
  },
  card: {
    borderWidth: 1,
  },
  cardTitle: {
    fontWeight: "700",
  },
});

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { LanguageProvider } from "../src/i18n/LanguageProvider";
import { useAppTheme } from "../src/theme/useAppTheme";

export default function RootLayout() {
  const theme = useAppTheme();

  return (
    <LanguageProvider>
      <StatusBar style={theme.isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
    </LanguageProvider>
  );
}

// ===============================
// src/features/library/components/SettingsCupButton.tsx
// ===============================

import { router } from "expo-router";
import { useMemo } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

import { useLanguage } from "../../../i18n/LanguageProvider";
import { libraryObjectAssets } from "../libraryAssets";

const WALL_ASPECT_RATIO = 1024 / 1792;
const CUP_LEFT = 69;
const CUP_TOP = 13.7;
const CUP_WIDTH = 12.5;
const CUP_HEIGHT = 7.8;

// ===============================
// Settings cup button
// ===============================

export function SettingsCupButton() {
  const { t } = useLanguage();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

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

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t("settings.title")}
      onPress={() => router.push("/settings")}
      style={({ pressed }) => [
        styles.button,
        {
          left: wallLayout.left + wallLayout.width * (CUP_LEFT / 100),
          top: wallLayout.top + wallLayout.height * (CUP_TOP / 100),
          width: wallLayout.width * (CUP_WIDTH / 100),
          height: wallLayout.height * (CUP_HEIGHT / 100),
        },
        pressed ? styles.pressed : null,
      ]}
    >
      <Image
        source={libraryObjectAssets.settingsCup}
        resizeMode="contain"
        style={styles.image}
      />
    </Pressable>
  );
}

// ===============================
// Styles
// ===============================

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    zIndex: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  pressed: {
    opacity: 0.76,
    transform: [{ translateY: 2 }, { scale: 0.98 }],
  },
});

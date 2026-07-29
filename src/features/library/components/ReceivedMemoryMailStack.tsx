// ===============================
// src/features/library/components/ReceivedMemoryMailStack.tsx
// ===============================

import { useMemo } from "react";
import { Image, StyleSheet, useWindowDimensions } from "react-native";

import { libraryObjectAssets } from "../libraryAssets";

const WALL_ASPECT_RATIO = 1024 / 1792;
const MAIL_LEFT = 12.5;
const MAIL_TOP = 15.7;
const MAIL_WIDTH = 14.5;
const MAIL_HEIGHT = 8.2;

// ===============================
// Received memory mail stack
// ===============================

export function ReceivedMemoryMailStack() {
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
    <Image
      accessible={false}
      pointerEvents="none"
      source={libraryObjectAssets.mail}
      resizeMode="contain"
      style={[
        styles.image,
        {
          left: wallLayout.left + wallLayout.width * (MAIL_LEFT / 100),
          top: wallLayout.top + wallLayout.height * (MAIL_TOP / 100),
          width: wallLayout.width * (MAIL_WIDTH / 100),
          height: wallLayout.height * (MAIL_HEIGHT / 100),
        },
      ]}
    />
  );
}

// ===============================
// Styles
// ===============================

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    zIndex: 20,
  },
});

// ===============================
// src/features/albums/components/MemoryPhotoLayouts.tsx
// ===============================

import { Image, StyleSheet, View } from "react-native";

import type { MemoryMedia } from "../../../models";
import { useAppTheme } from "../../../theme/useAppTheme";

// ===============================
// Shared photo frame
// ===============================

type MemoryPhotoProps = {
  media: MemoryMedia;
  aspectRatio?: number;
};

function MemoryPhoto({ media, aspectRatio = 4 / 3 }: MemoryPhotoProps) {
  const theme = useAppTheme();

  return (
    <Image
      source={{ uri: media.localUri }}
      resizeMode="cover"
      style={[
        styles.photo,
        {
          aspectRatio,
          backgroundColor: theme.colors.background,
          borderRadius: theme.radii.md,
        },
      ]}
    />
  );
}

// ===============================
// One photo layout
// ===============================

type SinglePhotoLayoutProps = {
  media: MemoryMedia;
};

export function SinglePhotoLayout({ media }: SinglePhotoLayoutProps) {
  return <MemoryPhoto media={media} aspectRatio={4 / 3} />;
}

// ===============================
// Two photo layout
// ===============================

type TwoPhotoLayoutProps = {
  media: [MemoryMedia, MemoryMedia];
};

export function TwoPhotoLayout({ media }: TwoPhotoLayoutProps) {
  return (
    <View style={styles.twoPhotoGrid}>
      <View style={styles.equalColumn}>
        <MemoryPhoto media={media[0]} aspectRatio={3 / 4} />
      </View>
      <View style={styles.equalColumn}>
        <MemoryPhoto media={media[1]} aspectRatio={3 / 4} />
      </View>
    </View>
  );
}

// ===============================
// Three photo layout
// ===============================

type ThreePhotoLayoutProps = {
  media: [MemoryMedia, MemoryMedia, MemoryMedia];
};

export function ThreePhotoLayout({ media }: ThreePhotoLayoutProps) {
  return (
    <View style={styles.threePhotoGrid}>
      <View style={styles.heroColumn}>
        <MemoryPhoto media={media[0]} aspectRatio={3 / 4} />
      </View>
      <View style={styles.stackColumn}>
        <MemoryPhoto media={media[1]} aspectRatio={4 / 3} />
        <MemoryPhoto media={media[2]} aspectRatio={4 / 3} />
      </View>
    </View>
  );
}

// ===============================
// Styles
// ===============================

const styles = StyleSheet.create({
  photo: {
    width: "100%",
  },
  twoPhotoGrid: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
  },
  equalColumn: {
    flex: 1,
  },
  threePhotoGrid: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
  },
  heroColumn: {
    flex: 1.25,
  },
  stackColumn: {
    flex: 1,
    justifyContent: "space-between",
    gap: 10,
  },
});

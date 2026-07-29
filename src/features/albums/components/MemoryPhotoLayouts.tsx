// ===============================
// src/features/albums/components/MemoryPhotoLayouts.tsx
// ===============================

import { Image, Pressable, StyleSheet, View } from "react-native";

import type { MemoryMedia } from "../../../models";
import { useAppTheme } from "../../../theme/useAppTheme";

// ===============================
// Shared photo frame
// ===============================

type MemoryPhotoProps = {
  media: MemoryMedia;
  aspectRatio?: number;
  onPress: () => void;
};

function MemoryPhoto({ media, aspectRatio = 4 / 3, onPress }: MemoryPhotoProps) {
  const theme = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Open photo fullscreen"
      onPress={onPress}
      style={({ pressed }) => [
        styles.photoButton,
        { borderRadius: theme.radii.md },
        pressed ? styles.pressedPhoto : null,
      ]}
    >
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
    </Pressable>
  );
}

// ===============================
// One photo layout
// ===============================

type SinglePhotoLayoutProps = {
  media: MemoryMedia;
  onOpenPhoto: (photoIndex: number) => void;
};

export function SinglePhotoLayout({
  media,
  onOpenPhoto,
}: SinglePhotoLayoutProps) {
  return (
    <MemoryPhoto
      media={media}
      aspectRatio={4 / 3}
      onPress={() => onOpenPhoto(0)}
    />
  );
}

// ===============================
// Two photo layout
// ===============================

type TwoPhotoLayoutProps = {
  media: [MemoryMedia, MemoryMedia];
  onOpenPhoto: (photoIndex: number) => void;
};

export function TwoPhotoLayout({ media, onOpenPhoto }: TwoPhotoLayoutProps) {
  return (
    <View style={styles.twoPhotoGrid}>
      <View style={styles.equalColumn}>
        <MemoryPhoto
          media={media[0]}
          aspectRatio={3 / 4}
          onPress={() => onOpenPhoto(0)}
        />
      </View>
      <View style={styles.equalColumn}>
        <MemoryPhoto
          media={media[1]}
          aspectRatio={3 / 4}
          onPress={() => onOpenPhoto(1)}
        />
      </View>
    </View>
  );
}

// ===============================
// Three photo layout
// ===============================

type ThreePhotoLayoutProps = {
  media: [MemoryMedia, MemoryMedia, MemoryMedia];
  onOpenPhoto: (photoIndex: number) => void;
};

export function ThreePhotoLayout({ media, onOpenPhoto }: ThreePhotoLayoutProps) {
  return (
    <View style={styles.threePhotoGrid}>
      <View style={styles.heroColumn}>
        <MemoryPhoto
          media={media[0]}
          aspectRatio={3 / 4}
          onPress={() => onOpenPhoto(0)}
        />
      </View>
      <View style={styles.stackColumn}>
        <MemoryPhoto
          media={media[1]}
          aspectRatio={4 / 3}
          onPress={() => onOpenPhoto(1)}
        />
        <MemoryPhoto
          media={media[2]}
          aspectRatio={4 / 3}
          onPress={() => onOpenPhoto(2)}
        />
      </View>
    </View>
  );
}

// ===============================
// Styles
// ===============================

const styles = StyleSheet.create({
  photoButton: {
    width: "100%",
    overflow: "hidden",
  },
  photo: {
    width: "100%",
  },
  pressedPhoto: {
    opacity: 0.78,
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
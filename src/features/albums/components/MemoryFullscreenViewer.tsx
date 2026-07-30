// ===============================
// src/features/albums/components/MemoryFullscreenViewer.tsx
// ===============================

import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { Memory } from "../../../models";

// ===============================
// Types
// ===============================

type MemoryFullscreenViewerProps = {
  memory: Memory | null;
  initialPhotoIndex: number;
  onClose: () => void;
};

// ===============================
// Fullscreen viewer
// ===============================

/** Viser bildene i ett minne i ekte fullskjerm uten albumgrensesnitt rundt. */
export function MemoryFullscreenViewer({
  memory,
  initialPhotoIndex,
  onClose,
}: MemoryFullscreenViewerProps) {
  const insets = useSafeAreaInsets();
  const [activePhotoIndex, setActivePhotoIndex] = useState(initialPhotoIndex);
  const media = memory?.media ?? [];

  useEffect(() => {
    setActivePhotoIndex(initialPhotoIndex);
  }, [initialPhotoIndex, memory?.id]);

  const safeActiveIndex = Math.min(
    Math.max(activePhotoIndex, 0),
    Math.max(media.length - 1, 0),
  );
  const activeMedia = media[safeActiveIndex];
  const hasPrevious = safeActiveIndex > 0;
  const hasNext = safeActiveIndex < media.length - 1;

  function openPhoto(photoIndex: number) {
    if (photoIndex < 0 || photoIndex >= media.length) return;
    setActivePhotoIndex(photoIndex);
  }

  return (
    <Modal
      visible={memory !== null}
      transparent={false}
      animationType="fade"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
      statusBarTranslucent
      navigationBarTranslucent
    >
      <StatusBar hidden />

      <View style={styles.screen}>
        <View style={styles.imageArea}>
          {activeMedia ? (
            <Image
              source={{ uri: activeMedia.localUri }}
              resizeMode="contain"
              style={styles.image}
            />
          ) : null}
        </View>

        <View
          pointerEvents="box-none"
          style={[
            styles.topOverlay,
            {
              paddingTop: insets.top + 10,
              paddingLeft: insets.left + 16,
              paddingRight: insets.right + 16,
            },
          ]}
        >
          <Text style={styles.counter}>
            {media.length > 1 ? `${safeActiveIndex + 1} / ${media.length}` : ""}
          </Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close fullscreen photo"
            onPress={onClose}
            style={({ pressed }) => [
              styles.closeButton,
              pressed ? styles.pressed : null,
            ]}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </Pressable>
        </View>

        {media.length > 1 ? (
          <View
            pointerEvents="box-none"
            style={[
              styles.bottomOverlay,
              {
                paddingBottom: insets.bottom + 14,
                paddingLeft: insets.left + 16,
                paddingRight: insets.right + 16,
              },
            ]}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Previous photo"
              disabled={!hasPrevious}
              onPress={() => openPhoto(safeActiveIndex - 1)}
              style={({ pressed }) => [
                styles.navigationButton,
                !hasPrevious ? styles.disabled : null,
                pressed && hasPrevious ? styles.pressed : null,
              ]}
            >
              <Text style={styles.navigationButtonText}>‹</Text>
            </Pressable>

            <View style={styles.dotRow}>
              {media.map((item, index) => (
                <Pressable
                  key={item.id}
                  accessibilityRole="button"
                  accessibilityLabel={`Open photo ${index + 1}`}
                  onPress={() => openPhoto(index)}
                  style={[
                    styles.dot,
                    index === safeActiveIndex ? styles.activeDot : null,
                  ]}
                />
              ))}
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Next photo"
              disabled={!hasNext}
              onPress={() => openPhoto(safeActiveIndex + 1)}
              style={({ pressed }) => [
                styles.navigationButton,
                !hasNext ? styles.disabled : null,
                pressed && hasNext ? styles.pressed : null,
              ]}
            >
              <Text style={styles.navigationButtonText}>›</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </Modal>
  );
}

// ===============================
// Styles
// ===============================

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000000",
  },
  imageArea: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  topOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#00000055",
  },
  counter: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: "#00000099",
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 36,
    fontWeight: "300",
  },
  bottomOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    backgroundColor: "#00000055",
  },
  navigationButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    backgroundColor: "#00000099",
  },
  navigationButtonText: {
    color: "#FFFFFF",
    fontSize: 36,
    lineHeight: 38,
    fontWeight: "300",
  },
  dotRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#FFFFFF55",
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
  },
  disabled: {
    opacity: 0.25,
  },
  pressed: {
    opacity: 0.65,
  },
});
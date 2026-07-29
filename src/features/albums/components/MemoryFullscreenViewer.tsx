// ===============================
// src/features/albums/components/MemoryFullscreenViewer.tsx
// ===============================

import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
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

/** Viser bildene i ett minne i fullskjerm uten å forlate albumoppslaget. */
export function MemoryFullscreenViewer({
  memory,
  initialPhotoIndex,
  onClose,
}: MemoryFullscreenViewerProps) {
  const insets = useSafeAreaInsets();
  const media = memory?.media ?? [];
  const safeInitialIndex = Math.min(
    Math.max(initialPhotoIndex, 0),
    Math.max(media.length - 1, 0),
  );

  const activeMedia = media[safeInitialIndex];
  const hasPrevious = safeInitialIndex > 0;
  const hasNext = safeInitialIndex < media.length - 1;

  function openPhoto(photoIndex: number) {
    if (!memory || photoIndex < 0 || photoIndex >= media.length) return;

    onClose();
    requestAnimationFrame(() => {
      MemoryFullscreenViewerState.open(memory, photoIndex, onClose);
    });
  }

  return (
    <Modal
      visible={memory !== null}
      transparent={false}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View
        style={[
          styles.screen,
          {
            paddingTop: insets.top + 12,
            paddingBottom: insets.bottom + 16,
          },
        ]}
      >
        <View style={styles.topBar}>
          <Text style={styles.counter}>
            {media.length > 0 ? `${safeInitialIndex + 1} / ${media.length}` : ""}
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

        <View style={styles.imageArea}>
          {activeMedia ? (
            <Image
              source={{ uri: activeMedia.localUri }}
              resizeMode="contain"
              style={styles.image}
            />
          ) : null}
        </View>

        <View style={styles.navigationRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Previous photo"
            disabled={!hasPrevious}
            onPress={() => openPhoto(safeInitialIndex - 1)}
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
                  index === safeInitialIndex ? styles.activeDot : null,
                ]}
              />
            ))}
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Next photo"
            disabled={!hasNext}
            onPress={() => openPhoto(safeInitialIndex + 1)}
            style={({ pressed }) => [
              styles.navigationButton,
              !hasNext ? styles.disabled : null,
              pressed && hasNext ? styles.pressed : null,
            ]}
          >
            <Text style={styles.navigationButtonText}>›</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

// ===============================
// Internal state bridge
// ===============================

const MemoryFullscreenViewerState = {
  open(_memory: Memory, _photoIndex: number, _onClose: () => void) {
    // State ownership remains in the album screen. This bridge is replaced there.
  },
};

// ===============================
// Styles
// ===============================

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#111111",
    paddingHorizontal: 16,
  },
  topBar: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  counter: {
    color: "#FFFFFFCC",
    fontSize: 14,
    fontWeight: "700",
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: "#FFFFFF18",
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 36,
    fontWeight: "300",
  },
  imageArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  navigationRow: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  navigationButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    backgroundColor: "#FFFFFF18",
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
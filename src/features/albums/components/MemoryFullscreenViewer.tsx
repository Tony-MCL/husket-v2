// ===============================
// src/features/albums/components/MemoryFullscreenViewer.tsx
// ===============================

import { useEffect, useMemo, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { Memory } from "../../../models";

// ===============================
// Constants
// ===============================

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;
const SWIPE_THRESHOLD = 70;
const SWIPE_VELOCITY_THRESHOLD = 700;

// ===============================
// Types
// ===============================

type MemoryFullscreenViewerProps = {
  memory: Memory | null;
  initialPhotoIndex: number;
  onClose: () => void;
};

type ZoomablePhotoProps = {
  imageUri: string;
  width: number;
  height: number;
  canShowPrevious: boolean;
  canShowNext: boolean;
  onShowPrevious: () => void;
  onShowNext: () => void;
};

// ===============================
// Helpers
// ===============================

function clamp(value: number, minimum: number, maximum: number): number {
  "worklet";
  return Math.min(Math.max(value, minimum), maximum);
}

// ===============================
// Zoomable photo
// ===============================

function ZoomablePhoto({
  imageUri,
  width,
  height,
  canShowPrevious,
  canShowNext,
  onShowPrevious,
  onShowNext,
}: ZoomablePhotoProps) {
  const scale = useSharedValue(MIN_SCALE);
  const savedScale = useSharedValue(MIN_SCALE);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  useEffect(() => {
    scale.value = MIN_SCALE;
    savedScale.value = MIN_SCALE;
    translateX.value = 0;
    translateY.value = 0;
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
  }, [
    imageUri,
    savedScale,
    savedTranslateX,
    savedTranslateY,
    scale,
    translateX,
    translateY,
  ]);

  const resetTransform = () => {
    "worklet";
    scale.value = withTiming(MIN_SCALE);
    savedScale.value = MIN_SCALE;
    translateX.value = withTiming(0);
    translateY.value = withTiming(0);
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
  };

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      const nextScale = clamp(savedScale.value * event.scale, MIN_SCALE, MAX_SCALE);
      scale.value = nextScale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;

      if (scale.value <= MIN_SCALE + 0.01) {
        resetTransform();
      }
    });

  const panGesture = Gesture.Pan()
    .minDistance(4)
    .onUpdate((event) => {
      if (scale.value > MIN_SCALE + 0.01) {
        const maxTranslateX = ((scale.value - 1) * width) / 2;
        const maxTranslateY = ((scale.value - 1) * height) / 2;

        translateX.value = clamp(
          savedTranslateX.value + event.translationX,
          -maxTranslateX,
          maxTranslateX,
        );
        translateY.value = clamp(
          savedTranslateY.value + event.translationY,
          -maxTranslateY,
          maxTranslateY,
        );
        return;
      }

      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (scale.value > MIN_SCALE + 0.01) {
        savedTranslateX.value = translateX.value;
        savedTranslateY.value = translateY.value;
        return;
      }

      const swipedLeft =
        event.translationX <= -SWIPE_THRESHOLD ||
        event.velocityX <= -SWIPE_VELOCITY_THRESHOLD;
      const swipedRight =
        event.translationX >= SWIPE_THRESHOLD ||
        event.velocityX >= SWIPE_VELOCITY_THRESHOLD;

      if (swipedLeft && canShowNext) {
        runOnJS(onShowNext)();
      } else if (swipedRight && canShowPrevious) {
        runOnJS(onShowPrevious)();
      }

      translateX.value = withTiming(0);
      savedTranslateX.value = 0;
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .maxDuration(250)
    .onEnd(() => {
      if (scale.value > MIN_SCALE + 0.01) {
        resetTransform();
        return;
      }

      scale.value = withTiming(DOUBLE_TAP_SCALE);
      savedScale.value = DOUBLE_TAP_SCALE;
      translateX.value = 0;
      translateY.value = 0;
      savedTranslateX.value = 0;
      savedTranslateY.value = 0;
    });

  const composedGesture = Gesture.Simultaneous(
    pinchGesture,
    Gesture.Race(doubleTapGesture, panGesture),
  );

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={styles.zoomSurface}>
        <Animated.Image
          source={{ uri: imageUri }}
          resizeMode="contain"
          style={[styles.image, animatedImageStyle]}
        />
      </Animated.View>
    </GestureDetector>
  );
}

// ===============================
// Fullscreen viewer
// ===============================

/** Viser bildene i ett minne med zoom, panorering og sveiping. */
export function MemoryFullscreenViewer({
  memory,
  initialPhotoIndex,
  onClose,
}: MemoryFullscreenViewerProps) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
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

  const viewerSize = useMemo(
    () => ({
      width: Math.max(width, 1),
      height: Math.max(height, 1),
    }),
    [height, width],
  );

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

      <GestureHandlerRootView style={styles.screen}>
        <View style={styles.imageArea}>
          {activeMedia ? (
            <ZoomablePhoto
              key={activeMedia.id}
              imageUri={activeMedia.localUri}
              width={viewerSize.width}
              height={viewerSize.height}
              canShowPrevious={hasPrevious}
              canShowNext={hasNext}
              onShowPrevious={() => openPhoto(safeActiveIndex - 1)}
              onShowNext={() => openPhoto(safeActiveIndex + 1)}
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
      </GestureHandlerRootView>
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
    overflow: "hidden",
  },
  zoomSurface: {
    width: "100%",
    height: "100%",
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

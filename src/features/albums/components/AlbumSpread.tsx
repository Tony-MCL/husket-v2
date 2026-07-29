// ===============================
// src/features/albums/components/AlbumSpread.tsx
// ===============================

import { StyleSheet, View } from "react-native";

import type { Memory } from "../../../models";
import { useAppTheme } from "../../../theme/useAppTheme";
import { AlbumPage } from "./AlbumPage";

type AlbumSpreadProps = {
  leftMemory: Memory;
  rightMemory?: Memory;
  isCompact: boolean;
  onOpenMemory: (memoryId: string) => void;
};

// ===============================
// Album spread
// ===============================

/**
 * Viser ett fysisk albumoppslag. På smale skjermer vises bare venstresiden.
 */
export function AlbumSpread({
  leftMemory,
  rightMemory,
  isCompact,
  onOpenMemory,
}: AlbumSpreadProps) {
  const theme = useAppTheme();

  if (isCompact) {
    return (
      <View style={styles.compactPage}>
        <AlbumPage
          memory={leftMemory}
          onPress={() => onOpenMemory(leftMemory.id)}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.spread,
        {
          backgroundColor: theme.colors.surfaceMuted,
          borderColor: theme.colors.border,
          borderRadius: theme.radii.lg,
          padding: theme.spacing.sm,
        },
      ]}
    >
      <View style={styles.pageSlot}>
        <AlbumPage
          memory={leftMemory}
          onPress={() => onOpenMemory(leftMemory.id)}
        />
      </View>

      <View
        pointerEvents="none"
        style={[
          styles.binding,
          {
            backgroundColor: theme.colors.border,
            borderRadius: theme.radii.pill,
          },
        ]}
      />

      <View style={styles.pageSlot}>
        {rightMemory ? (
          <AlbumPage
            memory={rightMemory}
            onPress={() => onOpenMemory(rightMemory.id)}
          />
        ) : (
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={[
              styles.emptyPage,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                borderRadius: theme.radii.lg,
              },
            ]}
          />
        )}
      </View>
    </View>
  );
}

// ===============================
// Styles
// ===============================

const styles = StyleSheet.create({
  compactPage: {
    width: "100%",
  },
  spread: {
    width: "100%",
    flexDirection: "row",
    alignItems: "stretch",
    borderWidth: 1,
    gap: 10,
  },
  pageSlot: {
    flex: 1,
    minWidth: 0,
  },
  binding: {
    width: 4,
    alignSelf: "stretch",
    opacity: 0.7,
  },
  emptyPage: {
    flex: 1,
    minHeight: 420,
    borderWidth: 1,
  },
});

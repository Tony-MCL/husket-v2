// ===============================
// src/types/react-native-compat.d.ts
// ===============================

import "react-native";

/**
 * Midlertidige typeutvidelser for React Native 0.86.
 * Runtime-API-ene brukes allerede av appen, men mangler i de medfølgende typene.
 */
declare module "react-native" {
  interface ImageProps {
    pointerEvents?: "auto" | "none" | "box-none" | "box-only";
  }

  namespace StyleSheet {
    const absoluteFillObject: {
      position: "absolute";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    };
  }
}

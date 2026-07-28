// ===============================
// src/features/library/libraryAssets.ts
// ===============================

import type { ImageSourcePropType } from "react-native";

export const bookshelfAssets = {
  oak: require("../../../assets/bookshelf-oak.png"),
  birch: require("../../../assets/bookshelf-birch.png"),
  white: require("../../../assets/bookshelf-white.png"),
  black: require("../../../assets/bookshelf-black.png"),
  walnut: require("../../../assets/bookshelf-walnut.png"),
} satisfies Record<string, ImageSourcePropType>;

export const libraryWallAsset = require("../../../assets/library-wall.png") as ImageSourcePropType;

export const libraryObjectAssets = {
  camera: require("../../../assets/camera.png"),
  mail: require("../../../assets/mail.png"),
  settingsCup: require("../../../assets/settings-cup.png"),
  pictureFrames: {
    oak: require("../../../assets/picture-frame-oak.png"),
    birch: require("../../../assets/picture-frame-birch.png"),
    white: require("../../../assets/picture-frame-white.png"),
    black: require("../../../assets/picture-frame-black.png"),
    walnut: require("../../../assets/picture-frame-walnut.png"),
  },
} satisfies Record<string, unknown>;

export const albumSpineAssets: ImageSourcePropType[] = [
  require("../../../assets/new_album.png"),
];

export type BookshelfThemeId = keyof typeof bookshelfAssets;

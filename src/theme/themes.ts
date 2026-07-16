import { radii, spacing, typography } from "./tokens";

export type AppTheme = {
  isDark: boolean;
  colors: {
    background: string;
    surface: string;
    surfaceMuted: string;
    text: string;
    textMuted: string;
    border: string;
    accent: string;
    accentText: string;
  };
  spacing: typeof spacing;
  radii: typeof radii;
  typography: typeof typography;
};

export const lightTheme: AppTheme = {
  isDark: false,
  colors: {
    background: "#F7F1E7",
    surface: "#FFFDF9",
    surfaceMuted: "#EEE4D5",
    text: "#2B2926",
    textMuted: "#6F6961",
    border: "#D8CCBC",
    accent: "#566B5B",
    accentText: "#FFFFFF",
  },
  spacing,
  radii,
  typography,
};

export const darkTheme: AppTheme = {
  isDark: true,
  colors: {
    background: "#1E1D1B",
    surface: "#292724",
    surfaceMuted: "#35322E",
    text: "#F7F1E7",
    textMuted: "#C4BBB0",
    border: "#49443E",
    accent: "#AFC2B2",
    accentText: "#1E1D1B",
  },
  spacing,
  radii,
  typography,
};

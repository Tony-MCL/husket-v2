import { useColorScheme } from "react-native";

import { darkTheme, lightTheme } from "./themes";

export function useAppTheme() {
  return useColorScheme() === "dark" ? darkTheme : lightTheme;
}

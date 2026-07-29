// ===============================
// app/index.tsx
// ===============================

import { View } from "react-native";

import { SettingsCupButton } from "../src/features/library/components/SettingsCupButton";
import { LibraryScreen } from "../src/features/library/screens/LibraryScreen";

export default function IndexRoute() {
  return (
    <View style={{ flex: 1 }}>
      <LibraryScreen />
      <SettingsCupButton />
    </View>
  );
}

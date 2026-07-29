// ===============================
// app/index.tsx
// ===============================

import { View } from "react-native";

import { ReceivedMemoryMailStack } from "../src/features/library/components/ReceivedMemoryMailStack";
import { SettingsCupButton } from "../src/features/library/components/SettingsCupButton";
import { LibraryScreen } from "../src/features/library/screens/LibraryScreen";

export default function IndexRoute() {
  return (
    <View style={{ flex: 1 }}>
      <LibraryScreen />
      <ReceivedMemoryMailStack />
      <SettingsCupButton />
    </View>
  );
}

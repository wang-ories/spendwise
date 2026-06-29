import { themeStyle, themes } from "@/styles/theme";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function ScanScreen() {
    const [scans, setScan] = useState([]);
    
  return (
    <SafeAreaProvider
      style={[themeStyle.container, { backgroundColor: themes.background }]}
    >
      <View style={themeStyle.header}>
        <Text style={[themeStyle.title, { color: themes.text }]}>Factures</Text>
        <Text style={[themeStyle.subtitle, { color: themes.textSecondary }]}>
          {scans.length} scans au total
        </Text>
      </View>
    </SafeAreaProvider>
  );
}

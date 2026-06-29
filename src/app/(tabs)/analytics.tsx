import { themes, themeStyle } from "@/styles/theme";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AnalyticsScreen() {
    const [transactions, setTransactions] = useState([]);
    
  return (
    <SafeAreaProvider style={[themeStyle.container, { backgroundColor: themes.background }]}>    
        <View style={themeStyle.header}>
            <Text style={[themeStyle.title, { color: themes.text }]}>Insights</Text>
            <Text style={[themeStyle.subtitle, { color: themes.textSecondary }]}>
            {transactions.length} transactions au total
        </Text>
        </View>
    </SafeAreaProvider>
  );
}

import { BillCard } from "@/components/BiilCard";
import { Bill, vaultService } from "@/service/vaultService";
import { themes, themeStyle } from "@/styles/theme";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
const { width } = Dimensions.get("window");

export default function VaultScreen() {
  const [bills, setBills] = useState<Bill[]>([]);

  const refreshBills = () => {
    vaultService.getBills().then(setBills);
  };

  useFocusEffect(
    useCallback(() => {
      refreshBills();
    }, []),
  );

  return (
    <SafeAreaProvider
      style={[themeStyle.container, { backgroundColor: themes.background }]}
    >
      <View style={themeStyle.header}>
        <Text style={[themeStyle.title, { color: themes.text }]}>
          Your Vault
        </Text>
        <Text style={[themeStyle.subtitle, { color: themes.textSecondary }]}>
          {bills.length} bills au total
        </Text>
      </View>
      <View style={[styles.container, { backgroundColor: themes.background }]}>
        <FlatList
          data={bills}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BillCard item={item} refreshBills={refreshBills} />
          )}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  billCard: {
    width: (width - 60) / 2,
    backgroundColor: themes.surface,
    borderRadius: 15,
    padding: 10,
    margin: 5,
  },
  billImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  billStore: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  billAmount: {
    color: themes.primary,
    fontSize: 12,
  },
});

import { budgetService } from "@/service/expense";
import { vaultService } from "@/service/vaultService";
import { themes, themeStyle } from "@/styles/theme";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function AnalyticsScreen() {
  const [activeTab, setActiveTab] = useState<"expenses" | "vault">("expenses");
  const [stats, setStats] = useState({ total: 0, categories: [] as any[] });

  const loadData = async () => {
    if (activeTab === "expenses") {
      const data = await budgetService.getData();
      processStats(data.transactions, "category");
    } else {
      const data = await vaultService.getBills();
      processStats(data, "store"); // Group by Store for the Vault
    }
  };

  const processStats = (items: any[], key: string) => {
    const map: any = {};
    const colors = [themes.primary, "#A555EC", "#FFB84C", "#FF6464", "#4facfe"];
    let total = 0;

    items.forEach((item) => {
      const groupKey = item[key];
      map[groupKey] = (map[groupKey] || 0) + item.amount;
      total += item.amount;
    });

    const grouped = Object.keys(map).map((name, index) => ({
      name,
      total: map[name],
      color: colors[index % colors.length],
    }));

    setStats({ total, categories: grouped.sort((a, b) => b.total - a.total) });
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [activeTab]),
  );

  return (
    <SafeAreaProvider
      style={[themeStyle.container, { backgroundColor: themes.background }]}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Analytics</Text>

        {/* --- TAB SWITCHER (Segmented Control) --- */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab("expenses")}
            style={[styles.tab, activeTab === "expenses" && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "expenses" && styles.activeTabText,
              ]}
            >
              Expenses
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("vault")}
            style={[styles.tab, activeTab === "vault" && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "vault" && styles.activeTabText,
              ]}
            >
              Vault Bills
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chartCard}>
          {/* Re-use your SVG Donut Logic here using stats.categories and stats.total */}
          <View style={styles.chartPlaceholder}>
            <Text style={styles.totalValue}>${stats.total.toFixed(0)}</Text>
            <Text style={styles.totalLabel}>Total in {activeTab}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          {activeTab === "expenses" ? "By Category" : "By Store (Top Scans)"}
        </Text>

        {stats.categories.map((cat, i) => (
          <View key={i} style={styles.catRow}>
            <View style={styles.catInfo}>
              <View style={[styles.colorDot, { backgroundColor: cat.color }]} />
              <Text style={styles.catName}>{cat.name}</Text>
            </View>
            <Text style={styles.catAmount}>${cat.total.toFixed(2)}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: themes.background },
  scroll: { padding: 25, paddingBottom: 120 },
  title: {
    color: themes.text,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: themes.surface,
    borderRadius: 15,
    padding: 5,
    marginBottom: 25,
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 12 },
  activeTab: { backgroundColor: themes.header },
  tabText: { color: themes.textSecondary, fontWeight: "600" },
  activeTabText: { color: themes.primary },

  chartCard: {
    backgroundColor: themes.header,
    borderRadius: 30,
    padding: 40,
    alignItems: "center",
    marginBottom: 30,
  },
  chartPlaceholder: { alignItems: "center" },
  totalValue: { color: themes.text, fontSize: 36, fontWeight: "bold" },
  totalLabel: { color: themes.textSecondary, fontSize: 12 },

  sectionTitle: {
    color: themes.text,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  catRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 18,
    backgroundColor: themes.surface,
    borderRadius: 20,
    marginBottom: 10,
  },
  catInfo: { flexDirection: "row", alignItems: "center" },
  colorDot: { width: 10, height: 10, borderRadius: 5, marginRight: 15 },
  catName: { color: themes.text, fontWeight: "600" },
  catAmount: { color: themes.text, fontWeight: "bold" },
});

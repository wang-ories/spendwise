import { BudgetCard } from "@/components/BudgetCard";
import { DashboardHeader } from "@/components/DashboardHeader";
import { QuickActions } from "@/components/QuickActions";
import { budgetService } from "@/service/expense";
import { profileService } from "@/service/profile";
import { themes, themeStyle } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const [budget, setBudget] = useState({ spent: 0, total: 0 }); // Budget state
  const [refreshing, setRefreshing] = useState(false); // Refresh state
  const [user, setUser] = useState({ firstName: "", lastName: "" }); // Profile state

  const loadData = async () => {
    // Charger le budget et le profil en parallèle
    const [budgetData, profileData] = await Promise.all([
      budgetService.getData(),
      profileService.getProfile(),
    ]);

    setBudget(budgetData);
    setUser(profileData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  return (
    <SafeAreaProvider style={themeStyle.container}>
      <ScrollView
        contentContainerStyle={themeStyle.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={themes.primary}
          />
        }
      >
        <DashboardHeader
          name={`${user.firstName} ${user.lastName}`}
          theme={themes}
        />
        <BudgetCard spent={budget.spent} total={budget.total} theme={themes} />
        <QuickActions theme={themes} />
        <Text style={styles.sectionTitle}>Recent Bills</Text>
        <TransactionItem
          store="IGA Supermarket"
          date="Today"
          price="-$42.00"
          icon="basket"
        />
        <TransactionItem
          store="Tim Hortons"
          date="Yesterday"
          price="-$12.99"
          icon="logo-apple"
        />
      </ScrollView>
    </SafeAreaProvider>
  );
}

const TransactionItem = ({ store, date, price, icon }: any) => (
  <View style={styles.transCard}>
    <View style={styles.transLeft}>
      <View style={styles.transIcon}>
        <Ionicons name={icon} size={20} color={themes.text} />
      </View>
      <View>
        <Text style={styles.transStore}>{store}</Text>
        <Text style={styles.transDate}>{date}</Text>
      </View>
    </View>
    <Text style={styles.transPrice}>{price}</Text>
  </View>
);

const styles = StyleSheet.create({
  budgetCard: {
    backgroundColor: themes.header,
    borderRadius: 28,
    padding: 20,
    alignItems: "center",
    marginBottom: 25,
  },
  cardLabel: {
    color: themes.textSecondary,
    marginBottom: 10,
  },
  gaugeBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  gaugeText: {
    position: "absolute",
    top: 40,
    alignItems: "center",
  },
  spentAmount: {
    color: themes.text,
    fontSize: 28,
    fontWeight: "bold",
  },
  limitText: {
    color: themes.textSecondary,
    fontSize: 12,
  },
  actionGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  actionBtn: {
    alignItems: "center",
    width: "30%",
  },
  iconCircle: {
    backgroundColor: themes.surface,
    width: 55,
    height: 55,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionLabel: { color: themes.text, fontSize: 12 },
  sectionTitle: {
    color: themes.text,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
  },
  transCard: {
    backgroundColor: themes.surface,
    padding: 15,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  transLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  transIcon: {
    backgroundColor: themes.header,
    padding: 10,
    borderRadius: 12,
    marginRight: 15,
  },
  transStore: {
    color: themes.text,
    fontWeight: "600",
  },
  transDate: {
    color: themes.textSecondary,
    fontSize: 12,
  },
  transPrice: {
    color: themes.primary,
    fontWeight: "bold",
  },
});

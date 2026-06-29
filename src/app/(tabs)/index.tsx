import { BudgetCard } from "@/components/BudgetCard";
import { SetBudgetModal } from "@/components/BudgetModal";
import { DashboardHeader } from "@/components/DashboardHeader";
import { QuickActions } from "@/components/QuickActions";
import { TransactionItem } from "@/components/TransactionItem";
import { budgetService, Transaction } from "@/service/expense";
import { profileService } from "@/service/profile";
import { themes, themeStyle } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const [budgetData, setBudget] = useState({ spent: 0, total: 0, transactions: [] as Transaction[] });

  const [refreshing, setRefreshing] = useState(false); 
  const [user, setUser] = useState({ firstName: "", lastName: "" }); 
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loadData = async () => {
    const [budgetData, profileData] = await Promise.all([
      budgetService.getData(),
      profileService.getProfile(),
    ]);

    setBudget(budgetData);
    setUser(profileData);
  };

  const handleUpdateTotalBudget = async (total: number) => {
    await budgetService.saveTotalBudget(total);
    loadData(); 
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
        <TouchableOpacity onPress={() => setIsModalVisible(true)} activeOpacity={0.9}>
          <BudgetCard spent={budgetData.spent} total={budgetData.total} theme={themes} />

          <View style={styles.editBadge}>
            <Ionicons name="pencil" size={12} color={themes.background} />
            <Text style={styles.editText}>Edit</Text>
          </View>
        </TouchableOpacity>
        <QuickActions theme={themes} />
        <Text style={styles.sectionTitle}>Recent Bills</Text>

        {budgetData.transactions.length > 0 ? (
          budgetData.transactions.slice(0, 3).map((item) => (
            <TransactionItem 
              key={item.id}
              store={item.title} 
              category={item.category}
              date={new Date(item.date).toLocaleDateString()} 
              price={`-$${item.amount}`} 
            />
          ))
        ) : (
          <View style={themeStyle.emptyContainer}>
            <Text style={{ color: themes.textSecondary }}>No recent transactions</Text>
          </View>
        )}
      
      </ScrollView>
      <SetBudgetModal 
        visible={isModalVisible} 
        onClose={() => setIsModalVisible(false)} 
        onSave={handleUpdateTotalBudget} 
        theme={themes}
      />
    </SafeAreaProvider>
  );
}


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
  editBadge: {
    position: 'absolute',
    right: 35,
    top: 20,
    backgroundColor: themes.primary,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignItems: 'center',
    gap: 4
  },
  editText: {
    color: themes.background,
    fontSize: 10,
    fontWeight: 'bold'
  }
});

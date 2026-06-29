import { ExpenseList } from "@/components/ExpenseList";
import { budgetService } from "@/service/expense";
import { themes, themeStyle } from "@/styles/theme";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function TransactionScreen() {
  const [transactions, setTransactions] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchTransactions = async () => {
        const data = await budgetService.getData();
        setTransactions(data.transactions);
      };

      fetchTransactions();
    }, []),
  );

  return (
    <SafeAreaProvider
      style={[themeStyle.container, { backgroundColor: themes.background }]}
    >
      <View style={themeStyle.header}>
        <Text style={[themeStyle.title, { color: themes.text }]}>
          Historique
        </Text>
        <Text style={[themeStyle.subtitle, { color: themes.textSecondary }]}>
          {transactions.length} transactions au total
        </Text>
      </View>

      <View style={themeStyle.listContainer}>
        {transactions.length > 0 ? (
          <ExpenseList transactions={transactions} theme={themes} />
        ) : (
          <View style={themeStyle.emptyState}>
            <Text style={{ color: themes.textSecondary }}>
              Aucune dépense enregistrée
            </Text>
          </View>
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 15,
  },
});

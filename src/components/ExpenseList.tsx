import { themes } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export const ExpenseList = ({ transactions, theme }: any) => {
  const iconMap: { [key: string]: string } = {
    'Food': 'fast-food',
    'Transport': 'car',
    'Shopping': 'cart',
    'Home': 'home',
    'Leisure': 'game-controller',
  };

  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={[styles.item, { backgroundColor: theme.surface }]}>
          <View style={styles.left}>
            <View style={[styles.icon, { backgroundColor: theme.header }]}>
              <Ionicons 
                name={iconMap[item.category] as any || 'cash-outline'} 
                size={22} 
                color={themes.primary} 
              />
            </View>
            <View>
              <Text style={{ color: theme.text, fontWeight: "600" }}>
                {item.title}
              </Text>
              <Text style={{ color: theme.textSecondary, fontSize: 12 }}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
          </View>
          <Text style={{ color: theme.alert, fontWeight: "bold" }}>
            -${item.amount}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
  },
  left: { flexDirection: "row", alignItems: "center" },
  icon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
});

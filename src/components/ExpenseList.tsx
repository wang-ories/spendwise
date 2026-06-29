import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export const ExpenseList = ({ transactions, theme }: any) => {
  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={[styles.item, { backgroundColor: theme.surface }]}>
          <View style={styles.left}>
            <View style={[styles.icon, { backgroundColor: theme.header }]}>
              <Text style={{ fontSize: 20 }}>
                {item.category.split(" ")[0]}
              </Text>
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

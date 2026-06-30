import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ButtonAction } from "./ButtonAction";

export const QuickActions = ({ theme }: { theme: any }) => (
  <View style={styles.actionGrid}>
    <ButtonAction
      icon="cart"
      label="History"
      theme={theme}
      onPress={() => router.push("/transactions")}
    />
    <ButtonAction
      icon="add"
      label="Add Expense"
      theme={theme}
      onPress={() => router.push("/add-expense")}
    />
    <ButtonAction
      icon="pie-chart"
      label="Stats"
      theme={theme}
      onPress={() => router.push("/analytics")}
    />
  </View>
);

const styles = StyleSheet.create({
  actionGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
});

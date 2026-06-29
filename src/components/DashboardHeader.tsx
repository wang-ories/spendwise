import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  name: string;
  theme: any;
}

export const DashboardHeader = ({ name, theme }: HeaderProps) => (
  <View style={styles.topRow}>
    <View>
      <Text style={[styles.greeting, { color: theme.textSecondary }]}>
        Welcome,
      </Text>
      <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
    </View>
    <TouchableOpacity style={[styles.bell, { backgroundColor: theme.surface }]}>
      <Ionicons name="notifications" size={22} color={theme.text} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  greeting: {
    fontSize: 14,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  bell: {
    padding: 10,
    borderRadius: 12,
  },
});

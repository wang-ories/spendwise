import { reminderService } from "@/service/reminder";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  name: string;
  theme: any;
}

export const DashboardHeader = ({ name, theme }: HeaderProps) => {
 const [hasReminders, setHasReminders] = useState(false);

  useEffect(() => {
    reminderService.getReminders().then(list => setHasReminders(list.length > 0));
  }, []);
    
  return (
    <View style={styles.topRow}>
      <View>
        <Text style={[styles.greeting, { color: theme.textSecondary }]}>
          Welcome,
        </Text>
        <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
      </View>
      <TouchableOpacity style={[styles.bell, { backgroundColor: theme.surface }]}>
        <Ionicons name="notifications" size={24} color={theme.text} />
        {hasReminders && (
          <View style={[styles.badge, { backgroundColor: theme.primary }]} />
        )}
      </TouchableOpacity>
    </View>
  );
};

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
  bell: { padding: 12, borderRadius: 15, position: 'relative' },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#1a1a2e', // Même couleur que le fond pour l'effet "découpé"
  }
});

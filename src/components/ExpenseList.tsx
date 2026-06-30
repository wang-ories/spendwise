import { budgetService } from "@/service/expense";
import { themes } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ExpenseListProps {
  transactions: any[];
  theme: any;
  refresh: () => void; // <--- La fonction de rappel
}

export const ExpenseList = ({
  transactions,
  theme,
  refresh,
}: ExpenseListProps) => {
  const iconMap: { [key: string]: string } = {
    Food: "fast-food",
    Transport: "car",
    Shopping: "cart",
    Home: "home",
    Leisure: "game-controller",
  };
  const handleDelete = (id: string, title: string) => {
    Alert.alert("Supprimer", `Voulez-vous supprimer la dépense "${title}" ?`, [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          await budgetService.deleteTransaction(id);
          refresh();
        },
      },
    ]);
  };
  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onLongPress={() => handleDelete(item.id, item.title)}
          activeOpacity={0.7}
        >
          <View style={[styles.item, { backgroundColor: theme.surface }]}>
            <View style={styles.left}>
              <View style={[styles.icon, { backgroundColor: theme.header }]}>
                <Ionicons
                  name={(iconMap[item.category] as any) || "cash-outline"}
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
        </TouchableOpacity>
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

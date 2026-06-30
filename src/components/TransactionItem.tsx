import { themes } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export const TransactionItem = ({ store, category, date, price }: any) => {
  const iconMap: { [key: string]: string } = {
    Food: "fast-food",
    Transport: "car",
    Shopping: "cart",
    Home: "home",
    Leisure: "game-controller",
  };
  const iconName = iconMap[category] || "cash-outline";

  return (
    <View style={[styles.transCard, { backgroundColor: themes.surface }]}>
      <View style={styles.transLeft}>
        <View style={[styles.transIcon, { backgroundColor: themes.header }]}>
          <Ionicons name={iconName as any} size={22} color={themes.primary} />
        </View>
        <View>
          <Text style={styles.transStore}>{store}</Text>
          <Text style={styles.transDate}>{date}</Text>
        </View>
      </View>
      <Text style={styles.transPrice}>{price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  transCard: {
    padding: 15,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  transLeft: { flexDirection: "row", alignItems: "center" },
  transIcon: { padding: 10, borderRadius: 12, marginRight: 15 },
  transStore: { color: themes.text, fontWeight: "600" },
  transDate: { color: themes.textSecondary, fontSize: 12 },
  transPrice: { color: themes.alert, fontWeight: "bold" },
  emptyContainer: {
    padding: 30,
    alignItems: "center",
    backgroundColor: themes.surface,
    borderRadius: 20,
  },
});

import { Bill, vaultService } from "@/service/vaultService";
import { themes } from "@/styles/theme";
import React from "react";
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const { width } = Dimensions.get("window");

interface BillProps {
  item: Bill;
  refreshBills?: () => void;
}

export const BillCard = ({ item, refreshBills }: BillProps) => {
  const confirmDelete = (id: string) => {
    Alert.alert(
      "Supprimer du Vault",
      "Cette action supprimera définitivement l'image de votre téléphone.",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            await vaultService.deleteBill(id);
            refreshBills && refreshBills();
          },
        },
      ],
    );
  };
  return (
    <TouchableOpacity
      onLongPress={() => confirmDelete(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.billCard}>
        <Image source={{ uri: item.imageUri }} style={styles.image} />
        <Text style={styles.store}>{item.store}</Text>
        <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  billCard: {
    width: (width - 60) / 2,
    backgroundColor: themes.surface,
    borderRadius: 15,
    padding: 10,
    margin: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  store: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  amount: {
    color: themes.primary,
    fontSize: 12,
  },
});

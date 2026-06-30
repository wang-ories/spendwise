import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const ButtonAction = ({ icon, label, theme, onPress }: any) => (
  <TouchableOpacity style={styles.action} onPress={onPress}>
    <View style={[styles.icon, { backgroundColor: theme.surface }]}>
      <Ionicons name={icon} size={24} color={theme.primary} />
    </View>
    <Text style={{ color: theme.text, fontSize: 12 }}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  action: { alignItems: "center", width: "25%" },
  icon: {
    width: 55,
    height: 55,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
});

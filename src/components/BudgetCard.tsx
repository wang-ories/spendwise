import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

interface BudgetProps {
  spent: number;
  total: number;
  theme: any;
}

export const BudgetCard = ({ spent, total, theme }: BudgetProps) => {
  const percentage = (spent / total) * 100;

  const getStatusColor = () => {
    if (percentage < 30) return theme.success;
    if (percentage < 50) return theme.warning;
    if (percentage < 75) return theme.orange;
    return theme.alert;
  };

  const statusColor = getStatusColor();

  return (
    <View style={[styles.card, { backgroundColor: theme.header }]}>
      <Text style={{ color: theme.textSecondary, marginBottom: 10 }}>
        Monthly Budget
      </Text>
      <View style={styles.gaugeBox}>
        <Svg width="180" height="100" viewBox="0 0 100 55">
          <Path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke={theme.background}
            strokeWidth="8"
            strokeLinecap="round"
          />
          <Path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke={statusColor} // Dynamic Color
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(Math.min(percentage, 100) * 126) / 100}, 126`}
          />
        </Svg>
        <View style={styles.gaugeText}>
          <Text style={[styles.spentAmount, { color: theme.text }]}>
            ${spent}
          </Text>
          <Text style={{ color: theme.textSecondary, fontSize: 12 }}>
            of ${total}
          </Text>
        </View>
      </View>

      {/* Visual Feedback Text */}
      <Text
        style={{
          color: statusColor,
          fontSize: 12,
          marginTop: 10,
          fontWeight: "bold",
        }}
      >
        {percentage > 100 ? "Over Budget!" : `${percentage.toFixed(0)}% Used`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    padding: 20,
    alignItems: "center",
    marginBottom: 25,
  },
  gaugeBox: { alignItems: "center", justifyContent: "center" },
  gaugeText: { position: "absolute", top: 40, alignItems: "center" },
  spentAmount: { fontSize: 28, fontWeight: "bold" },
});

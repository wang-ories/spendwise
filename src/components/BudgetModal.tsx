import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const SetBudgetModal = ({ visible, onClose, onSave, theme }: any) => {
  const [value, setValue] = useState("");

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={[styles.content, { backgroundColor: theme.surface }]}>
          <Text style={[styles.title, { color: theme.text }]}>
            Modifier le Budget
          </Text>
          <TextInput
            style={[
              styles.input,
              { color: theme.text, borderColor: theme.header },
            ]}
            placeholder="Ex: 1200"
            placeholderTextColor={theme.textSecondary}
            keyboardType="numeric"
            value={value}
            onChangeText={setValue}
            autoFocus
          />
          <View style={styles.row}>
            <TouchableOpacity onPress={onClose} style={styles.btn}>
              <Text style={{ color: theme.textSecondary }}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onSave(Number(value));
                onClose();
              }}
              style={[
                styles.btn,
                styles.saveBtn,
                { backgroundColor: theme.primary },
              ]}
            >
              <Text style={{ color: theme.background, fontWeight: "bold" }}>
                Enregistrer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    padding: 20,
  },
  content: {
    padding: 30,
    borderRadius: 28,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    fontSize: 32,
    textAlign: "center",
    borderBottomWidth: 2,
    marginBottom: 30,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    gap: 20,
  },
  btn: {
    padding: 15,
    borderRadius: 15,
    minWidth: 100,
    alignItems: "center",
  },
  saveBtn: {
    elevation: 5,
  },
});

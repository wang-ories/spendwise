import { vaultService } from "@/service/vaultService";
import { themeStyle, themes } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [store, setStore] = useState("");
  const cameraRef = useRef<any>(null);
  const router = useRouter();

  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <TouchableOpacity onPress={requestPermission} style={styles.btn}>
          <Ionicons name={"camera-outline"} size={25} color={themes.primary} />
          <Text style={styles.btnText}>Grant Camera Access</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync();
      setPhoto(result.uri);
    }
  };

  const handleSaveToVault = async () => {
    if (!photo) return;
    await vaultService.saveBill({
      store: store || "Unknown Store",
      amount: Number(amount) || 0,
      date: new Date().toISOString(),
      imageUri: photo,
    });
    setPhoto(null);
    router.replace("/vault");
  };

  return (
    <View style={themeStyle.container}>
      {!photo ? (
        <CameraView style={styles.camera} ref={cameraRef}>
          <View style={styles.overlay}>
            <View style={styles.viewfinder} />
            <TouchableOpacity style={styles.shutter} onPress={takePicture} />
          </View>
        </CameraView>
      ) : (
        <Modal visible={!!photo} animationType="slide">
          <View style={[styles.modal, { backgroundColor: themes.background }]}>
            <Image source={{ uri: photo }} style={styles.preview} />
            <View style={styles.form}>
              <Text style={styles.label}>Store Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Costco"
                placeholderTextColor="#666"
                onChangeText={setStore}
              />

              <Text style={styles.label}>Total Amount ($)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                keyboardType="numeric"
                placeholderTextColor="#666"
                onChangeText={setAmount}
              />

              <TouchableOpacity
                style={[styles.btn, { backgroundColor: themes.primary }]}
                onPress={handleSaveToVault}
              >
                <Text style={styles.btnText}>Save to Vault</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPhoto(null)}
                style={{ marginTop: 20 }}
              >
                <Text style={{ color: themes.alert }}>Retake</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  viewfinder: {
    width: 280,
    height: 400,
    borderWidth: 2,
    borderColor: themes.primary,
    borderRadius: 20,
  },
  shutter: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 50,
    borderWidth: 5,
    borderColor: "rgba(255,255,255,0.3)",
  },
  modal: { flex: 1, padding: 20, paddingTop: 60 },
  preview: { width: "100%", height: 300, borderRadius: 20, marginBottom: 20 },
  form: { flex: 1 },
  label: { color: themes.textSecondary, marginBottom: 8, fontSize: 12 },
  input: {
    backgroundColor: themes.surface,
    color: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  btn: {
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    color: themes.primary,
    marginTop: 10,
  },
  btnText: {
    fontSize: 12,
    marginTop: 5,
    color: themes.text,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themes.background,
  },
});

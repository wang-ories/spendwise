import AsyncStorage from "@react-native-async-storage/async-storage";
import { File, Paths } from "expo-file-system";

const VAULT_KEY = "spendwise_vault_bills";

export interface Bill {
  id: string;
  store: string;
  amount: number;
  date: string;
  imageUri: string;
}

export const vaultService = {
  saveBill: async (bill: any) => {
    try {
      const id = Date.now().toString();
      const fileName = `bill_${id}.jpg`;

      // 2. Create the source file object from the camera URI
      const sourceFile = new File(bill.imageUri);

      // 3. Use Paths.document to get the permanent storage location
      // Paths.document refers to the app's permanent "Documents" folder
      const destinationFile = new File(Paths.document, fileName);

      // 4. Perform the move
      await sourceFile.move(destinationFile);

      // 5. Save the metadata
      const existingBills = await vaultService.getBills();
      const newBill = {
        ...bill,
        id,
        imageUri: destinationFile.uri, // Use the new permanent URI
      };

      const updatedBills = [newBill, ...existingBills];
      await AsyncStorage.setItem(VAULT_KEY, JSON.stringify(updatedBills));

      return newBill;
    } catch (e) {
      console.error("Vault Save Error:", e);
      throw e;
    }
  },

  getBills: async () => {
    try {
      const data = await AsyncStorage.getItem(VAULT_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error loading bills:", e);
      return [];
    }
  },
  deleteBill: async (id: string) => {
    try {
      const data = await AsyncStorage.getItem(VAULT_KEY);
      let bills = data ? JSON.parse(data) : [];
      const billToDelete = bills.find((b: any) => b.id === id);

      if (billToDelete) {
        const file = new File(billToDelete.imageUri);
        if (file.exists) {
          file.delete();
        }
        const updatedBills = bills.filter((b: any) => b.id !== id);
        await AsyncStorage.setItem(VAULT_KEY, JSON.stringify(updatedBills));
      }
    } catch (e) {
      console.error("Erreur suppression:", e);
    }
  },
};

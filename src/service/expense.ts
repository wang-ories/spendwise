import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@spendwise_data";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export const budgetService = {
  // Récupérer toutes les données (Budget + Transactions)
  getData: async () => {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json
      ? JSON.parse(json)
      : { spent: 0, total: 1000, transactions: [] };
  },

  // Sauvegarder le budget total (Configuration)
  saveTotalBudget: async (total: number) => {
    const data = await budgetService.getData();
    data.total = total;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  // Ajouter une nouvelle dépense
  addExpense: async (title: string, amount: number, category: string) => {
    const data = await budgetService.getData();
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      title,
      amount,
      category,
      date: new Date().toISOString(),
    };
    data.transactions.unshift(newTransaction); // Ajouter au début
    data.spent += amount;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return newTransaction;
  },
};

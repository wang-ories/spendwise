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
  deleteTransaction: async (id: string) => {
    try {
      const data = await budgetService.getData();
      const transactionToDelete = data.transactions.find(
        (t: any) => t.id === id,
      );
      if (transactionToDelete) {
        data.spent -= transactionToDelete.amount;
        data.transactions = data.transactions.filter((t: any) => t.id !== id);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    } catch (e) {
      console.error("Error deleting transaction", e);
    }
  },
  getData: async () => {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json
      ? JSON.parse(json)
      : { spent: 0, total: 1000, transactions: [] };
  },

  saveTotalBudget: async (total: number) => {
    const data = await budgetService.getData();
    data.total = total;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  addExpense: async (title: string, amount: number, category: string) => {
    const data = await budgetService.getData();
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      title,
      amount,
      category,
      date: new Date().toISOString(),
    };
    data.transactions.unshift(newTransaction); // Ajouter au début de la liste pour que les plus récentes apparaissent en premier
    data.spent += amount;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return newTransaction;
  },
};

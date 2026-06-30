import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const NOTIF_ENABLED_KEY = 'settings_notif_enabled';
const REMINDER_KEY = 'spendwise_reminders';

export const reminderService = {
  setNotificationsEnabled: async (enabled: boolean) => {
    await AsyncStorage.setItem(NOTIF_ENABLED_KEY, JSON.stringify(enabled));
  },

  isNotificationsEnabled: async () => {
    const data = await AsyncStorage.getItem(NOTIF_ENABLED_KEY);
    return data ? JSON.parse(data) : true;
  },

  addReminder: async (title: string, date: Date) => {
    const isEnabled = await reminderService.isNotificationsEnabled();
    if (!isEnabled) {
      throw new Error("Notifications are disabled. Please enable them in settings.");
    }

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') return;

    const id = await Notifications.scheduleNotificationAsync({
      content: { title: "SpendWise Reminder 🔔", body: title },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date },
    });

    const data = await AsyncStorage.getItem(REMINDER_KEY);
    const reminders = data ? JSON.parse(data) : [];
    const newReminder = { id, title, date: date.toISOString() };
    await AsyncStorage.setItem(REMINDER_KEY, JSON.stringify([newReminder, ...reminders]));
    return newReminder;
  },
  
  getReminders: async () => {
    const data = await AsyncStorage.getItem(REMINDER_KEY);
    return data ? JSON.parse(data) : [];
  }
};
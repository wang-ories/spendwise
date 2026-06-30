import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications';

const REMINDER_KEY = 'spendwise_reminders';

export interface Reminder {
  id: string;
  title: string;
  date: string;
}

export const reminderService = {
  addReminder: async (title: string, date: Date) => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') return;

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "SpendWise Reminder 🔔",
        body: title,
      },
      trigger: {
        type: SchedulableTriggerInputTypes.DATE, 
        date: date, 
      },
    });

    const data = await AsyncStorage.getItem(REMINDER_KEY);
    const reminders = data ? JSON.parse(data) : [];
    const newReminder = { id, title, date: date.toISOString() };
    
    await AsyncStorage.setItem(REMINDER_KEY, JSON.stringify([newReminder, ...reminders]));
    return newReminder;
  },

  getReminders: async (): Promise<Reminder[]> => {
    const data = await AsyncStorage.getItem(REMINDER_KEY);
    return data ? JSON.parse(data) : [];
  }
};
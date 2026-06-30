import { reminderService } from '@/service/reminder';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface AddReminderModalProps {
  visible: boolean;
  onClose: () => void;
  theme: any;
  onRefresh: () => void;
}

export const AddReminderModal = ({ visible, onClose, theme, onRefresh }: AddReminderModalProps) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [canRemind, setCanRemind] = useState(true);

  useEffect(() => {
    reminderService.isNotificationsEnabled().then(setCanRemind);
  }, [visible]);

  const showAndroidPicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      mode: 'date',
      display: 'calendar',
      onChange: (event, selectedDate) => {
        if (event.type === 'set' && selectedDate) {
          const currentDate = selectedDate;

          DateTimePickerAndroid.open({
            value: currentDate,
            mode: 'time',
            is24Hour: true,
            onChange: (timeEvent, selectedTime) => {
              if (timeEvent.type === 'set' && selectedTime) {
                setDate(selectedTime);
              }
            },
          });
        }
      },
    });
  };

  const handleSave = async () => {
    if (!title.trim()) return;
    
    try {
      await reminderService.addReminder(title, date);
      setTitle('');
      setDate(new Date()); 
      onRefresh(); 
      onClose();
    } catch (error) {
      console.error("Failed to save reminder:", error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={[styles.content, { backgroundColor: theme.surface }]}>
          <Text style={[styles.title, { color: theme.text }]}>New Reminder 🔔</Text>
          
          <Text style={[styles.label, { color: theme.textSecondary }]}>Title</Text>
          <TextInput
            style={[styles.input, { color: theme.text, backgroundColor: theme.header }]}
            placeholder="Buy milk, internet bill..."
            placeholderTextColor={theme.textSecondary}
            value={title}
            onChangeText={setTitle}
            autoFocus={Platform.OS === 'ios'}
          />

          <Text style={[styles.label, { color: theme.textSecondary }]}>Date and Time</Text>
          
          {Platform.OS === 'android' && (
            <TouchableOpacity 
              style={[styles.timeBtn, { backgroundColor: theme.header }]} 
              onPress={showAndroidPicker}
            >
              <Ionicons name="calendar-outline" size={22} color={theme.primary} />
              <View style={styles.timeTextContainer}>
                <Text style={[styles.dateText, { color: theme.text }]}>
                  {date.toLocaleDateString()}
                </Text>
                <Text style={[styles.hourText, { color: theme.primary }]}>
                  {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
            </TouchableOpacity>
          )}

          {Platform.OS === 'ios' && (
            <View style={styles.iosPickerContainer}>
              <DateTimePicker
                value={date}
                mode="datetime"
                display="spinner"
                onChange={(event, selectedDate) => {
                  if (selectedDate) setDate(selectedDate);
                }}
                textColor={theme.text}
                themeVariant="dark"
              />
            </View>
          )}

          <View style={styles.actionRow}>
            <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
              <Text style={{ color: theme.textSecondary, fontWeight: '600' }}>Cancel</Text>
            </TouchableOpacity>
  
            <TouchableOpacity 
              onPress={handleSave} 
              disabled={!title.trim() || !canRemind}
              style={canRemind ? styles.saveBtn : styles.cancelBtn }>
              <Text style={{ color: canRemind ? theme.background : theme.textSecondary }}>
                {canRemind ? "Set Reminder" : "Disabled"}
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
    backgroundColor: 'rgba(0,0,0,0.85)', 
    justifyContent: 'flex-end' 
  },
  content: { 
    padding: 25, 
    borderTopLeftRadius: 35, 
    borderTopRightRadius: 35, 
    minHeight: 450 
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 25, 
    textAlign: 'center' 
  },
  label: { 
    marginBottom: 8, 
    fontSize: 13, 
    fontWeight: '700', 
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  input: { 
    width: '100%', 
    padding: 18, 
    borderRadius: 18, 
    marginBottom: 20, 
    fontSize: 16 
  },
  timeBtn: { 
    flexDirection: 'row', 
    width: '100%', 
    padding: 18, 
    borderRadius: 18, 
    alignItems: 'center', 
    marginBottom: 30 
  },
  timeTextContainer: { 
    flex: 1, 
    marginLeft: 15 
  },
  dateText: { 
    fontSize: 16, 
    fontWeight: '500' 
  },
  hourText: { 
    fontSize: 14, 
    fontWeight: '700',
    marginTop: 2
  },
  iosPickerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  actionRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  cancelBtn: { 
    padding: 15, 
    flex: 1, 
    alignItems: 'center' 
  },
  saveBtn: { 
    paddingVertical: 18, 
    paddingHorizontal: 25, 
    borderRadius: 20, 
    flex: 2, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6
  },
});
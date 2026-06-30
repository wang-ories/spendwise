import { reminderService } from '@/service/reminder';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export const AddReminderModal = ({ visible, onClose, theme, onRefresh }: any) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(Platform.OS === 'ios');

  const handleSave = async () => {
    if (!title) return;
    await reminderService.addReminder(title, date);
    setTitle('');
    onRefresh(); 
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={[styles.content, { backgroundColor: theme.surface }]}>
          <Text style={[styles.title, { color: theme.text }]}>New Reminder 🔔</Text>
          
          <TextInput
            style={[styles.input, { color: theme.text, backgroundColor: theme.header }]}
            placeholder="Buy milk, pay invoice..."
            placeholderTextColor={theme.textSecondary}
            value={title}
            onChangeText={setTitle}
          />

          <Text style={[styles.label, { color: theme.textSecondary }]}>Choose the time</Text>
          
          {(showPicker || Platform.OS === 'ios') && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setShowPicker(Platform.OS === 'ios');
                setDate(currentDate);
              }}
              textColor={theme.text}
              themeVariant="dark"
            />
          )}

          {Platform.OS === 'android' && (
            <TouchableOpacity 
              style={[styles.timeBtn, { backgroundColor: theme.header }]} 
              onPress={() => setShowPicker(true)}
            >
              <Ionicons name="time-outline" size={20} color={theme.primary} />
              <Text style={{ color: theme.text, marginLeft: 10 }}>{date.toLocaleString()}</Text>
            </TouchableOpacity>
          )}

          <View style={styles.row}>
            <TouchableOpacity onPress={onClose} style={styles.btn}>
              <Text style={{ color: theme.textSecondary }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleSave} 
              style={[styles.btn, { backgroundColor: theme.primary }]}
            >
              <Text style={{ color: theme.background, fontWeight: 'bold' }}>Save</Text>
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
    backgroundColor: 'rgba(0,0,0,0.8)', 
    justifyContent: 'flex-end' 
  },
  content: { 
    padding: 30, 
    borderTopLeftRadius: 35, 
    borderTopRightRadius: 35, 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 25 
  },
  label: { 
    alignSelf: 'flex-start', 
    marginBottom: 10, 
    fontSize: 14, 
    fontWeight: '600' 
  },
  input: { 
    width: '100%', 
    padding: 20, 
    borderRadius: 20, 
    marginBottom: 25, 
    fontSize: 16 
  },
  timeBtn: { 
    flexDirection: 'row', 
    width: '100%', 
    padding: 15, 
    borderRadius: 15, 
    alignItems: 'center', 
    marginBottom: 25 
  },
  row: { 
    flexDirection: 'row', 
    gap: 15, 
    marginTop: 10 
  },
  btn: { 
    padding: 18, 
    borderRadius: 20, 
    minWidth: 140, 
    alignItems: 'center' 
  },
});
import { reminderService } from '@/service/reminder';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export const DashboardHeader = ({ theme }: any) => {
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    reminderService.isNotificationsEnabled().then(setIsEnabled);
  }, []);

  const toggleSwitch = async () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    await reminderService.setNotificationsEnabled(newValue);
  };

  return (
    <View style={styles.topRow}>
      <View style={styles.leftContent}>
        <Text style={[styles.appName, { color: theme.primary }]}>SpendWise</Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          Smart expense tracking
        </Text>
      </View>
      
      <View style={[styles.rightContent, { backgroundColor: theme.surface }]}>
        <Ionicons 
          name={isEnabled ? "notifications" : "notifications-off"} 
          size={18} 
          color={isEnabled ? theme.primary : theme.textSecondary} 
        />
        
        <Switch
          trackColor={{ false: theme.header, true: theme.primary + '30' }}
          thumbColor={isEnabled ? theme.primary : theme.textSecondary}
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        />
        
        <Text style={[styles.statusText, { color: isEnabled ? theme.primary : theme.textSecondary }]}>
          {isEnabled ? 'ON' : 'OFF'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 30, 
    alignItems: 'center',
    paddingTop: 10
  },
  leftContent: { 
    flex: 1 
  },
  appName: { 
    fontSize: 24, 
    fontWeight: '900', 
    letterSpacing: -0.5 
  },
  description: { 
    fontSize: 12, 
    marginTop: 2, 
    fontWeight: '500', 
    opacity: 0.8 
  },
  
  rightContent: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 20, // Capsule look
    gap: 2
  },
  statusText: { 
    fontSize: 9, 
    fontWeight: '900', 
    width: 22, 
    textAlign: 'center' 
  }
});
import { budgetService } from '@/service/expense';
import { themes, themeStyle } from '@/styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const CATEGORIES = [
  { id: '1', label: 'Food', icon: 'fast-food', color: '#FF9F43' },
  { id: '2', label: 'Transport', icon: 'car', color: '#4facfe' },
  { id: '3', label: 'Shopping', icon: 'cart', color: '#f093fb' },
  { id: '4', label: 'Home', icon: 'home', color: '#ebedee' },
  { id: '5', label: 'Leisure', icon: 'game-controller', color: '#54e38e' },
];

export default function AddExpenseScreen() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCat, setSelectedCat] = useState(CATEGORIES[0]); 
  const router = useRouter();

  const handleSave = async () => {
    if (!title || !amount) return;
    
    // On envoie le label + l'icône (optionnel) au service
    await budgetService.addExpense(title, Number(amount), selectedCat.label);
    
    router.back(); 
  };


  return (
    <SafeAreaProvider style={themeStyle.container}>
        <View style={themeStyle.header}>
            <Text style={[themeStyle.title, { color: themes.text }]}>Expense</Text>
            <Text style={[themeStyle.subtitle, { color: themes.text }]}>New Expense</Text>
        </View>
        <View style={themeStyle.content}>

        <View style={themeStyle.amountContainer}>
            <Text style={themeStyle.currency}>$</Text>
            <TextInput 
                placeholder="0.00" 
                placeholderTextColor={themes.textSecondary}
                style={themeStyle.amountInput}
                keyboardType="numeric"
                onChangeText={setAmount}
                autoFocus
            />
        </View>

        <TextInput 
            placeholder="Product name or description" 
            placeholderTextColor={themes.textSecondary}
            style={themeStyle.titleInput}
            onChangeText={setTitle}
        />

        <Text style={themeStyle.sectionLabel}>Select Category</Text>
        <View style={themeStyle.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((cat) => (
            <TouchableOpacity 
                key={cat.id}
                onPress={() => setSelectedCat(cat)}
                style={[
                    themeStyle.categoryChip, 
                    { backgroundColor: selectedCat.id === cat.id ? themes.primary : themes.surface }
                ]}
            >
                <Ionicons 
                    name={cat.icon as any} 
                    size={20} 
                    color={selectedCat.id === cat.id ? themes.background : themes.text} 
                />
                <Text style={[
                    themeStyle.categoryLabel, 
                    { color: selectedCat.id === cat.id ? themes.background : themes.text }
                ]}>
                    {cat.label}
                </Text>
            </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
      <TouchableOpacity 
        style={[themeStyle.saveBtn, { backgroundColor: themes.primary }]} 
        onPress={handleSave}
      >
        <Text style={themeStyle.saveBtnText}>Add Expense</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={themeStyle.cancelBtn}>
        <Text style={{ color: themes.textSecondary }}>Cancel</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
}

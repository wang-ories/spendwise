import HomeHeader from '@/components/HomeHeader';
import { themeStyle } from '@/styles/theme';
import { ScrollView, StyleSheet, Text } from 'react-native';

const HomeScreen = () => {
  return (
   <ScrollView style={themeStyle.container}>
      <Text style={themeStyle.title}>SpendWise</Text>
      <HomeHeader />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  date: {
    fontSize: 14,
    color: '#a0a0b0',
    marginTop: 4,
    marginBottom: 30,
  },
});

export default HomeScreen;
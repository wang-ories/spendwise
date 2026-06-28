import { themeStyle } from '@/styles/theme';
import { ScrollView, Text } from 'react-native';

export default function ProductScreen() {
  return (
    <ScrollView style={themeStyle.container}>
      <Text style={themeStyle.title}>Products</Text>
    </ScrollView>
  );
}
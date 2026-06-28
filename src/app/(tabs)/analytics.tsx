import { themeStyle } from '@/styles/theme';
import { ScrollView, Text } from 'react-native';

export default function AnalyticsScreen() {
  return (
    <ScrollView style={themeStyle.container}>
      <Text style={themeStyle.title}>Analytics</Text>
    </ScrollView>
  );
}
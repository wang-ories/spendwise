import { themeStyle } from '@/styles/theme';
import { Text, View } from 'react-native';

export default function ScanScreen() {
  return (
    <View style={themeStyle.container}>
      <Text style={themeStyle.title}>Scan</Text>
    </View>
  );
}
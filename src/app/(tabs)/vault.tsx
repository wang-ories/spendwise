import { themeStyle } from '@/styles/theme';
import { Text, View } from 'react-native';

export default function VaultScreen() {
  return (
    <View style={themeStyle.container}>
      <Text style={themeStyle.title}>Vault</Text>
    </View>
  );
}
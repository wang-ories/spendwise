import { themeStyle } from '@/styles/theme';
import { Text, View } from 'react-native';

export default function AddProductScreen() {
  return (
    <View style={themeStyle.container}>
      <Text style={themeStyle.title}>Add Product</Text>
    </View>
  );
}
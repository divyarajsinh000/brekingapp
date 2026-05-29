import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ad } from '@/api';
import * as WebBrowser from 'expo-web-browser';

interface AdCardProps {
  item: Ad;
}

export default function AdCard({ item }: AdCardProps) {
  const handlePress = async () => {
    try {
      await WebBrowser.openBrowserAsync(item.targetUrl);
    } catch (error) {
      console.error('Error opening ad:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        contentFit="cover"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
});

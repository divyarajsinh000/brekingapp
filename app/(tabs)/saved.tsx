import { View, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import NewsCard from '@/components/NewsCard';
import { useAppStore } from '@/store';
import { NewsItem } from '@/api';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function SavedScreen() {
  const { news, savedNews } = useAppStore();
  const backgroundColor = useThemeColor({}, 'background');

  const savedNewsItems = news.filter((item) => savedNews.includes(item.id));

  const renderItem = ({ item }: { item: NewsItem }) => (
    <NewsCard item={item} />
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ThemedView style={[styles.container, { backgroundColor }]}>
      {savedNewsItems.length > 0 ? (
        <FlatList
          data={savedNewsItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <ThemedText style={styles.emptyText}>No saved news yet</ThemedText>
      )}
    </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});

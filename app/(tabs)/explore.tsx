import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useState } from 'react';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import NewsCard from '@/components/NewsCard';
import { useAppStore } from '@/store';
import { NewsItem } from '@/api';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function SearchScreen() {
  const { news, setSearchQuery, searchQuery } = useAppStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const filteredNews = localQuery
    ? news.filter(
        (item) =>
          item.title.toLowerCase().includes(localQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(localQuery.toLowerCase()) ||
          item.category.name.toLowerCase().includes(localQuery.toLowerCase()) ||
          item.hashtags.some((tag) => tag.toLowerCase().includes(localQuery.toLowerCase()))
      )
    : [];

  const handleSearch = useCallback((text: string) => {
    setLocalQuery(text);
    setSearchQuery(text);
  }, [setSearchQuery]);

  const renderItem = ({ item }: { item: NewsItem }) => (
    <NewsCard item={item} />
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ThemedView style={[styles.container, { backgroundColor }]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: '#f0f0f0', color: textColor }]}
          placeholder="Search news..."
          placeholderTextColor="#888"
          value={localQuery}
          onChangeText={handleSearch}
          autoFocus
        />
      </View>

      {localQuery ? (
        filteredNews.length > 0 ? (
          <FlatList
            data={filteredNews}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <ThemedText style={styles.noResultsText}>No results found</ThemedText>
        )
      ) : (
        <ThemedText style={styles.noResultsText}>Start typing to search...</ThemedText>
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
  searchContainer: {
    padding: 16,
  },
  searchInput: {
    height: 48,
    borderRadius: 24,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});

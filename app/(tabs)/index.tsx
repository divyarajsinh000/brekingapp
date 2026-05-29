import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useEffect } from 'react';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import NewsCard from '@/components/NewsCard';
import AdCard from '@/components/AdCard';
import CategoryFilter from '@/components/CategoryFilter';
import { useAppStore } from '@/store';
import { api, NewsItem, Ad as AdType } from '@/api';
import { useThemeColor } from '@/hooks/use-theme-color';

// Mock data for testing
const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Breaking News: New Technology Announced',
    description: 'A revolutionary new technology has been unveiled that promises to change the way we live and work.',
    content: 'Full content here...',
    category: { id: '1', name: 'Technology', backgroundColor: '#FF6B35', textColor: '#FFFFFF' },
    hashtags: ['BreakingNews', 'Technology', 'Innovation'],
    city: 'New York',
    publishedDate: '2026-05-29',
    images: ['https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800'],
    videos: [],
    reporter: { id: '1', name: 'John Doe', avatar: 'https://i.pravatar.cc/100' },
  },
  {
    id: '2',
    title: 'AI Breakthrough in Healthcare',
    description: 'New AI model developed to detect diseases earlier than ever before.',
    content: 'Full content here...',
    category: { id: '1', name: 'Technology', backgroundColor: '#FF6B35', textColor: '#FFFFFF' },
    hashtags: ['AI', 'Healthcare', 'Tech'],
    city: 'San Francisco',
    publishedDate: '2026-05-28',
    images: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800'],
    videos: [],
    reporter: { id: '3', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/100?img=3' },
  },
  {
    id: '3',
    title: 'Sports Championship Finals Tonight',
    description: 'The much-anticipated championship finals are happening tonight. Don\'t miss the action!',
    content: 'Full content here...',
    category: { id: '2', name: 'Sports', backgroundColor: '#FFB347', textColor: '#121212' },
    hashtags: ['Sports', 'Championship', 'Finals'],
    city: 'Los Angeles',
    publishedDate: '2026-05-28',
    images: ['https://images.unsplash.com/photo-1461896836934-ffe607ba821?w=800'],
    videos: [],
    reporter: { id: '2', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/100?img=2' },
  },
  {
    id: '4',
    title: 'Olympic Team Announced',
    description: 'National Olympic committee reveals final roster for upcoming games.',
    content: 'Full content here...',
    category: { id: '2', name: 'Sports', backgroundColor: '#FFB347', textColor: '#121212' },
    hashtags: ['Olympics', 'Sports', 'Team'],
    city: 'Chicago',
    publishedDate: '2026-05-27',
    images: ['https://images.unsplash.com/photo-1461896836934-ffe607ba821?w=800'],
    videos: [],
    reporter: { id: '4', name: 'Mike Wilson', avatar: 'https://i.pravatar.cc/100?img=4' },
  },
  {
    id: '5',
    title: 'Election Results Update',
    description: 'Latest updates from the national election polls.',
    content: 'Full content here...',
    category: { id: '3', name: 'Politics', backgroundColor: '#121212', textColor: '#FFFFFF' },
    hashtags: ['Election', 'Politics', 'Voting'],
    city: 'Washington D.C.',
    publishedDate: '2026-05-28',
    images: ['https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800'],
    videos: [],
    reporter: { id: '5', name: 'Sarah Lee', avatar: 'https://i.pravatar.cc/100?img=5' },
  },
  {
    id: '6',
    title: 'New Policy on Education',
    description: 'Government announces major reforms in the education sector.',
    content: 'Full content here...',
    category: { id: '3', name: 'Politics', backgroundColor: '#121212', textColor: '#FFFFFF' },
    hashtags: ['Education', 'Policy', 'Politics'],
    city: 'Boston',
    publishedDate: '2026-05-27',
    images: ['https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800'],
    videos: [],
    reporter: { id: '6', name: 'David Chen', avatar: 'https://i.pravatar.cc/100?img=6' },
  },
  {
    id: '7',
    title: 'Blockbuster Movie Premiere',
    description: 'Highly anticipated movie hits theaters this weekend.',
    content: 'Full content here...',
    category: { id: '4', name: 'Entertainment', backgroundColor: '#FF69B4', textColor: '#FFFFFF' },
    hashtags: ['Movies', 'Entertainment', 'Premiere'],
    city: 'Hollywood',
    publishedDate: '2026-05-29',
    images: ['https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800'],
    videos: [],
    reporter: { id: '7', name: 'Lisa Park', avatar: 'https://i.pravatar.cc/100?img=7' },
  },
  {
    id: '8',
    title: 'Music Festival Lineup Revealed',
    description: 'Top artists announced for this year\'s biggest music festival.',
    content: 'Full content here...',
    category: { id: '4', name: 'Entertainment', backgroundColor: '#FF69B4', textColor: '#FFFFFF' },
    hashtags: ['Music', 'Festival', 'Entertainment'],
    city: 'Las Vegas',
    publishedDate: '2026-05-28',
    images: ['https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800'],
    videos: [],
    reporter: { id: '8', name: 'Tom Brown', avatar: 'https://i.pravatar.cc/100?img=8' },
  },
];

const mockAds: AdType[] = [
  { id: '1', imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', targetUrl: 'https://example.com', position: 4 },
];

export default function HomeScreen() {
  const {
    news,
    categories,
    ads,
    selectedCategory,
    setNews,
    setCategories,
    setAds,
    setSelectedCategory,
    isLoading,
    setIsLoading,
    setError,
  } = useAppStore();

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // In real app, uncomment these lines:
      // const [newsData, categoriesData, adsData] = await Promise.all([
      //   api.getNews(),
      //   api.getCategories(),
      //   api.getAds(),
      // ]);
      // setNews(newsData);
      // setCategories(categoriesData);
      // setAds(adsData);

      // Using mock data for now:
      setNews(mockNews);
      setCategories([
        { id: '1', name: 'Technology', backgroundColor: '#FF6B35', textColor: '#FFFFFF' },
        { id: '2', name: 'Sports', backgroundColor: '#FFB347', textColor: '#121212' },
        { id: '3', name: 'Politics', backgroundColor: '#121212', textColor: '#FFFFFF' },
        { id: '4', name: 'Entertainment', backgroundColor: '#FF69B4', textColor: '#FFFFFF' },
      ]);
      setAds(mockAds);
    } catch (err) {
      setError('Failed to load news');
    } finally {
      setIsLoading(false);
    }
  }, [setNews, setCategories, setAds, setIsLoading, setError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredNews = selectedCategory
    ? news.filter((item) => item.category.id === selectedCategory)
    : news;

  const renderItem = ({ item, index }: { item: NewsItem; index: number }) => {
    const shouldShowAd = index > 0 && index % 4 === 0 && ads.length > 0;
    const adIndex = Math.floor(index / 4) - 1;

    return (
      <View>
        {shouldShowAd && adIndex >= 0 && adIndex < ads.length && (
          <AdCard item={ads[adIndex]} />
        )}
        <NewsCard item={item} />
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ThemedView style={[styles.container, { backgroundColor }]}>
        <View style={styles.filterWrapper}>
          <CategoryFilter
            categories={categories}
            selectedCategoryId={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </View>
        {isLoading ? (
          <ThemedText style={styles.loadingText}>Loading...</ThemedText>
        ) : (
          <FlatList
            data={filteredNews}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
            }
          />
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
  filterWrapper: {
    height: 64,
  },
  listContainer: {
    padding: 16,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 50,
  },
});

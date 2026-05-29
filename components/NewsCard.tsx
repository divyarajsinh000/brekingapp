import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors } from '@/constants/theme';
import { NewsItem } from '@/api';
import { formatDate } from '@/utils';
import { shareNews } from '@/utils/share';
import { useAppStore } from '@/store';

interface NewsCardProps {
  item: NewsItem;
}

export default function NewsCard({ item }: NewsCardProps) {
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const { savedNews, toggleSavedNews } = useAppStore();
  const isSaved = savedNews.includes(item.id);

  const handleShare = async () => {
    await shareNews(item.title, item.description);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {item.images.length > 0 && (
        <Image
          source={{ uri: item.images[0] }}
          style={styles.image}
          contentFit="cover"
        />
      )}

      <View style={styles.content}>
        <View style={styles.categoryRow}>
          <View
            style={[
              styles.categoryBadge,
              {
                backgroundColor: item.category.backgroundColor || Colors.brightOrange,
              },
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                { color: item.category.textColor || Colors.white },
              ]}
            >
              {item.category.name}
            </Text>
          </View>
          <Text style={[styles.date, { color: textColor }]}>
            {formatDate(item.publishedDate)}
          </Text>
        </View>

        <Text style={[styles.title, { color: textColor }]} numberOfLines={2}>
          {item.title}
        </Text>

        <Text style={[styles.description, { color: textColor }]} numberOfLines={3}>
          {item.description}
        </Text>

        {item.hashtags.length > 0 && (
          <View style={styles.hashtagsContainer}>
            {item.hashtags.slice(0, 3).map((tag, index) => (
              <Text
                key={index}
                style={[styles.hashtag, { color: Colors.brightOrange }]}
              >
                #{tag}
              </Text>
            ))}
          </View>
        )}

        <View style={styles.footer}>
          <View style={styles.reporterContainer}>
            <Image
              source={{ uri: item.reporter.avatar }}
              style={styles.reporterAvatar}
              contentFit="cover"
            />
            <Text style={[styles.reporterName, { color: textColor }]}>
              {item.reporter.name}
            </Text>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
              <Ionicons
                name="share-outline"
                size={20}
                color={textColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleSavedNews(item.id)}
              style={styles.actionButton}
            >
              <Ionicons
                name={isSaved ? 'bookmark' : 'bookmark-outline'}
                size={20}
                color={isSaved ? Colors.brightOrange : textColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  hashtagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  hashtag: {
    fontSize: 12,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reporterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reporterAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  reporterName: {
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    padding: 4,
  },
});

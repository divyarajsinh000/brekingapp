import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Category } from '@/api';
import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryFilterProps) {
  const textColor = useThemeColor({}, 'text');

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={[
          styles.categoryItem,
          !selectedCategoryId && styles.selectedCategory,
        ]}
        onPress={() => onSelectCategory(null)}
      >
        <Text
          style={[
            styles.categoryText,
            !selectedCategoryId && { color: Colors.white },
            selectedCategoryId && { color: textColor },
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          All
        </Text>
      </TouchableOpacity>

      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryItem,
            {
              backgroundColor:
                selectedCategoryId === category.id
                  ? category.backgroundColor || Colors.brightOrange
                  : 'transparent',
              borderColor:
                selectedCategoryId === category.id
                  ? category.backgroundColor || Colors.brightOrange
                  : '#e0e0e0',
              borderWidth: 1,
            },
          ]}
          onPress={() => onSelectCategory(category.id)}
        >
          <Text
            style={[
              styles.categoryText,
              {
                color:
                  selectedCategoryId === category.id
                    ? category.textColor || Colors.white
                    : textColor,
              },
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
  },
  selectedCategory: {
    backgroundColor: Colors.brightOrange,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

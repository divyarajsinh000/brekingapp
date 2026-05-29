import { create } from 'zustand';
import { NewsItem, Category, Hashtag, City, Ad } from '@/api';

interface AppState {
  news: NewsItem[];
  categories: Category[];
  hashtags: Hashtag[];
  cities: City[];
  ads: Ad[];
  savedNews: string[];
  selectedCategory: string | null;
  selectedHashtag: string | null;
  selectedCities: string[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;

  setNews: (news: NewsItem[]) => void;
  setCategories: (categories: Category[]) => void;
  setHashtags: (hashtags: Hashtag[]) => void;
  setCities: (cities: City[]) => void;
  setAds: (ads: Ad[]) => void;
  toggleSavedNews: (newsId: string) => void;
  setSelectedCategory: (categoryId: string | null) => void;
  setSelectedHashtag: (hashtag: string | null) => void;
  toggleSelectedCity: (cityId: string) => void;
  setSearchQuery: (query: string) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetFilters: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  news: [],
  categories: [],
  hashtags: [],
  cities: [],
  ads: [],
  savedNews: [],
  selectedCategory: null,
  selectedHashtag: null,
  selectedCities: [],
  searchQuery: '',
  isLoading: false,
  error: null,

  setNews: (news) => set({ news }),
  setCategories: (categories) => set({ categories }),
  setHashtags: (hashtags) => set({ hashtags }),
  setCities: (cities) => set({ cities }),
  setAds: (ads) => set({ ads }),
  toggleSavedNews: (newsId) =>
    set((state) => ({
      savedNews: state.savedNews.includes(newsId)
        ? state.savedNews.filter((id) => id !== newsId)
        : [...state.savedNews, newsId],
    })),
  setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),
  setSelectedHashtag: (hashtag) => set({ selectedHashtag: hashtag }),
  toggleSelectedCity: (cityId) =>
    set((state) => ({
      selectedCities: state.selectedCities.includes(cityId)
        ? state.selectedCities.filter((id) => id !== cityId)
        : [...state.selectedCities, cityId],
    })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  resetFilters: () =>
    set({
      selectedCategory: null,
      selectedHashtag: null,
      selectedCities: [],
      searchQuery: '',
    }),
}));

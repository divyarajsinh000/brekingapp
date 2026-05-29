import apiClient from './client';

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  content: string;
  category: { id: string; name: string; backgroundColor?: string; textColor?: string };
  hashtags: string[];
  city: string;
  publishedDate: string;
  images: string[];
  videos: string[];
  reporter: { id: string; name: string; avatar: string };
}

export interface Category {
  id: string;
  name: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface Hashtag {
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
}

export interface Ad {
  id: string;
  imageUrl: string;
  targetUrl: string;
  position: number;
}

export const api = {
  getNews: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    hashtag?: string;
    city?: string[];
    search?: string;
  }) => {
    const response = await apiClient.get('/api/news', { params });
    return response.data;
  },

  getNewsById: async (id: string) => {
    const response = await apiClient.get(`/api/news/${id}`);
    return response.data;
  },

  getCategories: async () => {
    const response = await apiClient.get('/api/categories');
    return response.data;
  },

  getHashtags: async () => {
    const response = await apiClient.get('/api/hashtags');
    return response.data;
  },

  getCities: async () => {
    const response = await apiClient.get('/api/cities');
    return response.data;
  },

  getAds: async () => {
    const response = await apiClient.get('/api/ads');
    return response.data;
  },

  getSavedNews: async () => {
    const response = await apiClient.get('/api/user/saved');
    return response.data;
  },

  saveNews: async (newsId: string) => {
    const response = await apiClient.post('/api/user/saved', { newsId });
    return response.data;
  },

  removeSavedNews: async (newsId: string) => {
    const response = await apiClient.delete('/api/user/saved', { data: { newsId } });
    return response.data;
  },

  registerDeviceToken: async (token: string) => {
    const response = await apiClient.post('/api/notifications/register', { token });
    return response.data;
  },
};

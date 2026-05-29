import { Share } from 'react-native';

const APP_LINK = 'https://example.com/breaking-app'; // Replace with your actual app link

export const shareNews = async (title: string, description: string) => {
  try {
    const shareText = `${title}\n\n${description}\n\n${APP_LINK}`;
    await Share.share({
      message: shareText,
      title: title,
    });
  } catch (error) {
    console.error('Error sharing:', error);
  }
};

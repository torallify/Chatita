import axios from 'axios';
import { Language, MenuAnalysis, InsightCard } from '../types';
import { Platform } from 'react-native';

// Determine the base URL based on the platform
// iOS Simulator: localhost works
// Android Emulator: needs 10.0.2.2
// Physical device: needs your computer's IP address
const getBaseURL = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:3000';
    }
    return 'http://localhost:3000';
  }
  // Production URL would go here
  return 'http://localhost:3000';
};

const API_BASE_URL = getBaseURL();

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds for Claude API calls
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Analyzes a restaurant menu using Claude Vision API
 */
export async function analyzeMenu(
  imageUri: string,
  userPreferences?: string,
  language: Language = 'en'
): Promise<MenuAnalysis> {
  try {
    const formData = new FormData();

    // Add the image file
    const imageFile = {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'menu.jpg',
    } as any;

    formData.append('menuImage', imageFile);
    formData.append('language', language);

    if (userPreferences) {
      formData.append('userPreferences', userPreferences);
    }

    const response = await api.post('/api/analyze-menu', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.success) {
      return response.data.analysis;
    } else {
      throw new Error(response.data.error || 'Failed to analyze menu');
    }
  } catch (error: any) {
    console.error('Error analyzing menu:', error);
    throw new Error(
      error.response?.data?.error ||
      error.message ||
      'Failed to analyze menu. Please try again.'
    );
  }
}

/**
 * Generates weekly insights using Claude Text API
 */
export async function generateInsights(
  userData: {
    meals: any[];
    glucoseReadings: any[];
    moodEntries: any[];
  },
  language: Language = 'en'
): Promise<InsightCard[]> {
  try {
    const response = await api.post('/api/generate-insights', {
      ...userData,
      language,
    });

    if (response.data.success) {
      return response.data.insights.insights;
    } else {
      throw new Error(response.data.error || 'Failed to generate insights');
    }
  } catch (error: any) {
    console.error('Error generating insights:', error);
    throw new Error(
      error.response?.data?.error ||
      error.message ||
      'Failed to generate insights. Please try again.'
    );
  }
}

/**
 * Health check to verify backend is running
 */
export async function checkHealth(): Promise<boolean> {
  try {
    const response = await api.get('/health');
    return response.data.status === 'ok';
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
}

export default api;

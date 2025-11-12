import axios from 'axios';
import { Language, MenuAnalysis, InsightCard, MealAnalysis } from '../types';
import { Platform } from 'react-native';

// Determine the base URL based on the platform
// iOS Simulator: use localhost
// Android Emulator: use 10.0.2.2
// Physical devices: use computer's IP address
const getBaseURL = () => {
  if (__DEV__) {
    // Android Emulator uses special IP
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:3000';
    }
    // iOS Simulator can use localhost
    return 'http://localhost:3000';
  }
  // Production URL would go here
  return 'http://localhost:3000';
};

const API_BASE_URL = getBaseURL();

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds for Claude API calls (image processing can be slow)
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
 * Analyzes a meal photo using Claude Vision API to get nutrition information
 */
export async function analyzeMeal(
  imageUri: string,
  language: Language = 'en'
): Promise<MealAnalysis> {
  try {
    const formData = new FormData();

    // Add the image file
    const imageFile = {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'meal.jpg',
    } as any;

    formData.append('mealImage', imageFile);
    formData.append('language', language);

    const response = await api.post('/api/analyze-meal', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 90000, // 90 seconds for image uploads + AI processing
    });

    if (response.data.success) {
      return response.data.analysis;
    } else {
      throw new Error(response.data.error || 'Failed to analyze meal');
    }
  } catch (error: any) {
    console.error('Error analyzing meal:', error);

    // More detailed error messages
    if (error.code === 'ECONNABORTED') {
      throw new Error('Analysis is taking too long. Please try with a smaller image or check your connection.');
    }

    if (error.response?.status === 500) {
      throw new Error('Server error. Please make sure the backend is running.');
    }

    throw new Error(
      error.response?.data?.error ||
      error.message ||
      'Failed to analyze meal. Please try again.'
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

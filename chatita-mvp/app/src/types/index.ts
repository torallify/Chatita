// Type definitions for Chatita app

export type Language = 'en' | 'es';

export interface GlucoseReading {
  value: number;
  timestamp: string;
  unit: 'mg/dL' | 'mmol/L';
}

export type MoodType = 'happy' | 'neutral' | 'stressed' | 'sad';

export interface MoodEntry {
  mood: MoodType;
  timestamp: string;
  stressLevel?: number; // 1-10
}

export interface Meal {
  id: string;
  name?: string;
  timestamp: string;
  photoUri?: string;
  notes?: string;
  nutrition?: NutritionInfo;
}

export interface NutritionInfo {
  calories?: number;
  carbs?: number;
  protein?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
}

export interface MealAnalysis {
  detectedFoods: string[];
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  portionSize: string;
}

export interface MenuRecommendation {
  dishName: string;
  reason: string;
  tips: string[];
  warnings?: string[];
}

export interface MenuAnalysis {
  recommendations: MenuRecommendation[];
  generalAdvice: string;
}

export interface InsightCard {
  title: string;
  message: string;
  type: 'positive' | 'neutral' | 'suggestion';
  icon: string;
}

export interface UserData {
  glucoseReadings: GlucoseReading[];
  meals: Meal[];
  moodEntries: MoodEntry[];
  language: Language;
  userName?: string;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  daysRequired: number;
  reward: string;
  icon: string;
  achieved: boolean;
  achievedDate?: string;
}

export interface ActivityReminder {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  completed: boolean;
}

export interface DailyTip {
  id: string;
  title: string;
  message: string;
  icon: string;
}

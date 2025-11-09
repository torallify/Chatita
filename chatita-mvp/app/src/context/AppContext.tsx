import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language, GlucoseReading, Meal, MoodEntry, UserData } from '../types';

interface AppContextType {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;

  // Glucose
  glucoseReadings: GlucoseReading[];
  addGlucoseReading: (reading: GlucoseReading) => void;
  currentGlucose: GlucoseReading | null;

  // Meals
  meals: Meal[];
  addMeal: (meal: Meal) => void;

  // Mood
  moodEntries: MoodEntry[];
  addMoodEntry: (entry: MoodEntry) => void;

  // Data management
  clearAllData: () => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LANGUAGE: '@chatita_language',
  GLUCOSE: '@chatita_glucose',
  MEALS: '@chatita_meals',
  MOODS: '@chatita_moods',
};

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [language, setLanguageState] = useState<Language>('en');
  const [glucoseReadings, setGlucoseReadings] = useState<GlucoseReading[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from storage on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const [storedLanguage, storedGlucose, storedMeals, storedMoods] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE),
        AsyncStorage.getItem(STORAGE_KEYS.GLUCOSE),
        AsyncStorage.getItem(STORAGE_KEYS.MEALS),
        AsyncStorage.getItem(STORAGE_KEYS.MOODS),
      ]);

      if (storedLanguage) setLanguageState(storedLanguage as Language);
      if (storedGlucose) setGlucoseReadings(JSON.parse(storedGlucose));
      if (storedMeals) setMeals(JSON.parse(storedMeals));
      if (storedMoods) setMoodEntries(JSON.parse(storedMoods));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const addGlucoseReading = async (reading: GlucoseReading) => {
    try {
      const updated = [reading, ...glucoseReadings].slice(0, 100); // Keep last 100 readings
      await AsyncStorage.setItem(STORAGE_KEYS.GLUCOSE, JSON.stringify(updated));
      setGlucoseReadings(updated);
    } catch (error) {
      console.error('Error saving glucose reading:', error);
    }
  };

  const addMeal = async (meal: Meal) => {
    try {
      const updated = [meal, ...meals].slice(0, 100); // Keep last 100 meals
      await AsyncStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(updated));
      setMeals(updated);
    } catch (error) {
      console.error('Error saving meal:', error);
    }
  };

  const addMoodEntry = async (entry: MoodEntry) => {
    try {
      const updated = [entry, ...moodEntries].slice(0, 100); // Keep last 100 entries
      await AsyncStorage.setItem(STORAGE_KEYS.MOODS, JSON.stringify(updated));
      setMoodEntries(updated);
    } catch (error) {
      console.error('Error saving mood entry:', error);
    }
  };

  const clearAllData = async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.GLUCOSE,
        STORAGE_KEYS.MEALS,
        STORAGE_KEYS.MOODS,
      ]);
      setGlucoseReadings([]);
      setMeals([]);
      setMoodEntries([]);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

  const currentGlucose = glucoseReadings.length > 0 ? glucoseReadings[0] : null;

  const value: AppContextType = {
    language,
    setLanguage,
    glucoseReadings,
    addGlucoseReading,
    currentGlucose,
    meals,
    addMeal,
    moodEntries,
    addMoodEntry,
    clearAllData,
    isLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

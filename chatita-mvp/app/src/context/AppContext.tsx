import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language, GlucoseReading, Meal, MoodEntry, UserData, Milestone } from '../types';

interface AppContextType {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;

  // User
  userName: string;
  setUserName: (name: string) => void;

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

  // Milestones
  milestones: Milestone[];
  startDate: string;
  checkMilestones: () => void;

  // Data management
  clearAllData: () => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LANGUAGE: '@chatita_language',
  USER_NAME: '@chatita_user_name',
  GLUCOSE: '@chatita_glucose',
  MEALS: '@chatita_meals',
  MOODS: '@chatita_moods',
  MILESTONES: '@chatita_milestones',
  START_DATE: '@chatita_start_date',
};

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [language, setLanguageState] = useState<Language>('en');
  const [userName, setUserNameState] = useState<string>('Lucero');
  const [glucoseReadings, setGlucoseReadings] = useState<GlucoseReading[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Load data from storage on mount
  useEffect(() => {
    loadAllData();
  }, []);

  // Initialize milestones
  useEffect(() => {
    initializeMilestones();
  }, []);

  const initializeMilestones = async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEYS.MILESTONES);
    if (!stored) {
      const defaultMilestones: Milestone[] = [
        {
          id: '7-day',
          name: '7 Day Streak',
          description: 'Logged meals for 7 consecutive days',
          daysRequired: 7,
          reward: 'Badge + Care Pack trial',
          icon: '🌟',
          achieved: false,
        },
        {
          id: '21-day',
          name: '21 Day Champion',
          description: 'Maintained consistency for 3 weeks',
          daysRequired: 21,
          reward: 'Pro extension or partner perk',
          icon: '🏆',
          achieved: false,
        },
        {
          id: '60-day',
          name: '60 Day Warrior',
          description: 'Two months of dedicated tracking',
          daysRequired: 60,
          reward: 'Wellness raffle entry',
          icon: '🎖️',
          achieved: false,
        },
        {
          id: '90-day',
          name: 'Chatita Champion',
          description: 'Three months of excellence',
          daysRequired: 90,
          reward: 'Exclusive theme + AI insight previews',
          icon: '👑',
          achieved: false,
        },
        {
          id: '180-day',
          name: 'Hero of the Month',
          description: 'Six months of dedication',
          daysRequired: 180,
          reward: 'Community feature spotlight',
          icon: '🌟',
          achieved: false,
        },
        {
          id: '365-day',
          name: 'Hall of Consistency',
          description: 'One full year of commitment',
          daysRequired: 365,
          reward: '1-month Pro renewal or donation in your name',
          icon: '💎',
          achieved: false,
        },
      ];
      await AsyncStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(defaultMilestones));
      setMilestones(defaultMilestones);
    } else {
      setMilestones(JSON.parse(stored));
    }

    // Set start date if not exists
    const storedStartDate = await AsyncStorage.getItem(STORAGE_KEYS.START_DATE);
    if (!storedStartDate) {
      const today = new Date().toISOString();
      await AsyncStorage.setItem(STORAGE_KEYS.START_DATE, today);
      setStartDate(today);
    } else {
      setStartDate(storedStartDate);
    }
  };

  const checkMilestones = async () => {
    if (!startDate) return;

    const daysSinceStart = Math.floor(
      (new Date().getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
    );

    const updatedMilestones = milestones.map((milestone) => {
      if (!milestone.achieved && daysSinceStart >= milestone.daysRequired) {
        return {
          ...milestone,
          achieved: true,
          achievedDate: new Date().toISOString(),
        };
      }
      return milestone;
    });

    if (JSON.stringify(updatedMilestones) !== JSON.stringify(milestones)) {
      await AsyncStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(updatedMilestones));
      setMilestones(updatedMilestones);
    }
  };

  const loadAllData = async () => {
    try {
      const [storedLanguage, storedUserName, storedGlucose, storedMeals, storedMoods] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE),
        AsyncStorage.getItem(STORAGE_KEYS.USER_NAME),
        AsyncStorage.getItem(STORAGE_KEYS.GLUCOSE),
        AsyncStorage.getItem(STORAGE_KEYS.MEALS),
        AsyncStorage.getItem(STORAGE_KEYS.MOODS),
      ]);

      if (storedLanguage) setLanguageState(storedLanguage as Language);
      if (storedUserName) setUserNameState(storedUserName);
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

  const setUserName = async (name: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_NAME, name);
      setUserNameState(name);
    } catch (error) {
      console.error('Error saving user name:', error);
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
    userName,
    setUserName,
    glucoseReadings,
    addGlucoseReading,
    currentGlucose,
    meals,
    addMeal,
    moodEntries,
    addMoodEntry,
    milestones,
    startDate,
    checkMilestones,
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

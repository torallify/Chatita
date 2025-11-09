// Bilingual translations for Chatita
import { Language } from '../types';

interface Translations {
  home: {
    title: string;
    glucoseLabel: string;
    lastReading: string;
    enterGlucose: string;
    enterValue: string;
    save: string;
    cancel: string;
    moodQuestion: string;
    stressLevel: string;
    dailyTip: string;
    noGlucoseYet: string;
  };
  meals: {
    title: string;
    addMeal: string;
    takeMealPhoto: string;
    uploadMenuPhoto: string;
    analyzeMenu: string;
    analyzing: string;
    recommendations: string;
    generalAdvice: string;
    reason: string;
    tips: string;
    warnings: string;
    logMeal: string;
    addNotes: string;
    notesPlaceholder: string;
  };
  insights: {
    title: string;
    weeklyInsights: string;
    generating: string;
    noDataYet: string;
    logMoreData: string;
  };
  settings: {
    title: string;
    language: string;
    english: string;
    spanish: string;
    notifications: string;
    dailyReminders: string;
    glucoseAlerts: string;
    about: string;
    version: string;
    madeWith: string;
  };
  moods: {
    happy: string;
    neutral: string;
    stressed: string;
    sad: string;
  };
  common: {
    loading: string;
    error: string;
    retry: string;
    close: string;
    success: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    home: {
      title: 'Hello, mija! 💙',
      glucoseLabel: 'Current Glucose',
      lastReading: 'Last reading',
      enterGlucose: 'Enter glucose reading',
      enterValue: 'Enter value (mg/dL)',
      save: 'Save',
      cancel: 'Cancel',
      moodQuestion: 'How are you feeling today?',
      stressLevel: 'Stress level',
      dailyTip: 'Daily Tip from Chatita',
      noGlucoseYet: 'Tap to add your first glucose reading',
    },
    meals: {
      title: 'Meals',
      addMeal: 'Log a Meal',
      takeMealPhoto: 'Take Photo of Meal',
      uploadMenuPhoto: 'Analyze Restaurant Menu',
      analyzeMenu: 'Analyze Menu',
      analyzing: 'Chatita is reading the menu...',
      recommendations: 'Recommendations',
      generalAdvice: 'General Advice',
      reason: 'Why this is good',
      tips: 'How to enjoy it',
      warnings: 'Watch out for',
      logMeal: 'Log This Meal',
      addNotes: 'Add Notes',
      notesPlaceholder: 'What did you have? How did it taste?',
    },
    insights: {
      title: 'Insights',
      weeklyInsights: 'This Week\'s Insights',
      generating: 'Chatita is reviewing your week...',
      noDataYet: 'No insights yet',
      logMoreData: 'Log your meals and glucose to get personalized insights from Chatita',
    },
    settings: {
      title: 'Settings',
      language: 'Language',
      english: 'English',
      spanish: 'Español',
      notifications: 'Notifications',
      dailyReminders: 'Daily Reminders',
      glucoseAlerts: 'Glucose Alerts',
      about: 'About Chatita',
      version: 'Version',
      madeWith: 'Made with love by your abuela 💙',
    },
    moods: {
      happy: 'Happy',
      neutral: 'Neutral',
      stressed: 'Stressed',
      sad: 'Sad',
    },
    common: {
      loading: 'Loading...',
      error: 'Oops! Something went wrong',
      retry: 'Try Again',
      close: 'Close',
      success: 'Success!',
    },
  },
  es: {
    home: {
      title: 'Hola, mija! 💙',
      glucoseLabel: 'Glucosa Actual',
      lastReading: 'Última lectura',
      enterGlucose: 'Ingresa tu glucosa',
      enterValue: 'Ingresa el valor (mg/dL)',
      save: 'Guardar',
      cancel: 'Cancelar',
      moodQuestion: '¿Cómo te sientes hoy?',
      stressLevel: 'Nivel de estrés',
      dailyTip: 'Consejo del Día de Chatita',
      noGlucoseYet: 'Toca para agregar tu primera lectura',
    },
    meals: {
      title: 'Comidas',
      addMeal: 'Registrar Comida',
      takeMealPhoto: 'Tomar Foto de Comida',
      uploadMenuPhoto: 'Analizar Menú de Restaurante',
      analyzeMenu: 'Analizar Menú',
      analyzing: 'Chatita está leyendo el menú...',
      recommendations: 'Recomendaciones',
      generalAdvice: 'Consejo General',
      reason: 'Por qué es bueno',
      tips: 'Cómo disfrutarlo',
      warnings: 'Ten cuidado con',
      logMeal: 'Registrar Esta Comida',
      addNotes: 'Agregar Notas',
      notesPlaceholder: '¿Qué comiste? ¿Cómo estuvo?',
    },
    insights: {
      title: 'Consejos',
      weeklyInsights: 'Consejos de Esta Semana',
      generating: 'Chatita está revisando tu semana...',
      noDataYet: 'Aún no hay consejos',
      logMoreData: 'Registra tus comidas y glucosa para recibir consejos personalizados de Chatita',
    },
    settings: {
      title: 'Configuración',
      language: 'Idioma',
      english: 'English',
      spanish: 'Español',
      notifications: 'Notificaciones',
      dailyReminders: 'Recordatorios Diarios',
      glucoseAlerts: 'Alertas de Glucosa',
      about: 'Acerca de Chatita',
      version: 'Versión',
      madeWith: 'Hecho con amor por tu abuela 💙',
    },
    moods: {
      happy: 'Feliz',
      neutral: 'Neutral',
      stressed: 'Estresado',
      sad: 'Triste',
    },
    common: {
      loading: 'Cargando...',
      error: '¡Ay! Algo salió mal',
      retry: 'Intentar de Nuevo',
      close: 'Cerrar',
      success: '¡Éxito!',
    },
  },
};

export function getTranslations(language: Language): Translations {
  return translations[language];
}

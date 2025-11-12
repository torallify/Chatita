import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { getTranslations } from '../i18n/translations';
import { analyzeMeal } from '../services/api';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { componentStyles } from '../theme/componentStyles';
import { MealAnalysis, Meal } from '../types';

type RootStackParamList = {
  MealAnalysis: {
    imageUri: string;
  };
};

type MealAnalysisRouteProp = RouteProp<RootStackParamList, 'MealAnalysis'>;

export function MealAnalysisScreen() {
  const route = useRoute<MealAnalysisRouteProp>();
  const navigation = useNavigation<any>();
  const { language, addMeal } = useApp();
  const t = getTranslations(language);

  const { imageUri } = route.params;

  const [analysis, setAnalysis] = useState<MealAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    analyzeImage();
  }, []);

  const analyzeImage = async () => {
    try {
      const result = await analyzeMeal(imageUri, language);
      setAnalysis(result);
    } catch (error: any) {
      Alert.alert(
        t.common.error,
        error.message || 'Failed to analyze meal'
      );
      navigation.goBack();
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLogMeal = () => {
    if (!analysis) return;

    const meal: Meal = {
      id: Date.now().toString(),
      name: analysis.detectedFoods.join(', '),
      timestamp: new Date().toISOString(),
      photoUri: imageUri,
      notes: notes,
      nutrition: {
        calories: analysis.calories,
        carbs: analysis.carbs,
        protein: analysis.protein,
        fat: analysis.fat,
        fiber: analysis.fiber,
        sugar: analysis.sugar,
        sodium: analysis.sodium,
      },
    };

    addMeal(meal);

    Alert.alert(
      t.common.success,
      'Meal logged successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  };

  if (isAnalyzing) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Analyzing your meal...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Add Your Meal</Text>

          {/* Meal Image */}
          <Image source={{ uri: imageUri }} style={styles.image} />

          {/* AI Nutrition Analysis */}
          <View style={[styles.card, componentStyles.card]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>✨</Text>
              <Text style={styles.cardTitle}>AI Nutrition Analysis</Text>
            </View>

            <Text style={styles.detectedLabel}>Detected:</Text>
            <Text style={styles.detectedFoods}>
              {analysis.detectedFoods.join(', ')}
            </Text>

            {/* Main Macros */}
            <View style={styles.macrosGrid}>
              <View style={styles.macroCard}>
                <Text style={styles.macroValue}>{analysis.calories}</Text>
                <Text style={styles.macroLabel}>Calories</Text>
              </View>
              <View style={styles.macroCard}>
                <Text style={styles.macroValue}>{analysis.carbs}g</Text>
                <Text style={styles.macroLabel}>Carbs</Text>
              </View>
            </View>

            {/* Secondary Macros */}
            <View style={styles.secondaryMacros}>
              <View style={styles.secondaryMacroItem}>
                <Text style={styles.secondaryMacroLabel}>Protein</Text>
                <Text style={styles.secondaryMacroValue}>{analysis.protein}g</Text>
              </View>
              <View style={styles.secondaryMacroItem}>
                <Text style={styles.secondaryMacroLabel}>Fat</Text>
                <Text style={styles.secondaryMacroValue}>{analysis.fat}g</Text>
              </View>
            </View>

            <View style={styles.secondaryMacros}>
              <View style={styles.secondaryMacroItem}>
                <Text style={styles.secondaryMacroLabel}>Fiber</Text>
                <Text style={styles.secondaryMacroValue}>{analysis.fiber}g</Text>
              </View>
              <View style={styles.secondaryMacroItem}>
                <Text style={styles.secondaryMacroLabel}>Sugar</Text>
                <Text style={styles.secondaryMacroValue}>{analysis.sugar}g</Text>
              </View>
            </View>

            {/* Sodium and Portion */}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Sodium</Text>
              <Text style={styles.detailValue}>{analysis.sodium}mg</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Portion Size</Text>
              <Text style={styles.detailValue}>{analysis.portionSize}</Text>
            </View>
          </View>

          {/* How did you feel? */}
          <View style={[styles.card, componentStyles.card]}>
            <Text style={styles.feelingTitle}>How did you feel?</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="e.g., I felt stressed before lunch..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Log Meal Button */}
          <TouchableOpacity
            style={[componentStyles.button.primary, styles.logButton]}
            onPress={handleLogMeal}
          >
            <Text style={styles.logButtonText}>✓  Log Meal</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  backText: {
    ...typography.body,
    color: colors.primary,
    fontSize: 16,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.primary,
  },
  detectedLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    fontWeight: '600',
    marginBottom: 4,
  },
  detectedFoods: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: 20,
  },
  macrosGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  macroCard: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  macroValue: {
    ...typography.h1,
    color: colors.primary,
    fontSize: 32,
    marginBottom: 4,
  },
  macroLabel: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  secondaryMacros: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  secondaryMacroItem: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  secondaryMacroLabel: {
    ...typography.body,
    color: colors.text.secondary,
  },
  secondaryMacroValue: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.background,
  },
  detailLabel: {
    ...typography.body,
    color: colors.text.secondary,
  },
  detailValue: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  feelingTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: 12,
  },
  notesInput: {
    ...typography.body,
    color: colors.text.primary,
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    borderWidth: 1,
    borderColor: colors.background,
  },
  logButton: {
    marginBottom: 20,
  },
  logButtonText: {
    ...typography.button,
    color: colors.surface,
    textAlign: 'center',
  },
});

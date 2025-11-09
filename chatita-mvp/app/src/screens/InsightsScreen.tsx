import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { getTranslations } from '../i18n/translations';
import { InsightCard } from '../components/InsightCard';
import { generateInsights } from '../services/api';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { componentStyles } from '../theme/componentStyles';
import { InsightCard as InsightCardType } from '../types';

export function InsightsScreen() {
  const { language, meals, glucoseReadings, moodEntries } = useApp();
  const t = getTranslations(language);

  const [insights, setInsights] = useState<InsightCardType[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Auto-generate insights when screen loads if there's enough data
  useEffect(() => {
    if (!hasGenerated && hasEnoughData()) {
      handleGenerateInsights();
    }
  }, []);

  const hasEnoughData = () => {
    return meals.length > 0 || glucoseReadings.length > 0 || moodEntries.length > 0;
  };

  const handleGenerateInsights = async () => {
    if (!hasEnoughData()) {
      Alert.alert(
        t.insights.noDataYet,
        t.insights.logMoreData
      );
      return;
    }

    setIsGenerating(true);

    try {
      const result = await generateInsights(
        {
          meals: meals.slice(0, 20), // Last 20 meals
          glucoseReadings: glucoseReadings.slice(0, 30), // Last 30 readings
          moodEntries: moodEntries.slice(0, 20), // Last 20 mood entries
        },
        language
      );

      setInsights(result);
      setHasGenerated(true);
    } catch (error: any) {
      Alert.alert(
        t.common.error,
        error.message || 'Failed to generate insights. Please check your connection and try again.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>{t.insights.title}</Text>

          {/* Generate Button */}
          {!isGenerating && hasEnoughData() && (
            <TouchableOpacity
              style={[componentStyles.button.primary, styles.generateButton]}
              onPress={handleGenerateInsights}
            >
              <Text style={styles.buttonText}>
                ✨ {hasGenerated ? 'Refresh Insights' : t.insights.weeklyInsights}
              </Text>
            </TouchableOpacity>
          )}

          {/* Loading State */}
          {isGenerating && (
            <View style={[styles.loadingCard, componentStyles.card]}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>{t.insights.generating}</Text>
            </View>
          )}

          {/* Insights Cards */}
          {insights.length > 0 && !isGenerating && (
            <View style={styles.insightsContainer}>
              <Text style={styles.sectionTitle}>{t.insights.weeklyInsights}</Text>
              {insights.map((insight, index) => (
                <InsightCard key={index} insight={insight} />
              ))}
            </View>
          )}

          {/* Empty State */}
          {!hasEnoughData() && !isGenerating && (
            <View style={[styles.emptyCard, componentStyles.card]}>
              <Text style={styles.emptyIcon}>📊</Text>
              <Text style={styles.emptyTitle}>{t.insights.noDataYet}</Text>
              <Text style={styles.emptyText}>{t.insights.logMoreData}</Text>
            </View>
          )}
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
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: 24,
  },
  generateButton: {
    marginBottom: 24,
  },
  buttonText: {
    ...typography.button,
    color: colors.surface,
    textAlign: 'center',
  },
  loadingCard: {
    paddingVertical: 40,
    alignItems: 'center',
    marginBottom: 20,
  },
  loadingText: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: 16,
  },
  insightsContainer: {
    marginTop: 8,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: 16,
  },
  emptyCard: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

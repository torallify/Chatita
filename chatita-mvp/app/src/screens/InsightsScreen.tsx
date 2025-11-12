import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Share,
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
  const { language, meals, glucoseReadings, moodEntries, checkMilestones } = useApp();
  const t = getTranslations(language);

  const [insights, setInsights] = useState<InsightCardType[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Auto-generate insights when screen loads if there's enough data
  useEffect(() => {
    checkMilestones();
    if (!hasGenerated && hasEnoughData()) {
      handleGenerateInsights();
    }
  }, []);

  // Calculate date range (last 7 days)
  const getDateRange = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 7);

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  // Calculate weekly stats
  const calculateStats = () => {
    const last7Days = glucoseReadings.filter((reading) => {
      const readingDate = new Date(reading.timestamp);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - readingDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    });

    const avgGlucose = last7Days.length > 0
      ? Math.round(last7Days.reduce((sum, r) => sum + r.value, 0) / last7Days.length)
      : 0;

    const inRangeCount = last7Days.filter((r) => r.value >= 70 && r.value <= 180).length;
    const inRangePercent = last7Days.length > 0
      ? Math.round((inRangeCount / last7Days.length) * 100)
      : 0;

    const mealsCount = meals.filter((meal) => {
      const mealDate = new Date(meal.timestamp);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - mealDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    }).length;

    return { inRangePercent, avgGlucose, mealsCount };
  };

  const handleShareReport = async () => {
    const stats = calculateStats();
    const message = `📊 My Weekly Health Report\n\n` +
      `${getDateRange()}\n\n` +
      `✅ ${stats.inRangePercent}% In Range\n` +
      `📈 ${stats.avgGlucose} mg/dL Avg Glucose\n` +
      `🍽️ ${stats.mealsCount} Meals Logged\n\n` +
      `Tracked with Chatita - Your health companion 💙`;

    try {
      await Share.share({
        message,
      });
    } catch (error: any) {
      Alert.alert('Error', 'Failed to share report');
    }
  };

  const handleExportInsights = () => {
    Alert.alert(
      'Export Insights',
      'This feature will export your insights to a PDF file. Coming soon!',
      [{ text: 'OK' }]
    );
  };

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

  const stats = calculateStats();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Your Insights</Text>
          <Text style={styles.subtitle}>Patterns from the last 7 days</Text>

          {/* Date Range & Stats Card */}
          {hasEnoughData() && (
            <View style={[styles.statsCard, componentStyles.card]}>
              <View style={styles.dateRange}>
                <Text style={styles.dateIcon}>📅</Text>
                <Text style={styles.dateText}>{getDateRange()}</Text>
              </View>

              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{stats.inRangePercent}%</Text>
                  <Text style={styles.statLabel}>In Range</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{stats.avgGlucose}</Text>
                  <Text style={styles.statLabel}>Avg Glucose</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{stats.mealsCount}</Text>
                  <Text style={styles.statLabel}>Meals Logged</Text>
                </View>
              </View>
            </View>
          )}

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
              {insights.map((insight, index) => (
                <InsightCard key={index} insight={insight} />
              ))}

              {/* Gentle Tip */}
              <View style={[styles.tipCard, componentStyles.card]}>
                <Text style={styles.tipTitle}>Gentle tip</Text>
                <Text style={styles.tipText}>
                  Next time, try eating vegetables first 🥗— it helps slow down sugar absorption.
                </Text>
              </View>

              {/* Encouragement */}
              <Text style={styles.encouragement}>
                You're doing great — small steps matter 💙
              </Text>

              {/* Share and Export Buttons */}
              <TouchableOpacity
                style={[componentStyles.button.primary, styles.shareButton]}
                onPress={handleShareReport}
              >
                <Text style={styles.buttonText}>📤 Share Weekly Report</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[componentStyles.button.secondary, styles.exportButton]}
                onPress={handleExportInsights}
              >
                <Text style={styles.exportButtonText}>Export Insights</Text>
              </TouchableOpacity>
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
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: 20,
  },
  statsCard: {
    marginBottom: 20,
  },
  dateRange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  dateText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...typography.h1,
    color: colors.primary,
    fontSize: 32,
    marginBottom: 4,
  },
  statLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    textAlign: 'center',
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
  tipCard: {
    marginTop: 20,
    backgroundColor: colors.surface,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  tipTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: 8,
  },
  tipText: {
    ...typography.body,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  encouragement: {
    ...typography.body,
    color: colors.primary,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  shareButton: {
    marginBottom: 12,
  },
  exportButton: {
    marginBottom: 20,
  },
  exportButtonText: {
    ...typography.button,
    color: colors.primary,
    textAlign: 'center',
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

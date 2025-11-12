import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { getTranslations } from '../i18n/translations';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { componentStyles } from '../theme/componentStyles';
import { Milestone } from '../types';

export function RewardsScreen() {
  const { language, milestones, startDate, checkMilestones } = useApp();
  const t = getTranslations(language);

  useEffect(() => {
    checkMilestones();
  }, []);

  // Calculate days since start and progress to next milestone
  const getDaysAndProgress = () => {
    if (!startDate) {
      return { daysSinceStart: 0, progress: 0, nextMilestone: milestones[0] };
    }

    const start = new Date(startDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const daysSinceStart = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Find next unachieved milestone
    const nextMilestone = milestones.find((m) => !m.achieved);
    const progress = nextMilestone
      ? (daysSinceStart / nextMilestone.daysRequired) * 100
      : 100;

    return { daysSinceStart, progress: Math.min(progress, 100), nextMilestone };
  };

  const { daysSinceStart, progress, nextMilestone } = getDaysAndProgress();
  const achievedCount = milestones.filter((m) => m.achieved).length;

  const renderMilestoneCard = (milestone: Milestone, index: number) => {
    const isAchieved = milestone.achieved;
    const isNext = !isAchieved && index === achievedCount;

    return (
      <View
        key={milestone.id}
        style={[
          styles.milestoneCard,
          componentStyles.card,
          isAchieved && styles.achievedCard,
          isNext && styles.nextCard,
        ]}
      >
        {/* Badge Icon */}
        <View
          style={[
            styles.badgeContainer,
            isAchieved && styles.achievedBadge,
            !isAchieved && styles.lockedBadge,
          ]}
        >
          <Text style={[styles.badgeIcon, !isAchieved && styles.lockedIcon]}>
            {isAchieved ? milestone.icon : '🔒'}
          </Text>
        </View>

        {/* Milestone Info */}
        <View style={styles.milestoneInfo}>
          <View style={styles.milestoneHeader}>
            <Text
              style={[
                styles.milestoneName,
                !isAchieved && styles.lockedText,
              ]}
            >
              {milestone.name}
            </Text>
            {isAchieved && (
              <View style={styles.achievedBadge}>
                <Text style={styles.achievedText}>✓ Achieved</Text>
              </View>
            )}
            {isNext && (
              <View style={styles.nextBadge}>
                <Text style={styles.nextText}>Next Goal</Text>
              </View>
            )}
          </View>

          <Text
            style={[
              styles.milestoneDescription,
              !isAchieved && styles.lockedText,
            ]}
          >
            {milestone.description}
          </Text>

          <View style={styles.rewardContainer}>
            <Text style={styles.rewardLabel}>🎁 Reward:</Text>
            <Text
              style={[styles.rewardText, !isAchieved && styles.lockedText]}
            >
              {milestone.reward}
            </Text>
          </View>

          {/* Days Required */}
          <View style={styles.daysContainer}>
            <Text style={styles.daysText}>
              {milestone.daysRequired} {milestone.daysRequired === 1 ? 'day' : 'days'}
            </Text>
          </View>

          {/* Achievement Date */}
          {isAchieved && milestone.achievedDate && (
            <Text style={styles.achievedDate}>
              Achieved on{' '}
              {new Date(milestone.achievedDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <Text style={styles.title}>Your Rewards</Text>
          <Text style={styles.subtitle}>Keep up the great work!</Text>

          {/* Progress Summary Card */}
          <View style={[styles.summaryCard, componentStyles.card]}>
            <View style={styles.summaryHeader}>
              <View>
                <Text style={styles.summaryValue}>{daysSinceStart}</Text>
                <Text style={styles.summaryLabel}>Days on Chatita</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View>
                <Text style={styles.summaryValue}>{achievedCount}</Text>
                <Text style={styles.summaryLabel}>Milestones Achieved</Text>
              </View>
            </View>

            {/* Progress to Next Milestone */}
            {nextMilestone && (
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressTitle}>Next Milestone</Text>
                  <Text style={styles.progressText}>
                    {daysSinceStart}/{nextMilestone.daysRequired} days
                  </Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: `${progress}%` }]} />
                </View>
                <Text style={styles.progressSubtext}>
                  {nextMilestone.daysRequired - daysSinceStart} days until{' '}
                  {nextMilestone.name}
                </Text>
              </View>
            )}

            {/* All Achieved */}
            {achievedCount === milestones.length && (
              <View style={styles.allAchievedContainer}>
                <Text style={styles.allAchievedIcon}>🎉</Text>
                <Text style={styles.allAchievedText}>
                  Congratulations! You've achieved all milestones!
                </Text>
              </View>
            )}
          </View>

          {/* Milestones List */}
          <View style={styles.milestonesContainer}>
            <Text style={styles.sectionTitle}>Milestones</Text>
            {milestones.map((milestone, index) => renderMilestoneCard(milestone, index))}
          </View>

          {/* Encouragement */}
          <View style={[styles.encouragementCard, componentStyles.card]}>
            <Text style={styles.encouragementIcon}>💙</Text>
            <Text style={styles.encouragementTitle}>Keep Going!</Text>
            <Text style={styles.encouragementText}>
              Every day you log your meals and track your glucose is a step toward better
              health. We're proud of you!
            </Text>
          </View>
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
    marginBottom: 24,
  },
  summaryCard: {
    marginBottom: 24,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  summaryValue: {
    ...typography.h1,
    color: colors.primary,
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 4,
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 50,
    backgroundColor: colors.background,
  },
  progressSection: {
    borderTopWidth: 1,
    borderTopColor: colors.background,
    paddingTop: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  progressText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressSubtext: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  allAchievedContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  allAchievedIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  allAchievedText: {
    ...typography.body,
    color: colors.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: 16,
  },
  milestonesContainer: {
    marginBottom: 24,
  },
  milestoneCard: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  achievedCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  nextCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  badgeContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievedBadge: {
    backgroundColor: colors.secondary + '20',
  },
  lockedBadge: {
    backgroundColor: colors.background,
  },
  badgeIcon: {
    fontSize: 32,
  },
  lockedIcon: {
    opacity: 0.3,
  },
  milestoneInfo: {
    flex: 1,
  },
  milestoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  milestoneName: {
    ...typography.h3,
    color: colors.text.primary,
    flex: 1,
  },
  lockedText: {
    opacity: 0.5,
  },
  nextBadge: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  nextText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
    fontSize: 10,
  },
  achievedText: {
    ...typography.caption,
    color: colors.secondary,
    fontWeight: '600',
    fontSize: 10,
  },
  milestoneDescription: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  rewardLabel: {
    ...typography.caption,
    color: colors.text.primary,
    fontWeight: '600',
    marginRight: 4,
  },
  rewardText: {
    ...typography.caption,
    color: colors.text.secondary,
    flex: 1,
  },
  daysContainer: {
    alignSelf: 'flex-start',
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 4,
  },
  daysText: {
    ...typography.caption,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  achievedDate: {
    ...typography.caption,
    color: colors.secondary,
    marginTop: 8,
    fontStyle: 'italic',
  },
  encouragementCard: {
    alignItems: 'center',
    marginBottom: 20,
  },
  encouragementIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  encouragementTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: 8,
  },
  encouragementText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});

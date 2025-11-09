import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { componentStyles } from '../theme/componentStyles';
import { InsightCard as InsightCardType } from '../types';

interface InsightCardProps {
  insight: InsightCardType;
}

export function InsightCard({ insight }: InsightCardProps) {
  const getCardColor = (type: InsightCardType['type']) => {
    switch (type) {
      case 'positive':
        return colors.status.success;
      case 'suggestion':
        return colors.status.warning;
      default:
        return colors.primary;
    }
  };

  const cardColor = getCardColor(insight.type);

  return (
    <View style={[styles.container, componentStyles.card]}>
      <View style={styles.header}>
        <Text style={styles.icon}>{insight.icon}</Text>
        <Text style={styles.title}>{insight.title}</Text>
      </View>

      <Text style={styles.message}>{insight.message}</Text>

      <View style={[styles.accentBar, { backgroundColor: cardColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
    flex: 1,
  },
  message: {
    ...typography.body,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
});

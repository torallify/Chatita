import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { componentStyles } from '../theme/componentStyles';

interface DailyTipCardProps {
  title: string;
  message: string;
  icon?: string;
}

export function DailyTipCard({ title, message, icon = '💡' }: DailyTipCardProps) {
  return (
    <View style={[styles.container, componentStyles.card, styles.tipBackground]}>
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  tipBackground: {
    backgroundColor: colors.tipCard,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
});

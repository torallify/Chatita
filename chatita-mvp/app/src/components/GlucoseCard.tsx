import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { componentStyles } from '../theme/componentStyles';
import { GlucoseReading } from '../types';

interface GlucoseCardProps {
  reading: GlucoseReading | null;
  onPress: () => void;
  label: string;
  noDataText: string;
}

export function GlucoseCard({ reading, onPress, label, noDataText }: GlucoseCardProps) {
  const getGlucoseStatus = (value: number) => {
    if (value < 70) return { color: colors.glucose.low, status: 'Low' };
    if (value <= 180) return { color: colors.glucose.inRange, status: 'In Range' };
    return { color: colors.glucose.high, status: 'High' };
  };

  return (
    <TouchableOpacity
      style={[styles.container, componentStyles.card]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.label}>{label}</Text>

      {reading ? (
        <>
          <View style={styles.valueContainer}>
            <Text
              style={[
                styles.value,
                { color: getGlucoseStatus(reading.value).color }
              ]}
            >
              {reading.value}
            </Text>
            <Text style={styles.unit}>{reading.unit}</Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getGlucoseStatus(reading.value).color + '20' }
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: getGlucoseStatus(reading.value).color }
              ]}
            >
              {getGlucoseStatus(reading.value).status}
            </Text>
          </View>

          <Text style={styles.timestamp}>
            {new Date(reading.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </>
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>{noDataText}</Text>
          <Text style={styles.tapHint}>Tap to add</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 28,
  },
  label: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  value: {
    ...typography.glucoseNumber,
  },
  unit: {
    ...typography.h3,
    color: colors.text.secondary,
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 8,
  },
  statusText: {
    ...typography.caption,
    fontWeight: '600',
  },
  timestamp: {
    ...typography.caption,
    color: colors.text.light,
  },
  noDataContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  noDataText: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  tapHint: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
});

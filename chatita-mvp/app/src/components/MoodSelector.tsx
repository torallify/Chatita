import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { MoodType } from '../types';

interface MoodSelectorProps {
  selectedMood?: MoodType;
  onSelectMood: (mood: MoodType) => void;
  moods: {
    happy: string;
    neutral: string;
    stressed: string;
    sad: string;
  };
}

const moodEmojis: Record<MoodType, string> = {
  happy: '😊',
  neutral: '😐',
  stressed: '😰',
  sad: '😢',
};

export function MoodSelector({ selectedMood, onSelectMood, moods }: MoodSelectorProps) {
  const moodOptions: MoodType[] = ['happy', 'neutral', 'stressed', 'sad'];

  return (
    <View style={styles.container}>
      {moodOptions.map((mood) => (
        <TouchableOpacity
          key={mood}
          style={[
            styles.moodButton,
            selectedMood === mood && styles.moodButtonSelected,
          ]}
          onPress={() => onSelectMood(mood)}
          activeOpacity={0.7}
        >
          <Text style={styles.emoji}>{moodEmojis[mood]}</Text>
          <Text
            style={[
              styles.label,
              selectedMood === mood && styles.labelSelected,
            ]}
          >
            {moods[mood]}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  moodButton: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  moodButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight + '30',
  },
  emoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  label: {
    ...typography.caption,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  labelSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useApp } from '../context/AppContext';
import { getTranslations } from '../i18n/translations';
import { analyzeMenu } from '../services/api';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { componentStyles } from '../theme/componentStyles';
import { MenuAnalysis, Meal } from '../types';

export function MealsScreen() {
  const { language, addMeal } = useApp();
  const t = getTranslations(language);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<MenuAnalysis | null>(null);

  const pickImage = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please grant camera roll permissions to upload menu photos'
      );
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
      setAnalysis(null); // Reset previous analysis
    }
  };

  const takePhoto = async () => {
    // Request permission
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please grant camera permissions to take photos'
      );
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
      setAnalysis(null); // Reset previous analysis
    }
  };

  const handleAnalyzeMenu = async () => {
    if (!selectedImage) {
      Alert.alert('No Image', 'Please select or take a photo of the menu first');
      return;
    }

    setIsAnalyzing(true);

    try {
      const result = await analyzeMenu(selectedImage, undefined, language);
      setAnalysis(result);
    } catch (error: any) {
      Alert.alert(
        t.common.error,
        error.message || 'Failed to analyze menu. Please check your connection and try again.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLogMeal = (dishName: string) => {
    if (!selectedImage) return;

    const meal: Meal = {
      id: Date.now().toString(),
      name: dishName,
      timestamp: new Date().toISOString(),
      photoUri: selectedImage,
      notes: analysis?.generalAdvice || '',
    };

    addMeal(meal);

    Alert.alert(
      t.common.success,
      `${dishName} has been logged!`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Reset for next meal
            setSelectedImage(null);
            setAnalysis(null);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>{t.meals.title}</Text>

          {/* Image Selection Buttons */}
          {!selectedImage && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[componentStyles.button.primary, styles.button]}
                onPress={takePhoto}
              >
                <Text style={styles.buttonText}>📸 {t.meals.takeMealPhoto}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[componentStyles.button.secondary, styles.button]}
                onPress={pickImage}
              >
                <Text style={styles.buttonTextSecondary}>🍽️ {t.meals.uploadMenuPhoto}</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Selected Image */}
          {selectedImage && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: selectedImage }} style={styles.image} />

              {!analysis && (
                <TouchableOpacity
                  style={[componentStyles.button.primary, styles.analyzeButton]}
                  onPress={handleAnalyzeMenu}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <ActivityIndicator color={colors.surface} />
                  ) : (
                    <Text style={styles.buttonText}>✨ {t.meals.analyzeMenu}</Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Loading State */}
          {isAnalyzing && (
            <View style={[styles.card, componentStyles.card]}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>{t.meals.analyzing}</Text>
            </View>
          )}

          {/* Analysis Results */}
          {analysis && (
            <View style={styles.resultsContainer}>
              <Text style={styles.sectionTitle}>{t.meals.recommendations}</Text>

              {analysis.recommendations.map((rec, index) => (
                <View key={index} style={[styles.card, componentStyles.card]}>
                  <View style={styles.dishHeader}>
                    <Text style={styles.dishName}>{rec.dishName}</Text>
                    <TouchableOpacity
                      style={styles.logButton}
                      onPress={() => handleLogMeal(rec.dishName)}
                    >
                      <Text style={styles.logButtonText}>{t.meals.logMeal}</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.label}>✅ {t.meals.reason}</Text>
                    <Text style={styles.text}>{rec.reason}</Text>
                  </View>

                  {rec.tips.length > 0 && (
                    <View style={styles.section}>
                      <Text style={styles.label}>💡 {t.meals.tips}</Text>
                      {rec.tips.map((tip, i) => (
                        <Text key={i} style={styles.bulletText}>
                          • {tip}
                        </Text>
                      ))}
                    </View>
                  )}

                  {rec.warnings && rec.warnings.length > 0 && (
                    <View style={styles.section}>
                      <Text style={styles.label}>⚠️ {t.meals.warnings}</Text>
                      {rec.warnings.map((warning, i) => (
                        <Text key={i} style={styles.bulletText}>
                          • {warning}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}

              {/* General Advice */}
              <View style={[styles.card, componentStyles.card, styles.adviceCard]}>
                <Text style={styles.adviceTitle}>💙 {t.meals.generalAdvice}</Text>
                <Text style={styles.adviceText}>{analysis.generalAdvice}</Text>
              </View>

              {/* Reset Button */}
              <TouchableOpacity
                style={[componentStyles.button.secondary, styles.resetButton]}
                onPress={() => {
                  setSelectedImage(null);
                  setAnalysis(null);
                }}
              >
                <Text style={styles.buttonTextSecondary}>📸 Analyze Another Menu</Text>
              </TouchableOpacity>
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
  buttonContainer: {
    gap: 12,
  },
  button: {
    marginBottom: 8,
  },
  buttonText: {
    ...typography.button,
    color: colors.surface,
    textAlign: 'center',
  },
  buttonTextSecondary: {
    ...typography.button,
    color: colors.primary,
    textAlign: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    marginBottom: 16,
  },
  analyzeButton: {
    marginTop: 8,
  },
  card: {
    marginBottom: 16,
  },
  loadingText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 12,
  },
  resultsContainer: {
    marginTop: 8,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: 16,
  },
  dishHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dishName: {
    ...typography.h3,
    color: colors.text.primary,
    flex: 1,
  },
  logButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logButtonText: {
    ...typography.caption,
    color: colors.surface,
    fontWeight: '600',
  },
  section: {
    marginTop: 12,
  },
  label: {
    ...typography.caption,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  text: {
    ...typography.body,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  bulletText: {
    ...typography.body,
    color: colors.text.secondary,
    lineHeight: 22,
    marginLeft: 8,
  },
  adviceCard: {
    backgroundColor: colors.tipCard,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  adviceTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: 8,
  },
  adviceText: {
    ...typography.body,
    color: colors.text.secondary,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  resetButton: {
    marginTop: 8,
    marginBottom: 20,
  },
});

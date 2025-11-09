import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { getTranslations } from '../i18n/translations';
import { GlucoseCard } from '../components/GlucoseCard';
import { MoodSelector } from '../components/MoodSelector';
import { DailyTipCard } from '../components/DailyTipCard';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { componentStyles } from '../theme/componentStyles';
import { MoodType, GlucoseReading, MoodEntry } from '../types';

export function HomeScreen() {
  const {
    language,
    currentGlucose,
    addGlucoseReading,
    addMoodEntry,
  } = useApp();

  const t = getTranslations(language);

  const [showGlucoseModal, setShowGlucoseModal] = useState(false);
  const [glucoseValue, setGlucoseValue] = useState('');
  const [selectedMood, setSelectedMood] = useState<MoodType | undefined>();
  const [stressLevel, setStressLevel] = useState(5);

  const handleSaveGlucose = () => {
    const value = parseFloat(glucoseValue);

    if (isNaN(value) || value <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid glucose value');
      return;
    }

    const reading: GlucoseReading = {
      value,
      timestamp: new Date().toISOString(),
      unit: 'mg/dL',
    };

    addGlucoseReading(reading);
    setGlucoseValue('');
    setShowGlucoseModal(false);
  };

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);

    const entry: MoodEntry = {
      mood,
      timestamp: new Date().toISOString(),
      stressLevel: mood === 'stressed' ? stressLevel : undefined,
    };

    addMoodEntry(entry);
  };

  // Daily tips rotation based on day of week
  const dailyTips = {
    en: [
      { title: 'Hydration', message: 'Mija, drink plenty of water today! It helps your body process sugar better. 💧' },
      { title: 'Movement', message: 'A short walk after meals helps lower blood sugar. Just 10 minutes makes a difference! 🚶‍♀️' },
      { title: 'Vegetables First', message: 'When eating, start with your vegetables. They help slow down sugar absorption. 🥗' },
      { title: 'Sleep Well', message: 'Good sleep helps control blood sugar. Aim for 7-8 hours tonight, mi amor. 😴' },
      { title: 'Portion Control', message: 'Use your hand as a guide: palm for protein, fist for carbs, thumb for fats. 👋' },
      { title: 'Stress Less', message: 'Stress raises blood sugar. Take three deep breaths when you feel overwhelmed. 🧘‍♀️' },
      { title: 'Check Your Feet', message: 'Look at your feet today. Good circulation is important for diabetes management. 👣' },
    ],
    es: [
      { title: 'Hidratación', message: 'Mija, toma mucha agua hoy! Ayuda a tu cuerpo a procesar el azúcar mejor. 💧' },
      { title: 'Movimiento', message: 'Una caminata corta después de comer ayuda a bajar el azúcar. ¡Solo 10 minutos hacen diferencia! 🚶‍♀️' },
      { title: 'Verduras Primero', message: 'Al comer, empieza con tus verduras. Ayudan a que el azúcar se absorba más despacio. 🥗' },
      { title: 'Duerme Bien', message: 'Dormir bien ayuda a controlar el azúcar. Intenta 7-8 horas esta noche, mi amor. 😴' },
      { title: 'Control de Porciones', message: 'Usa tu mano de guía: palma para proteína, puño para carbohidratos, pulgar para grasas. 👋' },
      { title: 'Menos Estrés', message: 'El estrés sube el azúcar. Respira hondo tres veces cuando te sientas abrumada. 🧘‍♀️' },
      { title: 'Revisa Tus Pies', message: 'Mira tus pies hoy. La buena circulación es importante para el manejo de diabetes. 👣' },
    ],
  };

  const today = new Date().getDay();
  const todaysTip = dailyTips[language][today];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <Text style={styles.title}>{t.home.title}</Text>

          {/* Glucose Card */}
          <GlucoseCard
            reading={currentGlucose}
            onPress={() => setShowGlucoseModal(true)}
            label={t.home.glucoseLabel}
            noDataText={t.home.noGlucoseYet}
          />

          {/* Mood Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.home.moodQuestion}</Text>
            <MoodSelector
              selectedMood={selectedMood}
              onSelectMood={handleMoodSelect}
              moods={t.moods}
            />
          </View>

          {/* Daily Tip */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.home.dailyTip}</Text>
            <DailyTipCard
              title={todaysTip.title}
              message={todaysTip.message}
              icon="💙"
            />
          </View>
        </View>
      </ScrollView>

      {/* Glucose Input Modal */}
      <Modal
        visible={showGlucoseModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowGlucoseModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t.home.enterGlucose}</Text>

            <TextInput
              style={[componentStyles.input, styles.input]}
              placeholder={t.home.enterValue}
              keyboardType="numeric"
              value={glucoseValue}
              onChangeText={setGlucoseValue}
              autoFocus
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[componentStyles.button.secondary, styles.button]}
                onPress={() => setShowGlucoseModal(false)}
              >
                <Text style={styles.buttonTextSecondary}>{t.home.cancel}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[componentStyles.button.primary, styles.button]}
                onPress={handleSaveGlucose}
              >
                <Text style={styles.buttonTextPrimary}>{t.home.save}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
  },
  buttonTextPrimary: {
    ...typography.button,
    color: colors.surface,
    textAlign: 'center',
  },
  buttonTextSecondary: {
    ...typography.button,
    color: colors.primary,
    textAlign: 'center',
  },
});

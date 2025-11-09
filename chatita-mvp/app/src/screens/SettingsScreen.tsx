import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { getTranslations } from '../i18n/translations';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { componentStyles } from '../theme/componentStyles';
import { Language } from '../types';

export function SettingsScreen() {
  const { language, setLanguage, clearAllData } = useApp();
  const t = getTranslations(language);

  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [glucoseAlertsEnabled, setGlucoseAlertsEnabled] = React.useState(true);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to delete all your data? This cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            clearAllData();
            Alert.alert('Success', 'All data has been cleared');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>{t.settings.title}</Text>

          {/* Language Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.settings.language}</Text>
            <View style={[styles.card, componentStyles.card]}>
              <TouchableOpacity
                style={[
                  styles.languageOption,
                  language === 'en' && styles.languageOptionActive,
                ]}
                onPress={() => handleLanguageChange('en')}
              >
                <Text
                  style={[
                    styles.languageText,
                    language === 'en' && styles.languageTextActive,
                  ]}
                >
                  🇺🇸 {t.settings.english}
                </Text>
                {language === 'en' && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity
                style={[
                  styles.languageOption,
                  language === 'es' && styles.languageOptionActive,
                ]}
                onPress={() => handleLanguageChange('es')}
              >
                <Text
                  style={[
                    styles.languageText,
                    language === 'es' && styles.languageTextActive,
                  ]}
                >
                  🇲🇽 {t.settings.spanish}
                </Text>
                {language === 'es' && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            </View>
          </View>

          {/* Notifications Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.settings.notifications}</Text>
            <View style={[styles.card, componentStyles.card]}>
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>{t.settings.dailyReminders}</Text>
                  <Text style={styles.settingDescription}>
                    Daily health tips from Chatita
                  </Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: colors.text.light, true: colors.primary }}
                  thumbColor={colors.surface}
                />
              </View>

              <View style={styles.divider} />

              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>{t.settings.glucoseAlerts}</Text>
                  <Text style={styles.settingDescription}>
                    Alerts for high/low readings
                  </Text>
                </View>
                <Switch
                  value={glucoseAlertsEnabled}
                  onValueChange={setGlucoseAlertsEnabled}
                  trackColor={{ false: colors.text.light, true: colors.primary }}
                  thumbColor={colors.surface}
                />
              </View>
            </View>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.settings.about}</Text>
            <View style={[styles.card, componentStyles.card]}>
              <View style={styles.aboutContent}>
                <Text style={styles.aboutEmoji}>💙</Text>
                <Text style={styles.aboutText}>{t.settings.madeWith}</Text>
                <Text style={styles.versionText}>
                  {t.settings.version} 1.0.0
                </Text>
              </View>
            </View>
          </View>

          {/* Danger Zone */}
          <View style={styles.section}>
            <TouchableOpacity
              style={[styles.dangerButton, componentStyles.card]}
              onPress={handleClearData}
            >
              <Text style={styles.dangerButtonText}>🗑️ Clear All Data</Text>
            </TouchableOpacity>
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
    marginBottom: 24,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: 12,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  languageOptionActive: {
    backgroundColor: colors.primaryLight + '30',
  },
  languageText: {
    ...typography.body,
    color: colors.text.primary,
  },
  languageTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  checkmark: {
    ...typography.h2,
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.background,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: 4,
  },
  settingDescription: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  aboutContent: {
    alignItems: 'center',
    padding: 32,
  },
  aboutEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  aboutText: {
    ...typography.body,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  versionText: {
    ...typography.caption,
    color: colors.text.light,
  },
  dangerButton: {
    backgroundColor: colors.status.error + '10',
    borderColor: colors.status.error,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
  },
  dangerButtonText: {
    ...typography.button,
    color: colors.status.error,
  },
});

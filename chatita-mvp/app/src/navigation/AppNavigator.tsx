import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { MealsScreen } from '../screens/MealsScreen';
import { InsightsScreen } from '../screens/InsightsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';
import { getTranslations } from '../i18n/translations';

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  const { language } = useApp();
  const t = getTranslations(language);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.light,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.background,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t.home.title.replace('💙', '').replace('!', '').trim().split(',')[0] || 'Home',
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="🏠" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Meals"
        component={MealsScreen}
        options={{
          tabBarLabel: t.meals.title,
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="🍽️" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          tabBarLabel: t.insights.title,
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="💡" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: t.settings.title,
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="⚙️" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

interface TabIconProps {
  icon: string;
  color: string;
  size: number;
}

function TabIcon({ icon, color, size }: TabIconProps) {
  return (
    <Text
      style={{
        fontSize: size,
        opacity: color === colors.primary ? 1 : 0.5,
      }}
    >
      {icon}
    </Text>
  );
}

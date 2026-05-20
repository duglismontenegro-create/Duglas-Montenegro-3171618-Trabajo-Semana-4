import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import SavedScreen from '../screens/SavedScreen';
import { RootTabParamList, HomeStackParamList } from './types';
import { useSavedStore } from '../stores/savedStore';
import { COLORS } from '../theme';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.white },
        headerTintColor: COLORS.primary,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="HomeList" 
        component={HomeScreen} 
        options={{ title: 'Servicios de Mudanza' }} 
      />
      <Stack.Screen 
        name="HomeDetail" 
        component={DetailScreen} 
        options={({ route }) => ({ title: route.params.title })} 
      />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  const count = useSavedStore((state) => state.savedItems.length);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'cube';

          if (route.name === 'HomeStack') {
            iconName = 'home';
          } else if (route.name === 'Saved') {
            iconName = 'bookmark';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#61DAFB',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HomeStack" 
        component={HomeStackNavigator} 
        options={{ title: 'Inicio' }} 
      />
      <Tab.Screen 
        name="Saved" 
        component={SavedScreen} 
        options={{ 
          title: 'Cotizaciones',
          headerShown: true,
          headerTitle: 'Mis Servicios Guardados',
          headerTintColor: COLORS.primary,
          headerStyle: { backgroundColor: COLORS.white },
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarBadge: count > 0 ? count : undefined
        }} 
      />
    </Tab.Navigator>
  );
}
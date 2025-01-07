import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { YearScreen } from '../screens/YearScreen';

// 临时的占位组件
const MonthScreen = () => null;
const SettingsScreen = () => null;

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Year"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#fff',
          },
        }}
      >
        <Stack.Screen 
          name="Year" 
          component={YearScreen}
        />
        <Stack.Screen 
          name="Month" 
          component={MonthScreen}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 
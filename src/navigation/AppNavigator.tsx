import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

import { useAuth } from '../hooks/useAuth';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={MainNavigator} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Auth" 
        component={AuthNavigator} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { createStackNavigator } from '@react-navigation/stack';

import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user } = useAuth();
  
  return (
    <Stack.Navigator initialRouteName={"Main"}>
      <Stack.Screen name="Auth" component={AuthNavigator} options={
          { headerShown: false }
        }/>
      <Stack.Screen name="Main" component={MainNavigator} options={
        { headerShown: false }
      }/>
    </Stack.Navigator>
  );
}
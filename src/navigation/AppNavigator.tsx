import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthNavigator} options={
          { headerShown: false }
        }/>
        <Stack.Screen name="Main" component={MainNavigator} options={
          { headerShown: false }
        }/>
    </Stack.Navigator>
  );
}
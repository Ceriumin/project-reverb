import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainNavigator from './MainNavigator';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Main" component={MainNavigator} options={
          { headerShown: false }
        }/>
    </Stack.Navigator>
  );
}
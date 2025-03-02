import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { darkTheme, lightTheme } from '../constants/theme';
import AppNavigator from './AppNavigator'; 
import { useColorScheme } from 'react-native';

//Application entry point
export default function Navigation() {

  const start = new Date().getTime();
  const scheme = useColorScheme();
  
  useEffect(() => {
    const end = new Date().getTime();
    console.log(`Navigation rendered in ${end - start}ms`);
  }
  , []);

  return (
    <NavigationContainer theme={scheme === 'dark' ? darkTheme : lightTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}
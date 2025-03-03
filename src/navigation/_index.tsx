import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator'; 

//Application entry point
export default function Navigation() {

  const start = new Date().getTime();
  
  useEffect(() => {
    const end = new Date().getTime();
    console.log(`Navigation rendered in ${end - start}ms`);
  }
  , []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

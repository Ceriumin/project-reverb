import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '../context/AuthContext';
import AppNavigator from './AppNavigator'; 
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { darkTheme, lightTheme } from '../constants/theme';
import { useColorScheme } from 'react-native';

// Loading component to show while checking auth state
const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" />
  </View>
);

// Main navigation component with auth provider
export default function Navigation() {
  const start = new Date().getTime();

  useEffect(() => {
    const end = new Date().getTime();
    console.log(`Navigation rendered in ${end - start}ms`);
  }, []);

  return (
    <AuthProvider>
      <NavigationContent />
    </AuthProvider>
  );
}

// Inner component that uses auth context
function NavigationContent() {
  const { isLoading } = useAuth();
  const scheme = useColorScheme();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer theme={scheme === 'dark' ? darkTheme : lightTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}
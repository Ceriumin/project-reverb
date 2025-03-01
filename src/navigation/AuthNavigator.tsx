import React from 'react';
import { Login, Onboarding, Register } from '../screens/_index';
import { createStackNavigator } from '@react-navigation/stack';

export default function AuthNavigator() {
    const Stack = createStackNavigator();
    
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Onboarding" 
                component={Onboarding} 
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="Login" 
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="Register" 
                component={Register} 
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
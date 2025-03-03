import React from 'react';
import { Login, Onboarding, Register, ForgotPassword } from '../screens/_index';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AuthNavigator() {
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
            <Stack.Screen 
                name="ForgotPassword" 
                component={ForgotPassword} 
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
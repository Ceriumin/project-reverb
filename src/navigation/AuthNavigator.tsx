import React from 'react';
import * as Screens from '@/screens/Auth/_index';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Login" 
                component={Screens.LoginScreen} 
                options={{ 
                    headerShown: false 
                }}
            />
            <Stack.Screen 
                name="Register" 
                component={Screens.RegisterScreen} 
                options={{ 
                    headerShown: false 
                }}
            />
            <Stack.Screen 
                name="ConfirmRegister" 
                component={Screens.ConfirmRegisterScreen} 
                options={{ 
                    headerShown: false 
                }}
            />
        </Stack.Navigator>
    )
}
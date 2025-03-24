import { createStackNavigator } from '@react-navigation/stack';
import * as Screens from '@/screens/Auth/_index';

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
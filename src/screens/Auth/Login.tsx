import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParameters, AuthStackParameters } from '@/constants/_index';
import { useAuth } from '@/hooks/useAuth';

import Button from '../../components/ActionButton';
import InputField from '../../components/InputField';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<NavigationProp<RootStackParameters & AuthStackParameters>>();

    const { signIn, isAuthenticated, signOut } = useAuth();

    const handleLogin = async () => {
        if(isAuthenticated) {
            await signOut();
        }

        try {
            const { isSignedIn } = await signIn({ email, password });
            if(isSignedIn) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }]
                })
            }
        } catch (error) {
            console.log('Error signing in', error);
        } 
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <InputField
                label="Email"
                value={email}
                onChangeText={setEmail}
            />
            <InputField
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button onPress={handleLogin}>Login</Button>
            <Button onPress={() => navigation.navigate('Register')}>Sign Up</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
    
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Button from '../../components/ActionButton';
import InputField from '../../components/InputField';

import { useAuth } from '../../hooks/useAuth';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthStackParameters } from '../../constants/_index';

export default function RegisterScreen () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const { signUp } = useAuth();
    const navigation = useNavigation<NavigationProp<AuthStackParameters>>();

    const handleRegister = async () => {
        try {
            setIsLoading(true);
            const { isSignUpComplete } = await signUp({ email, password });
            if(!isSignUpComplete) {
                navigation.navigate('ConfirmRegister', { username: email.toLowerCase().trim() }); 
            }
        } catch (error) {
            console.log('Error signing up', error);
        } finally {
            setIsLoading(false);
        }


    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
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
            <Button onPress={handleRegister}>Register</Button>
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

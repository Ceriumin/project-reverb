import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, InputField } from '../../components/_index';
import { useAuth } from '../../hooks/_index';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { AuthStackParamList } from '../../constants/_index';

type ConfirmRegisterRouteProp = RouteProp<AuthStackParamList, 'ConfirmSignUp'>;

export default function ConfirmSignUp() {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const navigation = useNavigation();
    const route = useRoute<ConfirmRegisterRouteProp>();
    const { username, givenName } = route.params as { username: string, givenName: string };
    
    const { confirmSignUp } = useAuth();

    const handleConfirmation = async () => {
        if (!code.trim()) {
            Alert.alert('Error', 'Please enter the verification code');
            return;
        }

        try {
            setIsLoading(true);
            await confirmSignUp(username, code, 'password');
            Alert.alert(
                'Success', 
                `Welcome ${givenName}! Your account has been verified successfully`,
                [
                    {
                        text: 'OK',
                        //onPress: () => navigation.navigate('Login')
                    }
                ]
            );
        } catch (error) {
            Alert.alert(
                'Verification Failed',
                (error as Error).message
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Verify Your Account
            </Text>
            
            <Text style={styles.description}>
                Please enter the verification code sent to {username}
            </Text>

            <InputField 
                label="Verification Code"
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                style={styles.input}
            />

            <Button
                onPress={handleConfirmation}
                variant="full"
                isElevated
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    {isLoading ? 'Verifying...' : 'Verify Account'}
                </Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30
    },
    input: {
        width: '100%',
        marginBottom: 20
    },
    button: {
        width: '90%',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        marginTop: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    }
});
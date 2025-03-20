import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { AuthStackParameters } from '../../constants/_index';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { useAuth } from '../../hooks/useAuth';

import Button from '../../components/ActionButton';
import InputField from '../../components/InputField';

type ConfirmRegisterRouteProp = RouteProp<AuthStackParameters, 'ConfirmRegister'>;

export default function ConfirmRegisterScreen() {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation<NavigationProp<AuthStackParameters, 'ConfirmRegister'>>();
    const route = useRoute<ConfirmRegisterRouteProp>();
    const { username } = route.params as { username: string };

    const { confirmSignUp } = useAuth();
    
    const handleConfirm = async () => {
        if(!code.trim()) {
            Alert.alert('Error', 'Confirmation code is required');
            return;
        }

        try {
            setIsLoading(true);
            await confirmSignUp({ email: username, code });
            navigation.navigate('Login');
        } catch (err) {
            Alert.alert('Error', (err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Confirm Account</Text>
            <InputField
                label="Confirmation Code"
                value={code}
                onChangeText={setCode}
            />
            <Button  onPress={handleConfirm}>Confirm</Button>
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



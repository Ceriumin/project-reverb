import React, {useState} from 'react';
import { Button, Text, InputField } from '../../components/_index';
import { View, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../hooks/_index';
//import * as Validation from '../../helpers/AuthValidation';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../constants/_index';


export default function Register() {
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading ] = useState(false);

    const { signUp } = useAuth();

    const handleRegistration = async () => {
        try { 
            setIsLoading(true);
            const { isSignUpComplete, nextStep } = await signUp(
                email,
                password,
            );
    
            if (!isSignUpComplete && nextStep === 'CONFIRM_SIGN_UP') {
                Alert.alert(
                    'Verification Required',
                    'Please check your email for a verification code.',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('ConfirmSignUp', { 
                                username: email,
                            })
                        }
                    ]
                );
            }
        } catch (err) {
            Alert.alert('Registration Error', (err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <InputField 
                label='Email'
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType='email-address'
            />
            <InputField 
                label='Password'
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <Button
                onPress={handleRegistration} 
                variant='full'
                isElevated
                style={styles.button}
            >
                <Text style={styles.button_text}>
                    {isLoading ? 'Registering...' : 'Register'}
                </Text>            
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    button_text: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white'
    }
});
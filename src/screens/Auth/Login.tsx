import React, {useState} from 'react';
import { Button, Text, InputField } from '../../components/_index';
import { View, StyleSheet, Alert} from 'react-native';
import { RootStackParamList, AuthStackParamList } from '../../constants/StackParameters';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useAuth } from '../../hooks/_index';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<NavigationProp<RootStackParamList & AuthStackParamList>>();
    
    const { signIn, isAuthenticated, signOut } = useAuth();

    const logIn = async () => {
        if (isAuthenticated) {
            Alert.alert(
                'Already Signed In',
                'You are already signed in. Would you like to sign out?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Sign Out',
                        onPress: async () => {
                            await signOut?.();
                        },
                        style: 'destructive'
                    }
                ]
            );
            return;
        }

        try {
            const { isSignedIn } = await signIn(email, password);
            if (isSignedIn) {
                Alert.alert('Success', 'You have successfully signed in.');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                });
            }
        } catch (error) {
            Alert.alert('Error', 'Unable to sign in. Please try again.');
            console.error('Error signing in:', error);
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Log In
            </Text>
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
                onPress={logIn} 
                variant='full'
                isElevated
                style={styles.button}
            >
                <Text style={styles.button_text}>Log In</Text>
            </Button>
            <Button
                onPress={() => navigation.navigate('Register')} 
                variant='full'
                isElevated
                style={styles.button}
            >
                <Text style={styles.button_text}>Register</Text>
            </Button>
            <Button
                onPress={() => navigation.navigate('ForgotPassword')}
                variant='text'
            >
                <Text style={{color: 'black', marginTop: 15}}>Forgot Password?</Text>
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
        backgroundColor: 'gray',
        marginTop: 5
    },

    button_text: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white'
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
});

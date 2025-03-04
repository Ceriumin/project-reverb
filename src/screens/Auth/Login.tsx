import React, {useState} from 'react';
import { Button, Text, InputField } from '../../components/_index';
import { View, StyleSheet} from 'react-native';
import { AuthStackParamList } from '../../constants/types';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useAuth } from '../../hooks/_index';


export default function Login() {

    const [email, setEmail] = useState('');
    const [user, setUser] = useState('Login');
    const [password, setPassword] = useState('');

    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

    const { signIn } = useAuth();

    const logIn = async () => {
        try {
            await signIn(email, password);
            console.log('User successfully logged in');
            setUser(email);
        } catch (error) {
            console.error('Failed to log in', error);
            setUser('error');
        }
    }

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
                onPress={logIn} 
                variant='full'
                isElevated
                style={styles.button}
            >
                <Text style={styles.button_text}>{user}</Text>
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
        backgroundColor: 'blue',
        marginTop: 5
    },

    button_text: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white'
    }
});

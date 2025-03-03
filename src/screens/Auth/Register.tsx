import React, {useState} from 'react';
import { Button, Text, InputField } from '../../components/_index';
import { View, StyleSheet } from 'react-native';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    return (
        <View style={styles.container}>
            <InputField 
                label='Name'
                value={name}
                onChangeText={(text) => setName(text)}
            />
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
                onPress={() => console.log('Register')} 
                variant='full'
                isElevated
                style={styles.button}
            >
                <Text style={styles.button_text}>Register</Text>
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

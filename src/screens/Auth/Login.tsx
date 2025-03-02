import React from 'react';
import { Button, Text, InputField } from '../../components/_index';
import { View, StyleSheet} from 'react-native';

export default function Login() {
    return (
        <View style={styles.container}>
            <InputField 
                label='Email'
                value=''
                onChangeText={(text) => console.log(text)}
            />
            <InputField 
                label='Password'
                value=''
                onChangeText={(text) => console.log(text)}
                secureTextEntry
            />
            <Button 
                onPress={() => console.log('Login')} 
                variant='full'
                isElevated
                style={styles.button}
            >
                <Text style={styles.button_text}>Login</Text>
            </Button>
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

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '../../components/_index';  
import { AuthStackParamList } from '../../constants/_index';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from '../../components/_index';

export default function Onboarding() {
    const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

    return (
        <View style={styles.container}>
            <View> 
                <Button 
                    onPress={() => navigation.navigate('Login')} 
                    variant='full'
                    isElevated
                    style={styles.button}
                >
                    <Text style={styles.button_text}>Get Started</Text>
                </Button>
            </View>
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
        width: 200,
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        marginTop: 550
    },

    button_text: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white'
    }
});
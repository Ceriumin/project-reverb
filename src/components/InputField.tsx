import React, { useState, useRef, useEffect } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Text } from './Typography';

interface InputFieldProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    style?: object;
}

//TODO: Finish Implement the InputField component
export default function InputField({ label, value, onChangeText, secureTextEntry, style }: InputFieldProps) {

    const [number, onChangeNumber] = React.useState('');

    return (
        <React.Fragment>
            <TextInput 
                value={number}
                placeholder={label}
                onChangeText={onChangeNumber}
                secureTextEntry={secureTextEntry}
                style={[styles.input, style]}     
            />
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        width: '90%',
    }
});
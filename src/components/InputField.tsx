import React, { useRef } from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface InputFieldProps {
    label: string;
    style?: object;
    secureTextEntry?: boolean;
    value?: string;
    onChangeText?: (text: string) => void;
    keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
}
export default function InputField({label, style, secureTextEntry, value, onChangeText, keyboardType}: InputFieldProps) {
    const inputRef = useRef<TextInput>(null);
    
    return (
        <React.Fragment>
            <TextInput 
                placeholder={label}
                value={value}
                onChangeText={onChangeText}
                ref={inputRef}
                style={[styles.input, style]}   
                secureTextEntry={secureTextEntry}  
                keyboardType={keyboardType}
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
        fontFamily: 'Inter-Tight',
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        width: '90%',
    }
});
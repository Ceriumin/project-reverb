import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface Props {
    label: string;
    value: string;
    secureTextEntry?: boolean;

    onChangeText: (text: string) => void;
    keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
    style?: object;
}

export default function InputField({
    label,
    value,
    secureTextEntry = false,
    onChangeText,
    keyboardType = 'default',
    style = {},
}: Props) {

    const inputRef = React.useRef<TextInput>(null);

    return (
        <TextInput
            style={[styles.input, style]}
            placeholder={label}
            value={value}
            ref={inputRef}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
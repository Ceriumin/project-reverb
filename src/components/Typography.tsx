import React from 'react';
import { Text as RNText, TextProps as RNTextProps , StyleSheet} from 'react-native';

export function Text({ children, style, ...props }: RNTextProps) {
    return (
        <RNText style={[styles.text, style]} {...props}>
            {children}
        </RNText>
    );
}

export function Section({ children, style, ...props }: RNTextProps) {
    return (
        <RNText style={[styles.section, style]} {...props}>
            {children}
        </RNText>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Inter-Tight',
        fontSize: 14,
        fontWeight: 'normal',
    },

    section: {
        fontFamily: 'Inter-Tight',
        fontSize: 16,
        fontWeight: 'semibold',
    }
});
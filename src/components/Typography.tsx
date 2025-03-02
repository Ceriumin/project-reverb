import React from 'react';
import { Text as RNText, TextProps as RNTextProps , StyleSheet} from 'react-native';

export function Text({ children, style, ...props }: RNTextProps) {
    return (
        <RNText style={styles.text} {...props}>
            {children}
        </RNText>
    );
}

export function Section({ children, style, ...props }: RNTextProps) {
    return (
        <RNText style={styles.section} {...props}>
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
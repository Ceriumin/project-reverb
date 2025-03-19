import React from 'react';
import { 
    TouchableOpacity, 
    Animated, 
    StyleSheet,
    Text,
    ViewStyle,
    TextStyle,
} from 'react-native';

interface Props {
    children: string;
    onPress: () => void;

    backgroundColor?: string; // color needs to be a seperate prop for stylesheet types to work
    type?: 'filled' | 'outlined' | 'text';
    isElevated?: boolean;
    style?: ViewStyle | TextStyle;
}

export default function ActionButton({
    onPress,
    children = ' ',
    backgroundColor = '#000',
    type = 'filled',
    isElevated = false,
    style = {},
}: Props) {
    
    const ScaleValue = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        if(isElevated) {
            Animated.spring(ScaleValue, {
                toValue: 0.95,
                useNativeDriver: true,
            }).start();
        }
    }

    const handlePressOut = () => {
        if(isElevated) {
            Animated.spring(ScaleValue, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        }
    }

    return (
        <TouchableOpacity
            onPress = {onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={isElevated ? 1 : 0.7}
        >

            <Animated.View style={[
                styles.container,
                type === 'filled' && { backgroundColor },
                type === 'outlined' && { borderColor: backgroundColor, borderWidth: 1 },
                type === 'text' && { backgroundColor: 'transparent' },
                isElevated && { transform: [{ scale: ScaleValue }] },
                isElevated ? { shadowOpacity: 0.2 } : { shadowOpacity: 0 },
                style,
            ]}>
                <Text style={[
                    type === 'filled' && { color: '#fff' },
                    type === 'outlined' && { color: backgroundColor },
                    type === 'text' && { color: backgroundColor },
                    { fontSize: 16, fontWeight: '600' },
                ]}>
                    {children}
                </Text>
            </Animated.View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 3.84,
        elevation: 5,
    }
});

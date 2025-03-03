import React from 'react';
import { 
    TouchableOpacity, 
    Animated, 
    StyleSheet 
} from 'react-native';

interface ActionButtonProps {
    onPress: () => void;
    variant: 'full' | 'outlined' | 'text';
    children: React.ReactNode;
    isElevated?: boolean;
    style?: object;
}

export default function ActionButton({ onPress, 
    variant, 
    children, 
    isElevated,
    style,
}: ActionButtonProps) {

    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
    const scale = new Animated.Value(1);

    // Animation for the initial button press
    const onPressIn = () => {
        /* Doesn't animate if the button is not elevated,
        this is by design and makes more sense visually */
        if(isElevated) {
            Animated.spring(scale, {
                toValue: 0.95,
                friction: 10,
                useNativeDriver: true,
            }).start();
        }
    }

    // Return the button to its original state
    const onPressOut = () => {
        if(isElevated) { 
            Animated.spring(scale, {
                toValue: 1,
                friction: 10,
                useNativeDriver: true,
            }).start();
        }
    }
    
    return (
        <AnimatedTouchableOpacity
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={[
                { transform: [{ scale: isElevated ? scale : 1 }] }, 
                style, 
                styles.container,
            ]}
            activeOpacity={isElevated ? 1 : 0.7}
        >
            {children}
        </AnimatedTouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

import React from 'react';
import { 
    TouchableOpacity, 
    Animated, 
    StyleSheet 
} from 'react-native';

interface ActionButtonProps {
    onPress: () => void;
    variant: 'full' | 'outlined';
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

    const onPressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            friction: 10,
            useNativeDriver: true,
        }).start();
    }

    const onPressIn = () => {
        Animated.spring(scale, {
            toValue: 0.95,
            friction: 10,
            useNativeDriver: true,
        }).start();
    }
    
    return (
        <AnimatedTouchableOpacity
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={[{ transform: [{ scale: isElevated ? scale : 1 }] }, style, styles.container]}
        >
            {children}
        </AnimatedTouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        
    }
});

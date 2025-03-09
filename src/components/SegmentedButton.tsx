import React, {useEffect, useState} from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Animated, 
    TouchableOpacity 
} from 'react-native';

interface Props {
    segments: string[];
    onPress: (index: number) => void;
    selectedIndex: number;
}

export default function SegmentedButton({segments, onPress, selectedIndex}: Props){
    const [sliderPosition] = useState(new Animated.Value(0));

    useEffect(() => {
        // Percentage based split of the segments allocated
        Animated.timing(sliderPosition, {
            toValue: selectedIndex * (100 / segments.length),
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [selectedIndex]);

    const handlePress = (index: number) => {
        onPress(index);
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.slider, { width: `${100 / segments.length}%`, left: sliderPosition.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%']
            }) }]} />
            {segments.map((segment, index) => (
                <React.Fragment key={index}>
                    <TouchableOpacity onPress={() => handlePress(index)} style={styles.segment}>
                        <Text style={styles.text}>
                            {segment}
                        </Text>
                    </TouchableOpacity>
                    {index < segments.length - 1 && <View style={styles.separator} />}
                </React.Fragment>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 15,
        position: 'relative',
        width: '82.5%',
        alignSelf: 'center',
    },
    segment: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        width: '100%',
        zIndex: 1,
    },
    slider: {
        position: 'absolute',
        backgroundColor: 'black',
        bottom: 0,
        height: '100%',
        zIndex: 0,
    },
    separator: {
        width: 1,
        backgroundColor: 'black',
    },
});
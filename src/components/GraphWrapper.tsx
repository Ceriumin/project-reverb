import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import BarGraph from './BarGraphConstructor';

interface Props {
    title: string;
    data: any; // MAKE SURE THE DATA PASSED IS IN THE CORRECT FORMAT
    color?: string;
}

export default function GraphWrapper({ title, data, color }: Props) {
    return (
            <View style={styles.container}>
                <View style={{ width: '100%' }}>
                    <BarGraph 
                        data={data} color={color || '#000000'} 
                        verticalPadding={20}
                        horizontalPadding={10}
                        aspectRatio={9/20}
                        replaceValues={true}
                        maxValues={7}
                    />
                </View>
            </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        padding: 10,
        paddingVertical: 15,
    },

    text_container: {
        marginBottom: 15,
        paddingLeft: 5,
    },

    title: {
        fontSize: 12,
    },

    value: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});


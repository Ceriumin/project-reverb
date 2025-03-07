import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import BarGraph from './BarGraphConstructor';
import LineGraph from './LineGraphConstructor';

interface Props {
    title: string;
    data: any; // MAKE SURE THE DATA PASSED IS IN THE CORRECT FORMAT
    type?: 'bar' | 'line';
    color?: string;
}

export default function GraphWrapper({ title, data, color, type }: Props) {
    return (
            <View style={styles.container}>
                <View style={{ width: '100%' }}>
                    <View style={styles.text_container}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.value}>0</Text>
                    </View>
                    {type === 'bar' ? <BarGraph data={data} color={color || '#000000'} /> : <LineGraph data={data} color={color || '#000000'} />}
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


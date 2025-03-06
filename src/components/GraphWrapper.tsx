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
        //padding: 10,
        backgroundColor: 'lightgrey',
        borderRadius: 10,
    },

    text_container: {
        paddingHorizontal: 12, //Very slight padding to line up with the graph
        marginBottom: 15,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    value: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});


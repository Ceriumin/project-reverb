import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Line, Text } from 'react-native-svg';
import { formatTime } from '../helpers/_index'

interface Data {
    date: string;
    totalMinutes: number;
}

interface Props {
    data: Data[];
    x?: object;
    color: string;
}

const ASPECT_RATIO = 9 / 20;
const PADDING = 20;
const EDGE_PADDING = 10;
const MAX_DAYS =  7;
const REPLACE = true;

export default function BarGraph({ data, color }: Props) {
    const [width, setWidth] = React.useState(0);
    const height = width * ASPECT_RATIO; 

    // Edge case to give information that no data has been provided
    if(data.length === 0 || !data) {
        return (
            <View 
                style={[styles.container]}
                onLayout={event => {
                    setWidth(event.nativeEvent.layout.width);
                }}
            >
                <Text>No data available</Text>
            </View>
        );
    }
    
    const limit = data.slice(-MAX_DAYS); // Limit the data so that it only shows the last x days
    const values = limit.map(d => d.totalMinutes); // Map the totalMinutes to an array
    const nonZeroValues = values.filter(v => v > 0);  // Filter out the zero values from the array
    
    // Max value for the y-axis so it fits the graph
    const max = nonZeroValues.length > 0  
        ? Math.max(...nonZeroValues) * 1.125
        : 10; 

    // If the data is less than the max days, it will add padding to the left
    if (data.length < MAX_DAYS) {
        const diff = MAX_DAYS - data.length;
        
        const earliestDate = data.length > 0 // if there is data, it will use the earliest date in the data
            ? new Date(data[0].date) 
            : new Date();
        
        // Loops from the earliest date to the difference between the max days and the data length,
        // and adds the padding to the left of the graph
        for (let i = diff; i > 0; i--) {
            const paddingDate = new Date(earliestDate);
            paddingDate.setDate(paddingDate.getDate() - i);
            limit.unshift({ 
                date: paddingDate.toISOString(), 
                totalMinutes: 0
            });
        }
    }

    const generateBars = () => {
        const barWidthRatio = 0.2 // Ratio of the bar width to the section width
        const availableHeight = height - PADDING; 
        const availableWidth = width - (2 * EDGE_PADDING);
        const sectionWidth = availableWidth / MAX_DAYS;
        
        // Maps the data to the bars, and filters out the zero values
        return limit.map((d, i) => {  
            if (d.totalMinutes === 0 && REPLACE) {
                return null;
            }
            
            const sectionStart = EDGE_PADDING + (i * sectionWidth);
            const sectionCenter = sectionStart + (sectionWidth / 2);
            const barWidth = sectionWidth * barWidthRatio;
            const barX = sectionCenter - (barWidth / 2);
            
            const relativeHeight = (d.totalMinutes / max) * availableHeight;
            
            return (
                <Rect
                    key={`bar-${i}`}
                    x={barX}
                    y={height - PADDING - relativeHeight}
                    width={barWidth}
                    height={relativeHeight}
                    rx={barWidth / 2}
                    ry={barWidth / 2} 
                    fill={color}
                />
            );
        }).filter(Boolean); 
    };
    
    const generateLines = () => {        
        const separatorLines = [];
        
        const availableWidth = width - (2 * EDGE_PADDING);
        const sectionWidth = availableWidth / MAX_DAYS;
        
        for (let i = 0; i <= MAX_DAYS; i++) {
            const lineX = EDGE_PADDING + (i * sectionWidth);
            
            separatorLines.push(
                <Line
                    key={`separator-${i}`}
                    x1={lineX}
                    y1={0} 
                    x2={lineX}
                    y2={height}
                    stroke="grey"
                    strokeOpacity={0.3}
                    strokeWidth={1}
                />
            );
        }
        
        return separatorLines;
    };

    const generateLabels = () => {
        const availableWidth = width - (2 * EDGE_PADDING);
        const availableHeight = height - PADDING;
        const sectionWidth = availableWidth / MAX_DAYS;
        
        return limit.map((d, i) => {
            const sectionStart = EDGE_PADDING + (i * sectionWidth);
            const sectionCenter = sectionStart + (sectionWidth / 2);
            
            // Skip value labels for zero values
            if (d.totalMinutes === 0) {
                return (
                    <Text
                        key={`date-${i}`}
                        x={sectionCenter}
                        y={height - 5}
                        fontSize={10}
                        fill="black"
                        textAnchor="middle"
                    >
                        {new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </Text>
                );
            }
            
            const relativeHeight = (d.totalMinutes / max) * availableHeight;
            
            return (
                <React.Fragment key={`labels-${i}`}>
                    <Text
                        key={`value-${i}`}
                        x={sectionCenter}
                        y={height - PADDING - relativeHeight - 5}
                        fontSize={10}
                        fill="black"
                        textAnchor="middle"
                    >
                        {formatTime(d.totalMinutes)}
                    </Text>
                    <Text
                        key={`date-${i}`}
                        x={sectionCenter}
                        y={height - 5}
                        fontSize={10}
                        fill="black"
                        textAnchor="middle"
                    >
                        {new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </Text>
                </React.Fragment>
            );
        });
    }

    return (
        <View
            onLayout={event => {
                setWidth(event.nativeEvent.layout.width);
            }}
            style={styles.container}
        >
            <Svg width={width} height={height}>
                {generateLines()} 
                {generateBars()}
                {generateLabels()}
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: '100%',
    }
})
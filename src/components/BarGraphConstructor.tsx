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

const ASPECT_RATIO = 9 / 16;
const PADDING = 20;
const horizontalPadding = 10;
const MAX_DAYS = 5;

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
    
    const limit = data.slice(-MAX_DAYS);
    const values = limit.map(d => d.totalMinutes);
    const nonZeroValues = values.filter(v => v > 0); 
    
    const max = nonZeroValues.length > 0  
        ? Math.max(...nonZeroValues) * 1.125
        : 10; 

    if (data.length < MAX_DAYS) {
        const diff = MAX_DAYS - data.length;
        
        const earliestDate = data.length > 0 
            ? new Date(data[0].date) 
            : new Date();
            
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
        const barWidthRatio = 0.2 
        const EDGE_PADDING = horizontalPadding; 
        const availableHeight = height - PADDING;
        const availableWidth = width - (2 * EDGE_PADDING);
        const sectionWidth = availableWidth / MAX_DAYS;
        
        return limit.map((d, i) => {  
            if (d.totalMinutes === 0) {
                return null;
            }
            
            const sectionStart = EDGE_PADDING + (i * sectionWidth);
            const sectionCenter = sectionStart + (sectionWidth / 2);
            const barWidth = sectionWidth * barWidthRatio;
            const barX = sectionCenter - (barWidth / 2);
            
            const relativeHeight = (d.totalMinutes / max) * availableHeight;
            
            return (
                <React.Fragment key={`fragment-${i}`}>
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
        }).filter(Boolean); 
    };
    
    const generateLines = () => {
        const EDGE_PADDING = horizontalPadding; 
        
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

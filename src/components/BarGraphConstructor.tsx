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
    color: string;
    aspectRatio?: number; // MAKE SURE THIS IS A RATIO
    verticalPadding?: number;
    horizontalPadding?: number;
    labelPadding?: number;
    replaceValues?: boolean;
    maxValues?: number;
}

/**
 * BarGraph component for visualizing time data across multiple dates
 * 
 * @param {Data[]} data - Array of data points with date and totalMinutes properties
 * @param {string} color - Fill color for the bars
 * @param {number} labelPadding - Space between bars and labels in pixels (default: 5)
 * @param {number} aspectRatio - Height to width ratio for the graph (default: 9/16)
 * @param {number} verticalPadding - Padding at top and bottom in pixels (default: 0)
 * @param {number} horizontalPadding - Padding at left and right in pixels (default: 0)
 * @param {boolean} replaceValues - If true, doesn't fill in gaps between dates (default: false)
 * @param {number} maxValues - Maximum number of values to display (default: 10)
 * @returns {JSX.Element} Bar graph visualization component
 */

export default function BarGraph({ 
    data, 
    color,
    labelPadding = 5,
    aspectRatio = 9/16,
    verticalPadding = 0,
    horizontalPadding = 0,
    replaceValues = false,
    maxValues = 10,
}: Props) {
    const [width, setWidth] = React.useState(0);
    const height = width * aspectRatio; 
    
    // Sort data by date to ensure chronological order
    const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); 
    
    // Fill in any missing dates in the sequence
    const filledData: Data[] = [];
    if(sortedData.length > 0) {
        const startDate = new Date(sortedData[0].date);
        const endDate = new Date(sortedData[sortedData.length - 1].date);
        const dateMap = new Map(sortedData.map(item => [item.date.split('T')[0], item]));
        
        if (!replaceValues) {
            // Loop through each day in the range and fill gaps
            const currentDate = new Date(startDate);
            while(currentDate <= endDate) {
                const dateStr = currentDate.toISOString().split('T')[0];
                const existingData = dateMap.get(dateStr);
                
                if(existingData) {
                    filledData.push(existingData);
                } else {
                    filledData.push({
                        date: currentDate.toISOString(),
                        totalMinutes: 0
                    });
                }
                
                currentDate.setDate(currentDate.getDate() + 1);
            }
        } else {
            // Else, just use the original data without filling gaps
            filledData.push(...sortedData);
        }
    }
    const limit = filledData.slice(-maxValues); 
    const values = limit.map(d => d.totalMinutes);
    const nonZeroValues = values.filter(v => v > 0);
    
    // Max value for the y-axis so it fits the graph
    const max = nonZeroValues.length > 0  
        ? Math.max(...nonZeroValues)
        : 10; 

    // If the data is less than the max days, it will add padding to the left
    if (limit.length < maxValues) {
        const diff = maxValues - limit.length;
        
        const earliestDate = limit.length > 0 
            ? new Date(limit[0].date) 
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
        const availableHeight = height - (2 * verticalPadding);
        const availableWidth = width - (2 * EDGE_PADDING);
        const sectionWidth = availableWidth / maxValues;
        
        return limit.map((d, i) => {  
            if (replaceValues && d.totalMinutes === 0) {
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
                        y={height - verticalPadding - relativeHeight}
                        width={barWidth}
                        height={relativeHeight}
                        rx={barWidth / 2}
                        ry={barWidth / 2} 
                        fill={color}
                    />
                </React.Fragment>
            );
        }).filter(Boolean); 
    };
    
    const generateLines = () => {
        const EDGE_PADDING = horizontalPadding; 
        
        const separatorLines = [];
        
        const availableWidth = width - (2 * EDGE_PADDING);
        const sectionWidth = availableWidth / maxValues;
        
        for (let i = 0; i <= maxValues; i++) {
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
        const availableWidth = width - (2 * horizontalPadding);
        const sectionWidth = availableWidth / maxValues;
        const availableHeight = height - (2 * verticalPadding);
        
        return limit.map((d, i) => {
            if(replaceValues && d.totalMinutes === 0) {
                return null;
            }
            
            const sectionStart = horizontalPadding + (i * sectionWidth);
            const sectionCenter = sectionStart + (sectionWidth / 2);
            const relativeHeight = (d.totalMinutes / max) * availableHeight;
            
            return (
                <React.Fragment key={`label-${i}`}>
                    <Text
                        key={`value-${i}`}
                        x={sectionCenter}
                        y={height - verticalPadding - relativeHeight - (labelPadding * 2)}
                        fontSize={10}
                        fill="black"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                    >
                        {formatTime(d.totalMinutes)}
                    </Text>
                    <Text
                        key={`date-${i}`}
                        x={sectionCenter}
                        y={height - labelPadding}
                        fontSize={10}
                        fill="black"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                    >
                        {new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </Text>
                </React.Fragment>
            );
        });
    };

    return (
        <View
            onLayout={event => {
                setWidth(event.nativeEvent.layout.width);
            }}
            style={limit.length > 0 ? styles.container : styles.container_null}
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
    },

    container_null: {
        alignSelf: 'center',
        width: '100%',
        opacity: 0.35
    }
})

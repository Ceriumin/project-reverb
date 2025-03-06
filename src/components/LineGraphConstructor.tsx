import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, ClipPath, Rect, Line, Text } from 'react-native-svg';
import * as d3 from 'd3';

interface DataProp {
    x: string;
    y: number;
}

interface Props {
    data: DataProp[];
    color: string;
}

const ASPECT_RATIO = 9 / 16;
const PADDING = 30;

export default function LineGraph({ data, color }: Props) {
    const [width, setWidth] = React.useState(0);
    const height = width * ASPECT_RATIO;

    const limit = data.slice(0, 7);

    const value = limit.map(d => d.y);
    const min = Math.min(...value);
    const max = Math.max(...value);

    const yScale = d3
        .scaleLinear()
        .domain([min, max])
        .range([height - PADDING, PADDING]);

    const xScale = d3
        .scaleLinear()
        .domain([0, limit.length - 1])
        .range([PADDING, width - PADDING]);

    const line = d3
        .line<DataProp>()
        .x((d, i) => xScale(i))
        .y(d => yScale(d.y));

    const area = d3
        .area<DataProp>()
        .x((d, i) => xScale(i))
        .y0(height - PADDING)
        .y1(d => yScale(d.y));

    const svgLine = line(limit);
    const svgArea = area(limit);

    const generateLines = () => {
        const lines = [];
        const numLines = 4; 
        const valueStep = (max - min) / numLines;

        for (let i = 0; i <= numLines; i++) {
            const value = max - i * valueStep;
            lines.push(
                <React.Fragment key={`line-${i}`}>
                    <Line
                        x1={PADDING}
                        y1={yScale(value)}
                        x2={width - PADDING}
                        y2={yScale(value)}
                        stroke="lightgrey"
                        strokeWidth="1"
                    />
                    <Text
                        x={PADDING - 10}
                        y={yScale(value)}
                        fill="black"
                        fontSize="10"
                        textAnchor="end"
                        alignmentBaseline="middle"
                    >
                        {Math.round(value / 5) * 5} 
                    </Text>
                </React.Fragment>
            );
        }
        return lines;
    }

    return (
        <View style={{alignItems: 'center' }}>
            <View
                onLayout={event => {
                    setWidth(event.nativeEvent.layout.width);
                }}
                style={styles.container}
            >
                <Svg width={width} height={height}>
                    <Defs>
                        <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                            <Stop offset="0%" stopColor={color} stopOpacity="0.2" />
                            <Stop offset="100%" stopColor={color} stopOpacity="0" />
                        </LinearGradient>
                        <ClipPath id="clip">
                            <Rect x="0" y="0" width={width} height={height} />
                        </ClipPath>
                    </Defs>
                    {generateLines()}
                    <Path d={svgLine || ''} fill='none' stroke={color} strokeWidth="2" />
                    <Path d={svgArea || ''} fill="url(#gradient)" stroke='none' />
                </Svg>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: '100%', // The width fucks up the line graph rendering every re-render
    }
})
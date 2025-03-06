import React, { JSX } from 'react';
import { View } from 'react-native';
import Svg, { Rect, Line, Text } from 'react-native-svg';
import * as d3 from 'd3';

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
const OFFSET =  20;

export default function BarGraph({ data, color }: Props) {

    const [width, setWidth] = React.useState(0);
    const height = width * ASPECT_RATIO; 

    const limit = data.slice(-5);
    const values = limit.map(d => d.totalMinutes); 

    const min = Math.min(...values); 
    const max = Math.max(...values);

    const yScale = d3
        .scaleLinear()
        .domain([min, max])
        .range([height - PADDING, PADDING + OFFSET]);

    const xScale = d3
        .scaleBand()
        .domain(limit.map(d => d.date)) 
        .range([0, width])
        .padding(0.5); // Unfortunately whenever the padding is changed, the lines need to be adjusted manually

    const generateBars = () => {
        const barWidthRatio = 0.35; // Adjust this value between 0 and 1 to control bar width
        return limit.map((d, i) => {  
            const x = xScale(d.date);
            const y = yScale(d.totalMinutes);
            const barHeight = height;
            const barWidth = xScale.bandwidth() * barWidthRatio;
            const barX = (x ?? 0) + (xScale.bandwidth() - barWidth) / 2; // Center the bar within its band
            return (
                <Rect
                    key={`bar-${i}`}
                    x={barX}
                    y={y - OFFSET}
                    width={barWidth}
                    height={barHeight - y}
                    rx={5}
                    ry={5}
                    fill={color}
                />
            );
        });
    };


    const generateLines = () => {
        const lines: JSX.Element[] = [];
        limit.forEach((d, i) => {  
            const x = (xScale(d.date) ?? 0) + xScale.bandwidth() * 1.5;
            const y = yScale(d.totalMinutes + 2.5);
            lines.push(
                <React.Fragment key={`line-${i}`}>
                    <Line
                        key={`line-${i}`}
                        x1={x}
                        y1={PADDING - OFFSET}
                        x2={x}
                        y2={height}
                        stroke="gray"
                        strokeWidth="1"
                    />
                    <Text
                        key={`text-${i}`}
                        x={x - xScale.bandwidth()}
                        y={y - OFFSET - 5}
                        fontSize="12"
                        fill="gray"
                        textAnchor="middle"
                    >
                        {d.totalMinutes.toFixed(0)}
                    </Text>
                    <Text
                        key={`label-${i}`}
                        x={x - xScale.bandwidth()}
                        y={height - 2.5}
                        fontSize="12"
                        fill="gray"
                        textAnchor="middle"
                    >
                        {new Date(d.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                    </Text>
                    <Line
                        key={`front-line-${i}`}
                        x1={x - xScale.bandwidth() * 2}
                        y1={PADDING - OFFSET}
                        x2={x - xScale.bandwidth() * 2}
                        y2={height}
                        stroke="gray"
                        strokeWidth="1"
                    />
                </React.Fragment>
            );
        });
        return lines;
    };

    return (
        <View
            onLayout={event => {
                setWidth(event.nativeEvent.layout.width);
            }}
        >
            <Svg width={width} height={height}>
                {generateBars()}
                {generateLines()}
            </Svg>
        </View>
    );
}


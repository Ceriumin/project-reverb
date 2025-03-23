import data from '../../assets/data/example-data.json';

interface RawDataPoint {
    timestamp: string;
    value: number;
}

interface ProcessedDataPoint {
    x: string;
    y: number;
}

export const getLinearData = (): ProcessedDataPoint[] => {
    return data.map((item: RawDataPoint) => ({
        x: new Date(item.timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        }),
        y: item.value
    }));
};


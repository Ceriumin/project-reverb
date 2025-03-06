import playtimeData from '../../assets/data/playtime-data.json';

interface Session {
    start: string;
    end: string;
}

interface PlaytimeEntry {
    date: string;
    sessions: Session[];
}

interface ProcessedData {
    date: string;
    totalMinutes: number;
}

export const processPlaytimeData = (): ProcessedData[] => {
    return playtimeData.map((entry: PlaytimeEntry) => {
        const totalMinutes = entry.sessions.reduce((acc, session) => {
            const startTime = new Date(session.start);
            const endTime = new Date(session.end);
            const diffInMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
            return acc + diffInMinutes;
        }, 0);

        return {
            date: entry.date,
            totalMinutes: Math.round(totalMinutes)
        };
    });
};
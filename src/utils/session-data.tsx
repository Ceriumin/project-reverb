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
            const difference = (endTime.getTime() - startTime.getTime());
            return acc + difference;
        }, 0);

        return {
            date: entry.date,
            totalMinutes: Math.round(totalMinutes)
        };
    });
};
export const formatTime = (time: number): string => {
    if (time < 3600000) {
        const minutes = Math.floor(time / 60000);
        return `${minutes}m`;
    } else if (time < 86400000) {
        const hours = Math.floor(time / 3600000);
        const minutes = Math.floor((time % 3600000) / 60000);
        return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    } else {
        const days = Math.floor(time / 86400000);
        const hours = Math.floor((time % 86400000) / 3600000);
        return hours > 0 ? `${days}d ${hours}h` : `${days}d`;
    }
};
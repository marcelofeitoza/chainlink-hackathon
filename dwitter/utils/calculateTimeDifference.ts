export const calculateTimeDifference = (timestamp: string) => {
    const difference = new Date().getTime() - new Date(timestamp).getTime();
    const days = Math.floor(difference / (1000 * 3600 * 24));

    if (days > 0) {
        return `${days}d`;
    }

    const hours = Math.floor(difference / (1000 * 3600));

    if (hours > 0) {
        return `${hours}h`;
    }

    const minutes = Math.floor(difference / (1000 * 60));

    if (minutes > 0) {
        return `${minutes}m`;
    }

    const seconds = Math.floor(difference / (1000));

    if (seconds > 0) {
        return `${seconds}s`;
    }

    return '0s';
}
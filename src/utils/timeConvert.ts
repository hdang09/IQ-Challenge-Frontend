export const timeConvert = (mSec: number): string => {
    const seconds: number = Math.round(mSec / 1000);
    const hours: string | number = Math.floor(seconds / 3600);
    const remainingMinutes: number = Math.floor((seconds % 3600) / 60);
    const remainingSeconds: number = seconds % 60;

    const formattedHours: string = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes: string = remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;
    const formattedSeconds: string = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

    if (!remainingMinutes && !seconds) return '--:--';
    if (hours === 0) return `${formattedMinutes}:${formattedSeconds}`;
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

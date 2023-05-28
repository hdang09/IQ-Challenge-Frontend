export const timeConvert = (mSec: number): string => {
    const seconds: number = Math.round(mSec / 1000);
    const minutes: string | number = Math.floor(seconds / 60);
    const remainingSeconds: string | number = seconds % 60;

    const formattedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds: string = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

    const formattedTime: string = `${formattedMinutes}:${formattedSeconds}`;
    return formattedTime;
};

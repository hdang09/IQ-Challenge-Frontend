import { useEffect, useState } from 'react';

import classnames from 'classnames/bind';
import localStorageUtil from '@/utils/localStorage';
import styles from './timer.module.scss';
import { timeConvert } from '@/utils/timeConvert';

const cn = classnames.bind(styles);

const Timer = ({ timeStart }: { timeStart?: number }) => {
    const [time, setTime] = useState(0);
    const timeLocalStorage = localStorageUtil.getItem('time_start');
    let startOfTime: number = timeLocalStorage ? JSON.parse(timeLocalStorage) : timeStart;

    useEffect(() => {
        let timer = setInterval(() => {
            setTime(Date.now() - startOfTime);
        }, 1000);
        return () => clearInterval(timer);
    }, [startOfTime]);

    return <h3 className={cn('clock')}>{timeConvert(time)}</h3>;
};

export default Timer;

import { useEffect, useState } from 'react';
import { timeConvert } from '@/utils/timeConvert';
import styles from './timer.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

const Timer = ({ timeStart }: { timeStart: number }) => {
    const [time, setTime] = useState(0);
    let startOfTime: number = JSON.parse(localStorage.getItem('time_start') || '0') || timeStart;

    useEffect(() => {
        let timer = setInterval(() => {
            setTime(Date.now() - startOfTime);
        }, 1000);
        return () => clearInterval(timer);
    }, [startOfTime]);

    return <p className={cx('clock')}>{timeConvert(time)}</p>;
};

export default Timer;

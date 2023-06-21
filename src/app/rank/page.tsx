'use client';

import { useEffect, useState } from 'react';

import Skeleton from 'react-loading-skeleton';
import classnames from 'classnames/bind';
import localStorage from '@/utils/localStorage';
import { seeScoreBoard } from '@/utils/iqApi';
import styles from './rank.module.scss';
import { timeConvert } from '@/utils/timeConvert';

const cn = classnames.bind(styles);

type User = {
    name: string;
    studentID: string;
    score: number;
    rank: number;
    time: number;
};

type Scoreboard = {
    studentRank: number;
    users: User[];
};

const Rank: React.FC = (props) => {
    const [scoreboard, setScoreboard] = useState<Scoreboard>();

    useEffect(() => {
        const getScoreboard = async () => {
            try {
                const studentID: string = localStorage.getItem('studentID') || '';
                const { data } = await seeScoreBoard(studentID);
                setScoreboard(data.data);
            } catch (error) {
                // toast.error(error.response.data.message);
                console.log(error);
            }
        };

        if (!scoreboard) getScoreboard();
        let intervalID = setInterval(getScoreboard, 30000);

        return () => clearInterval(intervalID);
    }, [scoreboard]);

    const Countdown: React.FC = () => {
        const [time, setTime] = useState(30);

        useEffect(() => {
            if (time <= 0) return;

            const intervalID = setInterval(() => {
                setTime((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(intervalID);
        }, [time]);

        return <h3>{time} giây nữa bảng xếp hạng sẽ cập nhật</h3>;
    };

    return (
        <main className={cn('wrapper')}>
            <h2>
                Bảng xếp hạng <span>Finding Apollo</span>
            </h2>
            <h3>
                {scoreboard?.studentRank ? (
                    <>
                        Bạn đang ở <span>hạng {scoreboard?.studentRank}</span>
                    </>
                ) : (
                    <span>Bạn chưa làm bài</span>
                )}
            </h3>
            <Countdown />

            <table className={cn('table')}>
                <thead>
                    <tr>
                        <th>Top</th>
                        <th>Tên</th>
                        <th>MSSV</th>
                        <th>Điểm</th>
                        <th>Thời gian</th>
                    </tr>
                </thead>
                <tbody>
                    {!scoreboard ? (
                        <>
                            {[...Array(5)].map((_, index) => (
                                <tr key={index} className={cn('body-row')}>
                                    {[...Array(5)].map((_, index) => (
                                        <td key={index}>
                                            <Skeleton />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </>
                    ) : (
                        scoreboard.users.map((user, i) => {
                            if (user.name === '') return;

                            return (
                                <tr className={cn('body-row', scoreboard?.studentRank - 1 === i && 'active')} key={i}>
                                    <td>{++i}</td>
                                    <td>{user.name.replace(/(^\w{1})|(\s+\w{1})/g, (match) => match.toUpperCase())}</td>
                                    <td>{user.studentID}</td>
                                    <td>{user.score}</td>
                                    <td>{timeConvert(user.time)}</td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </main>
    );
};

export default Rank;

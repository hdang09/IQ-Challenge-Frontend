'use client';

import { useState, useEffect } from 'react';
import styles from './rank.module.scss';
import classnames from 'classnames/bind';
import { seeScoreBoard } from '@/utils/iqApi';
import { timeConvert } from '@/utils/timeConvert';

const cx = classnames.bind(styles);

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

const Rank: React.FC = () => {
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
        <main className={cx('wrapper')}>
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

            <table className={cx('table')}>
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
                    {scoreboard?.users.map((user, i) => {
                        if (user.name !== '') {
                            return (
                                <tr
                                    className={cx('body-row')}
                                    key={i}
                                    // isCurrentUser={scoreboard?.studentRank - 1 === i}
                                >
                                    <td>{++i}</td>
                                    <td>{user.name.replace(/(^\w{1})|(\s+\w{1})/g, (match) => match.toUpperCase())}</td>
                                    <td>{user.studentID}</td>
                                    <td>{user.score}</td>
                                    <td>{timeConvert(user.time)}</td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
        </main>
    );
};

export default Rank;

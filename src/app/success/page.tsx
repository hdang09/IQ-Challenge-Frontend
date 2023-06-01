'use client';

import { useEffect, useState } from 'react';

import { BsFacebook } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/assets/logo.svg';
import Trophy from '@/assets/trophy.svg';
import classNames from 'classnames/bind';
import { getStudentResult } from '@/utils/iqApi';
import styles from './success.module.scss';
import { timeConvert } from '@/utils/timeConvert';
import { toast } from 'react-toastify';

const cn = classNames.bind(styles);

type UserSB = {
    time: number;
    score: number;
};

const Success = () => {
    const [userScoreBoard, setUserScoreBoard] = useState<UserSB>();

    useEffect(() => {
        const studentID = localStorage.getItem('studentID');
        if (!studentID) return;
        const getScoreboard = async () => {
            try {
                const { data } = await getStudentResult(studentID);
                setUserScoreBoard(data.data);
            } catch (error: any) {
                console.log(error);
                toast.error(error.resonse.data.message);
            }
        };
        getScoreboard();
    }, []);

    const RESULT_LIST = [
        {
            name: 'Thời gian hoàn thành',
            result: timeConvert(userScoreBoard?.time || 0),
        },
        {
            name: 'Số câu trả lời đúng',
            result: userScoreBoard?.score,
        },
        {
            name: 'Vị trí xếp hạng',
            result: <Link href="/rank">Xem BXH</Link>,
        },
    ];

    return (
        <main className={cn('wrapper')}>
            <Image src={Trophy} alt="Trophy" />
            <div className={cn('right-content')}>
                <header className={cn('header')}>
                    <Image src={Logo} width={60} height={75} alt="F-Code Logo" />
                    <h2>F-Code</h2>
                </header>
                <h1 className={cn('title')}>
                    Chúc mừng bạn đã hoàn thành thử thách <span>Finding Apollo</span>
                </h1>
                <p className={cn('subtitle')}>Kết quả bạn đã đạt được:</p>
                <div className={cn('result-list')}>
                    {RESULT_LIST.map((item) => (
                        <div className={cn('result-item')} key={item.name}>
                            <h3>{item.name}</h3>
                            <div>{item.result}</div>
                        </div>
                    ))}
                </div>
                <div className={cn('more-info')}>
                    <p>Tìm hiểu thêm về CLB tại:</p>
                    <div className={cn('facebook')}>
                        <BsFacebook color="#5599FF" />
                        <a href="https://www.facebook.com/fcodefpt">Facebook fanpage F-Code</a>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Success;

'use client';

import { useState, useEffect } from 'react';
import classnames from 'classnames/bind';
import styles from './challenge.module.scss';
import Sidebar from '@/components/SIdebar';
import { startTheTest } from '@/utils/iqApi';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';

const cx = classnames.bind(styles);

export type Question = {
    _id: number;
    isLong: boolean;
    multipleChoice: string[];
    question: string[];
};

const Challenge = () => {
    const [questions, setQuestions] = useState<Question[]>();
    const [timeStart, setTimeStart] = useState<any>(() => {
        if (typeof window !== 'undefined') {
            const storedTime = localStorage.getItem('time_start');
            return storedTime ? JSON.parse(storedTime) : timeStart;
        } else {
            return timeStart;
        }
    });
    const currentIndexQuestion: number = 0;
    // const currentIndexQuestion = useSelector(challengeSelector);

    const router = useRouter();

    useEffect(() => {
        const startTheChallenge = async () => {
            try {
                const name = localStorage.getItem('name');
                const studentID = localStorage.getItem('studentID');
                if (!name || !studentID) {
                    router.push('/register');
                    return;
                }
                const { data } = await startTheTest(name, studentID);
                setQuestions(data.data.questions);
                setTimeStart(data.data.timeStart);
                localStorage.setItem('time_start', JSON.stringify(data.data.timeStart));
            } catch (error) {
                // toast.error(error.response.data.message);
                console.log('Error: ', error);
            }
        };
        startTheChallenge();
    }, [router]);

    return (
        <main className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('container')}>
                {questions && (
                    <Card
                        data={questions[currentIndexQuestion]}
                        index={currentIndexQuestion}
                        // key={questions._id}
                        key={0}
                        timeStart={timeStart}
                        isLong={questions[currentIndexQuestion].isLong}
                    />
                )}
            </div>
        </main>
    );
};

export default Challenge;

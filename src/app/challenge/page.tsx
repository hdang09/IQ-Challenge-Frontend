'use client';

import { useState, useEffect, useContext } from 'react';
import classnames from 'classnames/bind';
import styles from './challenge.module.scss';
import Sidebar from '@/components/SIdebar';
import { startTheTest } from '@/utils/iqApi';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { AnswersData } from '@/context/AnswerContext';

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

    const data = useContext(AnswersData);

    const currentIndexQuestion: number = data?.currentIdx || 0;

    const { width } = useWindowDimensions();

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
        <div className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('container')}>
                {width < 768 ? (
                    <Card
                        data={questions && questions[currentIndexQuestion]}
                        index={currentIndexQuestion}
                        key={currentIndexQuestion}
                        timeStart={timeStart}
                        isLong={questions && questions[currentIndexQuestion]?.isLong}
                    />
                ) : (
                    questions?.map((question, idx) => {
                        return (
                            <Card
                                data={question}
                                index={idx++}
                                key={question._id}
                                timeStart={timeStart}
                                isLong={question.isLong}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Challenge;

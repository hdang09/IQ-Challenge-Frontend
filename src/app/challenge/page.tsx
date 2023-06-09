'use client';

import { ReactElement, useContext, useEffect, useState } from 'react';

import AnswersData from '@/config/contextData';
import Card from '@/components/Card';
import CardSkeleton from '@/components/Card/card-skeleton';
import MySidebar from '@/components/Sidebar';
import classnames from 'classnames/bind';
import localStorageUtil from '@/utils/localStorage';
import { startTheTest } from '@/utils/iqApi';
import styles from './challenge.module.scss';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import useWindowDimensions from '@/hooks/useWindowDimensions';

const cn = classnames.bind(styles);

export type Question = {
    _id: number;
    id: number;
    isLong: boolean;
    multipleChoice: string[];
    question: string[];
};

const Challenge = () => {
    const [questions, setQuestions] = useState<Question[]>();
    const [timeStart, setTimeStart] = useState<number>(() => {
        const time = localStorageUtil.getItem('time_start');
        return time ? JSON.parse(time) : Date.now();
    });

    const data = useContext(AnswersData);

    const currentIndexQuestion: number = data.currentIdx || 0;

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
            } catch (error: any) {
                toast.error(error.response.data.message);
                console.log('Error: ', error);
            }
        };
        startTheChallenge();
    }, [router]);

    const CardComponent = (): ReactElement => {
        if (!questions?.length) {
            return <CardSkeleton />;
        }

        if (width < 768) {
            return (
                <Card
                    data={questions && questions[currentIndexQuestion]}
                    index={currentIndexQuestion}
                    key={currentIndexQuestion}
                    timeStart={timeStart}
                    isLong={questions && questions[currentIndexQuestion]?.isLong}
                />
            );
        }

        return (
            <>
                {questions?.map((question, idx) => (
                    <Card
                        data={question}
                        index={idx++}
                        key={question._id || question.id}
                        timeStart={timeStart}
                        isLong={question.isLong}
                    />
                ))}
            </>
        );
    };

    return (
        <div className={cn('wrapper')}>
            <MySidebar />
            <div className={cn('container')}>
                <CardComponent />
            </div>
        </div>
    );
};

export default Challenge;

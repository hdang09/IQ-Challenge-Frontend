'use client';
import localStorageUtil from '@/utils/localStorage';
import { createContext, useState } from 'react';
import styles from './challenge.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

interface AnswerType {
    answers: number[];
    setAnswers: React.Dispatch<React.SetStateAction<number[]>>;
    currentIdx: number;
    setCurrentIdx: React.Dispatch<React.SetStateAction<number>>;
}

export const AnswersData = createContext<AnswerType | null>(null);

export default function ChallengeLayout({ children }: { children: React.ReactNode }) {
    const init = localStorageUtil.getItem('answers')
        ? JSON.parse(localStorage.getItem('answers') || '[]')
        : new Array(15).fill(0);
    const [answers, setAnswers] = useState<number[]>(init);
    const [currentIdx, setCurrentIdx] = useState(0);

    const handleClick = (index: number) => {
        setCurrentIdx(index);
    };

    const temp = Array.from({ length: 15 }, (_, index) => index + 1);

    return (
        <AnswersData.Provider value={{ answers, setAnswers, currentIdx, setCurrentIdx }}>
            <div className={cx('questions')}>
                {temp.map((item) => {
                    return (
                        <span
                            key={item}
                            className={cx(currentIdx === item - 1 ? 'active' : '')}
                            onClick={() => handleClick(item - 1)}
                        >
                            Câu {item}
                        </span>
                    );
                })}
            </div>
            <div>{children}</div>
        </AnswersData.Provider>
    );
}

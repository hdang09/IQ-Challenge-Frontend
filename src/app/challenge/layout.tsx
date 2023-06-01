'use client';

import AnswersData from '@/config/contextData';
import classnames from 'classnames/bind';
import localStorageUtil from '@/utils/localStorage';
import styles from './challenge.module.scss';
import { useState } from 'react';

const cn = classnames.bind(styles);

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
            <div className={cn('questions')}>
                {temp.map((item) => {
                    return (
                        <span
                            key={item}
                            className={cn(currentIdx === item - 1 ? 'active' : '')}
                            onClick={() => handleClick(item - 1)}
                        >
                            Câu {item}
                        </span>
                    );
                })}
            </div>
            {children}
        </AnswersData.Provider>
    );
}
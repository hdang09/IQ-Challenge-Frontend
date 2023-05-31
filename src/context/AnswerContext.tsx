import localStorageUtil from '@/utils/localStorage';
import { createContext, useState } from 'react';

interface AnswerType {
    answers: number[];
    setAnswers: React.Dispatch<React.SetStateAction<number[]>>;
    currentIdx: number;
    setCurrentIdx: React.Dispatch<React.SetStateAction<number>>;
}

export const AnswersData = createContext<AnswerType | null>(null);

export default function Context({ children }: { children: React.ReactNode }) {
    const init = localStorageUtil.getItem('answers')
        ? JSON.parse(localStorage.getItem('answers') || '[]')
        : new Array(15).fill(0);
    const [answers, setAnswers] = useState<number[]>(init);
    const [currentIdx, setCurrentIdx] = useState(0);
    console.log(currentIdx);

    return (
        <AnswersData.Provider value={{ answers, setAnswers, currentIdx, setCurrentIdx }}>
            {children}
        </AnswersData.Provider>
    );
}

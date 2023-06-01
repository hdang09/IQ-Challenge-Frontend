import { createContext } from 'react';
import localStorage from '@/utils/localStorage';

interface AnswerType {
    answers: number[];
    setAnswers: React.Dispatch<React.SetStateAction<number[]>>;
    currentIdx: number;
    setCurrentIdx: React.Dispatch<React.SetStateAction<number>>;
}

const AnswersData = createContext<AnswerType>({
    answers: localStorage.getItem('answers')
        ? JSON.parse(localStorage.getItem('answers') || '[]')
        : new Array(15).fill(0),
    setAnswers: () => {},
    currentIdx: 0,
    setCurrentIdx: () => {},
});

export default AnswersData;

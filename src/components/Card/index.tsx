import React, { useState, useEffect } from 'react';

// import Popup from '../Sidebar/Popup';
import styles from './card.module.scss';
import classnames from 'classnames/bind';
// import { useDispatch } from 'react-redux';
// import { setCurrentQuestion, setUserAnswers } from '../../pages/Challenge/challengeReducer';
import Timer from '../Timer';
import Image from 'next/image';
import { Question } from '@/app/challenge/page';

const cx = classnames.bind(styles);

const Card = ({
    data,
    index,
    timeStart,
    isLong,
    key,
}: {
    data: Question;
    index: number;
    timeStart: number;
    isLong: boolean;
    key: number;
}) => {
    // const dispatch = useDispatch();
    const choices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const [open, setOpen] = useState<boolean>(false);
    const answersFromLocal: number[] = JSON.parse(localStorage.getItem('answers') || '[]');
    const [reRender, setReRender] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const changeNextQuestion = () => {
        // dispatch(setCurrentQuestion(index));
    };

    const handleUserAnswers = (num: number, ans: number) => {
        setReRender(!reRender);
        // dispatch(setUserAnswers({ num, ans }));
    };

    const showImgOrText = (item: string) => {
        if (item.startsWith('/images/')) {
            return <Image src={item} alt="Quiz image" />;
        }
        if (isLong) return <p>{item}</p>;
        return <h1>{item}</h1>;
    };

    useEffect(() => {}, [reRender]);

    return (
        <div className={cx('wrapper')} key={key}>
            <div className={cx('question')}>
                <Timer timeStart={timeStart} />
                <h2>Câu hỏi số {++index}</h2>
                {data.question.map((item) => showImgOrText(item))}
            </div>
            <div className={cx('answers-list')}>
                {data.multipleChoice.map((item, idx) => (
                    <button
                        className={cx('answers-item')}
                        key={idx}
                        // key={item.type}
                        onClick={() => handleUserAnswers(index, idx + 1)}
                        // className={idx + 1 === answersFromLocal[index - 1] ? 'active' : ''}
                    >
                        <span>{choices[idx]}</span>
                        {showImgOrText(item)}
                    </button>
                ))}
            </div>
            {index === 15 ? <a onClick={handleOpen}>Nộp bài</a> : <a onClick={changeNextQuestion}>Tiếp theo</a>}
            {/* <Popup open={open} handleClose={handleClose} /> */}
        </div>
    );
};

export default Card;

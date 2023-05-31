import { useState, useEffect, useContext } from 'react';

import styles from './card.module.scss';
import classnames from 'classnames/bind';
import Timer from '../Timer';
import Image from 'next/image';
import { Question } from '@/app/challenge/page';
import { AnswersData } from '@/context/AnswerContext';
import localStorageUtil from '@/utils/localStorage';
import Popup from '../Popup';

const cx = classnames.bind(styles);

const Card = ({
    data,
    index,
    timeStart,
    isLong,
    key,
}: {
    data?: Question;
    index: number;
    timeStart: number;
    isLong?: boolean;
    key: number;
}) => {
    // const dispatch = useDispatch();
    const choices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const contextData = useContext(AnswersData);

    const answersFromLocal: number[] = JSON.parse(localStorage.getItem('answers') || '[]');
    const [reRender, setReRender] = useState<boolean>(false);

    const changeNextQuestion = () => {
        console.log('hello');

        contextData?.setCurrentIdx((prev) => ++prev);
    };

    const handleUserAnswers = (question: number, ans: number) => {
        contextData?.setAnswers((prev) => {
            let newData = [...prev];
            newData[question - 1] = ans;
            return newData;
        });
        localStorageUtil.setItem('answers', JSON.stringify(contextData?.answers));
        setReRender(!reRender);
        // dispatch(setUserAnswers({ num, ans }));
    };

    const showImgOrText = (item: string) => {
        if (item.startsWith('/images/')) {
            return <Image src={item} alt="Quiz image" width={200} height={300} />;
        }
        if (isLong) return <p>{item}</p>;
        return <h1>{item}</h1>;
    };

    useEffect(() => {}, [reRender]);

    return (
        <div className={cx('wrapper')} id={JSON.stringify(index + 1)} key={key}>
            <div className={cx('question')}>
                <Timer timeStart={timeStart} />
                <h2>Câu hỏi số {index + 1}</h2>
                {data?.question?.map((item) => showImgOrText(item))}
            </div>
            <div className={cx('answers-list')}>
                {data?.multipleChoice?.map((item, idx) => (
                    <button
                        className={cx('answers-item', contextData?.answers[index - 1] === idx + 1 ? 'active' : '')}
                        key={item}
                        onClick={() => handleUserAnswers(index, idx + 1)}
                    >
                        <span>{choices[idx]}</span>
                        {showImgOrText(item)}
                    </button>
                ))}
            </div>
            {index === 14 ? (
                <Popup trigger={<span>Nộp bài</span>} />
            ) : (
                <span onClick={changeNextQuestion}>Tiếp theo</span>
            )}
        </div>
    );
};

export default Card;

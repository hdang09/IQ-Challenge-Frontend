import AnswersData from '@/config/contextData';
import Image from 'next/image';
import Popup from '../Popup';
import { Question } from '@/app/challenge/page';
import Timer from '../Timer';
import classnames from 'classnames/bind';
import localStorageUtil from '@/utils/localStorage';
import styles from './card.module.scss';
import { useContext } from 'react';
import useWindowDimensions from '@/hooks/useWindowDimensions';

const cn = classnames.bind(styles);

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
    key: number | string;
}) => {
    const choices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const contextData = useContext(AnswersData);

    const { width } = useWindowDimensions();

    const changeNextQuestion = () => {
        contextData.setCurrentIdx((prev) => ++prev);
    };

    const handleUserAnswers = (question: number, newAns: number) => {
        let newUserAnswers = contextData.answers.map((oldAns, idx) => (idx === question ? newAns : oldAns));

        contextData.setAnswers(newUserAnswers);
        localStorageUtil.setItem('answers', JSON.stringify(newUserAnswers));
    };

    const showImgOrText = (item: string) => {
        if (item.startsWith('/images/')) {
            return <Image src={item} alt="Quiz image" width={400} height={500} />;
        }
        if (isLong) return <p>{item}</p>;
        return <h1>{item}</h1>;
    };

    return (
        <div className={cn('wrapper')} id={JSON.stringify(index + 1)} key={key}>
            <div className={cn('question')}>
                {width < 768 && <Timer timeStart={timeStart} />}
                <h2>Câu hỏi số {index + 1}</h2>
                {data?.question?.map((item) => showImgOrText(item))}
            </div>

            <div className={cn('answers-list')}>
                {data?.multipleChoice?.map((item, idx) => (
                    <button
                        className={cn('answers-item', contextData.answers[index] === idx + 1 ? 'active' : '')}
                        key={item}
                        onClick={() => handleUserAnswers(index, idx + 1)}
                    >
                        <span>{choices[idx]}</span>
                        {showImgOrText(item)}
                    </button>
                ))}
            </div>

            {index === 14 ? (
                <Popup trigger={<span className={cn('submit-btn')}>Nộp bài</span>} />
            ) : (
                <span className={cn('submit-btn')} onClick={changeNextQuestion}>
                    Tiếp theo
                </span>
            )}
        </div>
    );
};

export default Card;

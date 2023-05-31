import { useContext } from 'react';
import styles from './mobile-layout.module.scss';
import classnames from 'classnames/bind';
import { AnswersData } from '@/context/AnswerContext';
import FCode from '@/assets/logo.svg';
import Image from 'next/image';

const cx = classnames.bind(styles);

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
    const data = useContext(AnswersData);
    const currentQuestion = data?.currentIdx;

    const handleClick = (index: number) => {
        data?.setCurrentIdx(index);
    };

    const temp = Array.from({ length: 15 }, (_, index) => index + 1);

    return (
        <main className={cx('wrapper')}>
            <header className={cx('header')}>
                <div className={cx('logo')}>
                    <Image src={FCode} alt="F-Code Logo" width={75} height={60} />
                    <p>F-Code</p>
                </div>
                {/* {pathname === '/challenge' && ( */}
                <div className={cx('questions')}>
                    {temp.map((item) => {
                        return (
                            <span
                                key={item}
                                className={cx(currentQuestion === item - 1 ? 'active' : '')}
                                onClick={() => handleClick(item - 1)}
                            >
                                Câu {item}
                            </span>
                        );
                    })}
                </div>
                {/* )} */}
            </header>
            <div className={cx('wrapper')}>{children}</div>
        </main>
    );
};

export default MobileLayout;

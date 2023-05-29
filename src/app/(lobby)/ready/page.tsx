import React from 'react';
import classnames from 'classnames/bind';
import styles from './ready.module.scss';
import Image from 'next/image';
import Question from '@/assets/ready.svg';
import Logo from '@/assets/logo.svg';
import Button from '@/components/Button';
import { BiTimeFive } from 'react-icons/bi';
import { BsQuestionCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';

const cx = classnames.bind(styles);

const LIST = [
    {
        icon: <BiTimeFive />,
        name: "Bạn sẽ có 10' để hoàn thành thử thách",
    },
    {
        icon: <BsQuestionCircleFill />,
        name: 'Tổng cộng là 20 câu hỏi cần hoàn thành',
    },
    {
        icon: <BsFillCheckCircleFill />,
        name: 'Chỉ chọn một đáp án đúng duy nhất',
    },
];

const Ready = () => {
    return (
        <>
            <Image src={Question} alt="Ready for the challenge" />
            <div className={cx('right-content')}>
                <header className={cx('header')}>
                    <Image width={75} height={85} src={Logo} alt="F-Code Logo" />
                    <h2>F-Code</h2>
                </header>
                <h1 className={cx('title')}>Chuẩn bị sẵn sàng</h1>
                <ul className={cx('list')}>
                    {LIST.map((item) => (
                        <li className={cx('item')} key={item.name}>
                            {item.icon}
                            <p>{item.name}</p>
                        </li>
                    ))}
                </ul>
                <div className={cx('submit-button')}>
                    <Button href="/challenge">Bắt đầu thử thách</Button>
                </div>
            </div>
        </>
    );
};

export default Ready;

'use client';

import AnswersData from '@/config/contextData';
import Button from '../Button';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../assets/logo.svg';
import Popup from '../Popup';
import Timer from '../Timer';
import classnames from 'classnames/bind';
import ecliseBG from '../../assets/eclipse6.png';
import ecliseRunner from '../../assets/eclipse5.png';
import styles from './sidebar.module.scss';
import { useContext } from 'react';

const cn = classnames.bind(styles);

const Sidebar = () => {
    let data = useContext(AnswersData);

    return (
        <aside className={cn('wrapper')}>
            <header className={cn('header')}>
                <Image src={Logo} width={70} height={85} alt="F-Code Logo" />
                <h2>F-Code</h2>
            </header>
            <div className={cn('item')}>
                <h2>Thời gian</h2>
                <div className={cn('timer')}>
                    <Image src={ecliseBG} alt="Background timer" />
                    <Image src={ecliseRunner} alt="Outline timer" />
                    <div />
                    <Timer />
                </div>
            </div>
            <div className={cn('item')}>
                <h2>Câu hỏi</h2>
                <div className={cn('questions')}>
                    {data.answers.map((item, idx) => (
                        <Link href={`/challenge#${idx + 1}`} className={cn('question', item ? 'active' : '')} key={idx}>
                            {++idx}
                        </Link>
                    ))}
                </div>
            </div>
            <div className={cn('item')}>
                <Popup trigger={<Button>Nộp bài</Button>} />
                <p>Kiểm tra bài làm kĩ trước khi nộp</p>
            </div>
        </aside>
    );
};

export default Sidebar;

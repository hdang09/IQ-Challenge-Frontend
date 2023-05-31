import { useContext } from 'react';
import classnames from 'classnames/bind';
import styles from './sidebar.module.scss';
import Image from 'next/image';
import Button from '../Button';
import ecliseRunner from '../../assets/eclipse5.png';
import ecliseBG from '../../assets/eclipse6.png';
import Logo from '../../assets/logo.svg';
import Timer from '../Timer';
import { AnswersData } from '@/app/challenge/layout';
import Link from 'next/link';
import Popup from '../Popup';

const cx = classnames.bind(styles);

const Sidebar = () => {
    const data = useContext(AnswersData);

    return (
        <aside className={cx('wrapper')}>
            <header className={cx('header')}>
                <Image src={Logo} width={70} height={85} alt="F-Code Logo" />
                <h2>F-Code</h2>
            </header>
            <div className={cx('item')}>
                <h2>Thời gian</h2>
                <div className={cx('timer')}>
                    <Image src={ecliseBG} alt="Background timer" />
                    <Image src={ecliseRunner} alt="Outline timer" />
                    <div />
                    <Timer />
                </div>
            </div>
            <div className={cx('item')}>
                <h2>Câu hỏi</h2>
                <div className={cx('questions')}>
                    {data?.answers.map((item, idx) => (
                        <Link href={`/challenge#${idx + 1}`} className={cx('question', item ? 'active' : '')} key={idx}>
                            {++idx}
                        </Link>
                    ))}
                </div>
            </div>
            <div className={cx('item')}>
                <Popup trigger={<Button>Nộp bài</Button>} />
                <p>Kiểm tra bài làm kĩ trước khi nộp</p>
            </div>
        </aside>
    );
};

export default Sidebar;

import { BsFillCheckCircleFill, BsQuestionCircleFill } from 'react-icons/bs';

import { BiTimeFive } from 'react-icons/bi';
import Button from '@/components/Button';
import Image from 'next/image';
import Logo from '@/assets/logo.svg';
import Question from '@/assets/ready.svg';
import classnames from 'classnames/bind';
import styles from './ready.module.scss';

const cn = classnames.bind(styles);

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
        <div className={cn('wrapper')}>
            <Image src={Question} alt="Ready for the challenge" />
            <div className={cn('right-content')}>
                <header className={cn('header')}>
                    <Image width={75} height={85} src={Logo} alt="F-Code Logo" />
                    <h2>F-Code</h2>
                </header>
                <h1 className={cn('title')}>Chuẩn bị sẵn sàng</h1>
                <ul className={cn('list')}>
                    {LIST.map((item) => (
                        <li className={cn('item')} key={item.name}>
                            {item.icon}
                            <p>{item.name}</p>
                        </li>
                    ))}
                </ul>
                <div className={cn('submit-button')}>
                    <Button href="/challenge">Bắt đầu thử thách</Button>
                </div>
            </div>
        </div>
    );
};

export default Ready;

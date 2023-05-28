import React from 'react';
import styles from './success.module.scss';
import classNames from 'classnames/bind';
import Link from 'next/link';
import Image from 'next/image';
import { BsFacebook } from 'react-icons/bs';
import Logo from '@/assets/logo.svg';
import Trophy from '@/assets/trophy.svg';

const cx = classNames.bind(styles);

const Success = () => {
    // const [userScoreBoard, setUserScoreBoard] = useState({});
    // useEffect(() => {
    //     const studentID = localStorage.getItem('studentID');
    //     const getScoreboard = async () => {
    //         try {
    //             const { data } = await getStudentResult(studentID);
    //             setUserScoreBoard(data.data);
    //         } catch (error) {
    //             console.log(error);
    //             // toast.error(error.resonse.data.message);
    //         }
    //     };
    //     getScoreboard();
    // }, []);

    const RESULT_LIST = [
        {
            name: 'Thời gian hoàn thành',
            // result: timeConvert(userScoreBoard?.time),
        },
        {
            name: 'Số câu trả lời đúng',
            // result: userScoreBoard?.score,
        },
        {
            name: 'Vị trí xếp hạng',
            result: <Link href="/rank">Xem BXH</Link>,
        },
    ];

    return (
        <main className={cx('wrapper')}>
            <Image src={Trophy} alt="Trophy" />
            <div className={cx('right-content')}>
                <header className={cx('header')}>
                    <Image src={Logo} width={60} height={75} alt="F-Code Logo" />
                    <h2>F-Code</h2>
                </header>
                <h1 className={cx('title')}>
                    Chúc mừng bạn đã hoàn thành thử thách <span>Finding Apollo</span>
                </h1>
                <p className={cx('subtitle')}>Kết quả bạn đã đạt được:</p>
                <div className={cx('result-list')}>
                    {RESULT_LIST.map((item) => (
                        <div className={cx('result-item')} key={item.name}>
                            <h3>{item.name}</h3>
                            <div>{item.result}</div>
                        </div>
                    ))}
                </div>
                <div className={cx('more-info')}>
                    <p>Tìm hiểu thêm về CLB tại:</p>
                    <div className={cx('facebook')}>
                        <BsFacebook color="#5599FF" />
                        <a href="https://www.facebook.com/fcodefpt">Facebook fanpage F-Code</a>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Success;

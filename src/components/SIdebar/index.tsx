import React from 'react';
import classnames from 'classnames/bind';
import styles from './sidebar.module.scss';
import Image from 'next/image';
import Button from '../Button';
import ecliseRunner from '../../assets/eclipse5.png';
import ecliseBG from '../../assets/eclipse6.png';
import Logo from '../../assets/logo.svg';

const cx = classnames.bind(styles);
const Sidebar = () => {
    // const dispatch = useDispatch();
    // const answers = useSelector(studentAnswersSelector);

    // const [open, setOpen] = useState(false);

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    // const handleClick = (i) => {
    //     dispatch(setCurrentQuestion(i));
    // };

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
                    {/* <Timer /> */}
                </div>
            </div>
            <div className={cx('item')}>
                <h2>Câu hỏi</h2>
                <div className={cx('questions')}>
                    {/* {questions.map((item) => (
                        <div
                            className={cx('question')}
                            key={item}
                            onClick={() => handleClick(item)}
                            className={answers[item] ? 'active' : ''}
                        >
                            {item + 1}
                        </div>
                    ))} */}
                </div>
            </div>
            <div className={cx('item')}>
                <Button
                    href="/success"
                    //  onClick={handleOpen}
                >
                    Nộp bài
                </Button>
                <p>Kiểm tra bài làm kĩ trước khi nộp</p>
            </div>

            {/* <Popup open={open} handleClose={handleClose} /> */}
        </aside>
    );
};

export default Sidebar;

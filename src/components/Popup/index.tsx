import { submitTheTest } from '@/utils/iqApi';
import styles from './popup.module.scss';

import Button from '../Button';
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import ReactPopup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const Popup = ({ trigger }: { trigger: any }) => {
    const router = useRouter();

    const answers: any[] = JSON.parse(localStorage.getItem('answers') || '[]');
    const isAnswerAll = answers.every((ans) => ans !== 0) && answers.length === 15;

    const handleSubmit = async () => {
        const name = localStorage.getItem('name');
        const code = localStorage.getItem('studentID');

        if (!name || !code) return;

        try {
            await submitTheTest(name, code, answers);
            router.push('/success');
        } catch (error) {
            console.error(error);
            // toast.error(error.response.data.message);
        }
    };

    return (
        <ReactPopup trigger={trigger} modal nested>
            {(close) => (
                <div className={cx('dialog')}>
                    <h1>
                        Xác nhận hoàn thành thử thách <span>Finding Apollo</span>
                    </h1>
                    <p>
                        Bạn nên kiểm tra bài làm trước khi nộp để chắc chắn trả lời đầy đủ các câu hỏi. Sau khi Nộp bài,
                        hành động này không thể hoàn tác.
                    </p>
                    {!isAnswerAll && (
                        <h2>
                            <span>Lưu ý:</span> Bạn chưa hoàn thành hết 15 câu hỏi
                        </h2>
                    )}
                    <h2>Bạn chắc chắn muốn nộp bài chứ?</h2>
                    <div className={cx('buttons')}>
                        <button onClick={close}>Quay lại</button>
                        <Button onClick={handleSubmit}>Nộp bài</Button>
                    </div>
                </div>
            )}
        </ReactPopup>
    );
};

export default Popup;

import 'reactjs-popup/dist/index.css';

import Button from '../Button';
import Cookies from 'universal-cookie';
import ReactPopup from 'reactjs-popup';
import classNames from 'classnames/bind';
import localStorage from '@/utils/localStorage';
import styles from './popup.module.scss';
import { submitTheTest } from '@/utils/iqApi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

// import { toast } from 'react-toastify';

const cn = classNames.bind(styles);

const Popup = ({ trigger }: { trigger: any }) => {
    const router = useRouter();

    const answers: any[] = JSON.parse(localStorage.getItem('answers') || '[]');
    const isAnswerAll = answers.every((ans) => ans !== 0) && answers.length === 15;

    const handleSubmit = async () => {
        const name = localStorage.getItem('name');
        const code = localStorage.getItem('studentID');

        if (!name || !code) return;

        toast.promise(submitTheTest(name, code, answers), {
            pending: 'Đang nộp bài...',
            success: {
                render({ data }) {
                    localStorage.removeItem('name');
                    localStorage.removeItem('answers');
                    new Cookies().remove('answers');
                    localStorage.removeItem('time_start');
                    router.push('/success');
                    return data?.data?.message || 'Nộp bài thành công';
                },
            },
            error: {
                render({ data }) {
                    // TODO: Fix this return
                    console.log(data);
                    // return data?.response?.data?.message! || 'Có lỗi trong việc nộp bài';
                    return 'Có lỗi trong việc nộp bài';
                },
            },
        });
    };

    const Comp: any = (close: any) => {
        return (
            <div className={cn('dialog')}>
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
                <div className={cn('buttons')}>
                    {/* <button onClick={close}>Quay lại</button> */}
                    <Button onClick={handleSubmit}>Nộp bài</Button>
                </div>
            </div>
        );
    };

    return (
        <ReactPopup trigger={trigger} modal nested>
            <Comp />
        </ReactPopup>
    );
};

export default Popup;

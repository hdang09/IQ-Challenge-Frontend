'use client';

import { useState } from 'react';
import styles from './register.module.scss';
import classnames from 'classnames/bind';
import Button from '@/components/Button';
import Image from 'next/image';
import Logo from '@/assets/logo.svg';
import Bulb from '@/assets/login.svg';
import { register } from '@/utils/iqApi';
import { useRouter } from 'next/navigation';

const cx = classnames.bind(styles);

const Register = () => {
    const [name, setName] = useState<string>('');
    const [studentID, setStudentID] = useState<string>('');

    console.log(name + studentID);

    let router = useRouter();

    const validate = async () => {
        const isValid = /^(S|s)[E|A|S|s|e|a]+([0-9]{6})$/.test(studentID);
        console.log(isValid);

        if (isValid) {
            try {
                const res = await register(name, studentID);
                if (res.status === 200) {
                    localStorage.setItem('answers', '[]');
                    localStorage.setItem('name', name);
                    localStorage.setItem('studentID', studentID);
                    router.push('/ready');
                }
            } catch (err) {
                console.log(err);
                // toast.error(err.response.data.message);
            }
        } else {
            // toast.error('Bạn vui lòng nhập đúng MSSV giúp F-Code nhé!');
        }
    };

    return (
        <>
            <div className={cx('left-content')}>
                <header className={cx('header')}>
                    <Image src={Logo} width={75} height={85} alt="F-Code Logo" />
                    <h2>F-Code</h2>
                </header>
                <h1 className={cx('title')}>
                    Nhập <span>Họ tên, MSSV</span> của bạn
                </h1>
                <p className={cx('description')}>
                    Chấp nhận tham gia thử thách bằng cách điền mã số sinh viên và tra cứu kết quả sau khi hoàn thành
                </p>
                <input
                    className={cx('input', 'name')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.keyCode === 13 && validate}
                    placeholder="Nguyễn Văn A"
                />
                <input
                    className={cx('input', 'code')}
                    value={studentID}
                    onChange={(e) => setStudentID(e.target.value)}
                    onKeyDown={(e) => e.keyCode === 13 && validate}
                    placeholder="SE180000"
                />
                <div className={cx('submit-button')}>
                    <Button onClick={validate}>Tiếp tục</Button>
                </div>
            </div>
            <div className={cx('right-content')}>
                <Image src={Bulb} alt="Right content" />
            </div>
        </>
    );
};

export default Register;

'use client';

import 'react-toastify/dist/ReactToastify.css';

import Bulb from '@/assets/login.svg';
import Button from '@/components/Button';
import Image from 'next/image';
import Logo from '@/assets/logo.svg';
import classnames from 'classnames/bind';
import localStorage from '@/utils/localStorage';
import { register } from '@/utils/iqApi';
import styles from './register.module.scss';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const cn = classnames.bind(styles);

const Register = () => {
    const [name, setName] = useState<string>('');
    const [studentID, setStudentID] = useState<string>('');

    let router = useRouter();

    const validate = async () => {
        if (!name.length) {
            toast.error('Họ và tên không được bỏ trống!');
            return;
        }

        const isValidStudentID: boolean = /^(S|s)[E|A|S|s|e|a]+([0-9]{6})$/.test(studentID);
        if (!isValidStudentID) {
            toast.error('Bạn vui lòng nhập đúng MSSV theo cú pháp SExxxxxx, SAxxxxxx, SSxxxxxx giúp F-Code nhé!');
            return;
        }

        try {
            const res = await register(name, studentID);
            if (res.status === 200) {
                localStorage.setItem('answers', '[]');
                localStorage.setItem('name', name);
                localStorage.setItem('studentID', studentID);
                router.push('/ready');
            }
        } catch (err: any) {
            console.log(err);
            toast.error(err.response.data.message);
        }
    };

    return (
        <div className={cn('wrapper')}>
            <div className={cn('left-content')}>
                <header className={cn('header')}>
                    <Image src={Logo} width={75} height={85} alt="F-Code Logo" />
                    <h2>F-Code</h2>
                </header>
                <h1 className={cn('title')}>
                    Nhập <span>Họ tên, MSSV</span> của bạn
                </h1>
                <p className={cn('description')}>
                    Chấp nhận tham gia thử thách bằng cách điền mã số sinh viên và tra cứu kết quả sau khi hoàn thành
                </p>
                <input
                    className={cn('input', 'name')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.keyCode === 13 && validate}
                    placeholder="Nguyễn Văn A"
                />
                <input
                    className={cn('input', 'code')}
                    value={studentID}
                    onChange={(e) => setStudentID(e.target.value)}
                    onKeyDown={(e) => e.keyCode === 13 && validate}
                    placeholder="SExxxxxx"
                />
                <div className={cn('submit-button')}>
                    <Button onClick={validate}>Tiếp tục</Button>
                </div>
            </div>
            <div className={cn('right-content')}>
                <Image src={Bulb} alt="Right content" />
            </div>
        </div>
    );
};

export default Register;

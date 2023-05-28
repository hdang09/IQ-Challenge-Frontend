import React from 'react';
import styles from './register.module.scss';
import classnames from 'classnames/bind';
import Button from '@/components/Button';

const cx = classnames.bind(styles);

const Register = () => {
    const validate = async () => {
        // const isValid = /^(S|s)[E|A|S|s|e|a]+([0-9]{6})$/.test(code);
        // if (isValid) {
        //     try {
        //         const res = await register(name, code);
        //         if (res.status === 200) {
        //             localStorage.setItem('answers', '[]');
        //             localStorage.setItem('name', name);
        //             localStorage.setItem('studentID', code);
        //             navigate('/ready');
        //         }
        //     } catch (err) {
        //         console.log(err);
        //         toast.error(err.response.data.message);
        //     }
        // } else {
        //     toast.error('Bạn vui lòng nhập đúng MSSV giúp F-Code nhé!');
        // }
    };

    return (
        <main className={cx('wrapper')}>
            <div className={cx('left-content')}>
                <header className={cx('header')}>
                    {/* <AnimateSVG svg={Logo} /> */}
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
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    // onKeyDown={(e) => e.keyCode === 13 && validate}
                    placeholder="Nguyễn Văn A"
                />
                <input
                    className={cx('input', 'code')}
                    // value={code}
                    // onChange={(e) => setCode(e.target.value)}
                    // onKeyDown={(e) => e.keyCode === 13 && validate}
                    placeholder="SE180000"
                />
                <div className={cx('wrapper-buttons')}>
                    <Button
                    // onClick={validate}
                    >
                        Tiếp tục
                    </Button>
                </div>
            </div>
            <div className={cx('right-content')}>{/* <AnimateSVG svg={Bulb} /> */}</div>
        </main>
    );
};

export default Register;

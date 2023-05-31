import styles from './mobile-layout.module.scss';
import classnames from 'classnames/bind';
import FCode from '@/assets/logo.svg';
import Image from 'next/image';

const cx = classnames.bind(styles);

const MobileHeader = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className={cx('wrapper')}>
            <header className={cx('header')}>
                <div className={cx('logo')}>
                    <Image src={FCode} alt="F-Code Logo" width={75} height={60} />
                    <p>F-Code</p>
                </div>
            </header>
            <div className={cx('container')}>{children}</div>
        </main>
    );
};

export default MobileHeader;

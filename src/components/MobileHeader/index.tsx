import FCode from '@/assets/logo.svg';
import Image from 'next/image';
import classnames from 'classnames/bind';
import styles from './mobile-layout.module.scss';

const cn = classnames.bind(styles);

const MobileHeader = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className={cn('wrapper')}>
            <header className={cn('header')}>
                <div className={cn('logo')}>
                    <Image src={FCode} alt="F-Code Logo" width={75} height={60} />
                    <p>F-Code</p>
                </div>
            </header>
            <div className={cn('container')}>{children}</div>
        </main>
    );
};

export default MobileHeader;

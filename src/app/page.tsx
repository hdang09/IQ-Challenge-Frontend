import Button from '@/components/Button';
import styles from './page.module.scss';
import classnames from 'classnames/bind';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../assets/logo.svg';

const cx = classnames.bind(styles);

export default function Home() {
    return (
        <main className={cx('wrapper')}>
            <Image src={Logo} width={250} height={350} alt="F-Code Logo" />
            <p>
                Chào mừng các bạn sinh viên đến với cuộc thi <span>Finding Apollo</span> do CLB F-Code tổ chức
            </p>
            <div className={cx('buttons')}>
                <Link href="/rank">Xem bảng xếp hạng</Link>
                <Button href="/register">Tiếp tục</Button>
            </div>
        </main>
    );
}

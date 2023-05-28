import React from 'react';
import classnames from 'classnames/bind';
import styles from './lobby.module.scss';

const cx = classnames.bind(styles);

export default function LobbyLayout({ children }: { children: React.ReactNode }) {
    return <main className={cx('main')}>{children}</main>;
}

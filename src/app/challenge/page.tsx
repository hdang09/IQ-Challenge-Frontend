import React from 'react';
import classnames from 'classnames/bind';
import styles from './challenge.module.scss';
import Sidebar from '@/components/SIdebar';

const cx = classnames.bind(styles);

const Challenge = () => {
    return (
        <main className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('container')}></div>
        </main>
    );
};

export default Challenge;

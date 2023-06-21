import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';
import classnames from 'classnames/bind';
import styles from './card.module.scss';

const cn = classnames.bind(styles);

const CardSkeleton = () => {
    const choices: string[] = ['A', 'B', 'C', 'D'];

    return (
        <div className={cn('wrapper')}>
            <div className={cn('question')}>
                <h2>
                    <Skeleton width={200} height={25} />
                </h2>
                <Skeleton height={200} />
            </div>

            <div className={cn('answers-list')}>
                {choices.map((item) => (
                    <button className={cn('answers-item')} key={item}>
                        <Skeleton circle inline width={50} height={50} />
                        <Skeleton width={200} height={25} />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CardSkeleton;

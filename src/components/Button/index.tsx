import Link from 'next/link';
import styles from './button.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

type ButtonProps = {
    children: string | React.ReactNode;
    href?: string;
    onClick?: () => void;
};

const Button = ({ children = 'Click me!', href, onClick, ...rest }: ButtonProps) => {
    if (href) {
        return (
            <Link href={href} className={cx('wrapper')} onClick={onClick} {...rest}>
                {children}
            </Link>
        );
    }

    return (
        <button className={cx('wrapper')} onClick={onClick} {...rest}>
            {children}
        </button>
    );
};

export default Button;

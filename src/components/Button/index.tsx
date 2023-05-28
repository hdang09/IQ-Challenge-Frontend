import Link from 'next/link';
import styles from './button.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

interface ButtonProps {
    children: string | React.ReactNode;
    href?: string;
}

const Button = ({ children = 'Click me!', href, ...rest }: ButtonProps) => {
    if (href) {
        return (
            <Link href={href} className={cx('wrapper')} {...rest}>
                {children}
            </Link>
        );
    }

    return (
        <button className={cx('wrapper')} {...rest}>
            {children}
        </button>
    );
};

export default Button;

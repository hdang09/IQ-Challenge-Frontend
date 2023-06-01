import Link from 'next/link';
import classnames from 'classnames/bind';
import styles from './button.module.scss';

const cn = classnames.bind(styles);

type ButtonProps = {
    children: string | React.ReactNode;
    href?: string;
    onClick?: () => void;
};

const Button = ({ children = 'Click me!', href, onClick, ...rest }: ButtonProps) => {
    const Wrapper = href ? Link : 'button';

    return (
        <Wrapper href={href || ''} className={cn('wrapper')} onClick={onClick} {...rest}>
            {children}
        </Wrapper>
    );
};

export default Button;

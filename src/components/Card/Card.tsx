import cc from 'classcat';
import { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.scss';

type Props = HTMLAttributes<HTMLElement> & {
    children: ReactNode,
    className?: string,
    withHover?: boolean
    withHalo?: boolean
}

export default function Card({
    children,
    className,
    withHover = false,
    withHalo = false,
    ...rest
}: Props) {
    return (
        <div
            className={cc([
                styles.root,
                withHover && styles.withHover,
                withHalo && styles.withHalo,
                className
            ])}
            {...rest}
        >
            {children}
        </div>
    );
}

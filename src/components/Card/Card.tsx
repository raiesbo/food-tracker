import { Card as MUICard } from '@mui/material';
import cc from 'classcat';
import { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.scss';

type Props = HTMLAttributes<HTMLElement> & {
    children: ReactNode,
    className?: string,
    withHover?: boolean
}

export default function Card({
    children,
    className,
    withHover = false,
    ...rest
}: Props) {
    return (
        <MUICard
            className={cc([styles.root, withHover && styles.withHover, className])}
            {...rest}
        >
            {children}
        </MUICard>
    )
}

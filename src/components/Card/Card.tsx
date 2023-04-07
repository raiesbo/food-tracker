import { Card as MUICard } from '@mui/material';
import cc from 'classcat';
import { ReactNode } from 'react';
import styles from './Card.module.scss';

type Props = {
    children: ReactNode,
    className?: string,
    withHover?: boolean
}

export default function Card({ children, className, withHover = false }: Props) {
    return (
        <MUICard className={cc([styles.root, withHover && styles.withHover, className])}>
            {children}
        </MUICard>
    )
}

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import cc from 'classcat';
import { ReactNode, useState } from 'react';
import { Text } from '../Text';
import styles from './InfoSection.module.scss';

type Props = {
    children: ReactNode,
    title: string,
    className?: string,
    childrenClassName?: string,
}

export default function InfoSection({ children, title, className, childrenClassName }: Props) {
    const [ isCollapsed, setIsCollapsed ] = useState(false);

    return (
        <section className={cc([
            styles.root,
            isCollapsed && styles.root_collapsed,
            className
        ])}>
            <header className={styles.header}>
                <Text as='h2' variant='h3' bold>
                    {title}
                </Text>
                <IconButton size='small'
                    className={cc([ isCollapsed && styles.rotateChevron ])}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <ExpandMoreIcon />
                </IconButton>
            </header>
            <div className={cc([
                styles.sectionContent,
                isCollapsed && styles.sectionContent_collapsed,
                childrenClassName
            ])}>
                {children}
            </div>
        </section>
    );
}

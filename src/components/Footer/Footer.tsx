import Link from 'next/link';
import styles from './Footer.module.scss';
import cc from 'classcat';

type Props = {
    withSideBar?: boolean
}
export default function Footer({ withSideBar = false }: Props) {

    return (
        <footer className={cc([styles.root, withSideBar && styles.root_withSideBar])}>
            <div className={styles.footerContent}>
                <Link href={'/feedback'} className={styles.link}>Feedback</Link>
            </div>
        </footer>
    );
}

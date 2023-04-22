import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {

    return (
        <footer className={styles.root}>
            <div className={styles.footerContent}>
                <Link href={'/feedback'}>Feedback</Link>
            </div>
        </footer>
    );
}

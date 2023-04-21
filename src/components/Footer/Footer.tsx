import { useUser } from '@auth0/nextjs-auth0/client';
import styles from './Footer.module.scss';

export default function Footer() {
    const { error } = useUser();

    return (
        <footer className={styles.root}>
            Footer {!!error}
        </footer>
    );
}

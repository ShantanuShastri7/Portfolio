import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.text}>
                Designed & Built by <span className={styles.highlight}>Shantanu Shastri</span>
            </p>
        </footer>
    );
}

import Link from 'next/link';
import { Mail } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact() {
    return (
        <section id="contact" className={styles.contact}>
            <div className={styles.container}>
                <h2 className={styles.title}>Get In Touch</h2>
                <p className={styles.subtitle}>
                    I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                </p>
                <Link href="mailto:shantanushastri70@gmail.com" className={styles.emailButton}>
                    <Mail />
                    Say Hello
                </Link>
            </div>
        </section>
    );
}

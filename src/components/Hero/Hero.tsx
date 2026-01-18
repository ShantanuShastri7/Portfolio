import Link from 'next/link';
import { Github, Linkedin, Mail, FileText, Send } from 'lucide-react';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <span className={styles.greeting}>Hi, I am</span>
                    <h1 className={styles.name}>Shantanu Shastri,</h1>
                    <h2 className={styles.title}>Software Engineer</h2>
                    <p className={styles.description}>
                        Master&apos;s student at Carnegie Mellon University. Passionate about AI, distributed systems, and building technology that scales.
                        I love solving complex problems and creating software that is both reliable and impactful.
                    </p>

                    <div className={styles.socials}>
                        <Link href="https://github.com/ShantanuShastri7" target="_blank">
                            <Github className={styles.socialIcon} />
                        </Link>
                        <Link href="https://www.linkedin.com/in/shantanushastri/" target="_blank">
                            <Linkedin className={styles.socialIcon} />
                        </Link>
                        <Link href="mailto:shantanushastri70@gmail.com">
                            <Mail className={styles.socialIcon} />
                        </Link>
                        <Link href="/resume.pdf" target="_blank">
                            <FileText className={styles.socialIcon} />
                        </Link>
                    </div>

                    <Link href="#contact" className={styles.ctaButton}>
                        <Send size={18} />
                        Get In Touch
                    </Link>
                </div>

                <div className={styles.visual}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/Portfolio/profile.png"
                            alt="Shantanu Shastri"
                            fill
                            className={styles.profileImage}
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

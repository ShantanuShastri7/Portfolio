import Link from 'next/link';
import styles from './Navbar.module.css';

const navItems = [
    { label: 'Skills', href: '/#skills' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Education', href: '/#education' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Blogs', href: '/#blog' },
    { label: 'SWE Resume', href: '/swe_resume.pdf' },
    { label: 'MLE Resume', href: '/mle_resume.pdf' },
    { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>
                <span>&lt;/&gt;</span> Shantanu Shastri
            </Link>

            <ul className={styles.navLinks}>
                {navItems.map((item) => (
                    <li key={item.label}>
                        <Link href={item.href} className={styles.navLink}>
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

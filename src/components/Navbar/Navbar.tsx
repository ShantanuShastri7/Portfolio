"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
    const pathname = usePathname();

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('/#')) {
            const targetId = href.replace('/#', '');
            if (pathname === '/') {
                e.preventDefault();
                const elem = document.getElementById(targetId);
                if (elem) {
                    elem.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', `#${targetId}`);
                }
            }
        }
    };

    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>
                <span>&lt;/&gt;</span> Shantanu Shastri
            </Link>

            <ul className={styles.navLinks}>
                {navItems.map((item) => (
                    <li key={item.label}>
                        <Link 
                            href={item.href} 
                            className={styles.navLink}
                            onClick={(e) => handleScroll(e, item.href)}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

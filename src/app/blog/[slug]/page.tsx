import { blogPosts } from '@/data/blogs';
import styles from './page.module.css';
import Link from 'next/link';
import { ArrowLeft, Github, Linkedin, Calendar } from 'lucide-react';
import { notFound } from 'next/navigation';

interface BlogPostProps {
    params: {
        slug: string;
    };
}

// Generate static params for static export
export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({ params }: BlogPostProps) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <main className={styles.container}>
            <div className={styles.contentWrapper}>
                <Link href="/#blog" className={styles.backLink}>
                    <ArrowLeft size={16} /> Back to Blogs
                </Link>

                <article className={styles.article}>
                    <header className={styles.header}>
                        <h1 className={styles.title}>{post.title}</h1>

                        <div className={styles.metaRow}>
                            <span className={styles.date}>
                                <Calendar size={14} /> {post.date}
                            </span>

                            <div className={styles.socialLinks}>
                                {post.githubUrl && (
                                    <Link href={post.githubUrl} target="_blank" className={styles.socialLink}>
                                        <Github size={18} /> View Code
                                    </Link>
                                )}
                                {post.linkedinUrl && (
                                    <Link href={post.linkedinUrl} target="_blank" className={styles.socialLink}>
                                        <Linkedin size={18} /> Discuss on LinkedIn
                                    </Link>
                                )}
                            </div>
                        </div>
                    </header>

                    <div
                        className={styles.content}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
            </div>
        </main>
    );
}

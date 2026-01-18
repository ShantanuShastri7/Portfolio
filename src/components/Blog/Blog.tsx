import Link from 'next/link';
import { ArrowUpRight, Github, Linkedin, BookOpen } from 'lucide-react';
import styles from './Blog.module.css';
import { blogPosts } from '@/data/blogs';

export default function Blog() {
    return (
        <section id="blog" className={styles.blog}>
            <div className={styles.container}>
                <h2 className={styles.title}>Recent Posts</h2>
                <div className={styles.grid}>
                    {blogPosts.map((post) => (
                        <div key={post.slug} className={styles.card}>
                            <div className={styles.cardContent}>
                                <div className={styles.meta}>
                                    <span className={styles.date}>{post.date}</span>
                                </div>

                                <h3 className={styles.postTitle}>{post.title}</h3>
                                <p className={styles.excerpt}>{post.excerpt}</p>
                            </div>

                            <div className={styles.actions}>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className={styles.readButton}
                                >
                                    <BookOpen size={18} />
                                    Read Article
                                </Link>

                                <div className={styles.links}>
                                    {post.githubUrl && (
                                        <Link
                                            href={post.githubUrl}
                                            target="_blank"
                                            className={styles.iconLink}
                                            title="View Code"
                                        >
                                            <Github size={20} />
                                        </Link>
                                    )}
                                    {post.linkedinUrl && (
                                        <Link
                                            href={post.linkedinUrl}
                                            target="_blank"
                                            className={styles.iconLink}
                                            title="View on LinkedIn"
                                        >
                                            <Linkedin size={20} />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";
import { GraduationCap } from 'lucide-react';
import { useState } from 'react';
import Modal from '../ui/Modal';
import styles from './Education.module.css';

const education = [
    {
        degree: "Master's of Information Systems Management",
        school: 'Carnegie Mellon University',
        year: 'Expected Dec 2026',
        gpa: '3.85',
        description: 'Focusing on distributed systems, machine learning, Artificial Intelligence, and software architecture.',
        details: {
            courses: [
                'Distributed Systems',
                'Cloud Computing',
                'Machine Learning in Production',
                'Introduction to Deep Learning',
                'Database Management Systems',
                'Generative AI Lab',
                'Object Oriented Programming in Java'
            ],
            certifications: [],
            activities: [
                'Graduate Teaching Assistant for Software Architectures (17-635)',
                'Application programmer at Scotty Labs in CMU',
                'Member of CMU Data Science Club',
            ]
        }
    },
    {
        degree: 'Bachelor of Electronics and Communications Engineering with Minor in Data Science',
        school: 'Manipal Institute of Technology',
        year: 'August 2022',
        gpa: '3.99',
        description: 'Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, Data Science, Machine Learning, Linear Algebra.',
        details: {
            courses: [
                'Data Structures & Algorithms',
                'Object-Oriented Programming',
                'Data Science',
                'Machine Learning',
                'Linear Algebra',
            ],
            certifications: [
                'Mathematics for Machine Learning: Linear Algebra',
                'Unsupervised Machine Learning for Customer Market Segmentation',
                'Web Applications for Everybody Specialization',
                'Web Design for Everybody: Basics of Web Development & Coding Specialization',
                'Programming for Everybody (Getting Started with Python)',
                'Introduction to Structured Query Language (SQL)',
                'What is Data Science?'
            ],
            activities: [
                'President for University\'s Dramatics Club',
            ]
        }
    }
];

export default function Education() {
    const [selectedEdu, setSelectedEdu] = useState<typeof education[0] | null>(null);

    return (
        <section id="education" className={styles.education}>
            <div className={styles.container}>
                <h2 className={styles.title}>Education</h2>
                <div className={styles.grid}>
                    {education.map((edu, index) => (
                        <div
                            key={index}
                            className={styles.card}
                            onClick={() => setSelectedEdu(edu)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className={styles.icon}>
                                <GraduationCap size={24} />
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.degree}>{edu.degree}</h3>
                                <div className={styles.school}>{edu.school}</div>
                                <div className={styles.meta}>
                                    <span>{edu.year}</span>
                                    {edu.gpa && <span>• GPA: {edu.gpa}</span>}
                                </div>
                                {edu.description && <p className={styles.description}>{edu.description}</p>}
                                <p className={styles.clickHint}>Click to view detailed curriculum</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal isOpen={!!selectedEdu} onClose={() => setSelectedEdu(null)}>
                {selectedEdu && (
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <GraduationCap size={40} className={styles.modalIcon} />
                            <div>
                                <h2 className={styles.modalTitle}>{selectedEdu.degree}</h2>
                                <p className={styles.modalSchool}>{selectedEdu.school}</p>
                            </div>
                        </div>

                        <div className={styles.modalBody}>
                            {selectedEdu.details.courses.length > 0 && (
                                <div className={styles.section}>
                                    <h3>Coursework</h3>
                                    <div className={styles.tags}>
                                        {selectedEdu.details.courses.map(course => (
                                            <span key={course} className={styles.tag}>{course}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedEdu.details.certifications.length > 0 && (
                                <div className={styles.section}>
                                    <h3>Certifications</h3>
                                    <ul className={styles.list}>
                                        {selectedEdu.details.certifications.map(cert => (
                                            <li key={cert}>{cert}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {selectedEdu.details.activities.length > 0 && (
                                <div className={styles.section}>
                                    <h3>Activities & Societies</h3>
                                    <ul className={styles.list}>
                                        {selectedEdu.details.activities.map(act => (
                                            <li key={act}>{act}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </section>
    );
}

"use client";
import { Briefcase, Building2, MapPin } from 'lucide-react';
import { useState } from 'react';
import Modal from '../ui/Modal';
import styles from './Experience.module.css';
import { getTechData } from '../../utils/icons';

const experiences = [
    {
        role: 'Software Developer 2 - Associate',
        company: 'BlackRock',
        location: 'Gurgaon, India',
        type: 'Full-time',
        date: 'Jan 2025 - July 2025',
        duration: '7 months',
        description: 'Designed a distributed microservices architecture for client agnostic bank routing configurations across 120+ global clients, automating 1.5+ million manual touchpoints.',
        skills: ['Java', 'Springboot', 'Apache', 'Angular', 'SQL'],
        projects: [
            {
                name: 'Distributed Central Data Architecture',
                description: 'Designed and implemented a central data architecture to manage routing configurations for the Aladdin platform. This system automated over 1.5 million manual touchpoints annually, significantly reducing operational toil and error rates. The architecture combined Azure Blob storage with MySQL to deliver a scalable and performant solution.',
                tech: ['Java', 'Springboot', 'MySQL', 'Azure Blob Storage', 'Apache Kafka', 'gRPC']
            },
            {
                name: 'Micro-Front end based User Interface design + development',
                description: 'Designed and implemented a micro frontend architecture for the Aladdin platform, allowing for independent deployment and updates of different dashboard widgets.',
                tech: ['Angular', 'TypeScript', 'RxJS', 'UI Design', 'Figma']
            },
            {
                name: 'Async Caching Framework',
                description: 'Orchestrated a distributed read-through cache using Apache Ignite to improve data retrieval performance for high-frequency trading applications. Achieved 99.9% cache hit ratio and reduced latency by 40%',
                tech: ['Java', 'Apache Ignite', 'gRPC', 'Distributed Caching']
            }
        ]
    },
    {
        role: 'Software Developer 1 - Analyst',
        company: 'BlackRock',
        location: 'Gurgaon, India',
        type: 'Full-time',
        date: 'July 2022 - Dec 2024',
        duration: '2 yr 6 mos',
        description: 'Improve Real-Time trading platform performance by working on multiple projects to create scalable and distributed solutions using Java, SQL, C++, Zookeeper, Apache Kafka. Worked on critical financial market regulatory projects like the US T+1 market shift, ensuring BlackRock operations face 0 downtime. Analyzed BlackRock market data and performed feature engineering on 100+ data points to create a real-time recommendation system.',
        skills: ['Java', 'SQL', 'gRPC', 'Apache', 'Python', 'Angular', 'TypeScript'],
        projects: [
            {
                name: 'Horizontal scaling of Singleton servers using Apache Zookeeper',
                description: 'Implemented a distributed server network using Singleton services that allowed horizontal scaling of servers using Apache Zookeeper. This allowed for better load balancing and improved system performance.',
                tech: ['Java', 'Apache Zookeeper', 'gRPC', 'Distributed System', 'WebSocket Communication']
            },
            {
                name: 'Real-time Recommendation System',
                description: 'Developed a real-time recommendation system using Python and machine learning algorithms based on decision trees to analyze BlackRock market data and perform feature engineering on 100+ data points.',
                tech: ['Python', 'Machine Learning', 'Feature Engineering', 'Real-time Recommendation System']
            },
            {
                name: 'US T+1 Market Shift',
                description: 'Worked on critical financial market regulatory projects like the US T+1 market shift, ensuring BlackRock operations face 0 downtime.',
                tech: ['Java', 'SQL', 'gRPC', 'FIX protocol']
            },
            {
                name: 'Improved user experience using Server-Sent Events',
                description: 'Improved user experience using Server-Sent Events to provide real-time updates to users.',
                tech: ['Java', 'WebSocket', 'Server-Sent Events', 'Angular', 'TypeScript', 'RxJS']
            }
        ]
    },
    {
        role: 'Software Developer Internship',
        company: 'BlackRock',
        location: 'Remote',
        type: 'Internship',
        date: 'Jan 2022 - June 2022',
        duration: '6 months',
        description: 'Built micro frontend UI modules. Developed a caching framework for asynchronously storing static data.',
        skills: ['Angular', 'Java', 'TypeScript', 'RxJS'],
        projects: [
            {
                name: 'Async Caching Framework',
                description: 'Developed a caching framework for asynchronously storing and retrieving static financial data, improving initial page load times by 30%.',
                tech: ['Java', 'REST']
            }
        ]
    },
    {
        role: 'Data Science Intern',
        company: 'Shunya Inc.',
        location: 'Remote',
        type: 'Internship',
        date: 'June 2020 - Sep 2020',
        duration: '4 months',
        description: 'Created automated workflow in Python to analyze childrens answer sheets using OpenCV.',
        skills: ['Python', 'OpenCV', 'K-Means'],
        projects: [
            {
                name: 'Automated Grading System',
                description: 'Created an automated workflow in Python to analyze scanned images of children\'s answer sheets using OpenCV and K-Means clustering. The system automatically detected and graded multiple-choice answers with 95% accuracy.',
                tech: ['Python', 'OpenCV', 'Machine Learning']
            }
        ]
    }
];

export default function Experience() {
    const [selectedExp, setSelectedExp] = useState<typeof experiences[0] | null>(null);

    return (
        <section id="experience" className={styles.experience}>
            <div className={styles.container}>
                <h2 className={styles.title}>Experience</h2>
                <div className={styles.timeline}>
                    {experiences.map((exp, index) => (
                        <div key={index} className={styles.timelineItem}>
                            <div
                                className={`${styles.card} ${styles.clickable}`}
                                onClick={() => setSelectedExp(exp)}
                            >
                                <div className={styles.cardHeader}>
                                    <div className={styles.companyLogo}>
                                        <Building2 size={20} />
                                    </div>
                                    <div>
                                        <h3 className={styles.role}>{exp.role}</h3>
                                        <div className={styles.companyRow}>
                                            <div className={styles.pill}><Building2 size={12} /> {exp.company}</div>
                                            <div className={styles.pill}><MapPin size={12} /> {exp.location}</div>
                                            <div className={styles.pill}><Briefcase size={12} /> {exp.type}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.dateRow}>
                                    {exp.date} &middot; {exp.duration}
                                </div>

                                <p className={styles.description}>
                                    {exp.description}
                                </p>

                                <div className={styles.skills}>
                                    {exp.skills.map(s => {
                                        const { Icon: TechIcon, color } = getTechData(s);
                                        return (
                                            <div key={s} className={styles.skillIcon} title={s} style={{ color: color, borderColor: color + '44' }}>
                                                <TechIcon size={16} />
                                            </div>
                                        )
                                    })}
                                </div>
                                <p className={styles.clickHint}>Click to view projects</p>
                            </div>

                            <div className={styles.timelineMarker}>
                                <div className={styles.diamond}>
                                    <div className={styles.innerDiamond}></div>
                                </div>
                            </div>

                            <div className={styles.emptySpace}></div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal isOpen={!!selectedExp} onClose={() => setSelectedExp(null)}>
                {selectedExp && (
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <div className={styles.modalLogo}>
                                <Building2 size={32} />
                            </div>
                            <div>
                                <h2 className={styles.modalTitle}>{selectedExp.role}</h2>
                                <h3 className={styles.modalCompany}>{selectedExp.company}</h3>
                                <div className={styles.modalMeta}>
                                    <span>{selectedExp.date}</span>
                                    <span>•</span>
                                    <span>{selectedExp.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.modalBody}>
                            <h3 className={styles.sectionTitle}>Projects & Achievements</h3>
                            <div className={styles.projectsGrid}>
                                {selectedExp.projects.map((project, i) => (
                                    <div key={i} className={styles.projectCard}>
                                        <h4 className={styles.projectName}>{project.name}</h4>
                                        <p className={styles.projectDesc}>{project.description}</p>
                                        <div className={styles.projectTech}>
                                            {project.tech.map(t => (
                                                <span key={t} className={styles.techTag}>{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </section>
    );
}

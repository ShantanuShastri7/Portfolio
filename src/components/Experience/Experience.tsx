"use client";
import { Briefcase, Building2, MapPin } from 'lucide-react';
import { useState } from 'react';
import Modal from '../ui/Modal';
import styles from './Experience.module.css';
import { getTechData } from '../../utils/icons';

const experiences = [
    {
        role: 'AI Engineer Intern',
        company: 'BlackRock',
        location: 'Gurgaon, India',
        type: 'Internship',
        date: 'June 2026 - Aug 2026',
        duration: '3 months',
        description: 'Building a Multi-Agent system to handle post-trade operations, creating a semantic layer using Protobuf and event sourcing via Apache Kafka. Developing a hierarchical multi-agent system running on Knowledge Graph RAG that creates patterns to identify and learn from user actions.',
        skills: ['Python', 'Kafka', 'Neo4j', 'Milvus', 'Protobuf', 'LLM', 'RAG'],
        projects: [
            {
                name: 'Multi-Agent Post-Trade System',
                description: 'Built a Multi-Agent system to handle post-trade operations, creating a semantic layer using Protobuf and event sourcing via Apache Kafka.',
                tech: ['Python', 'Apache Kafka', 'Protobuf', 'Multi-Agent Systems']
            },
            {
                name: 'Hierarchical Knowledge Graph RAG',
                description: 'Developing a hierarchical multi-agent system running on Knowledge Graph RAG that creates patterns to identify and learn from user actions.',
                tech: ['LLM', 'RAG', 'Neo4j', 'Milvus']
            }
        ]
    },
    {
        role: 'Software Developer 2 - Associate',
        company: 'BlackRock',
        location: 'Gurgaon, India',
        type: 'Full-time',
        date: 'Jan 2025 - July 2025',
        duration: '7 months',
        description: 'Architected a central data framework and TTL Azure Blob microservices to resolve legacy bottlenecks, successfully automating 1.5M+ touchpoints across 117 clients. Engineered a distributed read-through Ignite cache to address high-latency APIs, cutting response times by 3x.',
        skills: ['Java', 'Springboot', 'Apache', 'Angular', 'SQL', 'TypeScript'],
        projects: [
            {
                name: 'Distributed Central Data Architecture',
                description: 'Architected a central data framework and TTL Azure Blob microservices to resolve legacy bottlenecks, successfully automating 1.5M+ touchpoints across 117 clients while significantly reducing infrastructure storage costs.',
                tech: ['Java', 'Springboot', 'MySQL', 'Azure Blob Storage']
            },
            {
                name: 'Micro-Front end User Interfaces',
                description: 'Designed and implemented a micro frontend architecture for the Aladdin platform, allowing for independent deployment and updates of different dashboard widgets using TypeScript and Angular.',
                tech: ['Angular', 'TypeScript', 'RxJS', 'UI Design']
            },
            {
                name: 'Async Caching Framework',
                description: 'Engineered a distributed read-through Ignite cache to address high-latency APIs, cutting response times by 3x.',
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
        description: 'Resolved critical singleton bottlenecks by engineering a sharded, multi-instance server environment with Zookeeper leader election, effectively distributing load and boosting system performance by 24%. Achieved 37% reduction in query latency by refactoring critical legacy database tables.',
        skills: ['Java', 'SQL', 'Zookeeper', 'Apache', 'Python', 'Angular', 'TypeScript'],
        projects: [
            {
                name: 'Horizontal scaling using Apache Zookeeper',
                description: 'Resolved critical singleton bottlenecks by engineering a sharded, multi-instance server environment with Zookeeper leader election, effectively distributing load and boosting system performance by 24%.',
                tech: ['Java', 'Apache Zookeeper', 'gRPC', 'Distributed System']
            },
            {
                name: 'Database Optimization',
                description: 'Achieved 37% reduction in query latency by refactoring critical legacy database tables and leveraging composite indexes for faster data retrieval, significantly improving user experiences for key workflows.',
                tech: ['PostgreSQL', 'SQL', 'Database Optimization']
            },
            {
                name: 'Real-time Recommendation System',
                description: 'Developed a real-time recommendation system using Python and machine learning algorithms based on decision trees to analyze BlackRock market data and perform feature engineering on 100+ data points.',
                tech: ['Python', 'Machine Learning', 'Feature Engineering']
            },
            {
                name: 'CI/CD Pipelines & DevOps',
                description: 'Built comprehensive CI/CD pipelines using Azure DevOps, with integrated JUnit/Jacoco testing suites, reducing time-to-market by 40% while maintaining SONAR scores >90%.',
                tech: ['Azure DevOps', 'CI/CD', 'JUnit', 'SonarQube']
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
        description: 'Engineered GPU-accelerated PyTorch workflows on a Linux environment, building foundational tooling to reliably automate evaluations and reduce grading time by 90%.',
        skills: ['Python', 'OpenCV', 'K-Means', 'PyTorch'],
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

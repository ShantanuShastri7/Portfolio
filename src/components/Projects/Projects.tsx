import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';
import styles from './Projects.module.css';
import { getTechData } from '../../utils/icons';

const projects = [
    {
        title: 'Magic Wand ML',
        subtitle: 'Edge AI (No Frameworks)',
        duration: 'Jan 2026',
        description: 'End-to-end MLOps pipeline: Custom Python Training -> JSON Bridge -> Pure JavaScript Edge Inference. Runs directly in browser.',
        tags: ['Python', 'JavaScript', 'NumPy', 'Deep Learning', 'MLOps', 'Edge AI'],
        github: 'https://github.com/ShantanuShastri7/MultiLayerPerceptronBasedMagicWand',
        demo: 'https://shantanushastri7.github.io/MultiLayerPerceptronBasedMagicWand/web_app/index.html',
        dates: { start: 'Jan 2026', end: 'Present' }
    },
    {
        title: 'Seizure Identification',
        subtitle: 'Healthcare AI',
        duration: 'Jan - Oct 2024',
        description: 'IoT-integrable model for seizure prediction using EEG data (12k+ patients). Achieved 97.49% accuracy.',
        tags: ['Python', 'Deep Learning', 'TensorFlow', 'Keras', 'Multi-model learning', 'LLM Traning', 'LLM Inference', 'IoT', 'EEG'],
        github: 'https://github.com/ShantanuShastri7',
        dates: { start: 'Jan 2024', end: 'Oct 2024' }
    },
    {
        title: 'Leaf Disease OCR',
        subtitle: 'Computer Vision',
        duration: 'Mar 2024 - Present',
        description: 'Hybrid Transformer-CNN model for detecting leaf diseases. 98.10% accuracy on 50k images.',
        tags: ['Transformers', 'CNN', 'Python', 'Image Processing', 'Computer Vision', 'Medical AI'],
        github: 'https://github.com/ShantanuShastri7/PaperImplementations/tree/main/CTransCNN',
        dates: { start: 'Mar 2024', end: 'Feb 2025' }
    },
    {
        title: 'Neural Networks (Scratch)',
        subtitle: 'Deep Learning',
        duration: 'Auust 2025',
        description: 'Implemented MLP and CNN from scratch using NumPy with custom pooling and backprop.',
        tags: ['Python', 'NumPy', 'Deep Learning', 'MLP', 'CNN', 'Backpropagation', 'Custom Pooling'],
        github: 'https://github.com/ShantanuShastri7',
        dates: { start: 'Aug 2025', end: 'Sep 2025' }
    },
    {
        title: 'Phoneme Classification',
        subtitle: 'Speech Processing',
        duration: 'August 2025',
        description: 'MLP-based classifier for speech recognition using Mel-spectrograms. 96.1% accuracy.',
        tags: ['MLP', 'Speech Recognition', 'Python', 'Mel-spectrograms', 'Speech Processing'],
        github: 'https://github.com/ShantanuShastri7',
        dates: { start: 'Sep 2025', end: 'Oct 2025' }
    },
    {
        title: 'Facial Recognition',
        subtitle: 'Biometrics',
        duration: 'Oct 2025',
        description: 'CNN-based model using ArcFace loss for improved class separation. EER of 0.029.',
        tags: ['CNN', 'CV', 'Biometrics', 'Python', 'Face Recognition', 'ArcFace Loss'],
        github: 'https://github.com/ShantanuShastri7',
        dates: { start: 'Oct 2025', end: 'Nov 2025' }
    }
];

export default function Projects() {
    return (
        <section id="projects" className={styles.projects}>
            <div className={styles.container}>
                <h2 className={styles.title}>Projects</h2>



                <div className={styles.grid}>
                    {projects.map((project, index) => {
                        // Use the first tag to determine the main icon
                        const { Icon: MainIcon, color: mainIconColor } = getTechData(project.tags[0]);

                        return (
                            <div key={index} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.iconBox} style={{ color: mainIconColor }}>
                                        <MainIcon size={24} />
                                    </div>
                                    <div className={styles.links}>
                                        {project.demo && (
                                            <Link href={project.demo} target="_blank" className={styles.linkIcon} title="Live Demo">
                                                <ExternalLink size={20} />
                                            </Link>
                                        )}
                                        <Link href={project.github} target="_blank" className={styles.linkIcon} title="GitHub Repo">
                                            <Github size={20} />
                                        </Link>
                                    </div>
                                </div>

                                <h3 className={styles.projectTitle}>{project.title}</h3>

                                <div className={styles.metaRow}>
                                    <span className={styles.subtitle}>{project.subtitle}</span>
                                    <span className={styles.duration}>{project.duration}</span>
                                </div>

                                <p className={styles.description}>{project.description}</p>

                                <div className={styles.footer}>
                                    <div className={styles.datePills}>
                                        <span className={styles.datePill}>{project.dates.start}</span>
                                        <span className={styles.datePill}>{project.dates.end}</span>
                                    </div>

                                    <div className={styles.tags}>
                                        {project.tags.map((tag) => {
                                            const { Icon: TagIcon, color: tagColor } = getTechData(tag);
                                            return (
                                                <div key={tag} className={styles.techIconContainer} title={tag} style={{ color: tagColor, borderColor: tagColor + '44' }}>
                                                    <TagIcon size={16} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}


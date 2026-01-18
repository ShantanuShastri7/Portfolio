
import styles from './Skills.module.css';
import { getTechData } from '../../utils/icons';

const skillCategories = [
    {
        title: 'AI, Machine Learning & Deep Learning',
        items: [
            { name: 'Deep Learning' },
            { name: 'RAG' },
            { name: 'Prompt Engineering' },
            { name: 'Hyper Parameter Tuning' },
            { name: 'Data Preprocessing' },
            { name: 'Speech Recognition' },
            { name: 'Transformer Architecture' },
        ]
    },
    {
        title: 'Programming Languages',
        items: [
            { name: 'Java' },
            { name: 'Python' },
            { name: 'TypeScript' },
            { name: 'C++' },
            { name: 'SQL' }
        ]
    },
    {
        title: 'Libraries',
        items: [
            { name: 'Pandas' },
            { name: 'NumPy' },
            { name: 'Scikit-learn' },
            { name: 'Keras' },
            { name: 'OpenCV' },
            { name: 'Redux' }
        ]
    },
    {
        title: 'Frameworks',
        items: [
            { name: 'Spring Boot' },
            { name: 'Angular' },
            { name: 'PyTorch' },
            { name: 'TensorFlow' }
        ]
    },
    {
        title: 'DevOps & Cloud',
        items: [
            { name: 'Linux' },
            { name: 'Kubernetes' },
            { name: 'AWS' },
            { name: 'Git' },
            { name: 'GitHub Actions' }
        ]
    },
    {
        title: 'Distributed Systems',
        items: [
            { name: 'Apache Kafka' },
            { name: 'Apache Ignite' },
            { name: 'Zookeeper' },
        ]
    },
    {
        title: 'Databases',
        items: [
            { name: 'MySQL' },
            { name: 'PostgreSQL' },
            { name: 'Apache Kafka' },
            { name: 'Azure Blob' },
            { name: 'Supabase' },
        ]
    },
    {
        title: 'Testing',
        items: [
            { name: 'JUnit' },
            { name: 'Mockito' },
        ]
    }
];

export default function Skills() {
    return (
        <section id="skills" className={styles.skills}>
            <div className={styles.container}>
                <h2 className={styles.title}>Skills</h2>



                {skillCategories.map((category) => (
                    <div key={category.title} className={styles.categorySection}>
                        <h3 className={styles.categoryTitle}>
                            <span className={styles.dashLine}></span>
                            {category.title}
                        </h3>

                        <div className={styles.grid}>
                            {category.items.map((skill) => {
                                const { Icon: SkillIcon, color } = getTechData(skill.name);

                                return (
                                    <div key={skill.name} className={styles.card} style={{ borderColor: color + '33' }}>
                                        <span className={styles.skillName}>{skill.name}</span>
                                        <div className={styles.backgroundIcon} style={{ color: color }}>
                                            {/* Render standard icon with partial opacity as the background graphic */}
                                            <SkillIcon size={120} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

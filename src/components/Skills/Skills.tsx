
import styles from './Skills.module.css';
import { getTechData } from '../../utils/icons';

const skillCategories = [
    {
        title: 'AI, Machine Learning & Deep Learning',
        items: [
            { name: 'Deep Learning' },
            { name: 'RAG' },
            { name: 'LangChain' },
            { name: 'LlamaIndex' },
            { name: 'Generative AI' },
            { name: 'Data Preprocessing' },
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
            { name: 'GoLang' },
            { name: 'SQL' }
        ]
    },
    {
        title: 'Libraries & Tools',
        items: [
            { name: 'Pandas' },
            { name: 'NumPy' },
            { name: 'Scikit-learn' },
            { name: 'PyTorch' },
            { name: 'Ray Data' },
            { name: 'Redux' }
        ]
    },
    {
        title: 'Frameworks',
        items: [
            { name: 'Spring Boot' },
            { name: 'Next.js' },
            { name: 'Angular' },
            { name: 'FastAPI' },
            { name: 'Node.js' }
        ]
    },
    {
        title: 'DevOps & Cloud',
        items: [
            { name: 'Docker' },
            { name: 'Kubernetes' },
            { name: 'AWS' },
            { name: 'Git' },
            { name: 'CI/CD' }
        ]
    },
    {
        title: 'Distributed Systems',
        items: [
            { name: 'Apache Kafka' },
            { name: 'Zookeeper' },
            { name: 'Apache Ignite' },
        ]
    },
    {
        title: 'Databases',
        items: [
            { name: 'MySQL' },
            { name: 'PostgreSQL' },
            { name: 'Neo4j' },
            { name: 'Milvus' },
            { name: 'Azure Blob' },
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

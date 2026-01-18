import {
    SiPython, SiJavascript, SiTypescript, SiCplusplus, SiMysql,
    SiApachespark, SiPytorch, SiTensorflow, SiKeras, SiOpencv, SiNumpy,
    SiPandas, SiSpringboot, SiApachekafka, SiRedis, SiPostgresql, SiDocker,
    SiKubernetes, SiAmazon, SiLinux, SiGit, SiReact, SiNextdotjs,
    SiAngular, SiHtml5, SiCss3, SiGnubash, SiApache,
    SiScikitlearn, SiRedux, SiGithubactions, SiSupabase, SiJunit5
} from 'react-icons/si';
import { FaDatabase, FaBrain, FaRobot, FaServer, FaCode, FaJava } from 'react-icons/fa';

import { IconType } from 'react-icons';

export interface TechData {
    Icon: IconType;
    color: string;
}

export const getTechData = (name: string): TechData => {
    const normalize = (str: string) => str.toLowerCase().replace(/[\s\.\-\/]/g, '');

    const map: Record<string, TechData> = {
        'python': { Icon: SiPython, color: '#3776AB' },
        'javascript': { Icon: SiJavascript, color: '#F7DF1E' },
        'js': { Icon: SiJavascript, color: '#F7DF1E' },
        'typescript': { Icon: SiTypescript, color: '#3178C6' },
        'ts': { Icon: SiTypescript, color: '#3178C6' },
        'java': { Icon: FaJava, color: '#007396' },
        'cpp': { Icon: SiCplusplus, color: '#00599C' },
        'c++': { Icon: SiCplusplus, color: '#00599C' },
        'sql': { Icon: SiMysql, color: '#4479A1' },
        'mysql': { Icon: SiMysql, color: '#4479A1' },
        'postgresql': { Icon: SiPostgresql, color: '#336791' },
        'redis': { Icon: SiRedis, color: '#DC382D' },
        'apachespark': { Icon: SiApachespark, color: '#E25A1C' },
        'spark': { Icon: SiApachespark, color: '#E25A1C' },
        'pytorch': { Icon: SiPytorch, color: '#EE4C2C' },
        'tensorflow': { Icon: SiTensorflow, color: '#FF6F00' },
        'keras': { Icon: SiKeras, color: '#D00000' },
        'opencv': { Icon: SiOpencv, color: '#5C3EE8' },
        'numpy': { Icon: SiNumpy, color: '#013243' },
        'pandas': { Icon: SiPandas, color: '#150458' },
        'springboot': { Icon: SiSpringboot, color: '#6DB33F' },
        'spring': { Icon: SiSpringboot, color: '#6DB33F' },
        'kafka': { Icon: SiApachekafka, color: '#231F20' },
        'apachekafka': { Icon: SiApachekafka, color: '#231F20' },
        'angular': { Icon: SiAngular, color: '#DD0031' },
        'react': { Icon: SiReact, color: '#61DAFB' },
        'nextjs': { Icon: SiNextdotjs, color: '#000000' }, // Dark theme contrast issues, maybe keep white or generic
        'node': { Icon: FaServer, color: '#339933' },
        'nodejs': { Icon: FaServer, color: '#339933' },
        'aws': { Icon: SiAmazon, color: '#FF9900' },
        'docker': { Icon: SiDocker, color: '#2496ED' },
        'kubernetes': { Icon: SiKubernetes, color: '#326CE5' },
        'git': { Icon: SiGit, color: '#F05032' },
        'linux': { Icon: SiLinux, color: '#FCC624' },
        'html': { Icon: SiHtml5, color: '#E34F26' },
        'css': { Icon: SiCss3, color: '#1572B6' },
        'bash': { Icon: SiGnubash, color: '#4EAA25' },
        'apache': { Icon: SiApache, color: '#D22128' },
        'ocr': { Icon: FaBrain, color: '#FF69B4' },
        'iot': { Icon: FaRobot, color: '#00CED1' },
        'deeplearning': { Icon: FaBrain, color: '#FFD700' },
        'machinelearning': { Icon: FaBrain, color: '#32CD32' },
        'transformers': { Icon: FaBrain, color: '#FF4500' },
        'cnn': { Icon: FaBrain, color: '#8A2BE2' },
        'mlp': { Icon: FaBrain, color: '#FF1493' },
        'arcface': { Icon: FaBrain, color: '#A0522D' },
        'speechrecognition': { Icon: FaBrain, color: '#1E90FF' },
        'nlp': { Icon: FaBrain, color: '#DAA520' },
        'grpc': { Icon: FaServer, color: '#244c5a' },
        'systemdesign': { Icon: FaCode, color: '#777777' },
        'rag': { Icon: FaDatabase, color: '#008080' },
        'promptengineering': { Icon: FaCode, color: '#FF00FF' },
        'hyperparametertuning': { Icon: FaCode, color: '#B0C4DE' },
        'datapreprocessing': { Icon: FaDatabase, color: '#708090' },
        'transformerarchitecture': { Icon: FaBrain, color: '#483D8B' },
        'scikitlearn': { Icon: SiScikitlearn, color: '#F7931E' },
        'redux': { Icon: SiRedux, color: '#764ABC' },
        'githubactions': { Icon: SiGithubactions, color: '#24292E' },
        'supabase': { Icon: SiSupabase, color: '#336791' },
        'junit5': { Icon: SiJunit5, color: '#E44823' },
    };

    return map[normalize(name)] || { Icon: FaCode, color: '#888888' };
};

// Keep backwards compatibility for a moment or just refactor everything (choosing refactor)
export const getTechIcon = (name: string): IconType => getTechData(name).Icon;

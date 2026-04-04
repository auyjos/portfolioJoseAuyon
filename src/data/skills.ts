export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  geometry: 'cube' | 'torus' | 'octahedron' | 'doubleHelix';
  technologies: string[];
  description: string;
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    icon: 'faCode',
    geometry: 'cube',
    technologies: [
      'React', 'Next.js', 'Vue.js', 'Node.js', 'Express.js',
      'Flask', 'FastAPI', 'Laravel', 'Spring Boot', 'React Native', 'GraphQL',
    ],
    description: 'Modern web applications across frontend and backend with diverse frameworks.',
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    icon: 'faCloud',
    geometry: 'torus',
    technologies: [
      'AWS', 'Azure', 'Docker', 'Kubernetes', 'GitHub Actions',
      'GitLab CI/CD', 'Nginx', 'Firebase', 'Railway', 'Vercel',
    ],
    description: 'CI/CD pipelines, container orchestration, cloud infrastructure, deployment automation.',
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    icon: 'faBrain',
    geometry: 'octahedron',
    technologies: [
      'OpenAI API', 'Gemini', 'RAG', 'Vector DBs', 'Prompt Engineering',
      'PyTorch', 'scikit-learn', 'Pandas', 'LangChain',
    ],
    description: 'AI integrations, neural networks, predictive modeling, LLM-powered applications.',
  },
  {
    id: 'data',
    title: 'Data & Databases',
    icon: 'faDatabase',
    geometry: 'doubleHelix',
    technologies: [
      'PostgreSQL', 'MySQL', 'MongoDB', 'Oracle', 'Supabase',
      'Neo4j', 'Pandas', 'PowerBI', 'R',
    ],
    description: 'Database design, data pipelines, analytics, visualization.',
  },
];

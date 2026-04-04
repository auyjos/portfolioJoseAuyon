export interface Certificate {
  id: string;
  title: string;
  provider: string;
  category: 'backend' | 'ai' | 'algorithm' | 'programming' | 'cloud' | 'devops' | 'softskills' | 'framework' | 'engineering' | 'database';
  image: string;
  verifyUrl?: string;
}

export const certificates: Certificate[] = [
  {
    id: 'java-spring',
    title: 'Java Backend (Spring Boot) Developer',
    provider: 'Ada School / Swisscontact',
    category: 'backend',
    image: 'javaprogramming1',
  },
  {
    id: 'bootdev-backend',
    title: 'Back-end Developer Professional Certificate',
    provider: 'Boot.dev',
    category: 'backend',
    image: 'softwareengineer',
  },
  {
    id: 'chatgpt-prompt',
    title: 'ChatGPT Prompt Engineering for Developers',
    provider: 'DataCamp',
    category: 'ai',
    image: 'softwareengineer',
  },
  {
    id: 'ai-agent-python',
    title: 'Build an AI Agent in Python',
    provider: 'Boot.dev',
    category: 'ai',
    image: 'softwareengineer',
  },
  {
    id: 'hackerrank-swe',
    title: 'Software Engineering Certification',
    provider: 'HackerRank',
    category: 'engineering',
    image: 'softwareengineer',
  },
  {
    id: 'sql-advanced',
    title: 'SQL (Advanced) Certificate',
    provider: 'HackerRank',
    category: 'database',
    image: 'sqladvanced',
  },
  {
    id: 'problem-solving',
    title: 'Problem Solving (Intermediate)',
    provider: 'HackerRank',
    category: 'algorithm',
    image: 'problemsolvingint',
  },
  {
    id: 'js-intermediate',
    title: 'JavaScript Intermediate',
    provider: 'HackerRank',
    category: 'programming',
    image: 'jsint',
  },
  {
    id: 'java-programming',
    title: 'Java Programming',
    provider: 'Coursera',
    category: 'programming',
    image: 'javaprogramming1',
  },
  {
    id: 'hpe-cloud',
    title: 'HPE Cloud Certification',
    provider: 'HPE',
    category: 'cloud',
    image: 'hpe1',
  },
  {
    id: 'aws-devops',
    title: 'AWS DevOps: Code, Build, and Test',
    provider: 'AWS / edX',
    category: 'devops',
    image: 'aws1',
  },
  {
    id: 'high-performance',
    title: 'High-Performance Group Meetings',
    provider: 'Training',
    category: 'softskills',
    image: 'highperformance1',
  },
  {
    id: 'laravel-cert',
    title: 'Laravel Developer Certificate',
    provider: 'Udemy',
    category: 'framework',
    image: 'laravel',
  },
  {
    id: 'software-intern',
    title: 'Software Intern Program',
    provider: 'HackerRank',
    category: 'engineering',
    image: 'softwareintern',
  },
];

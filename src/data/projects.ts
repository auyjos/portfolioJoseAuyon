export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  category: 'frontend' | 'backend' | 'fullstack' | 'ai-ml' | 'systems';
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'mern-ecommerce',
    title: 'MERN E-commerce Platform',
    description: 'Full-stack e-commerce platform with product management, dark/light mode, and state management using Zustand.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Chakra UI', 'Zustand'],
    category: 'fullstack',
    liveUrl: 'https://e-commerce-jznx.onrender.com',
    githubUrl: 'https://github.com/auyjos/mern-ecommerce',
    image: 'mernProducts',
    featured: true,
  },
  {
    id: 'vanlife',
    title: 'VanLife — Van Rental Platform',
    description: 'Van rental platform with browse, host dashboard, analytics, and Firebase authentication.',
    techStack: ['React', 'React Router v6', 'Firebase', 'Vite', 'MirageJS'],
    category: 'fullstack',
    liveUrl: 'https://van-life-green-iota.vercel.app',
    image: 'vanLifeApp',
    featured: false,
  },
  {
    id: 'tenzies',
    title: 'Tenzies Dice Game',
    description: 'Interactive dice game with score tracking, timer, and responsive animations.',
    techStack: ['React', 'JavaScript', 'CSS'],
    category: 'frontend',
    liveUrl: 'https://tenzies-game-react.netlify.app',
    image: 'tenziesGame',
    featured: false,
  },
  {
    id: 'eda-generator',
    title: 'EDA Generator',
    description: 'Dataset insight tool with automated data cleaning and exploratory data analysis.',
    techStack: ['Python', 'Pandas', 'Data Science'],
    category: 'ai-ml',
    githubUrl: 'https://github.com/auyjos/Proyecto1DS.git',
    image: 'edaproject',
    featured: false,
  },
  {
    id: 'neural-attrition',
    title: 'Neural Network Employee Attrition Predictor',
    description: 'Predictive model using neural networks and PCA for employee attrition analysis.',
    techStack: ['Python', 'Neural Networks', 'PCA', 'scikit-learn'],
    category: 'ai-ml',
    githubUrl: 'https://github.com/erickguerra22/ProyectoFinal_DS.git',
    image: 'neuralnetwork',
    featured: false,
  },
  {
    id: 'xmpp-chat',
    title: 'XMPP Live Chat',
    description: 'Real-time chat application with user profiles and contact management.',
    techStack: ['React', 'Node.js', 'XMPP'],
    category: 'fullstack',
    githubUrl: 'https://github.com/auyjos/xmpp-react-app.git',
    image: 'xmppimage',
    featured: false,
  },
  {
    id: 'hough-transform',
    title: 'Hough Transform using CUDA',
    description: 'GPU-accelerated image processing using CUDA for PGM file line detection.',
    techStack: ['CUDA', 'C++', 'GPU Computing'],
    category: 'systems',
    githubUrl: 'https://github.com/auyjos/HoughTransform.git',
    image: 'houghTransform',
    featured: false,
  },
  {
    id: 'berserk-match',
    title: 'Berserk Match',
    description: 'Memory card game built with React hooks and component state.',
    techStack: ['React.js', 'JavaScript'],
    category: 'frontend',
    liveUrl: 'https://wemanage.jp',
    image: 'berserkMatch',
    featured: false,
  },
  {
    id: 'covid-hunt',
    title: 'Covid Hunt Game',
    description: '2D shooting game built with OOP principles and Greenfoot framework.',
    techStack: ['Java', 'Greenfoot', 'OOP'],
    category: 'systems',
    image: 'covidHunt',
    featured: false,
  },
];

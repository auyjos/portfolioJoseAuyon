export interface SubProject {
  name: string;
  tech: string[];
  accomplishments: string[];
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  techStack: string[];
  subProjects?: SubProject[];
}

export const experience: ExperienceEntry[] = [
  {
    id: 'htec',
    role: 'Software Engineer',
    company: 'HTEC Group',
    location: 'Remote',
    startDate: 'Sep 2025',
    endDate: 'Present',
    description: 'Contributing to production systems and delivery workflows for enterprise client initiatives across frontend, backend, infrastructure, and deployment.',
    techStack: ['PHP', 'CodeIgniter', 'React', 'Tailwind', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS', 'WordPress'],
    subProjects: [
      {
        name: 'NovoPayment',
        tech: ['PHP/CodeIgniter', 'JavaScript', 'AWS', 'CI/CD'],
        accomplishments: [
          'Fixed critical customer-facing validation and input-handling issues',
          'Resolved multi-tenant registration and onboarding defects',
          'Coordinated releases with backend and infrastructure teams',
        ],
      },
      {
        name: 'FocalPoints',
        tech: ['React', 'Tailwind', 'FastAPI', 'PostgreSQL', 'Docker'],
        accomplishments: [
          'Contributed to technical analysis and phased MVP delivery planning',
          'Built full-stack functionality across frontend, APIs, auth, and document workflows',
          'Defined deployment environments, CI/CD practices, and release-readiness standards',
        ],
      },
      {
        name: 'Crypto Wallet Discovery',
        tech: ['Architecture', 'Security', 'Estimation'],
        accomplishments: [
          'Conducted architecture analysis for a wallet solution',
          'Evaluated build-versus-buy options and security considerations',
          'Produced scope breakdowns and risk assessments for delivery scenarios',
        ],
      },
      {
        name: 'RedBud Advisors',
        tech: ['WordPress', 'Elementor', 'PHP', 'Nginx'],
        accomplishments: [
          'Led technical execution from scope definition through deployment',
          'Managed deployment, domain, DNS, and migration tasks',
        ],
      },
    ],
  },
  {
    id: 'pixel',
    role: 'Software Developer',
    company: 'Pixel Productions',
    location: 'Remote',
    startDate: 'Jun 2025',
    endDate: 'Sep 2025',
    description: 'Automated Shopify inventory workflows, implemented storefront UI changes, and built features for internal systems.',
    techStack: ['Shopify', 'Liquid', 'Next.js', 'Firebase', 'Laravel', 'CSS', 'JavaScript'],
  },
  {
    id: 'freelance',
    role: 'Freelance Full Stack Developer',
    company: 'Self-Employed',
    location: 'Remote',
    startDate: 'Apr 2024',
    endDate: 'Present',
    description: 'Building custom full-stack web and mobile solutions including AI integrations, SaaS platforms, and internal tools.',
    techStack: ['JavaScript', 'Flask', 'Express.js', 'React Native', 'Golang', 'MongoDB', 'PHP', 'MySQL'],
    subProjects: [
      {
        name: 'Alina (Legal AI SaaS)',
        tech: ['Vanilla JS', 'Flask', 'Private AI Provider'],
        accomplishments: [
          'Built frontend and backend for automated legal document processing',
          'Integrated with private AI provider for document automation',
        ],
      },
      {
        name: 'Aquacorp',
        tech: ['Express.js', 'REST APIs'],
        accomplishments: [
          'Built backend services for water-resource monitoring',
        ],
      },
      {
        name: 'Educational Game',
        tech: ['React Native', 'Golang', 'MongoDB'],
        accomplishments: [
          'Built platform for math learning with auth and mission tracking',
        ],
      },
      {
        name: 'Retail CRM/ERP',
        tech: ['PHP', 'MySQL'],
        accomplishments: [
          'Developed sales, inventory, and customer management solution',
        ],
      },
    ],
  },
  {
    id: 'kgcc',
    role: 'Full Stack Developer',
    company: 'Korean-Guatemalan Chamber of Commerce',
    location: 'Guatemala',
    startDate: 'Nov 2023',
    endDate: 'Mar 2024',
    description: 'Built and optimized web applications, developed RESTful APIs, and mentored junior developers.',
    techStack: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
  },
  {
    id: 'ceibillal',
    role: 'Software Developer',
    company: 'Granja El Ceibillal',
    location: 'Guatemala',
    startDate: 'Mar 2023',
    endDate: 'Nov 2023',
    description: 'Built software for poultry farm operations, real-time monitoring, and data management. Reduced operational losses.',
    techStack: ['React Native', 'Flask', 'AWS'],
  },
  {
    id: 'uvg-tutor',
    role: 'Computer Science Tutor',
    company: 'Universidad del Valle de Guatemala',
    location: 'Guatemala',
    startDate: 'Jan 2021',
    endDate: 'Present',
    description: 'Tutoring students in programming, algorithms, problem solving, and core CS concepts.',
    techStack: [],
  },
];

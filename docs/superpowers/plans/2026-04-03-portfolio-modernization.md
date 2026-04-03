# Portfolio Modernization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite José Auyón's portfolio as an immersive, animation-driven SPA with 3D geometries, smooth scroll, cinematic video intro, and modern tooling.

**Architecture:** Vite + React 18 SPA. Three.js (via R3F) renders interactive 3D wireframe geometries per section. GSAP + ScrollTrigger drives all scroll-based animations. Lenis provides smooth inertia scrolling. Remotion generates a hero intro video at dev time. All content lives in typed data files. Custom navigation replaces MUI.

**Tech Stack:** Vite, React 18, TypeScript, @react-three/fiber, @react-three/drei, GSAP, Lenis, Remotion, SCSS, Playwright

**Spec:** `docs/superpowers/specs/2026-04-03-portfolio-modernization-design.md`

---

## Phase 1: Foundation (Vite Migration + Core Infrastructure)

### Task 1: Migrate from CRA to Vite

**Files:**
- Create: `vite.config.ts`
- Create: `index.html` (root — move from `public/index.html`)
- Modify: `package.json`
- Modify: `tsconfig.json`
- Delete: `public/index.html` (moved to root)
- Modify: `src/index.tsx` (remove reportWebVitals)

- [ ] **Step 1: Install Vite and plugins**

```bash
npm install vite @vitejs/plugin-react --save-dev
npm install sass --save-dev
```

- [ ] **Step 2: Create `vite.config.ts`**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
  assetsInclude: ['**/*.pdf'],
});
```

- [ ] **Step 3: Move and update `index.html`**

Copy `public/index.html` to the project root. Add the Vite entry point script tag before closing `</body>`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/jicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0d1116" />
    <meta name="description" content="José Auyón — Software Engineer & AI Builder" />
    <link rel="manifest" href="/manifest.json" />
    <title>José Auyón | Software Engineer & AI Builder</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Update `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "types": ["vite/client"]
  },
  "include": ["src"]
}
```

- [ ] **Step 5: Create `src/vite-env.d.ts`**

```typescript
/// <reference types="vite/client" />

declare module '*.pdf' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}
```

- [ ] **Step 6: Update `src/index.tsx`**

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 7: Update `package.json` scripts**

Replace the scripts section:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

- [ ] **Step 8: Remove CRA dependencies**

```bash
npm uninstall react-scripts @testing-library/jest-dom @testing-library/react @testing-library/user-event web-vitals @babel/plugin-proposal-private-property-in-object @types/jest
```

Delete `src/reportWebVitals.ts` and `src/react-app-env.d.ts` if they exist.

- [ ] **Step 9: Move static assets**

Move remaining files from `public/` to `public/` (Vite serves `public/` as static root — same convention, but `index.html` is now at project root). Keep `public/favicon.ico`, `public/jicon.svg`, `public/logo192.png`, `public/logo512.png`, `public/manifest.json`, `public/robots.txt`, `public/_redirects`.

Delete `public/index.html` (now at root).

- [ ] **Step 10: Update firebase.json**

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

- [ ] **Step 11: Test the migration**

```bash
npm run dev
```

Expected: Dev server starts at http://localhost:3000, existing site loads and works identically. All images, styles, and components render. Dark/light mode toggle works.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "chore: migrate from CRA to Vite"
```

---

### Task 2: Install new dependencies and remove old ones

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install core new dependencies**

```bash
npm install @react-three/fiber @react-three/drei three gsap @gsap/react lenis
```

- [ ] **Step 2: Install type definitions**

```bash
npm install @types/three --save-dev
```

- [ ] **Step 3: Install Playwright**

```bash
npm install @playwright/test --save-dev
npx playwright install chromium
```

- [ ] **Step 4: Remove old dependencies**

```bash
npm uninstall animejs @types/animejs @mui/material @mui/icons-material @emotion/react @emotion/styled react-vertical-timeline-component @types/react-vertical-timeline-component @emailjs/browser
```

- [ ] **Step 5: Add Playwright config**

Create `playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: true,
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { viewport: { width: 375, height: 812 } } },
  ],
});
```

- [ ] **Step 6: Update package.json scripts**

Add to scripts:

```json
{
  "test": "playwright test",
  "test:ui": "playwright test --ui"
}
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: install R3F, GSAP, Lenis, Playwright; remove MUI, anime.js"
```

---

### Task 3: Create data layer

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/data/experience.ts`
- Create: `src/data/skills.ts`
- Create: `src/data/certificates.ts`

- [ ] **Step 1: Create `src/data/projects.ts`**

```typescript
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
```

- [ ] **Step 2: Create `src/data/experience.ts`**

```typescript
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
```

- [ ] **Step 3: Create `src/data/skills.ts`**

```typescript
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
```

- [ ] **Step 4: Create `src/data/certificates.ts`**

```typescript
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
```

- [ ] **Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: add typed data layer for projects, experience, skills, certificates"
```

---

### Task 4: Create SCSS foundation and design tokens

**Files:**
- Create: `src/assets/styles/_variables.scss`
- Create: `src/assets/styles/_mixins.scss`
- Modify: `src/assets/styles/index.scss` (was `src/index.scss`)

- [ ] **Step 1: Create `src/assets/styles/_variables.scss`**

```scss
// Colors
$bg-dark: #0d1116;
$bg-light: #f8f9fa;
$accent: #5000ca;
$gradient-start: #667eea;
$gradient-end: #764ba2;

$text-dark-primary: rgba(255, 255, 255, 1);
$text-dark-secondary: rgba(255, 255, 255, 0.8);
$text-dark-muted: rgba(255, 255, 255, 0.4);

$text-light-primary: rgba(0, 0, 0, 0.9);
$text-light-secondary: rgba(0, 0, 0, 0.7);
$text-light-muted: rgba(0, 0, 0, 0.4);

// Glass
$glass-bg: rgba(255, 255, 255, 0.04);
$glass-bg-hover: rgba(255, 255, 255, 0.08);
$glass-border: rgba(255, 255, 255, 0.1);
$glass-blur: 12px;

$glass-light-bg: rgba(255, 255, 255, 0.9);
$glass-light-border: rgba(0, 0, 0, 0.08);

// Typography
$font-primary: 'Lato', sans-serif;
$font-mono: 'Courier Prime', monospace;

// Breakpoints
$bp-mobile: 768px;
$bp-tablet: 1200px;

// Transitions
$transition-fast: 250ms ease;
$transition-normal: 400ms ease;
$transition-slow: 700ms ease;
```

- [ ] **Step 2: Create `src/assets/styles/_mixins.scss`**

```scss
@use 'variables' as *;

@mixin glass-card {
  background: $glass-bg;
  backdrop-filter: blur($glass-blur);
  -webkit-backdrop-filter: blur($glass-blur);
  border: 1px solid $glass-border;
  border-radius: 16px;
  transition: background $transition-fast, box-shadow $transition-fast;

  &:hover {
    background: $glass-bg-hover;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }

  .light-mode & {
    background: $glass-light-bg;
    border-color: $glass-light-border;
    backdrop-filter: blur(8px);

    &:hover {
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    }
  }
}

@mixin gradient-text {
  background: linear-gradient(135deg, $gradient-start, $gradient-end);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

@mixin section-padding {
  padding: 100px 10%;
  
  @media (max-width: $bp-mobile) {
    padding: 60px 5%;
  }
}

@mixin responsive-grid($min-width: 300px) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax($min-width, 1fr));
  gap: 24px;

  @media (max-width: $bp-mobile) {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Create new global `src/assets/styles/index.scss`**

```scss
@use 'variables' as *;

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: auto; // Lenis handles smooth scroll
}

body {
  font-family: $font-primary;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

.dark-mode {
  background-color: $bg-dark;
  color: $text-dark-primary;
}

.light-mode {
  background-color: $bg-light;
  color: $text-light-primary;
}

.main-container {
  position: relative;
  min-height: 100vh;
  transition: background-color $transition-normal, color $transition-normal;
}

// Gradient text utility
.gradient-text {
  background: linear-gradient(135deg, $gradient-start, $gradient-end);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

// Section titles
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 48px;
  text-align: center;

  @media (max-width: $bp-mobile) {
    font-size: 1.8rem;
    margin-bottom: 32px;
  }
}
```

- [ ] **Step 4: Update `src/index.tsx` import path**

Change `import './index.scss'` to `import './assets/styles/index.scss'`.

- [ ] **Step 5: Commit**

```bash
git add src/assets/styles/ src/index.tsx
git commit -m "feat: add SCSS design tokens, mixins, and global styles"
```

---

### Task 5: Create Lenis scroll provider and hooks

**Files:**
- Create: `src/components/layout/ScrollProvider.tsx`
- Create: `src/hooks/useLenis.ts`
- Create: `src/hooks/useMousePosition.ts`
- Create: `src/hooks/useScrollProgress.ts`

- [ ] **Step 1: Create `src/components/layout/ScrollProvider.tsx`**

```tsx
import { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollProviderProps {
  children: ReactNode;
}

export default function ScrollProvider({ children }: ScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 2: Create `src/hooks/useMousePosition.ts`**

```tsx
import { useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export default function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
        normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
        normalizedY: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}
```

- [ ] **Step 3: Create `src/hooks/useScrollProgress.ts`**

```tsx
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useScrollProgress(sectionIds: string[]): number {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const triggers = sectionIds.map((id, index) => {
      return ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [sectionIds]);

  return activeIndex;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/ScrollProvider.tsx src/hooks/
git commit -m "feat: add Lenis scroll provider, mouse position, and scroll progress hooks"
```

---

## Phase 2: Navigation + App Shell

### Task 6: Build DotNav component

**Files:**
- Create: `src/components/layout/DotNav.tsx`
- Create: `src/assets/styles/Navigation.scss`

- [ ] **Step 1: Create `src/assets/styles/Navigation.scss`**

```scss
@use 'variables' as *;

.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  transition: background $transition-fast, backdrop-filter $transition-fast;

  &.scrolled {
    background: rgba(13, 17, 22, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);

    .light-mode & {
      background: rgba(248, 249, 250, 0.8);
    }
  }

  .logo {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 2px;
    color: $text-dark-primary;

    .light-mode & {
      color: $text-light-primary;
    }
  }

  .mode-toggle {
    background: none;
    border: 1px solid $glass-border;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $text-dark-secondary;
    transition: all $transition-fast;

    &:hover {
      background: $glass-bg-hover;
      color: $text-dark-primary;
    }

    .light-mode & {
      border-color: $glass-light-border;
      color: $text-light-secondary;

      &:hover {
        color: $text-light-primary;
      }
    }
  }
}

.dot-nav {
  position: fixed;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;

  @media (max-width: $bp-mobile) {
    right: auto;
    top: auto;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    flex-direction: row;
    gap: 12px;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1.5px solid $text-dark-muted;
    background: transparent;
    cursor: pointer;
    transition: all $transition-fast;
    position: relative;

    &:hover {
      border-color: $text-dark-secondary;
      transform: scale(1.3);
    }

    &.active {
      border-color: $gradient-start;
      background: $gradient-start;
      box-shadow: 0 0 12px rgba($gradient-start, 0.6);
    }

    .light-mode & {
      border-color: $text-light-muted;

      &:hover {
        border-color: $text-light-secondary;
      }

      &.active {
        border-color: $gradient-start;
        background: $gradient-start;
      }
    }
  }

  .dot-label {
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    white-space: nowrap;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: $text-dark-muted;
    opacity: 0;
    transition: opacity $transition-fast;
    pointer-events: none;

    .dot:hover & {
      opacity: 1;
    }

    @media (max-width: $bp-mobile) {
      display: none;
    }
  }
}
```

- [ ] **Step 2: Create `src/components/layout/DotNav.tsx`**

```tsx
import useScrollProgress from '../../hooks/useScrollProgress';
import '../../assets/styles/Navigation.scss';

const sections = [
  { id: 'hero', label: '01 / HOME' },
  { id: 'expertise', label: '02 / EXPERTISE' },
  { id: 'history', label: '03 / CAREER' },
  { id: 'projects', label: '04 / PROJECTS' },
  { id: 'credentials', label: '05 / CREDENTIALS' },
];

export default function DotNav() {
  const activeIndex = useScrollProgress(sections.map((s) => s.id));

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="dot-nav" aria-label="Section navigation">
      {sections.map((section, index) => (
        <button
          key={section.id}
          className={`dot ${index === activeIndex ? 'active' : ''}`}
          onClick={() => scrollToSection(section.id)}
          aria-label={`Navigate to ${section.label}`}
        >
          <span className="dot-label">{section.label}</span>
        </button>
      ))}
    </nav>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/DotNav.tsx src/assets/styles/Navigation.scss
git commit -m "feat: add DotNav side navigation with scroll tracking"
```

---

### Task 7: Build Navigation top bar

**Files:**
- Create: `src/components/layout/Navigation.tsx`

- [ ] **Step 1: Create `src/components/layout/Navigation.tsx`**

```tsx
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Navigation.scss';

interface NavigationProps {
  mode: string;
  onModeChange: () => void;
}

export default function Navigation({ mode, onModeChange }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`top-bar ${scrolled ? 'scrolled' : ''}`}>
      <span className="logo">JA</span>
      <button
        className="mode-toggle"
        onClick={onModeChange}
        aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
      >
        <FontAwesomeIcon icon={mode === 'dark' ? faSun : faMoon} />
      </button>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Navigation.tsx
git commit -m "feat: add minimal top bar navigation with mode toggle"
```

---

### Task 8: Rewrite App.tsx shell

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Rewrite `src/App.tsx`**

```tsx
import { useState } from 'react';
import ScrollProvider from './components/layout/ScrollProvider';
import Navigation from './components/layout/Navigation';
import DotNav from './components/layout/DotNav';
import './assets/styles/index.scss';

function App() {
  const [mode, setMode] = useState<string>('dark');

  const handleModeChange = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ScrollProvider>
      <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <Navigation mode={mode} onModeChange={handleModeChange} />
        <DotNav />
        <main>
          <section id="hero" style={{ minHeight: '100vh' }}>
            <h1>Hero Placeholder</h1>
          </section>
          <section id="expertise" style={{ minHeight: '100vh' }}>
            <h2>Expertise Placeholder</h2>
          </section>
          <section id="history" style={{ minHeight: '100vh' }}>
            <h2>Timeline Placeholder</h2>
          </section>
          <section id="projects" style={{ minHeight: '100vh' }}>
            <h2>Projects Placeholder</h2>
          </section>
          <section id="credentials" style={{ minHeight: '100vh' }}>
            <h2>Credentials Placeholder</h2>
          </section>
        </main>
      </div>
    </ScrollProvider>
  );
}

export default App;
```

- [ ] **Step 2: Run dev server and verify**

```bash
npm run dev
```

Expected: App loads with dark background, minimal "JA" top bar with sun/moon toggle, side dots visible on right edge, placeholder sections scroll smoothly with Lenis inertia. Clicking dots scrolls to sections. Active dot updates.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: rewrite App shell with ScrollProvider, Navigation, DotNav"
```

---

## Phase 3: 3D Scenes

### Task 9: Create SceneContainer (lazy R3F Canvas)

**Files:**
- Create: `src/components/three/SceneContainer.tsx`

- [ ] **Step 1: Create `src/components/three/SceneContainer.tsx`**

```tsx
import { ReactNode, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

interface SceneContainerProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  camera?: { position: [number, number, number]; fov?: number };
}

export default function SceneContainer({
  children,
  className,
  style,
  camera = { position: [0, 0, 5], fov: 75 },
}: SceneContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className} style={style}>
      {visible && (
        <Canvas
          camera={camera}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ pointerEvents: 'none' }}
        >
          {children}
        </Canvas>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/three/SceneContainer.tsx
git commit -m "feat: add lazy-loading SceneContainer for R3F Canvas"
```

---

### Task 10: Create wireframe geometry components

**Files:**
- Create: `src/components/three/WireframeIcosahedron.tsx`
- Create: `src/components/three/WireframeCube.tsx`
- Create: `src/components/three/WireframeTorus.tsx`
- Create: `src/components/three/WireframeOctahedron.tsx`
- Create: `src/components/three/WireframeTorusKnot.tsx`

- [ ] **Step 1: Create `src/components/three/WireframeIcosahedron.tsx`**

```tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface WireframeIcosahedronProps {
  mouseX?: number;
  mouseY?: number;
}

export default function WireframeIcosahedron({ mouseX = 0, mouseY = 0 }: WireframeIcosahedronProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.x += delta * 0.05;
    // Subtle mouse follow
    meshRef.current.rotation.y += mouseX * 0.001;
    meshRef.current.rotation.x += mouseY * 0.001;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 1]} />
      <meshBasicMaterial color="#667eea" wireframe transparent opacity={0.6} />
    </mesh>
  );
}
```

- [ ] **Step 2: Create `src/components/three/WireframeCube.tsx`**

```tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export default function WireframeCube() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.rotation.x += delta * 0.1;
  });

  return (
    <mesh ref={meshRef} scale={0.8}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#667eea" wireframe transparent opacity={0.5} />
    </mesh>
  );
}
```

- [ ] **Step 3: Create `src/components/three/WireframeTorus.tsx`**

```tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export default function WireframeTorus() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.25;
    meshRef.current.rotation.z += delta * 0.1;
  });

  return (
    <mesh ref={meshRef} scale={0.8}>
      <torusGeometry args={[0.7, 0.3, 8, 16]} />
      <meshBasicMaterial color="#764ba2" wireframe transparent opacity={0.5} />
    </mesh>
  );
}
```

- [ ] **Step 4: Create `src/components/three/WireframeOctahedron.tsx`**

```tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export default function WireframeOctahedron() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.2;
    meshRef.current.rotation.x += delta * 0.15;
  });

  return (
    <mesh ref={meshRef} scale={0.8}>
      <octahedronGeometry args={[0.8, 0]} />
      <meshBasicMaterial color="#667eea" wireframe transparent opacity={0.5} />
    </mesh>
  );
}
```

- [ ] **Step 5: Create `src/components/three/WireframeTorusKnot.tsx`**

```tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export default function WireframeTorusKnot() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.15;
  });

  return (
    <mesh ref={meshRef} scale={0.6}>
      <torusKnotGeometry args={[0.8, 0.25, 64, 8]} />
      <meshBasicMaterial color="#764ba2" wireframe transparent opacity={0.3} />
    </mesh>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/three/
git commit -m "feat: add wireframe geometry components (icosahedron, cube, torus, octahedron, torusKnot)"
```

---

### Task 11: Create ConstellationNetwork

**Files:**
- Create: `src/components/three/ConstellationNetwork.tsx`

- [ ] **Step 1: Create `src/components/three/ConstellationNetwork.tsx`**

```tsx
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ConstellationNetworkProps {
  count?: number;
  mouseX?: number;
  mouseY?: number;
}

export default function ConstellationNetwork({
  count = 40,
  mouseX = 0,
  mouseY = 0,
}: ConstellationNetworkProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);

  useFrame(() => {
    if (!pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;

    // Move nodes
    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      // Subtle mouse influence
      posArray[i * 3] += mouseX * 0.0001;
      posArray[i * 3 + 1] += mouseY * 0.0001;

      // Bounce at boundaries
      for (let j = 0; j < 3; j++) {
        const limit = j === 2 ? 2.5 : 5;
        if (Math.abs(posArray[i * 3 + j]) > limit) {
          velocities[i * 3 + j] *= -1;
        }
      }
    }
    posAttr.needsUpdate = true;

    // Build connection lines
    const linePositions: number[] = [];
    const connectionDistance = 2.5;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionDistance) {
          linePositions.push(
            posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2],
            posArray[j * 3], posArray[j * 3 + 1], posArray[j * 3 + 2]
          );
        }
      }
    }

    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#667eea"
          size={0.05}
          sizeAttenuation
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#667eea"
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/three/ConstellationNetwork.tsx
git commit -m "feat: add interactive constellation network with mouse-reactive connections"
```

---

## Phase 4: UI Components

### Task 12: Build reusable UI components

**Files:**
- Create: `src/components/ui/GlassCard.tsx`
- Create: `src/components/ui/TechChip.tsx`
- Create: `src/components/ui/CategoryBadge.tsx`

- [ ] **Step 1: Create `src/components/ui/GlassCard.tsx`**

```tsx
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function GlassCard({ children, className = '', onClick }: GlassCardProps) {
  return (
    <div className={`glass-card ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
```

Add to `src/assets/styles/index.scss` (append):

```scss
.glass-card {
  @include glass-card;
  padding: 24px;
}
```

Wait — the mixin is defined with `@use`, so we need the import. Update `src/assets/styles/index.scss` to add `@use 'mixins' as *;` at the top (after the `@use 'variables'` line) and add:

```scss
.glass-card {
  @include glass-card;
  padding: 24px;
}
```

- [ ] **Step 2: Create `src/components/ui/TechChip.tsx`**

```tsx
interface TechChipProps {
  label: string;
}

export default function TechChip({ label }: TechChipProps) {
  return <span className="tech-chip">{label}</span>;
}
```

Add to `src/assets/styles/index.scss`:

```scss
.tech-chip {
  display: inline-block;
  padding: 4px 12px;
  font-family: $font-mono;
  font-size: 0.75rem;
  border-radius: 20px;
  background: rgba($gradient-start, 0.1);
  border: 1px solid rgba($gradient-start, 0.2);
  color: $gradient-start;
  white-space: nowrap;

  .light-mode & {
    background: rgba($gradient-start, 0.08);
    color: $accent;
  }
}
```

- [ ] **Step 3: Create `src/components/ui/CategoryBadge.tsx`**

```tsx
interface CategoryBadgeProps {
  label: string;
}

const categoryColors: Record<string, string> = {
  backend: '#667eea',
  ai: '#764ba2',
  algorithm: '#ea6666',
  programming: '#66eaaa',
  cloud: '#eaaa66',
  devops: '#66b8ea',
  softskills: '#ea66d4',
  framework: '#d4ea66',
  engineering: '#667eea',
  database: '#66eaea',
};

export default function CategoryBadge({ label }: CategoryBadgeProps) {
  const color = categoryColors[label] || '#667eea';

  return (
    <span
      className="category-badge"
      style={{
        background: `${color}22`,
        border: `1px solid ${color}44`,
        color,
      }}
    >
      {label}
    </span>
  );
}
```

Add to `src/assets/styles/index.scss`:

```scss
.category-badge {
  display: inline-block;
  padding: 3px 10px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 12px;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/ src/assets/styles/index.scss
git commit -m "feat: add GlassCard, TechChip, CategoryBadge UI components"
```

---

## Phase 5: Section Components

### Task 13: Build Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Create: `src/assets/styles/Hero.scss`

- [ ] **Step 1: Create `src/assets/styles/Hero.scss`**

```scss
@use '../styles/variables' as *;

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;

  .hero-scene {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    padding: 0 10%;
    max-width: 700px;

    @media (max-width: $bp-mobile) {
      padding: 120px 5% 60px;
      max-width: 100%;
    }
  }

  .hero-label {
    font-size: 0.85rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 16px;
    background: linear-gradient(135deg, $gradient-start, $gradient-end);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0;
  }

  .hero-name {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 16px;
    line-height: 1.1;
    opacity: 0;

    @media (max-width: $bp-mobile) {
      font-size: 2.2rem;
    }
  }

  .hero-bio {
    font-size: 1.1rem;
    line-height: 1.6;
    color: $text-dark-secondary;
    margin-bottom: 32px;
    max-width: 550px;
    opacity: 0;

    .light-mode & {
      color: $text-light-secondary;
    }
  }

  .hero-socials {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    opacity: 0;

    a {
      color: $text-dark-secondary;
      font-size: 1.4rem;
      transition: color $transition-fast, transform $transition-fast;

      &:hover {
        color: $gradient-start;
        transform: scale(1.2);
      }

      .light-mode & {
        color: $text-light-secondary;

        &:hover {
          color: $accent;
        }
      }
    }
  }

  .hero-cv-buttons {
    display: flex;
    gap: 12px;
    opacity: 0;

    a {
      display: inline-block;
      padding: 10px 24px;
      border-radius: 24px;
      font-size: 0.85rem;
      font-weight: 600;
      text-decoration: none;
      border: 1px solid $glass-border;
      color: $text-dark-secondary;
      background: $glass-bg;
      backdrop-filter: blur(8px);
      transition: all $transition-fast;

      &:hover {
        background: $glass-bg-hover;
        border-color: $gradient-start;
        color: $text-dark-primary;
      }

      .light-mode & {
        color: $text-light-secondary;
        border-color: $glass-light-border;
        background: $glass-light-bg;

        &:hover {
          border-color: $accent;
          color: $text-light-primary;
        }
      }
    }
  }
}
```

- [ ] **Step 2: Create `src/components/sections/Hero.tsx`**

```tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import SceneContainer from '../three/SceneContainer';
import ConstellationNetwork from '../three/ConstellationNetwork';
import WireframeIcosahedron from '../three/WireframeIcosahedron';
import useMousePosition from '../../hooks/useMousePosition';
import cvEnglish from '../../_someFolder/CVEnglishJoseAuyon.pdf';
import '../../assets/styles/Hero.scss';

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();

  useEffect(() => {
    if (!contentRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.hero-label', { opacity: 1, y: 0, duration: 0.6, delay: 0.3 })
      .to('.hero-name', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .to('.hero-bio', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .to('.hero-socials', { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
      .to('.hero-cv-buttons', { opacity: 1, y: 0, duration: 0.5 }, '-=0.2');

    // Set initial states
    gsap.set(['.hero-label', '.hero-name', '.hero-bio', '.hero-socials', '.hero-cv-buttons'], {
      y: 20,
    });
  }, []);

  return (
    <section id="hero" className="hero">
      <SceneContainer
        className="hero-scene"
        style={{ position: 'absolute', inset: 0 }}
        camera={{ position: [0, 0, 6], fov: 60 }}
      >
        <ambientLight intensity={0.5} />
        <ConstellationNetwork
          count={35}
          mouseX={mouse.normalizedX}
          mouseY={mouse.normalizedY}
        />
        <group position={[2.5, 0, 0]}>
          <WireframeIcosahedron
            mouseX={mouse.normalizedX}
            mouseY={mouse.normalizedY}
          />
        </group>
      </SceneContainer>

      <div className="hero-content" ref={contentRef}>
        <p className="hero-label">Software Engineer & AI Builder</p>
        <h1 className="hero-name">José Auyón</h1>
        <p className="hero-bio">
          Software Engineer with experience across enterprise software, full-stack
          product development, and AI-enabled solutions. Building production systems,
          client-facing platforms, and intelligent tools.
        </p>
        <div className="hero-socials">
          <a href="https://github.com/auyjos" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://linkedin.com/in/jose-auyon" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="mailto:auyon.joseandres@gmail.com" aria-label="Email">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
        <div className="hero-cv-buttons">
          <a href={cvEnglish} download>Resume (EN)</a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire Hero into App.tsx**

Replace the hero placeholder in `src/App.tsx`:

```tsx
import Hero from './components/sections/Hero';
```

Replace `<section id="hero" ...>` with `<Hero />`.

- [ ] **Step 4: Run dev server and verify**

```bash
npm run dev
```

Expected: Hero section shows with constellation network background, wireframe icosahedron on right, staggered text animation, social links, CV button. 3D elements respond to mouse. Lenis smooth scroll works.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Hero.tsx src/assets/styles/Hero.scss src/App.tsx
git commit -m "feat: add Hero section with constellation network and wireframe icosahedron"
```

---

### Task 14: Build Expertise section

**Files:**
- Create: `src/components/sections/Expertise.tsx`
- Create: `src/assets/styles/Expertise.scss`

- [ ] **Step 1: Create `src/assets/styles/Expertise.scss`**

```scss
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.expertise {
  @include section-padding;

  .expertise-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;

    @media (max-width: $bp-tablet) {
      grid-template-columns: 1fr;
    }
  }

  .skill-card {
    @include glass-card;
    padding: 28px;
    position: relative;
    overflow: hidden;

    .skill-card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }

    .skill-card-title {
      font-size: 1.3rem;
      font-weight: 700;
      @include gradient-text;
    }

    .skill-card-3d {
      width: 60px;
      height: 60px;
      flex-shrink: 0;
    }

    .skill-card-description {
      font-size: 0.9rem;
      color: $text-dark-secondary;
      margin-bottom: 16px;
      line-height: 1.5;

      .light-mode & {
        color: $text-light-secondary;
      }
    }

    .skill-card-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  }
}
```

- [ ] **Step 2: Create `src/components/sections/Expertise.tsx`**

```tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillCategories } from '../../data/skills';
import TechChip from '../ui/TechChip';
import SceneContainer from '../three/SceneContainer';
import WireframeCube from '../three/WireframeCube';
import WireframeTorus from '../three/WireframeTorus';
import WireframeOctahedron from '../three/WireframeOctahedron';
import '../../assets/styles/Expertise.scss';

gsap.registerPlugin(ScrollTrigger);

const geometryMap: Record<string, React.ReactNode> = {
  cube: <WireframeCube />,
  torus: <WireframeTorus />,
  octahedron: <WireframeOctahedron />,
  doubleHelix: <WireframeOctahedron />, // Reuse octahedron for now, can create custom later
};

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.skill-card');

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30, rotateX: 5 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.1,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="expertise" className="expertise" ref={sectionRef}>
      <h2 className="section-title gradient-text">Expertise</h2>
      <div className="expertise-grid">
        {skillCategories.map((category) => (
          <div key={category.id} className="skill-card">
            <div className="skill-card-header">
              <h3 className="skill-card-title">{category.title}</h3>
              <SceneContainer
                className="skill-card-3d"
                camera={{ position: [0, 0, 3], fov: 50 }}
              >
                <ambientLight intensity={0.5} />
                {geometryMap[category.geometry]}
              </SceneContainer>
            </div>
            <p className="skill-card-description">{category.description}</p>
            <div className="skill-card-chips">
              {category.technologies.map((tech) => (
                <TechChip key={tech} label={tech} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire into App.tsx**

Import and replace expertise placeholder:

```tsx
import Expertise from './components/sections/Expertise';
```

Replace `<section id="expertise" ...>` with `<Expertise />`.

- [ ] **Step 4: Verify and commit**

```bash
npm run dev
git add src/components/sections/Expertise.tsx src/assets/styles/Expertise.scss src/App.tsx
git commit -m "feat: add Expertise section with skill cards and mini 3D geometries"
```

---

### Task 15: Build Timeline section

**Files:**
- Create: `src/components/sections/Timeline.tsx`
- Create: `src/assets/styles/Timeline.scss`

- [ ] **Step 1: Create `src/assets/styles/Timeline.scss`**

```scss
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.timeline-section {
  @include section-padding;
  position: relative;

  .timeline-scene {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }

  .timeline-content {
    position: relative;
    z-index: 1;
  }

  .timeline {
    position: relative;
    max-width: 900px;
    margin: 0 auto;

    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(180deg, $gradient-start, $gradient-end);
      transform: translateX(-50%);

      @media (max-width: $bp-mobile) {
        left: 20px;
      }
    }
  }

  .timeline-entry {
    display: flex;
    margin-bottom: 48px;
    position: relative;

    &:nth-child(odd) {
      flex-direction: row;
      .timeline-card { margin-right: calc(50% + 32px); }

      @media (max-width: $bp-mobile) {
        flex-direction: row;
        .timeline-card { margin-right: 0; margin-left: 48px; }
      }
    }

    &:nth-child(even) {
      flex-direction: row-reverse;
      .timeline-card { margin-left: calc(50% + 32px); }

      @media (max-width: $bp-mobile) {
        flex-direction: row;
        .timeline-card { margin-left: 48px; margin-right: 0; }
      }
    }

    .timeline-dot {
      position: absolute;
      left: 50%;
      top: 24px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: $gradient-start;
      border: 2px solid $bg-dark;
      transform: translateX(-50%);
      z-index: 2;

      @media (max-width: $bp-mobile) {
        left: 20px;
      }

      .light-mode & {
        border-color: $bg-light;
      }
    }
  }

  .timeline-card {
    @include glass-card;
    padding: 24px;
    flex: 1;

    .timeline-role {
      font-size: 1.2rem;
      font-weight: 700;
      @include gradient-text;
      margin-bottom: 4px;
    }

    .timeline-company {
      font-size: 1rem;
      color: $text-dark-secondary;
      margin-bottom: 4px;

      .light-mode & { color: $text-light-secondary; }
    }

    .timeline-date {
      display: inline-block;
      padding: 3px 12px;
      font-size: 0.75rem;
      border-radius: 12px;
      background: rgba($gradient-start, 0.15);
      color: $gradient-start;
      margin-bottom: 12px;
    }

    .timeline-description {
      font-size: 0.9rem;
      color: $text-dark-secondary;
      line-height: 1.6;
      margin-bottom: 12px;

      .light-mode & { color: $text-light-secondary; }
    }

    .timeline-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 12px;
    }

    .sub-projects-toggle {
      background: none;
      border: 1px solid $glass-border;
      border-radius: 8px;
      padding: 8px 16px;
      color: $gradient-start;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all $transition-fast;
      width: 100%;
      text-align: left;

      &:hover {
        background: rgba($gradient-start, 0.08);
      }
    }

    .sub-projects {
      overflow: hidden;
      transition: max-height 0.4s ease, opacity 0.3s ease;
      max-height: 0;
      opacity: 0;

      &.open {
        max-height: 1000px;
        opacity: 1;
      }

      .sub-project {
        padding: 12px 0;
        border-top: 1px solid $glass-border;

        &:first-child { margin-top: 12px; }

        .sub-project-name {
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 6px;
        }

        .sub-project-accomplishments {
          list-style: none;
          padding: 0;

          li {
            font-size: 0.85rem;
            color: $text-dark-secondary;
            padding-left: 16px;
            position: relative;
            margin-bottom: 4px;

            &::before {
              content: '▸';
              position: absolute;
              left: 0;
              color: $gradient-start;
            }

            .light-mode & { color: $text-light-secondary; }
          }
        }
      }
    }
  }
}
```

- [ ] **Step 2: Create `src/components/sections/Timeline.tsx`**

```tsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../../data/experience';
import TechChip from '../ui/TechChip';
import SceneContainer from '../three/SceneContainer';
import WireframeTorusKnot from '../three/WireframeTorusKnot';
import '../../assets/styles/Timeline.scss';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openSubProjects, setOpenSubProjects] = useState<Record<string, boolean>>({});

  const toggleSubProjects = (id: string) => {
    setOpenSubProjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const entries = sectionRef.current.querySelectorAll('.timeline-entry');

    entries.forEach((entry, i) => {
      const isOdd = i % 2 === 0;
      gsap.fromTo(
        entry,
        { opacity: 0, x: isOdd ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: entry,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="history" className="timeline-section" ref={sectionRef}>
      <SceneContainer
        className="timeline-scene"
        style={{ position: 'absolute', inset: 0, opacity: 0.3 }}
        camera={{ position: [0, 0, 5] }}
      >
        <ambientLight intensity={0.5} />
        <WireframeTorusKnot />
      </SceneContainer>

      <div className="timeline-content">
        <h2 className="section-title gradient-text">Career</h2>
        <div className="timeline">
          {experience.map((entry) => (
            <div key={entry.id} className="timeline-entry">
              <div className="timeline-dot" />
              <div className="timeline-card">
                <h3 className="timeline-role">{entry.role}</h3>
                <p className="timeline-company">{entry.company} — {entry.location}</p>
                <span className="timeline-date">
                  {entry.startDate} — {entry.endDate}
                </span>
                <p className="timeline-description">{entry.description}</p>
                {entry.techStack.length > 0 && (
                  <div className="timeline-chips">
                    {entry.techStack.map((tech) => (
                      <TechChip key={tech} label={tech} />
                    ))}
                  </div>
                )}
                {entry.subProjects && (
                  <>
                    <button
                      className="sub-projects-toggle"
                      onClick={() => toggleSubProjects(entry.id)}
                    >
                      {openSubProjects[entry.id] ? '▾' : '▸'} {entry.subProjects.length} Projects
                    </button>
                    <div className={`sub-projects ${openSubProjects[entry.id] ? 'open' : ''}`}>
                      {entry.subProjects.map((sp) => (
                        <div key={sp.name} className="sub-project">
                          <p className="sub-project-name">{sp.name}</p>
                          <div className="timeline-chips" style={{ marginBottom: 8 }}>
                            {sp.tech.map((t) => (
                              <TechChip key={t} label={t} />
                            ))}
                          </div>
                          <ul className="sub-project-accomplishments">
                            {sp.accomplishments.map((a, i) => (
                              <li key={i}>{a}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire into App.tsx and verify**

Import `Timeline` and replace placeholder. Run `npm run dev`.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Timeline.tsx src/assets/styles/Timeline.scss src/App.tsx
git commit -m "feat: add Timeline section with expandable sub-projects and torus knot background"
```

---

### Task 16: Build Projects section

**Files:**
- Create: `src/components/sections/Projects.tsx`
- Create: `src/assets/styles/Projects.scss`

- [ ] **Step 1: Create `src/assets/styles/Projects.scss`**

```scss
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.projects-section {
  @include section-padding;

  .featured-project {
    @include glass-card;
    padding: 32px;
    margin-bottom: 40px;
    display: flex;
    gap: 32px;
    align-items: center;
    border-color: rgba($gradient-start, 0.2);

    @media (max-width: $bp-mobile) {
      flex-direction: column;
    }

    .featured-image {
      flex: 1;
      border-radius: 12px;
      overflow: hidden;

      img {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 12px;
      }
    }

    .featured-info {
      flex: 1;

      .featured-label {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: $gradient-start;
        margin-bottom: 8px;
      }

      .featured-title {
        font-size: 1.8rem;
        font-weight: 700;
        @include gradient-text;
        margin-bottom: 12px;
      }

      .featured-description {
        font-size: 0.95rem;
        color: $text-dark-secondary;
        line-height: 1.6;
        margin-bottom: 16px;

        .light-mode & { color: $text-light-secondary; }
      }

      .featured-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
      }

      .featured-links {
        display: flex;
        gap: 12px;

        a {
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          border: 1px solid $glass-border;
          color: $text-dark-secondary;
          transition: all $transition-fast;

          &:hover {
            border-color: $gradient-start;
            color: $gradient-start;
          }

          .light-mode & {
            color: $text-light-secondary;
            &:hover { color: $accent; border-color: $accent; }
          }
        }
      }
    }
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;

    @media (max-width: $bp-mobile) {
      grid-template-columns: 1fr;
    }
  }

  .project-card {
    @include glass-card;
    padding: 0;
    overflow: hidden;
    transition: transform $transition-fast, box-shadow $transition-fast;

    &:hover {
      transform: translateY(-4px);
    }

    .project-image {
      width: 100%;
      height: 180px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform $transition-normal;
      }

      &:hover img {
        transform: scale(1.05);
      }
    }

    .project-info {
      padding: 20px;

      .project-title {
        font-size: 1.1rem;
        font-weight: 700;
        margin-bottom: 8px;
        @include gradient-text;
      }

      .project-description {
        font-size: 0.85rem;
        color: $text-dark-secondary;
        line-height: 1.5;
        margin-bottom: 12px;

        .light-mode & { color: $text-light-secondary; }
      }

      .project-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 12px;
      }

      .project-links {
        display: flex;
        gap: 10px;

        a {
          font-size: 0.8rem;
          color: $gradient-start;
          text-decoration: none;
          font-weight: 600;

          &:hover { text-decoration: underline; }
        }
      }
    }
  }
}
```

- [ ] **Step 2: Create `src/components/sections/Projects.tsx`**

```tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/projects';
import TechChip from '../ui/TechChip';
import * as images from '../../assets/images';
import '../../assets/styles/Projects.scss';

gsap.registerPlugin(ScrollTrigger);

const imageMap: Record<string, string> = {
  mernProducts: images.mernProducts,
  vanLifeApp: images.vanLifeApp,
  tenziesGame: images.tenziesGame,
  edaproject: images.edaproject,
  neuralnetwork: images.neuralnetwork,
  xmppimage: images.xmppimage,
  houghTransform: images.houghTransform,
  berserkMatch: images.berserkMatch,
  covidHunt: images.covidHunt,
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const featured = projects.find((p) => p.featured);
  const gridProjects = projects.filter((p) => !p.featured);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      '.featured-project',
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.featured-project',
          start: 'top 85%',
        },
      }
    );

    const cards = sectionRef.current.querySelectorAll('.project-card');
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: i * 0.08,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <h2 className="section-title gradient-text">Projects</h2>

      {featured && (
        <div className="featured-project">
          <div className="featured-image">
            <img src={imageMap[featured.image]} alt={featured.title} />
          </div>
          <div className="featured-info">
            <p className="featured-label">Featured Project</p>
            <h3 className="featured-title">{featured.title}</h3>
            <p className="featured-description">{featured.description}</p>
            <div className="featured-chips">
              {featured.techStack.map((tech) => (
                <TechChip key={tech} label={tech} />
              ))}
            </div>
            <div className="featured-links">
              {featured.liveUrl && (
                <a href={featured.liveUrl} target="_blank" rel="noreferrer">Live Demo →</a>
              )}
              {featured.githubUrl && (
                <a href={featured.githubUrl} target="_blank" rel="noreferrer">GitHub →</a>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="projects-grid">
        {gridProjects.map((project) => (
          <div key={project.id} className="project-card">
            {imageMap[project.image] && (
              <div className="project-image">
                <img src={imageMap[project.image]} alt={project.title} />
              </div>
            )}
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-chips">
                {project.techStack.map((tech) => (
                  <TechChip key={tech} label={tech} />
                ))}
              </div>
              <div className="project-links">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">Live →</a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub →</a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire into App.tsx and verify**

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Projects.tsx src/assets/styles/Projects.scss src/App.tsx
git commit -m "feat: add Projects section with featured hero card and grid layout"
```

---

### Task 17: Build Certificates section

**Files:**
- Create: `src/components/sections/Certificates.tsx`
- Create: `src/assets/styles/Certificates.scss`

- [ ] **Step 1: Create `src/assets/styles/Certificates.scss`**

```scss
@use '../styles/variables' as *;
@use '../styles/mixins' as *;

.certificates-section {
  @include section-padding;
  position: relative;

  .certificates-scene {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }

  .certificates-content {
    position: relative;
    z-index: 1;
  }

  .certificates-grid {
    @include responsive-grid(280px);
  }

  .cert-card {
    @include glass-card;
    padding: 0;
    overflow: hidden;

    .cert-image {
      width: 100%;
      height: 160px;
      overflow: hidden;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform $transition-normal;
      }

      &:hover img {
        transform: scale(1.05);
      }
    }

    .cert-info {
      padding: 16px;

      .cert-title {
        font-size: 0.95rem;
        font-weight: 600;
        margin-bottom: 6px;
      }

      .cert-provider {
        font-size: 0.8rem;
        color: $text-dark-muted;
        margin-bottom: 8px;

        .light-mode & { color: $text-light-muted; }
      }
    }
  }
}
```

- [ ] **Step 2: Create `src/components/sections/Certificates.tsx`**

```tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certificates } from '../../data/certificates';
import CategoryBadge from '../ui/CategoryBadge';
import SceneContainer from '../three/SceneContainer';
import WireframeOctahedron from '../three/WireframeOctahedron';
import * as images from '../../assets/images';
import '../../assets/styles/Certificates.scss';

gsap.registerPlugin(ScrollTrigger);

const imageMap: Record<string, string> = {
  javaprogramming1: images.javaprogramming1,
  softwareengineer: images.softwareengineer,
  sqladvanced: images.sqladvanced,
  problemsolvingint: images.problemsolvingint,
  jsint: images.jsint,
  hpe1: images.hpe1,
  aws1: images.aws1,
  highperformance1: images.highperformance1,
  laravel: images.laravel,
  softwareintern: images.softwareintern,
};

export default function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.cert-card');
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: i * 0.06,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="credentials" className="certificates-section" ref={sectionRef}>
      <SceneContainer
        className="certificates-scene"
        style={{ position: 'absolute', inset: 0, opacity: 0.2 }}
        camera={{ position: [0, 0, 4] }}
      >
        <ambientLight intensity={0.5} />
        <WireframeOctahedron />
      </SceneContainer>

      <div className="certificates-content">
        <h2 className="section-title gradient-text">Credentials</h2>
        <div className="certificates-grid">
          {certificates.map((cert) => (
            <div key={cert.id} className="cert-card">
              {imageMap[cert.image] && (
                <a
                  href={cert.verifyUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="cert-image"
                >
                  <img src={imageMap[cert.image]} alt={cert.title} />
                </a>
              )}
              <div className="cert-info">
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-provider">{cert.provider}</p>
                <CategoryBadge label={cert.category} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire into App.tsx and verify**

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Certificates.tsx src/assets/styles/Certificates.scss src/App.tsx
git commit -m "feat: add Certificates section with credential grid and octahedron background"
```

---

### Task 18: Build Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`
- Create: `src/assets/styles/Footer.scss`

- [ ] **Step 1: Create `src/assets/styles/Footer.scss`**

```scss
@use '../styles/variables' as *;

.footer {
  position: relative;
  padding: 60px 10% 40px;
  text-align: center;

  .footer-scene {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }

  .footer-content {
    position: relative;
    z-index: 1;
  }

  .footer-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: $text-dark-secondary;

    .light-mode & { color: $text-light-secondary; }
  }

  .footer-socials {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 16px;

    a {
      color: $text-dark-muted;
      font-size: 1.2rem;
      transition: color $transition-fast, transform $transition-fast;

      &:hover {
        color: $gradient-start;
        transform: scale(1.2);
      }

      .light-mode & {
        color: $text-light-muted;
        &:hover { color: $accent; }
      }
    }
  }

  .footer-cv {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 24px;

    a {
      font-size: 0.8rem;
      color: $text-dark-muted;
      text-decoration: none;

      &:hover { color: $gradient-start; }

      .light-mode & {
        color: $text-light-muted;
        &:hover { color: $accent; }
      }
    }
  }

  .footer-copyright {
    font-size: 0.75rem;
    color: $text-dark-muted;

    .light-mode & { color: $text-light-muted; }
  }
}
```

- [ ] **Step 2: Create `src/components/layout/Footer.tsx`**

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import SceneContainer from '../three/SceneContainer';
import ConstellationNetwork from '../three/ConstellationNetwork';
import cvEnglish from '../../_someFolder/CVEnglishJoseAuyon.pdf';
import '../../assets/styles/Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <SceneContainer
        className="footer-scene"
        style={{ position: 'absolute', inset: 0, opacity: 0.2 }}
        camera={{ position: [0, 0, 6], fov: 60 }}
      >
        <ambientLight intensity={0.5} />
        <ConstellationNetwork count={20} />
      </SceneContainer>

      <div className="footer-content">
        <p className="footer-title">José Auyón — Software Engineer & AI Builder</p>
        <div className="footer-socials">
          <a href="https://github.com/auyjos" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://linkedin.com/in/jose-auyon" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="mailto:auyon.joseandres@gmail.com" aria-label="Email">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
        <div className="footer-cv">
          <a href={cvEnglish} download>Resume (EN)</a>
        </div>
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} José Auyón. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Wire into App.tsx and verify**

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Footer.tsx src/assets/styles/Footer.scss src/App.tsx
git commit -m "feat: add Footer with constellation network bookend"
```

---

## Phase 6: Final App Assembly + Cleanup

### Task 19: Final App.tsx assembly and old file cleanup

**Files:**
- Modify: `src/App.tsx`
- Delete: `src/components/Main.tsx`
- Delete: `src/components/Navigation.tsx`
- Delete: `src/components/Expertise.tsx`
- Delete: `src/components/Timeline.tsx`
- Delete: `src/components/Project.tsx`
- Delete: `src/components/Certificates.tsx`
- Delete: `src/components/Contact.tsx`
- Delete: `src/components/Footer.tsx`
- Delete: `src/components/FadeIn.tsx`
- Delete: `src/components/index.js`
- Delete: `src/hooks/useScrollReveal.ts`
- Delete: Old SCSS files (`src/assets/styles/BackgroundFx.scss`, `src/assets/styles/Contact.scss`, `src/assets/styles/Main.scss`)

- [ ] **Step 1: Write final `src/App.tsx`**

```tsx
import { useState, useEffect } from 'react';
import ScrollProvider from './components/layout/ScrollProvider';
import Navigation from './components/layout/Navigation';
import DotNav from './components/layout/DotNav';
import Hero from './components/sections/Hero';
import Expertise from './components/sections/Expertise';
import Timeline from './components/sections/Timeline';
import Projects from './components/sections/Projects';
import Certificates from './components/sections/Certificates';
import Footer from './components/layout/Footer';
import './assets/styles/index.scss';

function App() {
  const [mode, setMode] = useState<string>(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const handleModeChange = () => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <ScrollProvider>
      <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <Navigation mode={mode} onModeChange={handleModeChange} />
        <DotNav />
        <main>
          <Hero />
          <Expertise />
          <Timeline />
          <Projects />
          <Certificates />
        </main>
        <Footer />
      </div>
    </ScrollProvider>
  );
}

export default App;
```

- [ ] **Step 2: Delete old component files**

```bash
rm src/components/Main.tsx src/components/Navigation.tsx src/components/Expertise.tsx src/components/Timeline.tsx src/components/Project.tsx src/components/Certificates.tsx src/components/Contact.tsx src/components/Footer.tsx src/components/FadeIn.tsx src/components/index.js src/hooks/useScrollReveal.ts
```

- [ ] **Step 3: Delete old SCSS files that are no longer needed**

```bash
rm src/assets/styles/BackgroundFx.scss src/assets/styles/Contact.scss src/assets/styles/Main.scss
```

Keep the old `Expertise.scss`, `Timeline.scss`, `Project.scss`, `Certificates.scss`, `Footer.scss` until verifying the new ones work, then delete them:

```bash
rm src/assets/styles/Expertise.scss src/assets/styles/Timeline.scss src/assets/styles/Project.scss src/assets/styles/Certificates.scss src/assets/styles/Footer.scss
```

Wait — the new SCSS files are in the same directory with the same names. The old files need to be checked: the old styles use different class names and selectors, while the new SCSS files created in previous tasks already replaced them. If there are naming conflicts (old `Expertise.scss` vs new `Expertise.scss`), the new files were created with new content in the same paths. Verify by checking that the new content is in place.

- [ ] **Step 4: Delete `src/index.scss`** (replaced by `src/assets/styles/index.scss`)

```bash
rm src/index.scss
```

- [ ] **Step 5: Verify the full app**

```bash
npm run dev
```

Expected: Full portfolio loads with all sections — Hero with constellation network + icosahedron, Expertise with 4 skill cards + mini 3D, Timeline with 6 career entries + expandable sub-projects, Projects with featured MERN card + grid, Certificates with 14 certs, Footer with constellation bookend. Smooth Lenis scroll, side dot nav tracks sections, dark/light mode persists in localStorage.

- [ ] **Step 6: Run build**

```bash
npm run build
```

Expected: Build succeeds with no errors. Output in `dist/`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: complete portfolio rewrite — remove old components, wire final App assembly"
```

---

## Phase 7: Remotion Hero Video

### Task 20: Set up Remotion and create hero intro video

**Files:**
- Create: `src/remotion/HeroIntro.tsx`
- Create: `src/remotion/Root.tsx`
- Create: `remotion.config.ts`

- [ ] **Step 1: Install Remotion**

```bash
npm install remotion @remotion/cli @remotion/player --save-dev
```

- [ ] **Step 2: Create `remotion.config.ts`** in project root

```typescript
import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
```

- [ ] **Step 3: Create `src/remotion/Root.tsx`**

```tsx
import { Composition } from 'remotion';
import { HeroIntro } from './HeroIntro';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HeroIntro"
      component={HeroIntro}
      durationInFrames={90}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
```

- [ ] **Step 4: Create `src/remotion/HeroIntro.tsx`**

```tsx
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const HeroIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Particles converge into icosahedron shape over 3 seconds
  const convergence = interpolate(frame, [0, durationInFrames * 0.7], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const fadeOut = interpolate(frame, [durationInFrames * 0.8, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rotation = interpolate(frame, [0, durationInFrames], [0, Math.PI * 0.5]);

  // Generate particle positions that converge to icosahedron vertices
  const particleCount = 60;
  const particles = Array.from({ length: particleCount }, (_, i) => {
    const angle1 = (i / particleCount) * Math.PI * 2;
    const angle2 = (i * 1.618) * Math.PI * 2; // golden ratio spacing

    // Target positions (rough icosahedron outline)
    const targetX = Math.cos(angle1) * 200 + 960;
    const targetY = Math.sin(angle2) * 200 + 540;

    // Start positions (scattered)
    const startX = Math.cos(angle1 * 3) * 800 + 960;
    const startY = Math.sin(angle2 * 5) * 500 + 540;

    const x = interpolate(convergence, [0, 1], [startX, targetX]);
    const y = interpolate(convergence, [0, 1], [startY, targetY]);
    const size = interpolate(convergence, [0, 0.5, 1], [2, 3, 1.5]);

    return { x, y, size };
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#0d1116',
        position: 'relative',
        opacity: fadeOut,
      }}
    >
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {/* Connection lines */}
        {particles.map((p1, i) =>
          particles.slice(i + 1).map((p2, j) => {
            const dist = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
            if (dist > 150 || convergence < 0.3) return null;
            const opacity = interpolate(dist, [0, 150], [0.3, 0], {
              extrapolateRight: 'clamp',
            }) * convergence;
            return (
              <line
                key={`${i}-${j}`}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="#667eea"
                strokeWidth={0.5}
                opacity={opacity}
              />
            );
          })
        )}
        {/* Particles */}
        {particles.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.size}
            fill="#667eea"
            opacity={0.7}
          />
        ))}
        {/* Wireframe outline appears at end */}
        <g
          transform={`translate(960, 540) rotate(${rotation * (180 / Math.PI)})`}
          opacity={interpolate(convergence, [0.6, 1], [0, 0.6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
        >
          <polygon
            points="-200,0 -60,-180 60,-180 200,0 60,180 -60,180"
            fill="none"
            stroke="#667eea"
            strokeWidth={1}
          />
        </g>
      </svg>
    </div>
  );
};
```

- [ ] **Step 5: Add Remotion scripts to package.json**

```json
{
  "remotion:preview": "remotion preview src/remotion/Root.tsx",
  "remotion:render": "remotion render src/remotion/Root.tsx HeroIntro src/assets/videos/hero-intro.webm"
}
```

- [ ] **Step 6: Preview and render**

```bash
npm run remotion:preview
```

Verify the animation looks good (particles converging into wireframe shape over 3 seconds). Then render:

```bash
npm run remotion:render
```

Expected: `src/assets/videos/hero-intro.webm` is created.

- [ ] **Step 7: Integrate video into Hero.tsx**

Add the video element to `src/components/sections/Hero.tsx` before the SceneContainer:

```tsx
import { useState } from 'react';
import heroVideo from '../../assets/videos/hero-intro.webm';

// Inside the component, add state:
const [videoEnded, setVideoEnded] = useState(false);

// In the JSX, before the SceneContainer:
{!videoEnded && (
  <video
    className="hero-video"
    src={heroVideo}
    autoPlay
    muted
    playsInline
    onEnded={() => setVideoEnded(true)}
    style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: 1,
    }}
  />
)}
```

Update the SceneContainer to fade in when video ends:

```tsx
<SceneContainer
  className="hero-scene"
  style={{
    position: 'absolute',
    inset: 0,
    opacity: videoEnded ? 1 : 0,
    transition: 'opacity 0.5s ease',
  }}
  ...
>
```

- [ ] **Step 8: Commit**

```bash
git add src/remotion/ remotion.config.ts src/assets/videos/ src/components/sections/Hero.tsx package.json
git commit -m "feat: add Remotion hero intro video with particle convergence animation"
```

---

## Phase 8: Playwright Tests

### Task 21: Write Playwright tests

**Files:**
- Create: `tests/portfolio.spec.ts`

- [ ] **Step 1: Create `tests/portfolio.spec.ts`**

```typescript
import { test, expect } from '@playwright/test';

test.describe('Portfolio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('renders hero section with name and title', async ({ page }) => {
    await expect(page.locator('.hero-name')).toHaveText('José Auyón');
    await expect(page.locator('.hero-label')).toContainText('Software Engineer');
  });

  test('dot navigation has 5 dots', async ({ page }) => {
    const dots = page.locator('.dot-nav .dot');
    await expect(dots).toHaveCount(5);
  });

  test('clicking dot navigates to section', async ({ page }) => {
    // Click second dot (Expertise)
    await page.locator('.dot-nav .dot').nth(1).click();
    await page.waitForTimeout(1000);

    const expertise = page.locator('#expertise');
    await expect(expertise).toBeVisible();
  });

  test('dark/light mode toggle works', async ({ page }) => {
    // Starts in dark mode
    await expect(page.locator('.main-container')).toHaveClass(/dark-mode/);

    // Click toggle
    await page.locator('.mode-toggle').click();
    await expect(page.locator('.main-container')).toHaveClass(/light-mode/);

    // Click again
    await page.locator('.mode-toggle').click();
    await expect(page.locator('.main-container')).toHaveClass(/dark-mode/);
  });

  test('expertise section shows 4 skill cards', async ({ page }) => {
    await page.locator('#expertise').scrollIntoViewIfNeeded();
    const cards = page.locator('.skill-card');
    await expect(cards).toHaveCount(4);
  });

  test('timeline section shows career entries', async ({ page }) => {
    await page.locator('#history').scrollIntoViewIfNeeded();
    const entries = page.locator('.timeline-entry');
    await expect(entries).toHaveCount(6);
  });

  test('timeline sub-projects expand on click', async ({ page }) => {
    await page.locator('#history').scrollIntoViewIfNeeded();
    const toggle = page.locator('.sub-projects-toggle').first();
    await toggle.click();
    await expect(page.locator('.sub-projects.open').first()).toBeVisible();
  });

  test('projects section shows featured project', async ({ page }) => {
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await expect(page.locator('.featured-project')).toBeVisible();
    await expect(page.locator('.featured-title')).toHaveText('MERN E-commerce Platform');
  });

  test('projects grid shows remaining projects', async ({ page }) => {
    await page.locator('#projects').scrollIntoViewIfNeeded();
    const cards = page.locator('.project-card');
    await expect(cards).toHaveCount(8);
  });

  test('certificates section shows credentials', async ({ page }) => {
    await page.locator('#credentials').scrollIntoViewIfNeeded();
    const certs = page.locator('.cert-card');
    await expect(certs).toHaveCount(14);
  });

  test('footer shows name and social links', async ({ page }) => {
    await page.locator('.footer').scrollIntoViewIfNeeded();
    await expect(page.locator('.footer-title')).toContainText('José Auyón');
    const socials = page.locator('.footer-socials a');
    await expect(socials).toHaveCount(3);
  });
});

test.describe('Responsive', () => {
  test('mobile viewport shows bottom dot nav', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const dotNav = page.locator('.dot-nav');
    // On mobile, dots should be at bottom (flex-direction: row)
    await expect(dotNav).toBeVisible();
  });
});
```

- [ ] **Step 2: Run tests**

```bash
npx playwright test
```

Expected: All tests pass on desktop and mobile viewports.

- [ ] **Step 3: Commit**

```bash
git add tests/ playwright.config.ts
git commit -m "test: add Playwright tests for all portfolio sections and navigation"
```

---

## Phase 9: Polish + Gitignore

### Task 22: Update .gitignore and final cleanup

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Update `.gitignore`**

Add these entries:

```
# Vite
dist/

# Superpowers
.superpowers/

# Playwright
test-results/
playwright-report/

# Remotion
remotion-output/
```

- [ ] **Step 2: Remove old CRA files if still present**

```bash
rm -f src/reportWebVitals.ts src/react-app-env.d.ts src/setupTests.ts src/App.test.tsx src/logo.svg
```

- [ ] **Step 3: Verify full build and test**

```bash
npm run build && npx playwright test
```

Expected: Build succeeds, all tests pass.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: update gitignore, remove CRA artifacts, final cleanup"
```

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | 1–5 | Foundation: Vite migration, dependencies, data layer, SCSS tokens, scroll/hooks |
| 2 | 6–8 | Navigation: DotNav, top bar, App shell |
| 3 | 9–11 | 3D: SceneContainer, wireframe geometries, constellation network |
| 4 | 12 | UI: GlassCard, TechChip, CategoryBadge |
| 5 | 13–18 | Sections: Hero, Expertise, Timeline, Projects, Certificates, Footer |
| 6 | 19 | Assembly: Final App.tsx, delete old files |
| 7 | 20 | Remotion: Hero intro video |
| 8 | 21 | Testing: Playwright tests |
| 9 | 22 | Polish: Gitignore, cleanup |

**Total: 22 tasks, ~85 steps, 22 commits**

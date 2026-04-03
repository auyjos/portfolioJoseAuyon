# Portfolio Modernization — Design Spec

## Overview

Modernize José Auyón's portfolio from a CRA + anime.js + MUI single-page app into an immersive, animation-driven experience using Vite + React 18, Three.js for interactive 3D geometries, GSAP for scroll animations, Remotion for cinematic video sequences, and custom components replacing all third-party UI libraries.

**Title/Positioning:** Software Engineer & AI Builder

**Inspiration sites:** fluid.glass (glassmorphism, 3D transforms), animejs.com (staggered animations, scroll sync), zentry.com (cinematic dark aesthetic, bold typography, immersive scroll)

---

## Tech Stack

### Add
- **Vite** — Build tool, replacing CRA
- **@react-three/fiber + @react-three/drei** — WebGL 3D scenes (wireframe geometries, constellation network, particle systems)
- **GSAP + ScrollTrigger** — Scroll-synced animations, parallax, staggered reveals
- **Lenis** — Smooth scroll with inertia
- **Remotion** — Dev-time video rendering for the hero intro cinematic (particles assembling into icosahedron), exported as MP4/WebM and embedded as a video element. Additional Remotion compositions can be added later for project showcases if desired.
- **Playwright** — Visual regression testing, scroll behavior, navigation, responsive viewports

### Keep
- **React 18 + TypeScript**
- **SCSS** — Per-component style modules, modernized with variables/mixins
- **FontAwesome** — Icons (social, category badges)

### Remove
- **CRA** (replaced by Vite)
- **anime.js** (replaced by GSAP — better scroll integration)
- **@mui/material + @mui/icons-material** (replaced by custom components)
- **react-vertical-timeline-component** (replaced by custom timeline)
- **@emailjs/browser** (Contact form not in current flow)
- **@emotion/react + @emotion/styled** (MUI dependencies, no longer needed)

---

## File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx        # Minimal top bar + side dot indicators
│   │   ├── Footer.tsx            # Minimal footer with social links
│   │   ├── ScrollProvider.tsx    # Lenis smooth scroll context
│   │   └── DotNav.tsx            # Floating side dot navigation
│   ├── sections/
│   │   ├── Hero.tsx              # Full-viewport intro with 3D + video
│   │   ├── Expertise.tsx         # 4 skill cards with mini 3D geometries
│   │   ├── Timeline.tsx          # Custom vertical career timeline
│   │   ├── Projects.tsx          # Featured hero + grid layout
│   │   └── Certificates.tsx      # Auto-fit credential grid
│   ├── three/
│   │   ├── ConstellationNetwork.tsx  # Interactive node+edge background
│   │   ├── WireframeIcosahedron.tsx  # Hero 3D element
│   │   ├── WireframeCube.tsx         # Expertise: Full Stack card
│   │   ├── WireframeTorus.tsx        # Expertise: DevOps card
│   │   ├── WireframeOctahedron.tsx   # Expertise: AI/ML card, also Certificates bg
│   │   ├── WireframeDoubleHelix.tsx  # Expertise: Data card
│   │   ├── WireframeTorusKnot.tsx    # Timeline background
│   │   └── SceneContainer.tsx        # Shared R3F Canvas wrapper with lazy loading
│   └── ui/
│       ├── GlassCard.tsx         # Reusable glassmorphic card
│       ├── GradientText.tsx      # Gradient text wrapper
│       ├── TechChip.tsx          # Technology tag chip
│       └── CategoryBadge.tsx     # Certificate category badge
├── data/
│   ├── projects.ts               # Project array with `featured` flag
│   ├── experience.ts             # Career timeline entries with sub-projects
│   ├── skills.ts                 # Expertise categories and tech lists
│   └── certificates.ts           # Credentials array
├── hooks/
│   ├── useScrollProgress.ts      # GSAP ScrollTrigger progress tracking
│   ├── useLenis.ts               # Lenis smooth scroll hook
│   └── useMousePosition.ts       # Mouse tracking for 3D parallax
├── assets/
│   ├── videos/                   # Remotion-exported MP4/WebM clips
│   ├── images/
│   │   └── index.ts              # Barrel exports (keep existing pattern)
│   └── styles/
│       ├── _variables.scss       # Colors, gradients, breakpoints, glassmorphism mixins
│       ├── _mixins.scss          # Shared SCSS mixins
│       ├── index.scss            # Global styles
│       ├── Hero.scss
│       ├── Expertise.scss
│       ├── Timeline.scss
│       ├── Projects.scss
│       ├── Certificates.scss
│       ├── Navigation.scss
│       └── Footer.scss
└── remotion/                     # Dev-time Remotion compositions
    ├── HeroIntro.tsx             # Particles assembling into icosahedron
    └── remotion-config.ts        # Remotion rendering config
```

---

## Design System

### Colors
- **Dark mode background:** #0d1116
- **Light mode background:** #f8f9fa
- **Primary gradient:** #667eea → #764ba2 (purple-blue)
- **Accent:** #5000ca (buttons, active states)
- **Text (dark mode):** rgba(255,255,255, 0.8–1.0)
- **Text (light mode):** rgba(0,0,0, 0.7–0.9)
- **Glass border:** rgba(255,255,255, 0.1)
- **Glass background:** rgba(255,255,255, 0.04–0.08) with backdrop-filter: blur(12px)

### Typography
- **Primary font:** "Lato", sans-serif (keep existing)
- **Monospace (tech chips):** 'Courier Prime', monospace
- **Heading treatment:** Gradient text using background-clip
- **Labels:** Uppercase, letter-spacing: 2-3px, small size

### Glassmorphism
All cards share: semi-transparent background, backdrop-filter blur(10-12px), 1px border with rgba(255,255,255,0.1), subtle box-shadow. Light mode: white background with opacity 0.9, reduced blur.

### Breakpoints
- Desktop: > 1200px (2-column grids, side dot nav)
- Tablet: 768–1200px (reduced grid, adapted 3D)
- Mobile: < 768px (single column, bottom dot nav, simplified 3D)

---

## Section Specs

### 1. Navigation

**Top bar (minimal):**
- Left: "JA" monogram/logo
- Right: Dark/light mode toggle icon
- Transparent background, appears on scroll with subtle glassmorphic backdrop

**Side dot indicators (DotNav):**
- Fixed right edge of viewport (desktop), bottom edge (mobile)
- 5 dots representing: Hero, Expertise, Timeline, Projects, Credentials
- Active dot: filled with #667eea, glowing box-shadow
- Inactive dots: hollow, rgba(255,255,255, 0.3) border
- Click to smooth-scroll to section
- Current section label appears on hover next to active dot (e.g., "01 / EXPERTISE")
- Scroll position tracked via GSAP ScrollTrigger

### 2. Hero Section

**Viewport:** Full height (100vh)

**Background:** Constellation network — sparse 3D nodes (varying sizes) connected by thin glowing lines. Lines form and break as nodes drift slowly. Mouse proximity causes nearby connections to brighten and nodes to gently repel/attract. Built with R3F Points + custom line geometry. Reduces node count on mobile.

**3D Element:** Wireframe icosahedron, right side of viewport (desktop) / behind text at lower opacity (mobile). Slowly auto-rotates. Subtle mouse-follow parallax. Purple-blue gradient wireframe color.

**Video:** Remotion-rendered 3-4 second intro plays on page load — particles converging and assembling into the icosahedron wireframe. Once complete, video fades out and live Three.js scene takes over seamlessly.

**Content (staggered GSAP reveals):**
1. Label: "SOFTWARE ENGINEER & AI BUILDER" — uppercase, letter-spacing, gradient
2. Name: "José Auyón" — large, bold
3. Bio: "Software Engineer with experience across enterprise software, full-stack product development, and AI-enabled solutions." (from CV)
4. Social icons: GitHub, LinkedIn, Email — fade + scale
5. CV buttons: "Resume (EN)" / "Resume (ES)" — glassmorphic pill buttons

### 3. Expertise Section

**ID:** `expertise`

**Title:** "Expertise" with gradient text

**Layout:** 2x2 grid (1 column mobile)

**Cards (glassmorphic):**

1. **Full Stack Development**
   - Mini 3D: wireframe cube (corner of card)
   - Tech: React, Next.js, Vue.js, Node.js, Express.js, Flask, FastAPI, Laravel, Spring Boot, React Native, GraphQL
   - Description: Modern web applications across frontend and backend with diverse frameworks

2. **DevOps & Cloud**
   - Mini 3D: wireframe torus
   - Tech: AWS, Azure, Docker, Kubernetes, GitHub Actions, GitLab CI/CD, Nginx, Firebase, Railway, Vercel
   - Description: CI/CD pipelines, container orchestration, cloud infrastructure, deployment automation

3. **AI & Machine Learning**
   - Mini 3D: wireframe octahedron
   - Tech: OpenAI API, Gemini, RAG, vector databases, prompt engineering, PyTorch, scikit-learn, Pandas, LangChain
   - Description: AI integrations, neural networks, predictive modeling, LLM-powered applications

4. **Data & Databases**
   - Mini 3D: wireframe double helix
   - Tech: PostgreSQL, MySQL, MongoDB, Oracle, Supabase, Neo4j, Pandas, PowerBI, R
   - Description: Database design, data pipelines, analytics, visualization

**Animations:**
- Cards reveal on scroll: GSAP opacity [0→1], translateY [30→0], subtle rotateX [5→0]
- Mini 3D geometries start spinning when card enters viewport
- Tech chips stagger in 80ms apart after card appears

### 4. Timeline Section

**ID:** `history`

**Title:** "Career" with gradient text

**Layout:** Custom vertical timeline, center gradient line (purple→blue) that draws itself on scroll (SVG stroke-dashoffset animated via ScrollTrigger). Entries alternate left/right on desktop, stack left on mobile.

**3D Element:** Wireframe torus knot floating in background, slow rotation, parallax with scroll.

**Entries (glassmorphic cards, newest first):**

1. **Software Engineer — HTEC Group** (Sep 2025 – Present)
   - High-level: Production systems, enterprise client initiatives, cross-team collaboration
   - Tech chips: PHP, CodeIgniter, React, Tailwind, FastAPI, PostgreSQL, Docker, AWS, WordPress
   - Expandable sub-projects (accordion): NovoPayment (validation fixes, release coordination), FocalPoints (MVP delivery, full-stack), Crypto Wallet Discovery (architecture, security analysis), RedBud Advisors (website delivery, deployment)
   - Each sub-project: 2-3 bullet accomplishments + tech chips

2. **Software Developer — Pixel Productions** (Jun 2025 – Sep 2025)
   - Shopify automation, storefront UI, internal systems, AI/LLM data structuring
   - Tech: Shopify/Liquid, Next.js, Firebase, Laravel, CSS, JavaScript

3. **Freelance Full Stack Developer** (Apr 2024 – Present)
   - High-level: Custom full-stack and AI-driven products for clients
   - Brief mentions: Alina (Legal AI SaaS), Aquacorp (water monitoring), Educational Game (React Native + Go), Retail CRM/ERP (PHP + MySQL)
   - No deep proprietary details

4. **Full Stack Developer — Korean-Guatemalan Chamber of Commerce** (Nov 2023 – Mar 2024)
   - Web apps, REST APIs, UI/UX, mentoring junior devs
   - Tech: React, Tailwind, Node.js, Express, MongoDB

5. **Software Developer — Granja El Ceibillal** (Mar 2023 – Nov 2023)
   - Farm operations software, real-time monitoring, microservices
   - Tech: React Native, Flask, AWS

6. **CS Tutor — Universidad del Valle de Guatemala** (Jan 2021 – Present)
   - Programming, algorithms, problem solving, mentoring
   - No tech chips — role-focused

**Animations:**
- Entries slide in from left/right with GSAP ScrollTrigger
- Center line draws with scroll progress
- Date pills pulse briefly on reveal
- Sub-project accordions: smooth height + opacity transition

### 5. Projects Section

**ID:** `projects`

**Title:** "Projects" with gradient text

**Layout:** Featured hero project at top, grid below (2 columns desktop, 1 mobile)

**Data architecture:** `src/data/projects.ts` — typed array with `featured: boolean` flag. Adding a project = adding an object to the array. Schema:

```typescript
interface Project {
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
```

**Featured project (MERN E-commerce):**
- Large card spanning full width
- Screenshot preview, full description, tech stack chips, live + GitHub links
- Subtle glassmorphic border glow

**Grid projects (8 remaining):**
- Glassmorphic cards with screenshot, title, tech chips, links
- Hover: subtle scale + shadow lift
- Click: could expand for more detail (optional)

**Current projects:**
1. MERN E-commerce Platform (**featured**) — React, Node.js, MongoDB, Express, Chakra UI
2. VanLife — React, React Router v6, Firebase, Vite
3. Tenzies Dice Game — React, JavaScript, CSS
4. EDA Generator — Python, Data Science
5. Neural Network Attrition Predictor — Python, Neural Networks, PCA
6. XMPP Live Chat — React, Node.js, XMPP
7. Hough Transform CUDA — CUDA, C++, GPU Computing
8. Berserk Match — React.js, JavaScript
9. Covid Hunt Game — Java, Greenfoot, OOP

**Animations:**
- Featured card: GSAP reveal with scale [0.95→1] + opacity
- Grid cards: staggered reveal on scroll, translateY [30→0]

### 6. Certificates Section

**ID:** `credentials`

**Title:** "Credentials" with gradient text

**Layout:** Auto-fit grid (minmax(300px, 1fr)), 3 columns → 2 → 1

**3D Element:** Small wireframe octahedron in background, subtle.

**Data architecture:** `src/data/certificates.ts` — typed array. Same easy-add pattern as projects.

**Cards (glassmorphic):**
- Certificate image (clickable → verification URL)
- Title + provider
- Category badge with gradient background

**14 certificates (existing 10 + 4 new):**
1. Java Backend (Spring Boot) Developer — Ada School / Swisscontact (**new**)
2. Back-end Developer Professional Certificate — Boot.dev (**new**)
3. ChatGPT Prompt Engineering for Developers — DataCamp (**new**)
4. Build an AI Agent in Python — Boot.dev (**new**)
5. Software Engineering Certification — HackerRank
6. SQL (Advanced) Certificate — HackerRank
7. Problem Solving (Intermediate) — HackerRank
8. JavaScript Intermediate — HackerRank
9. Java Programming — Coursera
10. HPE Cloud Certification — HPE
11. AWS DevOps: Code, Build, and Test — AWS/edX
12. High-Performance Group Meetings — Training
13. Laravel Developer Certificate — Udemy
14. Software Intern Program — HackerRank

**Animations:**
- Cards stagger on scroll: GSAP opacity + translateY
- Category badges: subtle gradient shimmer on reveal

### 7. Footer

- Dark background, seamless blend from last section
- "José Auyón — Software Engineer & AI Builder"
- Social links: GitHub, LinkedIn, Email (hover glow)
- CV download: EN / ES
- Copyright line
- Constellation network fades back in subtly — bookends the experience
- No 3D geometry

---

## Dark/Light Mode

- Toggle in minimal top bar
- Dark mode: #0d1116 bg, light text, glowing wireframes
- Light mode: #f8f9fa bg, dark text, darker wireframe colors, reduced glow
- Constellation network adapts (dark nodes on light bg)
- Glassmorphism adapts (white bg with higher opacity in light mode)
- Stored in localStorage for persistence
- State managed in App.tsx via useState, passed via props (keep current pattern)

---

## Performance

- **Lazy-load Three.js:** SceneContainer only initializes R3F Canvas when section approaches viewport (IntersectionObserver)
- **Remotion videos:** Hero video preloaded, others lazy
- **Images:** WebP format with fallbacks, lazy-loaded with loading="lazy"
- **GSAP:** ScrollTrigger handles all scroll animations efficiently with will-change hints
- **3D LOD:** Mobile renders lower polygon count geometries; very low-end devices hide 3D entirely via matchMedia check
- **Code splitting:** Vite handles tree-shaking and chunk splitting automatically

---

## Mobile Adaptations

- Side dot nav → bottom edge dots
- 3D geometries: reduced polygon count, lower opacity, hidden on very low-end
- Constellation network: fewer nodes (30 → 15)
- All grids collapse to single column
- Hero: 3D icosahedron behind text at lower opacity
- Timeline: entries stack left (no alternating)
- Touch-friendly: larger tap targets, swipe hints

---

## Playwright Testing

- **Visual regression:** Screenshot each section in dark/light mode at desktop + mobile viewports
- **Scroll behavior:** Verify parallax layers move, GSAP reveals trigger, timeline line draws
- **Navigation:** Dot click → smooth scroll to correct section, active dot updates
- **Dark/light toggle:** Mode switches correctly, all sections adapt
- **Projects:** Featured card renders, grid displays all projects
- **Responsiveness:** Test at 1440px, 1024px, 768px, 375px viewports
- **Performance:** Check no layout shifts (CLS), reasonable load time

---

## Deployment

- **Hosting:** Firebase (keep existing setup)
- **Build output:** Vite → `dist/` directory
- **Update firebase.json** to point to `dist/` instead of `build/`

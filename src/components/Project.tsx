import React, { useEffect, useRef } from 'react';
import { createTimeline } from 'animejs';
import {
  edaproject,
  neuralnetwork,
  xmppimage,
  houghTransform,
  berserkMatch,
  covidHunt,
  mernProducts,
  tenziesGame,
  vanLifeApp
} from '../assets/images';
import '../assets/styles/Project.scss';

function Project() {
    const gridRef = useRef<HTMLDivElement>(null);
    const projects = [
        {
            id: 'ecommerce',
            title: 'MERN E-commerce Platform',
            description: 'A full-stack e-commerce web application built with the MERN stack featuring product management, responsive design with Chakra UI, dark/light mode toggle, and real-time state management with Zustand. Includes comprehensive CRUD operations, pagination, form validation, and production-ready deployment.',
            image: mernProducts, // You'll need to add the actual image
            link: 'https://e-commerce-jznx.onrender.com',
            tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Chakra UI']
        },
        {
            id: 'tenzies',
            title: 'Tenzies Dice Game',
            description: 'An interactive dice game built with React where players roll dice to match all ten dice to the same number. Features include real-time score tracking, move counting, timer functionality, and responsive design. The game implements React hooks for state management and provides an engaging user experience with smooth animations.',
            image: tenziesGame, // TODO: Replace with actual tenzies game screenshot
            link: 'https://tenzies-game-react.netlify.app', // Update with your actual deployed link            tech: ['React', 'JavaScript', 'CSS', 'Game Dev']
        },
        {
            id: 'vanlife',
            title: 'VanLife - Van Rental Platform',
            description: 'A comprehensive React-based web application for van rentals featuring van browsing with filters, detailed van information, host dashboard with income analytics, and protected authentication routes. Built with React Router v6, Firebase Firestore for data storage, and MirageJS for development. Includes responsive design for mobile users and complete CRUD operations for van management.',
            image: vanLifeApp, // TODO: Replace with actual VanLife screenshot
            link: 'https://van-life-green-iota.vercel.app',
            tech: ['React', 'React Router', 'Firebase', 'Vite', 'MirageJS']
        },
        {
            id: 'eda',
            title: 'EDA Generator',
            description: 'This EDA project is a comprehensive tool for anyone working with datasets, enabling quick insights and ensuring data quality before diving deeper into more advanced analysis or machine learning modeling. It simplifies the process of preparing data and allows users to focus on generating actionable insights and hypotheses based on the data.',
            image: edaproject,
            link: 'https://github.com/auyjos/Proyecto1DS.git',
            tech: ['Python', 'Data Science', 'Analytics']
        },
        {
            id: 'neural',
            title: 'Neural Network Employee Attrition Predictor',
            description: 'In this project, I built a predictive model for employee attrition using PCA and a Neural Network. By analyzing variables like monthly rate, job satisfaction, and travel frequency, I applied PCA to reduce data dimensionality and improve model efficiency. The neural network then captured complex patterns in the data to accurately predict attrition.',
            image: neuralnetwork,
            link: 'https://github.com/erickguerra22/ProyectoFinal_DS.git',
            tech: ['Python', 'Neural Networks', 'PCA']
        },
        {
            id: 'xmpp',
            title: 'Xmpp Live Chat',
            description: 'I developed a real-time chat application using Node.js and React to connect to an XMPP-enabled server, enabling users to sign in and engage in live chats with other users. The app supports all essential social activity functionalities, including creating profiles, managing contacts, and sending messages.',
            image: xmppimage,
            link: 'https://github.com/auyjos/xmpp-react-app.git',
            tech: ['React', 'Node.js', 'XMPP']
        },
        {
            id: 'hough',
            title: 'Hough Transform using Cuda',
            description: 'In this project, I used CUDA and C++ to transform PGM (Portable Gray Map) files into grayscale images, leveraging GPU parallelism for faster processing. The implementation parsed the PGM files, processed pixel data on the GPU, and handled large images efficiently.',
            image: houghTransform,
            link: 'https://github.com/auyjos/HoughTransform.git',
            tech: ['CUDA', 'C++', 'GPU Computing']
        },
        {
            id: 'berserk',
            title: 'Berserk Match',
            description: 'I developed an interactive memory game using React.js to enhance user engagement and responsiveness. The game challenges players to match pairs of cards by remembering their positions. It features dynamic state management with React hooks to track flipped cards, matched pairs, and the player\'s progress.',
            image: berserkMatch,
            link: 'http://www.wemanage.jp/',
            tech: ['React', 'JavaScript', 'Game Dev']
        },  
        {
            id: 'covid',
            title: 'Covid Hunt Game',
            description: 'I developed a basic 2D shooting game using Greenfoot, a Java-based framework for interactive applications, to demonstrate object-oriented programming concepts. The game involves a player-controlled character shooting at moving enemies, employing inheritance to manage game entities.',
            image: covidHunt,
            link: 'https://www.byuh.edu/covid-19-case-management',
            tech: ['Java', 'Greenfoot', 'OOP']
        }
    ];

  useEffect(() => {
    const grid = gridRef.current!;
    const cards = Array.from(grid.querySelectorAll('.project'));

    /* Observer fires once per card (rootMargin gives a little head-room) */
    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .forEach((entry) => {
            const el = entry.target as HTMLElement;

            /* build a one-off timeline for this card */
            createTimeline()
              .add(el, {
                opacity: [0, 1],
                translateY: [30, 0],
                easing: 'easeOutExpo',
                duration: 700,
              })
              .then(() => observer.unobserve(el));
          });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);    return(
    <div className="projects-container" id="projects">
        <h1>Personal Projects</h1>
        <div ref={gridRef} className="projects-grid">
            {projects.map((project) => (                <div 
                    key={project.id}
                    className="project"
                >
                    <a href={project.link} target="_blank" rel="noreferrer">
                        <img src={project.image} className="zoom" alt="thumbnail" width="100%"/>
                    </a>
                    <a href={project.link} target="_blank" rel="noreferrer">
                        <h2>{project.title}</h2>
                    </a>                    <div className="tech-stack">
                        {project.tech?.map((tech) => (
                            <span key={tech} className="tech-tag">{tech}</span>
                        ))}
                    </div>
                    <p>{project.description}</p>
                </div>
            ))}
        </div>
    </div>
    );
}

export default Project;
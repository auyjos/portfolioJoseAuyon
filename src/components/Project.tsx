import React, { useEffect, useRef } from 'react';
import {  createTimeline } from 'animejs';
import edaproject from '../assets/images/edaproject.png'
import neuralnetwork from '../assets/images/neuralscreenshot.png'
import xmppimage from '../assets/images/xmppchat.png'
import houghTransform from '../assets/images/houghTransform.jpeg'
import berserkMatch from '../assets/images/berserkmatch.png'
import covidHunt from '../assets/images/covidhunt.png'

import '../assets/styles/Project.scss';

function Project() {
     const gridRef = useRef<HTMLDivElement>(null);

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
  }, []);

    return(
    <div className="projects-container" id="projects">
        <h1>Personal Projects</h1>
        <div  ref={gridRef} className="projects-grid">
            <div className="project">
                <a href="https://github.com/auyjos/Proyecto1DS.git" target="_blank" rel="noreferrer"><img src={edaproject} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/auyjos/Proyecto1DS.git" target="_blank" rel="noreferrer"><h2>EDA Generator</h2></a>
                <p>This EDA project is a comprehensive tool for anyone working with datasets, enabling quick insights and ensuring data quality before diving deeper into more advanced analysis or machine learning modeling. It simplifies the process of preparing data and allows users to focus on generating actionable insights and hypotheses based on the data.</p>
            </div>
            <div className="project">
                <a href="https://github.com/erickguerra22/ProyectoFinal_DS.git" target="_blank" rel="noreferrer"><img src={neuralnetwork} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/erickguerra22/ProyectoFinal_DS.git" target="_blank" rel="noreferrer"><h2>Neural Network Employee Attrition Predictor</h2></a>
                <p>In this project, I built a predictive model for employee attrition using PCA and a Neural Network. By analyzing variables like monthly rate, job satisfaction, and travel frequency, I applied PCA to reduce data dimensionality and improve model efficiency. The neural network then captured complex patterns in the data to accurately predict attrition. After training, I exported both the PCA and neural network models for deployment, allowing HR teams to predict and address employee turnover effectively.

.</p>
            </div>
            <div className="project">
                <a href="https://github.com/auyjos/xmpp-react-app.git" target="_blank" rel="noreferrer"><img src={xmppimage} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/auyjos/xmpp-react-app.git" target="_blank" rel="noreferrer"><h2>Xmpp Live Chat</h2></a>
                <p>I developed a real-time chat application using Node.js and React to connect to an XMPP-enabled server, enabling users to sign in and engage in live chats with other users. The app supports all essential social activity functionalities, including creating profiles, managing contacts, and sending messages. By leveraging XMPP's messaging protocol, the application ensures efficient and seamless communication, providing a dynamic and interactive social experience for users.

.</p>
            </div>
            <div className="project">
                <a href="https://github.com/auyjos/HoughTransform.git" target="_blank" rel="noreferrer"><img src={houghTransform} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://github.com/auyjos/HoughTransform.git" target="_blank" rel="noreferrer"><h2>Hough Transform using Cuda</h2></a>
                <p>In this project, I used CUDA and C++ to transform PGM (Portable Gray Map) files into grayscale images, leveraging GPU parallelism for faster processing. The implementation parsed the PGM files, processed pixel data on the GPU, and handled large images efficiently. This approach showcased the power of CUDA for real-time image processing and accelerated tasks like computer vision and multimedia applications.</p>
            </div>
            <div className="project">
                <a href="http://www.wemanage.jp/" target="_blank" rel="noreferrer"><img src={berserkMatch} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="http://www.wemanage.jp/" target="_blank" rel="noreferrer"><h2>Berserk Match</h2></a>
                <p>I developed an interactive memory game using React.js to enhance user engagement and responsiveness. The game challenges players to match pairs of cards by remembering their positions. It features dynamic state management with React hooks to track flipped cards, matched pairs, and the player's progress. The project also includes animations, a timer, and a scoring system to improve user experience.</p>
            </div>
            <div className="project">
                <a href="https://www.byuh.edu/covid-19-case-management" target="_blank" rel="noreferrer"><img src={covidHunt} className="zoom" alt="thumbnail" width="100%"/></a>
                <a href="https://www.byuh.edu/covid-19-case-management" target="_blank" rel="noreferrer"><h2>Covid Hunt Game</h2></a>
                <p>I developed a basic 2D shooting game using Greenfoot, a Java-based framework for interactive applications, to demonstrate object-oriented programming concepts. The game involves a player-controlled character shooting at moving enemies, employing inheritance to manage game entities such as the player, enemies, and projectiles.</p>
            </div>
        </div>
    </div>
    );
}

export default Project;
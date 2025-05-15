import React, {useEffect} from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import '../assets/styles/Main.scss';
import { createTimeline, animate, stagger } from "animejs";   // ← Anime v4 named exports

import portfolio_img from '../assets/images/portfolio_img.jpg'  


function Main() {

   useEffect(() => {
    /* 1  Entrance timeline (fires once on mount) */
    const tl = createTimeline({
      duration: 800,
    });
  tl
      .add(".background-wrapper", { opacity: [0, 1], scale: [1.15, 1] })
      .add(".rounded-image", {
        opacity: [0, 1],
        translateY: [-40, 0],
        scale: [0.8, 1],
      }, "<-400")
      .add([".content h1", ".content > p"], {
        opacity: [0, 1],
        translateX: [-50, 0],
        delay: stagger(150),
      }, "<-300")
      .add(".about-me", { opacity: [0, 1], translateY: [10, 0] }, "<-200")
      .add(".social_icons a svg", {
        opacity: [0, 1],
        scale: [0, 1],
        delay: stagger(120),
      }, "<-400")
         .add(".pdf-section",        { opacity: [0, 1], translateY: [10, 0] }, "<-300");

    /* ---------------------------------------------------------- */
    /* 2  HOVER PULSE                                             */
    /* ---------------------------------------------------------- */
    const icons: NodeListOf<Element> = document.querySelectorAll(
      ".social_icons a, .mobile_social_icons a"
    );

    const handleEnter = (el: Element) =>       // <- typed
      animate(el , {
        scale: 1.25,
        duration: 250,
        easing: "easeInOutQuad",
        direction: "alternate",
      });

    icons.forEach((link) =>
      link.addEventListener("mouseenter", () => handleEnter(link))
    );

    /* cleanup */
    return () => {
      tl.pause();
      icons.forEach((link) =>
        link.replaceWith(link.cloneNode(true) as Element)
      );
    };
  }, []);





  return (
    <div className="container">
    <div className="background-wrapper"></div>

      <div className="about-section">
        <div className="image-wrapper">
        <img src={portfolio_img} alt="Avatar" className="rounded-image" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/auyjos" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/jose-auyon/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
            <a href="mailto:auyon.joseandres@gmail.com" target="_blank" rel="noreferrer"><EmailIcon /></a>

          </div>
          <h1>José Auyón</h1>
          <p>Full Stack Engineer</p>

          <div className="about-me">
            <p>
              I am a passionate Full Stack Engineer with experience in building scalable web applications using modern frameworks and technologies. 
              My expertise includes developing both front-end and back-end systems, focusing on clean, maintainable code and optimized performance. 
              I love tackling challenging problems and continuously learning to stay up-to-date with the latest industry trends.
            </p>
          </div>

          <div className="pdf-section">
        
            <a href={require('../_someFolder/JoseAuyonEspanol.pdf')} target="_blank" rel="noreferrer">CV Español</a>
            <div>
            <a href={require('../_someFolder/CVEnglishJoseAuyon.pdf')} target="_blank" rel="noreferrer">CV English</a>
            </div>
          </div>


          <div className="mobile_social_icons">
            <a href="https://github.com/auyjos" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/jose-auyon/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
            <a href="mailto:auyon.joseandres@gmail.com" target="_blank" rel="noreferrer"><EmailIcon /></a>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Main;
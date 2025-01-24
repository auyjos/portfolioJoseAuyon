import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import '../assets/styles/Main.scss';

import portofoliophoto1 from '../assets/images/portofoliophoto1.jpg'  


function Main() {

 


  return (
    <div className="container">
  <div className="background-wrapper"></div>

      <div className="about-section">
        <div className="image-wrapper">
        <img src={portofoliophoto1} alt="Avatar" className="rounded-image" />
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
            <a href={require('../_someFolder/JoseAuyonIngles.pdf')} target="_blank" rel="noreferrer">CV Inglés</a>
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
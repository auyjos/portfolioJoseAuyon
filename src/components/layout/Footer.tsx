import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import SceneContainer from '../three/SceneContainer';
import ConstellationNetwork from '../three/ConstellationNetwork';
import cvEnglish from '../../_someFolder/CVEnglishJoseAuyon.pdf';
import '../../assets/styles/Footer.scss';

function Footer() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(e.clientX - rect.left - rect.width / 2);
    setMouseY(-(e.clientY - rect.top - rect.height / 2));
  };

  return (
    <footer className="site-footer" onMouseMove={handleMouseMove}>
      <SceneContainer
        className="footer-scene"
        camera={{ position: [0, 0, 7], fov: 60 }}
      >
        <ConstellationNetwork count={40} mouseX={mouseX} mouseY={mouseY} />
      </SceneContainer>

      <div className="footer-content">
        <p className="footer-tagline">
          Built with React &amp; Three.js &mdash; Jose Auyon &copy; {new Date().getFullYear()}
        </p>

        <div className="footer-links">
          <a
            href="https://github.com/auyjos"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://www.linkedin.com/in/jose-auyon/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="mailto:auyon.joseandres@gmail.com"
            aria-label="Email"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>

        <a
          href={cvEnglish}
          download="CVEnglishJoseAuyon.pdf"
          className="footer-cv-link"
        >
          Download CV
        </a>
      </div>
    </footer>
  );
}

export default Footer;

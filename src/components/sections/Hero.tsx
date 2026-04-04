import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faChevronDown } from '@fortawesome/free-solid-svg-icons';
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

    // Set initial states
    gsap.set(['.hero-photo-wrapper', '.hero-label', '.hero-name', '.hero-bio', '.hero-socials', '.hero-cv-buttons', '.hero-scroll-indicator'], {
      y: 20,
      opacity: 0,
    });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.hero-photo-wrapper', { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: 0.2, ease: 'back.out(1.4)' })
      .to('.hero-label', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .to('.hero-name', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .to('.hero-bio', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .to('.hero-socials', { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
      .to('.hero-cv-buttons', { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
      .to('.hero-scroll-indicator', { opacity: 1, y: 0, duration: 0.5 }, '-=0.1');

    // Bouncing scroll indicator
    gsap.to('.hero-scroll-indicator', {
      y: 8,
      duration: 0.9,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 2,
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
        <div className="hero-photo-wrapper">
          <div className="hero-photo-ring">
            <img
              src="/jose.jpeg"
              alt="José Auyón"
              className="hero-photo"
            />
          </div>
        </div>

        <p className="hero-label">Software Engineer &amp; AI Builder</p>

        <h1 className="hero-name">
          <span className="hero-name-text">José Auyón</span>
          <span className="hero-name-underline" aria-hidden="true" />
        </h1>

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

      <div className="hero-scroll-indicator" aria-hidden="true">
        <span className="hero-scroll-label">scroll</span>
        <FontAwesomeIcon icon={faChevronDown} className="hero-scroll-chevron" />
      </div>
    </section>
  );
}

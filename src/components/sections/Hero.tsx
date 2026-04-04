import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import SceneContainer from '../three/SceneContainer';
import ConstellationNetwork from '../three/ConstellationNetwork';
import WireframeIcosahedron from '../three/WireframeIcosahedron';
import useMousePosition from '../../hooks/useMousePosition';
import useMagneticHover from '../../hooks/useMagneticHover';
import cvEnglish from '../../_someFolder/CVEnglishJoseAuyon.pdf';
import heroVideoSrc from '../../assets/videos/hero-intro.mp4';
import '../../assets/styles/Hero.scss';

function MagneticLink({ children, className, ...props }: Readonly<React.AnchorHTMLAttributes<HTMLAnchorElement>>) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagneticHover(ref, 8);
  return (
    <a ref={ref} className={className} {...props}>
      {children}
    </a>
  );
}

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // If the video errors (missing file, unsupported codec, etc.), fall through
  // to the live 3D scene immediately so the page is never blocked.
  useEffect(() => {
    if (videoError) {
      const t = setTimeout(() => setVideoEnded(true), 100);
      return () => clearTimeout(t);
    }
  }, [videoError]);

  // Ensure autoplay actually fires — some browsers silently block it.
  // If the video hasn't started within 1s, try play() programmatically;
  // if that also fails, treat it as an error and skip to the 3D scene.
  useEffect(() => {
    if (videoEnded || videoError) return;
    const video = videoRef.current;
    if (!video) return;

    const timer = setTimeout(() => {
      if (video.paused && !videoEnded) {
        video.play().catch(() => setVideoError(true));
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [videoEnded, videoError]);

  // Run entrance animations once the intro video is done (or skipped).
  useEffect(() => {
    if (!videoEnded) return;
    if (!contentRef.current) return;

    gsap.set(
      [
        '.hero-photo-wrapper',
        '.hero-label',
        '.hero-name',
        '.hero-bio',
        '.hero-socials',
        '.hero-cv-buttons',
        '.hero-scroll-indicator',
      ],
      { y: 20, opacity: 0 }
    );

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.hero-photo-wrapper', { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: 0.1, ease: 'back.out(1.4)' })
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
  }, [videoEnded]);

  return (
    <section id="hero" className="hero">
      {/* Intro video — plays once then reveals the live 3D scene */}
      {!videoEnded && !videoError && (
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={() => setVideoEnded(true)}
          onError={() => setVideoError(true)}
          onCanPlayThrough={(e) => {
            const v = e.currentTarget;
            if (v.paused) v.play().catch(() => setVideoError(true));
          }}
        >
          <source src={heroVideoSrc} type="video/mp4" />
        </video>
      )}

      {/* Live 3D scene — hidden while intro plays, fades in after */}
      <SceneContainer
        className={`hero-scene${videoEnded ? '' : ' hero-scene--hidden'}`}
        camera={{ position: [0, 0, 6], fov: 60 }}
      >
        {/* eslint-disable-next-line react/no-unknown-property */}
        <ambientLight intensity={0.5} />
        <ConstellationNetwork
          count={35}
          mouseX={mouse.normalizedX}
          mouseY={mouse.normalizedY}
        />
        {/* eslint-disable-next-line react/no-unknown-property */}
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
          <MagneticLink href="https://github.com/auyjos" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FontAwesomeIcon icon={faGithub} />
          </MagneticLink>
          <MagneticLink href="https://linkedin.com/in/jose-auyon" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} />
          </MagneticLink>
          <MagneticLink href="mailto:auyon.joseandres@gmail.com" aria-label="Email">
            <FontAwesomeIcon icon={faEnvelope} />
          </MagneticLink>
        </div>

        <div className="hero-cv-buttons">
          {/* download attribute has limited iOS < 13 support; acceptable trade-off for a CV link */}
          <MagneticLink href={cvEnglish} download="">Resume (EN)</MagneticLink>
        </div>
      </div>

      <div className="hero-scroll-indicator" aria-hidden="true">
        <span className="hero-scroll-label">scroll</span>
        <FontAwesomeIcon icon={faChevronDown} className="hero-scroll-chevron" />
      </div>
    </section>
  );
}

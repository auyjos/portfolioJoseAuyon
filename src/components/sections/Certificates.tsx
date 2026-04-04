import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certificates } from '../../data/certificates';
import CategoryBadge from '../ui/CategoryBadge';
import SceneContainer from '../three/SceneContainer';
import WireframeOctahedron from '../three/WireframeOctahedron';
import WireframeIcosahedron from '../three/WireframeIcosahedron';
import SceneLights from '../three/SceneLights';
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

const CATEGORY_LABEL: Record<string, string> = {
  backend: 'Backend',
  ai: 'AI',
  algorithm: 'Algorithm',
  programming: 'Programming',
  cloud: 'Cloud',
  devops: 'DevOps',
  softskills: 'Soft Skills',
  framework: 'Framework',
  engineering: 'Engineering',
  database: 'Database',
};

function Certificates() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      // Card entrance — staggered with rotateX perspective tilt
      const cards = gridRef.current!.querySelectorAll('.certification');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, rotateX: 15, transformPerspective: 600 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'expo.out',
            delay: i * 0.06,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            },
          }
        );

        // Badge reveal within each card
        const badge = card.querySelector('.category-badge');
        if (badge) {
          gsap.fromTo(
            badge,
            { opacity: 0, x: -10, scale: 0.9 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.5,
              ease: 'back.out(1.6)',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
              },
            }
          );
        }
      });

      // 3D scene parallax on scroll
      gsap.to('.certs-scene-main', {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('.certs-scene-accent', {
        y: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const speedMultiplier = hoveredCard ? 2.5 : 1;

  return (
    <div className="certifications-container" id="credentials" ref={sectionRef}>
      {/* Primary 3D element — larger, centered background */}
      <SceneContainer
        className="certs-scene-main"
        style={{
          position: 'absolute',
          top: '5%',
          right: '2%',
          width: 320,
          height: 320,
          pointerEvents: 'none',
          opacity: 0.3,
        }}
        camera={{ position: [0, 0, 3.5], fov: 50 }}
      >
        <SceneLights />
        <WireframeOctahedron speedMultiplier={speedMultiplier} />
      </SceneContainer>

      {/* Secondary 3D element — bottom-left accent */}
      <SceneContainer
        className="certs-scene-accent"
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '3%',
          width: 200,
          height: 200,
          pointerEvents: 'none',
          opacity: 0.18,
        }}
        camera={{ position: [0, 0, 4], fov: 50 }}
      >
        <SceneLights />
        <WireframeIcosahedron mouseX={0} mouseY={0} />
      </SceneContainer>

      <h2 className="section-title gradient-text">Credentials</h2>

      <div ref={gridRef} className="certifications-grid">
        {certificates.map((cert) => {
          const imgSrc = imageMap[cert.image];
          const categoryLabel = CATEGORY_LABEL[cert.category] ?? cert.category;

          return (
            <div
              key={cert.id}
              className="certification"
              onMouseEnter={() => setHoveredCard(cert.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CategoryBadge category={categoryLabel} />
              {cert.verifyUrl ? (
                <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                  {imgSrc && (
                    <img
                      src={imgSrc}
                      alt={cert.title}
                      className="zoom"
                      width="100%"
                    />
                  )}
                  <h3>{cert.title}</h3>
                </a>
              ) : (
                <>
                  {imgSrc && (
                    <img
                      src={imgSrc}
                      alt={cert.title}
                      className="zoom"
                      width="100%"
                    />
                  )}
                  <h3>{cert.title}</h3>
                </>
              )}
              <div className="cert-provider">
                <span>Issued by {cert.provider}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Certificates;

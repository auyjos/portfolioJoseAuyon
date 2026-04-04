import React, { useEffect, useRef } from 'react';
import { createTimeline } from 'animejs';
import { certificates } from '../../data/certificates';
import CategoryBadge from '../ui/CategoryBadge';
import SceneContainer from '../three/SceneContainer';
import WireframeOctahedron from '../three/WireframeOctahedron';
import * as images from '../../assets/images';
import '../../assets/styles/Certificates.scss';

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
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.certification'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .forEach((entry) => {
            const el = entry.target as HTMLElement;

            createTimeline()
              .add(el, {
                opacity: [0, 1],
                translateY: [30, 0],
                rotateX: [15, 0],
                easing: 'easeOutExpo',
                duration: 800,
              })
              .then(() => observer.unobserve(el));
          });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="certifications-container" id="credentials">
      <SceneContainer
        className="certs-scene"
        style={{
          position: 'absolute',
          top: 0,
          right: '5%',
          width: 180,
          height: 180,
          pointerEvents: 'none',
          opacity: 0.4,
        }}
        camera={{ position: [0, 0, 3], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <WireframeOctahedron />
      </SceneContainer>

      <h1>Credentials</h1>

      <div ref={gridRef} className="certifications-grid">
        {certificates.map((cert) => {
          const imgSrc = imageMap[cert.image];
          const categoryLabel = CATEGORY_LABEL[cert.category] ?? cert.category;

          return (
            <div key={cert.id} className="certification">
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
                  <h2>{cert.title}</h2>
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
                  <h2>{cert.title}</h2>
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

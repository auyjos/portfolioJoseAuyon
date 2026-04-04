import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillCategories } from '../../data/skills';
import TechChip from '../ui/TechChip';
import SceneContainer from '../three/SceneContainer';
import WireframeCube from '../three/WireframeCube';
import WireframeTorus from '../three/WireframeTorus';
import WireframeOctahedron from '../three/WireframeOctahedron';
import '../../assets/styles/Expertise.scss';

gsap.registerPlugin(ScrollTrigger);

const geometryMap: Record<string, React.ReactNode> = {
  cube: <WireframeCube />,
  torus: <WireframeTorus />,
  octahedron: <WireframeOctahedron />,
  doubleHelix: <WireframeOctahedron />, // Reuse octahedron for now
};

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.skill-card');

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30, rotateX: 5 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.1,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="expertise" className="expertise" ref={sectionRef}>
      <h2 className="section-title gradient-text">Expertise</h2>
      <div className="expertise-grid">
        {skillCategories.map((category) => (
          <div key={category.id} className="skill-card">
            <div className="skill-card-header">
              <h3 className="skill-card-title">{category.title}</h3>
              <SceneContainer
                className="skill-card-3d"
                camera={{ position: [0, 0, 3], fov: 50 }}
              >
                <ambientLight intensity={0.5} />
                {geometryMap[category.geometry]}
              </SceneContainer>
            </div>
            <p className="skill-card-description">{category.description}</p>
            <div className="skill-card-chips">
              {category.technologies.map((tech) => (
                <TechChip key={tech} label={tech} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

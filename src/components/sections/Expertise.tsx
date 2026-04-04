import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillCategories } from '../../data/skills';
import TechChip from '../ui/TechChip';
import NeuralNetworkMini from '../ui/NeuralNetworkMini';
import CodeStackMini from '../ui/CodeStackMini';
import PipelineMini from '../ui/PipelineMini';
import DataFlowMini from '../ui/DataFlowMini';
import SceneContainer from '../three/SceneContainer';
import WireframeCube from '../three/WireframeCube';
import WireframeTorus from '../three/WireframeTorus';
import WireframeOctahedron from '../three/WireframeOctahedron';
import SceneLights from '../three/SceneLights';
import useTextReveal from '../../hooks/useTextReveal';
import '../../assets/styles/Expertise.scss';

gsap.registerPlugin(ScrollTrigger);

// GeometryScene renders inside a <Canvas> (R3F context), so Three.js JSX is valid here.
function GeometryScene({
  geometry,
  speedMultiplier,
}: {
  readonly geometry: string;
  readonly speedMultiplier: number;
}) {
  return (
    <>
      <SceneLights />
      {geometry === 'cube' && <WireframeCube speedMultiplier={speedMultiplier} />}
      {geometry === 'torus' && <WireframeTorus speedMultiplier={speedMultiplier} />}
      {geometry !== 'cube' && geometry !== 'torus' && (
        <WireframeOctahedron speedMultiplier={speedMultiplier} />
      )}
    </>
  );
}

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useTextReveal(titleRef);

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
      <h2 ref={titleRef} className="section-title gradient-text">Expertise</h2>
      <div className="expertise-grid">
        {skillCategories.map((category) => {
          const isHovered = hoveredCard === category.id;
          // Encode geometry variant as a data attribute so CSS applies the right glow color
          const colorVariant =
            category.geometry === 'torus' || category.geometry === 'doubleHelix'
              ? 'purple'
              : 'blue';

          return (
            <article
              key={category.id}
              className={`skill-card${isHovered ? ' skill-card--hovered' : ''}`}
              data-glow={colorVariant}
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="skill-card-header">
                <h3 className="skill-card-title">{category.title}</h3>
                <div className="skill-card-3d-wrapper">
                  <div className="skill-card-particle-ring" />
                  <SceneContainer
                    className="skill-card-3d"
                    camera={{ position: [0, 0, 3], fov: 50 }}
                  >
                    <GeometryScene
                      geometry={category.geometry}
                      speedMultiplier={isHovered ? 3 : 1}
                    />
                  </SceneContainer>
                </div>
              </div>
              <p className="skill-card-description">{category.description}</p>
              {category.id === 'fullstack' && <CodeStackMini />}
              {category.id === 'devops' && <PipelineMini />}
              {category.id === 'ai-ml' && <NeuralNetworkMini />}
              {category.id === 'data' && <DataFlowMini />}
              <div className="skill-card-chips">
                {category.technologies.map((tech) => (
                  <TechChip key={tech} label={tech} />
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

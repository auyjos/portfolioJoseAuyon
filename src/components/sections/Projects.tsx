import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/projects';
import TechChip from '../ui/TechChip';
import CategoryBadge from '../ui/CategoryBadge';
import SceneContainer from '../three/SceneContainer';
import WireframeTorusKnot from '../three/WireframeTorusKnot';
import SceneLights from '../three/SceneLights';
import * as images from '../../assets/images';
import '../../assets/styles/Projects.scss';

gsap.registerPlugin(ScrollTrigger);

const imageMap: Record<string, string> = {
  mernProducts: images.mernProducts,
  vanLifeApp: images.vanLifeApp,
  tenziesGame: images.tenziesGame,
  edaproject: images.edaproject,
  neuralnetwork: images.neuralnetwork,
  xmppimage: images.xmppimage,
  houghTransform: images.houghTransform,
  berserkMatch: images.berserkMatch,
  covidHunt: images.covidHunt,
};

const CATEGORY_LABEL: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  fullstack: 'Full Stack',
  'ai-ml': 'AI / ML',
  systems: 'Systems',
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const featured = projects.find((p) => p.featured);
  const gridProjects = projects.filter((p) => !p.featured);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Featured card entrance — scale + fade with rotateX for depth
      gsap.fromTo(
        '.featured-project',
        { opacity: 0, scale: 0.95, rotateX: 8, transformPerspective: 800 },
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.featured-project',
            start: 'top 85%',
          },
        }
      );

      // Featured chips stagger
      gsap.fromTo(
        '.featured-chips .tech-chip',
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.featured-chips',
            start: 'top 90%',
          },
        }
      );

      // Grid cards — staggered reveal with perspective tilt
      const cards = sectionRef.current!.querySelectorAll('.project-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, rotateX: 12, transformPerspective: 600 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'expo.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            },
          }
        );

        // Stagger tech chips inside each card
        const chips = card.querySelectorAll('.tech-chip');
        gsap.fromTo(
          chips,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
            },
          }
        );
      });

      // 3D element parallax
      gsap.to('.projects-scene', {
        y: -60,
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

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <SceneContainer
        className="projects-scene"
        style={{
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: 280,
          height: 280,
          pointerEvents: 'none',
          opacity: 0.25,
        }}
        camera={{ position: [0, 0, 4], fov: 50 }}
      >
        <SceneLights />
        <WireframeTorusKnot />
      </SceneContainer>

      <h2 className="section-title gradient-text">Projects</h2>

      {featured && (
        <div className="featured-project">
          <div className="featured-image">
            <img src={imageMap[featured.image]} alt={featured.title} />
          </div>
          <div className="featured-info">
            <p className="featured-label">Featured Project</p>
            <CategoryBadge category={CATEGORY_LABEL[featured.category] ?? featured.category} />
            <h3 className="featured-title">{featured.title}</h3>
            <p className="featured-description">{featured.description}</p>
            <div className="featured-chips">
              {featured.techStack.map((tech) => (
                <TechChip key={tech} label={tech} />
              ))}
            </div>
            <div className="featured-links">
              {featured.liveUrl && (
                <a href={featured.liveUrl} target="_blank" rel="noreferrer">Live Demo →</a>
              )}
              {featured.githubUrl && (
                <a href={featured.githubUrl} target="_blank" rel="noreferrer">GitHub →</a>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="projects-grid">
        {gridProjects.map((project) => (
          <div key={project.id} className="project-card">
            {imageMap[project.image] && (
              <div className="project-image">
                <img src={imageMap[project.image]} alt={project.title} />
              </div>
            )}
            <div className="project-info">
              <CategoryBadge category={CATEGORY_LABEL[project.category] ?? project.category} />
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-chips">
                {project.techStack.map((tech) => (
                  <TechChip key={tech} label={tech} />
                ))}
              </div>
              <div className="project-links">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">Live →</a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub →</a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

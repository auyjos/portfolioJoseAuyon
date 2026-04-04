import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/projects';
import TechChip from '../ui/TechChip';
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

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const featured = projects.find((p) => p.featured);
  const gridProjects = projects.filter((p) => !p.featured);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      '.featured-project',
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.featured-project',
          start: 'top 85%',
        },
      }
    );

    const cards = sectionRef.current.querySelectorAll('.project-card');
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: i * 0.08,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <h2 className="section-title gradient-text">Projects</h2>

      {featured && (
        <div className="featured-project">
          <div className="featured-image">
            <img src={imageMap[featured.image]} alt={featured.title} />
          </div>
          <div className="featured-info">
            <p className="featured-label">Featured Project</p>
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

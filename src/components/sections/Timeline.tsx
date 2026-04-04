import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../../data/experience';
import TechChip from '../ui/TechChip';
import SceneContainer from '../three/SceneContainer';
import WireframeTorusKnot from '../three/WireframeTorusKnot';
import useTextReveal from '../../hooks/useTextReveal';
import '../../assets/styles/Timeline.scss';

// Sub-project names that have significant AI work
const AI_SUBPROJECTS = new Set(['FocalPoints', 'Alina (Legal AI SaaS)']);

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openSubProjects, setOpenSubProjects] = useState<Record<string, boolean>>({});

  const toggleSubProjects = (id: string) => {
    setOpenSubProjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const entries = sectionRef.current.querySelectorAll('.timeline-entry');

    entries.forEach((entry, i) => {
      const isOdd = i % 2 === 0;
      gsap.fromTo(
        entry,
        { opacity: 0, x: isOdd ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: entry,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="history" className="timeline-section" ref={sectionRef}>
      <SceneContainer
        className="timeline-scene"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.3 }}
        camera={{ position: [0, 0, 5] }}
      >
        <ambientLight intensity={0.5} />
        <WireframeTorusKnot />
      </SceneContainer>

      <div className="timeline-content">
        <h2 className="section-title gradient-text">Career</h2>
        <div className="timeline">
          {experience.map((entry) => (
            <div key={entry.id} className="timeline-entry">
              <div className="timeline-dot" />
              <div className="timeline-card">
                <h3 className="timeline-role">{entry.role}</h3>
                <p className="timeline-company">{entry.company} — {entry.location}</p>
                <span className="timeline-date">
                  {entry.startDate} — {entry.endDate}
                </span>
                <p className="timeline-description">{entry.description}</p>
                {entry.techStack.length > 0 && (
                  <div className="timeline-chips">
                    {entry.techStack.map((tech) => (
                      <TechChip key={tech} label={tech} />
                    ))}
                  </div>
                )}
                {entry.subProjects && (
                  <>
                    <button
                      className="sub-projects-toggle"
                      onClick={() => toggleSubProjects(entry.id)}
                    >
                      {openSubProjects[entry.id] ? '▾' : '▸'} {entry.subProjects.length} Projects
                    </button>
                    <div className={`sub-projects ${openSubProjects[entry.id] ? 'open' : ''}`}>
                      {entry.subProjects.map((sp) => (
                        <div key={sp.name} className="sub-project">
                          <p className="sub-project-name">{sp.name}</p>
                          <div className="timeline-chips" style={{ marginBottom: 8 }}>
                            {sp.tech.map((t) => (
                              <TechChip key={t} label={t} />
                            ))}
                          </div>
                          <ul className="sub-project-accomplishments">
                            {sp.accomplishments.map((a, idx) => (
                              <li key={idx}>{a}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

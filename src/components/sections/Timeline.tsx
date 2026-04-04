import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../../data/experience';
import TechChip from '../ui/TechChip';
import SceneContainer from '../three/SceneContainer';
import WireframeTorusKnot from '../three/WireframeTorusKnot';
import '../../assets/styles/Timeline.scss';

gsap.registerPlugin(ScrollTrigger);

// Sub-project names with AI work get a badge
const AI_SUBPROJECTS = new Set(['FocalPoints', 'Alina (Legal AI SaaS)']);

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleCard = useCallback((id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || !progressRef.current) return;

    const ctx = gsap.context(() => {
      // Animate progress line height as user scrolls through the section
      gsap.to(progressRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 0.3,
        },
      });

      // Animate each card in with stagger
      const cards = trackRef.current!.querySelectorAll('.tl-card-wrapper');
      cards.forEach((card, i) => {
        const isLeft = i % 2 === 0;

        // Card entrance
        gsap.fromTo(
          card,
          { opacity: 0, x: isLeft ? -60 : 60, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Track active card
        ScrollTrigger.create({
          trigger: card,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });

      // Animate the dots
      const dots = trackRef.current!.querySelectorAll('.tl-dot');
      dots.forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(3)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="history" className="timeline-section" ref={sectionRef}>
      <SceneContainer
        className="timeline-scene"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.2 }}
        camera={{ position: [0, 0, 5] }}
      >
        <ambientLight intensity={0.5} />
        <WireframeTorusKnot />
      </SceneContainer>

      <div className="timeline-content">
        <h2 className="section-title gradient-text">Career</h2>
        <p className="timeline-subtitle">My professional journey — building software across industries and continents.</p>

        <div className="timeline-track" ref={trackRef}>
          {/* Vertical line */}
          <div className="tl-line">
            <div className="tl-line-progress" ref={progressRef} />
          </div>

          {experience.map((entry, i) => {
            const isActive = activeIndex === i;
            const isLeft = i % 2 === 0;
            const isExpanded = expandedCards[entry.id] ?? false;
            const hasSubProjects = entry.subProjects && entry.subProjects.length > 0;

            return (
              <div
                key={entry.id}
                className={`tl-card-wrapper ${isLeft ? 'tl-left' : 'tl-right'}${isActive ? ' tl-active' : ''}`}
              >
                {/* Timeline dot */}
                <div className="tl-dot">
                  <div className="tl-dot-inner" />
                  {isActive && <div className="tl-dot-ring" />}
                </div>

                {/* Date label on the line */}
                <div className="tl-date-label">
                  <span className="tl-date-start">{entry.startDate}</span>
                  <span className="tl-date-sep">—</span>
                  <span className="tl-date-end">{entry.endDate}</span>
                </div>

                {/* Card */}
                <div className={`tl-card${isActive ? ' tl-card--active' : ''}`}>
                  <div className="tl-card-header">
                    <span className="tl-date-mobile">
                      {entry.startDate} — {entry.endDate}
                    </span>
                    <h3 className="tl-role">{entry.role}</h3>
                    <span className="tl-company">{entry.company}</span>
                    <span className="tl-location">{entry.location}</span>
                  </div>

                  <p className="tl-description">{entry.description}</p>

                  {entry.techStack.length > 0 && (
                    <div className="tl-chips">
                      {entry.techStack.map((tech) => (
                        <TechChip key={tech} label={tech} />
                      ))}
                    </div>
                  )}

                  {hasSubProjects && (
                    <>
                      <button
                        type="button"
                        className={`tl-expand-btn${isExpanded ? ' tl-expand-btn--open' : ''}`}
                        onClick={() => toggleCard(entry.id)}
                        aria-expanded={isExpanded ? 'true' : 'false'}
                      >
                        <span className="tl-expand-icon">{isExpanded ? '−' : '+'}</span>
                        {entry.subProjects!.length} Projects
                      </button>

                      <div className={`tl-subprojects${isExpanded ? ' tl-subprojects--open' : ''}`}>
                        {entry.subProjects!.map((sp) => (
                          <div key={sp.name} className="tl-subproject">
                            <div className="tl-sp-header">
                              <h4 className="tl-sp-name">{sp.name}</h4>
                              {AI_SUBPROJECTS.has(sp.name) && (
                                <span className="ai-badge">
                                  <span className="ai-badge-dot" />
                                  AI
                                </span>
                              )}
                            </div>
                            <div className="tl-chips tl-chips--small">
                              {sp.tech.map((t) => (
                                <TechChip key={t} label={t} />
                              ))}
                            </div>
                            <ul className="tl-accomplishments">
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
            );
          })}
        </div>
      </div>
    </section>
  );
}

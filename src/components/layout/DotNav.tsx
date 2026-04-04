import { useRef } from 'react';
import useScrollProgress from '../../hooks/useScrollProgress';
import useMagneticHover from '../../hooks/useMagneticHover';
import '../../assets/styles/Navigation.scss';

const sections = [
  { id: 'hero', label: '01 / HOME' },
  { id: 'expertise', label: '02 / EXPERTISE' },
  { id: 'history', label: '03 / CAREER' },
  { id: 'projects', label: '04 / PROJECTS' },
  { id: 'credentials', label: '05 / CREDENTIALS' },
];

interface MagneticDotProps {
  readonly section: { id: string; label: string };
  readonly isActive: boolean;
  readonly onClick: () => void;
}

function MagneticDot({ section, isActive, onClick }: MagneticDotProps) {
  const ref = useRef<HTMLButtonElement>(null);
  useMagneticHover(ref, 6);
  return (
    <button
      type="button"
      ref={ref}
      className={`dot ${isActive ? 'active' : ''}`}
      onClick={onClick}
      aria-label={`Navigate to ${section.label}`}
    >
      <span className="dot-label">{section.label}</span>
    </button>
  );
}

export default function DotNav() {
  const activeIndex = useScrollProgress(sections.map((s) => s.id));

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="dot-nav" aria-label="Section navigation">
      {sections.map((section, index) => (
        <MagneticDot
          key={section.id}
          section={section}
          isActive={index === activeIndex}
          onClick={() => scrollToSection(section.id)}
        />
      ))}
    </nav>
  );
}

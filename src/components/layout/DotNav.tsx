import useScrollProgress from '../../hooks/useScrollProgress';
import '../../assets/styles/Navigation.scss';

const sections = [
  { id: 'hero', label: '01 / HOME' },
  { id: 'expertise', label: '02 / EXPERTISE' },
  { id: 'history', label: '03 / CAREER' },
  { id: 'projects', label: '04 / PROJECTS' },
  { id: 'credentials', label: '05 / CREDENTIALS' },
];

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
        <button
          key={section.id}
          className={`dot ${index === activeIndex ? 'active' : ''}`}
          onClick={() => scrollToSection(section.id)}
          aria-label={`Navigate to ${section.label}`}
        >
          <span className="dot-label">{section.label}</span>
        </button>
      ))}
    </nav>
  );
}

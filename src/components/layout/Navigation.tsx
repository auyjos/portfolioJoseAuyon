import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Navigation.scss';

interface NavigationProps {
  mode: string;
  onModeChange: () => void;
}

export default function Navigation({ mode, onModeChange }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`top-bar ${scrolled ? 'scrolled' : ''}`}>
      <span className="logo">JA</span>
      <button
        className="mode-toggle"
        onClick={onModeChange}
        aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
      >
        <FontAwesomeIcon icon={mode === 'dark' ? faSun : faMoon} />
      </button>
    </header>
  );
}

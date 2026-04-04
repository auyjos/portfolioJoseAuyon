import { useState, useEffect } from 'react';
import ScrollProvider from './components/layout/ScrollProvider';
import Navigation from './components/layout/Navigation';
import DotNav from './components/layout/DotNav';
import Hero from './components/sections/Hero';
import Expertise from './components/sections/Expertise';
import Timeline from './components/sections/Timeline';
import Projects from './components/sections/Projects';
import Certificates from './components/sections/Certificates';
import Footer from './components/layout/Footer';
import './assets/styles/index.scss';

function App() {
  const [mode, setMode] = useState<string>(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const handleModeChange = () => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <ScrollProvider>
      <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <Navigation mode={mode} onModeChange={handleModeChange} />
        <DotNav />
        <main>
          <Hero />
          <Expertise />
          <Timeline />
          <Projects />
          <Certificates />
        </main>
        <Footer />
      </div>
    </ScrollProvider>
  );
}

export default App;

import { useState } from 'react';
import ScrollProvider from './components/layout/ScrollProvider';
import Navigation from './components/layout/Navigation';
import DotNav from './components/layout/DotNav';
import Hero from './components/sections/Hero';
import Expertise from './components/sections/Expertise';
import './assets/styles/index.scss';

function App() {
  const [mode, setMode] = useState<string>('dark');

  const handleModeChange = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ScrollProvider>
      <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <Navigation mode={mode} onModeChange={handleModeChange} />
        <DotNav />
        <main>
          <Hero />
          <Expertise />
          <section id="history" className="placeholder-section">
            <h2>Timeline Placeholder</h2>
          </section>
          <section id="projects" className="placeholder-section">
            <h2>Projects Placeholder</h2>
          </section>
          <section id="credentials" className="placeholder-section">
            <h2>Credentials Placeholder</h2>
          </section>
        </main>
      </div>
    </ScrollProvider>
  );
}

export default App;

import { useState } from 'react';
import ScrollProvider from './components/layout/ScrollProvider';
import Navigation from './components/layout/Navigation';
import DotNav from './components/layout/DotNav';
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
          <section id="hero" className="placeholder-section">
            <h1>Hero Placeholder</h1>
          </section>
          <section id="expertise" className="placeholder-section">
            <h2>Expertise Placeholder</h2>
          </section>
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

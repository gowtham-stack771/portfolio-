import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutMe from './components/AboutMe';
import SkillsGraph from './components/SkillsGraph';
import Projects from './components/Projects';
import Education from './components/Education';
import Resume from './components/Resume';
import Contact from './components/Contact';
import { ArrowUp, Code2, Heart } from 'lucide-react';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isFullscreenResume, setIsFullscreenResume] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsFullscreenResume(window.location.search.includes('view=resume'));
    }
  }, []);

  // Scroll to top button visibility trigger
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (isFullscreenResume) {
    return (
      <div className="relative min-h-screen bg-[#0a0a09] font-sans antialiased text-gray-300" id="portfolio-app-root">
        <Resume />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] font-sans antialiased text-gray-300 overflow-x-hidden selection:bg-[#c5a47e]/20 selection:text-white" id="portfolio-app-root">
      {/* Absolute top global lighting halos */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[#c5a47e]/3 cosmic-glow select-none pointer-events-none" />

      {/* Sticky Top Header Navigation */}
      <Navbar />

      {/* Main Single Page Sections */}
      <main className="relative z-10" id="portfolio-main-content">
        <Home />
        <AboutMe />
        <SkillsGraph />
        <Projects />
        <Education />
        <Resume />
        <Contact />
      </main>

      {/* Footer sign-off panel */}
      <footer className="relative bg-[#0a0a0a] border-t border-[#1a1a1a] py-16 px-6 print:hidden" id="main-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6" id="footer-inner">
          {/* Logo brand brandings */}
          <div className="flex items-center gap-3" id="footer-branding">
            <div className="w-8 h-8 border border-[#c5a47e] flex items-center justify-center text-[#c5a47e] font-serif font-semibold text-xs">
              GK
            </div>
            <span className="font-serif text-sm tracking-widest text-[#c5a47e] uppercase">
              Gowtham K
            </span>
          </div>

          {/* Copyright signatures */}
          <p className="text-[11px] text-gray-500 flex flex-wrap items-center justify-center gap-1.5 font-sans tracking-wide text-center md:text-left" id="footer-copyright">
            © {new Date().getFullYear()} Gowtham K. Handcrafted with care using React, Tailwind CSS, & Motion.
          </p>

          {/* Typography label */}
          <div className="text-[9px] font-mono uppercase text-gray-500 tracking-[0.2em] flex items-center gap-1.5" id="footer-status-badge">
            <span className="inline-block w-1 h-1 bg-[#c5a47e]"></span>
            Sophisticated Dark Theme
          </div>
        </div>
      </footer>

      {/* Back to Top floating widget */}
      <div className="fixed bottom-6 right-6 z-40 print:hidden" id="scrollTop-outer">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-3 bg-[#111111] hover:bg-[#1a1a1a] text-[#c5a47e] shadow-xl hover:-translate-y-0.5 transition-all border border-[#c5a47e]/30 cursor-pointer"
            aria-label="Back to top"
            id="back-to-top-btn"
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        )}
      </div>
    </div>
  );
}

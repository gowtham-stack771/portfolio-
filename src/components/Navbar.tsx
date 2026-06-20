import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Github, Linkedin, Briefcase } from 'lucide-react';
import { personalInfo } from '../data';

interface NavbarProps {
  navItems?: { id: string; label: string }[];
}

export default function Navbar({
  navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About me' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ],
}: NavbarProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for highlights & shadow trigger
  useEffect(() => {
    const handleScroll = () => {
      // 1. Shadow background on scroll
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Active Section detection
      const scrollPosition = window.scrollY + 120; // offset for nav bar
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80; // height of fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#262626] shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between" id="nav-inner">
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-2.5 group cursor-pointer text-left"
          id="nav-logo-btn"
        >
          <div className="w-10 h-10 border border-[#c5a47e] flex items-center justify-center text-[#c5a47e] font-serif font-bold text-base transition-transform group-hover:bg-[#c5a47e]/10">
            GK
          </div>
          <div className="flex flex-col select-none hidden sm:flex">
            <span className="font-serif text-lg tracking-tight text-[#c5a47e] font-medium leading-none mb-0.5">
              Gowtham K
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-mono leading-none">
              Portfolio
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-2 bg-[#111111] p-1 border border-[#1a1a1a]" id="desktop-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-4 py-2 text-[10px] font-medium tracking-[0.18em] uppercase transition-colors duration-300 cursor-pointer ${
                activeSection === item.id ? 'text-[#c5a47e]' : 'text-gray-400 hover:text-white'
              }`}
              id={`nav-item-${item.id}`}
            >
              <span className="relative z-10">{item.label}</span>
              {activeSection === item.id && (
                <motion.span
                  layoutId="active-nav-glow"
                  className="absolute inset-0 bg-[#c5a47e]/10 border border-[#c5a47e]/30"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Action Connect Button */}
        <div className="hidden lg:flex items-center gap-5" id="nav-actions">
          <a
            href={personalInfo.github}
            target="_blank"
            referrerPolicy="no-referrer"
            className="text-gray-400 hover:text-[#c5a47e] transition-colors"
            id="nav-gh"
          >
            <Github className="w-4.5 h-4.5" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            referrerPolicy="no-referrer"
            className="text-gray-400 hover:text-[#c5a47e] transition-colors"
            id="nav-li"
          >
            <Linkedin className="w-4.5 h-4.5" />
          </a>
          <button
            onClick={() => scrollToSection('contact')}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#c5a47e] text-[#0a0a0a] text-[10px] font-bold uppercase tracking-[0.16em] hover:bg-[#d6b694] transition-all text-nowrap cursor-pointer"
            id="nav-connect-btn"
          >
            LET'S TALK
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Mobile menu triggers */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-400 hover:text-white bg-[#111111] border border-[#1a1a1a]"
          id="mobile-menu-trigger"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer (AnimatePresence) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-[#0a0a0a] border-b border-[#262626]"
            id="mobile-drawer"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full py-2 text-left font-serif font-medium text-lg border-b border-[#111111] transition-colors ${
                    activeSection === item.id ? 'text-[#c5a47e]' : 'text-gray-400 hover:text-white'
                  }`}
                  id={`nav-mobile-item-${item.id}`}
                >
                  {item.label}
                </button>
              ))}

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#1a1a1a]" id="mobile-drawer-footer">
                <div className="flex gap-4">
                  <a href={personalInfo.github} target="_blank" referrerPolicy="no-referrer" className="text-gray-400">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={personalInfo.linkedin} target="_blank" referrerPolicy="no-referrer" className="text-gray-400">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-5 py-2.5 bg-[#c5a47e] text-[#0a0a0a] text-[11px] font-bold uppercase tracking-[0.15em]"
                  id="mobile-drawer-btn"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

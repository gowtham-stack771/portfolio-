import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { personalInfo } from '../data';
import { ArrowRight, Sparkles, Award, Compass, Star, Clock, Laptop, Database, Cpu } from 'lucide-react';

interface HomeProps {
  onExploreProjects?: () => void;
  onContactMe?: () => void;
}

export default function Home({
  onExploreProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  },
  onContactMe = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}: HomeProps) {
  const [timeStr, setTimeStr] = useState('');

  // Live clock updating each second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Visual background layers */}
      <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-[#c5a47e]/5 via-transparent to-transparent opacity-60 pointer-events-none" />
      <div className="absolute top-[30%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#c5a47e]/3 cosmic-glow" />
      <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-[#d6b694]/2 cosmic-glow" />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(197,164,126,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(197,164,126,0.03)_1px,transparent_1px)] bg-[size:5rem_5rem]" 
        id="home-grid-pattern"
      />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center" id="home-inner">
        {/* Intro Text Frame */}
        <div className="lg:col-span-7 space-y-8" id="home-text-side">
          {/* Badge indicator */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#111111] border border-[#262626] text-[#c5a47e] font-mono text-[9px] tracking-[0.2em] uppercase"
            id="intro-badge"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c5a47e] animate-pulse" />
            AVAILABLE FOR DEVELOPER ROLES
          </motion.div>

          {/* Core Introduction Headlines */}
          <div className="space-y-5" id="intro-headlines">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-6xl md:text-7xl xl:text-8xl font-serif text-white tracking-tight leading-[1.05]"
              id="intro-fullname"
            >
              Discover <span className="italic text-[#c5a47e] font-normal font-serif">refined</span> <br />
              {personalInfo.fullName}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-xs md:text-sm font-mono tracking-[0.25em] text-[#c5a47e] uppercase font-semibold"
              id="intro-title"
            >
              // {personalInfo.shortTitle}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl font-sans font-light"
              id="intro-description"
            >
              {personalInfo.tagline}
            </motion.p>
          </div>

          {/* Quick Meta Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap items-center gap-6 text-[11px] text-gray-500 font-mono tracking-wider py-1 border-t border-b border-[#111111] max-w-lg"
            id="intro-meta-group"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#c5a47e]/60" />
              LOCATION: {personalInfo.location.toUpperCase()}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#c5a47e]/60" />
              EMAIL: {personalInfo.email.toUpperCase()}
            </span>
          </motion.div>

          {/* Dynamic Interactive Call-To-Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-wrap gap-4 pt-2"
            id="intro-actions"
          >
            <button
              onClick={onExploreProjects}
              className="px-7 py-4 bg-[#c5a47e] text-[#0a0a0a] text-xs font-bold uppercase tracking-[0.16em] flex items-center gap-2 hover:bg-[#d6b694] transition-all cursor-pointer group"
              id="cta-projects"
            >
              VIEW PROJECTS
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
            </button>
            <button
              onClick={onContactMe}
              className="px-7 py-4 bg-transparent border border-[#262626] text-gray-300 text-xs font-bold uppercase tracking-[0.16em] flex items-center gap-2 hover:bg-[#111111] hover:border-[#c5a47e]/40 transition-all cursor-pointer"
              id="cta-contact"
            >
              GET IN TOUCH
            </button>
          </motion.div>
        </div>

        {/* Right Side Decorative Gallery Artpiece Frame */}
        <div className="lg:col-span-5 flex justify-center" id="home-graphics-side">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative w-full max-w-[380px]"
            id="tech-frame-container"
          >
            {/* Elegant double border frame matching Julian's template art cards */}
            <div className="relative border border-[#262626] p-8 bg-[#111111]/85 backdrop-blur-md shadow-2xl" id="fine-art-card">
              {/* Inner accent outline decoration */}
              <div className="absolute inset-2 border border-[#c5a47e]/15 pointer-events-none" />
              
              <div className="flex justify-between items-center mb-8 text-[9px] font-mono tracking-[0.2em] text-gray-500" id="gallery-header">
                <span className="flex items-center gap-1.5 font-bold uppercase text-[#c5a47e]">
                  <Cpu className="w-3.5 h-3.5" />
                  CORE PROFILE
                </span>
                <span className="flex items-center gap-1 text-[#c5a47e]/90 bg-[#c5a47e]/10 px-2.5 py-0.5 rounded-none font-semibold">
                  <Clock className="w-2.5 h-2.5 mr-0.5 animate-pulse" />
                  {timeStr || '00:00:00'}
                </span>
              </div>

              {/* Core Skill Bars inside Card */}
              <div className="space-y-5" id="mini-skill-panel">
                <h3 className="text-xs font-mono uppercase tracking-[0.18em] text-white border-b border-[#262626] pb-2 mb-3 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a47e]" />
                  Core Capabilities
                </h3>

                {/* Python Row */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-gray-300 flex items-center gap-1.5">
                      <Laptop className="w-3.5 h-3.5 text-[#c5a47e]" />
                      Python Language
                    </span>
                    <span className="text-[#c5a47e] font-semibold">80%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#1f1f1f]">
                    <div className="h-full bg-[#c5a47e] transition-all duration-1000" style={{ width: '80%' }} />
                  </div>
                </div>

                {/* MySQL Database Row */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-gray-300 flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-[#c5a47e]" />
                      MySQL Database
                    </span>
                    <span className="text-[#c5a47e] font-semibold">80%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#1f1f1f]">
                    <div className="h-full bg-[#c5a47e] transition-all duration-1000" style={{ width: '80%' }} />
                  </div>
                </div>

                {/* Power BI Row */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-gray-300 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#c5a47e]" />
                      Power BI Analysis
                    </span>
                    <span className="text-[#c5a47e] font-semibold">60%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#1f1f1f]">
                    <div className="h-full bg-slate-500 transition-all duration-1000" style={{ width: '60%' }} />
                  </div>
                </div>
              </div>

              {/* Technical Specifications specs labels list */}
              <div className="mt-8 pt-6 border-t border-[#262626] space-y-2 text-[10px] font-mono text-gray-400" id="tech-window-footer">
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase font-light">focus</span>
                  <span className="text-white font-medium uppercase tracking-wider">Web & Systems</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase font-light">database</span>
                  <span className="text-white font-medium uppercase tracking-wider">SQL Relational</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 uppercase font-light">analysis</span>
                  <span className="text-[#c5a47e] font-semibold uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#c5a47e] animate-ping" />
                    active
                  </span>
                </div>
              </div>
            </div>

            {/* Elegant tags float */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 bg-[#1a1a1a] border border-[#262626] px-3.5 py-2 shadow-xl flex items-center gap-2"
              id="floating-tag-react"
            >
              <Star className="w-3.5 h-3.5 text-[#c5a47e]" />
              <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-white font-semibold">Python</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-[#1a1a1a] border border-[#262626] px-3.5 py-2 shadow-xl flex items-center gap-2"
              id="floating-tag-ts"
            >
              <Award className="w-3.5 h-3.5 text-[#c5a47e]" />
              <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-white font-semibold">Data Science</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

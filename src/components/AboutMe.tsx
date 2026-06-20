import { motion } from 'motion/react';
import { personalInfo } from '../data';
import { User, Award, MapPin, GraduationCap } from 'lucide-react';

export default function AboutMe() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#0c0c0c]">
      <div className="absolute left-[-150px] top-[20%] w-[350px] h-[350px] rounded-full bg-[#c5a47e]/2 cosmic-glow" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" id="about-container">
        {/* Section Header */}
        <div className="mb-20 border-b border-[#1a1a1a] pb-8" id="about-header">
          <div className="flex items-center gap-2 mb-3" id="about-badge">
            <User className="w-4 h-4 text-[#c5a47e]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a47e]">Personal Background</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight" id="about-title">
            About <span className="font-serif italic font-light text-[#c5a47e]">me</span>
          </h2>
        </div>

        {/* Column splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16" id="about-content">
          {/* Text Description Grid */}
          <div className="lg:col-span-7 space-y-6" id="about-introduction-text">
            <h3 className="text-2xl font-serif font-light text-white tracking-tight leading-snug" id="about-intro-title">
              Engineering the modern web, with <span className="italic font-normal text-[#c5a47e]">precision</span> and unmatched detail.
            </h3>
            <div className="space-y-4 text-gray-400 leading-relaxed text-base font-light font-sans" id="about-paragraphs">
              {personalInfo.aboutLong.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Stats Grid Dashboard on right */}
          <div className="lg:col-span-5 flex flex-col justify-center" id="about-stats-side">
            <div className="grid grid-cols-2 gap-4" id="stats-grid">
              {personalInfo.funStats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3, borderColor: '#c5a47e' }}
                  className="p-6 bg-[#111111] border border-[#1a1a1a] flex flex-col justify-between min-h-[140px] shadow-xl transition-all duration-300"
                  id={`stat-card-${i}`}
                >
                  <div className="text-gray-500 font-mono text-[9px] tracking-[0.18em] uppercase flex items-center justify-between" id={`stat-label-row-${i}`}>
                    {stat.label}
                    {stat.label.toLowerCase() === 'location' ? (
                      <MapPin className="w-3.5 h-3.5 text-[#c5a47e]" />
                    ) : stat.label.toLowerCase() === 'education' ? (
                      <GraduationCap className="w-3.5 h-3.5 text-[#c5a47e]" />
                    ) : (
                      <Award className="w-3.5 h-3.5 text-[#c5a47e]/40" />
                    )}
                  </div>
                  <div className="mt-4" id={`stat-value-row-${i}`}>
                    <span className={`font-serif tracking-normal leading-tight ${
                      stat.value === 'B.E CSE' || stat.value === 'B.E. CSE'
                        ? 'text-4xl md:text-[2.5rem] font-semibold text-[#c5a47e]'
                        : stat.value.length > 8
                        ? 'text-[15px] sm:text-[17px] tracking-wide text-white font-light'
                        : 'text-3xl md:text-4xl text-white font-light'
                    }`}>
                      {stat.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

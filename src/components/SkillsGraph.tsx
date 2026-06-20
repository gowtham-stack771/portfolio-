import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Skill } from '../types';
import { skillsData } from '../data';
import { Award, Zap, Code2, Cpu, Sparkles, SlidersHorizontal, BarChart3, Activity } from 'lucide-react';

interface SkillsGraphProps {
  skills?: Skill[];
}

export default function SkillsGraph({ skills = skillsData }: SkillsGraphProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Frontend' | 'Backend' | 'Tools & Cloud' | 'UI/UX & Soft Skills'>('All');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(skillsData[0]);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getProficiencyText = (level: number) => {
    if (level >= 95) return 'Expert Mastery';
    if (level >= 85) return 'Advanced Level';
    if (level >= 75) return 'Highly Capable';
    return 'Intermediate Competence';
  };

  // Filter skills by category
  const filteredSkills = skills.filter(
    (skill) => selectedCategory === 'All' || skill.category === selectedCategory
  );

  // Radar points computation (6 key dimensions)
  const radarDimensions = [
    { label: 'Python', value: 80, key: 'Python' },
    { label: 'MySQL', value: 80, key: 'MySQL' },
    { label: 'HTML & CSS', value: 82, key: 'HTML & CSS' },
    { label: 'Data Visualization', value: 75, key: 'Data Visualization' },
    { label: 'Power BI', value: 60, key: 'Power BI' },
    { label: 'Data Analysis', value: 80, key: 'Data Analysis' },
  ];

  const center = 160;
  const radius = 110;
  const totalAxes = radarDimensions.length;

  const getCoordinates = (index: number, value: number) => {
    const angle = (index * 2 * Math.PI) / totalAxes - Math.PI / 2;
    const distance = (value / 100) * radius;
    const x = center + distance * Math.cos(angle);
    const y = center + distance * Math.sin(angle);
    return { x, y };
  };

  // Generate background polygon webs
  const gridLevels = [20, 40, 60, 80, 100];
  const gridPoints = gridLevels.map((level) => {
    return Array.from({ length: totalAxes }).map((_, i) => getCoordinates(i, level));
  });

  // User's core dataset polygon coordinates
  const dataPoints = radarDimensions.map((dim, i) => {
    const matchedSkill = skills.find(s => s.name === dim.key) || { level: dim.value };
    return getCoordinates(i, matchedSkill.level);
  });

  const pathDefinition = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend':
        return <Code2 className="w-4 h-4 text-[#c5a47e]" id="icon-frontend" />;
      case 'Backend':
        return <Cpu className="w-4 h-4 text-[#c5a47e]" id="icon-backend" />;
      case 'Tools & Cloud':
        return <Zap className="w-4 h-4 text-[#c5a47e]" id="icon-tools" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#c5a47e]" id="icon-uiux" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#0a0a0a]">
      {/* Background visual graphics */}
      <div className="absolute right-0 top-1/4 w-[350px] h-[350px] rounded-full bg-[#c5a47e]/2 cosmic-glow" />
      <div className="absolute left-10 bottom-10 w-[280px] h-[280px] rounded-full bg-[#d6b694]/2 cosmic-glow" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" id="skills-container">
        {/* Title & Stats Grid in header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#1a1a1a] pb-8" id="skills-header">
          <div>
            <div className="flex items-center gap-2 mb-3" id="skills-badge">
              <Activity className="w-4 h-4 text-[#c5a47e] animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a47e]">Technical Arsenal</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight" id="skills-title">
              Skills & <span className="font-serif italic font-light text-[#c5a47e]">expertise</span>
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl text-base font-light" id="skills-subtitle">
              A comprehensive view of my tech stack and capability matrices, illustrated in dynamic radar vectors and responsive linear charts.
            </p>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2 mb-10 pb-6" id="skills-category-filters">
          {(['All', 'Frontend', 'Backend', 'Tools & Cloud', 'UI/UX & Soft Skills'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                const firstSkill = skills.find(s => cat === 'All' || s.category === cat);
                if (firstSkill) setSelectedSkill(firstSkill);
              }}
              className={`px-4 py-2 text-[10px] font-mono tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#c5a47e]/10 border-[#c5a47e] text-[#c5a47e] font-semibold'
                  : 'border-[#1a1a1a] bg-[#111111]/60 text-gray-400 hover:border-[#c5a47e]/40 hover:text-white'
              }`}
              id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fade-in" id="skills-main-grid">
          {/* Card Column 1: Radar Vector Assessment */}
          <div className="lg:col-span-4 bg-[#111111] border border-[#1a1a1a] p-5 md:p-6 flex flex-col items-center justify-between min-h-[440px] relative" id="radar-chart-card">
            <div className="text-center w-full mb-4">
              <h4 className="text-[10px] font-mono tracking-widest uppercase text-[#c5a47e] mb-1 flex items-center justify-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                My Skills
              </h4>
              <p className="text-[9px] text-gray-500 font-mono tracking-wider uppercase">Radar Assessment Map</p>
            </div>

            <div className="relative flex flex-col items-center justify-center w-full" id="radar-chart-wrapper">
              <svg viewBox="0 0 320 320" className="w-full h-auto max-w-[280px] overflow-visible" id="radar-svg">
                <defs>
                  <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#c5a47e" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#c5a47e" stopOpacity="0.0" />
                  </radialGradient>
                </defs>

                {/* Concentric Grid Rings */}
                {gridPoints.map((points, levelIndex) => {
                  const pointsStr = points.map((p) => `${p.x},${p.y}`).join(' ');
                  return (
                    <polygon
                      key={`grid-${levelIndex}`}
                      points={pointsStr}
                      fill="none"
                      stroke="rgba(197, 164, 126, 0.15)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Radial Ray Lines from Center */}
                {Array.from({ length: totalAxes }).map((_, i) => {
                  const outerCoord = getCoordinates(i, 100);
                  return (
                    <line
                      key={`axis-${i}`}
                      x1={center}
                      y1={center}
                      x2={outerCoord.x}
                      y2={outerCoord.y}
                      stroke="rgba(197, 164, 126, 0.12)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Skill Rating Core Area */}
                <motion.path
                  d={pathDefinition}
                  fill="url(#radar-glow)"
                  stroke="#c5a47e"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />

                {/* Axis Labels */}
                {radarDimensions.map((dim, i) => {
                  const labelCoord = getCoordinates(i, 118);
                  let textAnchor = 'middle';
                  if (labelCoord.x > center + 10) textAnchor = 'start';
                  else if (labelCoord.x < center - 10) textAnchor = 'end';

                  return (
                    <text
                      key={`label-${i}`}
                      x={labelCoord.x}
                      y={labelCoord.y + 4}
                      fill="#888888"
                      fontSize="9"
                      fontFamily="var(--font-mono)"
                      textAnchor={textAnchor}
                      className="font-medium tracking-widest uppercase cursor-pointer hover:fill-white transition-colors"
                      onClick={() => {
                        const matchedSkill = skills.find(s => s.name === dim.key);
                        if (matchedSkill) setSelectedSkill(matchedSkill);
                      }}
                    >
                      {dim.label}
                    </text>
                  );
                })}

                {/* Intersecting Dot Handles */}
                {dataPoints.map((p, i) => {
                  const dim = radarDimensions[i];
                  const actualSkill = skills.find(s => s.name === dim.key) || ({ name: dim.key, level: dim.value, category: 'Frontend', description: '' } as Skill);
                  
                  return (
                    <g key={`marker-${i}`} className="cursor-pointer">
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="10"
                        fill="transparent"
                        className="hover:scale-150 transition-transform"
                        onMouseEnter={() => {
                          setHoveredSkill(actualSkill as Skill);
                          setHoveredIndex(i);
                        }}
                        onMouseLeave={() => {
                          setHoveredSkill(null);
                          setHoveredIndex(null);
                        }}
                        onClick={() => setSelectedSkill(actualSkill as Skill)}
                      />
                      <motion.circle
                        cx={p.x}
                        cy={p.y}
                        r="4"
                        fill="#c5a47e"
                        stroke="#0a0a0a"
                        strokeWidth="1.5"
                        className="pointer-events-none"
                        animate={{
                          scale: (hoveredIndex === i || hoveredSkill?.name === actualSkill.name) ? 1.4 : 1,
                          fill: (hoveredIndex === i || hoveredSkill?.name === actualSkill.name) ? '#ffffff' : '#c5a47e'
                        }}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Dynamic Interactive Tooltip */}
              <AnimatePresence>
                {hoveredSkill && hoveredIndex !== null && (
                  <motion.div
                    key="radar-tooltip"
                    initial={{ opacity: 0, y: -4, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.12 }}
                    className="absolute z-30 bg-[#0a0a0a] border border-[#c5a47e]/30 px-3 py-2.5 text-left pointer-events-none w-52 shadow-2xl"
                    style={{
                      left: `${(dataPoints[hoveredIndex].x / 320) * 100}%`,
                      top: `${(dataPoints[hoveredIndex].y / 320) * 100}%`,
                      transform: 'translate(-50%, -108%)',
                    }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[8px] font-mono tracking-widest uppercase text-[#c5a47e] font-semibold">
                        {getProficiencyText(hoveredSkill.level)}
                      </span>
                      <span className="text-[9px] font-mono text-gray-400">{hoveredSkill.level}%</span>
                    </div>
                    <h4 className="font-serif text-white text-[11px] mb-1 font-bold tracking-tight">{hoveredSkill.name}</h4>
                    <p className="text-gray-400 text-[10px] font-light leading-normal">{hoveredSkill.description}</p>
                    <div className="absolute left-1/2 bottom-0 w-1.5 h-1.5 bg-[#0a0a0a] border-r border-b border-[#c5a47e]/30 translate-x-[-50%] translate-y-[50%] rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="text-[9px] text-gray-500 font-mono mt-4 flex items-center gap-1.5 tracking-wide uppercase text-center" id="radar-helper">
              <Activity className="w-3.5 h-3.5 text-[#c5a47e]" />
              Hover nodes to assess strengths
            </p>
          </div>

          {/* Card Column 2: Linear Level Bars */}
          <div className="lg:col-span-4 bg-[#111111] border border-[#1a1a1a] p-5 md:p-6 flex flex-col justify-start min-h-[440px]" id="level-bars-card">
            <div className="w-full mb-5">
              <h4 className="text-[10px] font-mono tracking-widest uppercase text-[#c5a47e] mb-1 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5" />
                Capabilities & Scale
              </h4>
              <p className="text-[9px] text-gray-500 font-mono tracking-wider uppercase">Linear Proficiency Matrix</p>
            </div>

            <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1 scrollbar-none flex-1" id="bars-chart-wrapper">
              {filteredSkills.map((skill, index) => {
                const isHovered = hoveredSkill?.name === skill.name;
                const isSelected = selectedSkill?.name === skill.name;

                return (
                  <div
                    key={skill.name}
                    className={`p-3 border transition-all duration-300 relative overflow-hidden cursor-pointer ${
                      isSelected
                        ? 'bg-[#181818] border-[#c5a47e]/40'
                        : 'border-[#1a1a1a] hover:bg-[#151515] hover:border-[#333333]'
                    }`}
                    onClick={() => setSelectedSkill(skill)}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    id={`bar-container-${index}`}
                  >
                    <div className="flex justify-between items-center mb-1.5" id={`bar-header-${index}`}>
                      <div className="flex items-center gap-2" id={`bar-label-group-${index}`}>
                        {getCategoryIcon(skill.category)}
                        <span className="font-sans text-[11px] uppercase tracking-wider text-gray-200">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-[#c5a47e] bg-[#c5a47e]/5 px-1.5 py-0.5 border border-[#c5a47e]/15">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="w-full bg-[#0a0a0a] h-1 border border-[#1a1a1a] overflow-hidden mb-1">
                      <motion.div
                        className="h-full bg-[#c5a47e]"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: index * 0.05, ease: 'easeOut' }}
                      />
                    </div>

                    {/* Interactive inline details revealed on Hover */}
                    <AnimatePresence initial={false}>
                      {isHovered && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          className="overflow-hidden mt-1.5 pt-1.5 border-t border-[#1a1a1a]"
                        >
                          <p className="text-[8px] font-mono tracking-widest uppercase text-[#c5a47e] mb-0.5">
                            {getProficiencyText(skill.level)} &bull; Strength
                          </p>
                          <p className="text-[10px] text-gray-400 font-light leading-normal">
                            {skill.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Detailed Sidebar Block */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full min-h-[440px]" id="skills-sidebar">
            <AnimatePresence mode="wait">
              {selectedSkill ? (
                <motion.div
                  key={selectedSkill.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 md:p-8 bg-[#111111] border border-[#1a1a1a] shadow-xl flex-1 flex flex-col justify-between h-full"
                  id="skill-details-card"
                >
                  <div id="skill-details-top">
                    {/* Category Label */}
                    <div className="flex items-center gap-3.5 mb-6" id="detail-category-badge">
                      <span className="p-2.5 bg-[#1a1a1a] border border-[#262626]">
                        {getCategoryIcon(selectedSkill.category)}
                      </span>
                      <div>
                        <span className="text-[9px] font-mono tracking-[0.25em] text-gray-500 block uppercase">Category</span>
                        <span className="text-xs font-mono uppercase tracking-widest text-[#c5a47e]">{selectedSkill.category}</span>
                      </div>
                    </div>

                    {/* Skill Title & Level */}
                    <div className="flex items-baseline justify-between gap-4 mb-5 border-b border-[#1a1a1a] pb-5" id="detail-title-row">
                      <h3 className="text-xl font-serif text-white">{selectedSkill.name}</h3>
                      <div className="flex flex-col items-end" id="detail-level-block">
                        <span className="text-2xl font-serif text-[#c5a47e]">{selectedSkill.level}%</span>
                        <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">PROFICIENCY</span>
                      </div>
                    </div>

                    {/* Skill Breakdown Description */}
                    <div className="space-y-5" id="detail-description">
                      <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light">
                        {selectedSkill.description}
                      </p>
                      
                      <div className="bg-[#0a0a0a] p-4.5 border border-[#1a1a1a]" id="detail-breakdown">
                        <h4 className="text-[10px] font-mono tracking-widest uppercase text-[#c5a47e] mb-3.5 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5" />
                          Experience Assessment
                        </h4>
                        <ul className="text-xs text-gray-400 space-y-2.5 font-light" id="detail-breakdown-bullets">
                          <li className="flex items-start gap-1">
                            <span className="text-[#c5a47e] mr-2">✓</span> Completed multiple production integrations
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="text-[#c5a47e] mr-2">✓</span> Core code coverage verified under tests
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="text-[#c5a47e] mr-2">✓</span> Actively tracking the latest spec changes
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>


                </motion.div>
              ) : (
                <div className="p-8 bg-[#111111]/40 border border-dashed border-[#1a1a1a] flex flex-col justify-center items-center text-center flex-1 h-full" id="skill-no-selection">
                  <SlidersHorizontal className="w-6 h-6 text-gray-600 mb-3" />
                  <p className="text-gray-400 text-xs font-mono tracking-wider uppercase">Select a node from active matrices to inspect metrics</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

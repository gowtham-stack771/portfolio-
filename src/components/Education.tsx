import { educationHistory } from '../data';
import { GraduationCap, Award, BookOpen, Calendar } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden bg-[#0a0a0a] border-t border-[#1a1a1a]">
      {/* Accent glow lights */}
      <div className="absolute left-[-120px] top-[40%] w-[250px] h-[250px] rounded-full bg-[#c5a47e]/2 cosmic-glow" />

      <div className="max-w-6xl mx-auto px-6 relative z-10" id="education-container">
        {/* Header Title segment */}
        <div className="mb-16 text-left" id="education-header">
          <div className="inline-flex items-center gap-2 mb-3" id="education-badge">
            <GraduationCap className="w-4 h-4 text-[#c5a47e]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a47e]">Academic Background</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight" id="education-title">
            Education & <span className="font-serif italic font-light text-[#c5a47e]">credentials</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl text-base font-light" id="education-subtitle">
            Formal training and specialized certifications in software engineering and systems design.
          </p>
        </div>

        {/* Timeline Path Structure */}
        <div className="relative border-l border-[#1a1a1a] ml-4 md:ml-12 pl-6 md:pl-10 space-y-12" id="education-timeline">
          {educationHistory.map((item, index) => (
            <div key={item.id} className="relative group" id={`edu-block-${index}`}>
              {/* Vertical node circle */}
              <div 
                className="absolute -left-[31px] md:-left-[45px] top-1.5 w-3 h-3 bg-[#0a0a0a] border-2 border-[#c5a47e] group-hover:bg-[#c5a47e] transition-colors duration-300 ring-4 ring-[#0a0a0a]" 
                id={`edu-node-${index}`}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id={`edu-grid-${index}`}>
                {/* Meta details (Dates, GPA, etc.) */}
                <div className="lg:col-span-4 space-y-2 lg:text-right lg:pr-6" id={`edu-meta-${index}`}>
                  <div className="inline-flex items-center gap-1.5 text-[9px] font-mono text-[#c5a47e] bg-[#c5a47e]/5 border border-[#c5a47e]/20 px-3 py-1 uppercase tracking-widest" id={`edu-date-${index}`}>
                    <Calendar className="w-3.5 h-3.5" />
                    {item.period}
                  </div>
                  {item.gpa && (
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider" id={`edu-gpa-${index}`}>
                      {item.id === 'edu-1' ? 'CGPA: ' : 'Percentage: '}<span className="text-gray-300 font-semibold">{item.gpa}</span>
                    </p>
                  )}
                </div>

                {/* Main details card on right panel */}
                <div 
                  className="lg:col-span-8 p-6 bg-[#111111] border border-[#1a1a1a] hover:border-[#c5a47e]/30 transition-all duration-300 shadow-xl" 
                  id={`edu-card-${index}`}
                >
                  <h3 className="text-xl font-serif text-white group-hover:text-[#c5a47e] transition-colors" id={`edu-degree-${index}`}>
                    {item.degree}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#c5a47e] font-mono uppercase tracking-wider mt-1.5" id={`edu-institution-row-${index}`}>
                    <BookOpen className="w-3.5 h-3.5" />
                    {item.institution}
                  </div>

                  <p className="mt-4 text-gray-400 text-xs md:text-sm leading-relaxed font-light" id={`edu-description-${index}`}>
                    {item.description}
                  </p>

                  {/* Achievements section */}
                  {item.achievements && item.achievements.length > 0 && (
                    <div className="mt-6 pt-5 border-t border-[#1a1a1a] space-y-3.5" id={`edu-achievements-block-${index}`}>
                      <h4 className="text-[10px] font-mono tracking-widest uppercase text-gray-400 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#c5a47e]" />
                        Achievements & Landmarks
                      </h4>
                      <ul className="space-y-2" id={`edu-achievements-list-${index}`}>
                        {item.achievements.map((ach, idx) => (
                           <li key={idx} className="text-gray-400 text-xs flex items-start gap-2 font-light">
                             <span className="text-[#c5a47e] font-semibold">•</span>
                             <span>{ach}</span>
                           </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { personalInfo, educationHistory, projectsData } from '../data';
import { Download, Printer, CheckCircle2, Eye, Link } from 'lucide-react';

export default function Resume() {
  const [downloading, setDownloading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  const isExternalFullscreen = typeof window !== 'undefined' && window.location.search.includes('view=resume');

  // Triggers professional high-fidelity browser PDF generation optimized for CV size
  const handleDownloadPDF = () => {
    setDownloading(true);
    setShowToast(true);
    setTimeout(() => {
      window.print();
      setDownloading(false);
      setTimeout(() => setShowToast(false), 4000);
    }, 1200);
  };

  return (
    <section id="resume" className="py-24 relative bg-[#0a0a0a] border-t border-[#1a1a1a] print:bg-white print:text-black print:p-0 print:py-0">
      {/* Background accents */}
      <div className="absolute right-0 bottom-0 w-[500px] h-[300px] bg-[#c5a47e]/2 select-none pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" id="resume-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 print:hidden" id="resume-header">
          <div>
            <div className="flex items-center gap-2 mb-3" id="resume-badge">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a47e]">Certified Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight" id="resume-title">
              Resume
            </h2>
            <p className="mt-4 text-gray-400 max-w-xl text-base font-light font-sans" id="resume-subtitle">
              Professional credential dossier including verified achievements, academic milestones, and core database/programming competencies.
            </p>
          </div>

          {/* Action Download / Print Buttons */}
          <div className="flex flex-wrap gap-2.5" id="resume-action-buttons">
            <a
              href="?view=resume"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-3 border border-[#1a1a1a] bg-[#111111] text-[10px] font-mono uppercase tracking-widest text-[#c5a47e] hover:text-white hover:border-[#c5a47e]/40 transition cursor-pointer font-semibold"
              id="print-resume-btn"
            >
              <Eye className="w-3.5 h-3.5" />
              View Fullscreen
            </a>
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="flex items-center gap-2 px-5 py-3 bg-[#c5a47e] hover:bg-[#d6b694] text-[#0a0a0a] text-[10px] font-mono font-bold uppercase tracking-widest transition cursor-pointer"
              id="download-resume-btn"
            >
              <Download className={`w-3.5 h-3.5 ${downloading ? 'animate-bounce' : ''}`} />
              {downloading ? 'Preparing PDF...' : 'Download Resume.pdf'}
            </button>
          </div>
        </div>

        {/* Dynamic Summary Cards for On-Screen view */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:hidden mb-12" id="resume-dashboard-cards">
          {/* Education Box */}
          <div className="p-8 bg-[#111111] border border-[#1a1a1a] relative hover:border-[#c5a47e]/30 transition" id="web-resume-edu-card">
            <span className="text-[10px] font-mono text-[#c5a47e] uppercase tracking-wider block mb-2">Education Checkpoint</span>
            <h3 className="text-xl font-serif text-white mb-1">{educationHistory[0].degree}</h3>
            <p className="text-sm text-gray-400 font-sans block mb-3">{educationHistory[0].institution}</p>
            <div className="flex justify-between items-center text-xs font-mono text-gray-500 mb-4">
              <span>Timeline: {educationHistory[0].period}</span>
              <span className="text-[#c5a47e] bg-[#c5a47e]/10 px-2 py-0.5">CGPA: {educationHistory[0].gpa}</span>
            </div>
            <ul className="space-y-2 border-t border-[#1a1a1a] pt-4">
              {educationHistory[0].achievements.map((ach, idx) => (
                <li key={idx} className="text-xs text-gray-300 flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[#c5a47e] font-bold select-none">•</span>
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Quick Info & Competency Box */}
          <div className="p-8 bg-[#111111] border border-[#1a1a1a] flex flex-col justify-between hover:border-[#c5a47e]/30 transition" id="web-resume-competencies-card">
            <div>
              <span className="text-[10px] font-mono text-[#c5a47e] uppercase tracking-wider block mb-2">Additional Information</span>
              <h3 className="text-xl font-serif text-white mb-4">Languages & Interpersonal</h3>
              
              <div className="space-y-4 font-sans text-sm text-gray-300">
                <div>
                  <span className="text-[10px] font-mono text-gray-500 block uppercase">Languages</span>
                  <p className="text-white mt-1">Tamil &bull; English</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-500 block uppercase">Hobbies</span>
                  <p className="text-[#c5a47e] mt-1">Learning New Technologies &bull; Coding</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#1a1a1a] mt-6 flex justify-between items-center">
              <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                Open the Fullscreen layout to load and view the printable formatted paper replica document.
              </p>
              <a
                href="?view=resume"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-[#1a1a1a] text-white text-[9px] font-mono uppercase tracking-wider hover:bg-[#c5a47e] hover:text-[#0a0a0a] transition cursor-pointer"
              >
                Expand Workspace
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN REPLICA VIEW WINDOW */}
      {(isFullscreenOpen || isExternalFullscreen) && (
        <div className="fixed inset-0 z-50 bg-[#0a0a09]/95 backdrop-blur-xl overflow-y-auto p-4 md:p-12 flex flex-col justify-start print:relative print:p-0 print:bg-white print:overflow-visible print:inset-auto" id="fullscreen-overlay">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-[#1a1a1a] max-w-4xl w-full mx-auto gap-4 print:hidden" id="fullscreen-actions">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a47e]">Interactive Portfolio</span>
              <h3 className="text-lg font-serif text-white">{personalInfo.fullName} &bull; Document Preview</h3>
            </div>
            
            <div className="flex gap-2.5">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-[#c5a47e] hover:bg-[#d6b694] text-[#0a0a0a] text-[10px] font-mono tracking-widest font-bold uppercase transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save PDF
              </button>
              {isExternalFullscreen ? (
                <a
                  href="."
                  className="flex items-center gap-2 px-4 py-2 border border-[#222222] bg-[#111111] hover:bg-[#1a1a1a] text-[10px] font-mono text-gray-400 hover:text-white transition cursor-pointer"
                >
                  Back to Portfolio
                </a>
              ) : (
                <button
                  onClick={() => setIsFullscreenOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 border border-[#222222] bg-[#111111] hover:bg-[#1a1a1a] text-[10px] font-mono text-gray-400 hover:text-white transition cursor-pointer"
                >
                  Close Preview [Esc]
                </button>
              )}
            </div>
          </div>

          {/* Minimalist realistic document paper styled sheet */}
          <div className="bg-white text-black max-w-4xl w-full mx-auto p-8 md:p-12 shadow-2xl relative border border-gray-300 rounded-none mb-12 print:border-none print:shadow-none print:p-0 print:m-0" id="fullscreen-resume-sheet">
            
            {/* Paper Header (Matching Gowtham K's printed structure exactly) */}
            <div className="flex flex-col md:flex-row md:items-start justify-between pb-4 gap-4">
              <div>
                <h1 className="text-4xl font-sans font-bold text-gray-900 tracking-tight leading-none">{personalInfo.fullName}</h1>
              </div>
              <div className="text-right flex flex-col items-end text-[12px] font-sans text-gray-800 space-y-0.5 leading-tight">
                <span>{personalInfo.phone} | <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a> |</span>
                <span className="text-blue-700 underline text-[11px] block mt-0.5">
                  <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">{personalInfo.linkedin}</a>
                </span>
              </div>
            </div>

            {/* Thick Header Separation Bar */}
            <div className="border-b-[4px] border-gray-400 mb-6" />

            {/* OBJECTIVE */}
            <div className="mb-6">
              <h2 className="text-sm font-sans font-bold text-gray-900 uppercase tracking-wider mb-2">OBJECTIVE</h2>
              <div className="border-t-[1.5px] border-gray-350 pt-2 text-xs md:text-[13px] text-gray-800 leading-relaxed font-sans font-normal">
                {personalInfo.aboutLong.split('\n\n')[0]}
              </div>
            </div>

            {/* Thick Separation Bar */}
            <div className="border-b-[4px] border-gray-400 mb-6" />

            {/* PROJECTS */}
            <div className="mb-6">
              <h2 className="text-sm font-sans font-bold text-gray-900 uppercase tracking-wider mb-3">PROJECTS</h2>
              <div className="border-t-[1.5px] border-gray-350 pt-3 space-y-5">
                {projectsData.map((proj) => (
                  <div key={proj.id} className="space-y-1">
                    <h3 className="text-[13px] font-bold text-gray-900 tracking-wide font-sans">{proj.title.toUpperCase()}</h3>
                    
                    <div className="text-xs font-sans text-gray-800">
                      <span className="font-semibold text-gray-900">Technologies</span> - {proj.tags.join(' , ').toUpperCase()}
                    </div>
                    
                    <p className="text-gray-800 text-xs leading-relaxed font-sans mt-1">
                      {proj.description}
                    </p>

                    {proj.id === 'project-1' && (
                      <p className="text-[11px] text-gray-700 font-sans mt-1">
                        Project links: <span className="font-semibold text-gray-900">live link</span>("<a href="http://nextwatch.pythonanywhere.com" target="_blank" rel="noreferrer" className="text-blue-800 underline">nextwatch.pythonanywhere.com</a>")
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Thick Separation Bar */}
            <div className="border-b-[4px] border-gray-400 mb-6" />

            {/* EDUCATION */}
            <div className="mb-6">
              <h2 className="text-sm font-sans font-bold text-gray-900 uppercase tracking-wider mb-3">EDUCATION</h2>
              <div className="border-t-[1.5px] border-gray-350 pt-3 space-y-3">
                {educationHistory.map((edu) => (
                  <div key={edu.id} className="font-sans">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 leading-tight font-bold text-[13px] text-gray-900">
                      <h4>{edu.degree.toUpperCase()}</h4>
                      {edu.gpa && (
                        <span className="text-[12px] font-bold">
                          {edu.id === 'edu-1' ? 'CGPA: ' : 'Percentage: '}{edu.gpa}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-gray-800 block mt-0.5 leading-snug">{edu.institution}</p>
                    <p className="text-xs text-gray-600 block mt-0.5">{edu.period}</p>
                    
                    <ul className="space-y-1 mt-2.5">
                      {edu.achievements.map((ach, idx) => (
                        <li key={idx} className="text-gray-800 text-xs flex items-start gap-2 leading-relaxed">
                          <span className="text-gray-400 select-none font-bold text-base line-height-none mt-[-2px]">&bull;</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Thick Separation Bar */}
            <div className="border-b-[4px] border-gray-400 mb-6" />

            {/* SKILLS */}
            <div className="mb-6">
              <h2 className="text-sm font-sans font-bold text-gray-900 uppercase tracking-wider mb-3">SKILLS</h2>
              <div className="border-t-[1.5px] border-gray-350 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-1.5 font-sans text-xs text-gray-800">
                {/* Simulated exact 2 column output from Gowtham's printed visual layout */}
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 leading-tight">
                    <span className="text-gray-400 font-bold">&bull;</span>
                    <span>Web development (HTML,CSS)</span>
                  </li>
                  <li className="flex items-start gap-2 leading-tight">
                    <span className="text-gray-400 font-bold">&bull;</span>
                    <span>Data visualization</span>
                  </li>
                  <li className="flex items-start gap-2 leading-tight">
                    <span className="text-gray-400 font-bold">&bull;</span>
                    <span>Data Analysis</span>
                  </li>
                </ul>

                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 leading-tight">
                    <span className="text-gray-400 font-bold">&bull;</span>
                    <span>Programming language: python</span>
                  </li>
                  <li className="flex items-start gap-2 leading-tight">
                    <span className="text-gray-400 font-bold">&bull;</span>
                    <span>Tools : vs code , power bi</span>
                  </li>
                  <li className="flex items-start gap-2 leading-tight">
                    <span className="text-gray-400 font-bold">&bull;</span>
                    <span>Database : MySQL</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Thick Separation Bar */}
            <div className="border-b-[4px] border-gray-400 mb-6" />

            {/* ADDITIONAL INFORMATION */}
            <div>
              <h2 className="text-sm font-sans font-bold text-gray-900 uppercase tracking-wider mb-3">ADDITIONAL INFORMATION</h2>
              <div className="border-t-[1.5px] border-gray-350 pt-3 space-y-1.5 font-sans text-xs text-gray-800">
                <div className="flex gap-1.5 leading-snug">
                  <span className="font-semibold text-gray-900 uppercase w-24">Language :</span>
                  <span>TAMIL , ENGLISH</span>
                </div>
                <div className="flex gap-1.5 leading-snug">
                  <span className="font-semibold text-gray-900 uppercase w-24">Hobbies :</span>
                  <span>LEARN NEW TECHNOLOGIES & CODING</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Success notification clip */}
      <div className="fixed bottom-6 right-6 z-50 print:hidden" id="notification-area">
        {showToast && (
          <div className="flex items-center gap-2.5 bg-[#111111] border border-[#c5a47e]/30 text-[#c5a47e] px-5 py-3 rounded-none shadow-2xl animate-fade-in-up" id="download-success-toast">
            <div className="text-[10px] font-mono tracking-wider uppercase">
              <span className="font-bold block text-white mb-0.5">PDF Formatter Triggered!</span>
              Set destination printer as 'Save to PDF'
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

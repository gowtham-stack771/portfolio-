import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { projectsData } from '../data';
import { FolderGit2, Search, ExternalLink, Github, X, Eye, Sparkles } from 'lucide-react';

interface ProjectsProps {
  projects?: Project[];
}

export default function Projects({ projects = projectsData }: ProjectsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter projects based on searchTerm
  const filteredProjects = projects.filter((proj) => {
    const matchesSearch =
      proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  return (
    <section id="projects" className="py-24 relative bg-[#0c0c0c] border-t border-[#1a1a1a]">
      <div className="absolute right-[-100px] bottom-[10%] w-[350px] h-[350px] rounded-full bg-[#c5a47e]/2 cosmic-glow" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" id="projects-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6" id="projects-header">
          <div>
            <div className="flex items-center gap-2 mb-3" id="projects-badge">
              <FolderGit2 className="w-4 h-4 text-[#c5a47e]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a47e]">Selected Works</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight" id="projects-title">
              Featured <span className="font-serif italic font-light text-[#c5a47e]">projects</span>
            </h2>
            <p className="mt-4 text-gray-400 max-w-xl text-base font-light" id="projects-subtitle">
              A curated catalog of software systems, web frontends, and design prototypes built with modern development stacks.
            </p>
          </div>

          {/* Search bar widget */}
          <div className="relative w-full md:w-80" id="projects-search-wrapper">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search technologies or projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111111] border border-[#1a1a1a] pl-11 pr-4 py-3 text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#c5a47e]/50 transition-colors font-mono uppercase tracking-wider"
              id="search-input"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3.5 text-[10px] uppercase font-mono text-gray-500 hover:text-white"
                id="search-clear-btn"
              >
                [Clear]
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="project-cards-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                layout
                key={proj.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-[#111111] border border-[#1a1a1a] hover:border-[#c5a47e]/30 transition-all duration-300 flex flex-col justify-between"
                id={`project-card-${proj.id}`}
              >
                {/* Image panel */}
                <div className="relative aspect-video overflow-hidden bg-[#0c0c0c] border-b border-[#1a1a1a]" id={`project-img-frame-${proj.id}`}>
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />

                  {/* Quick Floating Badge */}
                  {proj.featured && (
                    <span 
                      className="absolute top-3 left-3 px-2.5 py-1 bg-[#0a0a0a] border border-[#c5a47e]/40 text-[8px] font-mono tracking-[0.2em] uppercase text-[#c5a47e]"
                      id={`project-featured-badge-${proj.id}`}
                    >
                      ★ Featured Art
                    </span>
                  )}

                  {/* Category overlay */}
                  <span className="absolute bottom-3 left-3 text-[9px] font-mono tracking-wider uppercase bg-[#111111] text-gray-400 px-2.5 py-1 border border-[#222222]">
                    {proj.category}
                  </span>
                </div>

                {/* Info block */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5" id={`project-body-${proj.id}`}>
                  <div className="space-y-2" id={`project-headers-${proj.id}`}>
                    <h3 className="text-lg font-serif text-white group-hover:text-[#c5a47e] transition-colors leading-tight">
                      {proj.title}
                    </h3>
                    <p className="text-gray-400 text-xs font-light leading-relaxed line-clamp-2">
                      {proj.description}
                    </p>
                  </div>

                  {/* Technologies tags bar */}
                  <div className="pt-4 border-t border-[#1a1a1a] space-y-4 font-mono" id={`project-footer-${proj.id}`}>
                    <div className="flex flex-wrap gap-1.5" id={`project-tags-${proj.id}`}>
                      {proj.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-[#0a0a0a] text-[9px] text-gray-500 border border-[#1a1a1a] tracking-wider uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                      {proj.tags.length > 3 && (
                        <span className="px-2 py-0.5 bg-[#0a0a0a] text-[9px] text-gray-500 border border-[#1a1a1a] tracking-wider uppercase">
                          +{proj.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Navigation details triggers */}
                    <div className="flex items-center justify-between" id={`project-actions-${proj.id}`}>
                      <button
                        onClick={() => setSelectedProject(proj)}
                        className="text-[10px] font-bold tracking-widest uppercase text-[#c5a47e] hover:text-white flex items-center gap-1.5 cursor-pointer"
                        id={`btn-inspect-${proj.id}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Inspect Details
                      </button>

                      <div className="flex items-center gap-4" id={`links-grp-${proj.id}`}>
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="text-gray-500 hover:text-white transition-colors"
                            id={`proj-gh-${proj.id}`}
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="text-gray-500 hover:text-[#c5a47e] transition-colors"
                            id={`proj-live-${proj.id}`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty status check */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center bg-[#111111]/50 border border-dashed border-[#1a1a1a]" id="projects-empty-state">
            <Search className="w-8 h-8 text-gray-600 mx-auto mb-3" />
            <h3 className="text-white font-mono text-xs uppercase tracking-widest">No matching works</h3>
            <p className="text-gray-400 text-xs mt-1">Try searching for other terms or adjusting filters.</p>
          </div>
        )}

        {/* DETAILS POPUP OVERLAY */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setSelectedProject(null)}
              id="project-overlay"
            >
              <motion.div
                initial={{ scale: 0.98, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.98, y: 15 }}
                className="bg-[#111111] border border-[#262626] w-full max-w-2xl overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
                id="modal-box"
              >
                {/* Close Button badge */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-[#0a0a0a]/90 border border-[#262626] text-gray-400 hover:text-white transition-colors cursor-pointer"
                  id="modal-close-btn"
                >
                  <X className="w-4.5 h-4.5" />
                </button>

                {/* Hero Banner header image */}
                <div className="relative h-64 bg-slate-950" id="modal-banner">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
                  <div className="absolute bottom-6 left-6" id="modal-banners-inner">
                    <span className="text-[8px] uppercase tracking-[0.25em] font-mono text-[#c5a47e] bg-[#111111] px-2.5 py-1 border border-[#c5a47e]/20 mb-3.5 inline-block">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-3xl font-serif text-white">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                {/* Body details */}
                <div className="p-6 md:p-8 space-y-6 max-h-[50vh] overflow-y-auto" id="modal-body">
                  <div className="space-y-2 border-b border-[#1a1a1a] pb-5" id="modal-desc-block">
                    <h4 className="text-[9px] uppercase font-mono tracking-[0.25em] text-gray-505 text-gray-500">Overview</h4>
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-light">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Core Features list */}
                  <div className="space-y-3 border-b border-[#1a1a1a] pb-5" id="modal-features-block">
                    <h4 className="text-[9px] uppercase font-mono tracking-[0.25em] text-gray-500 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#c5a47e]" />
                      Key Features
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-400 font-light" id="modal-features-list">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx} className="flex gap-2 items-start" id={`feat-item-${idx}`}>
                          <span className="text-[#c5a47e] font-bold">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech segment specs */}
                  <div className="space-y-3" id="modal-tags-block">
                    <h4 className="text-[9px] uppercase font-mono tracking-[0.25em] text-gray-500">Technologies Integrated</h4>
                    <div className="flex flex-wrap gap-2 animate-fade-in" id="modal-tags-list">
                      {selectedProject.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-[#0a0a0a] text-[10px] font-mono text-[#c5a47e] border border-[#1a1a1a] uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer anchor drawer buttons */}
                <div className="p-6 bg-[#0a0a0a] border-t border-[#1a1a1a] flex flex-wrap items-center justify-between gap-4" id="modal-footer">
                  <span className="text-[9px] font-mono tracking-widest text-gray-600">SOPHISTICATED DEVELOPMENT SERIES</span>
                  <div className="flex gap-3" id="modal-footer-links font-mono">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="px-4 py-2.5 border border-[#1a1a1a] bg-[#111111] text-gray-300 text-[10px] font-mono tracking-wider uppercase hover:border-[#c5a47e]/40 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5 inline mr-1.5" />
                        Code Repo
                      </a>
                    )}
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="px-4 py-2.5 bg-[#c5a47e] text-[#0a0a0a] text-[10px] font-mono font-bold tracking-wider uppercase hover:bg-[#d6b694] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 inline mr-1.5" />
                        Launch Sandbox
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

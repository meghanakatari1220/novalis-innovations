import React, { useState, useMemo } from 'react';
import { ArrowRight, ExternalLink, CheckCircle, Tag, Calendar, Building, X } from 'lucide-react';
import { PROJECTS } from '../data/companyData';
import { Project } from '../types';
import { GlobalSectionHeading, GlobalCard } from './common';
import { Floating3DShapes } from './ui/Floating3DShapes';
import { SectionReveal3D } from './ui/SectionReveal3D';

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  const categories = ['All', 'AI', 'IoT', 'Software', 'Cloud', 'Automation'];

  const filteredProjects = useMemo(() => {
    let list = activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);
    if (!showAll && list.length > 4 && activeCategory === 'All') {
      return list.slice(0, 4);
    }
    return list;
  }, [activeCategory, showAll]);

  return (
    <section
      id="projects"
      className="scroll-mt-20 lg:scroll-mt-24 py-24 bg-[#07111F] relative overflow-hidden border-b border-white/10"
    >
      {/* 3D Wireframe Depth Planes Background */}
      <Floating3DShapes variant="projects" />

      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <SectionReveal3D className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <GlobalSectionHeading
          eyebrow="Featured Deployments & Case Studies"
          title="Projects That Make an Impact"
          subtitle="Explore recent production systems engineered for enterprise reliability, high throughput, and measurable commercial advantage."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase()}`}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowAll(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25'
                    : 'bg-[#0B1020]/75 text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredProjects.map((project) => (
            <GlobalCard
              key={project.id}
              id={`project-card-${project.id}`}
              maxTilt={6}
              depth={18}
              className="overflow-hidden flex flex-col p-0"
            >
              {/* Image Frame with Overlay & Category Badge */}
              <div
                style={{ transformStyle: 'preserve-3d' }}
                className="relative h-56 sm:h-64 overflow-hidden bg-slate-900 border-b border-white/10"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent pointer-events-none" />

                {/* Top Floating Badges with 3D Pop */}
                <div
                  style={{ transform: 'translateZ(20px)' }}
                  className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none"
                >
                  <span className="text-xs font-semibold text-sky-400 bg-[#050816]/90 backdrop-blur-md border border-blue-500/30 px-3 py-1 rounded-full shadow-xs">
                    {project.category}
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/90 backdrop-blur-md border border-emerald-500/30 px-3 py-1 rounded-full shadow-xs">
                    {project.metric}
                  </span>
                </div>

                {/* Client Label at bottom of image with 3D Pop */}
                <div
                  style={{ transform: 'translateZ(14px)' }}
                  className="absolute bottom-3 left-4 text-xs font-medium text-white/90 drop-shadow-md"
                >
                  {project.client}
                </div>
              </div>

              {/* Card Content Area */}
              <div
                style={{ transformStyle: 'preserve-3d', transform: 'translateZ(12px)' }}
                className="p-6 sm:p-7 flex flex-col justify-between flex-1"
              >
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-white mb-2 group-hover:text-sky-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] font-medium text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                  <span className="text-xs font-semibold text-slate-400">
                    Production Case Study
                  </span>
                  <button
                    id={`view-project-${project.id}`}
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </GlobalCard>
          ))}
        </div>

        {/* Load More Button for 'All' category */}
        {activeCategory === 'All' && PROJECTS.length > 4 && (
          <div className="text-center pt-4">
            <button
              id="projects-toggle-all-btn"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B1020]/80 hover:bg-[#0B1020] text-slate-300 hover:text-white font-semibold text-xs border border-white/10 shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <span>{showAll ? 'Show Fewer Projects' : `View All ${PROJECTS.length} Projects`}</span>
              <ArrowRight className={`w-3.5 h-3.5 transition-transform ${showAll ? '-rotate-90' : 'rotate-90'}`} />
            </button>
          </div>
        )}

      </SectionReveal3D>

      {/* Project Detail Modal Dialog */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-[#0B1020] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-white/15 relative max-h-[90vh] overflow-y-auto text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-60 rounded-xl overflow-hidden mb-6 bg-slate-900 border border-white/10">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="text-xs font-semibold text-sky-400 bg-[#050816]/90 backdrop-blur-md border border-blue-500/30 px-3 py-1 rounded-full shadow-xs">
                  {selectedProject.category}
                </span>
              </div>
            </div>

            {/* Title and Client */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <h3 className="text-2xl font-bold font-display text-white">
                {selectedProject.title}
              </h3>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full">
                {selectedProject.metric}
              </span>
            </div>

            <p className="text-xs font-medium text-slate-400 mb-4">
              Client / Deployment: <strong className="text-slate-200">{selectedProject.client}</strong>
            </p>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            {/* Highlights Grid */}
            <div className="mb-6 p-4 rounded-xl bg-[#07111F] border border-white/10">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Key Engineering Deliverables & Outlay
              </h4>
              <ul className="space-y-2.5">
                {selectedProject.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack Tags */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5">
                Technologies & Architecture
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-blue-950/80 border border-blue-500/30 text-xs font-semibold text-sky-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold transition-colors shadow-md shadow-blue-500/25 cursor-pointer"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

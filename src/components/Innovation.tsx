import React, { useState } from 'react';
import { Cpu, Wifi, Code2, Cloud, Sparkles, Bot, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { INNOVATION_DOMAINS } from '../data/companyData';
import { InnovationDomain } from '../types';
import { GlobalSectionHeading, GlobalCard, IconContainer } from './common';
import { Floating3DShapes } from './ui/Floating3DShapes';
import { SectionReveal3D } from './ui/SectionReveal3D';

export const Innovation: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<InnovationDomain | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Wifi':
        return <Wifi className="w-5 h-5" />;
      case 'Code2':
        return <Code2 className="w-5 h-5" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Bot':
        return <Bot className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="innovation"
      className="scroll-mt-20 lg:scroll-mt-24 py-24 bg-[#050816] relative overflow-hidden border-b border-white/10"
    >
      {/* 3D Cybernetic Background Shapes */}
      <Floating3DShapes variant="innovation" />

      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <SectionReveal3D className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <GlobalSectionHeading
          eyebrow="Core Technology Verticals"
          title="Innovation Across Technology"
          subtitle="Explore the core disciplines and engineering verticals we leverage to deliver high-consequence, future-proof enterprise systems."
        />

        {/* 6 Unified Innovation Cards in 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INNOVATION_DOMAINS.map((domain, index) => (
            <GlobalCard
              key={domain.id}
              id={`innovation-card-${domain.id}`}
              maxTilt={7}
              depth={16}
              className="p-7 sm:p-8 flex flex-col justify-between"
            >
              <div>
                {/* Header with Icon and Category Badge */}
                <div className="flex items-center justify-between mb-5">
                  <IconContainer size="md">
                    {getIcon(domain.iconName)}
                  </IconContainer>
                  <span className="text-xs font-semibold text-sky-400 bg-blue-950/80 border border-blue-500/30 px-3 py-1 rounded-full">
                    {domain.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold font-display text-white mb-2 group-hover:text-sky-400 transition-colors">
                  {domain.title}
                </h3>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {domain.shortDesc}
                </p>

                {/* Metric / Stat Pill */}
                <div className="inline-flex items-center gap-1.5 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-lg text-xs font-semibold text-slate-300 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>{domain.stats}</span>
                </div>
              </div>

              {/* Card Footer: Explore Capabilities Link */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  id={`explore-domain-${domain.id}`}
                  onClick={() => setSelectedDomain(domain)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-white transition-colors focus:outline-none cursor-pointer"
                >
                  <span>Explore Capabilities</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-xs text-slate-400 font-mono">0{index + 1}</span>
              </div>
            </GlobalCard>
          ))}
        </div>

      </SectionReveal3D>

      {/* Domain Detail Modal Dialog */}
      {selectedDomain && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedDomain(null)}
        >
          <div
            className="bg-[#0B1020] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-white/15 relative max-h-[90vh] overflow-y-auto text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedDomain(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <IconContainer size="md">
                {getIcon(selectedDomain.iconName)}
              </IconContainer>
              <div>
                <span className="text-xs font-semibold text-sky-400 bg-blue-950/80 border border-blue-500/30 px-3 py-0.5 rounded-full">
                  {selectedDomain.category}
                </span>
                <h3 className="text-2xl font-bold font-display text-white mt-1">
                  {selectedDomain.title}
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {selectedDomain.fullDesc}
            </p>

            <div className="mb-6 p-4 rounded-xl bg-[#07111F] border border-white/10">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Core Engineering Capabilities & Deliverables
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedDomain.capabilities.map((cap, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-400">
                Benchmark: <strong className="text-sky-400">{selectedDomain.stats}</strong>
              </div>
              <button
                onClick={() => setSelectedDomain(null)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold transition-colors shadow-md shadow-blue-500/25 cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

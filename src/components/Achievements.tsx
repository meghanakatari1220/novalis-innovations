import React, { useState, useEffect, useRef } from 'react';
import { Award, Trophy, ShieldCheck, TrendingUp, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { STAT_CARDS, MILESTONES } from '../data/companyData';
import { GlobalSectionHeading, GlobalCard, IconContainer } from './common';

export const Achievements: React.FC = () => {
  const [activeMilestoneYear, setActiveMilestoneYear] = useState<string>(MILESTONES[0].year);
  const [countedMetrics, setCountedMetrics] = useState<{ [key: number]: number }>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const getStatIcon = (index: number) => {
    switch (index) {
      case 0:
        return <TrendingUp className="w-5 h-5" />;
      case 1:
        return <Sparkles className="w-5 h-5" />;
      case 2:
        return <ShieldCheck className="w-5 h-5" />;
      case 3:
        return <Trophy className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          STAT_CARDS.slice(0, 4).forEach((stat, idx) => {
            let start = 0;
            const end = stat.value;
            const duration = 1200;
            const increment = end / (duration / 25);
            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                setCountedMetrics((prev) => ({ ...prev, [idx]: end }));
                clearInterval(timer);
              } else {
                setCountedMetrics((prev) => ({ ...prev, [idx]: Math.floor(start) }));
              }
            }, 25);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const selectedMilestone = MILESTONES.find((m) => m.year === activeMilestoneYear) || MILESTONES[0];

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="scroll-mt-20 lg:scroll-mt-24 py-24 bg-[#050816] relative overflow-hidden border-b border-white/10"
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <GlobalSectionHeading
          eyebrow="Track Record & Accolades"
          title="Milestones and Global Recognition"
          subtitle="Validated by premier industry standards organizations, enterprise benchmarks, and international engineering consortia."
        />

        {/* 4 Unified Achievement Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {STAT_CARDS.slice(0, 4).map((stat, idx) => {
            const displayVal = countedMetrics[idx] !== undefined ? `${countedMetrics[idx]}${stat.suffix}` : `${stat.value}${stat.suffix}`;

            return (
              <GlobalCard
                key={idx}
                id={`achievement-card-${idx}`}
                className="p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <IconContainer size="md">
                      {getStatIcon(idx)}
                    </IconContainer>
                    <span className="text-xs font-semibold text-sky-400 bg-blue-950/80 border border-blue-500/30 px-3 py-1 rounded-full">
                      Verified
                    </span>
                  </div>

                  <div className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight mb-2 group-hover:text-sky-400 transition-colors">
                    {displayVal}
                  </div>

                  <h3 className="text-base font-bold font-display text-white mb-2">
                    {stat.label}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {stat.sublabel}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Industry Benchmark</span>
                  <span className="text-sky-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                  </span>
                </div>
              </GlobalCard>
            );
          })}
        </div>

        {/* Interactive Timeline of Company Journey */}
        <div className="bg-[#07111F]/80 rounded-3xl p-6 sm:p-10 border border-white/10 shadow-xl backdrop-blur-md">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-sky-400 text-xs font-semibold tracking-wider uppercase mb-2">
              Corporate Chronology
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Our Journey of Continuous Innovation
            </h3>
            <p className="mt-2 text-slate-300 text-sm">
              Select a milestone year below to inspect pivotal engineering breakthroughs and expansion benchmarks.
            </p>
          </div>

          {/* Timeline Year Selectors */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {MILESTONES.map((milestone) => {
              const isSelected = milestone.year === activeMilestoneYear;
              return (
                <button
                  key={milestone.year}
                  id={`milestone-btn-${milestone.year}`}
                  onClick={() => setActiveMilestoneYear(milestone.year)}
                  className={`px-5 py-2.5 rounded-xl font-display text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25'
                      : 'bg-[#0B1020]/75 text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/10'
                  }`}
                >
                  {milestone.year} • {milestone.quarter}
                </button>
              );
            })}
          </div>

          {/* Active Milestone Detail Card */}
          <div className="bg-[#0B1020]/90 rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
                  {selectedMilestone.year} • {selectedMilestone.quarter} Milestone
                </span>
                <h4 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                  {selectedMilestone.title}
                </h4>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-xs font-semibold text-sky-400 w-fit">
                {selectedMilestone.badge}
              </span>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {selectedMilestone.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-[#07111F] border border-white/10 text-xs font-medium text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Peer-Reviewed Validation</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#07111F] border border-white/10 text-xs font-medium text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Production Environment Certified</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#07111F] border border-white/10 text-xs font-medium text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Commercial Impact Quantified</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

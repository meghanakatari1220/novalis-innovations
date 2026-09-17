import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Shield, Cpu, Activity, CheckCircle2 } from 'lucide-react';
import { HERO_STATS } from '../data/companyData';
import { SectionBadge, PrimaryButton, SecondaryButton } from './common';
import { FloatingPathsBackground } from '@/components/ui/floating-paths';

interface HeroProps {
  onExploreClick: () => void;
  onLearnMoreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onLearnMoreClick }) => {
  return (
    <section
      id="hero"
      className="scroll-mt-20 lg:scroll-mt-24 relative min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 bg-[#050816] text-white overflow-hidden flex items-center border-b border-white/10"
    >
      {/* Dynamic Floating Paths Vector Animation Layer (Counter Stream) */}
      <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
        <FloatingPathsBackground position={-1} className="w-full h-full">
          <div className="w-full h-full" />
        </FloatingPathsBackground>
      </div>

      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-[36rem] h-[36rem] bg-blue-600/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-[36rem] h-[36rem] bg-purple-600/15 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Primary Floating Paths Stream wrapping Hero Content */}
      <FloatingPathsBackground position={1} className="w-full relative z-10">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Eyebrow, Heading, Paragraph, CTAs, Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start z-10"
          >
            {/* Eyebrow */}
            <SectionBadge className="mb-6">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>INNOVATION • TECHNOLOGY • IMPACT</span>
            </SectionBadge>

            {/* Large Heading */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1] mb-6">
              Building Ideas That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300">
                Shape Tomorrow
              </span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mb-8 font-normal">
              Novalis Innovations develops cutting-edge technology solutions across artificial intelligence, distributed cloud infrastructure, robotics, and cyber-physical systems—turning ambitious engineering concepts into measurable, real-world impact.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12 w-full sm:w-auto">
              <PrimaryButton
                id="hero-primary-cta"
                onClick={onExploreClick}
                size="lg"
                icon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              >
                Explore Our Work
              </PrimaryButton>

              <SecondaryButton
                id="hero-secondary-cta"
                onClick={onLearnMoreClick}
                size="lg"
              >
                Learn More
              </SecondaryButton>
            </div>

            {/* 4 Hero Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-white/10 w-full">
              {HERO_STATS.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-1">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-400 font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Master Card with Floating Telemetry Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            {/* Visual Frame */}
            <div className="relative w-full max-w-md sm:max-w-lg aspect-[4/3] sm:aspect-square lg:aspect-[4/4.5] rounded-3xl p-2.5 bg-[#0B1020]/80 backdrop-blur-md border border-white/10 shadow-2xl shadow-blue-500/10">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
                
                {/* Advanced tech imagery */}
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern advanced computing and hardware technology visualization"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/30 to-transparent" />

                {/* Telemetry Badge at Bottom of Visual */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#050816]/90 backdrop-blur-md border border-white/15 shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-bold text-white">Neural Telemetry Active</span>
                    </div>
                    <span className="text-[10px] font-mono text-sky-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-500/30 font-semibold">
                      v4.8.2-PROD
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full w-[88%] rounded-full" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Edge Nodes: 100k+ Synchronized</span>
                    <span className="text-emerald-400 font-semibold">99.999% SLA</span>
                  </div>
                </div>
              </div>

              {/* Floating UI Card 1: Top Right */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-5 -right-3 sm:-right-5 bg-[#0B1020]/90 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 max-w-[210px]"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-sky-400 shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">Neural Core</div>
                  <div className="text-[11px] text-sky-400 font-semibold">99.8% Precision</div>
                </div>
              </motion.div>

              {/* Floating UI Card 2: Bottom Left */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute -bottom-5 -left-3 sm:-left-5 bg-[#0B1020]/90 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 max-w-[220px]"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-sky-400 shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">Zero-Trust Cloud</div>
                  <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> SOC2 Type II Certified
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
      </FloatingPathsBackground>
    </section>
  );
};

import React from 'react';
import { Lightbulb, Cpu, TrendingUp, Users, CheckCircle2, Sparkles } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/companyData';
import { GlobalSectionHeading, GlobalCard, IconContainer } from './common';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Lightbulb':
        return <Lightbulb className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      case 'Users':
        return <Users className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="why-choose-us"
      className="scroll-mt-20 lg:scroll-mt-24 py-24 bg-[#050816] relative overflow-hidden border-b border-white/10"
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <GlobalSectionHeading
          eyebrow="The Novalis Advantage"
          title="Why Work With Us?"
          subtitle="We bridge the chasm between experimental breakthrough technology and ironclad, production-grade business execution."
        />

        {/* 4 Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {WHY_CHOOSE_US.map((item) => (
            <GlobalCard
              key={item.id}
              id={`why-card-${item.id}`}
              className="p-7 flex flex-col justify-between"
            >
              <div>
                <IconContainer size="md" className="mb-6">
                  {getIcon(item.icon)}
                </IconContainer>

                <div className="inline-block px-2.5 py-0.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-sky-400 text-[11px] font-bold tracking-tight mb-3">
                  {item.metric}
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-display text-white mb-3 group-hover:text-sky-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-start gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span>{item.detail}</span>
                </div>
              </div>
            </GlobalCard>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="rounded-2xl p-6 sm:p-8 bg-[#0B1020]/90 border border-white/10 shadow-xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <IconContainer size="lg" activeOnHover={false}>
              <Sparkles className="w-6 h-6 text-sky-400" />
            </IconContainer>
            <div>
              <h4 className="text-base sm:text-lg font-bold font-display text-white">
                100% Deterministic Architecture Guarantee
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Every line of code and hardware layout is peer-reviewed, cryptographically verified, and backed by comprehensive SLAs.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-slate-200 text-xs font-bold shadow-xs">
              ISO 27001 Certified
            </span>
            <span className="px-4 py-2 rounded-xl bg-blue-950/80 border border-blue-500/30 text-sky-400 text-xs font-bold">
              SOC 2 Type II
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

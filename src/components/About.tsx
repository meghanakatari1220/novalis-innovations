import React, { useState } from 'react';
import { Eye, Target, ShieldCheck, Zap, ArrowRight, CheckCircle2, Building2, Globe, Users, Award, X } from 'lucide-react';
import { ABOUT_FEATURES, COMPANY_INFO } from '../data/companyData';
import { Floating3DShapes } from './ui/Floating3DShapes';
import { SectionReveal3D } from './ui/SectionReveal3D';
import { Card3D } from './ui/Card3D';

interface AboutProps {
  onExploreInnovation: () => void;
}

export const About: React.FC<AboutProps> = ({ onExploreInnovation }) => {
  const [showStoryModal, setShowStoryModal] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Eye':
        return <Eye className="w-5 h-5 text-sky-400 group-hover:text-white transition-colors" />;
      case 'Target':
        return <Target className="w-5 h-5 text-sky-400 group-hover:text-white transition-colors" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-sky-400 group-hover:text-white transition-colors" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-sky-400 group-hover:text-white transition-colors" />;
      default:
        return <Zap className="w-5 h-5 text-sky-400 group-hover:text-white transition-colors" />;
    }
  };

  return (
    <section
      id="about"
      className="scroll-mt-20 lg:scroll-mt-24 py-24 bg-[#07111F] text-white relative overflow-hidden border-b border-white/10"
    >
      {/* 3D Geometric Floating Shapes Background Layer */}
      <Floating3DShapes variant="about" />

      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <SectionReveal3D className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-sky-400 text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-sm">
            About Novalis Innovations
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Turning Ideas Into Real-World Impact
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Bridging fundamental scientific breakthroughs and mission-critical production systems to accelerate industrial resilience and human capability.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Narrative & Mission Statement */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <Card3D maxTilt={4} depth={10} className="bg-[#0B1020]/75 backdrop-blur-md p-8 sm:p-9 rounded-2xl shadow-xl border border-white/10">
              <h3 className="text-2xl font-bold font-display text-white mb-5 tracking-tight">
                Architecting the Infrastructure of the Next Century
              </h3>
              
              <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
                <p>
                  <strong className="text-white">Who We Are:</strong> {COMPANY_INFO.name} is an innovation engineering company uniting elite computer scientists, embedded systems roboticists, and enterprise architects dedicated to solving high-consequence challenges.
                </p>
                <p>
                  <strong className="text-white">What We Do:</strong> We design, build, and deploy production-grade software platforms, edge IoT sensory grids, and custom autonomous intelligence pipelines engineered for unmatched reliability.
                </p>
                <p>
                  <strong className="text-white">The Problems We Solve:</strong> Modern organizations suffer from brittle legacy architectures, unpredictable equipment failure, soaring compute expenditures, and inaccessible AI silos that fail in hostile real-world conditions.
                </p>
                <p>
                  <strong className="text-white">Who We Serve:</strong> Global manufacturing leaders, municipal infrastructure authorities, healthcare hospital networks, renewable energy consortia, and high-growth enterprise innovators.
                </p>
                <p>
                  <strong className="text-white">Why We Exist:</strong> We believe innovation without practical execution is merely an academic exercise. We exist to turn transformative ideas into resilient tools that power modern civilization.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
                <button
                  id="about-learn-more-btn"
                  onClick={() => setShowStoryModal(true)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-white bg-blue-500/15 hover:bg-blue-500/25 px-5 py-2.5 rounded-xl transition-colors border border-blue-500/30 cursor-pointer"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="about-explore-tech-btn"
                  onClick={onExploreInnovation}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  <span>Explore Technology Domains</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </Card3D>

            {/* Visual Callout Bar */}
            <Card3D maxTilt={4} depth={8} className="p-6 rounded-2xl bg-[#0B1020]/75 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-sky-400 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Enterprise ISO-27001 Certified</h4>
                  <p className="text-xs text-slate-400">Audited compliance for defense and clinical telemetry</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full hidden sm:inline-block">
                Active Verification
              </span>
            </Card3D>
          </div>

          {/* Right Column: 4 Core Value Cards (Vision, Mission, Values, Impact) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ABOUT_FEATURES.map((item) => (
              <Card3D
                key={item.id}
                id={`about-card-${item.id}`}
                maxTilt={8}
                depth={16}
                className="bg-[#0B1020]/75 backdrop-blur-md p-7 rounded-2xl border border-white/10 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300 shadow-md">
                    {getIcon(item.icon)}
                  </div>
                  <h4 className="text-lg font-bold font-display text-white mb-2 group-hover:text-sky-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>{COMPANY_INFO.initials} Core</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                </div>
              </Card3D>
            ))}
          </div>

        </div>

      </SectionReveal3D>

      {/* Full Story Modal */}
      {showStoryModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowStoryModal(false)}
        >
          <div
            className="bg-[#0B1020] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-white/15 relative max-h-[90vh] overflow-y-auto text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowStoryModal(false)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-semibold text-sky-400 bg-blue-950/80 border border-blue-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
              Our Journey & Origins
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mt-3 mb-4">
              Pioneering Enterprise Deep Tech Since 2021
            </h3>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                Novalis Innovations began with a straightforward observation: while computational breakthroughs in academia were accelerating exponentially, their translation into resilient, tamper-proof industrial deployments was severely lagging.
              </p>
              <p>
                Founded by Dr. Elena Vance and Marcus Chen, the company started as a skunkworks research collaborative in Palo Alto. In our first 18 months, our team designed the first verifiable fault-tolerant distributed consensus engine for multi-tenant robotics fleets, which earned multiple patents and formed the foundation of our commercial offering.
              </p>
              <p>
                Today, Novalis Innovations maintains active research and deployment partnerships across three continents. We engineer solutions that operate inside high-pressure semiconductor fabrication facilities, municipal transit networks, and mission-critical emergency hospital systems.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs text-slate-400 font-mono">
                Palo Alto, CA • Est. 2021
              </div>
              <button
                onClick={() => setShowStoryModal(false)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold transition-colors shadow-md shadow-blue-500/25"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

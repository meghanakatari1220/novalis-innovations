import React from 'react';
import { Star, Quote, Building } from 'lucide-react';
import { TESTIMONIALS, PARTNER_LOGOS } from '../data/companyData';
import { GlobalSectionHeading, GlobalCard } from './common';

export const Testimonials: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="scroll-mt-20 lg:scroll-mt-24 py-24 bg-[#050816] relative overflow-hidden border-b border-white/10"
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <GlobalSectionHeading
          eyebrow="Client & Partner Validation"
          title="What People Say About Us"
          subtitle="Hear from enterprise executives, clinical directors, and smart-city leaders who rely on our software and hardware architectures."
        />

        {/* 3 Unified Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {TESTIMONIALS.map((t) => (
            <GlobalCard
              key={t.id}
              id={`testimonial-card-${t.id}`}
              className="p-8 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-6 text-amber-400">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-blue-500/15 absolute -top-3 -left-2 -z-10" />
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.author}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border border-white/10 shadow-xs"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{t.author}</h4>
                  <p className="text-xs text-sky-400 font-semibold">{t.title}</p>
                  <p className="text-xs text-slate-400">{t.company}</p>
                </div>
              </div>
            </GlobalCard>
          ))}
        </div>

        {/* Trusted Partners Banner */}
        <div className="pt-12 border-t border-white/10">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
            Trusted By Engineering Teams & Global Research Consortia
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-75 hover:opacity-100 transition-opacity">
            {PARTNER_LOGOS.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-default"
              >
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 font-display font-bold text-xs">
                  {partner.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="font-display font-bold text-sm tracking-tight">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

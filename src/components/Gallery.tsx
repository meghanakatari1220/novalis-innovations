import React, { useState } from 'react';
import { Maximize2, Calendar, Tag, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/companyData';
import { GalleryItem } from '../types';
import { GlobalSectionHeading, GlobalCard } from './common';

export const Gallery: React.FC = () => {
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveItemIndex(index);
  };

  const closeLightbox = () => {
    setActiveItemIndex(null);
  };

  const nextImage = () => {
    if (activeItemIndex !== null) {
      setActiveItemIndex((activeItemIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  const prevImage = () => {
    if (activeItemIndex !== null) {
      setActiveItemIndex((activeItemIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  return (
    <section
      id="gallery"
      className="scroll-mt-20 lg:scroll-mt-24 py-24 bg-[#07111F] relative overflow-hidden border-b border-white/10"
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <GlobalSectionHeading
          eyebrow="Culture & Momentum"
          title="Inside Our Journey"
          subtitle="From sensory cleanrooms to global keynotes, catch a glimpse of our engineering workspaces, workshops, and breakthrough milestones."
        />

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <GlobalCard
              key={item.id}
              id={`gallery-item-${item.id}`}
              onClick={() => openLightbox(idx)}
              className={`overflow-hidden flex flex-col p-0 cursor-pointer ${
                item.aspect === 'wide' ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Image Frame */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent pointer-events-none" />

                {/* Floating Tags */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-sky-400 bg-[#050816]/90 backdrop-blur-md border border-blue-500/30 px-3 py-1 rounded-full shadow-xs">
                    {item.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-300 bg-[#050816]/90 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full shadow-xs">
                    {item.date}
                  </span>
                </div>
              </div>

              {/* Caption Footer */}
              <div className="p-4 sm:p-5 bg-transparent border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm sm:text-base font-bold font-display text-white group-hover:text-sky-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    {item.caption}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-sky-400 group-hover:bg-blue-950/80 group-hover:border-blue-500/30 transition-colors shrink-0 ml-3">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </GlobalCard>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeItemIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0B1020] rounded-2xl overflow-hidden shadow-2xl border border-white/15 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-[#0B1020]/90 hover:bg-[#0B1020] text-slate-300 hover:text-white border border-white/10 transition-colors shadow-md cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Frame */}
            <div className="relative h-80 sm:h-[420px] bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={GALLERY_ITEMS[activeItemIndex].image}
                alt={GALLERY_ITEMS[activeItemIndex].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Prev / Next Nav Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-[#0B1020]/90 hover:bg-[#0B1020] text-slate-200 hover:text-white border border-white/10 transition-all shadow-md cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-[#0B1020]/90 hover:bg-[#0B1020] text-slate-200 hover:text-white border border-white/10 transition-all shadow-md cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Caption */}
            <div className="p-6 sm:p-8 bg-[#0B1020] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold text-sky-400 bg-blue-950/80 border border-blue-500/30 px-3 py-0.5 rounded-full">
                    {GALLERY_ITEMS[activeItemIndex].category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {GALLERY_ITEMS[activeItemIndex].date}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  {GALLERY_ITEMS[activeItemIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  {GALLERY_ITEMS[activeItemIndex].caption}
                </p>
              </div>

              <div className="text-xs font-mono text-slate-400 shrink-0">
                {activeItemIndex + 1} / {GALLERY_ITEMS.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

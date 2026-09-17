import React, { useState } from 'react';
import { Linkedin, Twitter, Github, Mail, ExternalLink, Award, BookOpen, X, CheckCircle2 } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/companyData';
import { TeamMember } from '../types';
import { GlobalSectionHeading, GlobalCard } from './common';

export const Team: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section
      id="team"
      className="scroll-mt-20 lg:scroll-mt-24 py-24 bg-[#050816] relative overflow-hidden border-b border-white/10"
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <GlobalSectionHeading
          eyebrow="Engineering & Research Leadership"
          title="The Minds Behind Novalis"
          subtitle="Our interdisciplinary team of roboticists, computer scientists, systems architects, and industrial designers brings decades of high-consequence technical experience."
        />

        {/* 6 Unified Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <GlobalCard
              key={member.id}
              id={`team-card-${member.id}`}
              className="overflow-hidden flex flex-col p-0"
            >
              {/* Professional Natural Portrait Image Frame */}
              <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-900 border-b border-white/10">
                <img
                  src={member.avatar}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent pointer-events-none" />

                {/* Department Badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-semibold text-sky-400 bg-[#050816]/90 backdrop-blur-md border border-blue-500/30 px-3 py-1 rounded-full shadow-xs">
                    {member.department}
                  </span>
                </div>

                {/* Social Links on Top-Right */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#0B1020]/80 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors shadow-xs"
                      aria-label={`${member.name} LinkedIn Profile`}
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#0B1020]/80 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors shadow-xs"
                      aria-label={`${member.name} Twitter Profile`}
                    >
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#0B1020]/80 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors shadow-xs"
                      aria-label={`${member.name} GitHub Profile`}
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Name & Role overlay on bottom of portrait */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-lg font-bold font-display text-white drop-shadow-md">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-sky-300 drop-shadow-sm">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                  <span className="text-xs font-semibold text-slate-400">
                    Novalis Fellow
                  </span>
                  <button
                    id={`view-bio-${member.id}`}
                    onClick={() => setSelectedMember(member)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Read Full Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </GlobalCard>
          ))}
        </div>

      </div>

      {/* Member Bio Modal Dialog */}
      {selectedMember && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-[#0B1020] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-white/15 relative max-h-[90vh] overflow-y-auto text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
              <img
                src={selectedMember.avatar}
                alt={selectedMember.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-2xl object-cover border border-white/10 shadow-sm"
              />
              <div className="text-center sm:text-left">
                <span className="text-xs font-semibold text-sky-400 bg-blue-950/80 border border-blue-500/30 px-3 py-0.5 rounded-full">
                  {selectedMember.department}
                </span>
                <h3 className="text-2xl font-bold font-display text-white mt-2">
                  {selectedMember.name}
                </h3>
                <p className="text-sm font-semibold text-sky-400">
                  {selectedMember.role}
                </p>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {selectedMember.bio}
            </p>

            <div className="p-4 rounded-xl bg-[#07111F] border border-white/10 mb-6">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5">
                Focus Areas & Research Leadership
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Advanced Mission-Critical Architecture & System Reliability</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Cross-Disciplinary Industry-Academia Collaborative Research</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Ethical AI, Safety Verification & Standards Alignment</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedMember.socials.linkedin && (
                  <a
                    href={selectedMember.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/[0.06] text-slate-300 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {selectedMember.socials.twitter && (
                  <a
                    href={selectedMember.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/[0.06] text-slate-300 hover:text-white transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {selectedMember.socials.github && (
                  <a
                    href={selectedMember.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/[0.06] text-slate-300 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold transition-colors shadow-md shadow-blue-500/25 cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

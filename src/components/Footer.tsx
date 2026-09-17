import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Youtube, Instagram, ArrowUp, X, Shield, Lock } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      const navOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-[#030612] text-slate-400 pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Subtle blue ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Info (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-700 p-0.5 shadow-md shadow-blue-500/20">
                <div className="w-full h-full bg-[#050816] rounded-[10px] flex items-center justify-center">
                  <span className="font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-200 text-base tracking-wider">
                    {COMPANY_INFO.initials}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg tracking-tight text-white">
                  {COMPANY_INFO.name}
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-widest text-sky-400">
                  Engineering Tomorrow
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Pioneering future technologies through rigorous software engineering, autonomous robotics, cognitive AI, and edge IoT architectures built for real-world resilience.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/10"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/10"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-sky-500 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/10"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-red-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/10"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-pink-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/10"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase font-bold text-white tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#hero"
                  onClick={(e) => scrollToSection(e, '#hero')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => scrollToSection(e, '#about')}
                  className="hover:text-sky-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#innovation"
                  onClick={(e) => scrollToSection(e, '#innovation')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Innovation Verticals
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={(e) => scrollToSection(e, '#projects')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Case Studies & Projects
                </a>
              </li>
              <li>
                <a
                  href="#achievements"
                  onClick={(e) => scrollToSection(e, '#achievements')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Achievements
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  onClick={(e) => scrollToSection(e, '#team')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Leadership Team
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Contact & Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Company & Media */}
          <div>
            <h4 className="text-xs uppercase font-bold text-white tracking-wider mb-4">
              Company & Media
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#gallery"
                  onClick={(e) => scrollToSection(e, '#gallery')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Inside Our Journey
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  onClick={(e) => scrollToSection(e, '#testimonials')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Partner Testimonials
                </a>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed flex items-center justify-between">
                  <span>Careers (Hiring)</span>
                  <span className="text-[10px] bg-blue-950 text-sky-400 border border-blue-500/30 px-2 py-0.5 rounded-full font-bold">5 Openings</span>
                </span>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">
                  Press & Media Kit
                </span>
              </li>
              {onOpenAdmin && (
                <li>
                  <button
                    onClick={onOpenAdmin}
                    className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-semibold cursor-pointer text-xs pt-1"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Inquiries Admin Portal</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Direct Contact Info */}
          <div>
            <h4 className="text-xs uppercase font-bold text-white tracking-wider mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-sky-300 break-all transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-sky-300 transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>San Jose, California, USA</span>
              </li>
            </ul>

            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] px-3.5 py-2 rounded-xl border border-white/10 transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5 text-sky-400" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 {COMPANY_INFO.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-white transition-colors focus:outline-none cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-white transition-colors focus:outline-none cursor-pointer"
            >
              Terms of Service
            </button>
            <span>•</span>
            <span className="text-slate-500">SOC2 Type II & ISO 27001 Certified</span>
          </div>
        </div>
      </div>

      {/* Legal Dialog Modal */}
      {legalModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="bg-[#0B1020] text-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-white/15 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-sky-400" />
                <h3 className="text-xl font-bold font-display text-white">
                  {legalModal === 'privacy' ? 'Privacy & Data Protection Policy' : 'Terms of Engineering Service'}
                </h3>
              </div>
              <button
                onClick={() => setLegalModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close legal modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    Novalis Innovations operates with strict adherence to ISO-27001 data governance and enterprise confidentiality standards. All intellectual property shared via client inquiries remains fully protected.
                  </p>
                  <p>
                    We collect only the technical telemetry and identity parameters explicitly submitted through our authorized endpoints to respond to inquiries and conduct engineering feasibility studies.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Engagement with Novalis Innovations is governed by bilateral Master Services Agreements (MSA) and Statements of Work (SOW). All deployed deliverables grant 100% intellectual property ownership to the commissioning client.
                  </p>
                  <p>
                    Proprietary architectures and hardware designs undergo formal acceptance testing protocols prior to commercial signoff.
                  </p>
                </>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold cursor-pointer shadow-md shadow-blue-500/20"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

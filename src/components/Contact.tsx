import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Linkedin,
  Twitter,
  Github,
  Youtube,
  Shield,
  Sparkles,
  Lock
} from 'lucide-react';
import { COMPANY_INFO, INITIAL_INQUIRIES } from '../data/companyData';
import { ContactFormData, InquiryRecord } from '../types';

interface ContactProps {
  onOpenAdmin?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenAdmin }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      errs.name = 'Please enter your full name.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid corporate or academic email address.';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Please select an area of interest.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide a brief description of your project or inquiry.';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Message must be at least 15 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Save into localStorage for Contact Admin Dashboard integration
    try {
      const newInquiry: InquiryRecord = {
        id: `inq-${Date.now().toString().slice(-4)}`,
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        subject: formData.subject,
        message: formData.message.trim(),
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        status: 'new',
        starred: false,
      };

      const raw = localStorage.getItem('novalis_inquiries_data');
      const currentList: InquiryRecord[] = raw ? JSON.parse(raw) : INITIAL_INQUIRIES;
      const updatedList = [newInquiry, ...currentList];
      localStorage.setItem('novalis_inquiries_data', JSON.stringify(updatedList));
      window.dispatchEvent(new Event('novalis_new_inquiry'));
    } catch (err) {
      console.error('Failed to save to inquiries storage', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
      });
    }, 900);
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 lg:scroll-mt-24 py-24 bg-[#050816] text-white relative overflow-hidden border-b border-white/10"
    >
      {/* Unified subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-sky-400 text-xs font-semibold tracking-wider uppercase mb-3">
            Initiate Collaboration
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Let's Build Something Great Together
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Have an idea, project, or collaboration opportunity? We'd love to hear from you. Our engineering team typically responds within 24 business hours.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Contact info, working hours, socials, & Admin Portal */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0B1020]/80 rounded-2xl p-8 border border-white/10 shadow-xl backdrop-blur-md">
              <h3 className="text-xl font-bold font-display text-white mb-6">
                Global Operations & Headquarters
              </h3>

              <div className="space-y-6 text-sm">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-sky-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Direct Inquiries</div>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-white hover:text-sky-300 font-medium transition-colors"
                    >
                      {COMPANY_INFO.email}
                    </a>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Partnerships: {COMPANY_INFO.inquiriesEmail}
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-sky-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Phone / Desk</div>
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="text-white hover:text-sky-300 font-medium transition-colors"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                    <div className="text-xs text-emerald-400 font-medium mt-0.5">
                      {COMPANY_INFO.emergencySupport}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-sky-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Silicon Valley Innovation Center</div>
                    <p className="text-white leading-relaxed">
                      {COMPANY_INFO.address}
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-sky-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Working Hours</div>
                    <p className="text-white">
                      {COMPANY_INFO.workingHours}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium mt-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Engineering Desk Online
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 mt-6 border-t border-white/10">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-3">
                  Connect on Official Channels
                </div>
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Novalis Innovations LinkedIn"
                    className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-blue-600 text-slate-300 hover:text-white transition-colors border border-white/10"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Novalis Innovations Twitter/X"
                    className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-sky-500 text-slate-300 hover:text-white transition-colors border border-white/10"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Novalis Innovations GitHub"
                    className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Novalis Innovations YouTube"
                    className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-red-600 text-slate-300 hover:text-white transition-colors border border-white/10"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Company Internal Portal Access */}
              {onOpenAdmin && (
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-300 block">Internal Triage Portal</span>
                    <span className="text-[11px] text-slate-400">For Novalis engineering & executive staff</span>
                  </div>
                  <button
                    id="contact-admin-dashboard-btn"
                    type="button"
                    onClick={onOpenAdmin}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-blue-600 text-sky-300 hover:text-white text-xs font-semibold border border-white/10 transition-all shadow-xs"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Admin Console</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0B1020]/80 rounded-2xl p-8 sm:p-10 border border-white/10 shadow-2xl backdrop-blur-md">
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-2">
                Send Us a Proposal or Inquiry
              </h3>
              <p className="text-sm text-slate-300 mb-8">
                Please fill out the form below. We treat all project specifications with strict confidentiality under mutual NDA if requested.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-400/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-white mb-2">
                    Inquiry Received Successfully!
                  </h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you for reaching out to Novalis Innovations. Our systems architecture team has logged your message and will review the specifications within 24 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white text-sm font-semibold border border-white/10 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Full Name <span className="text-sky-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="e.g. Dr. Jordan Hayes"
                        className={`w-full px-4 py-3 rounded-xl bg-[#07111F] border text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.name
                            ? 'border-red-500 focus:ring-red-400'
                            : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/30'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Work / Academic Email <span className="text-sky-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="name@enterprise.com"
                        className={`w-full px-4 py-3 rounded-xl bg-[#07111F] border text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? 'border-red-500 focus:ring-red-400'
                            : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/30'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Company / Organization */}
                    <div>
                      <label htmlFor="contact-company" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Organization / University
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        placeholder="e.g. Apex Dynamics or MIT Lab"
                        className="w-full px-4 py-3 rounded-xl bg-[#07111F] border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Inquiry Focus <span className="text-sky-400">*</span>
                      </label>
                      <select
                        id="contact-subject"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl bg-[#07111F] border text-white text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.subject
                            ? 'border-red-500 focus:ring-red-400'
                            : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/30'
                        }`}
                      >
                        <option value="" disabled>Select area of interest</option>
                        <option value="Enterprise AI & Neural Systems">Enterprise AI & Neural Systems</option>
                        <option value="IoT & Industrial Telemetry Mesh">IoT & Industrial Telemetry Mesh</option>
                        <option value="Autonomous Robotics & Automation">Autonomous Robotics & Automation</option>
                        <option value="Cloud Infrastructure & Security">Cloud Infrastructure & Security</option>
                        <option value="R&D Partnership / Academic Fellowship">R&D Partnership / Academic Fellowship</option>
                        <option value="General Technical Inquiry">General Technical Inquiry</option>
                      </select>
                      {errors.subject && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Project Details / Scope <span className="text-sky-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Describe your current technological challenges, operational scale, desired outcomes, or timelines..."
                      className={`w-full px-4 py-3 rounded-xl bg-[#07111F] border text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all resize-none ${
                        errors.message
                          ? 'border-red-500 focus:ring-red-400'
                          : 'border-white/10 focus:border-blue-500 focus:ring-blue-500/30'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Unified Primary Button */}
                  <div className="pt-2">
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99] transition-all shadow-lg shadow-blue-500/25 border border-blue-400/30 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Encrypting & Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message →</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center mt-3">
                      <Lock className="w-3 h-3 text-slate-500" />
                      <span>Protected by end-to-end transport encryption. Zero spam guaranteed.</span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect, useMemo } from 'react';
import {
  Inbox,
  Star,
  Clock,
  CheckCircle2,
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  X,
  Send,
  Building,
  Mail,
  Calendar,
  AlertCircle,
  ArrowLeft,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { COMPANY_INFO, INITIAL_INQUIRIES } from '../data/companyData';
import { InquiryRecord } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = 'novalis_inquiries_data';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse inquiries', e);
    }
    return INITIAL_INQUIRIES;
  });

  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'reviewing' | 'resolved' | 'starred'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replySuccess, setReplySuccess] = useState(false);
  const [notesText, setNotesText] = useState('');

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Failed to save inquiries to local storage', e);
    }
  }, [inquiries]);

  // When selected inquiry changes, update local notes
  useEffect(() => {
    if (selectedInquiry) {
      setNotesText(selectedInquiry.notes || '');
      setReplyText('');
      setReplySuccess(false);
    }
  }, [selectedInquiry]);

  // Listen to window custom event or storage changes from contact form
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setInquiries(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Failed to refresh inquiries', e);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('novalis_new_inquiry', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('novalis_new_inquiry', handleStorageChange);
    };
  }, []);

  const stats = useMemo(() => {
    const total = inquiries.length;
    const pending = inquiries.filter((i) => i.status === 'new' || i.status === 'reviewing').length;
    const resolved = inquiries.filter((i) => i.status === 'resolved').length;
    const enterprise = inquiries.filter((i) => i.company && i.company.trim().length > 0).length;
    return { total, pending, resolved, enterprise };
  }, [inquiries]);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      if (activeTab === 'starred' && !item.starred) return false;
      if (activeTab === 'new' && item.status !== 'new') return false;
      if (activeTab === 'reviewing' && item.status !== 'reviewing') return false;
      if (activeTab === 'resolved' && item.status !== 'resolved') return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        (item.company && item.company.toLowerCase().includes(q)) ||
        item.subject.toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q)
      );
    });
  }, [inquiries, activeTab, searchQuery]);

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, starred: !item.starred } : item))
    );
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, starred: !prev.starred } : null));
    }
  };

  const updateStatus = (id: string, newStatus: InquiryRecord['status']) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const saveNotes = () => {
    if (!selectedInquiry) return;
    setInquiries((prev) =>
      prev.map((item) => (item.id === selectedInquiry.id ? { ...item, notes: notesText } : item))
    );
    setSelectedInquiry((prev) => (prev ? { ...prev, notes: notesText } : null));
  };

  const deleteInquiry = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (confirm('Are you sure you want to remove this inquiry from the admin console?')) {
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedInquiry) return;

    setReplySuccess(true);
    updateStatus(selectedInquiry.id, 'resolved');
    setTimeout(() => {
      setReplyText('');
    }, 2000);
  };

  const exportCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Email', 'Company', 'Subject', 'Status', 'Message'];
    const rows = inquiries.map((i) => [
      `"${i.id}"`,
      `"${i.date}"`,
      `"${i.name}"`,
      `"${i.email}"`,
      `"${i.company || ''}"`,
      `"${i.subject}"`,
      `"${i.status}"`,
      `"${i.message.replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `novalis_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetToSampleData = () => {
    if (confirm('Reset to initial sample enterprise inquiries?')) {
      setInquiries(INITIAL_INQUIRIES);
      setSelectedInquiry(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-stretch bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="flex w-full h-full bg-[#050816] text-slate-200 overflow-hidden">
        
        {/* ======================================================== */}
        {/* SIDEBAR: Deep Navy */}
        {/* ======================================================== */}
        <aside className="w-72 bg-[#030612] border-r border-white/10 flex flex-col justify-between shrink-0 hidden md:flex text-slate-300">
          <div>
            {/* Branding Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-700 p-0.5 shadow-md shadow-sky-500/20">
                  <div className="w-full h-full bg-[#050816] rounded-[10px] flex items-center justify-center">
                    <span className="font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-200 text-sm tracking-wider">
                      {COMPANY_INFO.initials}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-sm tracking-tight">
                    {COMPANY_INFO.name}
                  </h3>
                  <p className="text-[10px] text-sky-400 font-semibold uppercase tracking-wider">
                    Executive Portal
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="p-4 space-y-1.5">
              <div className="px-3 py-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Inquiry Triage
              </div>

              <button
                onClick={() => setActiveTab('all')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'all'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Inbox className="w-4 h-4" />
                  <span>All Inquiries</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300">
                  {stats.total}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('new')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'new'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>New Submissions</span>
                </div>
                {inquiries.filter((i) => i.status === 'new').length > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                    {inquiries.filter((i) => i.status === 'new').length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('reviewing')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'reviewing'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-sky-400" />
                  <span>In Review</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400">
                  {inquiries.filter((i) => i.status === 'reviewing').length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('resolved')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'resolved'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Resolved</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400">
                  {stats.resolved}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('starred')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'starred'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400/30" />
                  <span>VIP / Starred</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400">
                  {inquiries.filter((i) => i.starred).length}
                </span>
              </button>

              <div className="pt-4 px-3 py-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Data Operations
              </div>

              <button
                onClick={exportCSV}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <Download className="w-4 h-4 text-sky-400" />
                <span>Export CSV Report</span>
              </button>

              <button
                onClick={resetToSampleData}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <RefreshCw className="w-4 h-4 text-slate-400" />
                <span>Restore Sample Data</span>
              </button>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/10">
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 mb-3 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Live Telemetry Channel</span>
              </div>
              <p className="text-[11px] text-slate-400">
                End-to-end encrypted CRM storage.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-200 bg-white/[0.06] hover:bg-white/[0.12] hover:text-white transition-colors border border-white/10 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Website</span>
            </button>
          </div>
        </aside>

        {/* ======================================================== */}
        {/* MAIN DASHBOARD CONTENT AREA */}
        {/* ======================================================== */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[#050816]">
          
          {/* Top Navbar */}
          <header className="h-18 bg-[#07111F] border-b border-white/10 px-6 sm:px-8 flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="md:hidden p-2 rounded-xl text-slate-300 hover:bg-white/10"
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
                  Contact Inquiries & Triage Console
                </h1>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Review client project briefs, manage response state, and dispatch engineering follow-ups.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={exportCSV}
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.06] border border-white/10 hover:bg-white/[0.12] transition-colors shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4 text-sky-400" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Admin Dashboard"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Scrollable Dashboard Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            
            {/* Top 4 Premium Statistic Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-[#0B1020]/80 p-5 rounded-2xl border border-white/10 shadow-xl flex items-center justify-between backdrop-blur-md">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Total Inquiries
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                    {stats.total}
                  </div>
                  <div className="text-[11px] text-sky-400 font-medium mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Real-time persistence</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-950/80 text-sky-400 flex items-center justify-center border border-blue-500/30">
                  <Inbox className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-[#0B1020]/80 p-5 rounded-2xl border border-white/10 shadow-xl flex items-center justify-between backdrop-blur-md">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Pending Action
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-display text-amber-400">
                    {stats.pending}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Needs engineering triage
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-950/40 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Clock className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-[#0B1020]/80 p-5 rounded-2xl border border-white/10 shadow-xl flex items-center justify-between backdrop-blur-md">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Addressed & Closed
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-display text-emerald-400">
                    {stats.resolved}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1 font-medium">
                    {stats.total > 0 ? `${Math.round((stats.resolved / stats.total) * 100)}% resolution rate` : '0%'}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-950/40 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-[#0B1020]/80 p-5 rounded-2xl border border-white/10 shadow-xl flex items-center justify-between backdrop-blur-md">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Enterprise Partners
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                    {stats.enterprise}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Avg response: &lt; 4.2h
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-950/40 text-purple-400 flex items-center justify-center border border-purple-500/30">
                  <Building className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-[#0B1020]/80 p-4 rounded-2xl border border-white/10 shadow-xl flex flex-col sm:flex-row gap-4 items-center justify-between backdrop-blur-md">
              
              {/* Search input */}
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by sender, company, subject..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-[#07111F] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Mobile Tab Pills */}
              <div className="flex md:hidden items-center gap-1.5 overflow-x-auto w-full pb-1">
                {(['all', 'new', 'reviewing', 'resolved', 'starred'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/[0.06] text-slate-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-400 font-medium whitespace-nowrap self-end sm:self-center">
                Showing <strong className="text-white">{filteredInquiries.length}</strong> of {inquiries.length} inquiries
              </div>
            </div>

            {/* Inquiries Table Card */}
            <div className="bg-[#0B1020]/80 rounded-2xl border border-white/10 shadow-xl overflow-hidden backdrop-blur-md">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#07111F] border-b border-white/10 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                      <th className="py-3.5 px-4 w-12 text-center">VIP</th>
                      <th className="py-3.5 px-6">Sender & Organization</th>
                      <th className="py-3.5 px-6">Subject / Area</th>
                      <th className="py-3.5 px-6">Date Received</th>
                      <th className="py-3.5 px-6">Status</th>
                      <th className="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400">
                          <Inbox className="w-10 h-10 mx-auto mb-3 text-slate-500" />
                          <p className="font-semibold text-slate-300">No inquiries match your criteria.</p>
                          <p className="text-xs text-slate-500 mt-1">Try clearing filters or search terms.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((item) => (
                        <tr
                          key={item.id}
                          onClick={() => setSelectedInquiry(item)}
                          className="hover:bg-white/[0.03] cursor-pointer transition-colors group"
                        >
                          {/* Star toggle */}
                          <td className="py-4 px-4 text-center">
                            <button
                              onClick={(e) => toggleStar(item.id, e)}
                              className="p-1 rounded-lg text-slate-500 hover:text-amber-400 transition-colors cursor-pointer"
                              aria-label="Star inquiry"
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  item.starred ? 'text-amber-400 fill-amber-400' : ''
                                }`}
                              />
                            </button>
                          </td>

                          {/* Sender & Organization */}
                          <td className="py-4 px-6">
                            <div className="font-bold text-white group-hover:text-sky-400 transition-colors">
                              {item.name}
                            </div>
                            <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                              <span>{item.email}</span>
                              {item.company && (
                                <>
                                  <span>•</span>
                                  <span className="font-medium text-slate-300">{item.company}</span>
                                </>
                              )}
                            </div>
                          </td>

                          {/* Subject / Area */}
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-950/80 text-sky-400 border border-blue-500/30">
                              {item.subject}
                            </span>
                          </td>

                          {/* Date */}
                          <td className="py-4 px-6 text-xs text-slate-400 font-mono">
                            {item.date}
                          </td>

                          {/* Status */}
                          <td className="py-4 px-6">
                            {item.status === 'new' && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-950/40 text-amber-400 border border-amber-500/30">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                New
                              </span>
                            )}
                            {item.status === 'reviewing' && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-950/40 text-sky-400 border border-sky-500/30">
                                <Clock className="w-3 h-3 text-sky-400" />
                                In Review
                              </span>
                            )}
                            {item.status === 'resolved' && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/40 text-emerald-400 border border-emerald-500/30">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                Resolved
                              </span>
                            )}
                            {item.status === 'archived' && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/[0.06] text-slate-400 border border-white/10">
                                Archived
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedInquiry(item);
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-white/10 transition-colors cursor-pointer"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => deleteInquiry(item.id, e)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/10 transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* ======================================================== */}
      {/* INQUIRY DETAIL MODAL */}
      {/* ======================================================== */}
      {selectedInquiry && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedInquiry(null)}
        >
          <div
            className="bg-[#0B1020] text-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-white/15 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-sky-400">ID: {selectedInquiry.id}</span>
                  <span className="text-xs text-slate-500">•</span>
                  <span className="text-xs text-slate-400">{selectedInquiry.date}</span>
                </div>
                <h3 className="text-2xl font-bold font-display text-white">
                  {selectedInquiry.name}
                </h3>
                <div className="text-sm text-slate-300 flex items-center gap-2 mt-0.5">
                  <span className="font-semibold text-sky-400">{selectedInquiry.company || 'Private Inquiry'}</span>
                  <span>•</span>
                  <span>{selectedInquiry.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => toggleStar(selectedInquiry.id, e)}
                  className="p-2 rounded-xl border border-white/10 text-slate-400 hover:text-amber-400 hover:bg-white/10 cursor-pointer"
                  aria-label="Star"
                >
                  <Star className={`w-4 h-4 ${selectedInquiry.starred ? 'text-amber-400 fill-amber-400' : ''}`} />
                </button>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scope / Subject Badge */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                  Focus Domain
                </div>
                <div className="text-sm font-bold text-white">
                  {selectedInquiry.subject}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => updateStatus(selectedInquiry.id, e.target.value as InquiryRecord['status'])}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/15 bg-[#07111F] text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                >
                  <option value="new">New</option>
                  <option value="reviewing">In Review</option>
                  <option value="resolved">Resolved</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            {/* Project Scope Message */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Client Project Specifications
              </h4>
              <div className="p-4 rounded-xl bg-[#07111F] border border-white/10 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Internal Engineering Triage Notes */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Internal Triage Notes
                </h4>
                <button
                  onClick={saveNotes}
                  className="text-xs text-sky-400 font-semibold hover:underline cursor-pointer"
                >
                  Save Notes
                </button>
              </div>
              <textarea
                rows={2}
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                placeholder="Add internal engineering or triage notes (e.g. Assigned to Dr. Tariq Hasan for technical feasibility review)..."
                className="w-full p-3 rounded-xl border border-white/10 bg-[#07111F] text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 placeholder-slate-500"
              />
            </div>

            {/* Simulated Reply Composer */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Direct Client Response Dispatch
              </h4>

              {replySuccess ? (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Reply encrypted & dispatched to {selectedInquiry.email}. Status marked as Resolved.</span>
                </div>
              ) : (
                <form onSubmit={handleSendReply} className="space-y-3">
                  <textarea
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Compose official engineering response to ${selectedInquiry.email}...`}
                    className="w-full p-3 rounded-xl border border-white/10 bg-[#07111F] text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 placeholder-slate-500"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Dispatched via corporate relay ({COMPANY_INFO.inquiriesEmail})
                    </span>
                    <button
                      type="submit"
                      disabled={!replyText.trim()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 transition-colors shadow-md shadow-blue-500/20 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Response</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

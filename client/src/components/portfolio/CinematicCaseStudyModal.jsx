import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  ArrowUpRight,
  Monitor,
  Smartphone,
  Laptop,
  CheckCircle2,
  Calendar,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function CinematicCaseStudyModal({ project, isOpen, onClose }) {
  const [deviceTab, setDeviceTab] = useState('browser'); // 'browser' | 'laptop' | 'mobile'

  // Escape key closes modal & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const handleConsultationClick = (e) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      const el = document.getElementById('booking-calendar');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl rounded-3xl bg-[#0E0E14] border border-gold-500/30 shadow-[0_0_80px_rgba(198,147,65,0.25)] p-6 sm:p-10 my-auto max-h-[92vh] overflow-y-auto space-y-10"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Case Study"
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-white/[0.08] hover:bg-gold-500/20 text-gray-400 hover:text-white border border-white/10 hover:border-gold-500/30 flex items-center justify-center transition-colors focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ========================================================================= */}
        {/* 1. CASE STUDY HEADER                                                     */}
        {/* ========================================================================= */}
        <div className="space-y-4 pr-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#181820] text-gold-400 border border-gold-500/30 text-[10px] font-mono uppercase tracking-wider font-bold">
              <Sparkles className="w-3 h-3" />
              <span>Flagship Website Architecture</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] text-gray-300 text-[10px] font-mono tracking-wider">
              <Lock className="w-3 h-3 text-gold-400" />
              <span>https://{project.domain}</span>
            </span>

            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              {project.industry}
            </span>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-gold-300 font-medium mt-1">
              {project.tagline}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal max-w-3xl">
            {project.fullStory || project.summary}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. MULTI-DEVICE PRESENTATION ENGINE                                      */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400">
              Responsive Device Visualizer
            </span>

            {/* Device Switcher Tabs */}
            <div className="inline-flex p-1 rounded-full bg-[#161622] border border-white/[0.08]">
              <button
                onClick={() => setDeviceTab('browser')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                  deviceTab === 'browser'
                    ? 'bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C69341] text-black font-extrabold shadow-glow-gold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop Browser</span>
              </button>

              <button
                onClick={() => setDeviceTab('laptop')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                  deviceTab === 'laptop'
                    ? 'bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C69341] text-black font-extrabold shadow-glow-gold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>MacBook Pro</span>
              </button>

              <button
                onClick={() => setDeviceTab('mobile')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                  deviceTab === 'mobile'
                    ? 'bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C69341] text-black font-extrabold shadow-glow-gold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>iPhone 16 Pro</span>
              </button>
            </div>
          </div>

          {/* Active Device Frame Display */}
          <div className="bg-[#070709] rounded-2xl border border-white/[0.06] p-4 sm:p-8 flex items-center justify-center min-h-[420px]">
            {deviceTab === 'browser' && (
              <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#111116]">
                <div className="bg-[#181820] border-b border-white/[0.08] px-4 py-2.5 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  <span className="text-[11px] font-mono text-gray-400 ml-4">
                    https://{project.domain}
                  </span>
                </div>
                <div className="aspect-[16/9] w-full overflow-hidden bg-black">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {deviceTab === 'laptop' && (
              <div className="w-full max-w-2xl">
                <div className="rounded-t-2xl bg-[#202028] p-3 border border-white/10 shadow-2xl">
                  <div className="aspect-[16/10] rounded-lg overflow-hidden bg-black">
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="h-3 w-full bg-gradient-to-b from-[#353545] to-[#1E1E26] rounded-b-xl border-t border-white/20" />
              </div>
            )}

            {deviceTab === 'mobile' && (
              <div className="w-full max-w-[280px] rounded-[44px] bg-[#1E1E26] p-3 border-2 border-white/20 shadow-2xl">
                <div className="relative aspect-[9/19] rounded-[36px] overflow-hidden bg-black">
                  <img
                    src={project.mobileImage || project.heroImage}
                    alt={`${project.title} Mobile`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. BUSINESS METRICS & DELIVERABLES MATRIX                                 */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Key Impact Metrics */}
          <div className="md:col-span-5 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-gold-400 block">
              Commercial Impact & Velocity
            </span>
            <div className="grid grid-cols-1 gap-2.5">
              {project.metrics &&
                project.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#14141E] border border-white/[0.06] flex items-center justify-between"
                  >
                    <span className="text-xs text-gray-400 font-medium">{m.label}</span>
                    <span className="text-base font-display font-extrabold text-gold-300">
                      {m.value}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Scope of Execution */}
          <div className="md:col-span-7 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-gold-400 block">
              Full Scope of Digital Execution
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.scope &&
                project.scope.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#14141E] border border-white/[0.06] flex items-center gap-2.5 text-xs text-gray-300 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. SECTION HIGHLIGHTS GALLERY                                             */}
        {/* ========================================================================= */}
        {project.sectionScreenshots && project.sectionScreenshots.length > 0 && (
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400 block">
              Curated Website Section Architecture
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.sectionScreenshots.map((sec, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl overflow-hidden bg-[#14141E] border border-white/[0.08] flex flex-col"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden bg-black">
                    <img
                      src={sec.image}
                      alt={sec.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <div className="text-xs font-bold text-white line-clamp-1">{sec.title}</div>
                    <div className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                      {sec.caption}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. STRATEGIC BOTTOM CALL-TO-ACTION                                       */}
        {/* ========================================================================= */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="text-sm font-bold text-white">
              Ready to build a category-defining website for your business?
            </div>
            <div className="text-xs text-gray-400 font-mono">
              Creative Direction: Yashwa & Aroosa • 48-Hour Sprint Turnaround
            </div>
          </div>

          <button
            onClick={handleConsultationClick}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-mono font-extrabold uppercase tracking-widest text-black bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C69341] hover:shadow-glow-gold hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl shrink-0"
          >
            <Calendar className="w-4 h-4 text-black" />
            <span>Build Something Similar</span>
            <ArrowUpRight className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}

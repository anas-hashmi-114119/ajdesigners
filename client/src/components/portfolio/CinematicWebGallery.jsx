import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, CheckCircle2, Lock, ArrowUpRight, Calendar, ExternalLink } from 'lucide-react';
import CinematicBrowserWindow from './CinematicBrowserWindow';
import { CINEMATIC_WEBSITES } from './cinematicProjectsData';

export default function CinematicWebGallery() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBookProject = (projectName) => {
    if (location.pathname === '/') {
      const calendarEl = document.getElementById('booking-calendar');
      if (calendarEl) {
        calendarEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#booking-calendar');
      setTimeout(() => {
        const calendarEl = document.getElementById('booking-calendar');
        if (calendarEl) {
          calendarEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 250);
    }
  };

  return (
    <div className="space-y-20 lg:space-y-28 py-6">
      {/* Editorial Category Eyebrow & Headline */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-mono font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>High-Converting Website Case Studies</span>
        </div>

        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
          Websites & Landing Pages <br />
          <span className="gradient-text">Engineered for Tangible Revenue Growth.</span>
        </h3>

        <p className="text-sm sm:text-base text-gray-400 font-normal leading-relaxed max-w-2xl mx-auto">
          Every website we engineer is designed for speed, authority, and measurable business conversions.
          Explore our real-world client case studies below—each preview automatically cycles through 4 real screens every 2 seconds.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 4 CLIENT-ATTRACTING SHOWCASE PROJECTS (NO POPUPS / INLINE DETAILS)        */}
      {/* ========================================================================= */}
      <div className="space-y-24 lg:space-y-32">
        {CINEMATIC_WEBSITES.map((project, idx) => {
          const isEven = idx % 2 === 1;

          return (
            <div
              key={project.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Left/Content Column: All Details, Metrics, Features & CTA Right on the Page */}
              <div
                className={`space-y-6 ${
                  isEven ? 'lg:col-span-5 lg:order-2' : 'lg:col-span-5 lg:order-1'
                }`}
              >
                {/* Serial Number & Category Badge */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl font-display font-black text-gold-400/40">
                    0{idx + 1}
                  </span>
                  <div className="h-4 w-px bg-white/20" />
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181820] text-gold-400 border border-gold-500/30 text-[11px] font-mono uppercase tracking-wider font-bold shadow-sm">
                    <Sparkles className="w-3 h-3 text-gold-400" />
                    <span>Client Case Study</span>
                  </span>
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest hidden sm:inline">
                    {project.year}
                  </span>
                </div>

                {/* Project Title & Industry */}
                <div className="space-y-1.5">
                  <span className="text-xs font-mono uppercase tracking-widest text-gold-300 font-bold block">
                    {project.industry}
                  </span>
                  <h4 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white tracking-tight leading-tight">
                    {project.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-200 font-semibold leading-snug pt-1">
                    {project.tagline}
                  </p>
                </div>

                {/* Relatable Business Summary */}
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                  {project.summary}
                </p>

                {/* 3 High-Impact Metric Cards */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  {project.metrics.map((metric, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3 rounded-xl bg-[#14141E] border border-white/[0.08] hover:border-gold-500/30 transition-colors"
                    >
                      <div className="text-base sm:text-lg lg:text-xl font-display font-extrabold text-gold-300">
                        {metric.value}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-gray-400 font-medium leading-tight mt-0.5">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 4 Core Features Delivered */}
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400 font-bold">
                    Key Deliverables & Capabilities:
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.features.map((feature, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-start gap-2 text-xs text-gray-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Radiant Direct Booking CTA Button */}
                <div className="pt-3">
                  <button
                    onClick={() => handleBookProject(project.title)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-extrabold text-black bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C69341] hover:shadow-glow-gold hover:scale-[1.03] active:scale-[0.98] transition-all shadow-lg border border-white/30"
                  >
                    <Calendar className="w-4 h-4 text-black" />
                    <span>Get a Website Like This</span>
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </button>
                </div>
              </div>

              {/* Right/Browser Window Column with 2-Second Auto-Cycling Slides */}
              <div
                className={`relative ${
                  isEven ? 'lg:col-span-7 lg:order-1' : 'lg:col-span-7 lg:order-2'
                }`}
              >
                {/* Ambient Radial Glow Anchor */}
                <div
                  className="absolute inset-0 rounded-3xl blur-3xl opacity-20 pointer-events-none -z-10"
                  style={{
                    backgroundColor: project.accentColor || '#C69341',
                  }}
                />

                {/* Realistic Cinematic Browser Window with 2s multi-picture cycling */}
                <CinematicBrowserWindow project={project} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

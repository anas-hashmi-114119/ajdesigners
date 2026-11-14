import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Users2,
  Zap,
  Play,
  ArrowUpRight,
  Globe2,
  Layers,
  Sparkles,
  ArrowRight,
  Clock,
  TrendingUp,
} from 'lucide-react';

/**
 * TargetClientSolutions Component
 *
 * 1. Initial State (Unified Card):
 *    - Section arrives as ONE single unified card (max-w: 960px)
 *    - Main Heading ("Tailored Creative Engines for Ambitious Operators") is written directly OVER the card
 * 2. Scroll-Driven Split Transition (Bidirectional Scrubbing):
 *    - As user scrolls down, the overlay heading smoothly dissolves
 *    - The single card splits apart cleanly down the center into TWO distinct cards (Left: Startups, Right: Brands)
 *    - Scrolling back up reverses the transition smoothly, merging back into ONE card with the main heading over it
 * 3. 100% Crisp Vector Text (Fixes Blurriness):
 *    - Pure X-axis translation (zero 2D/3D rotation or skew) preserving ClearType subpixel text antialiasing
 *    - Solid high-contrast #111116 card bodies without nested backdrop-filter blur artifacts
 *    - High-contrast typography (#FFFFFF and #F3F4F6)
 * 4. Compact Scale & Visual-First:
 *    - 180px top visual banners with hover zoom
 *    - 3 concise single-line badges (max 4-5 words each)
 *    - Sleek CTA links
 */
export default function TargetClientSolutions({ onScrollToCalendar }) {
  const sectionRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return true;
  });

  // Sheen light coordinates for cursor spotlight
  const [leftSheen, setLeftSheen] = useState({ x: 50, y: 50, active: false });
  const [rightSheen, setRightSheen] = useState({ x: 50, y: 50, active: false });

  // Responsive breakpoint detector
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Continuous bidirectional scroll scrubbing
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'center 42%'],
  });

  // Smooth spring physics for scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    restDelta: 0.001,
  });

  // Desktop Split Animation Transforms
  // Pure integer X-axis translation (NO rotation to prevent text rasterization/blurriness)
  const leftX = useTransform(smoothProgress, (v) => (isDesktop ? v * -18 : 0));
  const rightX = useTransform(smoothProgress, (v) => (isDesktop ? v * 18 : 0));

  // Center Main Heading Overlay over the unified card:
  // Starts 100% visible, fades and slightly scales out as cards split apart
  const overlayOpacity = useTransform(smoothProgress, (v) => {
    if (!isDesktop) return 0;
    return v >= 0.42 ? 0 : 1 - (v / 0.42);
  });
  const overlayScale = useTransform(smoothProgress, (v) => {
    if (!isDesktop) return 1;
    return v >= 0.42 ? 0.94 : 1 - (v / 0.42) * 0.06;
  });
  const overlayY = useTransform(smoothProgress, (v) => {
    if (!isDesktop) return 0;
    return v >= 0.42 ? -16 : (v / 0.42) * -16;
  });
  const overlayPointerEvents = useTransform(smoothProgress, (v) => {
    if (!isDesktop || v > 0.35) return 'none';
    return 'auto';
  });

  // Card details opacity: subtle fade-in as overlay dissolves
  const cardContentOpacity = useTransform(smoothProgress, (v) => {
    if (!isDesktop) return 1;
    if (v < 0.15) return 0.35;
    if (v > 0.55) return 1;
    return 0.35 + ((v - 0.15) / 0.4) * 0.65;
  });

  // Spotlight Sheen handlers
  const handleLeftMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLeftSheen({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  };

  const handleRightMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRightSheen({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 antialiased"
      style={{
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
      }}
    >
      {/* Mobile-Only Heading (Cards stack cleanly on mobile) */}
      <div className="md:hidden text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-electric-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Users2 className="w-3.5 h-3.5" />
          <span>Target Client Solutions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight leading-tight">
          Tailored Creative Engines for Ambitious Operators.
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
          From startup sprint velocity to enterprise omnichannel scale.
        </p>
      </div>

      {/* Unified-to-Split Stage Container (Max Width 960px) */}
      <div className="relative max-w-[960px] mx-auto">
        {/* ========================================================= */}
        {/* MAIN HEADING OVERLAY (Written OVER the unified card)       */}
        {/* Fades out smoothly as cards split on scroll               */}
        {/* ========================================================= */}
        <motion.div
          style={{
            opacity: overlayOpacity,
            scale: overlayScale,
            y: overlayY,
            pointerEvents: overlayPointerEvents,
          }}
          className="hidden md:flex absolute inset-0 z-30 flex-col items-center justify-center p-8 text-center bg-[#070709]/85 backdrop-blur-[6px] rounded-3xl border border-white/[0.12] shadow-2xl transition-all"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-electric-500/30 text-electric-300 text-xs font-mono font-bold uppercase tracking-wider shadow-md mb-4">
            <Users2 className="w-4 h-4 text-electric-400" />
            <span>Target Client Solutions</span>
          </div>

          {/* Main Prominent Headline */}
          <h2 className="text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight leading-tight max-w-2xl">
            Tailored Creative Engines for <br />
            <span className="gradient-text">Ambitious Operators.</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-3.5 text-sm lg:text-base text-gray-200 max-w-lg leading-relaxed font-normal">
            Choose Your Growth Engine: Validating startup velocity or scaling an established global enterprise.
          </p>

          {/* Dynamic Scroll Indicator */}
          <div className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-mono text-gray-300 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-electric-400 animate-ping" />
            <span>Scroll down to split solutions</span>
            <span className="text-electric-400 font-bold text-sm animate-bounce">↓</span>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* DUAL SPLIT CARDS (Left: Startups, Right: Brands)          */}
        {/* ========================================================= */}
        <div className="flex flex-col md:flex-row items-stretch justify-center relative">
          {/* ------------------------------------------------------- */}
          {/* LEFT CARD: For Startups & SaaS                          */}
          {/* ------------------------------------------------------- */}
          <motion.div
            data-cursor-text="STARTUPS"
            onMouseMove={handleLeftMouseMove}
            onMouseLeave={() => setLeftSheen((s) => ({ ...s, active: false }))}
            style={{ x: leftX }}
            className="w-full md:w-1/2 rounded-3xl bg-[#111116] border border-white/[0.1] hover:border-electric-500/50 p-6 flex flex-col justify-between group relative overflow-hidden shadow-2xl mb-6 md:mb-0 transition-colors duration-300"
          >
            {/* Ambient Radial Hover Backlight */}
            <div className="absolute top-0 right-0 w-52 h-52 bg-electric-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-electric-500/20 transition-all duration-500" />

            {/* Dynamic Cursor Spotlight Sheen */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                opacity: leftSheen.active ? 1 : 0,
                background: `radial-gradient(350px circle at ${leftSheen.x}% ${leftSheen.y}%, rgba(59, 130, 246, 0.15), transparent 70%)`,
              }}
            />

            <motion.div
              style={{
                opacity: isDesktop ? cardContentOpacity : 1,
              }}
              className="relative z-10 flex flex-col h-full justify-between"
            >
              <div>
                {/* 1. Top Visual Banner: 180px Dark SaaS Motion Showcase */}
                <div className="h-[180px] w-full rounded-2xl overflow-hidden relative bg-[#0B0D13] border border-white/[0.08] group-hover:border-electric-500/40 transition-all duration-300 mb-5">
                  <div className="absolute inset-0 p-4 flex flex-col justify-between group-hover:scale-105 transition-transform duration-500">
                    {/* Mockup Mini Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-400" />
                        <span className="w-2 h-2 rounded-full bg-yellow-400" />
                        <span className="w-2 h-2 rounded-full bg-green-400" />
                        <span className="text-[11px] font-mono text-gray-300 ml-1.5 font-semibold">
                          saas-acquisition.live
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-electric-400 bg-electric-500/15 border border-electric-500/30 px-2 py-0.5 rounded-full font-bold">
                        SPRINT S4
                      </span>
                    </div>

                    {/* SVG Vector Growth Chart (Needle-sharp vector lines) */}
                    <div className="relative h-20 w-full my-auto">
                      <svg
                        className="w-full h-full overflow-visible"
                        viewBox="0 0 320 70"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient id="saasCurveGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.45" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 5 62 Q 55 54, 105 44 T 210 24 T 315 8 L 315 68 L 5 68 Z"
                          fill="url(#saasCurveGrad)"
                        />
                        <path
                          d="M 5 62 Q 55 54, 105 44 T 210 24 T 315 8"
                          stroke="#3B82F6"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <circle cx="105" cy="44" r="3.5" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
                        <circle cx="210" cy="24" r="3.5" fill="#60A5FA" stroke="#FFFFFF" strokeWidth="1.5" />
                        <circle cx="315" cy="8" r="5.5" fill="#38BDF8" className="animate-ping" />
                        <circle cx="315" cy="8" r="3.5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="2" />
                      </svg>
                    </div>

                    {/* Banner Bottom Metrics */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-gray-300 pt-1.5 border-t border-white/[0.06]">
                      <span className="text-gray-300">Cohort Retention: 87.4%</span>
                      <span className="text-electric-400 font-bold">Day 30 Velocity</span>
                    </div>
                  </div>

                  {/* Floating Metric Pill 1: 48h Turnaround */}
                  <div className="absolute top-2.5 right-2.5 px-3 py-1 rounded-full bg-[#111116]/95 border border-electric-500/40 text-electric-300 text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-xl">
                    <Clock className="w-3.5 h-3.5 text-electric-400" />
                    <span>48h Turnaround</span>
                  </div>

                  {/* Floating Metric Pill 2: +$48.2k MRR */}
                  <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-[#111116]/95 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-xl">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>+$48.2k MRR</span>
                  </div>
                </div>

                {/* 2. Crisp, High-Contrast Title */}
                <h3 className="text-2xl font-display font-extrabold text-white tracking-tight group-hover:text-electric-300 transition-colors">
                  For Startups & SaaS
                </h3>

                {/* 3. Three Ultra-Concise Single-Line Badges (100% Crisp) */}
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs text-gray-100 font-medium">
                    <div className="w-5 h-5 rounded-md bg-electric-500/15 border border-electric-500/30 text-electric-400 flex items-center justify-center shrink-0">
                      <Zap className="w-3 h-3" />
                    </div>
                    <span>TikTok & Meta Hook Testing</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-gray-100 font-medium">
                    <div className="w-5 h-5 rounded-md bg-electric-500/15 border border-electric-500/30 text-electric-400 flex items-center justify-center shrink-0">
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    </div>
                    <span>Interactive Product UI Motion</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-gray-100 font-medium">
                    <div className="w-5 h-5 rounded-md bg-electric-500/15 border border-electric-500/30 text-electric-400 flex items-center justify-center shrink-0">
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                    <span>High-Converting Landing Pages</span>
                  </div>
                </div>
              </div>

              {/* 4. Sleek Footer CTA Link */}
              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-[11px] font-mono text-gray-400 font-medium">
                  Early Stage & Series A
                </span>
                <a
                  href="#booking-calendar"
                  onClick={onScrollToCalendar}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-electric-400 hover:text-white group-hover:text-electric-300 transition-colors"
                >
                  <span>Book Startup Growth Call</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* ------------------------------------------------------- */}
          {/* RIGHT CARD: For Established Brands & Agencies           */}
          {/* ------------------------------------------------------- */}
          <motion.div
            data-cursor-text="BRANDS"
            onMouseMove={handleRightMouseMove}
            onMouseLeave={() => setRightSheen((s) => ({ ...s, active: false }))}
            style={{ x: rightX }}
            className="w-full md:w-1/2 rounded-3xl bg-[#111116] border border-white/[0.1] hover:border-purple-brand/50 p-6 flex flex-col justify-between group relative overflow-hidden shadow-2xl transition-colors duration-300"
          >
            {/* Ambient Radial Hover Backlight */}
            <div className="absolute top-0 right-0 w-52 h-52 bg-purple-brand/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-brand/20 transition-all duration-500" />

            {/* Dynamic Cursor Spotlight Sheen */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                opacity: rightSheen.active ? 1 : 0,
                background: `radial-gradient(350px circle at ${rightSheen.x}% ${rightSheen.y}%, rgba(139, 92, 246, 0.15), transparent 70%)`,
              }}
            />

            <motion.div
              style={{
                opacity: isDesktop ? cardContentOpacity : 1,
              }}
              className="relative z-10 flex flex-col h-full justify-between"
            >
              <div>
                {/* 1. Top Visual Banner: 180px Luxury Omnichannel Showcase */}
                <div className="h-[180px] w-full rounded-2xl overflow-hidden relative bg-[#0B0D13] border border-white/[0.08] group-hover:border-purple-brand/40 transition-all duration-300 mb-5">
                  <div className="absolute inset-0 p-4 flex flex-col justify-between group-hover:scale-105 transition-transform duration-500">
                    {/* Mockup Mini Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-purple-brand" />
                        <span className="text-[11px] font-mono text-purple-soft font-bold">
                          OMNICHANNEL PIPELINE
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                        MULTI-REGION
                      </span>
                    </div>

                    {/* Regional Node Matrix */}
                    <div className="grid grid-cols-4 gap-2 my-auto">
                      {[
                        { code: 'US', label: 'EST / PST' },
                        { code: 'UK', label: 'GMT' },
                        { code: 'UAE', label: 'GST' },
                        { code: 'EU', label: 'CET' },
                      ].map((loc, i) => (
                        <div
                          key={i}
                          className="p-2 rounded-xl bg-[#151022] border border-white/[0.08] text-center"
                        >
                          <div className="flex items-center justify-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-brand animate-ping" />
                            <span className="text-xs font-mono font-bold text-white">
                              {loc.code}
                            </span>
                          </div>
                          <span className="text-[8px] font-mono text-purple-soft block mt-0.5">
                            {loc.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Banner Bottom Metrics */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-gray-300 pt-1.5 border-t border-white/[0.06]">
                      <span className="text-gray-300">ROAS Target: 3.8x</span>
                      <span className="text-purple-soft font-bold">Meta + TikTok Active</span>
                    </div>
                  </div>

                  {/* Floating Metric Badge 1: 6 Continents */}
                  <div className="absolute top-2.5 right-2.5 px-3 py-1 rounded-full bg-[#111116]/95 border border-purple-brand/40 text-purple-soft text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-xl">
                    <Globe2 className="w-3.5 h-3.5 text-purple-brand" />
                    <span>6 Continents</span>
                  </div>

                  {/* Floating Metric Badge 2: 100+ Assets/mo */}
                  <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-[#111116]/95 border border-purple-brand/40 text-white text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-xl">
                    <Layers className="w-3.5 h-3.5 text-purple-brand" />
                    <span>100+ Assets / mo</span>
                  </div>
                </div>

                {/* 2. Crisp, High-Contrast Title */}
                <h3 className="text-2xl font-display font-extrabold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                  For Established Brands & Agencies
                </h3>

                {/* 3. Three Ultra-Concise Single-Line Badges (100% Crisp) */}
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs text-gray-100 font-medium">
                    <div className="w-5 h-5 rounded-md bg-purple-brand/15 border border-purple-brand/30 text-purple-brand flex items-center justify-center shrink-0">
                      <Globe2 className="w-3 h-3" />
                    </div>
                    <span>Omnichannel Global Distribution</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-gray-100 font-medium">
                    <div className="w-5 h-5 rounded-md bg-purple-brand/15 border border-purple-brand/30 text-purple-brand flex items-center justify-center shrink-0">
                      <Layers className="w-3 h-3" />
                    </div>
                    <span>AI Localized Video Dubbing</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-gray-100 font-medium">
                    <div className="w-5 h-5 rounded-md bg-purple-brand/15 border border-purple-brand/30 text-purple-brand flex items-center justify-center shrink-0">
                      <Sparkles className="w-3 h-3" />
                    </div>
                    <span>3D Luxury Brand Systems</span>
                  </div>
                </div>
              </div>

              {/* 4. Sleek Footer CTA Link */}
              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-[11px] font-mono text-gray-400 font-medium">
                  High-Growth & Enterprise
                </span>
                <a
                  href="#booking-calendar"
                  onClick={onScrollToCalendar}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-brand hover:text-white group-hover:text-purple-soft transition-colors"
                >
                  <span>Book Enterprise Call</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

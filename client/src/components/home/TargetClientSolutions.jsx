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
 * Pinned Scroll-Driven Split-Card Target Client Solutions
 *
 * Sticky/Pinned Scroll Behavior:
 * 1. Arrives in viewport as ONE single unified card with the Main Heading over it.
 * 2. Pins in place (does not move down the page while splitting).
 * 3. User has scroll runway (0.0 to 0.20 progress) to comfortably read the heading and subtitle.
 * 4. As user continues scrolling (0.20 to 0.75 progress), the heading overlay dissolves and the
 *    card splits apart into two beautifully transitioned cards (Left: Startups, Right: Brands).
 * 5. Once fully split (progress >= 0.75), the section holds and then unpins naturally as user
 *    scrolls down into the next section.
 * 6. Scrolling back up reverses the sequence smoothly, merging back into ONE card.
 * 7. Text is 100% vector-crisp (zero 2D/3D rotations, pure X-axis translation).
 */
export default function TargetClientSolutions({ onScrollToCalendar }) {
  const trackRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return true;
  });

  // Sheen spotlight coordinates
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

  // Track scroll through the pinned runway (start when top reaches viewport top, ends when bottom reaches viewport bottom)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Smooth spring physics for scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  // Desktop Split Animation Transforms
  // Phase 1 (0.0 -> 0.20): Card stays unified so user reads heading comfortably
  // Phase 2 (0.20 -> 0.75): Card smoothly splits apart while pinned
  // Phase 3 (0.75 -> 1.0): Fully split, holds until unpinning
  const leftX = useTransform(smoothProgress, [0, 0.2, 0.75, 1], [0, 0, -20, -20]);
  const rightX = useTransform(smoothProgress, [0, 0.2, 0.75, 1], [0, 0, 20, 20]);

  // Main Heading Overlay over unified card:
  // Visible from 0 to 0.20, dissolves smoothly between 0.20 and 0.45
  const overlayOpacity = useTransform(smoothProgress, [0, 0.2, 0.45, 1], [1, 1, 0, 0]);
  const overlayScale = useTransform(smoothProgress, [0, 0.2, 0.45, 1], [1, 1, 0.92, 0.92]);
  const overlayY = useTransform(smoothProgress, [0, 0.2, 0.45, 1], [0, 0, -18, -18]);
  const overlayPointerEvents = useTransform(smoothProgress, (v) => (v > 0.35 ? 'none' : 'auto'));

  // Inner card content opacity: reveals as overlay dissolves
  const cardContentOpacity = useTransform(smoothProgress, [0, 0.22, 0.6, 1], [0.3, 0.3, 1, 1]);

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
    <div
      ref={trackRef}
      className={`relative ${isDesktop ? 'h-[220vh]' : 'h-auto py-16'}`}
      style={{
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
      }}
    >
      {/* Pinned/Sticky Viewport Container (Locks in place on desktop while splitting) */}
      <div
        className={`${
          isDesktop ? 'sticky top-16 lg:top-20 py-8' : 'relative'
        } max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full`}
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
          {/* Holds in place (0 -> 0.20) then dissolves as cards split  */}
          {/* ========================================================= */}
          <motion.div
            style={{
              opacity: overlayOpacity,
              scale: overlayScale,
              y: overlayY,
              pointerEvents: overlayPointerEvents,
            }}
            className="hidden md:flex absolute inset-0 z-30 flex-col items-center justify-center p-8 text-center bg-[#070709]/92 backdrop-blur-[6px] rounded-3xl border border-white/[0.14] shadow-2xl transition-all"
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
            <div className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.12] text-xs font-mono text-gray-300 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-electric-400 animate-ping" />
              <span>Scroll to split solutions</span>
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
              style={{ x: isDesktop ? leftX : 0 }}
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
              style={{ x: isDesktop ? rightX : 0 }}
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
      </div>
    </div>
  );
}

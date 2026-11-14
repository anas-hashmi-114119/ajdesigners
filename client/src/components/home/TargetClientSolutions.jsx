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
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

/**
 * Compact, Scroll-Driven Split-Card Target Client Solutions
 *
 * 1. Continuous Bidirectional Scroll Scrubbing:
 *    - Starts as ONE single, sleek unified glassmorphic card (max-w: 960px) centered below heading
 *    - Center overlay badge ("Choose Your Growth Engine") sits across the middle seam
 *    - As user scrolls down, container smoothly splits into two balanced cards (24px gap, 20px rounded corners)
 *    - As user scrolls up, cards smoothly merge back together into a single card
 * 2. Compact Scale & Visual-First (60% Less Text):
 *    - 180px 16:9 top visual banner with hover zoom
 *    - Left: Dark-mode SaaS UI motion mockup + floating metric pills (48h Turnaround, +$48.2k MRR)
 *    - Right: Luxury 3D studio packaging/omnichannel creative showcase + floating badges (6 Continents, 100+ Assets/mo)
 *    - 3 concise, single-line icon badges (max 4-5 words each)
 *    - Sleek footer CTA links
 * 3. Micro-Interactions:
 *    - Cursor-following radial spotlight glow on hover
 *    - Responsive fallback stacking on mobile (< 768px) without overflow
 */
export default function TargetClientSolutions({ onScrollToCalendar }) {
  const sectionRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Sheen light states for cursor spotlight
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

  // Continuous bidirectional scroll scrubbing with Framer Motion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'center 45%'],
  });

  // Smooth spring physics for scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Desktop Split Animation Transforms
  // Cards start flush (0px gap), split outward to 24px gap (-12px and +12px)
  const leftX = useTransform(smoothProgress, [0, 1], [0, -12]);
  const rightX = useTransform(smoothProgress, [0, 1], [0, 12]);
  const leftRotate = useTransform(smoothProgress, [0, 1], [0, -0.6]);
  const rightRotate = useTransform(smoothProgress, [0, 1], [0, 0.6]);

  // Corner radii: inner corners start square (0px), smoothly curve to full rounded (20px)
  const leftBorderRadius = useTransform(smoothProgress, [0, 1], [0, 20]);
  const rightBorderRadius = useTransform(smoothProgress, [0, 1], [0, 20]);

  // Center badge: fades and scales down as cards split apart
  const centerBadgeOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const centerBadgeScale = useTransform(smoothProgress, [0, 0.4], [1, 0.8]);
  const centerBadgeY = useTransform(smoothProgress, [0, 0.4], [0, -10]);

  // Left card spotlight
  const handleLeftMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLeftSheen({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  };

  // Right card spotlight
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
      className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-electric-400 text-xs font-semibold uppercase tracking-wider shadow-sm mb-4">
          <Users2 className="w-3.5 h-3.5" />
          <span>Target Client Solutions</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
          Tailored Creative Engines for <br className="hidden sm:block" />
          <span className="gradient-text">Ambitious Operators.</span>
        </h2>

        <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
          Whether you are validating product-market fit or scaling an established international enterprise.
        </p>
      </div>

      {/* Unified-to-Split Container (Max Width 960px) */}
      <div className="relative max-w-[960px] mx-auto">
        {/* Floating Center Overlay Badge across Center Seam */}
        <motion.div
          style={{
            opacity: isDesktop ? centerBadgeOpacity : 0,
            scale: isDesktop ? centerBadgeScale : 1,
            y: isDesktop ? centerBadgeY : 0,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none hidden md:flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0B0D13]/95 border border-electric-500/40 text-white font-mono text-[11px] font-bold tracking-wider uppercase shadow-2xl shadow-electric-500/25 backdrop-blur-2xl whitespace-nowrap"
        >
          <span className="w-2 h-2 rounded-full bg-electric-400 animate-ping" />
          <span>Choose Your Growth Engine</span>
          <span className="w-2 h-2 rounded-full bg-purple-brand animate-pulse" />
        </motion.div>

        {/* Dual Cards: Starts flush together at 0% scroll, splits outward on scroll */}
        <div className="flex flex-col md:flex-row items-stretch justify-center relative">
          {/* ========================================================= */}
          {/* LEFT CARD: For Startups & SaaS                            */}
          {/* ========================================================= */}
          <motion.div
            data-cursor-text="STARTUPS"
            onMouseMove={handleLeftMouseMove}
            onMouseLeave={() => setLeftSheen((s) => ({ ...s, active: false }))}
            style={{
              x: isDesktop ? leftX : 0,
              rotate: isDesktop ? leftRotate : 0,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              borderTopRightRadius: isDesktop ? leftBorderRadius : 20,
              borderBottomRightRadius: isDesktop ? leftBorderRadius : 20,
            }}
            className="w-full md:w-1/2 bg-[#111116] border border-white/[0.08] hover:border-electric-500/40 p-5 sm:p-6 flex flex-col justify-between group relative overflow-hidden transition-colors duration-300 shadow-2xl mb-6 md:mb-0"
          >
            {/* Ambient Backlight Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-electric-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-electric-500/20 transition-all duration-500" />

            {/* Dynamic Cursor Spotlight Sheen */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                opacity: leftSheen.active ? 1 : 0,
                background: `radial-gradient(350px circle at ${leftSheen.x}% ${leftSheen.y}%, rgba(59, 130, 246, 0.12), transparent 70%)`,
              }}
            />

            <div className="relative z-10">
              {/* 1. Top Visual Banner: 180px SaaS UI Motion Mockup */}
              <div className="h-[180px] w-full rounded-2xl overflow-hidden relative bg-gradient-to-br from-[#0c1322] via-[#09101d] to-[#060810] border border-white/[0.08] group-hover:border-electric-500/30 transition-all duration-300 mb-5">
                {/* Visual Content: Dark SaaS UI Wireframe with Glowing Vector Curves */}
                <div className="absolute inset-0 p-3.5 flex flex-col justify-between group-hover:scale-105 transition-transform duration-500">
                  {/* Mockup Mini Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400/80" />
                      <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
                      <span className="w-2 h-2 rounded-full bg-green-400/80" />
                      <span className="text-[10px] font-mono text-gray-400 ml-1.5">
                        growth-funnel.saas
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-electric-400 bg-electric-500/10 px-2 py-0.5 rounded-full font-bold">
                      ACTIVE SPRINT
                    </span>
                  </div>

                  {/* SVG SaaS Growth Chart */}
                  <div className="relative h-20 w-full my-auto">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 300 70" fill="none">
                      <defs>
                        <linearGradient id="leftCardGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 5 62 Q 50 55, 95 45 T 195 25 T 295 10 L 295 68 L 5 68 Z"
                        fill="url(#leftCardGrad)"
                      />
                      <path
                        d="M 5 62 Q 50 55, 95 45 T 195 25 T 295 10"
                        stroke="#3B82F6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <circle cx="95" cy="45" r="3" fill="#3B82F6" stroke="#fff" strokeWidth="1.5" />
                      <circle cx="195" cy="25" r="3.5" fill="#60A5FA" stroke="#fff" strokeWidth="1.5" />
                      <circle cx="295" cy="10" r="5" fill="#38BDF8" className="animate-ping" />
                      <circle cx="295" cy="10" r="3.5" fill="#38BDF8" stroke="#fff" strokeWidth="2" />
                    </svg>
                  </div>

                  {/* Visual Bottom Bar */}
                  <div className="flex items-center justify-between text-[9px] font-mono text-gray-400 pt-1 border-t border-white/[0.04]">
                    <span>Cohort Lift: 87.4%</span>
                    <span className="text-electric-400 font-bold">Day 14 Benchmark</span>
                  </div>
                </div>

                {/* Floating Metric Pill 1: 48h Turnaround */}
                <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#0c1220]/90 backdrop-blur-md border border-electric-500/30 text-electric-300 text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-lg">
                  <Clock className="w-3 h-3 text-electric-400" />
                  <span>48h Turnaround</span>
                </div>

                {/* Floating Metric Pill 2: +$48.2k MRR */}
                <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#0c1220]/90 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-lg">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span>+$48.2k MRR</span>
                </div>
              </div>

              {/* 2. Crisp Card Title */}
              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight group-hover:text-electric-300 transition-colors">
                For Startups & SaaS
              </h3>

              {/* 3. Three Ultra-Concise Single-Line Icon Badges */}
              <div className="mt-4 space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <div className="w-5 h-5 rounded-md bg-electric-500/10 border border-electric-500/25 text-electric-400 flex items-center justify-center shrink-0">
                    <Zap className="w-3 h-3" />
                  </div>
                  <span className="font-medium">TikTok & Meta Hook Testing</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <div className="w-5 h-5 rounded-md bg-electric-500/10 border border-electric-500/25 text-electric-400 flex items-center justify-center shrink-0">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <span className="font-medium">Interactive Product UI Motion</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <div className="w-5 h-5 rounded-md bg-electric-500/10 border border-electric-500/25 text-electric-400 flex items-center justify-center shrink-0">
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                  <span className="font-medium">High-Converting Landing Pages</span>
                </div>
              </div>
            </div>

            {/* 4. Sleek Footer CTA Link */}
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between relative z-10">
              <span className="text-[11px] font-mono text-gray-400">
                Early Stage & Series A
              </span>
              <a
                href="#booking-calendar"
                onClick={onScrollToCalendar}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-electric-400 group-hover:text-electric-300 transition-colors"
              >
                <span>Book Startup Growth Call</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* RIGHT CARD: For Established Brands & Agencies            */}
          {/* ========================================================= */}
          <motion.div
            data-cursor-text="BRANDS"
            onMouseMove={handleRightMouseMove}
            onMouseLeave={() => setRightSheen((s) => ({ ...s, active: false }))}
            style={{
              x: isDesktop ? rightX : 0,
              rotate: isDesktop ? rightRotate : 0,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              borderTopLeftRadius: isDesktop ? rightBorderRadius : 20,
              borderBottomLeftRadius: isDesktop ? rightBorderRadius : 20,
            }}
            className="w-full md:w-1/2 bg-[#111116] border border-white/[0.08] hover:border-purple-brand/40 p-5 sm:p-6 flex flex-col justify-between group relative overflow-hidden transition-colors duration-300 shadow-2xl"
          >
            {/* Ambient Backlight Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-brand/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-brand/20 transition-all duration-500" />

            {/* Dynamic Cursor Spotlight Sheen */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                opacity: rightSheen.active ? 1 : 0,
                background: `radial-gradient(350px circle at ${rightSheen.x}% ${rightSheen.y}%, rgba(139, 92, 246, 0.12), transparent 70%)`,
              }}
            />

            <div className="relative z-10">
              {/* 1. Top Visual Banner: 180px Luxury Brand & Omnichannel Showcase */}
              <div className="h-[180px] w-full rounded-2xl overflow-hidden relative bg-gradient-to-br from-[#180d26] via-[#10081c] to-[#070709] border border-white/[0.08] group-hover:border-purple-brand/30 transition-all duration-300 mb-5">
                {/* Visual Content: Studio-Lit Luxury Mockup Showcase */}
                <div className="absolute inset-0 p-3.5 flex flex-col justify-between group-hover:scale-105 transition-transform duration-500">
                  {/* Mockup Mini Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-brand" />
                      <span className="text-[10px] font-mono text-purple-soft font-bold">
                        OMNICHANNEL ENGINE
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
                      MULTI-REGION
                    </span>
                  </div>

                  {/* Synchronized Regional Distribution Grid */}
                  <div className="grid grid-cols-4 gap-1.5 my-auto">
                    {[
                      { code: 'US', label: 'EST' },
                      { code: 'UK', label: 'GMT' },
                      { code: 'UAE', label: 'GST' },
                      { code: 'EU', label: 'CET' },
                    ].map((loc, i) => (
                      <div
                        key={i}
                        className="p-2 rounded-xl bg-[#140b20]/80 border border-white/[0.06] text-center"
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-brand animate-ping" />
                          <span className="text-[11px] font-mono font-bold text-white">
                            {loc.code}
                          </span>
                        </div>
                        <span className="text-[8px] font-mono text-purple-soft block mt-0.5">
                          {loc.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Visual Bottom Bar */}
                  <div className="flex items-center justify-between text-[9px] font-mono text-gray-400 pt-1 border-t border-white/[0.04]">
                    <span>ROAS Benchmark: 3.8x</span>
                    <span className="text-purple-soft font-bold">Multi-Platform Active</span>
                  </div>
                </div>

                {/* Floating Metric Badge 1: 6 Continents */}
                <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#160b24]/90 backdrop-blur-md border border-purple-brand/30 text-purple-soft text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-lg">
                  <Globe2 className="w-3 h-3 text-purple-brand" />
                  <span>6 Continents</span>
                </div>

                {/* Floating Metric Badge 2: 100+ Assets/mo */}
                <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#160b24]/90 backdrop-blur-md border border-purple-brand/30 text-white text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-lg">
                  <Layers className="w-3 h-3 text-purple-brand" />
                  <span>100+ Assets / mo</span>
                </div>
              </div>

              {/* 2. Crisp Card Title */}
              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                For Established Brands & Agencies
              </h3>

              {/* 3. Three Ultra-Concise Single-Line Icon Badges */}
              <div className="mt-4 space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <div className="w-5 h-5 rounded-md bg-purple-brand/15 border border-purple-brand/30 text-purple-brand flex items-center justify-center shrink-0">
                    <Globe2 className="w-3 h-3" />
                  </div>
                  <span className="font-medium">Omnichannel Global Distribution</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <div className="w-5 h-5 rounded-md bg-purple-brand/15 border border-purple-brand/30 text-purple-brand flex items-center justify-center shrink-0">
                    <Layers className="w-3 h-3" />
                  </div>
                  <span className="font-medium">AI Localized Video Dubbing</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <div className="w-5 h-5 rounded-md bg-purple-brand/15 border border-purple-brand/30 text-purple-brand flex items-center justify-center shrink-0">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <span className="font-medium">3D Luxury Brand Systems</span>
                </div>
              </div>
            </div>

            {/* 4. Sleek Footer CTA Link */}
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between relative z-10">
              <span className="text-[11px] font-mono text-gray-400">
                High-Growth & Enterprise
              </span>
              <a
                href="#booking-calendar"
                onClick={onScrollToCalendar}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-brand group-hover:text-purple-soft transition-colors"
              >
                <span>Book Enterprise Call</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import React, { useRef } from 'react';
import { Play, TrendingUp, Sparkles, Flame, CheckCircle2, ArrowUpRight, BarChart2 } from 'lucide-react';

/**
 * Visual Motion Card for Hero Section
 * Replaces text rows with:
 * 1. Live animated SVG growth line chart with glowing data nodes
 * 2. Floating mini video-preview thumbnail with pulsing play equalizer
 * 3. Animated 3D/glassmorphic floating badges (ROAS ring gauge & sparkline)
 * 4. Interactive 3D mouse perspective tilt & gentle continuous floating animation
 */
export default function HeroVisualMotionCard() {
  const cardRef = useRef(null);
  const sheenRef = useRef(null);
  const rafId = useRef(null);
  const rectRef = useRef(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  // Hardware-accelerated mouse tilt with zero React re-renders
  const handleMouseMove = (e) => {
    if (!cardRef.current || !sheenRef.current) return;
    if (!rectRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }

    const rect = rectRef.current;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    const sheenX = (x / rect.width) * 100;
    const sheenY = (y / rect.height) * 100;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
      if (sheenRef.current) {
        sheenRef.current.style.background = `radial-gradient(450px circle at ${sheenX}% ${sheenY}%, rgba(198, 147, 65, 0.16), transparent 70%)`;
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rectRef.current = null;
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
    if (sheenRef.current) {
      sheenRef.current.style.background = 'radial-gradient(450px circle at 50% 50%, rgba(198, 147, 65, 0.16), transparent 70%)';
    }
  };

  return (
    <div className="relative animate-hero-float w-full max-w-lg mx-auto lg:max-w-none">
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative perspective-1000 transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        }}
      >
        {/* Outer ambient glow backlight */}
        <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-gold-500/30 via-gold-400/20 to-bronze/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Main Glassmorphic Card Container */}
      <div className="relative rounded-3xl bg-[#111116]/95 border border-white/[0.1] p-6 shadow-2xl backdrop-blur-2xl overflow-hidden">
        {/* Dynamic Proximity Radial Light Sheen */}
        <div
          ref={sheenRef}
          className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(450px circle at 50% 50%, rgba(198, 147, 65, 0.16), transparent 70%)',
          }}
        />

        {/* 1. Header Bar: Window controls & Live status */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]/90 shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]/90 shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#10B981]/90 shadow-sm" />
            <span className="text-[11px] font-mono text-gray-400 ml-2 select-none">
              aj-growth-engine.live
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-bold uppercase tracking-wider font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Real-time Active</span>
          </div>
        </div>

        {/* 2. Live Animated SVG Growth Line Chart */}
        <div className="mt-5 p-4 rounded-2xl bg-[#181820]/90 border border-white/[0.06] relative z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">
                Omnichannel Velocity Index
              </span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>+240% Lift</span>
              </span>
            </div>
            <span className="text-[10px] font-mono text-gray-500">Live 90-Day Sprint</span>
          </div>

          {/* SVG Animated Chart */}
          <div className="relative h-32 w-full">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 380 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Area Gradient Fill */}
                <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C69341" stopOpacity="0.35" />
                  <stop offset="50%" stopColor="#9E6F24" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#C69341" stopOpacity="0.0" />
                </linearGradient>

                {/* Line Gradient */}
                <linearGradient id="chartStrokeGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#F5D791" />
                  <stop offset="50%" stopColor="#C69341" />
                  <stop offset="100%" stopColor="#DDA74F" />
                </linearGradient>

                {/* Glow Filter */}
                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Dotted Grid Guidelines */}
              <line x1="0" y1="30" x2="380" y2="30" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <line x1="0" y1="70" x2="380" y2="70" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <line x1="0" y1="110" x2="380" y2="110" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

              {/* Area Under Curve */}
              <path
                d="M 10 110 C 60 100, 110 85, 160 70 C 220 52, 270 38, 330 22 C 350 18, 365 14, 375 12 L 375 118 L 10 118 Z"
                fill="url(#chartAreaGrad)"
              />

              {/* Animated Growth Line */}
              <path
                d="M 10 110 C 60 100, 110 85, 160 70 C 220 52, 270 38, 330 22 C 350 18, 365 14, 375 12"
                stroke="url(#chartStrokeGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#neonGlow)"
              />

              {/* Glowing Interactive Data Nodes */}
              {/* Node 1 */}
              <circle cx="160" cy="70" r="4.5" fill="#C69341" stroke="#FFFFFF" strokeWidth="2" />
              {/* Node 2 */}
              <circle cx="270" cy="38" r="4.5" fill="#DDA74F" stroke="#FFFFFF" strokeWidth="2" />

              {/* Peak Node with Animated Ripple */}
              <circle cx="375" cy="12" r="9" fill="#C69341" fillOpacity="0.3" className="animate-ping" />
              <circle cx="375" cy="12" r="5" fill="#F5D791" stroke="#FFFFFF" strokeWidth="2.5" />
            </svg>

            {/* Floating Milestone Pill over Peak Node */}
            <div className="absolute top-1 right-2 px-2.5 py-1 rounded-full bg-[#111116] border border-gold-500/40 text-[9px] font-mono font-bold text-white shadow-glow-gold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span>Scale Stage: Day 42</span>
            </div>
          </div>
        </div>

        {/* 3. Middle Visual Split: Mini Video-Preview with Equalizer + ROAS Ring Gauge */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-3.5 relative z-10">
          {/* Left: Floating Mini Video Preview Thumbnail with Pulsing Equalizer */}
          <div className="sm:col-span-7 p-3 rounded-2xl bg-[#181820]/90 border border-white/[0.08] flex items-center gap-3 group/thumb">
            {/* 9:16 Video Thumbnail Container */}
            <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80"
                alt="AI UGC Ad Preview"
                className="w-full h-full object-cover opacity-85 group-hover/thumb:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Centered Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#C69341] via-[#DDA74F] to-[#8A5D20] text-black flex items-center justify-center shadow-glow-gold group-hover/thumb:scale-110 transition-transform">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
              </div>

              {/* Duration badge */}
              <span className="absolute bottom-1 right-1 text-[8px] font-mono text-white/90 bg-black/60 px-1 rounded">
                0:28
              </span>
            </div>

            {/* Video Info & Dancing Audio Equalizer */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider truncate">
                  AI UGC Ad Creative
                </span>
                <span className="text-[8px] bg-gold-500/20 text-gold-300 px-1.5 py-0.5 rounded font-mono font-bold">
                  4K
                </span>
              </div>
              <p className="text-[10px] text-gray-400 truncate mt-0.5 font-mono">
                Retention Pacing: 87.4%
              </p>

              {/* Live Dancing Soundwave Equalizer */}
              <div className="mt-2.5 flex items-center gap-1">
                <span className="text-[9px] font-mono text-gold-400 font-bold mr-1">AUDIO</span>
                <div className="flex items-end gap-[3px] h-4">
                  <span className="w-1 bg-gold-400 rounded-full animate-equalizer-1" />
                  <span className="w-1 bg-[#DDA74F] rounded-full animate-equalizer-2" />
                  <span className="w-1 bg-[#F5D791] rounded-full animate-equalizer-3" />
                  <span className="w-1 bg-emerald-400 rounded-full animate-equalizer-4" />
                  <span className="w-1 bg-[#C69341] rounded-full animate-equalizer-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Spinning 3D/Glassmorphic ROAS Ring Gauge Badge */}
          <div className="sm:col-span-5 p-3 rounded-2xl bg-[#181820]/90 border border-white/[0.08] flex items-center gap-3">
            {/* Circular Progress Gauge */}
            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 44 44">
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="3.5"
                />
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="3.5"
                  strokeDasharray="113"
                  strokeDashoffset="26" // ~77% fill
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F5D791" />
                    <stop offset="100%" stopColor="#C69341" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-display font-extrabold text-white leading-none">
                  3.8x
                </span>
                <span className="text-[8px] font-mono text-gold-400 font-bold leading-none mt-0.5">
                  ROAS
                </span>
              </div>
            </div>

            {/* Gauge Context */}
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-white block uppercase tracking-wider font-mono">
                Paid Ads
              </span>
              <span className="text-[10px] text-gray-400 block mt-0.5">
                Meta & TikTok
              </span>
              <span className="text-[9px] text-emerald-400 font-mono font-bold block mt-0.5">
                +62% CPA Drop
              </span>
            </div>
          </div>
        </div>

        {/* 4. Bottom Activity Pulse Bar */}
        <div className="mt-4 pt-3.5 border-t border-white/[0.08] flex items-center justify-between text-xs text-gray-400 relative z-10 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-[11px] text-gray-300">
              Strategy: Yashwa & Aroosa
            </span>
          </div>
          <span className="text-[10px] text-gold-300 bg-gold-500/15 px-2.5 py-0.5 rounded-full border border-gold-500/30">
            Sprint 14 of 30
          </span>
        </div>
      </div>
    </div>
  </div>
);
}

import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowUpRight,
  Cpu,
  Share2,
  TrendingUp,
  Palette,
  Monitor,
  Play,
  Flame,
} from 'lucide-react';

/**
 * SpotlightCard: Calculates relative mouse position to draw a subtle cursor-following radial glow
 */
function BentoCard({ children, className = '', onClick }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative rounded-3xl bg-[#111116] border border-white/[0.08] p-7 transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:border-white/20 hover:shadow-2xl ${className}`}
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(420px circle at ${coords.x}px ${coords.y}px, rgba(59, 130, 246, 0.12), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

export default function EverythingWeHandleBento() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-purple-soft text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-purple-brand" />
          <span>360° Creative & Performance Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
          Everything We Handle.
        </h2>
        <p className="mt-3 text-base text-gray-400">
          A cohesive creative and performance marketing engine engineered for modern digital algorithms.
        </p>
      </div>

      {/* 6-Card Interactive Bento Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* CARD 1: AI UGC Video Production */}
        <BentoCard>
          <div className="relative z-10">
            {/* Header row */}
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-2xl bg-electric-500/10 border border-electric-400/20 text-electric-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-electric-500/20 transition-all shadow-glow-blue">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-electric-400 bg-electric-500/10 px-2.5 py-1 rounded-full border border-electric-500/20">
                Flagship Discipline
              </span>
            </div>

            <h3 className="text-xl font-display font-bold text-white group-hover:text-electric-300 transition-colors">
              AI UGC Video Production
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed">
              Hyper-realistic creator video ads engineered with high-retention hooks and viral pacing for TikTok & Meta.
            </p>

            {/* Visual Micro-Widget: 9:16 Video Frame with Sound Equalizer */}
            <div className="mt-5 p-3.5 rounded-2xl bg-[#16161d] border border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-12 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center relative overflow-hidden shrink-0">
                  <Play className="w-3.5 h-3.5 text-electric-400 fill-electric-400/30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-electric-500/20 to-transparent" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>00:03 Hook Loop</span>
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono">45 Variations / Sprint</div>
                </div>
              </div>

              {/* Dancing Waveform Equalizer */}
              <div className="flex items-end gap-1 h-6 px-2 py-1 rounded bg-black/40 border border-white/5">
                <span className="w-1 bg-electric-400 rounded-full animate-pulse h-3" />
                <span className="w-1 bg-purple-brand rounded-full animate-pulse h-5" style={{ animationDelay: '150ms' }} />
                <span className="w-1 bg-electric-400 rounded-full animate-pulse h-2" style={{ animationDelay: '300ms' }} />
                <span className="w-1 bg-purple-brand rounded-full animate-pulse h-4" style={{ animationDelay: '450ms' }} />
                <span className="w-1 bg-electric-400 rounded-full animate-pulse h-5" style={{ animationDelay: '200ms' }} />
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
            <span className="text-gray-400">48h Delivery</span>
            <Link
              to="/services/ai-powered-creative-production"
              className="inline-flex items-center gap-1 text-electric-400 hover:text-white font-semibold transition-colors"
            >
              <span>Explore</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </BentoCard>

        {/* CARD 2: Social Media Architecture */}
        <BentoCard>
          <div className="relative z-10">
            {/* Header row */}
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-2xl bg-purple-brand/10 border border-purple-500/20 text-purple-300 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-brand/20 transition-all shadow-glow-purple">
                <Share2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-300 bg-purple-brand/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                Omnichannel Sync
              </span>
            </div>

            <h3 className="text-xl font-display font-bold text-white group-hover:text-purple-200 transition-colors">
              Social Media Architecture
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed">
              Full-funnel organic content distribution across Instagram, TikTok, LinkedIn, and X without founder burnout.
            </p>

            {/* Visual Micro-Widget: Omnichannel Matrix Badges */}
            <div className="mt-5 p-3.5 rounded-2xl bg-[#16161d] border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-400 font-mono">Channel Grid</span>
                <span className="text-emerald-400 font-semibold font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Active 09:30 AM EST
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 pt-1">
                {['LinkedIn', 'TikTok', 'Instagram', 'Twitter/X'].map((net) => (
                  <div
                    key={net}
                    className="p-1.5 rounded-lg bg-black/40 border border-white/[0.06] text-center text-[10px] text-gray-300 font-semibold truncate group-hover:border-purple-brand/30 transition-colors"
                  >
                    {net}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
            <span className="text-gray-400">30+ Assets/Mo</span>
            <Link
              to="/services/social-media-management"
              className="inline-flex items-center gap-1 text-purple-300 hover:text-white font-semibold transition-colors"
            >
              <span>Explore</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </BentoCard>

        {/* CARD 3: Meta & TikTok Paid Ads */}
        <BentoCard>
          <div className="relative z-10">
            {/* Header row */}
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Performance ROAS
              </span>
            </div>

            <h3 className="text-xl font-display font-bold text-white group-hover:text-emerald-300 transition-colors">
              Meta & TikTok Paid Ads
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed">
              Algorithmic targeting, systematic creative testing, and weekly optimization scaling profitable ad spend.
            </p>

            {/* Visual Micro-Widget: ROAS & CPA Trend Sparkline */}
            <div className="mt-5 p-3.5 rounded-2xl bg-[#16161d] border border-white/[0.06] flex items-center justify-between">
              <div>
                <div className="text-[10px] text-gray-400 font-mono uppercase">Acquisition Cost</div>
                <div className="text-base font-bold text-white font-mono flex items-center gap-1.5 mt-0.5">
                  <span>-58% CPA</span>
                  <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/15 px-1.5 py-0.5 rounded">
                    3.8x ROAS
                  </span>
                </div>
              </div>

              {/* Mini Sparkline SVG */}
              <div className="w-24 h-8">
                <svg viewBox="0 0 100 35" className="w-full h-full overflow-visible">
                  <path
                    d="M 0,28 Q 20,24 35,18 T 70,10 T 100,4"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="100" cy="4" r="3.5" fill="#10b981" className="animate-pulse" />
                </svg>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
            <span className="text-gray-400">Weekly Audits</span>
            <Link
              to="/services/paid-campaigns"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-white font-semibold transition-colors"
            >
              <span>Explore</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </BentoCard>

        {/* CARD 4: Brand Identity & Design Systems */}
        <BentoCard>
          <div className="relative z-10">
            {/* Header row */}
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500/20 transition-all">
                <Palette className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                Luxury Standard
              </span>
            </div>

            <h3 className="text-xl font-display font-bold text-white group-hover:text-amber-300 transition-colors">
              Brand & Design Systems
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed">
              Timeless dark-mode visual identities, custom typography tokens, and design systems for global prestige.
            </p>

            {/* Visual Micro-Widget: Color Token & Typography Kit */}
            <div className="mt-5 p-3.5 rounded-2xl bg-[#16161d] border border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-[#070709] border border-white/20 shadow-sm" title="#070709" />
                <span className="w-5 h-5 rounded-md bg-[#3B82F6] shadow-sm" title="#3B82F6" />
                <span className="w-5 h-5 rounded-md bg-[#8B5CF6] shadow-sm" title="#8B5CF6" />
                <span className="w-5 h-5 rounded-md bg-white shadow-sm" title="#FFFFFF" />
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-gray-300 font-bold">Aa • Inter / Display</span>
                <div className="text-[10px] text-gray-500 font-mono">100% Vector IP</div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
            <span className="text-gray-400">Full Guidelines</span>
            <Link
              to="/services/brand-design-system"
              className="inline-flex items-center gap-1 text-amber-400 hover:text-white font-semibold transition-colors"
            >
              <span>Explore</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </BentoCard>

        {/* CARD 5: Performance Ad Creatives */}
        <BentoCard>
          <div className="relative z-10">
            {/* Header row */}
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-rose-500/20 transition-all">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                A/B Hook Engine
              </span>
            </div>

            <h3 className="text-xl font-display font-bold text-white group-hover:text-rose-300 transition-colors">
              Performance Ad Creatives
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed">
              Scroll-stopping static ads, carousels, and visual disruption assets tested systematically to beat ad fatigue.
            </p>

            {/* Visual Micro-Widget: A/B Hook Battle Progress */}
            <div className="mt-5 p-3.5 rounded-2xl bg-[#16161d] border border-white/[0.06] space-y-2">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 mb-1">
                  <span>Variant A (Pain-Point Disruptor)</span>
                  <span className="text-rose-400 font-bold">84% Retention</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-black/50 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full w-[84%]" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 mb-1">
                  <span>Variant B (Curiosity Angle)</span>
                  <span className="text-gray-400 font-semibold">61% Retention</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-black/50 overflow-hidden">
                  <div className="h-full bg-white/20 rounded-full w-[61%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
            <span className="text-gray-400">Continuous Sprints</span>
            <Link
              to="/services/performance-creative-production"
              className="inline-flex items-center gap-1 text-rose-400 hover:text-white font-semibold transition-colors"
            >
              <span>Explore</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </BentoCard>

        {/* CARD 6: Conversion Landing Pages */}
        <BentoCard>
          <div className="relative z-10">
            {/* Header row */}
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                <Monitor className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                Speed & Conversion
              </span>
            </div>

            <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
              Conversion Landing Pages
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed">
              Ultra-fast, Next-gen landing pages with smooth WebGL micro-interactions turning cold ad traffic into revenue.
            </p>

            {/* Visual Micro-Widget: Mini Browser & 99 PageSpeed Gauge */}
            <div className="mt-5 p-3.5 rounded-2xl bg-[#16161d] border border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shadow-sm">
                  99
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white">Lighthouse Performance</div>
                  <div className="text-[10px] text-gray-400 font-mono">0.6s First Contentful Paint</div>
                </div>
              </div>
              <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-mono">
                WebGL Ready
              </span>
            </div>
          </div>

          <div className="relative z-10 mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
            <span className="text-gray-400">High-Converting</span>
            <Link
              to="/services/landing-page-design"
              className="inline-flex items-center gap-1 text-cyan-400 hover:text-white font-semibold transition-colors"
            >
              <span>Explore</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </BentoCard>

      </div>
    </section>
  );
}

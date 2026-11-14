import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Flame,
  TrendingUp,
  BarChart3,
  LayoutGrid,
  Play,
} from 'lucide-react';

const servicesData = [
  {
    id: '01',
    title: 'AI-Powered UGC Ads',
    slug: 'ai-powered-content',
    tagline: 'Hyper-realistic AI creator videos engineered for virality & high ROAS.',
    marquee:
      'AI CREATOR AVATARS • 9:16 VERTICAL HOOKS • MULTI-VOICEOVER DUBBING • 48H SPRINT • HIGH ROAS • RAPID A/B TESTING',
    previewBadge: 'High-Velocity Conversion',
    previewTitle: 'AI UGC Ad Creative Matrix',
    previewMetric: '87.4% Hook Retention',
    previewSub: '48h Asset Sprint Delivery',
    type: 'ugc',
  },
  {
    id: '02',
    title: 'Social Media Management',
    slug: 'social-media-management',
    tagline: 'End-to-end strategic content calendars, copywriting & community distribution.',
    marquee:
      'OMNICHANNEL DISTRIBUTION • INSTAGRAM REELS • LINKEDIN THOUGHT LEADERSHIP • TIKTOK ALGORITHM MASTERY • COMMUNITY ENGAGEMENT',
    previewBadge: 'Omnichannel Scale',
    previewTitle: 'Organic Growth Engine',
    previewMetric: '+240% Reach Lift',
    previewSub: '12 Carousels & 16 Reels / mo',
    type: 'social',
  },
  {
    id: '03',
    title: 'Performance Paid Campaigns',
    slug: 'digital-advertising',
    tagline: 'Full-funnel Meta, TikTok, and Google ad management driving qualified pipeline.',
    marquee:
      'META ADS SPECIALIST • TIKTOK PIXEL SCALING • GOOGLE SEARCH & DISPLAY • LOW CPA • MAX ROAS • DATA ATTRIBUTION',
    previewBadge: 'Target ROAS Focus',
    previewTitle: 'Paid Acquisition Engine',
    previewMetric: '3.8x Target ROAS',
    previewSub: '-62% Average CPA Drop',
    type: 'ads',
  },
  {
    id: '04',
    title: 'Brand & Graphic Design',
    slug: 'graphic-design-branding',
    tagline: 'Bespoke design systems, 3D motion assets, and high-ticket visual collateral.',
    marquee:
      'LUXURY DESIGN SYSTEMS • 3D PACKAGING RENDERS • PITCH DECKS • WEBGL LANDING PAGES • GLOBAL BRAND GUIDELINES',
    previewBadge: 'Visual Prestige',
    previewTitle: '3D Luxury Brand System',
    previewMetric: '100% Bespoke Identity',
    previewSub: 'Global Guidelines & Collateral',
    type: 'brand',
  },
];

export default function CoreServicesShowcase() {
  const [activeServiceId, setActiveServiceId] = useState('01');
  const activeService = servicesData.find((s) => s.id === activeServiceId) || servicesData[0];

  return (
    <section id="services-section" className="py-24 bg-[#09090d] border-y border-white/[0.08] relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-electric-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-purple-brand/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-electric-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Service Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              Interactive Core Services.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed">
              Hover over each discipline to preview its live tactical execution stack and explore how we drive scalable growth for ambitious international brands.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-electric-400 hover:text-white px-5 py-3 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-electric-400/40 hover:bg-white/[0.08] transition-all duration-200 self-start md:self-auto shrink-0 shadow-sm"
          >
            <span>View All 10 Agency Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dual-Column Interactive Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Service Rows (7 Cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            {servicesData.map((service) => {
              const isActive = activeServiceId === service.id;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveServiceId(service.id)}
                  onClick={() => setActiveServiceId(service.id)}
                  data-cursor-text="EXPLORE"
                  className={`rounded-2xl transition-all duration-300 overflow-hidden cursor-pointer border ${
                    isActive
                      ? 'bg-[#14141c] border-electric-500/60 shadow-glow-blue'
                      : 'bg-[#111116] border-white/[0.08] hover:border-white/20 hover:bg-[#14141a]'
                  }`}
                >
                  <div className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-5">
                      <span
                        className={`font-mono text-base font-extrabold transition-colors ${
                          isActive ? 'text-electric-400' : 'text-gray-400'
                        }`}
                      >
                        {service.id}.
                      </span>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-300 mt-1 leading-relaxed">
                          {service.tagline}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={`/services/${service.slug}`}
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full border transition-all shrink-0 self-start sm:self-auto ${
                        isActive
                          ? 'bg-electric-500/15 border-electric-500/40 text-electric-300 hover:bg-electric-500 hover:text-white'
                          : 'bg-white/[0.03] border-white/[0.08] text-gray-300 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <span>Deep Dive</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Kinetic Marquee Strip revealed on active/hover */}
                  {isActive && (
                    <div className="py-2.5 bg-gradient-to-r from-electric-500 via-blue-600 to-purple-brand text-white overflow-hidden animate-in fade-in duration-300">
                      <div className="animate-marquee-fast flex items-center gap-8 text-[11px] font-mono font-bold tracking-widest uppercase">
                        <span>{service.marquee}</span>
                        <span>•</span>
                        <span>{service.marquee}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Live Visual Preview Panel (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-3xl bg-[#111116] border border-white/[0.1] p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              {/* Dynamic Ambient Background Sheen */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-electric-500/15 to-purple-brand/15 rounded-full blur-3xl pointer-events-none" />

              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <span className="text-[11px] font-mono text-gray-400 ml-2 font-semibold">
                    live-preview://{activeService.slug}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-electric-400 bg-electric-500/10 border border-electric-500/20 px-2.5 py-0.5 rounded-full">
                  {activeService.previewBadge}
                </span>
              </div>

              {/* Dynamic Visual Content morphing based on activeService.type */}
              <div className="my-6 relative z-10 min-h-[260px] flex flex-col justify-center">
                {activeService.type === 'ugc' && (
                  <div className="p-4 rounded-2xl bg-[#161620] border border-white/[0.08] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                        <Flame className="w-4 h-4 text-electric-400" />
                        AI UGC Video Engine
                      </span>
                      <span className="text-[10px] font-mono bg-electric-500/20 text-electric-300 px-2 py-0.5 rounded font-bold">
                        4K Vertical 9:16
                      </span>
                    </div>

                    <div className="relative h-36 rounded-xl overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center group">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                        alt="AI UGC Ad"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-electric-500 text-white flex items-center justify-center shadow-glow-blue">
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        </div>
                        <span className="text-[10px] font-mono text-white mt-2 font-bold bg-black/70 px-2 py-0.5 rounded">
                          AI Creator Avatar #04
                        </span>
                      </div>
                    </div>

                    {/* Soundwave equalizer */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-gray-300 pt-2 border-t border-white/[0.06]">
                      <span>Dynamic Hook Dubbing</span>
                      <div className="flex items-end gap-1 h-3.5">
                        <span className="w-1 bg-electric-400 rounded-full animate-equalizer-1" />
                        <span className="w-1 bg-purple-brand rounded-full animate-equalizer-2" />
                        <span className="w-1 bg-blue-400 rounded-full animate-equalizer-3" />
                        <span className="w-1 bg-emerald-400 rounded-full animate-equalizer-4" />
                      </div>
                    </div>
                  </div>
                )}

                {activeService.type === 'social' && (
                  <div className="p-4 rounded-2xl bg-[#161620] border border-white/[0.08] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        Omnichannel Distribution
                      </span>
                      <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                        Synchronized
                      </span>
                    </div>

                    {/* Social Post Grid preview */}
                    <div className="grid grid-cols-3 gap-2.5">
                      {['Reels & TikTok', 'LinkedIn Carousels', 'IG Stories & Grid'].map((chan, i) => (
                        <div key={i} className="p-3 rounded-xl bg-[#1c1c28] border border-white/[0.06] text-center">
                          <span className="text-xs font-display font-extrabold text-white block">
                            {i === 0 ? '16/mo' : i === 1 ? '12/mo' : '24/mo'}
                          </span>
                          <span className="text-[9px] font-mono text-gray-400 mt-1 block truncate">
                            {chan}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-white/[0.06] flex items-center justify-between text-xs">
                      <span className="text-gray-300 font-medium">Algorithmic Velocity</span>
                      <span className="font-mono text-emerald-400 font-bold">+240% Engagement</span>
                    </div>
                  </div>
                )}

                {activeService.type === 'ads' && (
                  <div className="p-4 rounded-2xl bg-[#161620] border border-white/[0.08] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-electric-400" />
                        Meta & TikTok Ads Scaling
                      </span>
                      <span className="text-[10px] font-mono bg-electric-500/20 text-electric-300 px-2 py-0.5 rounded font-bold">
                        Pixel Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-[#1c1c28] border border-white/[0.06]">
                        <span className="text-[10px] font-mono text-gray-400 block uppercase">
                          Target ROAS
                        </span>
                        <span className="text-2xl font-display font-extrabold text-electric-400 mt-1 block">
                          3.8x
                        </span>
                        <span className="text-[9px] font-mono text-emerald-400 block mt-0.5">
                          ↑ +0.9x over benchmark
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#1c1c28] border border-white/[0.06]">
                        <span className="text-[10px] font-mono text-gray-400 block uppercase">
                          CPA Reduction
                        </span>
                        <span className="text-2xl font-display font-extrabold text-purple-soft mt-1 block">
                          -62%
                        </span>
                        <span className="text-[9px] font-mono text-purple-300 block mt-0.5">
                          Lowest acquisition cost
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 pt-1">
                      <span>Live Budget Attribution:</span>
                      <span className="text-white font-bold">US, UK, UAE & EU Markets</span>
                    </div>
                  </div>
                )}

                {activeService.type === 'brand' && (
                  <div className="p-4 rounded-2xl bg-[#161620] border border-white/[0.08] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                        <LayoutGrid className="w-4 h-4 text-purple-brand" />
                        Luxury Design Systems
                      </span>
                      <span className="text-[10px] font-mono bg-purple-brand/20 text-purple-soft px-2 py-0.5 rounded font-bold">
                        Bespoke
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#1c1c28] border border-white/[0.06] flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-electric-500 to-purple-brand flex items-center justify-center font-display font-extrabold text-white text-lg shrink-0 shadow-glow-purple">
                        AJ
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">
                          3D Spatial Identity & Tokens
                        </h4>
                        <p className="text-[11px] font-mono text-gray-400 mt-0.5">
                          Inter • Plus Jakarta Sans • Dark Navy Palette
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-gray-300">
                      <span className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                        3D Packaging
                      </span>
                      <span className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                        Pitch Decks
                      </span>
                      <span className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                        WebGL UI
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Metrics Bar */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between relative z-10 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 block uppercase">
                    Execution Metric
                  </span>
                  <span className="text-sm font-display font-bold text-white">
                    {activeService.previewMetric}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-gray-400 block uppercase">
                    Delivery Speed
                  </span>
                  <span className="text-sm font-display font-bold text-electric-400">
                    {activeService.previewSub}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

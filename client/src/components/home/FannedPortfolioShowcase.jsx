import React, { useState } from 'react';
import { X, ArrowUpRight, Sparkles, CheckCircle2, Layers, Monitor, Smartphone, LayoutGrid } from 'lucide-react';

const FANNED_PROJECTS = [
  {
    id: 'ai-ugc',
    title: 'AI UGC Video Ad Engine',
    category: 'E-Commerce & DTC Apparel',
    rotation: '-rotate-6 hover:rotate-0',
    metrics: '+340% ROAS • 48h Turnaround • 45 Variations',
    deliverables: [
      '45x High-converting 9:16 AI-generated UGC video variations',
      'Data-backed hook testing framework for Meta & TikTok Ads',
      'Multi-voiceover AI dubbing (US, UK, and Australian accents)',
      'Dynamic motion captions with sound design & viral pacing',
    ],
    results: 'Cut creative production costs by 62% while boosting ad spend profitability to 3.4x ROAS across international ad accounts.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    typeBadge: 'AI Video Ads',
    icon: Smartphone,
  },
  {
    id: 'b2b-saas',
    title: 'B2B SaaS Growth & Funnel Engine',
    category: 'Enterprise Tech & Cloud Infrastructure',
    rotation: 'rotate-0 scale-105 z-10 hover:scale-110',
    metrics: '2.4x Inbound Demos • 80+ Assets • Multi-Platform',
    deliverables: [
      'Full LinkedIn & Twitter/X executive content calendar',
      'Interactive product UI animations and carousel deck assets',
      'High-converting landing page art direction and 3D mockups',
      'Monthly data analytics with audience sentiment tracking',
    ],
    results: 'Generated 240+ qualified enterprise sales inquiries and doubled organic LinkedIn follower velocity in 90 days.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    typeBadge: 'Flagship Growth',
    icon: Monitor,
  },
  {
    id: 'luxury-brand',
    title: 'Veloce Luxury Brand Identity System',
    category: 'Luxury Goods & Global Retail (Dubai/Zurich)',
    rotation: 'rotate-6 hover:rotate-0',
    metrics: '360° Visual System • 3D Packaging • Global Collateral',
    deliverables: [
      'Master brand guidelines with custom typography rules',
      '3D luxury packaging renders and urban billboard mockups',
      'High-aesthetic Instagram aesthetic grid & editorial carousels',
      'Print collateral, lookbooks, and VIP event invitations',
    ],
    results: 'Unified a fragmented luxury brand across 4 global flagships, establishing instant prestige with high-net-worth buyers.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    typeBadge: 'Brand Identity',
    icon: LayoutGrid,
  },
];

export default function FannedPortfolioShowcase() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <div className="mt-16 relative">
      <div className="text-center mb-8">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-electric-400" />
          <span>Interactive 3-Card Fanned Showcase • Click to Expand</span>
        </span>
      </div>

      {/* 3-Card Fanned Stage */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 max-w-5xl mx-auto px-4 py-8">
        {FANNED_PROJECTS.map((project, idx) => {
          const Icon = project.icon;
          return (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              data-cursor-text="EXPAND"
              className={`w-full md:w-80 h-[440px] rounded-3xl bg-[#111116] border border-white/[0.08] overflow-hidden cursor-pointer shadow-dark-card transition-all duration-500 ease-out transform ${project.rotation} hover:z-20 hover:border-electric-500/50 hover:shadow-glow-blue flex flex-col justify-between group`}
            >
              {/* Image Preview */}
              <div className="relative h-56 w-full overflow-hidden bg-black">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <Icon className="w-3 h-3 text-electric-400" />
                  <span>{project.typeBadge}</span>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-electric-400 tracking-wide uppercase">
                    {project.category}
                  </span>
                  <h4 className="mt-1 text-lg font-display font-bold text-white group-hover:text-electric-300 transition-colors leading-snug">
                    {project.title}
                  </h4>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-gray-400">
                  <span className="font-mono text-[11px] text-gray-300">{project.metrics.split('•')[0]}</span>
                  <span className="inline-flex items-center gap-1 text-electric-400 font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Modal / Drawer */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#111116] border border-white/[0.12] rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/60 border border-white/20 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Banner */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-[#111116]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-bold uppercase tracking-widest text-electric-400 bg-electric-500/10 px-3 py-1 rounded-full border border-electric-500/30">
                  {activeProject.category}
                </span>
                <h3 className="mt-3 text-2xl sm:text-3xl font-display font-extrabold text-white">
                  {activeProject.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-300 font-mono">
                  {activeProject.metrics}
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-electric-400" />
                  <span>Deliverables & Execution Scope</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeProject.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#181820] border border-white/[0.06] text-xs text-gray-300 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-electric-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Business Impact & Growth Value
                </h4>
                <p className="text-sm text-gray-300 bg-[#181820]/70 p-4 rounded-xl border border-white/[0.06] leading-relaxed">
                  {activeProject.results}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-gray-400">
                  Concept Exploration / Sample Sprint Showcase
                </span>
                <a
                  href="#booking-calendar"
                  onClick={() => setActiveProject(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-electric-500 to-purple-brand text-white text-xs font-bold shadow-glow-blue hover:scale-[1.02] transition-transform"
                >
                  <span>Build This For Your Brand</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


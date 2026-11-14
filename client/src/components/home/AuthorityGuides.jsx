import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  ArrowRight,
  X,
  Sparkles,
  Clock,
  CheckCircle2,
  Zap,
  Calendar,
  Layers,
  Palette,
  Video,
  BookmarkCheck,
  TrendingUp,
} from 'lucide-react';

const GUIDES = [
  {
    id: 'ai-ugc-playbook',
    title: 'The AI UGC Ad Playbook',
    subtitle: 'How to generate 50+ conversion-ready video ad variations in under 48 hours without $10k production crews.',
    shortDescription: 'Synthesize authentic micro-creator hooks, isolate winning video angles, and scale Meta & TikTok ad spend with rapid creative iteration.',
    readTime: '6 min read',
    tag: 'Performance Ads & AI',
    edition: '2026 Edition',
    accentColor: 'blue',
    coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    floatingBadges: [
      { text: '50+ Ad Variations', icon: Video, color: 'text-blue-400', border: 'border-blue-500/30' },
      { text: '48h Sprint', icon: Zap, color: 'text-cyan-300', border: 'border-cyan-500/30' },
    ],
    mockupType: 'ugc',
    chapters: [
      {
        number: '01',
        title: 'The 3-Second Visual Disruptor Formula',
        body: 'Algorithmic feeds demand non-linear visual pattern interrupts. By introducing high-contrast micro-movements in the first 90 frames, hook retention increases by 38% across cold audiences.',
      },
      {
        number: '02',
        title: 'Synthetic Micro-Creator Modeling',
        body: 'How we build hyper-realistic creator personas tailored to your ideal customer profile, eliminating scheduling conflicts, studio rentals, and production bottlenecks.',
      },
      {
        number: '03',
        title: 'Systematic A/B Angle Matrices',
        body: 'Deploying structured headline, hook, and CTA matrices that allow your media buyer to identify breakout ad angles within 48 hours of initial spend.',
      },
    ],
    takeaways: [
      'The 3-second visual disruptor formula that drops CPA by up to 40%',
      'Synthesizing authentic micro-creator styles with zero filming friction',
      'How to isolate winning video angles using systematic A/B ad matrices',
      'Localizing accents and languages for US, UK, EU, and UAE audiences',
    ],
    fullArticle: `Traditional video production cycles are dead. In the modern algorithmic ad environment, ad fatigue happens within 7 to 14 days. Brands relying on 2-month filming shoots simply bleed capital. 

At AJDesigners, we utilize a hybrid AI + human creative pipeline. We generate authentic, hyper-realistic creator models that match your target demographic, pair them with high-converting psychology-backed copy, and deploy 50+ variations across Meta and TikTok. The result? Unrivaled creative velocity and sustainable profitability.`,
  },
  {
    id: 'scaling-social-burnout',
    title: 'Scaling Social Media Without Burnout',
    subtitle: 'How high-ticket founders automate organic social reach without spending hours editing reels.',
    shortDescription: 'The operational blueprint for transforming 1 monthly founder recording into 30 days of viral carousels, reels, and B2B pipeline growth.',
    readTime: '8 min read',
    tag: 'Organic Growth & Strategy',
    edition: '2026 Edition',
    accentColor: 'purple',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    floatingBadges: [
      { text: '1-to-30 Engine', icon: Calendar, color: 'text-purple-300', border: 'border-purple-500/30' },
      { text: 'Automated Sync', icon: TrendingUp, color: 'text-emerald-300', border: 'border-emerald-500/30' },
    ],
    mockupType: 'social',
    chapters: [
      {
        number: '01',
        title: 'The 1-to-30 Content Waterfall',
        body: 'Record one 45-minute executive briefing per month. Our editorial desk extracts 20+ viral short clips, 6 high-authority LinkedIn carousels, and 4 in-depth newsletters.',
      },
      {
        number: '02',
        title: 'Algorithm-Native Formatting',
        body: 'Why cross-posting identical formats destroys reach, and how tailored formatting rules maximize engagement on LinkedIn vs. Instagram Reels.',
      },
      {
        number: '03',
        title: 'Converting Reach into High-Ticket Deals',
        body: 'Strategic call-to-actions, DM funnel triggers, and automated nurture sequences that turn profile views into scheduled discovery calls.',
      },
    ],
    takeaways: [
      'The 1-to-30 content waterfall methodology for C-suite leaders',
      'Asynchronous content distribution pipelines using Notion & Slack',
      'Platform-native formatting rules for LinkedIn vs. Instagram algorithms',
      'Turning passive social engagement into closed high-ticket B2B deals',
    ],
    fullArticle: `Founders shouldn't spend their week editing TikToks or tweaking Canva graphics. Your highest leverage activity is closing deals and building product. 

By partnering with AJDesigners, you record one 45-minute strategic interview with our creative directors each month. We extract 20+ viral short clips, write LinkedIn carousels, design infographics, and schedule everything across your channels—giving you a Fortune 500 digital presence on autopilot.`,
  },
  {
    id: 'brand-systems',
    title: 'High-Converting Brand Systems',
    subtitle: 'The blueprint for transforming fragmented design assets into an unforgettable global brand.',
    shortDescription: 'Build cohesive design tokens, typography scales, and luxury dark-mode aesthetics that command premium international pricing.',
    readTime: '5 min read',
    tag: 'Brand Architecture & Design',
    edition: '2026 Edition',
    accentColor: 'cyan',
    coverImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    floatingBadges: [
      { text: 'Design Tokens v2.4', icon: Palette, color: 'text-cyan-300', border: 'border-cyan-500/30' },
      { text: 'Global System', icon: Layers, color: 'text-blue-300', border: 'border-blue-500/30' },
    ],
    mockupType: 'branding',
    chapters: [
      {
        number: '01',
        title: 'Visual Authority & First Impressions',
        body: 'International buyers form trust judgments in under 50 milliseconds. A unified design system communicates engineering rigor and enterprise readiness instantly.',
      },
      {
        number: '02',
        title: 'Design Token Scalability',
        body: 'Bridging Figma to production code with strict color tokens, fluid typography clamps, and spacing variables that keep multi-platform rollouts flawless.',
      },
      {
        number: '03',
        title: 'Dark-Mode Luxury Spatial Layouts',
        body: 'Using controlled luminosity, precise glow radii, and micro-grid borders to create high-ticket visual depth without visual clutter.',
      },
    ],
    takeaways: [
      'The 5 foundational pillars of high-ticket brand perception',
      'Creating adaptable design tokens across web, mobile, and print',
      'The psychology of dark-mode luxury aesthetics and spatial layout',
      'How consistent visual standards accelerate purchase decisions',
    ],
    fullArticle: `International clients in the US, UK, and UAE make split-second evaluations about your legitimacy based purely on visual fidelity. If your branding looks generic or templated, they assume your service is generic as well. 

A comprehensive brand system isn't just a logo—it's a systematic visual hierarchy that communicates prestige, trust, and technological edge before a single word is spoken.`,
  },
];

// Interactive 3D Perspective Card with Smooth Tilt Hover
function BlueprintCard({ guide, onSelect }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Calculate subtle 3D tilt angles (-6 to +6 degrees)
    const rx = ((y - centerY) / centerY) * -6;
    const ry = ((x - centerX) / centerX) * 6;
    setRotateX(rx);
    setRotateY(ry);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 32, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(guide)}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${isHovered ? '8px' : '0px'})`,
        transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.4s ease-out',
      }}
      className={`group relative rounded-3xl bg-[#111116] border border-white/[0.08] hover:border-electric-500/50 hover:shadow-glow-blue transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer select-none`}
    >
      {/* Subtle hover gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-black/40 pointer-events-none z-10" />

      {/* TOP 45% VISUAL SHOWCASE BANNER */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-black shrink-0">
        <img
          src={guide.coverImage}
          alt={guide.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-95"
        />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-[#111116]/40 to-black/30" />

        {/* 3D Glassmorphic Blueprint Cover Mockup Overlaid on Image */}
        <div className="absolute inset-x-5 top-4 bottom-4 flex items-center justify-center pointer-events-none">
          {guide.mockupType === 'ugc' && (
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-950/70 via-black/80 to-blue-900/40 backdrop-blur-md border border-blue-500/30 p-3.5 flex flex-col justify-between shadow-2xl transform group-hover:-translate-y-1 transition-transform duration-500">
              <div className="flex items-center justify-between text-[10px] font-mono text-blue-300">
                <span className="flex items-center gap-1">
                  <Video className="w-3 h-3 text-electric-400" />
                  <span>PLAYBOOK // AI UGC</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {guide.edition}
                </span>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 w-3/4 bg-blue-400/40 rounded-full" />
                <div className="h-1 w-1/2 bg-blue-400/20 rounded-full" />
              </div>
            </div>
          )}

          {guide.mockupType === 'social' && (
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-purple-950/70 via-black/80 to-indigo-900/40 backdrop-blur-md border border-purple-500/30 p-3.5 flex flex-col justify-between shadow-2xl transform group-hover:-translate-y-1 transition-transform duration-500">
              <div className="flex items-center justify-between text-[10px] font-mono text-purple-300">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-purple-400" />
                  <span>BLUEPRINT // 1-TO-30</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {guide.edition}
                </span>
              </div>
              {/* Mini Content Calendar Graphic */}
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {['Mon', 'Wed', 'Fri', 'Sun'].map((day, i) => (
                  <div
                    key={day}
                    className="p-1 rounded bg-white/[0.04] border border-white/10 text-center text-[9px] font-mono text-gray-300"
                  >
                    <span className="block text-purple-300 font-bold">{day}</span>
                    <span className="block text-[8px] text-gray-400">{i % 2 === 0 ? 'Reel' : 'Post'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {guide.mockupType === 'branding' && (
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-cyan-950/70 via-black/80 to-slate-900/40 backdrop-blur-md border border-cyan-500/30 p-3.5 flex flex-col justify-between shadow-2xl transform group-hover:-translate-y-1 transition-transform duration-500">
              <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300">
                <span className="flex items-center gap-1">
                  <Palette className="w-3 h-3 text-cyan-400" />
                  <span>SYSTEM // TOKENS</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {guide.edition}
                </span>
              </div>
              {/* Mini Color Swatches Graphic */}
              <div className="flex items-center gap-2 pt-1">
                <span className="w-4 h-4 rounded-full bg-[#070709] border border-white/30 shadow-sm" />
                <span className="w-4 h-4 rounded-full bg-[#2563EB] shadow-sm" />
                <span className="w-4 h-4 rounded-full bg-[#A855F7] shadow-sm" />
                <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
                <span className="text-[9px] font-mono text-cyan-300 ml-auto">Figma Sync</span>
              </div>
            </div>
          )}
        </div>

        {/* Floating Badges */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2 z-20 pointer-events-none">
          {guide.floatingBadges.map((badge, idx) => {
            const BadgeIcon = badge.icon;
            return (
              <div
                key={idx}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border ${badge.border} text-[10px] font-mono font-bold ${badge.color} shadow-lg`}
              >
                <BadgeIcon className="w-3 h-3" />
                <span>{badge.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM ULTRA-CLEAN TITLE & METRICS */}
      <div className="p-6 flex-1 flex flex-col justify-between bg-[#111116] border-t border-white/[0.06]">
        <div>
          {/* Category Pill & Read Time */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
            <span className="font-bold text-electric-400 uppercase tracking-wider text-[10px] bg-electric-500/10 px-2.5 py-1 rounded-full border border-electric-500/20 font-mono">
              {guide.tag}
            </span>
            <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-mono">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span>{guide.readTime}</span>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-electric-300 transition-colors leading-snug line-clamp-1">
            {guide.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-2">
            {guide.shortDescription}
          </p>
        </div>

        {/* Read Guide CTA + Edition Badge */}
        <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
          <span className="text-xs font-bold text-white group-hover:text-electric-400 transition-colors flex items-center gap-2">
            <span>Read Guide</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="text-[11px] font-mono text-gray-500 font-medium">
            {guide.edition}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function AuthorityGuides() {
  const [activeGuide, setActiveGuide] = useState(null);

  // Close modal on Escape key press and manage body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveGuide(null);
    };
    if (activeGuide) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeGuide]);

  return (
    <section id="authority-guides" className="py-20 sm:py-24 bg-[#070709] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[300px] bg-electric-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-purple-brand/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Normalized Heading Proportions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-purple-soft text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-brand" />
              <span>Free Educational Blueprints</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              Learn Before You Buy.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 max-w-xl leading-relaxed">
              Tactical growth frameworks and creative architectures designed to help international brand leaders make informed, high-ROI marketing decisions.
            </p>
          </div>
          <div className="text-xs text-gray-400 flex items-center gap-2 shrink-0">
            <BookOpen className="w-4 h-4 text-electric-400" />
            <span className="font-mono text-[11px]">Authored by Yashwa & Aroosa</span>
          </div>
        </div>

        {/* 3 Sleek 3D Blueprint Cards with Fast Automatic Entrance Cascade */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.05,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {GUIDES.map((guide) => (
            <BlueprintCard
              key={guide.id}
              guide={guide}
              onSelect={setActiveGuide}
            />
          ))}
        </motion.div>
      </div>

      {/* Interactive Guide Reader Modal / Drawer */}
      <AnimatePresence>
        {activeGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl bg-[#111116] border border-white/[0.12] rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="p-6 sm:p-8 pb-4 border-b border-white/[0.08] relative shrink-0">
                <button
                  onClick={() => setActiveGuide(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close Guide"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-electric-400 bg-electric-500/10 px-3 py-1 rounded-full border border-electric-500/20 font-mono">
                    {activeGuide.tag}
                  </span>
                  <span className="text-xs font-mono text-gray-400 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.06]">
                    {activeGuide.readTime}
                  </span>
                  <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                    {activeGuide.edition}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-extrabold text-white leading-tight">
                  {activeGuide.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                  "{activeGuide.subtitle}"
                </p>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                {/* Strategic Takeaways Box */}
                <div className="p-5 rounded-2xl bg-[#181820] border border-white/[0.08]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3 flex items-center gap-1.5 font-mono">
                    <BookmarkCheck className="w-4 h-4 text-electric-400" />
                    <span>Key Strategic Takeaways</span>
                  </h4>
                  <div className="space-y-2.5">
                    {activeGuide.takeaways.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-electric-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Structured Chapters */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
                    Tactical Blueprint Breakdown
                  </h4>
                  <div className="space-y-3">
                    {activeGuide.chapters.map((ch) => (
                      <div
                        key={ch.number}
                        className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-electric-500/10 text-electric-400 border border-electric-500/20">
                            STEP {ch.number}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {ch.title}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {ch.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Article Content */}
                <div className="text-xs sm:text-sm text-gray-300 space-y-3 leading-relaxed font-sans pt-2 border-t border-white/[0.06]">
                  <p>{activeGuide.fullArticle}</p>
                </div>

                {/* Bottom Conversion Banner */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-purple-950/30 to-black border border-electric-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-mono text-electric-400 font-bold block">
                      Direct Implementation
                    </span>
                    <h5 className="text-sm sm:text-base font-bold text-white mt-0.5">
                      Want Yashwa & Aroosa to build this for your brand?
                    </h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Skip months of trial and error with our dedicated creative & growth sprint.
                    </p>
                  </div>
                  <a
                    href="#booking-calendar"
                    onClick={() => setActiveGuide(null)}
                    className="shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-electric-500 to-purple-brand text-white text-xs font-bold shadow-glow-blue hover:scale-[1.02] transition-transform"
                  >
                    <span>Book Strategy Sprint</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

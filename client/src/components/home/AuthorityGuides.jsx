import React, { useState } from 'react';
import { BookOpen, ArrowRight, X, Sparkles, Clock, CheckCircle2 } from 'lucide-react';

const GUIDES = [
  {
    id: 'ai-ugc-playbook',
    title: 'The AI UGC Ad Playbook',
    subtitle: 'How to generate 50+ conversion-ready video ad variations in under 48 hours without $10k production crews.',
    readTime: '6 min read',
    tag: 'Performance Ads & AI',
    date: '2025 Edition',
    summary: 'A deep-dive tactical blueprint on training bespoke AI creator avatars, scripting 3-second hook loops, and scaling TikTok & Meta ad spend with rapid creative iteration.',
    takeaways: [
      'The 3-second visual disruptor formula that drops CPA by up to 40%',
      'Synthesizing authentic micro-creator styles with zero filming friction',
      'How to isolate winning video angles using systematic A/B ad matrices',
      'Localizing accents and languages for US, UK, EU, and UAE audiences',
    ],
    content: `Traditional video production cycles are dead. In the modern algorithmic ad environment, ad fatigue happens within 7 to 14 days. Brands relying on 2-month filming shoots simply bleed capital. 

At AJDesigners, we utilize a hybrid AI + human creative pipeline. We generate authentic, hyper-realistic creator models that match your target demographic, pair them with high-converting psychology-backed copy, and deploy 50+ variations across Meta and TikTok. The result? Unrivaled creative velocity and sustainable profitability.`,
  },
  {
    id: 'scaling-social-burnout',
    title: 'Scaling Social Media Without Burnout',
    subtitle: 'How high-ticket founders automate organic social reach without spending hours editing reels.',
    readTime: '8 min read',
    tag: 'Organic Growth & Strategy',
    date: '2025 Edition',
    summary: 'The operational system for turning 1 core monthly founder video into 30 days of high-authority LinkedIn carousels, TikToks, Instagram Reels, and thought-leadership threads.',
    takeaways: [
      'The 1-to-30 content waterfall methodology for C-suite leaders',
      'Asynchronous content distribution pipelines using Notion & Slack',
      'Platform-native formatting rules for LinkedIn vs. Instagram algorithms',
      'Turning passive social engagement into closed high-ticket B2B deals',
    ],
    content: `Founders shouldn't spend their week editing TikToks or tweaking Canva graphics. Your highest leverage activity is closing deals and building product. 

By partnering with AJDesigners, you record one 45-minute strategic interview with our creative directors each month. We extract 20+ viral short clips, write LinkedIn carousels, design infographics, and schedule everything across your channels—giving you a Fortune 500 digital presence on autopilot.`,
  },
  {
    id: 'brand-systems',
    title: 'High-Converting Brand Systems',
    subtitle: 'The blueprint for transforming fragmented design assets into an unforgettable global brand.',
    readTime: '5 min read',
    tag: 'Brand Architecture & Design',
    date: '2025 Edition',
    summary: 'Why inconsistent fonts, stock photos, and random color schemes cost you deals, and how a unified design language commands premium pricing in international markets.',
    takeaways: [
      'The 5 foundational pillars of high-ticket brand perception',
      'Creating adaptable design tokens across web, mobile, and print',
      'The psychology of dark-mode luxury aesthetics and spatial layout',
      'How consistent visual standards accelerate purchase decisions',
    ],
    content: `International clients in the US, UK, and UAE make split-second evaluations about your legitimacy based purely on visual fidelity. If your branding looks generic or templated, they assume your service is generic as well. 

A comprehensive brand system isn't just a logo—it's a systematic visual hierarchy that communicates prestige, trust, and technological edge before a single word is spoken.`,
  },
];

export default function AuthorityGuides() {
  const [activeGuide, setActiveGuide] = useState(null);

  return (
    <section className="py-24 bg-[#070709] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-purple-soft text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-purple-brand" />
              <span>Free Educational Blueprints</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              Learn Before You Buy.
            </h2>
            <p className="mt-3 text-base text-gray-400 max-w-xl">
              Battle-tested creative and growth frameworks designed to help international brand leaders make informed, high-ROI marketing decisions.
            </p>
          </div>
          <div className="text-xs text-gray-400 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-electric-400" />
            <span>Authored by Yashwa & Aroosa</span>
          </div>
        </div>

        {/* 3 Sleek Guide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GUIDES.map((guide) => (
            <div
              key={guide.id}
              onClick={() => setActiveGuide(guide)}
              data-cursor-text="READ"
              className="p-8 rounded-3xl bg-[#111116] border border-white/[0.08] hover:border-electric-500/50 hover:shadow-glow-blue transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-6 pb-4 border-b border-white/[0.06]">
                  <span className="font-bold text-electric-400 uppercase tracking-wider text-[10px] bg-electric-500/10 px-2.5 py-1 rounded-full border border-electric-500/20">
                    {guide.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    <span>{guide.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-display font-bold text-white group-hover:text-electric-300 transition-colors leading-snug">
                  {guide.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {guide.subtitle}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-electric-400 transition-colors flex items-center gap-2">
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[11px] font-mono text-gray-500">{guide.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guide Reader Modal */}
      {activeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#111116] border border-white/[0.12] rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto p-6 sm:p-10">
            <button
              onClick={() => setActiveGuide(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Guide"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold uppercase tracking-wider text-electric-400 bg-electric-500/10 px-3 py-1 rounded-full border border-electric-500/20">
              {activeGuide.tag} • {activeGuide.readTime}
            </span>

            <h3 className="mt-4 text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight">
              {activeGuide.title}
            </h3>
            <p className="mt-2 text-sm text-gray-300 leading-relaxed italic">
              "{activeGuide.subtitle}"
            </p>

            <div className="my-6 p-5 rounded-2xl bg-[#181820] border border-white/[0.08]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3">
                Key Strategic Takeaways
              </h4>
              <div className="space-y-2">
                {activeGuide.takeaways.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-electric-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm text-gray-300 space-y-4 leading-relaxed font-sans">
              <p>{activeGuide.content}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-gray-400">
                Want to implement this framework?
              </span>
              <a
                href="#booking-calendar"
                onClick={() => setActiveGuide(null)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-electric-500 to-purple-brand text-white text-xs font-bold shadow-glow-blue hover:scale-[1.02] transition-transform"
              >
                <span>Schedule Strategy Session</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

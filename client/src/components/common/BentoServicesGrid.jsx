import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowUpRight,
  Cpu,
  Video,
  Target,
  Palette,
  TrendingUp,
  Share2,
  CheckCircle2,
} from 'lucide-react';

export default function BentoServicesGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* 1. Large Bento Box (8 Cols) - AI Creative Production */}
      <div className="lg:col-span-8 group relative rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 border border-white/10 shadow-2xl overflow-hidden flex flex-col justify-between hover:border-electric-500/50 transition-all duration-500">
        <div className="absolute top-0 right-0 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-electric-500/20 transition-all" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-electric-500/15 text-electric-400 border border-electric-500/30">
              DISCIPLINE 01 • FLAGSHIP
            </span>
            <div className="w-12 h-12 rounded-2xl bg-electric-500/20 text-electric-400 flex items-center justify-center shadow-glow-blue">
              <Cpu className="w-6 h-6" />
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-3">
            AI-Powered Creative Production & 3D Staging
          </h3>
          <p className="text-sm text-charcoal-300 max-w-xl leading-relaxed mb-6">
            We blend generative artificial intelligence with rigorous human art direction to create photorealistic product staging, concept visuals, and marketing assets at scale.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
              <div className="text-xs font-bold text-white">Generative Staging</div>
              <div className="text-[10px] text-charcoal-400">Photorealistic backgrounds</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
              <div className="text-xs font-bold text-white">Human Art Direction</div>
              <div className="text-[10px] text-charcoal-400">100% Brand compliance</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
              <div className="text-xs font-bold text-white">Multi-Ratio Assets</div>
              <div className="text-[10px] text-charcoal-400">Reels, Feed & Billboards</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-charcoal-400">Serving B2B & B2C International Brands</span>
          <Link
            to="/services/ai-powered-creative-production"
            className="inline-flex items-center gap-2 text-xs font-bold text-electric-400 hover:text-white transition-colors"
          >
            <span>Explore Discipline</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 2. Tall Bento Box (4 Cols) - Short-Form Video & Reels */}
      <div className="lg:col-span-4 group relative rounded-3xl p-8 bg-gradient-to-br from-navy-900 via-purple-950/40 to-navy-900 border border-white/10 shadow-2xl overflow-hidden flex flex-col justify-between hover:border-purple-brand/50 transition-all duration-500">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-purple-brand/20 text-purple-300 border border-purple-500/30">
              DISCIPLINE 02
            </span>
            <div className="w-12 h-12 rounded-2xl bg-purple-brand/20 text-purple-300 flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white mb-2">
            Short-Form Video & Viral Reels
          </h3>
          <p className="text-xs text-charcoal-300 leading-relaxed mb-6">
            Dynamic video edits with animated subtitles, kinetic pacing, and audio design optimized for TikTok, Instagram Reels, and YouTube Shorts.
          </p>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 mb-6">
            <div className="flex items-center justify-between text-xs">
              <span className="text-charcoal-300">Average Retention Lift:</span>
              <span className="font-bold text-green-400">+185%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-charcoal-300">Kinetic Captions:</span>
              <span className="font-bold text-purple-300">Included</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-charcoal-300">Sound Design:</span>
              <span className="font-bold text-electric-300">Curated</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-charcoal-400">9:16 Vertical Video</span>
          <Link
            to="/services/short-form-video-reels-creation"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-300 hover:text-white transition-colors"
          >
            <span>Learn More</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 3. Medium Bento Box (4 Cols) - B2B Lead Generation */}
      <div className="lg:col-span-4 group relative rounded-3xl p-8 bg-white text-navy-900 border border-charcoal-200/80 shadow-card-subtle overflow-hidden flex flex-col justify-between hover:border-electric-500/40 hover:shadow-card-elevated transition-all duration-500">
        <div>
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-electric-100 text-electric-700">
              DISCIPLINE 03
            </span>
            <div className="w-11 h-11 rounded-2xl bg-electric-100 text-electric-600 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
          </div>

          <h3 className="text-xl font-display font-extrabold text-navy-900 mb-2">
            B2B Inbound Lead Generation
          </h3>
          <p className="text-xs text-charcoal-700 leading-relaxed mb-5">
            High-converting lead magnet funnels, targeted landing pages, and lead qualification systems built for commercial B2B growth.
          </p>

          <ul className="space-y-2 text-xs text-charcoal-700 mb-6">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-electric-600 shrink-0" />
              <span>Lead magnets & whitepapers</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-electric-600 shrink-0" />
              <span>Commercial inquiry capture</span>
            </li>
          </ul>
        </div>

        <div className="pt-4 border-t border-charcoal-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-charcoal-500">B2B Pipelines</span>
          <Link
            to="/services/b2b-lead-generation"
            className="text-xs font-bold text-electric-600 hover:text-electric-700 flex items-center gap-1"
          >
            <span>Details</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 4. Medium Bento Box (4 Cols) - Executive LinkedIn Branding */}
      <div className="lg:col-span-4 group relative rounded-3xl p-8 bg-white text-navy-900 border border-charcoal-200/80 shadow-card-subtle overflow-hidden flex flex-col justify-between hover:border-blue-500/40 hover:shadow-card-elevated transition-all duration-500">
        <div>
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-blue-100 text-blue-700">
              DISCIPLINE 04
            </span>
            <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
          </div>

          <h3 className="text-xl font-display font-extrabold text-navy-900 mb-2">
            Executive LinkedIn Marketing
          </h3>
          <p className="text-xs text-charcoal-700 leading-relaxed mb-5">
            Founder and executive profile management, thought leadership ghostwriting, and industry authority cultivation.
          </p>

          <ul className="space-y-2 text-xs text-charcoal-700 mb-6">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Thought leadership post series</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Executive network expansion</span>
            </li>
          </ul>
        </div>

        <div className="pt-4 border-t border-charcoal-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-charcoal-500">Founders & C-Suite</span>
          <Link
            to="/services/linkedin-marketing-executive-branding"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>Details</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 5. Medium Bento Box (4 Cols) - Graphic Design & Brand Identity */}
      <div className="lg:col-span-4 group relative rounded-3xl p-8 bg-white text-navy-900 border border-charcoal-200/80 shadow-card-subtle overflow-hidden flex flex-col justify-between hover:border-purple-brand/40 hover:shadow-card-elevated transition-all duration-500">
        <div>
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-purple-soft text-purple-700">
              DISCIPLINE 05
            </span>
            <div className="w-11 h-11 rounded-2xl bg-purple-soft text-purple-brand flex items-center justify-center">
              <Palette className="w-5 h-5" />
            </div>
          </div>

          <h3 className="text-xl font-display font-extrabold text-navy-900 mb-2">
            Brand Identity & Design
          </h3>
          <p className="text-xs text-charcoal-700 leading-relaxed mb-5">
            Distinctive visual systems, brand guidelines, typography systems, marketing collateral, and digital asset kits.
          </p>

          <ul className="space-y-2 text-xs text-charcoal-700 mb-6">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
              <span>Brand guidelines & logos</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
              <span>Marketing collateral kits</span>
            </li>
          </ul>
        </div>

        <div className="pt-4 border-t border-charcoal-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-charcoal-500">Visual Precision</span>
          <Link
            to="/services/graphic-design-branding"
            className="text-xs font-bold text-purple-brand hover:text-purple-700 flex items-center gap-1"
          >
            <span>Details</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  Monitor,
  Smartphone,
  LayoutGrid,
  Zap,
  TrendingUp,
  Clock,
  Globe2,
  ChevronDown,
  ChevronUp,
  Star,
  Film,
  BarChart3,
  Flame,
  Check,
  ShieldCheck,
  Play,
  Users2,
} from 'lucide-react';
import FannedPortfolioShowcase from '../components/home/FannedPortfolioShowcase';
import AuthorityGuides from '../components/home/AuthorityGuides';
import BookingCalendarWidget from '../components/common/BookingCalendarWidget';
import HeroCanvasShader from '../components/common/HeroCanvasShader';
import ShowreelModal from '../components/common/ShowreelModal';

export default function HomePage() {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const heroHeadingRef = useRef(null);

  useEffect(() => {
    if (heroHeadingRef.current) {
      gsap.fromTo(
        heroHeadingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.1 }
      );
    }
  }, []);

  const handleScrollToCalendar = (e) => {
    e.preventDefault();
    const el = document.getElementById('booking-calendar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToServices = (e) => {
    e.preventDefault();
    const el = document.getElementById('services-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Core 4 Services with Kinetic Marquee Strip on Hover
  const coreServices = [
    {
      id: '01',
      title: 'AI-Powered UGC Ads',
      slug: 'ai-powered-content',
      tagline: 'Hyper-realistic AI creator videos engineered for virality & high ROAS.',
      marquee: 'AI CREATOR AVATARS • 9:16 VERTICAL HOOKS • MULTI-VOICEOVER DUBBING • 48H SPRINT • HIGH ROAS • RAPID A/B TESTING',
    },
    {
      id: '02',
      title: 'Social Media Management',
      slug: 'social-media-management',
      tagline: 'End-to-end strategic content calendars, copywriting & community distribution.',
      marquee: 'OMNICHANNEL DISTRIBUTION • INSTAGRAM REELS • LINKEDIN THOUGHT LEADERSHIP • TIKTOK ALGORITHM MASTERY • COMMUNITY ENGAGEMENT',
    },
    {
      id: '03',
      title: 'Performance Paid Campaigns',
      slug: 'digital-advertising',
      tagline: 'Full-funnel Meta, TikTok, and Google ad management driving qualified pipeline.',
      marquee: 'META ADS SPECIALIST • TIKTOK PIXEL SCALING • GOOGLE SEARCH & DISPLAY • LOW CPA • MAX ROAS • DATA ATTRIBUTION',
    },
    {
      id: '04',
      title: 'Brand & Graphic Design',
      slug: 'graphic-design-branding',
      tagline: 'Bespoke design systems, 3D motion assets, and high-ticket visual collateral.',
      marquee: 'LUXURY DESIGN SYSTEMS • 3D PACKAGING RENDERS • PITCH DECKS • WEBGL LANDING PAGES • GLOBAL BRAND GUIDELINES',
    },
  ];

  // 6 Bento Grid Services ("Everything We Handle")
  const bentoServices = [
    {
      title: 'Social Media Strategy',
      desc: 'Data-backed content calendars, positioning frameworks, and platform-native distribution that build brand authority.',
      icon: TrendingUp,
      badge: 'Organic Scale',
    },
    {
      title: 'AI UGC Video Ads',
      desc: 'High-velocity short-form ad creatives combining hyper-realistic AI video, authentic hooks, and conversion scripts.',
      icon: Flame,
      badge: 'High Conversion',
    },
    {
      title: 'Short-Form Reels & TikToks',
      desc: 'Retention-engineered 9:16 vertical video assets crafted to capture algorithmic feeds and ignite viral discovery.',
      icon: Smartphone,
      badge: 'Viral Pacing',
    },
    {
      title: 'Graphic Design & Branding',
      desc: 'High-end visual identities, marketing collateral, pitch decks, and brand guidelines that exude premium credibility.',
      icon: LayoutGrid,
      badge: 'Visual Identity',
    },
    {
      title: 'Paid Ad Management',
      desc: 'Full-funnel Meta, Google, and TikTok ad campaigns fine-tuned for lowest CPA, maximum ROAS, and scalable lead flow.',
      icon: BarChart3,
      badge: 'ROAS Focus',
    },
    {
      title: 'Landing Page Design',
      desc: 'Ultra-fast, conversion-optimized WebGL and Next-gen landing pages that turn cold ad traffic into paying customers.',
      icon: Monitor,
      badge: 'Conversion Rate',
    },
  ];

  // 5-Step Horizontal Workflow
  const workflowSteps = [
    {
      step: '01',
      title: 'Audit & Strategy',
      desc: 'We dissect your competitor landscape, uncover hook fatigue, and architect a 90-day multi-platform growth blueprint.',
    },
    {
      step: '02',
      title: 'Creative Direction',
      desc: 'Yashwa & Aroosa develop bespoke visual moodboards, script frameworks, and high-converting storytelling angles.',
    },
    {
      step: '03',
      title: 'AI & Human Production',
      desc: 'Our studio pairs AI generation algorithms with senior human motion designers to craft 30+ assets in rapid 48-hour sprints.',
    },
    {
      step: '04',
      title: 'Review & Polish',
      desc: 'Collaborate asynchronously in your private Slack/Notion portal with frictionless revisions and frame-accurate feedback.',
    },
    {
      step: '05',
      title: 'Launch & Scale',
      desc: 'Scheduled distribution, automated community posting, and live ROAS optimization across US, UK, EU, and UAE markets.',
    },
  ];

  // Client Testimonials
  const testimonials = [
    {
      quote:
        'AJDesigners completely transformed our B2B pipeline. Their 48-hour asset turnaround and AI video creatives cut our customer acquisition cost in half within the first 60 days.',
      author: 'Sarah Jenkins',
      role: 'CMO, Apex SaaS',
      location: 'San Francisco, USA',
      rating: 5,
    },
    {
      quote:
        'Yashwa and Aroosa operate at world-class agency standard. Seamless collaboration across time zones, immaculate design standards, and zero fluff. They feel like our own in-house creative department.',
      author: 'Oliver Davies',
      role: 'Director of Growth, FinTech Labs',
      location: 'London, UK',
      rating: 5,
    },
    {
      quote:
        'The quality of their short-form reels and luxury branding elevated our international prestige. Engagement increased 240% and our retail partners in Dubai and Zurich were blown away.',
      author: 'Elena Rostova',
      role: 'Founder, Veloce Luxury',
      location: 'Zurich & Dubai',
      rating: 5,
    },
  ];

  // International Client FAQs
  const homepageFaqs = [
    {
      q: 'What is your typical turnaround time?',
      a: 'Most creative sprint assets, AI UGC video ads, and static designs are delivered within 48 to 72 hours through our dedicated Slack & Notion portals. Priority sprint tiers include 24-hour delivery.',
    },
    {
      q: 'How do we collaborate across time zones?',
      a: 'We operate asynchronously with structured sprint boards and synchronous strategy calls aligned with US (EST/PST), UK (GMT), and Middle East (GST) business hours. You receive immediate updates without scheduling friction.',
    },
    {
      q: 'Who owns the creative assets?',
      a: 'You retain 100% full commercial intellectual property ownership of all final designs, AI video outputs, copy scripts, and editable source files from day one.',
    },
    {
      q: 'Do you offer custom monthly retainers?',
      a: 'Yes. Beyond our pre-built Starter, Growth, and Scale plans, we build custom dedicated sprint retainers for high-velocity brands needing high-volume creative output.',
    },
  ];

  return (
    <div className="bg-[#070709] text-gray-100 min-h-screen">
      {/* 4K Agency Master Showreel Modal */}
      <ShowreelModal isOpen={showreelOpen} onClose={() => setShowreelOpen(false)} />

      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Real-time WebGL / Canvas interactive liquid wave background */}
        <HeroCanvasShader />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-electric-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-electric-400 text-xs font-semibold uppercase tracking-wider shadow-sm">
                <span className="w-2 h-2 rounded-full bg-electric-400 animate-pulse" />
                <span>END-TO-END DIGITAL & CREATIVE GROWTH</span>
              </div>

              {/* Massive Headline */}
              <h1
                ref={heroHeadingRef}
                className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.08]"
              >
                Stop the Scroll. <br />
                <span className="gradient-text">Scale Your Brand.</span>
              </h1>

              {/* Concise 2-line Subheadline */}
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                We engineer high-converting AI creative production, full-funnel social media management, and performance campaigns that turn passive scrollers into high-ticket clients worldwide.
              </p>

              {/* Dual CTAs + Showreel Trigger */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#booking-calendar"
                  onClick={handleScrollToCalendar}
                  data-cursor-text="BOOK CALL"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-electric-500 via-blue-600 to-purple-brand hover:shadow-glow-blue hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border border-white/20"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Free Strategy Call</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#services-section"
                  onClick={handleScrollToServices}
                  data-cursor-text="SERVICES"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-gray-200 bg-[#111116] hover:bg-[#181820] hover:text-white border border-white/[0.08] hover:border-white/20 transition-all duration-200"
                >
                  <span>Explore Services</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </a>

                <button
                  onClick={() => setShowreelOpen(true)}
                  data-cursor-text="WATCH"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-electric-300 transition-colors py-2 px-3"
                >
                  <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-electric-400 group-hover:scale-110">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <span>Watch 2025 Showreel</span>
                </button>
              </div>

              {/* Social Proof Strip */}
              <div className="pt-8 border-t border-white/[0.08] grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                    180+
                  </div>
                  <div className="text-xs text-gray-400 font-medium mt-0.5">
                    Clients Unblocked
                  </div>
                </div>
                <div className="border-x border-white/[0.08] px-3">
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-electric-400">
                    48hr
                  </div>
                  <div className="text-xs text-gray-400 font-medium mt-0.5">
                    Average Turnaround
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-purple-soft">
                    2x
                  </div>
                  <div className="text-xs text-gray-400 font-medium mt-0.5">
                    Growth Rate
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right Interactive Visual: Dark UI Dashboard Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl bg-[#111116] border border-white/[0.08] p-6 shadow-2xl backdrop-blur-xl">
                {/* Mockup Top Window Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="text-[11px] font-mono text-gray-400 ml-2">
                      aj-growth-engine.live
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Real-time Active</span>
                  </span>
                </div>

                {/* Dashboard Metrics Header */}
                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-[#181820] border border-white/[0.06]">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">
                      Live Reach
                    </span>
                    <span className="text-lg font-bold text-white mt-1 block">+184%</span>
                    <span className="text-[10px] text-emerald-400 font-mono">↑ MoM Lift</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#181820] border border-white/[0.06]">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">
                      Ad ROAS
                    </span>
                    <span className="text-lg font-bold text-electric-400 mt-1 block">3.8x</span>
                    <span className="text-[10px] text-electric-300 font-mono">Meta & TikTok</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#181820] border border-white/[0.06]">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">
                      Conversion
                    </span>
                    <span className="text-lg font-bold text-purple-soft mt-1 block">+210%</span>
                    <span className="text-[10px] text-purple-300 font-mono">Inbound Leads</span>
                  </div>
                </div>

                {/* Live Campaign Statuses (Required in prompt) */}
                <div className="mt-6 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 block">
                    Active Client Pipeline Status
                  </span>

                  {/* Status 1 */}
                  <div className="p-3.5 rounded-2xl bg-[#181820] border border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Monthly Content Strategy</h4>
                        <span className="text-[11px] text-gray-400">12 Visual Carousels & Copy</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                      Approved
                    </span>
                  </div>

                  {/* Status 2 */}
                  <div className="p-3.5 rounded-2xl bg-[#181820] border border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-electric-500/15 border border-electric-500/30 text-electric-400 flex items-center justify-center">
                        <Flame className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">AI Creative Production</h4>
                        <span className="text-[11px] text-gray-400">16 UGC Video Variations</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-electric-400 bg-electric-500/10 border border-electric-500/20">
                      Curated
                    </span>
                  </div>

                  {/* Status 3 */}
                  <div className="p-3.5 rounded-2xl bg-[#181820] border border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-purple-brand/15 border border-purple-brand/30 text-purple-brand flex items-center justify-center">
                        <Globe2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">B2B Multi-Platform Reach</h4>
                        <span className="text-[11px] text-gray-400">US, UK, UAE & EU Distribution</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-purple-soft bg-purple-brand/15 border border-purple-brand/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-brand animate-ping" />
                      <span>Active</span>
                    </span>
                  </div>
                </div>

                {/* Footer of Card */}
                <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-electric-400" />
                    <span>Sprint Cycle: Day 14 of 30</span>
                  </span>
                  <span className="font-mono text-gray-300">Yashwa & Aroosa Lead</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. BOLD KINETIC SERVICE MARQUEE                           */}
      {/* ========================================================= */}
      <section className="py-6 bg-[#070709] border-y border-white/[0.08] overflow-hidden">
        <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-10 text-lg sm:text-2xl font-display font-extrabold uppercase tracking-wider text-gray-200">
              <span className="hover:text-electric-400 transition-colors">AI UGC Ads</span>
              <span className="w-2.5 h-2.5 rounded-full bg-electric-400 shadow-glow-blue shrink-0" />
              <span className="hover:text-purple-brand transition-colors">Social Media Management</span>
              <span className="w-2.5 h-2.5 rounded-full bg-purple-brand shadow-glow-purple shrink-0" />
              <span className="hover:text-electric-400 transition-colors">Content Creation</span>
              <span className="w-2.5 h-2.5 rounded-full bg-electric-400 shadow-glow-blue shrink-0" />
              <span className="hover:text-purple-brand transition-colors">Paid Campaigns</span>
              <span className="w-2.5 h-2.5 rounded-full bg-purple-brand shadow-glow-purple shrink-0" />
              <span className="hover:text-electric-400 transition-colors">Graphic Design & Branding</span>
              <span className="w-2.5 h-2.5 rounded-full bg-electric-400 shadow-glow-blue shrink-0" />
              <span className="hover:text-purple-brand transition-colors">Web & Landing Pages</span>
              <span className="w-2.5 h-2.5 rounded-full bg-purple-brand shadow-glow-purple shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. "WHO WE HELP" INTERACTIVE AUDIENCE CARDS              */}
      {/* ========================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-electric-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Users2 className="w-3.5 h-3.5" />
            <span>Target Client Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Tailored Creative Engines for Ambitious Operators.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-300">
            Whether you are validating market product-fit or scaling an established international enterprise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: For Startups & SaaS */}
          <div
            data-cursor-text="STARTUPS"
            className="p-8 sm:p-10 rounded-3xl bg-[#111116] border border-white/[0.08] hover:border-electric-500/50 hover:shadow-glow-blue hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Ambient hover glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-electric-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-electric-500/20 transition-all" />

            <div>
              {/* Floating animated badge inside */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181820] border border-white/[0.08] text-[11px] font-mono text-electric-400 mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-electric-400 animate-pulse" />
                <span>Sprint Velocity: 48h Turnaround • $48.2k MRR Pipeline</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white group-hover:text-electric-300 transition-colors">
                For Startups & SaaS
              </h3>
              <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                Rapidly validate creative hooks, deploy high-volume organic video assets, and construct high-ticket ARR customer pipelines without the friction or payroll overhead of hiring an in-house design department.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  'Rapid hook validation across TikTok & Meta Ads',
                  'Interactive product UI motion & feature walkthroughs',
                  'Executive thought-leadership carousels for founders',
                  'High-converting landing page art direction',
                ].map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-electric-400 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400">Launch in &lt; 48 Hours</span>
              <a
                href="#booking-calendar"
                onClick={handleScrollToCalendar}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-electric-400 group-hover:text-electric-300 group-hover:translate-x-1 transition-all"
              >
                <span>Book Startup Growth Call</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: For Established Brands & Agencies */}
          <div
            data-cursor-text="BRANDS"
            className="p-8 sm:p-10 rounded-3xl bg-[#111116] border border-white/[0.08] hover:border-purple-brand/50 hover:shadow-glow-purple hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Ambient hover glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-brand/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-brand/20 transition-all" />

            <div>
              {/* Floating animated badge inside */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181820] border border-white/[0.08] text-[11px] font-mono text-purple-soft mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-purple-brand animate-pulse" />
                <span>Global Footprint: 6 Continents • 100+ Assets / mo</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white group-hover:text-purple-300 transition-colors">
                For Established Brands & Agencies
              </h3>
              <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                Scale omnichannel creative output across international markets (US, UK, UAE, EU), deploy 50+ AI-driven localized video variations, and cut creative production costs by 60% while maintaining luxury prestige.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  'Omnichannel social distribution across 4+ networks',
                  'Localized multi-voiceover AI dubbing (US/UK/EU/UAE)',
                  'Full-funnel ad creative optimization & split testing',
                  'Comprehensive brand guidelines & 3D luxury packaging',
                ].map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-brand shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400">Enterprise Scale Output</span>
              <a
                href="#booking-calendar"
                onClick={handleScrollToCalendar}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-brand group-hover:text-purple-soft group-hover:translate-x-1 transition-all"
              >
                <span>Book Enterprise Call</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. INTERACTIVE SERVICES & EXPANDABLE 3-CARD SHOWCASE     */}
      {/* ========================================================= */}
      <section id="services-section" className="py-24 bg-[#09090d] border-y border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-electric-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Signature Service Matrix</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
                Interactive Core Services.
              </h2>
              <p className="mt-3 text-base text-gray-300 max-w-xl">
                Hover over any discipline to preview our tactical execution stack and explore expandable case sprint studies below.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-electric-400 hover:text-white transition-colors"
            >
              <span>View All 10 Agency Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Vertical Interactive Service Rows */}
          <div className="space-y-4">
            {coreServices.map((service) => {
              const isHovered = hoveredService === service.id;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                  className={`service-row rounded-2xl bg-[#111116] border transition-all duration-300 overflow-hidden cursor-pointer ${
                    isHovered
                      ? 'border-electric-500/60 shadow-glow-blue bg-[#14141c]'
                      : 'border-white/[0.08]'
                  }`}
                >
                  <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                      <span className="font-mono text-sm sm:text-base font-bold text-electric-400">
                        {service.id}.
                      </span>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-400 mt-1">
                          {service.tagline}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-300 hover:text-white self-start md:self-auto px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-electric-400/50 transition-colors"
                    >
                      <span>Deep Dive</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-electric-400" />
                    </Link>
                  </div>

                  {/* Kinetic Marquee Strip revealed on hover */}
                  {isHovered && (
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

          {/* Expandable 3-Card Fanned Showcase */}
          <FannedPortfolioShowcase />
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. "EVERYTHING WE HANDLE" (6-CARD BENTO GRID)            */}
      {/* ========================================================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-purple-soft text-xs font-semibold uppercase tracking-wider mb-4">
            <LayoutGrid className="w-3.5 h-3.5 text-purple-brand" />
            <span>Comprehensive Execution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Everything We Handle.
          </h2>
          <p className="mt-3 text-base text-gray-400">
            A cohesive 360° creative and performance marketing engine engineered for modern digital algorithms.
          </p>
        </div>

        {/* Clean 3x2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bentoServices.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#111116] border border-white/[0.08] hover:border-electric-500/50 hover:shadow-glow-blue hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-electric-500/10 border border-electric-400/20 text-electric-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-electric-500/20 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.06]">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white group-hover:text-electric-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-400 font-mono">
                  <span>Deliverable Sprints</span>
                  <span className="text-electric-400">Full Commercial IP</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. "HOW IT WORKS" (5-STEP HORIZONTAL WORKFLOW)           */}
      {/* ========================================================= */}
      <section className="py-24 bg-[#09090d] border-y border-white/[0.08] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-electric-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Clock className="w-3.5 h-3.5" />
              <span>Predictable Timeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              How It Works.
            </h2>
            <p className="mt-3 text-base text-gray-400">
              A streamlined 5-step collaborative workflow designed for frictionless international delivery.
            </p>
          </div>

          {/* 5-Step Connected Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {workflowSteps.map((s, idx) => (
              <div
                key={s.step}
                className="p-6 rounded-3xl bg-[#111116] border border-white/[0.08] hover:border-electric-500/40 transition-colors flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-full bg-electric-500/15 border border-electric-400/40 text-electric-400 flex items-center justify-center font-mono font-bold text-sm shadow-glow-blue">
                      {s.step}
                    </span>
                    {idx < workflowSteps.length - 1 && (
                      <span className="hidden md:block text-gray-600 font-bold">→</span>
                    )}
                  </div>
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-electric-300 transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-gray-500">
                  Step {idx + 1} of 5
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. "LEARN BEFORE YOU BUY" (AUTHORITY GUIDES)              */}
      {/* ========================================================= */}
      <AuthorityGuides />

      {/* ========================================================= */}
      {/* 8. CLIENT TESTIMONIALS & FAQ ACCORDION                   */}
      {/* ========================================================= */}
      <section className="py-24 bg-[#070709]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Testimonials Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>International Client Praise</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              Trusted by Ambitious Brands.
            </h2>
            <p className="mt-3 text-base text-gray-400">
              Hear directly from founders and growth leaders partnering with AJDesigners across the globe.
            </p>
          </div>

          {/* 3 Clean Dark Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#111116] border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.author}</h4>
                    <span className="text-xs text-gray-400">{t.role}</span>
                  </div>
                  <span className="text-[11px] font-mono text-electric-400 bg-electric-500/10 px-2.5 py-1 rounded-full border border-electric-500/20">
                    {t.location}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                Frequently Asked Questions
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-400">
                Key answers for international founders and enterprise teams.
              </p>
            </div>

            <div className="space-y-4">
              {homepageFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#111116] border border-white/[0.08] overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="text-sm sm:text-base font-semibold text-white">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-electric-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/[0.05] pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. EMBEDDED STRATEGY CALL CALENDAR (CRUCIAL CONVERSION)   */}
      {/* ========================================================= */}
      <BookingCalendarWidget />
    </div>
  );
}

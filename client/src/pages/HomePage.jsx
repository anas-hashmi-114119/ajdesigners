import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  ChevronDown,
  ChevronUp,
  Star,
  Play,
  CheckCircle2,
} from 'lucide-react';
import FannedPortfolioShowcase from '../components/home/FannedPortfolioShowcase';
import AuthorityGuides from '../components/home/AuthorityGuides';
import BookingCalendarWidget from '../components/common/BookingCalendarWidget';
import HeroCanvasShader from '../components/common/HeroCanvasShader';
import ShowreelModal from '../components/common/ShowreelModal';
import HeroVisualMotionCard from '../components/home/HeroVisualMotionCard';
import TargetClientSolutions from '../components/home/TargetClientSolutions';
import HorizontalServicesStage from '../components/home/HorizontalServicesStage';
import EverythingWeHandleBento from '../components/home/EverythingWeHandleBento';
import InteractiveWorkflowPipeline from '../components/home/InteractiveWorkflowPipeline';
import InteractiveRoiCalculator from '../components/home/InteractiveRoiCalculator';

// Smooth GPU-accelerated Number Count-Up for Hero Stats
function StatCounter({ target, suffix = '', prefix = '', duration = 1600 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let frameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutCubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration]);

  return <span>{prefix}{count}{suffix}</span>;
}

export default function HomePage() {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const heroLeftRef = useRef(null);
  const heroCardRef = useRef(null);

  // Staggered Entrance Animations on Initial Page Load
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (heroLeftRef.current) {
      tl.fromTo(
        heroLeftRef.current.children,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, delay: 0.05 }
      );
    }

    if (heroCardRef.current) {
      tl.fromTo(
        heroCardRef.current,
        { opacity: 0, y: 24, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.95, ease: 'power2.out' },
        '-=0.7'
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

  // International Client Testimonials
  const testimonials = [
    {
      quote:
        'AJDesigners completely transformed our B2B pipeline. Their 48-hour asset turnaround and AI video creatives cut our customer acquisition cost in half within the first 60 days.',
      author: 'Sarah Jenkins',
      role: 'CMO, Apex SaaS',
      location: 'San Francisco, USA',
      avatar: 'SJ',
      metrics: '-52% CAC • 2.8x Demos',
      rating: 5,
    },
    {
      quote:
        'Yashwa and Aroosa operate at world-class agency standard. Seamless collaboration across time zones, immaculate design standards, and zero fluff. They feel like our own in-house creative department.',
      author: 'Oliver Davies',
      role: 'Director of Growth, FinTech Labs',
      location: 'London, UK',
      avatar: 'OD',
      metrics: '80+ Assets • 0 Friction',
      rating: 5,
    },
    {
      quote:
        'The quality of their short-form reels and luxury branding elevated our international prestige. Engagement increased 240% and our retail partners in Dubai and Zurich were blown away.',
      author: 'Elena Rostova',
      role: 'Founder, Veloce Luxury',
      location: 'Zurich & Dubai',
      avatar: 'ER',
      metrics: '+240% Reach • 4 Flagships',
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
            <div ref={heroLeftRef} className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-electric-400 text-xs font-semibold uppercase tracking-wider shadow-sm">
                <span className="w-2 h-2 rounded-full bg-electric-400 animate-pulse" />
                <span>END-TO-END DIGITAL & CREATIVE GROWTH</span>
              </div>

              {/* Massive Headline with Responsive Clamp & Tight Line-height */}
              <h1 className="text-[clamp(2.5rem,4.2vw,3.75rem)] font-display font-extrabold tracking-tight text-white leading-[1.1]">
                Stop the Scroll. <br />
                <span className="gradient-text">Scale Your Brand.</span>
              </h1>

              {/* Concise Subheadline constrained to max-w-[520px] */}
              <p className="text-sm sm:text-base text-gray-300 max-w-[520px] mx-auto lg:mx-0 leading-relaxed font-normal">
                We engineer high-converting AI creative production, full-funnel social media management, and performance campaigns that turn passive scrollers into high-ticket clients worldwide.
              </p>

              {/* Single Horizontal Row CTAs (whitespace-nowrap with hover glow & micro-interactions) */}
              <div className="pt-2 flex flex-row items-center justify-center lg:justify-start gap-3 whitespace-nowrap overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 scrollbar-none">
                {/* 1. Primary Strategy Call CTA */}
                <a
                  href="#booking-calendar"
                  onClick={handleScrollToCalendar}
                  data-cursor-text="BOOK CALL"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-electric-500 via-blue-600 to-purple-brand hover:shadow-glow-blue hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border border-white/20 shrink-0 shadow-lg"
                >
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>Book a Free Strategy Call</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>

                {/* 2. Secondary Explore Services CTA */}
                <a
                  href="#services-section"
                  onClick={handleScrollToServices}
                  data-cursor-text="SERVICES"
                  className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-gray-200 bg-[#111116] hover:bg-[#181820] hover:text-white border border-white/[0.08] hover:border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shrink-0"
                >
                  <span>Explore Services</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 shrink-0" />
                </a>

                {/* 3. Watch Showreel Trigger */}
                <button
                  onClick={() => setShowreelOpen(true)}
                  data-cursor-text="WATCH"
                  className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-300 hover:text-white px-3.5 sm:px-4 py-3.5 rounded-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/15 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shrink-0"
                >
                  <div className="w-6 h-6 rounded-full bg-electric-500/20 text-electric-400 flex items-center justify-center group-hover:bg-electric-500 group-hover:text-white transition-all duration-300">
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                  </div>
                  <span>Watch 2025 Showreel</span>
                </button>
              </div>

              {/* Social Proof Strip with Live Count-Up Animations */}
              <div className="pt-8 border-t border-white/[0.08] grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                    <StatCounter target={180} suffix="+" />
                  </div>
                  <div className="text-xs text-gray-400 font-medium mt-0.5">
                    Clients Unblocked
                  </div>
                </div>
                <div className="border-x border-white/[0.08] px-3">
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-electric-400">
                    <StatCounter target={48} suffix="hr" />
                  </div>
                  <div className="text-xs text-gray-400 font-medium mt-0.5">
                    Average Turnaround
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-purple-soft">
                    <StatCounter target={2} suffix="x" />
                  </div>
                  <div className="text-xs text-gray-400 font-medium mt-0.5">
                    Growth Rate
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Motion Card (3D Tilt, Live SVG Chart, Video Preview & ROAS Gauge) */}
            <div ref={heroCardRef} className="lg:col-span-5 relative">
              <HeroVisualMotionCard />
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
      {/* 3. TARGET CLIENT SOLUTIONS (SPLIT-CARD SCROLL ENGINE)    */}
      {/* ========================================================= */}
      <TargetClientSolutions onScrollToCalendar={handleScrollToCalendar} />

      {/* ========================================================= */}
      {/* 4. PINNED BIDIRECTIONAL HORIZONTAL SCROLL SERVICES STAGE  */}
      {/* ========================================================= */}
      <HorizontalServicesStage />

      {/* Expandable 3-Card Fanned Showcase */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FannedPortfolioShowcase />
      </section>

      {/* ========================================================= */}
      {/* 5. "EVERYTHING WE HANDLE" (6-CARD INTERACTIVE BENTO)     */}
      {/* ========================================================= */}
      <EverythingWeHandleBento />

      {/* ========================================================= */}
      {/* 6. "HOW IT WORKS" (5-STEP HORIZONTAL WORKFLOW PIPELINE)  */}
      {/* ========================================================= */}
      <InteractiveWorkflowPipeline />

      {/* ========================================================= */}
      {/* 7. "LEARN BEFORE YOU BUY" (AUTHORITY GUIDES)              */}
      {/* ========================================================= */}
      <AuthorityGuides />

      {/* ========================================================= */}
      {/* 8. INTERACTIVE ROI GROWTH CALCULATOR                     */}
      {/* ========================================================= */}
      <InteractiveRoiCalculator />

      {/* ========================================================= */}
      {/* 9. CLIENT TESTIMONIALS & FAQ ACCORDION                   */}
      {/* ========================================================= */}
      <section className="py-24 bg-[#070709] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Testimonials Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>International Client Praise</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              Trusted by Ambitious Brands.
            </h2>
            <p className="mt-3 text-base text-gray-400">
              Hear directly from founders and growth leaders partnering with AJDesigners across the US, UK, UAE, and Europe.
            </p>
          </div>

          {/* 3 Clean Dark Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#111116] border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-all duration-300 group hover:shadow-2xl relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {t.metrics}
                    </span>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-electric-500 to-purple-brand text-white font-bold text-xs flex items-center justify-center shadow-sm">
                      {t.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{t.author}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-electric-400" />
                      </h4>
                      <span className="text-xs text-gray-400">{t.role}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-gray-400 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.06]">
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
                    className={`rounded-2xl bg-[#111116] border transition-all duration-300 overflow-hidden ${
                      isOpen ? 'border-electric-500/40 shadow-glow-blue' : 'border-white/[0.08] hover:border-white/20'
                    }`}
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
      {/* 10. EMBEDDED STRATEGY CALL CALENDAR (CRUCIAL CONVERSION)  */}
      {/* ========================================================= */}
      <BookingCalendarWidget />
    </div>
  );
}

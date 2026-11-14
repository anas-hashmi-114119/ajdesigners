import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  Smartphone,
  Layers,
  Palette,
  TrendingUp,
  Share2,
  Monitor,
  Search,
  LayoutGrid,
} from 'lucide-react';

const ALL_10_SERVICES = [
  {
    id: '01',
    slug: 'social-media-management',
    number: '01',
    categoryLabel: 'SERVICE 01 • SOCIAL MEDIA MANAGEMENT',
    title: 'Social Media Management',
    microTagline: 'Full-funnel organic viral reach & community distribution',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    overlayType: 'reach',
    overlayBadge: '+214% Reach',
    overlaySub: 'Omnichannel Algorithm Sync',
    icon: Share2,
    description:
      'We architect and execute full-funnel organic content calendars across TikTok, Instagram, LinkedIn, and X. From strategic positioning to high-retention copywriting and community distribution, we transform passive audiences into loyal brand advocates without founder burnout.',
    deliverables: [
      'Omnichannel Monthly Content Calendar (30+ High-Authority Assets)',
      'Platform-Native Copywriting & Engagement Hook Loops',
      'Community Management & Comment Funnel Optimization',
      'Monthly Growth Analytics & Audience Sentiment Reporting',
    ],
    turnaround: '48h Sprints',
    typeBadge: 'Social Growth',
  },
  {
    id: '02',
    slug: 'content-creation',
    number: '02',
    categoryLabel: 'SERVICE 02 • CONTENT CREATION',
    title: 'Content Creation',
    microTagline: 'High-retention visual storytelling & viral carousels',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80',
    overlayType: 'carousel',
    overlayBadge: 'Slide 03 / 08',
    overlaySub: '94% Hook Retention',
    icon: Layers,
    description:
      'Bespoke visual storytelling designed to halt the infinite scroll. We craft multi-slide educational carousels, viral infographics, high-aesthetic photo sets, and editorial motion graphics that educate, inspire, and drive direct saves and shares.',
    deliverables: [
      'High-Converting Multi-Slide Visual Carousels',
      'Data-Driven Infographics & Stat Visualizations',
      'Brand-Aligned Photographic Editorial Retouching',
      'Story & Feed Distribution Asset Kits',
    ],
    turnaround: '48h Sprints',
    typeBadge: 'Visual Assets',
  },
  {
    id: '03',
    slug: 'ai-powered-creative-production',
    number: '03',
    categoryLabel: 'SERVICE 03 • AI-POWERED PRODUCTION',
    title: 'AI-Powered Creative Production',
    microTagline: 'Generative 4K photorealistic product staging',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    overlayType: 'ai-render',
    overlayBadge: 'AI Studio Render',
    overlaySub: '4K Generative Lighting',
    icon: Zap,
    description:
      'We merge custom-trained generative AI pipelines with elite human art direction. Generate photorealistic 3D environments, virtual product staging, and rapid visual variations in hours rather than weeks, cutting physical studio costs by over 60%.',
    deliverables: [
      'Hyper-Realistic 3D AI Product Staging & Environments',
      'Rapid Concept Exploration & Moodboard Synthesis',
      'Custom AI Creator Avatars & Multi-Ratio Rendering',
      '4K Master Resolution Export with Commercial Rights',
    ],
    turnaround: '48h Sprints',
    typeBadge: 'Generative AI',
  },
  {
    id: '04',
    slug: 'graphic-design-branding',
    number: '04',
    categoryLabel: 'SERVICE 04 • GRAPHIC DESIGN & BRANDING',
    title: 'Graphic Design & Branding',
    microTagline: 'Luxury dark-mode design systems & typography tokens',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    overlayType: 'palette',
    overlayBadge: '100% Vector IP',
    overlaySub: 'Obsidian & Electric Palette',
    icon: Palette,
    description:
      'Command prestige and justify high-ticket pricing with an immaculate visual identity. We architect comprehensive dark-mode design systems, custom vector brandmarks, typography hierarchies, and luxury brand guidelines that elevate perceived brand value across US, UK, and European markets.',
    deliverables: [
      'Comprehensive Brand Identity Guidelines & Design Tokens',
      'Custom Typography Hierarchy & Scalable Vector Marks',
      'High-Ticket Pitch Decks & Investor Presentation Kits',
      'Luxury Packaging Mockups & Physical Collateral Systems',
    ],
    turnaround: '48h Sprints',
    typeBadge: 'Brand Identity',
  },
  {
    id: '05',
    slug: 'short-form-video',
    number: '05',
    categoryLabel: 'SERVICE 05 • SHORT-FORM VIDEO & REELS',
    title: 'Short-Form Video & Reels Creation',
    microTagline: 'Scroll-stopping algorithmic hooks & sound design',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    overlayType: 'waveform',
    overlayBadge: '9:16 Reels',
    overlaySub: 'Dynamic Audio Waveform',
    icon: Smartphone,
    description:
      'Vertical video engineered for modern algorithmic retention curves. We script 3-second visual disruptors, edit with kinetic pacing, curate spatial sound design, and embed animated typography tailored specifically for TikTok, Instagram Reels, and YouTube Shorts.',
    deliverables: [
      '15–45s High-Retention Vertical Video Edits (9:16 Ratio)',
      '3-Second Visual Hook Variations for Systematic A/B Testing',
      'Kinetic Subtitles, B-Roll Integration & SFX Sound Design',
      'Multi-Language Accent Localization (US, UK, AUS, UAE)',
    ],
    turnaround: '48h Sprints',
    typeBadge: 'Viral Video',
  },
  {
    id: '06',
    slug: 'digital-advertising',
    number: '06',
    categoryLabel: 'SERVICE 06 • DIGITAL ADS & PAID CAMPAIGNS',
    title: 'Digital Advertising & Paid Campaigns',
    microTagline: 'Low CPA algorithmic scaling across Meta & TikTok',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    overlayType: 'roas',
    overlayBadge: '3.8x Target ROAS',
    overlaySub: '-58% Average CPA Drop',
    icon: TrendingUp,
    description:
      'Stop bleeding budget on ad fatigue. We manage full-funnel paid media campaigns across Meta, TikTok, and Google Ads with aggressive creative iteration, precision custom audience modeling, and real-time ROAS optimization that scales customer acquisition cost-effectively.',
    deliverables: [
      'Full Ad Account Architecture & Pixel Attribution Setup',
      'Weekly Creative Refresh Cycles to Defeat Ad Fatigue',
      'Audience Segmentation & High-Intent Retargeting Funnels',
      'Transparent Weekly ROAS & Cost-Per-Acquisition Dashboards',
    ],
    turnaround: '48h Sprints',
    typeBadge: 'Paid Acquisition',
  },
  {
    id: '07',
    slug: 'b2b-lead-generation',
    number: '07',
    categoryLabel: 'SERVICE 07 • B2B LEAD GENERATION',
    title: 'B2B Lead Generation',
    microTagline: 'Predictable inbound enterprise customer pipeline',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    overlayType: 'pipeline',
    overlayBadge: 'Qualified Pipeline',
    overlaySub: '+$48.2k Monthly ARR',
    icon: LayoutGrid,
    description:
      'Fill your executive calendar with pre-qualified decision makers. We combine account-based marketing (ABM), conversion-optimized outbound messaging, and targeted landing page funnels to attract enterprise SaaS and agency buyers consistently.',
    deliverables: [
      'Ideal Customer Profile (ICP) & TAM Account Mapping',
      'High-Converting Multi-Touch Outbound Sequences',
      'Automated CRM Integration (HubSpot, Salesforce, Notion)',
      'Direct Calendar Booking Funnels with Lead Pre-Qualification',
    ],
    turnaround: '48h Sprints',
    typeBadge: 'B2B Pipeline',
  },
  {
    id: '08',
    slug: 'linkedin-marketing',
    number: '08',
    categoryLabel: 'SERVICE 08 • LINKEDIN & EXECUTIVE BRANDING',
    title: 'LinkedIn Marketing & Executive Branding',
    microTagline: 'C-suite thought leadership & organic authority',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    overlayType: 'linkedin',
    overlayBadge: 'Top Voice',
    overlaySub: '48k Executive Reach',
    icon: Share2,
    description:
      'Transform founders and executive leadership into industry authorities. We ghostwrite high-engagement LinkedIn posts, design viral PDF carousel decks, and build outbound networking systems that establish market prestige and attract inbound capital and enterprise clients.',
    deliverables: [
      'Founder Storytelling & Thought Leadership Ghostwriting',
      'Viral Visual PDF Carousels & Infographics',
      'Profile Optimization for High-Ticket Lead Conversion',
      'Asynchronous Weekly Review (Zero Founder Time Drag)',
    ],
    turnaround: '48h Sprints',
    typeBadge: 'Executive Brand',
  },
  {
    id: '09',
    slug: 'landing-page-design',
    number: '09',
    categoryLabel: 'SERVICE 09 • LANDING PAGE DESIGN',
    title: 'Website & Landing Page Content',
    microTagline: 'Ultra-fast conversion-optimized WebGL pages',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    overlayType: 'wireframe',
    overlayBadge: '99.8% Speed',
    overlaySub: 'Conversion Wireframe',
    icon: Monitor,
    description:
      'Turn cold traffic into high-intent inbound inquiries. We design and develop sleek, dark-mode landing pages with lightning-fast load times, interactive WebGL micro-interactions, and psychology-backed conversion architecture that outperforms traditional templates.',
    deliverables: [
      'Conversion-Focused UI/UX Architecture & Copywriting',
      'Ultra-Fast React / Tailwind / WebGL Development',
      'Mobile-First Responsive Optimization (< 0.8s First Contentful Paint)',
      'Direct Integration with Stripe, Cal.com & Lead Databases',
    ],
    turnaround: '48h Sprints',
    typeBadge: 'WebGL Web',
  },
  {
    id: '10',
    slug: 'seo-optimization',
    number: '10',
    categoryLabel: 'SERVICE 10 • SEO & CONTENT OPTIMIZATION',
    title: 'SEO & Digital Content Optimization',
    microTagline: 'Algorithmic search dominance & organic pipeline',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
    overlayType: 'seo',
    overlayBadge: '#1 Search Ranking',
    overlaySub: 'Top 3 SERP Dominance',
    icon: Search,
    description:
      'Capture high-intent organic search volume without paying for every click. We execute technical SEO audits, build programmatic topic clusters, optimize semantic schema markup, and write authority articles engineered to rank at the top of Google and AI search engines (Perplexity, ChatGPT).',
    deliverables: [
      'Technical SEO & Core Web Vitals Audit & Repair',
      'High-Intent Keyword & Topic Cluster Blueprint',
      'SEO-Engineered Long-Form Authority Articles & Schema Markup',
      'Continuous Backlink Strategy & Monthly SERP Movement Tracking',
    ],
    turnaround: '48h Sprints',
    typeBadge: 'SEO & Search',
  },
];

export default function HorizontalServicesStage() {
  const containerRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Responsive window resize listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Continuous bidirectional scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Spring physics for butter-smooth scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Update active card index reactively on scroll
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const idx = Math.min(9, Math.max(0, Math.round(latest * 9)));
    setActiveCardIndex(idx);
  });

  // Card geometry dimensions calibrated so exactly 3 cards fan out on screen
  const cardWidth = windowWidth < 640 ? 300 : windowWidth < 1024 ? 350 : 380;
  const cardGap = windowWidth < 640 ? 16 : 28;
  const cardPitch = cardWidth + cardGap;
  const totalTrackTravel = (ALL_10_SERVICES.length - 1) * cardPitch;

  // Horizontal track translation:
  // At progress 0, Card 01 is centered in viewport.
  // At progress 1, Card 10 is centered in viewport.
  const trackX = useTransform(smoothProgress, [0, 1], [0, -totalTrackTravel]);

  // Jump smoothly to a specific card index
  const jumpToCard = (index) => {
    const targetIndex = Math.min(9, Math.max(0, index));
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const availableScroll = containerHeight - viewportHeight;
    const targetScrollY = containerTop + (targetIndex / 9) * availableScroll;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  const handleNext = () => jumpToCard(activeCardIndex + 1);
  const handlePrev = () => jumpToCard(activeCardIndex - 1);

  return (
    <section
      id="services-section"
      ref={containerRef}
      className="relative h-[520vh] bg-[#070709] border-y border-white/[0.08]"
    >
      {/* Sticky Viewport Stage (Locked in view while scrolling through 01 to 10) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-8 select-none">

        {/* Ambient Stage Lighting */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[350px] bg-electric-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[350px] bg-purple-brand/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* 1. Section Header: Centered "Our Services" */}
        <div className="max-w-xl mx-auto w-full text-center z-20 mb-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
            Our Services
          </h2>
        </div>

        {/* 2. Pinned Horizontal Track Canvas with 3-Card Round Fanned Orientation */}
        <div className="relative w-full my-auto overflow-hidden py-6 z-10">
          <motion.div
            style={{
              x: trackX,
              paddingLeft: `calc(50vw - ${cardWidth / 2}px)`,
              paddingRight: `calc(50vw - ${cardWidth / 2}px)`,
            }}
            className="flex items-center will-change-transform"
          >
            {ALL_10_SERVICES.map((service, idx) => {
              const Icon = service.icon;
              const isCenter = idx === activeCardIndex;
              const isLeftAdjacent = idx === activeCardIndex - 1;
              const isRightAdjacent = idx === activeCardIndex + 1;

              // 3-Card Fanned Orientation Arc (copied from the fanned showcase below):
              // Center card: rotate-0, scale-105, elevated z-20, glow border
              // Left adjacent card: -rotate-6 (tilted -6deg), scale-95
              // Right adjacent card: rotate-6 (tilted +6deg), scale-95
              // Hover: hover:rotate-0 hover:scale-110 hover:shadow-glow-blue
              let cardFannedStyle = 'rotate-0 scale-90 opacity-25 z-0';
              if (isCenter) {
                cardFannedStyle = 'rotate-0 scale-105 opacity-100 z-20 border-electric-500/50 shadow-glow-blue hover:scale-110';
              } else if (isLeftAdjacent) {
                cardFannedStyle = '-rotate-6 hover:rotate-0 scale-[0.96] opacity-70 hover:opacity-100 z-10 hover:scale-105 hover:z-30 hover:border-electric-500/50 hover:shadow-glow-blue';
              } else if (isRightAdjacent) {
                cardFannedStyle = 'rotate-6 hover:rotate-0 scale-[0.96] opacity-70 hover:opacity-100 z-10 hover:scale-105 hover:z-30 hover:border-electric-500/50 hover:shadow-glow-blue';
              } else if (idx < activeCardIndex) {
                cardFannedStyle = '-rotate-12 scale-[0.85] opacity-20 z-0 pointer-events-none';
              } else {
                cardFannedStyle = 'rotate-12 scale-[0.85] opacity-20 z-0 pointer-events-none';
              }

              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  style={{
                    width: `${cardWidth}px`,
                    marginRight: `${cardGap}px`,
                    transformOrigin: 'bottom center',
                  }}
                  className={`shrink-0 h-[460px] sm:h-[480px] rounded-3xl bg-[#111116] border border-white/[0.08] transition-all duration-500 ease-out cursor-pointer overflow-hidden flex flex-col justify-between group relative select-none transform ${cardFannedStyle}`}
                  data-cursor-text="EXPAND"
                >
                  {/* TOP 58% VISUAL SHOWCASE CANVAS */}
                  <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-black shrink-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-85 group-hover:opacity-100"
                    />
                    {/* Gradient Fade to Bottom Container */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-[#111116]/20 to-transparent" />

                    {/* Top Left: Badge with Icon & Type */}
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-1.5 shadow-md">
                      <Icon className="w-3 h-3 text-electric-400" />
                      <span>{service.typeBadge}</span>
                    </div>

                    {/* Top Right: Glowing Number Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono font-bold text-electric-400 shadow-md">
                        {service.number}
                      </span>
                    </div>

                    {/* FLOATING UNIQUE ANIMATED UI GRAPHIC OVERLAY */}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      {service.overlayType === 'reach' && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-emerald-500/30 text-xs shadow-lg">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="font-bold text-white font-mono">{service.overlayBadge}</span>
                          <span className="text-[10px] text-gray-400 font-mono">Organic Lift</span>
                        </div>
                      )}

                      {service.overlayType === 'carousel' && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-purple-500/30 text-xs shadow-lg">
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                          </div>
                          <span className="font-bold text-white font-mono">{service.overlayBadge}</span>
                          <span className="text-[10px] text-purple-300 font-mono">High Save Rate</span>
                        </div>
                      )}

                      {service.overlayType === 'ai-render' && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-cyan-500/30 text-xs shadow-lg">
                          <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                          <span className="font-bold text-white font-mono">{service.overlayBadge}</span>
                          <span className="text-[10px] text-cyan-300 font-mono">4K Diffusion</span>
                        </div>
                      )}

                      {service.overlayType === 'palette' && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-amber-500/30 text-xs shadow-lg">
                          <div className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded-full bg-[#070709] border border-white/30" />
                            <span className="w-3 h-3 rounded-full bg-[#3B82F6]" />
                            <span className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
                            <span className="w-3 h-3 rounded-full bg-white" />
                          </div>
                          <span className="font-bold text-white font-mono">{service.overlayBadge}</span>
                        </div>
                      )}

                      {service.overlayType === 'waveform' && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-rose-500/30 text-xs shadow-lg">
                          <div className="flex items-end gap-0.5 h-3.5">
                            <span className="w-1 bg-rose-400 rounded-full animate-pulse h-2" />
                            <span className="w-1 bg-rose-400 rounded-full animate-pulse h-3.5" style={{ animationDelay: '100ms' }} />
                            <span className="w-1 bg-rose-400 rounded-full animate-pulse h-1.5" style={{ animationDelay: '200ms' }} />
                            <span className="w-1 bg-rose-400 rounded-full animate-pulse h-3" style={{ animationDelay: '300ms' }} />
                          </div>
                          <span className="font-bold text-white font-mono">{service.overlayBadge}</span>
                          <span className="text-[10px] text-rose-300 font-mono">Viral Pacing</span>
                        </div>
                      )}

                      {service.overlayType === 'roas' && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-emerald-500/30 text-xs shadow-lg">
                          <span className="text-emerald-400 font-bold font-mono">↗ {service.overlayBadge}</span>
                          <span className="text-[10px] text-gray-400 font-mono">-58% CPA</span>
                        </div>
                      )}

                      {service.overlayType === 'pipeline' && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-blue-500/30 text-xs shadow-lg">
                          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                          <span className="font-bold text-white font-mono">{service.overlayBadge}</span>
                          <span className="text-[10px] text-blue-300 font-mono">ARR Growth</span>
                        </div>
                      )}

                      {service.overlayType === 'linkedin' && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-sky-500/30 text-xs shadow-lg">
                          <span className="font-bold text-sky-400 font-mono">{service.overlayBadge}</span>
                          <span className="text-[10px] text-gray-300 font-mono">Executive Influence</span>
                        </div>
                      )}

                      {service.overlayType === 'wireframe' && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-cyan-500/30 text-xs shadow-lg">
                          <span className="font-bold text-emerald-400 font-mono">{service.overlayBadge}</span>
                          <span className="text-[10px] text-cyan-300 font-mono">WebGL Engine</span>
                        </div>
                      )}

                      {service.overlayType === 'seo' && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-teal-500/30 text-xs shadow-lg">
                          <span className="font-bold text-teal-300 font-mono">★ {service.overlayBadge}</span>
                          <span className="text-[10px] text-gray-400 font-mono">High Intent</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* BOTTOM TEXT BODY: Explicitly writes which service it is */}
                  <div className="p-6 flex-1 flex flex-col justify-between bg-[#111116] border-t border-white/[0.06]">
                    <div>
                      {/* Explicit Service Heading */}
                      <span className="text-[11px] font-semibold text-electric-400 tracking-wider uppercase block font-mono">
                        {service.categoryLabel}
                      </span>
                      <h3 className="mt-1.5 text-lg sm:text-xl font-display font-bold text-white group-hover:text-electric-300 transition-colors leading-snug line-clamp-1">
                        {service.title}
                      </h3>
                      <p className="mt-1 text-xs text-gray-400 line-clamp-1">
                        {service.microTagline}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-gray-400">
                      <span className="font-mono text-[11px] text-gray-300">
                        {service.turnaround}
                      </span>
                      <span className="inline-flex items-center gap-1 text-electric-400 font-semibold group-hover:translate-x-1 transition-transform">
                        <span>Inspect Deliverables</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* 3. Bottom Controls: Progress Bar, Step Counter & Jump Navigation */}
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 z-20 pt-2 border-t border-white/[0.08]">
          {/* Left: Progress Bar */}
          <div className="flex items-center gap-3 w-full sm:w-72">
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-electric-500 via-purple-brand to-cyan-400 rounded-full transition-all duration-200"
                style={{
                  width: `${((activeCardIndex + 1) / ALL_10_SERVICES.length) * 100}%`,
                }}
              />
            </div>
            <span className="text-xs font-mono text-gray-400 whitespace-nowrap">
              {Math.round(((activeCardIndex + 1) / ALL_10_SERVICES.length) * 100)}%
            </span>
          </div>

          {/* Center: Step Counter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white shadow-sm">
              <span className="text-electric-400">{ALL_10_SERVICES[activeCardIndex].number}</span> / 10
            </span>
            <span className="text-xs text-gray-300 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {ALL_10_SERVICES[activeCardIndex].title}
            </span>
          </div>

          {/* Right: Quick-Jump Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={activeCardIndex === 0}
              className={`p-2.5 rounded-full border transition-all ${activeCardIndex === 0
                  ? 'border-white/5 text-gray-600 cursor-not-allowed'
                  : 'border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 active:scale-95'
                }`}
              aria-label="Previous Service"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeCardIndex === ALL_10_SERVICES.length - 1}
              className={`p-2.5 rounded-full border transition-all ${activeCardIndex === ALL_10_SERVICES.length - 1
                  ? 'border-white/5 text-gray-600 cursor-not-allowed'
                  : 'border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 active:scale-95'
                }`}
              aria-label="Next Service"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 4. DETAIL MODAL / SLIDE-OVER DRAWER (CLICK-TO-REVEAL)    */}
      {/* ========================================================= */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#111116] border border-white/[0.12] rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/60 border border-white/20 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Banner */}
            <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-black">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-[#111116]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-mono font-bold tracking-wider text-electric-400 bg-electric-500/10 px-3 py-1 rounded-full border border-electric-500/30">
                  {selectedService.categoryLabel} • {selectedService.turnaround}
                </span>
                <h3 className="mt-3 text-2xl sm:text-3xl font-display font-extrabold text-white">
                  {selectedService.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-300 font-mono">
                  {selectedService.microTagline}
                </p>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Discipline Overview
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {selectedService.description}
                </p>
              </div>

              {/* Core Deliverables Checklist */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-electric-400" />
                  <span>Core Deliverables & Execution Scope</span>
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {selectedService.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#181820] border border-white/[0.06] text-xs sm:text-sm text-gray-200 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer CTA & Guarantee */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                  <Clock className="w-4 h-4 text-electric-400" />
                  <span>Average Turnaround: 48 to 72 Hours</span>
                </div>

                <a
                  href="#booking-calendar"
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-electric-500 via-purple-brand to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-glow-blue hover:scale-[1.02] transition-transform"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

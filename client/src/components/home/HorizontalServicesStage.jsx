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
  Users,
  Check,
} from 'lucide-react';

const ALL_10_SERVICES = [
  {
    id: '01',
    slug: 'social-media-management',
    number: '01',
    categoryLabel: 'SERVICE 01 • SOCIAL MEDIA MANAGEMENT',
    title: 'Social Media Management',
    microTagline: 'Organic audience growth & viral engagement',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    overlayType: 'reach',
    overlayBadge: '+214% Reach',
    overlaySub: 'Omnichannel Algorithm Sync',
    icon: Share2,
    typeBadge: 'Social Growth',
    turnaround: '48h Sprints',
    idealFor: 'Founders, CEOs & high-growth brands wanting organic reach without founder burnout.',
    plainSummary:
      'We handle your entire social media presence from start to finish. We script, design, and publish high-retention content across TikTok, Instagram, and LinkedIn so your brand consistently attracts followers and high-ticket clients while you focus on running your business.',
    businessImpact: '+214% Average Reach Lift • 20+ Hours Saved Weekly',
    deliverables: [
      {
        title: '30+ High-Authority Monthly Assets',
        desc: 'Tailored for TikTok, Instagram Reels, and LinkedIn with viral hook frameworks.',
      },
      {
        title: 'Advance Monthly Content Calendar',
        desc: 'Planned and shared inside Notion & Slack with simple 1-click approvals.',
      },
      {
        title: 'Community & Comment Moderation',
        desc: 'Fast responses to prospect comments and direct message routing to your sales funnel.',
      },
      {
        title: 'Monthly Growth & Lead Dashboard',
        desc: 'Transparent analytics tracking profile reach, follower gains, and inbound leads.',
      },
    ],
    howItWorks: [
      { step: '01', title: 'Strategy & Tone Sync', desc: '30-minute kickoff to map your target audience, core offers, and brand tone.' },
      { step: '02', title: '48-Hour Production Batch', desc: 'Our team writes, designs, and batches your assets for quick asynchronous review.' },
      { step: '03', title: 'Publish & Scale', desc: 'We schedule, monitor algorithm performance, and double down on winning angles.' },
    ],
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
    typeBadge: 'Visual Assets',
    turnaround: '48h Sprints',
    idealFor: 'B2B SaaS, tech startups, and digital creators wanting maximum saves and shares.',
    plainSummary:
      'Turn complex business ideas into eye-catching visual carousels and infographics that stop people from scrolling. Designed to educate your market, build instant trust, and get saved and shared widely across LinkedIn and Instagram.',
    businessImpact: '3.2x Higher Save Rate • 94% Hook Retention Across Feeds',
    deliverables: [
      {
        title: 'Multi-Slide Visual Carousels',
        desc: 'Structured with psychological hooks, high-contrast layouts, and clear takeaways.',
      },
      {
        title: 'Custom Data Infographics & Charts',
        desc: 'Transforming industry research and statistics into viral visual assets.',
      },
      {
        title: 'Full Story & Feed Asset Kits',
        desc: 'Formatted in exact ratios for Instagram, LinkedIn, X, and Facebook.',
      },
      {
        title: 'Editable Figma & PSD Source Files',
        desc: 'Complete commercial ownership of all master artwork and vector assets.',
      },
    ],
    howItWorks: [
      { step: '01', title: 'Topic Selection', desc: 'We identify high-interest industry concepts that position you as an expert.' },
      { step: '02', title: 'Editorial Design Sprint', desc: 'We craft concise copy and luxury visual slides tailored to your visual identity.' },
      { step: '03', title: 'Asset Handover', desc: 'Download ready-to-post high-res PNG/PDF files with pre-written captions.' },
    ],
  },
  {
    id: '03',
    slug: 'ai-powered-creative-production',
    number: '03',
    categoryLabel: 'SERVICE 03 • AI-POWERED PRODUCTION',
    title: 'AI-Powered Creative Production',
    microTagline: 'Generative 4K photorealistic product staging & avatars',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    overlayType: 'ai-render',
    overlayBadge: 'AI Studio Render',
    overlaySub: '4K Generative Lighting',
    icon: Zap,
    typeBadge: 'Generative AI',
    turnaround: '48h Sprints',
    idealFor: 'E-commerce, CPG, and luxury brands wanting studio-grade visuals without massive budgets.',
    plainSummary:
      'Generate photorealistic 3D product staging, synthetic creator avatars, and high-end visual sets without renting an expensive photo studio or hiring a camera crew. We blend generative AI pipelines with human art direction for 10x faster output.',
    businessImpact: '60% Lower Production Costs • 10x Faster Creative Velocity',
    deliverables: [
      {
        title: 'Virtual 3D Product Staging',
        desc: 'Placing your products in luxury environments with realistic lighting and reflections.',
      },
      {
        title: 'Synthetic Creator Model Avatars',
        desc: 'Custom digital personas representing your product across diverse demographics.',
      },
      {
        title: 'Rapid Angle & Lighting Variations',
        desc: 'Test 50+ background and lighting iterations in 48 hours instead of weeks.',
      },
      {
        title: '4K Master Ultra-High Resolution',
        desc: 'Crisp, print-ready, billboard-quality, and ad-ready image files with commercial rights.',
      },
    ],
    howItWorks: [
      { step: '01', title: 'Asset Upload', desc: 'You send us flat product photos and references of styles you like.' },
      { step: '02', title: 'Generative Synthesis', desc: 'We render bespoke 3D environments and avatars aligned with your aesthetic.' },
      { step: '03', title: 'Commercial Handover', desc: 'Final 4K assets delivered with complete intellectual property rights.' },
    ],
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
    typeBadge: 'Brand Identity',
    turnaround: '48h Sprints',
    idealFor: 'Startups, consulting firms, and agencies scaling into international markets.',
    plainSummary:
      'Elevate your brand perception so you can command premium international pricing. We build comprehensive brand identity systems—from bespoke vector logos and typography scales to complete investor pitch decks and packaging guidelines.',
    businessImpact: 'Instant Enterprise Credibility • Commands 2x–5x Higher Contract Value',
    deliverables: [
      {
        title: 'Complete Brand Identity Guide',
        desc: 'Color token palettes, typography rules, and logo usage guidelines.',
      },
      {
        title: 'Scalable Vector Logo Suite',
        desc: 'Master files in SVG, PNG, EPS for web, mobile apps, and physical print.',
      },
      {
        title: 'High-Ticket Investor Pitch Deck',
        desc: 'Polished dark-mode presentation slides that build trust with clients and investors.',
      },
      {
        title: 'Packaging & Collateral Standards',
        desc: 'Templates and mockups for merchandise, stationery, business cards, and digital assets.',
      },
    ],
    howItWorks: [
      { step: '01', title: 'Brand Discovery', desc: 'We analyze your target market and competitor visual landscape.' },
      { step: '02', title: 'System Architecture', desc: 'We design the logos, color palette, typography, and core components.' },
      { step: '03', title: 'Figma Token Delivery', desc: 'Complete design system and style guide delivered ready for your developers.' },
    ],
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
    typeBadge: 'Viral Video',
    turnaround: '48h Sprints',
    idealFor: 'Creators, founders, and e-commerce stores wanting viral short-form reach.',
    plainSummary:
      'Capture viewer attention in the first 3 seconds with high-energy vertical videos (9:16). We edit raw video clips with kinetic pacing, animated captions, and sound effects built specifically to maximize watch time on TikTok, Instagram Reels, and YouTube Shorts.',
    businessImpact: '45%+ Average Watch-Through Rate • Algorithmic Recommendation Lift',
    deliverables: [
      {
        title: '15–45s Vertical Video Edits (9:16)',
        desc: 'Fast-paced cuts, zooms, and seamless transitions engineered for smartphone viewing.',
      },
      {
        title: '3-Second Hook Testing Variations',
        desc: 'Multiple intro angles per video to test which hook drives the lowest ad CPA.',
      },
      {
        title: 'Kinetic Captions & Sound Design',
        desc: 'Animated subtitles and sound effects that keep viewers engaged even on mute.',
      },
      {
        title: 'Multi-Language Audio Localization',
        desc: 'Subtitle localization and voice accents tailored for US, UK, and UAE audiences.',
      },
    ],
    howItWorks: [
      { step: '01', title: 'Footage Ingestion', desc: 'You upload raw talking-head or product clips to our private Drive or Frame.io.' },
      { step: '02', title: 'Kinetic Editing', desc: 'We trim dead air, insert relevant B-roll, animate subtitles, and design audio.' },
      { step: '03', title: 'Ready-to-Post Export', desc: 'Final videos exported in 1080x1920 MP4 ready to post or run as paid ads.' },
    ],
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
    typeBadge: 'Paid Acquisition',
    turnaround: '48h Sprints',
    idealFor: 'Brands spending $3k–$50k/mo wanting measurable, profitable customer acquisition.',
    plainSummary:
      'Stop wasting money on ads that do not convert. We build and manage high-converting ad campaigns across Meta, TikTok, and Google Ads with aggressive weekly creative testing to lower your cost-per-acquisition and scale revenue predictably.',
    businessImpact: '3.5x+ Target ROAS • -45% Average Drop in Cost-Per-Acquisition',
    deliverables: [
      {
        title: 'Complete Pixel & Tracking Attribution',
        desc: 'Server-side CAPI and conversion tracking verified so every dollar is accounted for.',
      },
      {
        title: 'Weekly Creative Refresh Sprints',
        desc: 'Continuous delivery of fresh ad angles and formats to permanently defeat ad fatigue.',
      },
      {
        title: 'High-Intent Retargeting Funnels',
        desc: 'Segmenting warm visitors, cart abandoners, and repeat buyers for maximum conversion.',
      },
      {
        title: 'Real-Time ROAS Dashboard',
        desc: 'Live dashboard tracking ad spend, cost per lead, and revenue return daily.',
      },
    ],
    howItWorks: [
      { step: '01', title: 'Account Audit', desc: 'We audit past campaigns, pixel events, and competitor creative angles.' },
      { step: '02', title: 'Creative Testing Matrix', desc: 'We launch systematic headline, hook, and audience variations.' },
      { step: '03', title: 'Scale Winners', desc: 'We shift budget into proven winning ads and eliminate low-performing variations.' },
    ],
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
    typeBadge: 'B2B Pipeline',
    turnaround: '48h Sprints',
    idealFor: 'B2B SaaS, enterprise consulting, and high-ticket service agencies.',
    plainSummary:
      'Fill your sales calendar with qualified corporate decision-makers. We pinpoint your ideal customer profile, craft personalized multi-channel outreach, and book qualified sales appointments directly onto your calendar on autopilot.',
    businessImpact: '15–35 Pre-Qualified Decision-Maker Discovery Calls Monthly',
    deliverables: [
      {
        title: 'Verified Ideal Customer List',
        desc: 'Accurate executive contacts with verified work emails and direct LinkedIn profiles.',
      },
      {
        title: 'Multi-Touch Outreach Sequences',
        desc: 'Highly personalized, non-spammy email & LinkedIn messages that spark conversations.',
      },
      {
        title: 'Direct Calendar Booking Integration',
        desc: 'Interested prospects book directly onto your team calendar with pre-qualification questions.',
      },
      {
        title: 'CRM Handover & Lead Tracking',
        desc: 'Automated sync into HubSpot, Notion, or Salesforce with complete prospect notes.',
      },
    ],
    howItWorks: [
      { step: '01', title: 'Account Mapping', desc: 'We identify company size, revenue, and job titles of your best buyers.' },
      { step: '02', title: 'Campaign Launch', desc: 'We initiate targeted email and LinkedIn touches with custom value propositions.' },
      { step: '03', title: 'Scheduled Calls', desc: 'Warm leads reply and book meetings directly into your sales team calendar.' },
    ],
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
    typeBadge: 'Executive Brand',
    turnaround: '48h Sprints',
    idealFor: 'CEOs, venture-backed founders, partners, and high-ticket consultants.',
    plainSummary:
      'Position yourself as an undeniable authority in your industry. We ghostwrite compelling thought-leadership articles and design viral PDF slide decks so enterprise clients, investors, and partners come directly to you.',
    businessImpact: '50,000+ Monthly Executive Impressions • Inbound Enterprise Dealflow',
    deliverables: [
      {
        title: 'Executive Ghostwriting (3–5 Posts / Week)',
        desc: 'Thought leadership written in your authentic voice with zero buzzword fluff.',
      },
      {
        title: 'Viral PDF Document Decks',
        desc: 'High-authority multi-page slide decks formatted for maximum LinkedIn algorithm reach.',
      },
      {
        title: 'Complete Profile Optimization',
        desc: 'Transforming your personal headline, banner, and featured section into a landing page.',
      },
      {
        title: '45-Minute Monthly Founder Time',
        desc: 'Requires less than 1 hour of your time per month via a structured async interview.',
      },
    ],
    howItWorks: [
      { step: '01', title: 'Monthly Briefing', desc: 'A quick 45-minute monthly interview where we extract your unique insights.' },
      { step: '02', title: 'Editorial Drafting', desc: 'We transform your ideas into 20+ viral posts, PDF decks, and threads.' },
      { step: '03', title: 'Publishing & Networking', desc: 'We schedule posts, engage with commenters, and nurture incoming DMs.' },
    ],
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
    typeBadge: 'WebGL Web',
    turnaround: '48h Sprints',
    idealFor: 'New product launches, software platforms, and high-ticket service companies.',
    plainSummary:
      'Turn traffic into booked calls and paying customers. We design and build ultra-fast landing pages with luxury dark-mode aesthetics, responsive layouts, and conversion-focused copywriting that outperforms generic templates.',
    businessImpact: '2x–4x Higher Visitor-to-Lead Rate • <0.8s First Contentful Paint',
    deliverables: [
      {
        title: 'Conversion UI/UX Architecture & Copywriting',
        desc: 'Clear value propositions and structured benefit blocks that eliminate buyer hesitation.',
      },
      {
        title: 'Ultra-Fast React / Tailwind / WebGL Code',
        desc: 'Loads in under 0.8 seconds with smooth 60fps micro-interactions.',
      },
      {
        title: '100% Mobile & Desktop Responsive',
        desc: 'Tested and perfected across iPhone, iPad, Android, and 4K desktop screens.',
      },
      {
        title: 'Stripe, Cal.com & CRM Integrations',
        desc: 'Direct payment, appointment booking, and email capture connected out of the box.',
      },
    ],
    howItWorks: [
      { step: '01', title: 'Conversion Wireframe', desc: 'We map out the narrative flow, call-to-actions, and page structure.' },
      { step: '02', title: 'Design & Code Sprint', desc: 'We design in Figma and code directly in React and Tailwind for instant speed.' },
      { step: '03', title: 'Deploy & Optimize', desc: 'Live deployment on your domain with full analytics tracking.' },
    ],
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
    typeBadge: 'SEO & Search',
    turnaround: '48h Sprints',
    idealFor: 'Businesses wanting predictable organic leads without paying for every ad click.',
    plainSummary:
      'Get found by customers actively searching for your services on Google and modern AI engines like ChatGPT and Perplexity. We resolve technical SEO bottlenecks, structure programmatic keywords, and publish authority articles that rank #1.',
    businessImpact: 'Top 3 Search Dominance • Zero Cost-Per-Click Organic Inbound Leads',
    deliverables: [
      {
        title: 'Technical Website Audit & Speed Repair',
        desc: 'Fixing Core Web Vitals, site crawlability, indexing errors, and structured schema tags.',
      },
      {
        title: 'High-Intent Keyword Cluster Strategy',
        desc: 'Targeting specific high-value terms that your ideal buyers type into search engines.',
      },
      {
        title: 'Authority Long-Form Articles & Guides',
        desc: 'In-depth educational articles engineered to win Google snippets and AI answer quotes.',
      },
      {
        title: 'Monthly Ranking & Traffic Reporting',
        desc: 'Clear monthly progress tracking keyword movements, impressions, and organic clicks.',
      },
    ],
    howItWorks: [
      { step: '01', title: 'Audit & Roadmap', desc: 'We identify technical website bottlenecks and search keyword opportunities.' },
      { step: '02', title: 'On-Page Optimization', desc: 'We repair schema, speed, and meta architecture across all key pages.' },
      { step: '03', title: 'Authority Content Publishing', desc: 'We write and publish high-ranking articles to drive compounding organic traffic.' },
    ],
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

  // Lock body scroll and trap background events when modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedService(null);
    };

    if (selectedService) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedService]);

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

  // Update active card index (0 to 9) based on continuous scroll progress
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const clampedProgress = Math.min(1, Math.max(0, latest));
    const rawIndex = Math.round(clampedProgress * (ALL_10_SERVICES.length - 1));
    const safeIndex = Math.min(ALL_10_SERVICES.length - 1, Math.max(0, rawIndex));
    setActiveCardIndex(safeIndex);
  });

  // Card geometry: optimized compact width and gap for balanced stage view
  const cardWidth = windowWidth < 640 ? 280 : windowWidth < 1024 ? 330 : 360;
  const cardGap = windowWidth < 640 ? 14 : 24;
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
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-2 sm:py-3 px-3 sm:px-6 select-none">

        {/* Ambient Stage Lighting */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[350px] bg-electric-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[350px] bg-purple-brand/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* 1. Section Header: Compact Centered "Our Services" */}
        <div className="max-w-xl mx-auto w-full text-center z-20 shrink-0 pt-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight">
            Our Services
          </h2>
        </div>

        {/* 2. Pinned Horizontal Track Canvas with Full-Card Visibility & Center Origin */}
        <div className="relative w-full flex-1 flex items-center justify-center overflow-visible z-10 py-1">
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

              // 3-Card Fanned Orientation Arc centered at 50% 50% to prevent top/bottom boundary clipping:
              let cardFannedStyle = 'rotate-0 scale-90 opacity-25 z-0';
              if (isCenter) {
                cardFannedStyle =
                  'rotate-0 scale-[1.02] sm:scale-105 opacity-100 z-20 border-electric-500/50 shadow-glow-blue hover:scale-[1.07]';
              } else if (isLeftAdjacent) {
                cardFannedStyle =
                  '-rotate-6 hover:rotate-0 scale-[0.94] opacity-70 hover:opacity-100 z-10 hover:scale-100 hover:z-30 hover:border-electric-500/50 hover:shadow-glow-blue';
              } else if (isRightAdjacent) {
                cardFannedStyle =
                  'rotate-6 hover:rotate-0 scale-[0.94] opacity-70 hover:opacity-100 z-10 hover:scale-100 hover:z-30 hover:border-electric-500/50 hover:shadow-glow-blue';
              } else if (idx < activeCardIndex) {
                cardFannedStyle = '-rotate-12 scale-[0.84] opacity-20 z-0 pointer-events-none';
              } else {
                cardFannedStyle = 'rotate-12 scale-[0.84] opacity-20 z-0 pointer-events-none';
              }

              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  style={{
                    width: `${cardWidth}px`,
                    marginRight: `${cardGap}px`,
                    transformOrigin: '50% 50%',
                  }}
                  className={`shrink-0 h-[380px] sm:h-[400px] lg:h-[410px] rounded-3xl bg-[#111116] border border-white/[0.08] transition-all duration-500 ease-out cursor-pointer overflow-hidden flex flex-col justify-between group relative select-none transform ${cardFannedStyle}`}
                  data-cursor-text="EXPAND"
                >
                  {/* TOP 52% VISUAL SHOWCASE CANVAS */}
                  <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-black shrink-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-85 group-hover:opacity-100"
                    />
                    {/* Gradient Fade to Bottom Container */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-[#111116]/30 to-transparent" />

                    {/* Top Left: Badge with Icon & Type */}
                    <div className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-bold uppercase tracking-wider text-white flex items-center gap-1.5 shadow-md">
                      <Icon className="w-3 h-3 text-electric-400" />
                      <span>{service.typeBadge}</span>
                    </div>

                    {/* Top Right: Glowing Number Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-electric-400 shadow-md">
                        {service.number}
                      </span>
                    </div>

                    {/* FLOATING UNIQUE ANIMATED UI GRAPHIC OVERLAY */}
                    <div className="absolute bottom-3 left-3 right-3 z-10">
                      {service.overlayType === 'reach' && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-emerald-500/30 text-[11px] shadow-lg">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="font-bold text-white font-mono">{service.overlayBadge}</span>
                          <span className="text-[9px] text-gray-400 font-mono">Organic Lift</span>
                        </div>
                      )}

                      {service.overlayType === 'carousel' && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-purple-500/30 text-[11px] shadow-lg">
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          </div>
                          <span className="font-bold text-white font-mono">{service.overlayBadge}</span>
                        </div>
                      )}

                      {service.overlayType === 'ai-render' && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-cyan-500/30 text-[11px] shadow-lg">
                          <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
                          <span className="font-bold text-white font-mono">{service.overlayBadge}</span>
                        </div>
                      )}

                      {service.overlayType === 'palette' && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-amber-500/30 text-[11px] shadow-lg">
                          <div className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#070709] border border-white/30" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
                          </div>
                          <span className="font-bold text-white font-mono">{service.overlayBadge}</span>
                        </div>
                      )}

                      {service.overlayType === 'waveform' && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-rose-500/30 text-[11px] shadow-lg">
                          <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                          <span className="font-bold text-white font-mono">{service.overlayBadge}</span>
                        </div>
                      )}

                      {service.overlayType === 'roas' && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-emerald-500/30 text-[11px] shadow-lg">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="font-bold text-emerald-400 font-mono">{service.overlayBadge}</span>
                        </div>
                      )}

                      {service.overlayType === 'pipeline' && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-blue-500/30 text-[11px] shadow-lg">
                          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                          <span className="font-bold text-white font-mono">{service.overlayBadge}</span>
                        </div>
                      )}

                      {service.overlayType === 'linkedin' && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-[#0A66C2]/40 text-[11px] shadow-lg">
                          <span className="w-2 h-2 rounded-full bg-[#0A66C2] animate-pulse" />
                          <span className="font-bold text-white font-mono">{service.overlayBadge}</span>
                        </div>
                      )}

                      {service.overlayType === 'wireframe' && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-cyan-500/30 text-[11px] shadow-lg">
                          <span className="font-bold text-emerald-400 font-mono">{service.overlayBadge}</span>
                        </div>
                      )}

                      {service.overlayType === 'seo' && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-teal-500/30 text-[11px] shadow-lg">
                          <span className="font-bold text-teal-300 font-mono">★ {service.overlayBadge}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* BOTTOM TEXT BODY: Explicitly writes which service it is */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-[#111116] border-t border-white/[0.06]">
                    <div>
                      {/* Explicit Service Heading */}
                      <span className="text-[10px] font-semibold text-electric-400 tracking-wider uppercase block font-mono">
                        {service.categoryLabel}
                      </span>
                      <h3 className="mt-1 text-base sm:text-lg font-display font-bold text-white group-hover:text-electric-300 transition-colors leading-snug line-clamp-1">
                        {service.title}
                      </h3>
                      <p className="mt-1 text-xs text-gray-400 line-clamp-2 leading-relaxed">
                        {service.microTagline}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-gray-400">
                      <span className="font-mono text-[10px] text-gray-300">
                        {service.turnaround}
                      </span>
                      <span className="inline-flex items-center gap-1 text-electric-400 font-semibold group-hover:translate-x-1 transition-transform text-[11px]">
                        <span>Inspect Scope</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* 3. Ultra-Compact Bottom Controls Dock (Vertically Minimized) */}
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between gap-3 z-20 py-1.5 px-4 rounded-full bg-[#111116]/80 border border-white/[0.08] backdrop-blur-md shrink-0">
          {/* Left: Compact Progress Bar */}
          <div className="flex items-center gap-2.5 flex-1 max-w-xs">
            <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-electric-500 via-purple-brand to-cyan-400 rounded-full transition-all duration-200"
                style={{
                  width: `${((activeCardIndex + 1) / ALL_10_SERVICES.length) * 100}%`,
                }}
              />
            </div>
            <span className="text-[10px] font-mono text-gray-400 whitespace-nowrap">
              {Math.round(((activeCardIndex + 1) / ALL_10_SERVICES.length) * 100)}%
            </span>
          </div>

          {/* Center: Step Counter & Current Title */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-electric-500/10 border border-electric-500/20 text-electric-400">
              {ALL_10_SERVICES[activeCardIndex].number} / 10
            </span>
            <span className="text-xs text-white font-semibold truncate max-w-[140px] sm:max-w-xs hidden xs:inline">
              {ALL_10_SERVICES[activeCardIndex].title}
            </span>
          </div>

          {/* Right: Quick-Jump Navigation Arrows */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handlePrev}
              disabled={activeCardIndex === 0}
              className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${activeCardIndex === 0
                  ? 'border-white/5 text-gray-600 cursor-not-allowed'
                  : 'border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 active:scale-95'
                }`}
              aria-label="Previous Service"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeCardIndex === ALL_10_SERVICES.length - 1}
              className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${activeCardIndex === ALL_10_SERVICES.length - 1
                  ? 'border-white/5 text-gray-600 cursor-not-allowed'
                  : 'border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 active:scale-95'
                }`}
              aria-label="Next Service"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 4. DETAIL MODAL (SCROLL TRAPPED & MEANINGFUL CONTENT)     */}
      {/* ========================================================= */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setSelectedService(null)}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#111116] border border-white/[0.12] rounded-3xl shadow-2xl flex flex-col max-h-[88vh] overflow-hidden overscroll-contain"
          >
            {/* Modal Header Bar (Fixed / Shrink-0) */}
            <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-black shrink-0">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-[#111116]/50 to-black/40" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 border border-white/20 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-5 right-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-electric-400 bg-electric-500/10 px-2.5 py-0.5 rounded-full border border-electric-500/30">
                    {selectedService.categoryLabel}
                  </span>
                  <span className="text-[10px] font-mono text-gray-300 bg-white/[0.06] px-2.5 py-0.5 rounded-full border border-white/10">
                    {selectedService.turnaround}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white leading-tight">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            {/* Scrollable Body: Dedicated scroll container with overscroll-contain */}
            <div className="overflow-y-auto overscroll-contain flex-1 p-5 sm:p-7 space-y-6">

              {/* 1. Plain-English Summary (Easy to Understand) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#181820] border border-white/[0.08]">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-electric-400 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-electric-400" />
                  <span>What This Service Does For You</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                  {selectedService.plainSummary}
                </p>
                <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center gap-2 text-[11px] text-gray-400">
                  <Users className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span><strong className="text-gray-300">Ideal For:</strong> {selectedService.idealFor}</span>
                </div>
              </div>

              {/* 2. Core Deliverables (Tangible Outputs) */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-3 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Exact Deliverables & What You Receive</span>
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {selectedService.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-white leading-snug">
                          {item.title}
                        </h5>
                        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. How We Work Together (3 Clear Steps) */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-300 mb-3 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>How We Execute in 3 Steps</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {selectedService.howItWorks.map((step) => (
                    <div
                      key={step.step}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold text-electric-400 bg-electric-500/10 px-1.5 py-0.5 rounded border border-electric-500/20">
                          STEP {step.step}
                        </span>
                        <h6 className="text-xs font-bold text-white mt-1.5 leading-snug">
                          {step.title}
                        </h6>
                        <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Expected Business Impact Highlight */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 to-purple-950/30 border border-electric-500/20 flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-electric-400 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold text-electric-400 block">
                    Expected Outcome
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white">
                    {selectedService.businessImpact}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Fixed Footer CTA (Shrink-0) */}
            <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#0E0E14] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-gray-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Commercial IP Rights • Slack & Notion Portals</span>
              </div>

              <a
                href="#booking-calendar"
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-electric-500 via-purple-brand to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-glow-blue hover:scale-[1.02] transition-transform"
              >
                <span>Book This Sprint</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

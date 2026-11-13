import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShoppingBag,
  Sparkle,
  Home,
  HeartPulse,
  Utensils,
  GraduationCap,
  Laptop,
  Briefcase,
  UserCheck,
  Compass,
  Rocket,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import CTASection from '../components/common/CTASection';

export default function IndustriesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState('ecommerce');

  const industries = [
    {
      id: 'ecommerce',
      name: 'E-commerce & Online Stores',
      icon: ShoppingBag,
      tagline: 'Scale product conversions through high-velocity creative testing and Reels.',
      overview:
        'Modern e-commerce requires constant visual freshness. Between ad creative fatigue, rising customer acquisition costs, and evolving social shop algorithms, online brands need scalable, photorealistic product imagery and dynamic vertical video.',
      challenges: [
        'Ad fatigue causing rising cost per customer acquisition (CPA)',
        'High cost of frequent physical studio product photoshoots',
        'Struggling to create continuous UGC and short-form video variations',
      ],
      relevantServices: [
        'AI-Powered Product Staging',
        'Short-Form Video & Reels Creation',
        'Meta & TikTok Paid Advertising',
        'High-Converting Landing Page Copy',
      ],
      solution:
        'We combine AI generative product staging with rapid-fire video editing and Meta ad testing, enabling direct-to-consumer brands to test dozens of aesthetic environments and creative angles weekly without ballooning production budgets.',
    },
    {
      id: 'fashion',
      name: 'Fashion & Lifestyle',
      icon: Sparkles,
      tagline: 'Cultivate distinct brand aesthetics that evoke desire and prestige.',
      overview:
        'Fashion is fundamentally visual and emotional. Consumers do not simply buy clothing or lifestyle accessories; they align with an aspirational identity. Inconsistent visual grids or generic graphics immediately damage brand equity.',
      challenges: [
        'Standing out in an intensely saturated global digital market',
        'Maintaining cohesive aesthetic grids across Instagram and Pinterest',
        'Translating garment textures, drape, and quality into digital formats',
      ],
      relevantServices: [
        'Graphic Design & Brand Identity',
        'Content Creation & Social Feeds',
        'TikTok & Instagram Reels',
        'Lookbook & Promotional Banners',
      ],
      solution:
        'AJDesigners crafts editorial social feeds, kinetic short-form styling clips, and modern typography templates that establish your fashion brand as an authoritative tastemaker in North America, Europe, and international markets.',
    },
    {
      id: 'beauty',
      name: 'Beauty & Skincare',
      icon: Sparkle,
      tagline: 'Establish scientific credibility and sensory appeal.',
      overview:
        'Beauty consumers seek both sensory indulgence and proof of efficacy. Skincare marketing requires delicate balance: educational ingredient breakdowns alongside pristine, luminous product visuals.',
      challenges: [
        'Communicating ingredient science without boring consumers',
        'Gaining trust in a market flooded with exaggerated claims',
        'Producing high-end botanical and bathroom lifestyle contexts',
      ],
      relevantServices: [
        'AI Product Lifestyle Imagery',
        'Educational Carousel Posts',
        'Social Media Management',
        'Meta Paid Ad Campaigns',
      ],
      solution:
        'We produce photorealistic botanical and spa lifestyle staging using custom AI pipelines, backed by educational swipe carousels that demystify active ingredients and build customer confidence.',
    },
    {
      id: 'realestate',
      name: 'Real Estate & Property',
      icon: Home,
      tagline: 'Showcase architectural excellence to high-net-worth investors.',
      overview:
        'Real estate marketing demands prestige, architectural precision, and international investor trust. Whether marketing luxury condominiums in Dubai or residential developments in London, presentation dictates perception.',
      challenges: [
        'Sourcing qualified buyers and accredited investors',
        'Boring property listings that look identical to competitors',
        'High lead costs on traditional Google and portal advertising',
      ],
      relevantServices: [
        'Promotional Video Walkthrough Editing',
        'LinkedIn & Meta Real Estate Campaigns',
        'Luxury Brochure & Pitch Presentation Design',
        'B2B Lead Generation',
      ],
      solution:
        'We transform raw architectural walkthroughs and drone captures into cinematic vertical videos, accompanied by deep navy and gold property carousels and targeted investor lead funnels.',
    },
    {
      id: 'healthcare',
      name: 'Healthcare & Wellness',
      icon: HeartPulse,
      tagline: 'Build patient trust and medical authority through compliant communication.',
      overview:
        'Healthcare, functional wellness, and medical clinics operate under strict trust requirements. Patients demand reassuring expertise, clear procedure explanations, and compassionate visual presentation.',
      challenges: [
        'Strict regulatory and advertising sensitivity constraints',
        'Explaining complex medical procedures in accessible layman terms',
        'Converting website visitors into scheduled clinic consultations',
      ],
      relevantServices: [
        'Educational Medical Social Content',
        'SEO & Search Visibility Optimization',
        'Website Copywriting & Doctor Profiles',
        'Patient Inquiry Lead Funnels',
      ],
      solution:
        'We develop authoritative, compliant medical educational content, empathetic patient landing pages, and search-optimized blogs that position practitioners as trusted community authorities.',
    },
    {
      id: 'restaurants',
      name: 'Restaurants & Hospitality',
      icon: Utensils,
      tagline: 'Trigger cravings and drive reservations through mouthwatering visual storytelling.',
      overview:
        'Hospitality decisions are made on appetite and atmosphere. A dining experience begins on Instagram or TikTok hours before the customer steps through the door.',
      challenges: [
        'Keeping weekly menus, events, and specials consistently updated',
        'Capturing the kinetic energy and warmth of the dining room',
        'Driving off-peak reservations and private dining inquiries',
      ],
      relevantServices: [
        'Short-Form Reels & Food Video Edits',
        'Local Social Media Community Management',
        'Promotional Menu & Story Designs',
        'Meta Location-Targeted Ads',
      ],
      solution:
        'We produce high-retention food preparation reels, sizzling table showcases, and hyper-targeted geo-ads that drive reservations and private dining bookings.',
    },
    {
      id: 'education',
      name: 'Education & E-learning',
      icon: GraduationCap,
      tagline: 'Attract committed students and professional program applicants.',
      overview:
        'Online academies, bootcamps, and universities require prospective learners to invest both significant capital and months of effort. Trust, graduate outcomes, and syllabus clarity are essential.',
      challenges: [
        'High tuition or enrollment drop-off rates before completion',
        'Differentiating online courses from free YouTube tutorials',
        'Communicating curriculum depth in quick social formats',
      ],
      relevantServices: [
        'Educational Carousel Designs',
        'B2B & B2C Lead Generation Funnels',
        'Webinar & Course Landing Page Copywriting',
        'Student Testimonial Video Packaging',
      ],
      solution:
        'We engineer multi-stage lead funnels—downloadable syllabus guides, sample lecture Reels, and high-converting landing pages that systematically address student hesitations.',
    },
    {
      id: 'technology',
      name: 'Technology & SaaS',
      icon: Laptop,
      tagline: 'Clarify complex software value into enterprise pipeline.',
      overview:
        'B2B software platforms frequently struggle with messaging: engineers write about technical features rather than business outcomes. We translate complex architectures into clear ROI.',
      challenges: [
        'Vague value propositions that confuse non-technical executives',
        'Long sales cycles requiring continuous prospect nurturing',
        'High customer acquisition costs on competitive search keywords',
      ],
      relevantServices: [
        'LinkedIn Executive Thought Leadership',
        'B2B Lead Generation & Whitepaper Funnels',
        'Website & Product UI Mockup Copywriting',
        'Motion Graphic Product Explainer Videos',
      ],
      solution:
        'We craft outcome-driven landing pages, executive LinkedIn ghostwriting systems, and motion graphic product breakdowns that capture enterprise IT decision-maker interest.',
    },
    {
      id: 'professional',
      name: 'Professional Services',
      icon: Briefcase,
      tagline: 'Establish undeniable credibility for legal, accounting, and corporate firms.',
      overview:
        'Corporate accounting, law practices, and financial advisories sell intellectual capital. Their digital presence must convey rigorous compliance, stability, and intellectual excellence.',
      challenges: [
        'Looking stuffy, dated, or unapproachable online',
        'Reliance on traditional word-of-mouth with zero inbound digital flow',
        'Difficulty demonstrating subject matter expertise without jargon',
      ],
      relevantServices: [
        'LinkedIn Company & Partner Branding',
        'Corporate Brochure & Presentation Design',
        'SEO & Search Engine Discoverability',
        'High-Converting Consultation Funnels',
      ],
      solution:
        'We modernize legacy corporate brand presentations, ghostwrite strategic regulatory updates on LinkedIn, and build frictionless consultation request funnels for partners.',
    },
    {
      id: 'consulting',
      name: 'Consulting & Coaching',
      icon: UserCheck,
      tagline: 'Monetize intellectual frameworks and attract premium advisory clients.',
      overview:
        'Consultants, executive advisors, and management coaches must demonstrate personal authority. Prospects judge consulting fees based on the perceived clarity and caliber of the advisor.',
      challenges: [
        'Overcoming pricing resistance for high-ticket advisory packages',
        'Generating consistent inbound discovery calls',
        'Structuring personal wisdom into scalable social content',
      ],
      relevantServices: [
        'Executive Personal Branding',
        'LinkedIn Authority Ghostwriting',
        'Lead Magnet Architecture (Guides & Frameworks)',
        'Consultation Booking Landing Pages',
      ],
      solution:
        'We turn your proprietary methodology into eye-catching framework carousels, video shorts, and automated lead capture funnels that pre-qualify clients before they book a call.',
    },
    {
      id: 'travel',
      name: 'Travel & Tourism',
      icon: Compass,
      tagline: 'Ignite wanderlust and capture luxury international bookings.',
      overview:
        'Travel marketing thrives on escapism and aspirational storytelling. From boutique European villas to island resorts, digital travelers demand immersive visual experiences.',
      challenges: [
        'High dependence on third-party booking portals and commissions',
        'Seasonal revenue fluctuations and off-peak booking voids',
        'Reaching high-spending travelers in international markets',
      ],
      relevantServices: [
        'Cinematic Short-Form Travel Reels',
        'AI Lifestyle Vacation Staging',
        'Targeted International Meta Ads',
        'Boutique Hospitality Web Copy',
      ],
      solution:
        'We craft visually arresting destination videos, highlight bespoke itineraries, and execute targeted paid campaigns across the US, UK, and UAE to drive direct bookings.',
    },
    {
      id: 'startups',
      name: 'Startups & Emerging Brands',
      icon: Rocket,
      tagline: 'Launch with international polish and establish immediate market traction.',
      overview:
        'New ventures must punch above their weight. With limited runway and zero brand recognition, early-stage startups need cohesive branding, agile content, and rapid validation.',
      challenges: [
        'Limited marketing budget requiring maximum capital efficiency',
        'Zero initial domain authority and cold social following',
        'Need to impress early customers, strategic partners, and investors',
      ],
      relevantServices: [
        'Brand Identity Starter Kits',
        'Social Media Management (Starter Package)',
        'Founder LinkedIn Launch Strategy',
        'Launch Landing Page Copywriting',
      ],
      solution:
        'Our Starter and Growth monthly packages give new brands the creative output of a full marketing department at a fraction of full-time hiring costs, positioning the venture for seed funding and customer growth.',
    },
  ];

  const current = industries.find((i) => i.id === selectedIndustry) || industries[0];
  const CurrentIcon = current.icon;

  return (
    <div className="pt-24 bg-[#070709] min-h-screen text-gray-100">
      {/* 1. HERO SECTION */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-electric-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-brand/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-electric-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tailored Industry Blueprints</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight text-white">
            Specialized Digital Strategies for <span className="gradient-text">Your Industry.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Every market sector possesses distinct buying journeys, customer objections, and algorithmic dynamics. Explore how AJDesigners configures marketing and creative solutions for 12 key global industries.
          </p>
        </div>
      </section>

      {/* 2. INDUSTRY SELECTOR TABS & DETAIL VIEW */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal Scrollable Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {industries.map((ind) => {
            const Icon = ind.icon;
            const isSelected = selectedIndustry === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustry(ind.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-electric-500 to-purple-brand text-white shadow-glow-blue border border-white/20'
                    : 'bg-[#111116] text-gray-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.08]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Showcase Card */}
        <div className="bg-[#111116] rounded-3xl p-8 sm:p-12 border border-white/[0.08] shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/[0.08] mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-electric-500 to-purple-brand text-white flex items-center justify-center shadow-glow-blue shrink-0">
                <CurrentIcon className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-electric-400">
                  Industry Blueprint
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  {current.name}
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  {current.tagline}
                </p>
              </div>
            </div>

            <div>
              <a
                href="#booking-calendar"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-electric-500 to-purple-brand hover:scale-[1.02] transition-transform shadow-glow-blue"
              >
                <span>Book {current.name} Call</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Overview */}
          <div className="mb-10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-2 font-mono">
              Market Context & Consumer Psychology:
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed max-w-4xl">
              {current.overview}
            </p>
          </div>

          {/* Two Column Breakdown: Challenges vs Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Challenges */}
            <div className="p-6 rounded-2xl bg-[#181820] border border-white/[0.06]">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-4">
                <AlertCircle className="w-4 h-4" />
                <span>Common Industry Friction Points</span>
              </div>
              <ul className="space-y-3">
                {current.challenges.map((ch, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Potential Solutions */}
            <div className="p-6 rounded-2xl bg-electric-500/10 border border-electric-500/20">
              <div className="flex items-center gap-2 text-electric-400 font-bold text-xs uppercase tracking-wider mb-4">
                <CheckCircle2 className="w-4 h-4" />
                <span>AJDesigners Growth Architecture</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                {current.solution}
              </p>
            </div>
          </div>

          {/* Recommended Services Strip */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2 font-mono">
                Recommended Core Services for {current.name}:
              </span>
              <div className="flex flex-wrap gap-2">
                {current.relevantServices.map((srv, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium px-3 py-1 rounded-lg bg-[#181820] text-gray-200 border border-white/[0.08]"
                  >
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="#booking-calendar"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-electric-400 hover:text-white transition-colors shrink-0"
            >
              <span>Schedule Strategy Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. EMBEDDED BOOKING CALENDAR */}
      <BookingCalendarWidget />
    </div>
  );
}


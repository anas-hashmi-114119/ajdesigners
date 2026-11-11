import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Users2,
  Building2,
  ShoppingBag,
  Cpu,
  Layers,
  ShieldCheck,
  Globe2,
  ChevronRight,
  Play,
  UserCheck,
} from 'lucide-react';
import { serviceAPI, portfolioAPI } from '../services/api';
import ServiceCard from '../components/common/ServiceCard';
import ProjectCard from '../components/common/ProjectCard';
import ProcessSection from '../components/common/ProcessSection';
import CTASection from '../components/common/CTASection';
import HeroCanvasShader from '../components/common/HeroCanvasShader';
import ShowreelModal from '../components/common/ShowreelModal';
import { MacBookMockup, IPhoneMockup, BillboardMockup } from '../components/common/DeviceMockups';
import AgencyLottieGraphic from '../components/common/AgencyLottieGraphic';
import BentoServicesGrid from '../components/common/BentoServicesGrid';

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [heroTab, setHeroTab] = useState('workflow');
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [sectorTab, setSectorTab] = useState('b2b');

  // 3D Perspective Card Tilt
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0, sheenX: 50, sheenY: 50 });
  const cardRef = useRef(null);
  const heroHeadingRef = useRef(null);

  const handleMouseMoveCard = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    const sheenX = (x / rect.width) * 100;
    const sheenY = (y / rect.height) * 100;

    setCardTilt({ x: rotateX, y: rotateY, sheenX, sheenY });
  };

  const handleMouseLeaveCard = () => {
    setCardTilt({ x: 0, y: 0, sheenX: 50, sheenY: 50 });
  };

  useEffect(() => {
    if (heroHeadingRef.current) {
      gsap.fromTo(
        heroHeadingRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out', delay: 0.15 }
      );
    }
  }, []);

  useEffect(() => {
    // Fetch core services
    serviceAPI
      .getAll({ featured: 'true' })
      .then((res) => {
        if (res.data.success && res.data.services.length > 0) {
          setServices(res.data.services.slice(0, 6));
        }
      })
      .catch((err) => console.error('Error fetching services:', err));

    // Fetch featured portfolio concept projects
    portfolioAPI
      .getAll({ featured: 'true' })
      .then((res) => {
        if (res.data.success && res.data.projects.length > 0) {
          setFeaturedProjects(res.data.projects.slice(0, 4));
        }
      })
      .catch((err) => console.error('Error fetching portfolio:', err));
  }, []);

  const whyChoosePoints = [
    {
      title: 'Creative & Customized Strategies',
      desc: 'No boilerplate copy or recycled templates. We tailor every strategy around your individual business objectives and brand tone.',
      icon: Sparkles,
    },
    {
      title: 'Human Creativity Meets AI Innovation',
      desc: 'We combine generative AI speed for conceptualization with meticulous human art direction, brand alignment, and quality control.',
      icon: Cpu,
    },
    {
      title: 'Built for B2B & B2C Excellence',
      desc: 'Equally adept at driving corporate lead pipelines on LinkedIn and generating consumer excitement on Instagram and TikTok.',
      icon: Layers,
    },
    {
      title: 'Multi-Platform Authority',
      desc: 'Holistic cross-channel execution across Instagram, LinkedIn, TikTok, Facebook, Google Ads, and Meta platforms.',
      icon: Globe2,
    },
    {
      title: 'Flexible & Transparent Packages',
      desc: 'Clear, milestone-based monthly plans and standalone creative bundles with zero hidden fees or locked contracts.',
      icon: ShieldCheck,
    },
    {
      title: 'Rigorous Quality Delivery',
      desc: 'Every design, caption, and edit undergoes multi-stage review before delivery to protect and elevate your market reputation.',
      icon: CheckCircle2,
    },
    {
      title: 'Transparent Communication',
      desc: 'Direct collaboration via shared project spaces, weekly milestone reports, and scheduled strategy consultations.',
      icon: Users2,
    },
    {
      title: 'International Remote Operations',
      desc: 'Optimized workflow serving clients across USA, UK, Canada, Australia, UAE, Europe, and global international hubs.',
      icon: Globe2,
    },
  ];

  return (
    <div className="pt-24">
      {/* Showreel Modal */}
      <ShowreelModal isOpen={showreelOpen} onClose={() => setShowreelOpen(false)} />

      {/* 1. HERO SECTION WITH WEBGL / CANVAS SHADER & AMBIENT VIDEO LOOP */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-navy-900 text-white">
        {/* Real-time Interactive Liquid Wave Shader */}
        <HeroCanvasShader />

        {/* Ambient Dark Navy Mesh & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-transparent to-navy-950 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-electric-300 text-xs font-semibold backdrop-blur-md shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
                <span>Creative Minds. Digital Growth.</span>
              </div>

              <h1
                ref={heroHeadingRef}
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.1]"
              >
                Creative Digital Solutions That{' '}
                <span className="bg-gradient-to-r from-electric-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                  Move Your Business Forward.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-charcoal-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                From social media management and content creation to AI-powered creative solutions and digital marketing, AJDesigners helps businesses build stronger brands and grow their online presence.
              </p>

              {/* Value Pillar Chips */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1 text-xs text-charcoal-300">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-electric-400" />
                  <span>No Template Clones</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                  <span>Human Artistry + AI Agility</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                  <Globe2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Global Timezone Coverage</span>
                </span>
              </div>

              {/* Action Buttons: Consultation + Showreel + Explore */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
                <Link
                  to="/contact"
                  data-cursor-text="CONSULT"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-electric-500 via-electric-600 to-purple-brand shadow-glow-blue hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <span>Get a Free Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => setShowreelOpen(true)}
                  data-cursor-text="PLAY"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all group"
                >
                  <div className="w-6 h-6 rounded-full bg-electric-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow-blue">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                  <span>Agency Showreel</span>
                </button>

                <Link
                  to="/services"
                  data-cursor-text="EXPLORE"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-semibold text-charcoal-200 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  <span>Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* International Markets Strip */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 text-xs text-charcoal-300">
                <span className="font-semibold text-white flex items-center gap-1.5 mr-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Serving Global Markets:</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-charcoal-200 hover:text-white transition-colors">🇺🇸 United States</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-charcoal-200 hover:text-white transition-colors">🇬🇧 United Kingdom</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-charcoal-200 hover:text-white transition-colors">🇨🇦 Canada</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-charcoal-200 hover:text-white transition-colors">🇦🇺 Australia</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-charcoal-200 hover:text-white transition-colors">🇦🇪 UAE</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-charcoal-200 hover:text-white transition-colors">🇪🇺 Europe</span>
              </div>
            </div>

            {/* Right Visual Composition with Sleek 3D Device Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Primary 3D MacBook Pro Mockup */}
                <div
                  ref={cardRef}
                  onMouseMove={handleMouseMoveCard}
                  onMouseLeave={handleMouseLeaveCard}
                  style={{
                    transform: `perspective(1000px) rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
                    transition: 'transform 0.15s ease-out',
                  }}
                  className="relative z-20"
                >
                  <MacBookMockup
                    imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80"
                    title="Global Brand Performance Suite"
                    badge="Multi-Platform AI Engine"
                  />
                </div>

                {/* Floating 3D iPhone Pro Mockup overlapping */}
                <div className="absolute -bottom-10 -right-6 w-44 sm:w-52 z-30 hidden sm:block drop-shadow-2xl hover:scale-105 transition-transform duration-300">
                  <IPhoneMockup
                    imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
                    brandName="@ajdesigners.live"
                    caption="Viral Short-Form Reels Production"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INFINITE KINETIC MARQUEE RIBBON */}
      <div className="relative overflow-hidden py-4 bg-navy-950 border-y border-white/10 text-white select-none">
        <div className="flex w-max animate-marquee space-x-8 text-xs font-mono font-bold uppercase tracking-widest text-charcoal-300">
          <span className="flex items-center gap-2"><span className="text-electric-400">★</span> SOCIAL MEDIA MANAGEMENT</span>
          <span className="flex items-center gap-2"><span className="text-purple-brand">★</span> AI-POWERED 3D CREATIVE STAGING</span>
          <span className="flex items-center gap-2"><span className="text-pink-400">★</span> VIRAL REELS & SHORT-FORM VIDEO</span>
          <span className="flex items-center gap-2"><span className="text-blue-400">★</span> B2B LEAD GENERATION FUNNELS</span>
          <span className="flex items-center gap-2"><span className="text-emerald-400">★</span> EXECUTIVE LINKEDIN GHOSTWRITING</span>
          <span className="flex items-center gap-2"><span className="text-yellow-400">★</span> BRAND IDENTITY & PACKAGING DESIGN</span>
          <span className="flex items-center gap-2"><span className="text-electric-400">★</span> INTERNATIONAL DIGITAL AGENCY</span>
          <span className="flex items-center gap-2"><span className="text-purple-brand">★</span> SERVING USA • UK • CANADA • AUSTRALIA • UAE • EUROPE</span>
          {/* Duplicate set for infinite loop */}
          <span className="flex items-center gap-2"><span className="text-electric-400">★</span> SOCIAL MEDIA MANAGEMENT</span>
          <span className="flex items-center gap-2"><span className="text-purple-brand">★</span> AI-POWERED 3D CREATIVE STAGING</span>
          <span className="flex items-center gap-2"><span className="text-pink-400">★</span> VIRAL REELS & SHORT-FORM VIDEO</span>
          <span className="flex items-center gap-2"><span className="text-blue-400">★</span> B2B LEAD GENERATION FUNNELS</span>
          <span className="flex items-center gap-2"><span className="text-emerald-400">★</span> EXECUTIVE LINKEDIN GHOSTWRITING</span>
          <span className="flex items-center gap-2"><span className="text-yellow-400">★</span> BRAND IDENTITY & PACKAGING DESIGN</span>
          <span className="flex items-center gap-2"><span className="text-electric-400">★</span> INTERNATIONAL DIGITAL AGENCY</span>
          <span className="flex items-center gap-2"><span className="text-purple-brand">★</span> SERVING USA • UK • CANADA • AUSTRALIA • UAE • EUROPE</span>
        </div>
      </div>

      {/* 2. INTRODUCTION SECTION */}
      <section className="py-20 bg-surface-light border-b border-charcoal-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-100 text-electric-600 text-xs font-semibold">
                <span>About AJDesigners</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 tracking-tight leading-tight">
                Your Digital Growth Partner
              </h2>
              <p className="text-sm font-semibold text-electric-600 font-display">
                Creative Minds. Digital Growth.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-5 text-charcoal-700 text-sm sm:text-base leading-relaxed">
              <p>
                At AJDesigners, we believe every business deserves a strong, recognizable digital identity. Our team combines creativity, technology and strategic thinking to help brands communicate their value, connect with their audiences and build lasting digital experiences.
              </p>
              <p>
                We are not simply a social media posting company. We are a creative and strategic digital partner that helps businesses develop their digital identity and communicate effectively with their target audiences across North America, Europe, Australia, and the Middle East.
              </p>
              <div className="pt-2 flex items-center gap-6">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-navy-900 hover:text-electric-600 transition-colors"
                >
                  <span>Learn more about our agency story & founders</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENTO SERVICES ARCHITECTURE (UPGRADED FROM BASIC BOXES) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-100 text-electric-600 text-xs font-semibold mb-3">
                <span>Disciplines & Capabilities</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 tracking-tight">
                Our Core Creative Services
              </h2>
              <p className="mt-3 text-base text-charcoal-700">
                Engineered in modern Bento-style architecture with glassmorphism, AI speed, and meticulous human art direction.
              </p>
            </div>

            <div className="mt-6 md:mt-0">
              <Link
                to="/services"
                data-cursor-text="ALL SERVICES"
                className="inline-flex items-center gap-2 text-sm font-bold text-electric-600 hover:text-electric-700"
              >
                <span>Explore All 10 Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Bento Grid */}
          <BentoServicesGrid />
        </div>
      </section>

      {/* 4. DUAL-SECTOR CAPABILITIES WITH 3D DEVICE PREVIEWS */}
      <section className="py-24 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-electric-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-electric-400 text-xs font-semibold mb-3">
              <span>Dual-Sector Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Who We Work With
            </h2>
            <p className="mt-4 text-base text-charcoal-300">
              Calibrated specifically for both commercial enterprise buyers and high-velocity consumer lifestyle audiences.
            </p>

            {/* Interactive Sector Switcher */}
            <div className="inline-flex items-center p-1.5 rounded-full bg-navy-950 border border-white/10 shadow-2xl mt-8">
              <button
                type="button"
                onClick={() => setSectorTab('b2b')}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                  sectorTab === 'b2b'
                    ? 'bg-gradient-to-r from-electric-500 to-blue-600 text-white shadow-glow-blue'
                    : 'text-charcoal-400 hover:text-white'
                }`}
              >
                🏢 For B2B Enterprises & SaaS
              </button>
              <button
                type="button"
                onClick={() => setSectorTab('b2c')}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                  sectorTab === 'b2c'
                    ? 'bg-gradient-to-r from-purple-brand to-pink-500 text-white shadow-glow-purple'
                    : 'text-charcoal-400 hover:text-white'
                }`}
              >
                🛍️ For B2C & Consumer Brands
              </button>
            </div>
          </div>

          {/* Interactive Split View with 3D Device Frames */}
          {sectorTab === 'b2b' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-fadeIn">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-electric-400">
                  Sector 01 • B2B COMMERCIAL
                </span>
                <h3 className="text-3xl font-display font-extrabold text-white">
                  For B2B Businesses, Tech Startups & Corporate Firms
                </h3>
                <p className="text-sm text-charcoal-300 leading-relaxed">
                  Helping startups, corporate enterprises, SaaS companies, consulting agencies, and professional service firms strengthen authority and generate high-value commercial leads.
                </p>

                <div className="space-y-3 pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-white">
                    Key Deliverables:
                  </p>
                  <ul className="space-y-2.5 text-xs text-charcoal-300">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-electric-400 shrink-0" />
                      <span>Executive LinkedIn profile management & thought leadership ghostwriting</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-electric-400 shrink-0" />
                      <span>B2B lead generation campaigns & downloadable lead magnet funnels</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-electric-400 shrink-0" />
                      <span>Corporate pitch decks, capability brochures, and landing pages</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <Link
                    to="/contact?type=B2B"
                    data-cursor-text="B2B CONSULT"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-bold text-white bg-electric-600 hover:bg-electric-500 shadow-glow-blue transition-all"
                  >
                    <span>Discuss B2B Growth Strategy</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* 3D Laptop Mockup for B2B */}
              <div className="lg:col-span-6">
                <MacBookMockup
                  imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80"
                  title="SaaS Executive Pipeline Analytics"
                  badge="B2B Lead Funnel"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-fadeIn">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-brand">
                  Sector 02 • B2C CONSUMER
                </span>
                <h3 className="text-3xl font-display font-extrabold text-white">
                  For E-Commerce, Fashion, Beauty & Lifestyle Brands
                </h3>
                <p className="text-sm text-charcoal-300 leading-relaxed">
                  Helping e-commerce stores, fashion labels, beauty and skincare brands, cafes, and personal influencers create viral short-form content, AI product staging, and devoted brand loyalty.
                </p>

                <div className="space-y-3 pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-white">
                    Key Deliverables:
                  </p>
                  <ul className="space-y-2.5 text-xs text-charcoal-300">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-brand shrink-0" />
                      <span>Instagram & TikTok content creation, scheduling, and community moderation</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-brand shrink-0" />
                      <span>Short-form Reels & TikTok video edits with kinetic animated subtitles</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-brand shrink-0" />
                      <span>AI-generated photorealistic product staging & lifestyle campaigns</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <Link
                    to="/contact?type=B2C"
                    data-cursor-text="B2C CONSULT"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-brand to-pink-500 shadow-glow-purple transition-all"
                  >
                    <span>Discuss B2C Creative Campaigns</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* 3D Phone Mockup for B2C */}
              <div className="lg:col-span-6 flex justify-center">
                <IPhoneMockup
                  imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
                  brandName="@luxe.apparel"
                  caption="Autumn Haute Couture collection launch with kinetic typography."
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. WHY CHOOSE AJDESIGNERS WITH CODE-BASED LOTTIE MOTION GRAPHIC */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-100 text-electric-600 text-xs font-semibold mb-3">
                <span>Our Strategic Advantage</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 tracking-tight">
                Why Choose AJDesigners?
              </h2>
              <p className="mt-4 text-base text-charcoal-700">
                We stand apart through strategic depth, transparent communication, and an authentic fusion of human creative direction and cutting-edge artificial intelligence.
              </p>
            </div>

            {/* Code-Based Lottie-Style 3D Neural Graphic */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="p-6 rounded-3xl bg-navy-900 border border-white/10 shadow-2xl flex flex-col items-center">
                <AgencyLottieGraphic className="w-40 h-40" />
                <div className="text-center mt-3">
                  <div className="text-xs font-bold text-white">AI + Human Synergy Engine</div>
                  <div className="text-[10px] text-charcoal-400">Continuous Real-Time Optimization</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoosePoints.map((point, index) => {
              const IconComp = point.icon;
              return (
                <div
                  key={index}
                  className="bg-surface-light rounded-2xl p-6 border border-charcoal-200/80 shadow-sm hover:shadow-card-elevated hover:border-electric-500/30 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white text-electric-600 flex items-center justify-center mb-4 shadow-sm border border-charcoal-100">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-display font-bold text-navy-900 mb-2">
                      {point.title}
                    </h3>
                    <p className="text-xs text-charcoal-700 leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. FOUNDERS EXECUTIVE SPOTLIGHT (YASHWA & AROOSA WITH REAL PHOTOGRAPHY) */}
      <section className="py-24 bg-navy-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-electric-400 text-xs font-semibold mb-3">
              <span>Agency Leadership</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Guided by Yashwa & Aroosa
            </h2>
            <p className="mt-3 text-base text-charcoal-300">
              "Your Brand. Our Creativity. Digital Growth Together."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Yashwa */}
            <div className="bg-navy-800/90 rounded-3xl p-8 border border-white/10 shadow-2xl flex flex-col justify-between group hover:border-electric-500/50 transition-all">
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-electric-500/50 shrink-0 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                    alt="Yashwa"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <h3 className="text-2xl font-display font-extrabold text-white">Yashwa</h3>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-electric-500/20 text-electric-300 border border-electric-500/30">
                      Co-Founder
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-charcoal-400">
                    Strategic Marketing & Commercial Consulting
                  </p>
                </div>
              </div>
              <p className="text-xs text-charcoal-300 leading-relaxed mb-6">
                Leading strategic client consulting, business development, and creative roadmap formulation. Passionate about empowering international brands through scalable marketing systems, modern digital identity, and customer-first storytelling.
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-charcoal-400">
                <span>AJDesigners Co-Founder</span>
                <span className="text-electric-400 font-semibold">Strategic Roadmaps</span>
              </div>
            </div>

            {/* Aroosa */}
            <div className="bg-navy-800/90 rounded-3xl p-8 border border-white/10 shadow-2xl flex flex-col justify-between group hover:border-purple-brand/50 transition-all">
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-purple-500/50 shrink-0 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                    alt="Aroosa"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <h3 className="text-2xl font-display font-extrabold text-white">Aroosa</h3>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Co-Founder
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-charcoal-400">
                    Creative Direction & Visual Production
                  </p>
                </div>
              </div>
              <p className="text-xs text-charcoal-300 leading-relaxed mb-6">
                Directing brand aesthetics, visual design systems, short-form video storytelling, and AI-assisted creative workflows. Committed to delivering memorable visual identities that stand out in crowded international feeds.
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-charcoal-400">
                <span>AJDesigners Co-Founder</span>
                <span className="text-purple-400 font-semibold">Creative Direction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. OUR WORK PROCESS */}
      <ProcessSection />

      {/* 7. PORTFOLIO / CONCEPT SHOWCASE */}
      {featuredProjects.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-soft text-purple-brand text-xs font-semibold mb-3">
                  <span>Selected Work</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 tracking-tight">
                  Creative Direction & Sample Concepts
                </h2>
                <p className="mt-3 text-base text-charcoal-700 max-w-2xl">
                  Explore original concept projects and sample work showcasing our capabilities across AI generation, visual identity, and social campaigns.
                </p>
              </div>

              <div className="mt-6 md:mt-0">
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 text-sm font-bold text-electric-600 hover:text-electric-700"
                >
                  <span>Explore Full Portfolio</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProjects.map((proj) => (
                <ProjectCard key={proj._id} project={proj} onSelect={setSelectedProject} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. FINAL CALL TO ACTION */}
      <CTASection
        heading="Ready to Build Something Great?"
        subheading="Let's discuss your business goals and develop a digital strategy that works for your brand."
        buttonText="Let's Talk About Your Project"
        buttonLink="/contact"
      />

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200 flex items-center justify-center text-sm font-bold"
            >
              ✕
            </button>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-navy-900">
              <img
                src={selectedProject.coverImage}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-electric-100 text-electric-700">
                {selectedProject.category}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-charcoal-100 text-charcoal-600">
                {selectedProject.industry}
              </span>
              {selectedProject.isConcept && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-soft text-purple-brand">
                  Concept Exploration
                </span>
              )}
            </div>

            <h3 className="text-2xl font-display font-extrabold text-navy-900 mb-3">
              {selectedProject.title}
            </h3>

            <p className="text-sm text-charcoal-700 leading-relaxed mb-6">
              {selectedProject.fullDescription || selectedProject.summary}
            </p>

            {selectedProject.servicesProvided && (
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase text-navy-900 mb-2">Services Provided:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.servicesProvided.map((s, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-lg bg-surface-light text-charcoal-700 border border-charcoal-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-charcoal-200 flex items-center justify-between">
              <span className="text-xs text-charcoal-500">Curated by AJDesigners</span>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-electric-500 hover:bg-electric-600"
              >
                <span>Request Similar Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


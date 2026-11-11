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
} from 'lucide-react';
import { serviceAPI, portfolioAPI } from '../services/api';
import ServiceCard from '../components/common/ServiceCard';
import ProjectCard from '../components/common/ProjectCard';
import ProcessSection from '../components/common/ProcessSection';
import CTASection from '../components/common/CTASection';

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [heroTab, setHeroTab] = useState('workflow');

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
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-navy-900 text-white">
        {/* Subtle mesh background glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-electric-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-purple-brand/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-electric-400 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
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
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-electric-400" />
                  <span>No Template Clones</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                  <span>Human Artistry + AI Agility</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <Globe2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Global Timezone Coverage</span>
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
                <Link
                  to="/contact"
                  data-cursor-text="CONSULT"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-electric-500 via-electric-600 to-purple-brand shadow-glow-blue hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <span>Get a Free Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/services"
                  data-cursor-text="EXPLORE"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-charcoal-200 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  <span>Explore Our Services</span>
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

            {/* Right Visual Composition with Interactive Tabs & 3D Spatial Tilt */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* 3D Spatial Tilt Card Mockup */}
                <div
                  ref={cardRef}
                  onMouseMove={handleMouseMoveCard}
                  onMouseLeave={handleMouseLeaveCard}
                  style={{
                    transform: `perspective(1000px) rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
                    transition: 'transform 0.15s ease-out',
                  }}
                  className="bg-navy-800/90 rounded-3xl p-6 border border-white/10 shadow-2xl backdrop-blur-xl relative z-20 overflow-hidden group"
                >
                  {/* Dynamic Specular Sheen Reflection tracking cursor */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at ${cardTilt.sheenX}% ${cardTilt.sheenY}%, rgba(255,255,255,0.12) 0%, transparent 65%)`,
                    }}
                  />
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    {/* Interactive Tab Switcher */}
                    <div className="flex items-center gap-1 bg-navy-900/90 p-1 rounded-xl border border-white/5 text-[10px]">
                      <button
                        onClick={() => setHeroTab('workflow')}
                        className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                          heroTab === 'workflow' ? 'bg-electric-500 text-white shadow-sm' : 'text-charcoal-400 hover:text-white'
                        }`}
                      >
                        Workflow
                      </button>
                      <button
                        onClick={() => setHeroTab('ai')}
                        className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                          heroTab === 'ai' ? 'bg-purple-brand text-white shadow-sm' : 'text-charcoal-400 hover:text-white'
                        }`}
                      >
                        AI Engine
                      </button>
                      <button
                        onClick={() => setHeroTab('b2b')}
                        className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                          heroTab === 'b2b' ? 'bg-blue-600 text-white shadow-sm' : 'text-charcoal-400 hover:text-white'
                        }`}
                      >
                        Growth
                      </button>
                    </div>
                  </div>

                  {heroTab === 'workflow' && (
                    <div className="space-y-3.5 animate-fadeIn">
                      <div className="p-3.5 rounded-2xl bg-navy-900/80 border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-electric-500/20 text-electric-400 flex items-center justify-center shrink-0">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">Monthly Content Strategy</div>
                            <div className="text-[10px] text-charcoal-400">12 High-Converting Posts + 8 Reels</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                          Approved
                        </span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-navy-900/80 border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-purple-brand/20 text-purple-brand flex items-center justify-center shrink-0">
                            <Cpu className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">Visual Identity Refresh</div>
                            <div className="text-[10px] text-charcoal-400">Typography, Palette & Guidelines</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full">
                          Published
                        </span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-navy-900/80 border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                            <Globe2 className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">Multi-Channel Distribution</div>
                            <div className="text-[10px] text-charcoal-400">Instagram, LinkedIn, TikTok Sync</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-electric-300 bg-electric-500/10 px-2 py-0.5 rounded-full">
                          Scheduled
                        </span>
                      </div>
                    </div>
                  )}

                  {heroTab === 'ai' && (
                    <div className="space-y-3.5 animate-fadeIn">
                      <div className="p-3.5 rounded-2xl bg-navy-900/80 border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-purple-brand/20 text-purple-brand flex items-center justify-center shrink-0">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">Photorealistic Product Staging</div>
                            <div className="text-[10px] text-charcoal-400">Generative 3D studio background rendering</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full">
                          Rendered
                        </span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-navy-900/80 border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-electric-500/20 text-electric-400 flex items-center justify-center shrink-0">
                            <Cpu className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">Human Art Direction Audit</div>
                            <div className="text-[10px] text-charcoal-400">Brand compliance & typography review</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                          Verified
                        </span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-navy-900/80 border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
                            <Layers className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">Multi-Ratio Asset Export</div>
                            <div className="text-[10px] text-charcoal-400">9:16 Reels, 1:1 Feed & 16:9 Landscape</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-pink-300 bg-pink-500/10 px-2 py-0.5 rounded-full">
                          Ready
                        </span>
                      </div>
                    </div>
                  )}

                  {heroTab === 'b2b' && (
                    <div className="space-y-3.5 animate-fadeIn">
                      <div className="p-3.5 rounded-2xl bg-navy-900/80 border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">Executive LinkedIn Ghostwriting</div>
                            <div className="text-[10px] text-charcoal-400">8 Founder thought leadership articles</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded-full">
                          Queued
                        </span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-navy-900/80 border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">Lead Generation Magnet</div>
                            <div className="text-[10px] text-charcoal-400">Custom B2B benchmark report PDF</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          Live
                        </span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-navy-900/80 border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-purple-brand/20 text-purple-brand flex items-center justify-center shrink-0">
                            <Users2 className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">High-Intent Inbound Pipeline</div>
                            <div className="text-[10px] text-charcoal-400">Qualified commercial inquiries</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full">
                          Converting
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-charcoal-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                      <span>100% Quality Controlled</span>
                    </span>
                    <span className="text-electric-400 font-semibold">Led by Yashwa & Aroosa</span>
                  </div>
                </div>

                {/* Floating Decorative Badges */}
                <div className="absolute -top-5 -right-5 bg-gradient-to-tr from-electric-500 to-purple-brand p-4 rounded-2xl shadow-glow-blue z-30 hidden sm:block">
                  <div className="text-xs font-extrabold text-white">Strategic Growth</div>
                  <div className="text-[10px] text-white/80">Tailored Roadmaps</div>
                </div>

                <div className="absolute -bottom-5 -left-5 bg-navy-800 border border-white/10 p-4 rounded-2xl shadow-xl z-30 hidden sm:block backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-electric-400" />
                    <div>
                      <div className="text-xs font-bold text-white">B2B & B2C Certified</div>
                      <div className="text-[10px] text-charcoal-400">International Delivery</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* 3. CORE SERVICES OVERVIEW */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-100 text-electric-600 text-xs font-semibold mb-3">
                <span>Featured Disciplines</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 tracking-tight">
                Our Core Services
              </h2>
              <p className="mt-3 text-base text-charcoal-700">
                Strategic marketing and creative solutions engineered to accelerate awareness, engagement, and customer acquisition.
              </p>
            </div>

            <div className="mt-6 md:mt-0">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-bold text-electric-600 hover:text-electric-700"
              >
                <span>View All 10 Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((srv, index) => (
              <ServiceCard key={srv._id || index} service={srv} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHO WE WORK WITH (B2B vs B2C Dual Focus) */}
      <section className="py-24 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-electric-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-electric-400 text-xs font-semibold mb-3">
              <span>Dual-Sector Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Who We Work With
            </h2>
            <p className="mt-4 text-base text-charcoal-300">
              Our marketing and creative models are specifically calibrated for both commercial enterprise buyers and high-velocity consumer audiences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* For B2B Businesses */}
            <div className="bg-navy-800/90 rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-electric-500/20 text-electric-400 flex items-center justify-center mb-6">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-electric-400">
                  Sector 01
                </span>
                <h3 className="text-2xl font-display font-extrabold text-white mt-1 mb-3">
                  For B2B Businesses & Tech Firms
                </h3>
                <p className="text-sm text-charcoal-300 leading-relaxed mb-6">
                  Helping startups, corporate enterprises, SaaS companies, consulting agencies, and professional service firms strengthen authority and generate high-value commercial leads.
                </p>

                <div className="space-y-3 mb-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-white">
                    Primary Requirements We Solve:
                  </p>
                  <ul className="space-y-2 text-xs text-charcoal-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-electric-400 shrink-0" />
                      <span>Executive LinkedIn profile management & thought leadership ghostwriting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-electric-400 shrink-0" />
                      <span>B2B lead generation campaigns & downloadable lead magnet funnels</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-electric-400 shrink-0" />
                      <span>Corporate branding, business brochures, and investor presentation decks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-electric-400 shrink-0" />
                      <span>High-converting landing page copywriting & service positioning</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <Link
                  to="/contact?type=B2B"
                  className="inline-flex items-center gap-2 text-xs font-bold text-electric-400 hover:text-white transition-colors"
                >
                  <span>Discuss B2B Growth Strategy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* For B2C Consumer Brands */}
            <div className="bg-navy-800/90 rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-brand/20 text-purple-brand flex items-center justify-center mb-6">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-brand">
                  Sector 02
                </span>
                <h3 className="text-2xl font-display font-extrabold text-white mt-1 mb-3">
                  For B2C & Consumer Lifestyle Brands
                </h3>
                <p className="text-sm text-charcoal-300 leading-relaxed mb-6">
                  Helping e-commerce stores, fashion labels, beauty and skincare brands, cafes, and personal influencers create engaging content and build devoted communities.
                </p>

                <div className="space-y-3 mb-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-white">
                    Primary Requirements We Solve:
                  </p>
                  <ul className="space-y-2 text-xs text-charcoal-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-brand shrink-0" />
                      <span>Instagram & TikTok content creation, scheduling, and community moderation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-brand shrink-0" />
                      <span>Short-form Reels & TikTok video edits with kinetic animated subtitles</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-brand shrink-0" />
                      <span>AI-generated product lifestyle imagery & photorealistic staging</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-brand shrink-0" />
                      <span>Meta Ads (Facebook/Instagram) paid customer acquisition campaigns</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <Link
                  to="/contact?type=B2C"
                  className="inline-flex items-center gap-2 text-xs font-bold text-purple-brand hover:text-white transition-colors"
                >
                  <span>Discuss B2C Creative Campaigns</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE AJDESIGNERS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-100 text-electric-600 text-xs font-semibold mb-3">
              <span>Our Edge</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 tracking-tight">
              Why Choose AJDesigners?
            </h2>
            <p className="mt-4 text-base text-charcoal-700">
              We stand apart through strategic depth, transparent communication, and a balanced fusion of creative talent and modern technology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoosePoints.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-surface-light border border-charcoal-200/80 hover:border-electric-500/40 hover:bg-white hover:shadow-card-elevated transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-electric-500 text-white flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-display font-bold text-navy-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-charcoal-700 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. OUR WORK PROCESS (5 Steps) */}
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


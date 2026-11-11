import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.1]">
                Creative Digital Solutions That Move Your Business Forward.
              </h1>

              <p className="text-base sm:text-lg text-charcoal-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                From social media management and content creation to AI-powered creative solutions and digital marketing, AJDesigners helps businesses build stronger brands and grow their online presence.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-electric-500 via-electric-600 to-purple-brand shadow-glow-blue hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <span>Get a Free Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-charcoal-200 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* International Markets Strip */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-charcoal-400">
                <span className="font-semibold text-white">Target Markets:</span>
                <span className="hover:text-electric-400 transition-colors">United States</span>
                <span>•</span>
                <span className="hover:text-electric-400 transition-colors">United Kingdom</span>
                <span>•</span>
                <span className="hover:text-electric-400 transition-colors">Canada</span>
                <span>•</span>
                <span className="hover:text-electric-400 transition-colors">Australia</span>
                <span>•</span>
                <span className="hover:text-electric-400 transition-colors">UAE</span>
                <span>•</span>
                <span className="hover:text-electric-400 transition-colors">Europe</span>
              </div>
            </div>

            {/* Right Visual Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Card Mockup */}
                <div className="bg-navy-800/90 rounded-3xl p-6 border border-white/10 shadow-2xl backdrop-blur-xl relative z-20">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[11px] font-mono text-charcoal-400">ajdesigners.workspace</span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-navy-900/80 border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-electric-500/20 text-electric-400 flex items-center justify-center">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Monthly Content Strategy</div>
                          <div className="text-[10px] text-charcoal-400">12 Designs + 8 Short-Form Videos</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                        Approved
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-navy-900/80 border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-brand/20 text-purple-brand flex items-center justify-center">
                          <Cpu className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">AI Creative Production</div>
                          <div className="text-[10px] text-charcoal-400">Generative Lifestyle Staging</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full">
                        Curated
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-navy-900/80 border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                          <Globe2 className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">B2B Multi-Platform Reach</div>
                          <div className="text-[10px] text-charcoal-400">LinkedIn + Meta Ads Optimization</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-electric-300 bg-electric-500/10 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-charcoal-400">
                    <span>100% Human Reviewed</span>
                    <span className="text-electric-400 font-semibold">Remote Collaboration Ready</span>
                  </div>
                </div>

                {/* Floating Decorative Badges */}
                <div className="absolute -top-6 -right-6 bg-gradient-to-tr from-electric-500 to-purple-brand p-4 rounded-2xl shadow-glow-blue z-30 hidden sm:block animate-pulse">
                  <div className="text-xs font-extrabold text-white">Strategic Growth</div>
                  <div className="text-[10px] text-white/80">Tailored Campaigns</div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-navy-800 border border-white/10 p-4 rounded-2xl shadow-xl z-30 hidden sm:block backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-electric-400" />
                    <div>
                      <div className="text-xs font-bold text-white">B2B & B2C Ready</div>
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


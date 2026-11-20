import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Filter,
  ArrowUpRight,
  Eye,
  Tag,
  CheckCircle2,
  X,
  Layers,
} from 'lucide-react';
import { portfolioAPI } from '../services/api';
import ProjectCard from '../components/common/ProjectCard';
import { MacBookMockup, IPhoneMockup, BillboardMockup } from '../components/common/DeviceMockups';
import BookingCalendarWidget from '../components/common/BookingCalendarWidget';

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mockupTab, setMockupTab] = useState('macbook');

  const categories = [
    'All',
    'Social Media Designs',
    'Branding Projects',
    'AI-Generated Creative Content',
    'Short-Form Videos',
    'Promotional Campaigns',
    'Content Calendars',
    'Website and Landing Page Projects',
  ];

  useEffect(() => {
    setLoading(true);
    portfolioAPI
      .getAll({ category: activeCategory !== 'All' ? activeCategory : undefined })
      .then((res) => {
        if (res.data.success) {
          setProjects(res.data.projects);
        }
      })
      .catch((err) => console.error('Error fetching portfolio:', err))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <div className="pt-24 bg-[#070709] min-h-screen text-gray-100">
      {/* 1. HERO SECTION */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-electric-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-brand/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-electric-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creative Showcase & Concept Explorations</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight text-white">
            Our Work & <span className="gradient-text">Creative Explorations.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Explore our curated collection of original sample projects, brand identity systems, AI generative assets, and short-form video concepts.
          </p>

          <div className="mt-4 text-xs text-gray-400 max-w-xl mx-auto italic">
            * Note: To uphold client confidentiality and international NDA agreements, select work represents concept explorations and aesthetic benchmarks engineered by Yashwa and Aroosa.
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. PINNACLE FLAGSHIP CONCEPT: AURELIA NOCTURNE            */}
      {/* ========================================================= */}
      <section className="py-12 bg-gradient-to-b from-[#070709] via-[#0B0D13] to-[#070709] border-y border-[#C69341]/30 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[350px] bg-gold-500/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-[#0E0E14] border border-[#C69341]/40 shadow-[0_0_60px_rgba(198,147,65,0.22)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Flagship Digital Experience • Awwwards-Caliber Concept</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white tracking-tight leading-tight">
                Aurelia Nocturne: <br />
                <span className="text-gold-300 italic font-normal">Haute Horlogerie & Astronomical Complications</span>
              </h2>

              <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-xl">
                A bespoke fictional luxury website concept engineered by AJDesigners. Features an interactive mechanical winding crown, live Day/Night Tritium luminescence switcher, scrubbable exploded caliber visualizer, and cryptographic Swiss provenance registry.
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-2 pt-1 text-xs font-mono text-gray-300">
                <span className="px-3 py-1 rounded-lg bg-[#181820] border border-white/10 text-gold-400">
                  Virtual Mechanical Crown
                </span>
                <span className="px-3 py-1 rounded-lg bg-[#181820] border border-white/10 text-gold-400">
                  Midnight Tritium Glow Mode
                </span>
                <span className="px-3 py-1 rounded-lg bg-[#181820] border border-white/10 text-gold-400">
                  Exploded Caliber AN-01
                </span>
                <span className="px-3 py-1 rounded-lg bg-[#181820] border border-white/10 text-gold-400">
                  122-Year Moonphase Scrubber
                </span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  to="/portfolio/aurelia-nocturne"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs sm:text-sm font-extrabold text-black bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C69341] hover:shadow-glow-gold hover:scale-[1.03] active:scale-[0.98] transition-all shadow-lg"
                >
                  <span>Launch Live Concept Experience</span>
                  <ArrowUpRight className="w-4 h-4 text-black" />
                </Link>

                <span className="text-xs font-mono text-gray-400">
                  Direct Live Route: /portfolio/aurelia-nocturne
                </span>
              </div>
            </div>

            {/* Right Visual Preview */}
            <div className="lg:col-span-5 relative">
              <Link
                to="/portfolio/aurelia-nocturne"
                className="group block relative rounded-2xl overflow-hidden aspect-[4/3] border border-gold-500/30 shadow-2xl bg-black cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85"
                  alt="Aurelia Nocturne Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white bg-[#070709]/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                  <div>
                    <span className="text-gold-400 font-bold block">CALIBER AN-01</span>
                    <span className="text-[10px] text-gray-400">Tourbillon • Tantalum • Meteorite</span>
                  </div>
                  <span className="text-gold-300 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>EXPLORE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3D INTERACTIVE DEVICE FRAME STUDIO */}
      <section className="py-16 bg-[#09090d] border-y border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-electric-400 font-mono">
              Interactive 3D Device Studio
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
              Cross-Platform Creative Visualizer
            </h2>
            <div className="mt-6 inline-flex p-1.5 rounded-full bg-[#111116] border border-white/[0.08]">
              <button
                onClick={() => setMockupTab('macbook')}
                className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all ${
                  mockupTab === 'macbook'
                    ? 'bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C69341] text-black shadow-glow-gold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                MacBook Pro (SaaS & Web)
              </button>
              <button
                onClick={() => setMockupTab('iphone')}
                className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all ${
                  mockupTab === 'iphone'
                    ? 'bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C69341] text-black shadow-glow-gold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                iPhone 16 Pro (Reels & TikTok)
              </button>
              <button
                onClick={() => setMockupTab('billboard')}
                className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all ${
                  mockupTab === 'billboard'
                    ? 'bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C69341] text-black shadow-glow-gold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Urban Billboard (Brand Campaign)
              </button>
            </div>
          </div>

          {/* Active 3D Mockup Display */}
          <div className="max-w-3xl mx-auto">
            {mockupTab === 'macbook' && (
              <MacBookMockup
                imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80"
                title="CloudScale SaaS Growth Platform"
                badge="Enterprise Marketing"
              />
            )}
            {mockupTab === 'iphone' && (
              <div className="flex justify-center">
                <IPhoneMockup
                  imageUrl="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
                  brandName="@vogue.haute"
                  caption="Autumn Haute Couture collection launch with kinetic motion subtitles."
                />
              </div>
            )}
            {mockupTab === 'billboard' && (
              <BillboardMockup
                imageUrl="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80"
                brand="AURORA BOTANICALS"
                headline="Redefining Organic Radiance Worldwide"
              />
            )}
          </div>
        </div>
      </section>

      {/* 3. CATEGORY FILTER TABS & PORTFOLIO GRID */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[50vh]">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C69341] text-black font-extrabold shadow-glow-gold border border-white/40'
                  : 'bg-[#111116] text-gray-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid View */}
        {loading ? (
          <div className="text-center py-24 text-gray-500 text-sm animate-pulse">
            Loading creative portfolio projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-[#111116] rounded-3xl border border-white/[0.08] p-8 max-w-md mx-auto">
            <p className="text-sm font-semibold text-gray-300">
              No projects found in category "{activeCategory}".
            </p>
            <button
              onClick={() => setActiveCategory('All')}
              className="mt-3 text-xs text-electric-400 font-bold hover:underline"
            >
              Show All Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj) => (
              <ProjectCard key={proj._id} project={proj} onSelect={setSelectedProject} />
            ))}
          </div>
        )}
      </section>

      {/* 4. PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="bg-[#111116] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl border border-white/[0.12]">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/[0.06] text-gray-300 hover:text-white hover:bg-white/10 flex items-center justify-center text-sm font-bold transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Cover Image */}
            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-black">
              <img
                src={selectedProject.coverImage}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Header info */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-electric-500/15 border border-electric-400/30 text-electric-400">
                {selectedProject.category}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {selectedProject.industry}
              </span>
            </div>

            <h3 className="text-2xl font-display font-extrabold text-white mb-3">
              {selectedProject.title}
            </h3>

            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              {selectedProject.fullDescription || selectedProject.summary}
            </p>

            {/* Services provided */}
            {selectedProject.servicesProvided && selectedProject.servicesProvided.length > 0 && (
              <div className="mb-6 p-4 rounded-xl bg-[#181820] border border-white/[0.06]">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                  Scope of Execution:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.servicesProvided.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-lg bg-[#111116] text-gray-200 border border-white/[0.08]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs text-gray-400 font-mono">
                Creative Direction: Yashwa & Aroosa
              </span>
              <a
                href="#booking-calendar"
                onClick={() => setSelectedProject(null)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-extrabold text-black bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C69341] shadow-glow-gold"
              >
                <span>Inquire About Similar Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 5. EMBEDDED STRATEGY CALL CALENDAR */}
      <BookingCalendarWidget />
    </div>
  );
}

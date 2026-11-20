import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowUpRight,
  Eye,
  Tag,
  CheckCircle2,
  X,
  Layers,
} from 'lucide-react';
import { portfolioAPI } from '../services/api';
import ProjectCard from '../components/common/ProjectCard';
import BookingCalendarWidget from '../components/common/BookingCalendarWidget';
import CinematicWebGallery from '../components/portfolio/CinematicWebGallery';

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Websites & Landing Pages',
    'Branding Projects',
    'Social Media Designs',
    'AI-Generated Creative Content',
    'Short-Form Videos',
    'Promotional Campaigns',
    'Content Calendars',
  ];

  useEffect(() => {
    setLoading(true);
    // Map UI category to backend category
    const apiCategory =
      activeCategory === 'Websites & Landing Pages'
        ? 'Website and Landing Page Projects'
        : activeCategory !== 'All'
        ? activeCategory
        : undefined;

    portfolioAPI
      .getAll({ category: apiCategory })
      .then((res) => {
        if (res.data.success) {
          setProjects(res.data.projects);
        }
      })
      .catch((err) => console.error('Error fetching portfolio:', err))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const isWebCategory =
    activeCategory === 'All' ||
    activeCategory === 'Websites & Landing Pages' ||
    activeCategory === 'Website and Landing Page Projects';

  const otherProjects = projects.filter(
    (p) =>
      p.category !== 'Website and Landing Page Projects' &&
      p.category !== 'Websites & Landing Pages'
  );

  return (
    <div className="pt-24 bg-[#070709] min-h-screen text-gray-100">
      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-gold-700/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Creative Showcase & Concept Explorations</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight text-white">
            Our Work & <span className="gradient-text">Creative Explorations.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto font-light">
            Explore our curated collection of digital experiences, realistic website concepts, brand identity systems, AI generative assets, and short-form video campaigns.
          </p>

          <div className="mt-4 text-xs text-gray-400 max-w-xl mx-auto italic font-normal">
            * Note: To uphold client confidentiality and international NDA agreements, select work represents concept explorations and aesthetic benchmarks engineered by Yashwa and Aroosa.
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. CATEGORY FILTER TABS & PORTFOLIO ENGINE                */}
      {/* ========================================================= */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[50vh]">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-16 scrollbar-none border-b border-white/[0.06]">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C69341] text-black font-extrabold shadow-glow-gold border border-white/40'
                    : 'bg-[#111116] text-gray-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.08]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* A. CINEMATIC WEBSITES & LANDING PAGES SHOWCASE                */}
        {/* ------------------------------------------------------------- */}
        {isWebCategory && (
          <div className="mb-24">
            <CinematicWebGallery />
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* B. MULTI-DISCIPLINE PORTFOLIO GRID (FOR 'ALL' OR SPECIFIC)    */}
        {/* ------------------------------------------------------------- */}
        {activeCategory !== 'Websites & Landing Pages' &&
          activeCategory !== 'Website and Landing Page Projects' && (
            <div className={activeCategory === 'All' ? 'pt-16 border-t border-white/[0.08]' : ''}>
              {activeCategory === 'All' && (
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400">
                    Additional Disciplines
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                    Brand Identities, Paid Creatives & Short-Form Video Sprints
                  </h3>
                </div>
              )}

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
                    className="mt-3 text-xs text-gold-400 font-bold hover:underline"
                  >
                    Show All Projects
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(activeCategory === 'All' ? otherProjects : projects).map((proj) => (
                    <ProjectCard key={proj._id} project={proj} onSelect={setSelectedProject} />
                  ))}
                </div>
              )}
            </div>
          )}
      </section>

      {/* ========================================================= */}
      {/* 3. STANDARD PROJECT DETAIL MODAL (FOR OTHER DISCIPLINES)   */}
      {/* ========================================================= */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
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
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gold-500/15 border border-gold-400/30 text-gold-400 font-mono">
                {selectedProject.category}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {selectedProject.industry}
              </span>
            </div>

            <h3 className="text-2xl font-display font-extrabold text-white mb-3">
              {selectedProject.title}
            </h3>

            <p className="text-sm text-gray-300 leading-relaxed mb-6 font-normal">
              {selectedProject.fullDescription || selectedProject.summary}
            </p>

            {/* Scope of execution */}
            {selectedProject.servicesProvided && selectedProject.servicesProvided.length > 0 && (
              <div className="mb-6 p-4 rounded-xl bg-[#181820] border border-white/[0.06]">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2 font-mono">
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
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-extrabold text-black bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C69341] shadow-glow-gold hover:scale-[1.02] transition-all"
              >
                <span>Inquire About Similar Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-black" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. EMBEDDED STRATEGY CALL CALENDAR                        */}
      {/* ========================================================= */}
      <BookingCalendarWidget />
    </div>
  );
}

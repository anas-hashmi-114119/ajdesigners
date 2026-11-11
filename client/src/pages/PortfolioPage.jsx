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
import CTASection from '../components/common/CTASection';
import { MacBookMockup, IPhoneMockup, BillboardMockup } from '../components/common/DeviceMockups';

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
    <div className="pt-24">
      {/* 1. HERO SECTION */}
      <section className="py-20 lg:py-28 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-electric-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-brand/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-electric-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creative Showcase & Concept Explorations</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight">
            Our Work & Creative Explorations.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-charcoal-300 leading-relaxed">
            Explore our curated collection of original sample projects, brand identity systems, AI generative assets, and short-form video concepts.
          </p>

          <div className="mt-4 text-xs text-charcoal-400 max-w-xl mx-auto italic">
            *In accordance with our commitment to transparency and integrity, we showcase genuine concept projects and sample designs without fabricated client results or unverified statistics.
          </div>
        </div>
      </section>

      {/* 2. 3D DEVICE FRAME STUDIO */}
      <section className="py-16 bg-navy-950 text-white border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-electric-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>3D Interactive Mockup Studio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-2">
            Staged in Realistic 3D Device Frames
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-400 max-w-xl mx-auto mb-8">
            Experience our client campaigns placed inside realistic MacBook Pro, iPhone 16 Pro, and Urban Outdoor Billboard environments.
          </p>

          {/* Interactive Frame Switcher */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-navy-900 border border-white/10 mb-10 shadow-2xl">
            <button
              type="button"
              onClick={() => setMockupTab('macbook')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                mockupTab === 'macbook' ? 'bg-electric-500 text-white shadow-glow-blue' : 'text-charcoal-400 hover:text-white'
              }`}
            >
              💻 MacBook Pro (SaaS & B2B)
            </button>
            <button
              type="button"
              onClick={() => setMockupTab('iphone')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                mockupTab === 'iphone' ? 'bg-purple-brand text-white shadow-glow-purple' : 'text-charcoal-400 hover:text-white'
              }`}
            >
              📱 iPhone 16 Pro (Viral Reels)
            </button>
            <button
              type="button"
              onClick={() => setMockupTab('billboard')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                mockupTab === 'billboard' ? 'bg-blue-600 text-white shadow-sm' : 'text-charcoal-400 hover:text-white'
              }`}
            >
              🏙️ Urban Billboard (Branding)
            </button>
          </div>

          {/* Active 3D Mockup Display */}
          <div className="max-w-3xl mx-auto animate-fadeIn">
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
      <section className="py-20 bg-surface-light min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === cat
                    ? 'bg-navy-900 text-white shadow-md border border-electric-500'
                    : 'bg-white text-charcoal-700 hover:text-navy-900 hover:bg-charcoal-100 border border-charcoal-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid View */}
          {loading ? (
            <div className="text-center py-24 text-charcoal-500 text-sm animate-pulse">
              Loading creative portfolio projects...
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-charcoal-200 p-8 max-w-md mx-auto">
              <p className="text-sm font-semibold text-charcoal-700">
                No projects found in category "{activeCategory}".
              </p>
              <button
                onClick={() => setActiveCategory('All')}
                className="mt-3 text-xs text-electric-600 font-bold hover:underline"
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
        </div>
      </section>

      {/* 3. PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200 flex items-center justify-center text-sm font-bold transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Cover Image */}
            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-navy-900">
              <img
                src={selectedProject.coverImage}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Header info */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-electric-100 text-electric-700">
                {selectedProject.category}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-charcoal-100 text-charcoal-600">
                Industry: {selectedProject.industry}
              </span>
              {selectedProject.isConcept && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-soft text-purple-brand">
                  Concept Exploration
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900 mb-4">
              {selectedProject.title}
            </h3>

            <div className="prose prose-sm text-charcoal-700 max-w-none mb-6 leading-relaxed">
              <p>{selectedProject.fullDescription || selectedProject.summary}</p>
            </div>

            {/* Additional Media if available */}
            {selectedProject.additionalMedia && selectedProject.additionalMedia.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
                  Additional Visual Assets:
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {selectedProject.additionalMedia.map((mediaUrl, idx) => (
                    <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden bg-navy-800">
                      <img
                        src={mediaUrl}
                        alt={`Additional creative asset ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services Used */}
            {selectedProject.servicesProvided && selectedProject.servicesProvided.length > 0 && (
              <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-2">
                  Creative Disciplines Applied:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.servicesProvided.map((s, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-lg bg-surface-light text-navy-900 border border-charcoal-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Modal CTA */}
            <div className="pt-6 border-t border-charcoal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-charcoal-500">
                Designed & Produced by AJDesigners
              </span>
              <Link
                to={`/contact?service=${encodeURIComponent(selectedProject.category)}&notes=Inquiring%20about%20concept:%20${encodeURIComponent(selectedProject.title)}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-electric-500 to-purple-brand shadow-glow-blue hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Request Similar Creative Campaign</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 4. CTA SECTION */}
      <CTASection
        heading="Have a Vision for Your Brand's Next Campaign?"
        subheading="Whether you need a fresh brand identity, monthly social media content, or AI-powered product visuals, our creative team is ready."
        buttonText="Discuss Your Project"
        buttonLink="/contact"
      />
    </div>
  );
}


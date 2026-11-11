import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowUpRight, Search, CheckCircle2 } from 'lucide-react';
import { serviceAPI } from '../services/api';
import ServiceCard from '../components/common/ServiceCard';
import CTASection from '../components/common/CTASection';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    serviceAPI
      .getAll()
      .then((res) => {
        if (res.data.success) {
          setServices(res.data.services);
        }
      })
      .catch((err) => console.error('Error fetching services:', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredServices = services.filter((srv) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      srv.title.toLowerCase().includes(query) ||
      srv.shortDescription.toLowerCase().includes(query) ||
      (srv.deliverables && srv.deliverables.some((d) => d.toLowerCase().includes(query)))
    );
  });

  return (
    <div className="pt-24">
      {/* 1. HERO SECTION */}
      <section className="py-20 lg:py-28 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-electric-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-brand/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-electric-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Agency Solutions</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight">
            Strategic Services Engineered for Digital Growth.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-charcoal-300 leading-relaxed">
            From complete social media management and AI-assisted content production to B2B lead generation and brand development, explore our ten core digital disciplines.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-5 h-5 text-charcoal-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services or deliverables (e.g. reels, AI, LinkedIn)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-navy-800/80 border border-white/15 text-white placeholder-charcoal-400 text-xs focus:outline-none focus:border-electric-400 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* 2. SERVICES LISTING */}
      <section className="py-24 bg-surface-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-charcoal-200/80">
            <div>
              <h2 className="text-2xl font-display font-extrabold text-navy-900">
                All Agency Disciplines
              </h2>
              <p className="text-xs text-charcoal-500 mt-1">
                Showing {filteredServices.length} of {services.length} services
              </p>
            </div>

            <Link
              to="/pricing"
              className="text-xs font-bold text-electric-600 hover:text-electric-700 inline-flex items-center gap-1"
            >
              <span>View Monthly Retainers & Pricing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-20 text-charcoal-500 text-sm">
              Loading agency disciplines...
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-charcoal-200 p-8">
              <p className="text-sm font-semibold text-charcoal-700">
                No services matched your search query "{searchQuery}".
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 text-xs text-electric-600 font-bold hover:underline"
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((srv, index) => (
                <ServiceCard key={srv._id || index} service={srv} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. CUSTOM RETAINER CALLOUT */}
      <section className="py-16 bg-white border-t border-charcoal-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white border border-white/10 shadow-xl relative overflow-hidden">
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold mb-3">
              Need a Custom Cross-Channel Combination?
            </h3>
            <p className="text-sm text-charcoal-300 max-w-xl mx-auto mb-6">
              Many international clients combine social management with lead funnels and AI video production. We formulate tailored monthly retainers matched precisely to your scope.
            </p>
            <Link
              to="/contact?service=Custom%20Marketing%20Retainer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-bold text-white bg-electric-500 hover:bg-electric-600 transition-colors shadow-glow-blue"
            >
              <span>Request a Customized Retainer Proposal</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. CTA SECTION */}
      <CTASection
        heading="Ready to Amplify Your Brand's Digital Impact?"
        subheading="Book an introductory consultation with our strategy team to determine the ideal service allocation for your company."
        buttonText="Get a Free Consultation"
        buttonLink="/contact"
      />
    </div>
  );
}


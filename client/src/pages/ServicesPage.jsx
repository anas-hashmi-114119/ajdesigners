import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowUpRight, Search, CheckCircle2 } from 'lucide-react';
import { serviceAPI } from '../services/api';
import ServiceCard from '../components/common/ServiceCard';
import BookingCalendarWidget from '../components/common/BookingCalendarWidget';

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
    <div className="pt-24 bg-[#070709] min-h-screen text-gray-100">
      {/* 1. HERO SECTION */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-electric-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-brand/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-electric-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Agency Disciplines</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight text-white">
            Strategic Services Engineered for <span className="gradient-text">Digital Growth.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            From complete social media management and AI-assisted content production to B2B lead generation and brand development, explore our ten core digital disciplines.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services (e.g. reels, AI, LinkedIn, branding)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-[#111116] border border-white/[0.1] text-white placeholder-gray-500 text-xs focus:outline-none focus:border-electric-400 transition-colors shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* 2. SERVICES LISTING */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/[0.08]">
          <div>
            <h2 className="text-2xl font-display font-extrabold text-white">
              All Agency Disciplines
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Showing {filteredServices.length} of {services.length} services
            </p>
          </div>

          <Link
            to="/pricing"
            className="text-xs font-bold text-electric-400 hover:text-white inline-flex items-center gap-1 transition-colors"
          >
            <span>View Monthly Retainers & Pricing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 text-sm">
            Loading agency disciplines...
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-20 bg-[#111116] rounded-3xl border border-white/[0.08] p-8">
            <p className="text-sm font-semibold text-gray-300">
              No services matched your search query "{searchQuery}".
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-3 text-xs text-electric-400 font-bold hover:underline"
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
      </section>

      {/* 3. CUSTOM RETAINER CALLOUT */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#111116] border border-white/[0.08] shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-80 h-80 bg-electric-500/10 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-3">
            Need a Custom Cross-Channel Combination?
          </h3>
          <p className="text-sm text-gray-400 max-w-xl mx-auto mb-6">
            Many international clients combine social management with lead funnels and AI video production. We formulate tailored monthly retainers matched precisely to your scope.
          </p>
          <a
            href="#booking-calendar"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-electric-500 to-purple-brand hover:scale-[1.02] transition-transform shadow-glow-blue"
          >
            <span>Request a Customized Retainer Proposal</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* 4. EMBEDDED BOOKING CALENDAR */}
      <BookingCalendarWidget />
    </div>
  );
}

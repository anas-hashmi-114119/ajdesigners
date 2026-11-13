import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  ChevronDown,
  ChevronUp,
  Share2,
} from 'lucide-react';
import { serviceAPI } from '../services/api';
import BookingCalendarWidget from '../components/common/BookingCalendarWidget';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [otherServices, setOtherServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    setLoading(true);
    serviceAPI
      .getBySlug(slug)
      .then((res) => {
        if (res.data.success) {
          setService(res.data.service);
          setOtherServices(res.data.otherServices || []);
        } else {
          navigate('/services');
        }
      })
      .catch((err) => {
        console.error('Error fetching service detail:', err);
        navigate('/services');
      })
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[60vh] flex items-center justify-center bg-[#070709]">
        <div className="text-sm text-gray-400 font-medium animate-pulse">
          Loading service specifications...
        </div>
      </div>
    );
  }

  if (!service) return null;

  return (
    <div className="pt-24 bg-[#070709] min-h-screen text-gray-100">
      {/* 1. HERO SECTION */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-electric-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-brand/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-electric-400 text-xs font-semibold mb-6">
              <span>SERVICE {service.number || '01'}</span>
              <span>•</span>
              <span>AJDESIGNERS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight text-white">
              {service.title}
            </h1>

            <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed">
              {service.tagline || service.shortDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#booking-calendar"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold text-white bg-gradient-to-r from-electric-500 to-purple-brand shadow-glow-blue hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Book Free Strategy Call for {service.title}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-xs font-semibold text-gray-300 bg-[#111116] border border-white/[0.08] hover:bg-white/[0.06] hover:text-white transition-colors"
              >
                <span>View Monthly Packages</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW & PLATFORMS */}
      <section className="py-20 bg-[#09090d] border-y border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-500/10 border border-electric-500/20 text-electric-400 text-xs font-semibold">
                <span>Detailed Overview</span>
              </div>
              <h2 className="text-3xl font-display font-extrabold text-white tracking-tight">
                How We Deliver Results in {service.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-line">
                {service.fullDescription}
              </p>

              {/* Supported Platforms */}
              {service.platforms && service.platforms.length > 0 && (
                <div className="pt-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                    Supported Platforms & Environments:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.platforms.map((p, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-[#181820] text-gray-200 border border-white/[0.08]"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Summary Card */}
            <div className="lg:col-span-5 bg-[#111116] rounded-3xl p-8 border border-white/[0.08] shadow-2xl">
              <h3 className="text-lg font-display font-bold text-white mb-4">
                Service At a Glance
              </h3>
              <div className="space-y-4 text-xs text-gray-300">
                <div className="pb-3 border-b border-white/[0.06]">
                  <span className="font-bold text-white block mb-1">Collaboration Model:</span>
                  <span>Fully remote studio with scheduled international video strategy sessions</span>
                </div>
                <div className="pb-3 border-b border-white/[0.06]">
                  <span className="font-bold text-white block mb-1">Target Markets:</span>
                  <span>USA, UK, Canada, Australia, UAE, Europe & Global Markets</span>
                </div>
                <div className="pb-3 border-b border-white/[0.06]">
                  <span className="font-bold text-white block mb-1">Turnaround & Cadence:</span>
                  <span>Pre-approved monthly calendars with 48h asset delivery sprints</span>
                </div>
                <div>
                  <span className="font-bold text-white block mb-1">Deliverables Governance:</span>
                  <span>100% human reviewed, brand-aligned quality control by Yashwa & Aroosa</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08]">
                <a
                  href="#booking-calendar"
                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-electric-500 to-purple-brand py-3 rounded-xl shadow-glow-blue"
                >
                  <span>Book Consultation for This Discipline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DELIVERABLES LIST */}
      {service.deliverables && service.deliverables.length > 0 && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-extrabold text-white">
              Core Deliverables Included
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Clear, transparent deliverables provided in every production sprint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#111116] border border-white/[0.08] flex items-start gap-3 hover:border-electric-500/40 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-electric-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. OTHER SERVICES */}
      {otherServices.length > 0 && (
        <section className="py-20 bg-[#09090d] border-t border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/[0.08]">
              <h2 className="text-2xl font-display font-bold text-white">
                Explore Related Disciplines
              </h2>
              <Link
                to="/services"
                className="text-xs font-bold text-electric-400 hover:text-white transition-colors"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherServices.slice(0, 3).map((item) => (
                <Link
                  key={item.slug}
                  to={`/services/${item.slug}`}
                  className="p-6 rounded-2xl bg-[#111116] border border-white/[0.08] hover:border-electric-500/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-electric-400">
                      {item.number || '01'}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-electric-300 transition-colors mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                      {item.shortDescription}
                    </p>
                  </div>
                  <span className="mt-4 text-xs font-bold text-electric-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. EMBEDDED STRATEGY CALL CALENDAR */}
      <BookingCalendarWidget />
    </div>
  );
}

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
import CTASection from '../components/common/CTASection';

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
      <div className="pt-32 pb-20 text-center min-h-[60vh] flex items-center justify-center">
        <div className="text-sm text-charcoal-500 font-medium animate-pulse">
          Loading service specifications...
        </div>
      </div>
    );
  }

  if (!service) return null;

  return (
    <div className="pt-24">
      {/* 1. HERO SECTION */}
      <section className="py-20 lg:py-28 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-electric-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-brand/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-electric-400 text-xs font-semibold mb-6">
              <span>SERVICE {service.number || '01'}</span>
              <span>•</span>
              <span>AJDESIGNERS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="mt-6 text-base sm:text-lg text-charcoal-300 leading-relaxed">
              {service.tagline || service.shortDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to={`/contact?service=${encodeURIComponent(service.title)}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold text-white bg-gradient-to-r from-electric-500 to-purple-brand shadow-glow-blue hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Request a Quote for {service.title}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-xs font-semibold text-charcoal-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-colors"
              >
                <span>View Monthly Packages</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW & PLATFORMS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-100 text-electric-600 text-xs font-semibold">
                <span>Detailed Overview</span>
              </div>
              <h2 className="text-3xl font-display font-extrabold text-navy-900 tracking-tight">
                How We Deliver Results in {service.title}
              </h2>
              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed whitespace-pre-line">
                {service.fullDescription}
              </p>

              {/* Supported Platforms */}
              {service.platforms && service.platforms.length > 0 && (
                <div className="pt-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
                    Supported Platforms & Environments:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.platforms.map((p, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-surface-light text-navy-900 border border-charcoal-200/80"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Summary Card */}
            <div className="lg:col-span-5 bg-surface-light rounded-3xl p-8 border border-charcoal-200/80 shadow-sm">
              <h3 className="text-lg font-display font-bold text-navy-900 mb-4">
                Service At a Glance
              </h3>
              <div className="space-y-4 text-xs text-charcoal-700">
                <div className="pb-3 border-b border-charcoal-200/60">
                  <span className="font-bold text-navy-900 block mb-1">Collaboration Model:</span>
                  <span>Fully remote studio with scheduled international video strategy sessions</span>
                </div>
                <div className="pb-3 border-b border-charcoal-200/60">
                  <span className="font-bold text-navy-900 block mb-1">Target Markets:</span>
                  <span>USA, UK, Canada, Australia, UAE, Europe & Global Markets</span>
                </div>
                <div className="pb-3 border-b border-charcoal-200/60">
                  <span className="font-bold text-navy-900 block mb-1">Turnaround & Cadence:</span>
                  <span>Pre-approved monthly calendars with weekly asset deliveries</span>
                </div>
                <div>
                  <span className="font-bold text-navy-900 block mb-1">Deliverables Governance:</span>
                  <span>100% human reviewed, brand-aligned quality control</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-charcoal-200">
                <Link
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="w-full py-3 rounded-full text-xs font-bold text-white bg-navy-900 hover:bg-electric-600 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Book Consultation for This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEMS SOLVED VS WHAT WE OFFER */}
      <section className="py-20 bg-surface-light border-y border-charcoal-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Problems We Solve */}
            <div className="bg-white rounded-3xl p-8 border border-charcoal-200/80 shadow-sm">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-navy-900">Challenges We Eliminate</h3>
                  <p className="text-xs text-charcoal-500">Common pitfalls businesses face before partnering with us</p>
                </div>
              </div>

              <ul className="space-y-3.5">
                {service.problemsSolved &&
                  service.problemsSolved.map((prob, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-charcoal-700">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                      <span>{prob}</span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Key Deliverables */}
            <div className="bg-white rounded-3xl p-8 border border-charcoal-200/80 shadow-sm">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-10 h-10 rounded-xl bg-electric-100 text-electric-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-navy-900">What We Deliver</h3>
                  <p className="text-xs text-charcoal-500">Tangible assets and ongoing strategic support included</p>
                </div>
              </div>

              <ul className="space-y-3.5">
                {service.deliverables &&
                  service.deliverables.map((del, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-charcoal-800">
                      <CheckCircle2 className="w-4 h-4 text-electric-500 mt-0.5 shrink-0" />
                      <span>{del}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BENEFITS & IDEAL CLIENTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Measurable Benefits */}
            <div>
              <h3 className="text-2xl font-display font-extrabold text-navy-900 mb-4">
                Strategic Benefits for Your Brand
              </h3>
              <p className="text-sm text-charcoal-700 mb-6">
                Partnering with AJDesigners transforms this discipline from an operational burden into a consistent growth engine.
              </p>
              <div className="space-y-3">
                {service.benefits &&
                  service.benefits.map((ben, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-surface-light border border-charcoal-200/60 flex items-start gap-3"
                    >
                      <Sparkles className="w-4 h-4 text-purple-brand mt-0.5 shrink-0" />
                      <span className="text-xs sm:text-sm text-charcoal-800 font-medium">{ben}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Ideal Customer Avatars */}
            <div>
              <h3 className="text-2xl font-display font-extrabold text-navy-900 mb-4">
                Who This Service Is Designed For
              </h3>
              <p className="text-sm text-charcoal-700 mb-6">
                Tailored execution frameworks configured specifically for these business categories:
              </p>
              <div className="space-y-3">
                {service.idealClients &&
                  service.idealClients.map((clientType, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-surface-light border border-charcoal-200/60 flex items-start gap-3"
                    >
                      <Layers className="w-4 h-4 text-electric-500 mt-0.5 shrink-0" />
                      <span className="text-xs sm:text-sm text-charcoal-800 font-medium">{clientType}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS ACCORDION */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-20 bg-surface-light border-y border-charcoal-200/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900">
                Frequently Asked Questions About {service.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-charcoal-600">
                Clear answers regarding workflow, deliverables, and collaboration.
              </p>
            </div>

            <div className="space-y-4">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-charcoal-200/80 overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-bold text-sm text-navy-900 hover:text-electric-600 transition-colors"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-electric-600 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-charcoal-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-charcoal-700 leading-relaxed border-t border-charcoal-100 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. RELATED SERVICES NAVIGATION */}
      {otherServices.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-charcoal-200/60">
              <h3 className="text-lg font-display font-bold text-navy-900">
                Explore Other Agency Disciplines
              </h3>
              <Link to="/services" className="text-xs font-bold text-electric-600 hover:underline">
                View All Services
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherServices.map((other) => (
                <Link
                  key={other._id}
                  to={`/services/${other.slug}`}
                  className="p-5 rounded-2xl bg-surface-light border border-charcoal-200/70 hover:border-electric-500/40 hover:bg-white hover:shadow-card-elevated transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[11px] font-mono font-bold text-electric-600 mb-1 block">
                      {other.number}
                    </span>
                    <h4 className="text-sm font-display font-bold text-navy-900 group-hover:text-electric-600 transition-colors">
                      {other.title}
                    </h4>
                    <p className="mt-1 text-[11px] text-charcoal-600 line-clamp-2">
                      {other.shortDescription}
                    </p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-charcoal-200/40 flex items-center justify-between text-[11px] font-semibold text-electric-600">
                    <span>Learn More</span>
                    <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. CTA SECTION */}
      <CTASection
        heading={`Ready to Get Started with ${service.title}?`}
        subheading="Let's analyze your current brand assets and formulate a bespoke execution roadmap. Request your consultation today."
        buttonText={`Inquire About ${service.title}`}
        buttonLink={`/contact?service=${encodeURIComponent(service.title)}`}
      />
    </div>
  );
}


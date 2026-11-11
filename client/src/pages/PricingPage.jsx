import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Check,
  X,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import { pricingAPI } from '../services/api';
import PricingCard from '../components/common/PricingCard';
import CTASection from '../components/common/CTASection';

export default function PricingPage() {
  const [packages, setPackages] = useState([]);
  const [standalone, setStandalone] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    pricingAPI
      .getPricing()
      .then((res) => {
        if (res.data.success) {
          setPackages(res.data.packages);
          setStandalone(res.data.standalone);
        }
      })
      .catch((err) => console.error('Error fetching pricing:', err))
      .finally(() => setLoading(false));
  }, []);

  const pricingFaqs = [
    {
      q: 'Are these pricing packages locked into long-term contracts?',
      a: 'No. Our monthly packages operate on a flexible month-to-month retainer agreement. You can pause, upgrade, or adjust your service tier at the conclusion of any 30-day cycle with 14 days notice.',
    },
    {
      q: 'Do you require client-supplied raw footage and brand assets?',
      a: 'Yes. For short-form video edits and product-specific content, packages assume client-supplied raw video clips, high-res logos, and product photography. We handle the strategic editing, typography, sound design, and captioning.',
    },
    {
      q: 'Can we customize a package between Starter, Growth, or Premium?',
      a: 'Absolutely. If your business requires more video edits, additional platform scheduling, or custom ad creative testing, we configure a custom monthly retainer tailored precisely to your scope.',
    },
    {
      q: 'In which currency are international invoices billed?',
      a: 'All standard quotes are presented in USD ($), but we accommodate payments in EUR (€), GBP (£), CAD, AUD, and AED via secure international bank transfer or corporate card processing.',
    },
    {
      q: 'How do revision rounds work?',
      a: 'Each creative asset includes dedicated revision rounds (1 round for Starter, 2 rounds for Growth and Premium) to ensure copy, layout, and visual tone match your brand expectations before publication.',
    },
  ];

  const comparisonRows = [
    { feature: 'Static Social Media Graphic Designs', starter: '8 designs', growth: '12 designs', premium: '20 designs' },
    { feature: 'Short-Form Video Edits (up to 30s each)', starter: '4 videos', growth: '8 videos', premium: '12 videos' },
    { feature: 'Educational Carousel Posts', starter: '—', growth: '4 carousels', premium: '4 carousels' },
    { feature: 'Captions & Hashtag Sets', starter: '12 sets', growth: 'Included', premium: 'Included' },
    { feature: 'Platforms Managed & Scheduled', starter: '1 platform', growth: '2 platforms', premium: '3 platforms' },
    { feature: 'Monthly Content Strategy Calendar', starter: 'Standard calendar', growth: 'Comprehensive roadmap', premium: 'Full-funnel strategy' },
    { feature: 'Community Engagement Hours', starter: '—', growth: 'Basic (defined hours)', premium: 'Active community management' },
    { feature: 'Performance & Analytics Reporting', starter: 'Basic monthly report', growth: 'Monthly report', premium: 'In-depth recommendations' },
    { feature: 'Monthly Strategy Alignment Meeting', starter: '—', growth: '—', premium: 'Monthly video meeting' },
    { feature: 'Revision Rounds per Creative', starter: '1 round', growth: '2 rounds', premium: '2 rounds' },
  ];

  return (
    <div className="pt-24">
      {/* 1. HERO SECTION */}
      <section className="py-20 lg:py-28 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-electric-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-brand/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-electric-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Investment Plans</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight">
            Flexible Packages Designed to Scale With Your Growth.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-charcoal-300 leading-relaxed">
            Choose a structured monthly social media retainer or select standalone creative bundles. Clear deliverables, zero hidden fees, and transparent collaboration.
          </p>

          <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-charcoal-400 max-w-xl mx-auto">
            <ShieldCheck className="w-4 h-4 text-electric-400 inline mr-1.5 -mt-0.5" />
            <span>
              Pricing reflects our proposed launch structure. Packages assume client-supplied raw footage and brand assets where applicable. Custom retainers available upon consultation.
            </span>
          </div>
        </div>
      </section>

      {/* 2. THREE CORE MONTHLY PACKAGES */}
      <section className="py-20 bg-surface-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-extrabold text-navy-900 tracking-tight">
              Monthly Social Media Packages
            </h2>
            <p className="mt-2 text-sm text-charcoal-600">
              Complete creative production and publishing management for ambitious brands.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20 text-charcoal-500 text-sm animate-pulse">
              Loading pricing plans...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {packages.map((pkg) => (
                <PricingCard key={pkg._id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. PACKAGE COMPARISON TABLE */}
      <section className="py-20 bg-white border-t border-charcoal-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900 tracking-tight">
              Package Deliverables Comparison
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-charcoal-600">
              Direct feature comparison across our three monthly management tiers.
            </p>
          </div>

          <div className="overflow-x-auto border border-charcoal-200 rounded-3xl shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-navy-900 text-white font-display">
                  <th className="py-4 px-6 font-bold w-2/5">Deliverable / Capability</th>
                  <th className="py-4 px-6 font-bold text-center w-1/5">Starter ($199)</th>
                  <th className="py-4 px-6 font-bold text-center w-1/5 text-electric-400 bg-navy-800">Growth ($399)</th>
                  <th className="py-4 px-6 font-bold text-center w-1/5">Premium ($699)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-200/80">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-surface-light' : 'bg-white'}>
                    <td className="py-4 px-6 font-medium text-navy-900">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-charcoal-700">{row.starter}</td>
                    <td className="py-4 px-6 text-center font-semibold text-navy-900 bg-electric-100/30">
                      {row.growth}
                    </td>
                    <td className="py-4 px-6 text-center text-charcoal-700">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. STANDALONE SERVICES TABLE */}
      <section className="py-20 bg-surface-light border-t border-charcoal-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-electric-600">
              Individual Scope Options
            </span>
            <h2 className="text-3xl font-display font-extrabold text-navy-900 tracking-tight mt-1">
              Standalone Services & Creative Bundles
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-charcoal-600">
              For businesses that require specific design assets, video editing, or copy without complete monthly management.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {standalone.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl p-6 border border-charcoal-200/80 shadow-sm flex flex-col justify-between hover:border-electric-500/40 hover:shadow-card-elevated transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-charcoal-500">Standalone</span>
                    <div className="text-lg font-display font-extrabold text-navy-900">
                      {item.currency || '$'}{item.startingPrice}
                    </div>
                  </div>
                  <h3 className="text-base font-display font-bold text-navy-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-charcoal-700 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-charcoal-100">
                  <Link
                    to={`/contact?service=${encodeURIComponent(item.name)}&budget=${encodeURIComponent(
                      (item.currency || '$') + item.startingPrice
                    )}`}
                    className="w-full py-2.5 rounded-full text-xs font-bold text-electric-600 bg-electric-100/60 hover:bg-electric-500 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Retainer Notice */}
          <div className="mt-12 p-8 rounded-3xl bg-navy-900 text-white text-center border border-white/10 shadow-lg">
            <h3 className="text-xl font-display font-extrabold mb-2">
              Looking for a Customized Monthly Retainer?
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-300 max-w-xl mx-auto mb-6">
              If your requirements exceed standard packages or require blended multi-channel execution, we formulate bespoke contracts suited to your exact organizational rhythm.
            </p>
            <Link
              to="/contact?service=Custom%20Retainer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-electric-500 to-purple-brand shadow-glow-blue hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Request Custom Quotation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. PRICING FAQS ACCORDION */}
      <section className="py-20 bg-white border-t border-charcoal-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900">
              Frequently Asked Questions About Pricing
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-charcoal-600">
              Everything you need to know about billing, contracts, and revisions.
            </p>
          </div>

          <div className="space-y-4">
            {pricingFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-surface-light rounded-2xl border border-charcoal-200/80 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-bold text-sm text-navy-900 hover:text-electric-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-electric-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-charcoal-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-charcoal-700 leading-relaxed border-t border-charcoal-200/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <CTASection
        heading="Let's Accelerate Your Brand's Digital Growth"
        subheading="Ready to get started? Tell us about your goals and we'll help you select the most effective package structure."
        buttonText="Get a Free Consultation"
        buttonLink="/contact"
      />
    </div>
  );
}


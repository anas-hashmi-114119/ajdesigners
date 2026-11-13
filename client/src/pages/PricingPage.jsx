import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Check,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sliders,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import BookingCalendarWidget from '../components/common/BookingCalendarWidget';

export default function PricingPage() {
  // Plan Calculator State
  const [assetVolume, setAssetVolume] = useState(30);
  const [includeAIUGC, setIncludeAIUGC] = useState(true);
  const [includeMultiPlatform, setIncludeMultiPlatform] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Live Price Calculation
  const calculatedPrice = useMemo(() => {
    const basePerAsset = 24; // $24 per creative asset
    let price = assetVolume * basePerAsset;
    if (includeAIUGC) price += 350;
    if (includeMultiPlatform) price += 280;
    return price;
  }, [assetVolume, includeAIUGC, includeMultiPlatform]);

  const pricingTiers = [
    {
      name: 'Starter',
      price: '$399',
      period: '/month',
      badge: null,
      description: 'Ideal for early-stage startups and niche founders establishing consistent brand presence.',
      features: [
        '12 High-Impact Static Graphic Designs',
        '4 Short-Form Video Edits / Reels (up to 30s)',
        '1 Core Platform Managed & Scheduled',
        'Monthly Content Strategy Roadmap',
        'Captions & Platform-Native Hashtag Sets',
        '48-Hour Average Turnaround',
        'Async Notion Dashboard & Slack Portal',
      ],
      highlighted: false,
      ctaText: 'Select Starter Sprint',
    },
    {
      name: 'Growth',
      price: '$1,200',
      period: '/month',
      badge: 'MOST POPULAR • BEST ROI',
      description: 'Engineered for high-growth SaaS, E-Commerce, and B2B brands scaling qualified customer pipelines.',
      features: [
        '28 High-Converting Static Designs & Carousels',
        '12 AI UGC Video Ads & Short-Form Reels',
        '3 Platforms Managed (Instagram, TikTok, LinkedIn)',
        'Paid Ad Creative Variant Testing (Meta / TikTok)',
        'Bi-Weekly Growth Analytics & Competitor Audits',
        'Priority 24-48h Asset Turnaround',
        'Direct Slack Channel with Yashwa & Aroosa',
        '2 Revision Rounds per Asset with Rapid Iteration',
      ],
      highlighted: true,
      ctaText: 'Claim Growth Retainer',
    },
    {
      name: 'Scale',
      price: '$2,200',
      period: '/month',
      badge: 'ENTERPRISE VELOCITY',
      description: 'A full-stack creative department on demand for international brands dominating global markets.',
      features: [
        '60+ Omnichannel Creative Assets & Motion Design',
        '24 AI UGC Video Ads with Native Voiceovers',
        'Full Multi-Platform Distribution & Community Care',
        'Dedicated Performance Ad Campaign Scaling',
        'High-Converting Landing Page Design & CRO Mockups',
        'Dedicated Creative Director Oversight',
        'Unlimited Revision Rounds within Scope',
        'Weekly Synchronous Video Strategy Reviews',
      ],
      highlighted: false,
      ctaText: 'Partner on Enterprise Scale',
    },
  ];

  const faqs = [
    {
      q: 'Are these pricing packages locked into long-term contracts?',
      a: 'No. Our monthly packages operate on a flexible month-to-month agreement. You can pause, upgrade, or adjust your service tier at the conclusion of any 30-day cycle with 14 days notice.',
    },
    {
      q: 'Do you require client-supplied raw footage and brand assets?',
      a: 'For product-specific e-commerce shots, high-resolution logos and product files are helpful. For AI UGC Ads, we synthesize hyper-realistic AI creators and motion scripts entirely in-house without requiring filming.',
    },
    {
      q: 'Can we build a custom monthly retainer?',
      a: 'Absolutely. Use our live plan calculator above or book a 1-on-1 strategy session. We customize asset deliverables, platform distribution, and turnaround sprint speeds to fit your exact budget.',
    },
    {
      q: 'In which currency are international invoices billed?',
      a: 'All standard quotes are presented in USD ($), but we easily process payments in EUR (€), GBP (£), CAD, AUD, and AED via secure international bank transfer, Stripe, or corporate cards.',
    },
    {
      q: 'Who owns the intellectual property of the creative work?',
      a: 'You retain 100% full commercial IP ownership of all final designs, video renders, scripts, and campaign assets once delivered.',
    },
  ];

  const handleScrollToBooking = () => {
    const el = document.getElementById('booking-calendar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-24 bg-[#070709] min-h-screen text-gray-100">
      {/* 1. HERO SECTION */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-electric-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-purple-brand/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-electric-400 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Investment • Zero Fluff</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight leading-tight text-white">
            Build Your Plan. <br className="hidden sm:inline" />
            <span className="gradient-text">See The Price Live.</span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Interactive, scalable creative retainers tailored to international growth goals. No hidden retainers, no surprise invoices.
          </p>
        </div>
      </section>

      {/* 2. INTERACTIVE PLAN CALCULATOR */}
      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111116] border border-white/[0.08] rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 mb-8 border-b border-white/[0.08] gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-electric-400 mb-1">
                <Sliders className="w-4 h-4" />
                <span>Interactive Cost Calculator</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                Customize Your Monthly Creative Output
              </h2>
            </div>
            <span className="text-xs text-gray-400 bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/[0.06]">
              Real-time USD estimate
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Slider & Toggles */}
            <div className="lg:col-span-7 space-y-8">
              {/* Asset Volume Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-bold text-gray-200">
                    Monthly Creative Volume
                  </label>
                  <span className="px-3.5 py-1 rounded-full bg-electric-500/15 border border-electric-400/40 text-electric-400 text-sm font-bold font-mono">
                    {assetVolume} Assets / mo
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={assetVolume}
                  onChange={(e) => setAssetVolume(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#181820] rounded-lg appearance-none cursor-pointer accent-electric-500"
                />
                <div className="flex justify-between text-[11px] text-gray-500 mt-2 font-mono">
                  <span>10 Assets (Starter)</span>
                  <span>50 Assets (Growth)</span>
                  <span>100 Assets (Hyper-Scale)</span>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-4 pt-4 border-t border-white/[0.08]">
                {/* Toggle 1: AI UGC Video Ads */}
                <div
                  onClick={() => setIncludeAIUGC(!includeAIUGC)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    includeAIUGC
                      ? 'bg-electric-500/10 border-electric-500/40 text-white'
                      : 'bg-[#181820] border-white/[0.06] text-gray-400 hover:text-white'
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>AI UGC Video Ads Engine</span>
                      {includeAIUGC && (
                        <span className="text-[10px] bg-electric-500 text-white px-2 py-0.5 rounded-full font-mono">
                          Active
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Includes AI actor generation, dynamic captions, viral hooks & sound design.
                    </p>
                  </div>
                  <div
                    className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 ${
                      includeAIUGC ? 'bg-electric-500' : 'bg-gray-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        includeAIUGC ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </div>

                {/* Toggle 2: Multi-Platform Management */}
                <div
                  onClick={() => setIncludeMultiPlatform(!includeMultiPlatform)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    includeMultiPlatform
                      ? 'bg-purple-brand/10 border-purple-brand/40 text-white'
                      : 'bg-[#181820] border-white/[0.06] text-gray-400 hover:text-white'
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Multi-Platform Management & Scheduling</span>
                      {includeMultiPlatform && (
                        <span className="text-[10px] bg-purple-brand text-white px-2 py-0.5 rounded-full font-mono">
                          Active
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Covers Instagram, TikTok, LinkedIn, and Facebook with audience scheduling.
                    </p>
                  </div>
                  <div
                    className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 ${
                      includeMultiPlatform ? 'bg-purple-brand' : 'bg-gray-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        includeMultiPlatform ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Recommendation Box */}
            <div className="lg:col-span-5 p-8 rounded-2xl bg-[#181820] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Estimated Retainer
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-display font-extrabold text-white">
                    ${calculatedPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-400 font-mono">/ month</span>
                </div>
                <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                  Based on {assetVolume} assets/mo {includeAIUGC ? '+ AI UGC Ads' : ''}{' '}
                  {includeMultiPlatform ? '+ Multi-Platform' : ''}.
                </p>

                <div className="mt-6 pt-6 border-t border-white/[0.08] space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-electric-400" />
                    <span>Dedicated Slack channel & Notion board</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-electric-400" />
                    <span>Average 48-hour sprint turnaround</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-electric-400" />
                    <span>100% Commercial IP Ownership</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleScrollToBooking}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-electric-500 to-purple-brand text-white font-bold text-xs uppercase tracking-wider shadow-glow-blue hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span>Book 15-Min Call to Lock Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE CORE TIER CARDS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Pre-Built Monthly Growth Sprints
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400">
            Select a structured tier or let us tailor one for your scale. No long-term lock-in.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                tier.highlighted
                  ? 'bg-[#13131c] border-2 border-electric-500 shadow-glow-blue lg:-translate-y-2'
                  : 'bg-[#111116] border border-white/[0.08] hover:border-white/20'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-electric-500 to-purple-brand text-white text-[10px] font-extrabold tracking-widest uppercase shadow-glow-blue">
                  {tier.badge}
                </div>
              )}

              <div>
                <h3 className="text-xl font-display font-extrabold text-white">{tier.name}</h3>
                <p className="mt-2 text-xs text-gray-400 min-h-[36px]">{tier.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-display font-extrabold text-white">
                    {tier.price}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">{tier.period}</span>
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.08] space-y-3.5">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    What's Included:
                  </span>
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <Check className="w-4 h-4 text-electric-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.08]">
                <button
                  onClick={handleScrollToBooking}
                  className={`w-full py-3 rounded-full text-xs font-bold transition-all ${
                    tier.highlighted
                      ? 'bg-gradient-to-r from-electric-500 to-purple-brand text-white shadow-glow-blue hover:scale-[1.02]'
                      : 'bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10'
                  }`}
                >
                  {tier.ctaText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. GUARANTEE BANNER */}
      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-electric-500/10 via-purple-brand/10 to-transparent border border-white/[0.1] backdrop-blur-md flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-electric-500/20 border border-electric-400/30 text-electric-400 flex items-center justify-center shrink-0 shadow-glow-blue">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-display font-bold text-white">
              100% Satisfaction & 48-Hour Turnaround Guarantee
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-300 leading-relaxed">
              We stand behind our craft with an ironclad onboarding guarantee. If your first batch of creative deliverables does not exceed your expectations, we revise until it's flawless or refund your initial retainer with zero friction.
            </p>
          </div>
        </div>
      </section>

      {/* 5. PRICING FAQ ACCORDION */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-400">
            Everything international clients need to know before onboarding.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#111116] border border-white/[0.08] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-electric-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/[0.05] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. EMBEDDED STRATEGY CALL CALENDAR (BOTTOM) */}
      <BookingCalendarWidget />
    </div>
  );
}

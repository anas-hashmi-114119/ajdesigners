import React, { useState } from 'react';
import {
  Star,
  Quote,
  ShieldCheck,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
  Globe,
  CheckCircle2,
  Building2,
} from 'lucide-react';

export default function ClientReviewsShowcase() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Reviews' },
    { id: 'ugc', label: 'AI UGC Video Ads' },
    { id: 'performance', label: 'Paid Ads & ROAS' },
    { id: 'branding', label: 'Brand & Social Media' },
  ];

  const reviews = [
    {
      id: 1,
      category: 'ugc',
      clientName: 'Marcus Vance',
      role: 'Head of Growth',
      company: 'Luminar Health (San Francisco, USA)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
      rating: 5,
      metric: '+340% ROAS Lift',
      metricLabel: 'Meta & TikTok Ads',
      tag: '45x AI UGC Variations Sprint',
      turnaround: 'Delivered in 48h',
      headline: '"We slashed creative production costs by 60% while doubling ad velocity."',
      content:
        'Before AJDesigners, shooting custom UGC meant waiting weeks for creator shipments and spending $10k+ per cycle. Yashwa and Aroosa delivered 45 photo-realistic AI creator video hooks in 48 hours. Our blended ROAS scaled from 1.8x to 3.4x within the first 14 days of testing.',
    },
    {
      id: 2,
      category: 'performance',
      clientName: 'Elena Rostova',
      role: 'CMO & Co-Founder',
      company: 'Velox Apparel (London, UK)',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&h=160&q=80',
      rating: 5,
      metric: '3.8x Target ROAS',
      metricLabel: 'BFCM Scale Campaign',
      tag: 'Full Funnel Ad Architecture',
      turnaround: 'Continuous Sprint',
      headline: '"The highest converting creatives we have deployed in 4 years of DTC."',
      content:
        'The team at AJDesigners understands consumer psychology like seasoned performance media buyers. The vertical video hooks immediately arrested scroll fatigue on TikTok. Our customer acquisition cost dropped by 42% on international traffic.',
    },
    {
      id: 3,
      category: 'branding',
      clientName: 'Julian Thorne',
      role: 'Managing Partner',
      company: 'Aether Capital (Toronto, Canada)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
      rating: 5,
      metric: '2.4x Inbound Demos',
      metricLabel: 'Enterprise Pipeline',
      tag: 'Brand Identity & Web Overhaul',
      turnaround: 'Rapid Sprint',
      headline: '"They transformed our brand from looking like a boutique firm to an institutional titan."',
      content:
        'Every single touchpoint—our deck systems, visual guidelines, and interactive web pages—became bespoke artisan gold caliber. High-net-worth LPs constantly remark on how razor-sharp and authoritative our digital presence is.',
    },
    {
      id: 4,
      category: 'ugc',
      clientName: 'Sophia Chen',
      role: 'VP of Marketing',
      company: 'Solis Beauty (Sydney, Australia)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&h=160&q=80',
      rating: 5,
      metric: '94% Hook Retention',
      metricLabel: 'Across Reels & Shorts',
      tag: 'Multi-Lingual AI Dubbing',
      turnaround: 'Delivered in 72h',
      headline: '"Multi-lingual AI creative sprints let us penetrate 3 European markets overnight."',
      content:
        'AJDesigners synchronized AI creator lip-sync and native Spanish, French, and German audio tracks without recording studios. The localized video ads converted higher than our expensive domestic studio shoots.',
    },
    {
      id: 5,
      category: 'branding',
      clientName: 'Liam O’Connor',
      role: 'Founder & CEO',
      company: 'Zenith Peak Supplements (Dublin, Ireland)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80',
      rating: 5,
      metric: '+185% Engagement',
      metricLabel: 'Social Media Management',
      tag: 'Full Feed Architecture',
      turnaround: 'Daily Execution',
      headline: '"Zero friction working across time zones. Communication is immaculate."',
      content:
        'Their asynchronous Slack channel and Notion roadmap keep our internal marketing team completely aligned. We receive weekly video batches, static carousels, and copy scheduled right on time. Pure peace of mind.',
    },
    {
      id: 6,
      category: 'performance',
      clientName: 'David Sterling',
      role: 'Director of Growth',
      company: 'Nexus SaaS Engine (Austin, USA)',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&h=160&q=80',
      rating: 5,
      metric: '-48% CPA Reduction',
      metricLabel: 'Paid Search & Meta Ads',
      tag: 'Performance Ads & Funnel',
      turnaround: 'Delivered in 48h',
      headline: '"A creative partner that actually looks at attribution metrics and ROAS."',
      content:
        'Most creative agencies hand over pretty graphics that bomb in actual ad managers. AJDesigners builds creatives engineered around click-through rates, hold rates, and conversion intent. They pay for themselves ten times over.',
    },
  ];

  const filteredReviews =
    activeCategory === 'all'
      ? reviews
      : reviews.filter((r) => r.category === activeCategory);

  const handleScrollToCalendar = (e) => {
    e.preventDefault();
    const el = document.getElementById('booking-calendar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-[#070709] relative overflow-hidden border-t border-white/[0.06]">
      {/* Ambient Luxury Gold Illumination */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gold-500/10 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[350px] bg-gold-700/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-semibold uppercase tracking-wider shadow-glow-subtle">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            <span>VERIFIED CLIENT PROOF & TESTIMONIALS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-[1.15]">
            Trusted by Ambitious Founders <br />
            <span className="gradient-text">& Venture-Backed Brands.</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-normal">
            Real feedback and quantifiable performance gains from international clients scaling with our 48-hour creative sprints.
          </p>
        </div>

        {/* ========================================================= */}
        {/* AGGREGATE TRUST BADGES STRIP                             */}
        {/* ========================================================= */}
        <div className="mt-12 p-4 sm:p-6 rounded-2xl bg-[#111116] border border-white/[0.08] grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center max-w-5xl mx-auto shadow-2xl backdrop-blur-xl">
          <div className="p-3">
            <div className="flex items-center justify-center gap-1 text-gold-400 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <div className="text-lg sm:text-xl font-display font-extrabold text-white">4.9 / 5.0 Rating</div>
            <div className="text-[11px] text-gray-400 font-medium">Over 180+ Client Reviews</div>
          </div>

          <div className="p-3 border-l border-white/[0.08]">
            <div className="flex items-center justify-center gap-1.5 text-gold-400 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-mono font-bold">100% SPRINT SLA</span>
            </div>
            <div className="text-lg sm:text-xl font-display font-extrabold text-gold-400">48-Hour Delivery</div>
            <div className="text-[11px] text-gray-400 font-medium">Guaranteed On-Time Sprints</div>
          </div>

          <div className="p-3 border-t sm:border-t-0 sm:border-l border-white/[0.08]">
            <div className="flex items-center justify-center gap-1.5 text-gold-400 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-mono font-bold">PROVEN ROAS</span>
            </div>
            <div className="text-lg sm:text-xl font-display font-extrabold text-white">$14.2M+ Scaled</div>
            <div className="text-[11px] text-gray-400 font-medium">Client Ad Spend Generated</div>
          </div>

          <div className="p-3 border-t sm:border-t-0 border-l border-white/[0.08]">
            <div className="flex items-center justify-center gap-1.5 text-gold-400 mb-1">
              <Globe className="w-4 h-4" />
              <span className="text-xs font-mono font-bold">GLOBAL REACH</span>
            </div>
            <div className="text-lg sm:text-xl font-display font-extrabold text-gold-400">14+ Countries</div>
            <div className="text-[11px] text-gray-400 font-medium">Seamless Asynchronous Sync</div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE CATEGORY FILTER TABS                          */}
        {/* ========================================================= */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 focus:outline-none ${
                  isActive
                    ? 'bg-gradient-to-r from-[#C69341] via-[#DDA74F] to-[#8A5D20] text-black shadow-glow-gold font-bold scale-[1.03]'
                    : 'bg-[#111116] text-gray-300 border border-white/[0.08] hover:border-gold-500/40 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* REVIEWS GRID (BENTO MASONRY)                              */}
        {/* ========================================================= */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="group relative rounded-3xl p-6 sm:p-7 bg-[#111116] border border-white/[0.08] hover:border-gold-500/45 hover:shadow-glow-gold hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle Ambient Hover Glow in Corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl group-hover:bg-gold-500/20 transition-all duration-500 pointer-events-none" />

              <div>
                {/* Top Badge Strip: Rating & Deliverable Tag */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400 drop-shadow-sm" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold text-gold-300 bg-gold-500/10 border border-gold-500/25">
                    <ShieldCheck className="w-3 h-3 text-gold-400" />
                    <span>Verified Client</span>
                  </span>
                </div>

                {/* Metric Callout Tag */}
                <div className="mb-4 inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#181820] border border-gold-500/20">
                  <TrendingUp className="w-4 h-4 text-gold-400 shrink-0" />
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-display font-extrabold text-gold-400">
                      {rev.metric}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">
                      • {rev.metricLabel}
                    </span>
                  </div>
                </div>

                {/* Headline */}
                <h3 className="text-base sm:text-lg font-display font-bold text-white leading-snug mb-3 group-hover:text-gold-200 transition-colors">
                  {rev.headline}
                </h3>

                {/* Content Quote */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal mb-6 relative">
                  <Quote className="w-6 h-6 text-gold-500/20 absolute -top-2 -left-2 -z-0 select-none pointer-events-none" />
                  <span className="relative z-10">{rev.content}</span>
                </p>
              </div>

              {/* Author Profile Footer */}
              <div className="pt-5 border-t border-white/[0.06] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={rev.avatar}
                    alt={rev.clientName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-gold-500/30 shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-gold-300 transition-colors">
                      {rev.clientName}
                    </div>
                    <div className="text-[11px] text-gray-400 truncate">
                      {rev.role}
                    </div>
                    <div className="text-[10px] text-gold-400/80 font-mono truncate">
                      {rev.company}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-gray-400 block bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.05]">
                    {rev.turnaround}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* BOTTOM SOCIAL PROOF CALL-TO-ACTION                        */}
        {/* ========================================================= */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#181820] via-[#111116] to-[#181820] border border-gold-500/30 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gold-mesh opacity-20 pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-extrabold text-white">
              Ready to Join 180+ Brands Scaling with High-Velocity Sprints?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
              Book a 30-minute growth strategy consultation with Yashwa & Aroosa. We'll audit your creative funnel and map out your first 48-hour delivery sprint.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#booking-calendar"
                onClick={handleScrollToCalendar}
                data-cursor-text="BOOK CALL"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-black bg-gradient-to-r from-[#C69341] via-[#DDA74F] to-[#8A5D20] hover:shadow-glow-gold hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border border-gold-300/30 shadow-lg"
              >
                <span>Book Free Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#services-section"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-gray-200 bg-[#111116] hover:bg-[#181820] hover:text-white border border-white/[0.08] hover:border-gold-500/40 transition-all duration-200"
              >
                <span>View All Services</span>
              </a>
            </div>

            <div className="pt-2 flex items-center justify-center gap-6 text-[11px] text-gray-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                No Long-Term Contracts
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                100% IP Ownership
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                48h SLA Guarantee
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Target,
  Eye,
  HeartHandshake,
  CheckCircle2,
  Users2,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight,
  UserCheck,
} from 'lucide-react';
import CTASection from '../components/common/CTASection';

export default function AboutPage() {
  const coreValues = [
    {
      title: 'Creativity & Innovation',
      desc: 'We constantly push visual and technological boundaries, embracing modern AI workflows while preserving human emotional resonance.',
      icon: Lightbulb,
    },
    {
      title: 'Client Satisfaction',
      desc: 'Our work is judged by client success. We listen intently, adapt rapidly, and treat your business goals with the dedication of true partners.',
      icon: HeartHandshake,
    },
    {
      title: 'Transparency & Integrity',
      desc: 'No vanity metrics, hidden markups, or false claims. We provide clear deliverables, honest communication, and measurable deliverables.',
      icon: ShieldCheck,
    },
    {
      title: 'Quality & Consistency',
      desc: 'Sustainable digital presence relies on reliable publishing rhythm and uncompromising visual precision on every asset.',
      icon: CheckCircle2,
    },
    {
      title: 'Strategic Thinking',
      desc: 'Design without purpose is merely decoration. Every post, ad, and video is crafted to support defined commercial objectives.',
      icon: Target,
    },
    {
      title: 'Continuous Improvement',
      desc: 'Digital algorithms and consumer tastes change continuously. We test, learn, and iterate to keep your brand ahead of market shifts.',
      icon: TrendingUp,
    },
    {
      title: 'Long-Term Partnerships',
      desc: 'We build durable client relationships where compounding brand equity delivers increasing value month after month.',
      icon: Users2,
    },
  ];

  return (
    <div className="pt-24">
      {/* 1. HERO SECTION */}
      <section className="py-20 lg:py-28 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-electric-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-brand/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-electric-400 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Agency Story & Values</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight">
              Creativity Meets Digital Strategy.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-charcoal-300 leading-relaxed">
              AJDesigners was established with a simple purpose: to help businesses navigate the digital world through creative, practical and innovative marketing solutions.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE STORY & PHILOSOPHY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-100 text-electric-600 text-xs font-semibold">
                <span>Our Philosophy</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 tracking-tight leading-tight">
                Beyond Attractive Visuals: Marketing With Strategic Purpose
              </h2>
              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
                We believe successful digital marketing requires more than attractive visuals. It requires understanding the audience, developing the right message, maintaining consistency and continuously improving the strategy.
              </p>
              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
                Our approach brings together creative content, social media expertise and AI-assisted production to support businesses at different stages of growth—from emerging startups building their initial footprint to established enterprises refining their international voice.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Mission Card */}
                <div className="p-8 rounded-3xl bg-surface-light border border-charcoal-200/80 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-electric-500 text-white flex items-center justify-center mb-5 shadow-sm">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-navy-900 mb-2">Our Mission</h3>
                  <p className="text-xs text-charcoal-700 leading-relaxed">
                    To empower businesses through creative digital solutions, strategic marketing and innovative content that builds stronger brands and meaningful connections with their audiences.
                  </p>
                </div>

                {/* Vision Card */}
                <div className="p-8 rounded-3xl bg-navy-900 text-white border border-white/10 shadow-card-elevated">
                  <div className="w-12 h-12 rounded-2xl bg-purple-brand text-white flex items-center justify-center mb-5 shadow-sm">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">Our Vision</h3>
                  <p className="text-xs text-charcoal-300 leading-relaxed">
                    To become a trusted international digital marketing and creative agency recognized for creativity, innovation, reliability and measurable business value.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR APPROACH */}
      <section className="py-20 bg-surface-light border-y border-charcoal-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-100 text-electric-600 text-xs font-semibold mb-3">
              <span>Client-Centric Model</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 tracking-tight">
              Our Strategic Approach
            </h2>
            <p className="mt-4 text-sm sm:text-base text-charcoal-700 leading-relaxed">
              We focus on understanding every client's business before recommending solutions. Our strategies are designed around individual objectives, target audiences, industry requirements and available resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 rounded-2xl border border-charcoal-200/80 shadow-sm">
              <span className="text-xs font-mono font-bold text-electric-600">PHASE 01</span>
              <h3 className="text-lg font-display font-bold text-navy-900 mt-2 mb-3">
                In-Depth Discovery
              </h3>
              <p className="text-xs text-charcoal-700 leading-relaxed">
                We analyze your business model, customer buying psychology, existing brand assets, and competitor positioning to establish baseline opportunities.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-charcoal-200/80 shadow-sm">
              <span className="text-xs font-mono font-bold text-electric-600">PHASE 02</span>
              <h3 className="text-lg font-display font-bold text-navy-900 mt-2 mb-3">
                Custom Solution Design
              </h3>
              <p className="text-xs text-charcoal-700 leading-relaxed">
                Rather than forcing rigid packages, we structure platform focus, creative volume, and messaging architectures that directly serve your growth goals.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-charcoal-200/80 shadow-sm">
              <span className="text-xs font-mono font-bold text-electric-600">PHASE 03</span>
              <h3 className="text-lg font-display font-bold text-navy-900 mt-2 mb-3">
                Collaborative Execution
              </h3>
              <p className="text-xs text-charcoal-700 leading-relaxed">
                You maintain direct oversight through organized monthly calendars, review cycles, and transparent communication throughout our partnership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUNDERS SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-soft text-purple-brand text-xs font-semibold mb-3">
              <span>Agency Leadership</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 tracking-tight">
              Meet the Founders
            </h2>
            <p className="mt-4 text-base text-charcoal-700">
              The creative vision and strategic direction behind AJDesigners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* Founder 1: Yashwa */}
            <div className="bg-surface-light rounded-3xl p-8 border border-charcoal-200/80 shadow-sm flex flex-col justify-between group hover:border-electric-500/40 transition-all">
              <div>
                {/* Photo Placeholder */}
                <div className="aspect-[4/3] rounded-2xl bg-navy-800 border border-charcoal-200 overflow-hidden relative mb-6 flex items-center justify-center text-charcoal-400">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-navy-700 text-electric-400 mx-auto flex items-center justify-center mb-3">
                      <UserCheck className="w-8 h-8" />
                    </div>
                    <div className="text-sm font-semibold text-white">Yashwa</div>
                    <div className="text-xs text-charcoal-400">Co-Founder, AJDesigners</div>
                    <div className="text-[11px] text-charcoal-500 mt-1 italic">
                      [Official founder profile & portrait placeholder]
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-display font-extrabold text-navy-900">Yashwa</h3>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-electric-100 text-electric-700">
                    Co-Founder
                  </span>
                </div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal-500 mb-4">
                  Creative Direction & Agency Strategy
                </h4>
                <p className="text-xs text-charcoal-700 leading-relaxed">
                  Leading strategic client consulting, business development, and creative roadmap formulation. Passionate about empowering international brands through scalable marketing systems, modern digital identity, and customer-first storytelling.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-charcoal-200/60 flex items-center justify-between text-xs text-charcoal-500">
                <span>AJDesigners Co-Founder</span>
                <span className="text-electric-600 font-semibold">Strategic Marketing</span>
              </div>
            </div>

            {/* Founder 2: Aroosa */}
            <div className="bg-surface-light rounded-3xl p-8 border border-charcoal-200/80 shadow-sm flex flex-col justify-between group hover:border-purple-brand/40 transition-all">
              <div>
                {/* Photo Placeholder */}
                <div className="aspect-[4/3] rounded-2xl bg-navy-800 border border-charcoal-200 overflow-hidden relative mb-6 flex items-center justify-center text-charcoal-400">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-navy-700 text-purple-brand mx-auto flex items-center justify-center mb-3">
                      <UserCheck className="w-8 h-8" />
                    </div>
                    <div className="text-sm font-semibold text-white">Aroosa</div>
                    <div className="text-xs text-charcoal-400">Co-Founder, AJDesigners</div>
                    <div className="text-[11px] text-charcoal-500 mt-1 italic">
                      [Official founder profile & portrait placeholder]
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-display font-extrabold text-navy-900">Aroosa</h3>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-soft text-purple-brand">
                    Co-Founder
                  </span>
                </div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal-500 mb-4">
                  Brand Aesthetics & Creative Production
                </h4>
                <p className="text-xs text-charcoal-700 leading-relaxed">
                  Directing visual standards, brand identity systems, AI-powered creative pipelines, and content aesthetics. Dedicated to ensuring every design, video, and digital deliverable communicates premium quality and distinct market positioning.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-charcoal-200/60 flex items-center justify-between text-xs text-charcoal-500">
                <span>AJDesigners Co-Founder</span>
                <span className="text-purple-brand font-semibold">Creative Production</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORE VALUES SECTION */}
      <section className="py-24 bg-surface-light border-y border-charcoal-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-100 text-electric-600 text-xs font-semibold mb-3">
              <span>What We Stand For</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 tracking-tight">
              Our Core Values
            </h2>
            <p className="mt-4 text-base text-charcoal-700">
              The fundamental principles that guide every client interaction, creative project, and campaign execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-7 rounded-2xl border border-charcoal-200/80 shadow-sm hover:shadow-card-elevated hover:border-electric-500/40 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-electric-100 text-electric-600 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-display font-bold text-navy-900 mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs text-charcoal-700 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <CTASection
        heading="Let's Partner on Your Digital Growth"
        subheading="Experience the difference of working with a dedicated creative and strategic partner. Book an introductory consultation today."
        buttonText="Schedule a Consultation"
        buttonLink="/contact"
      />
    </div>
  );
}


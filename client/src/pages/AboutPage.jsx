import React from 'react';
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
} from 'lucide-react';
import BookingCalendarWidget from '../components/common/BookingCalendarWidget';
import MeetTheTeam from '../components/home/MeetTheTeam';

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
    <div className="pt-24 bg-[#070709] min-h-screen text-gray-100">
      {/* 1. HERO SECTION */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-electric-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-brand/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-electric-400 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Agency Story & Leadership</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight text-white">
              Creativity Meets <span className="gradient-text">Digital Strategy.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed">
              AJDesigners was established by Yashwa and Aroosa with a clear mandate: to help high-growth businesses scale their digital presence through high-converting creative production, AI workflows, and data-driven marketing.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE STORY & LEADERSHIP */}
      <section className="py-20 bg-[#09090d] border-y border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-500/10 border border-electric-500/20 text-electric-400 text-xs font-semibold">
                <span>Founding Vision</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
                Beyond Attractive Visuals: Marketing With Strategic Purpose
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                We believe modern digital marketing requires more than static graphic templates. It requires hyper-focused audience psychology, rapid creative iteration, and platform-native distribution that commands attention in crowded feeds.
              </p>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                By uniting senior human art direction with state-of-the-art AI synthesis, we provide ambitious brands worldwide across all continents and international time zones with Fortune 500-grade creative velocity.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Mission Card */}
                <div className="p-8 rounded-3xl bg-[#111116] border border-white/[0.08] shadow-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-electric-500/20 border border-electric-400/30 text-electric-400 flex items-center justify-center mb-5 shadow-glow-blue">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">Our Mission</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    To empower businesses through creative digital solutions, strategic marketing, and innovative AI content that builds stronger brands and measurable commercial pipelines.
                  </p>
                </div>

                {/* Vision Card */}
                <div className="p-8 rounded-3xl bg-[#111116] border border-white/[0.08] shadow-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-purple-brand/20 border border-purple-brand/30 text-purple-brand flex items-center justify-center mb-5 shadow-glow-purple">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">Our Vision</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    To become a globally recognized creative and performance agency celebrated for innovation, uncompromised artistic integrity, and predictable client ROI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUNDERS & EXECUTIVE TEAM SPOTLIGHT */}
      <MeetTheTeam />

      {/* 4. CORE VALUES */}
      <section className="py-24 bg-[#09090d] border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              The Principles That Guide Every Sprint
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-400">
              Our 7 agency pillars ensure consistent standards across all client engagements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#111116] border border-white/[0.08] hover:border-white/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-electric-500/10 border border-electric-500/20 text-electric-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{val.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. BOOKING WIDGET */}
      <BookingCalendarWidget />
    </div>
  );
}

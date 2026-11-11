import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function CTASection({
  heading = 'Ready to Build Something Great?',
  subheading = "Let's discuss your business goals, target markets, and develop a customized digital strategy that delivers tangible growth.",
  buttonText = "Let's Talk About Your Project",
  buttonLink = '/contact',
}) {
  return (
    <section className="py-20 relative overflow-hidden bg-navy-900 text-white">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-electric-500/20 via-purple-brand/20 to-electric-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-electric-400 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Strategic Marketing & Creative Production</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
          {heading}
        </h2>

        <p className="mt-5 text-base sm:text-lg text-charcoal-300 max-w-2xl mx-auto leading-relaxed">
          {subheading}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={buttonLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-electric-500 via-electric-600 to-purple-brand shadow-glow-blue hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <span>{buttonText}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            to="/pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-charcoal-300 bg-navy-800/80 border border-white/10 hover:text-white hover:bg-navy-800 transition-all duration-200"
          >
            <span>Explore Monthly Packages</span>
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-charcoal-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-electric-400" />
            <span>Tailored International Strategies</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-brand" />
            <span>AI Innovation + Human Direction</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-electric-400" />
            <span>Transparent Weekly Deliverables</span>
          </div>
        </div>
      </div>
    </section>
  );
}


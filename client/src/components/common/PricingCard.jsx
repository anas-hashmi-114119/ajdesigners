import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export default function PricingCard({ pkg }) {
  const isRecommended = pkg.isRecommended || pkg.tierKey === 'growth';

  return (
    <div
      className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
        isRecommended
          ? 'bg-navy-900 text-white border-2 border-electric-500 shadow-glow-blue lg:-translate-y-2'
          : 'bg-white text-navy-900 border border-charcoal-200/80 shadow-sm hover:shadow-card-elevated hover:border-charcoal-300'
      }`}
    >
      {/* Recommended Ribbon */}
      {isRecommended && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-electric-500 to-purple-brand text-white text-[11px] font-extrabold uppercase tracking-widest shadow-md flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" />
          <span>{pkg.badgeText || 'MOST RECOMMENDED'}</span>
        </div>
      )}

      <div>
        <div className="mb-6">
          <span
            className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-3 ${
              isRecommended ? 'bg-white/10 text-electric-300' : 'bg-electric-100 text-electric-700'
            }`}
          >
            {pkg.planTitle}
          </span>
          <h3 className={`text-2xl font-display font-extrabold tracking-tight ${isRecommended ? 'text-white' : 'text-navy-900'}`}>
            {pkg.name}
          </h3>
          <p className={`mt-2 text-xs leading-relaxed ${isRecommended ? 'text-charcoal-300' : 'text-charcoal-700'}`}>
            {pkg.subtitle}
          </p>
        </div>

        {/* Price Display */}
        <div className="mb-6 pb-6 border-b border-charcoal-200/20">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold font-display">{pkg.currency || '$'}</span>
            <span className="text-4xl sm:text-5xl font-display font-black tracking-tight">{pkg.monthlyPrice}</span>
            <span className={`text-xs font-medium ml-1.5 ${isRecommended ? 'text-charcoal-400' : 'text-charcoal-500'}`}>
              / {pkg.billingPeriod || 'month'}
            </span>
          </div>
          <p className={`mt-2 text-[11px] ${isRecommended ? 'text-electric-300 font-medium' : 'text-charcoal-500'}`}>
            {pkg.idealFor}
          </p>
        </div>

        {/* Deliverables Checklist */}
        <div className="space-y-3 mb-8">
          <p className={`text-xs font-bold uppercase tracking-wider ${isRecommended ? 'text-white' : 'text-navy-900'}`}>
            What's Included:
          </p>
          <ul className="space-y-2.5">
            {pkg.deliverables &&
              pkg.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      isRecommended ? 'bg-electric-500 text-white' : 'bg-electric-100 text-electric-700'
                    }`}
                  >
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className={isRecommended ? 'text-charcoal-200' : 'text-charcoal-800'}>
                    {item}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div>
        <Link
          to={`/contact?plan=${pkg.tierKey}&service=${encodeURIComponent(pkg.planTitle)}`}
          className={`w-full py-3.5 px-6 rounded-full text-xs font-bold inline-flex items-center justify-center gap-2 transition-all duration-200 ${
            isRecommended
              ? 'bg-gradient-to-r from-electric-500 to-purple-brand text-white shadow-glow-blue hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-navy-900 text-white hover:bg-electric-600'
          }`}
        >
          <span>Get Started With {pkg.name}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}


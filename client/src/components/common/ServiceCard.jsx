import React from 'react';
import { Link } from 'react-router-dom';
import {
  Share2,
  Palette,
  Cpu,
  PenTool,
  Video,
  Target,
  TrendingUp,
  FileText,
  Search,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const iconMap = {
  Share2,
  Palette,
  Cpu,
  PenTool,
  Video,
  Target,
  TrendingUp,
  Linkedin: Share2,
  FileText,
  Search,
};

export default function ServiceCard({ service, featured = false }) {
  const IconComponent = iconMap[service.iconName] || Sparkles;

  return (
    <div
      className={`group relative rounded-2xl p-7 transition-all duration-300 flex flex-col justify-between ${
        featured
          ? 'bg-navy-900 text-white border border-white/10 shadow-card-elevated hover:border-electric-500/50'
          : 'bg-white text-navy-900 border border-charcoal-200/80 shadow-sm hover:shadow-card-elevated hover:border-electric-500/40'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              featured
                ? 'bg-white/10 text-electric-400 group-hover:bg-electric-500 group-hover:text-white group-hover:shadow-glow-blue'
                : 'bg-electric-100 text-electric-600 group-hover:bg-electric-500 group-hover:text-white'
            }`}
          >
            <IconComponent className="w-6 h-6" />
          </div>
          <span
            className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
              featured ? 'bg-white/5 text-charcoal-400' : 'bg-charcoal-100 text-charcoal-500'
            }`}
          >
            {service.number || '01'}
          </span>
        </div>

        <h3
          className={`text-xl font-display font-bold tracking-tight mb-2 group-hover:text-electric-500 transition-colors ${
            featured ? 'text-white' : 'text-navy-900'
          }`}
        >
          {service.title}
        </h3>

        <p
          className={`text-xs leading-relaxed mb-5 ${
            featured ? 'text-charcoal-300' : 'text-charcoal-700'
          }`}
        >
          {service.shortDescription}
        </p>

        {service.deliverables && service.deliverables.length > 0 && (
          <div className="space-y-1.5 mb-6">
            {service.deliverables.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs">
                <span className="text-electric-500 font-bold mt-0.5">•</span>
                <span className={featured ? 'text-charcoal-400' : 'text-charcoal-600'}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-charcoal-200/20">
        <Link
          to={`/services/${service.slug}`}
          className={`inline-flex items-center gap-1.5 text-xs font-bold transition-all group-hover:gap-2.5 ${
            featured ? 'text-electric-400 hover:text-electric-300' : 'text-electric-600 hover:text-electric-700'
          }`}
        >
          <span>Explore Service Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

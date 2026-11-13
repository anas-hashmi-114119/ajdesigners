import React, { useRef } from 'react';
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
  CheckCircle2,
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
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      data-cursor-text="EXPLORE"
      className="group relative rounded-3xl p-8 bg-[#111116] border border-white/[0.08] hover:border-electric-500/50 hover:shadow-glow-blue transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5"
    >
      {/* Dynamic Cursor-Proximity Radial Sheen */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.12), transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-2xl bg-electric-500/15 border border-electric-400/20 text-electric-400 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-electric-500 group-hover:text-white group-hover:shadow-glow-blue">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-white/[0.04] text-gray-400 border border-white/[0.06]">
            {service.number || '01'}
          </span>
        </div>

        <h3 className="text-xl font-display font-bold text-white group-hover:text-electric-300 transition-colors">
          {service.title}
        </h3>

        <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3">
          {service.shortDescription}
        </p>

        {service.deliverables && service.deliverables.length > 0 && (
          <div className="mt-6 pt-5 border-t border-white/[0.06] space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
              Core Deliverables
            </span>
            {service.deliverables.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric-400 shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-center justify-between relative z-10">
        <Link
          to={`/services/${service.slug}`}
          className="text-xs font-bold text-electric-400 group-hover:text-white inline-flex items-center gap-1.5 transition-colors"
        >
          <span>Explore Discipline</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <span className="text-[10px] font-mono text-gray-500">48h Sprints</span>
      </div>
    </div>
  );
}

import React from 'react';
import { Eye, Tag, Sparkles } from 'lucide-react';

export default function ProjectCard({ project, onSelect }) {
  return (
    <div
      onClick={() => onSelect && onSelect(project)}
      className="group bg-white rounded-2xl overflow-hidden border border-charcoal-200/80 shadow-sm hover:shadow-card-elevated hover:border-electric-500/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Media Thumbnail Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-navy-900/80 backdrop-blur-md text-electric-400 border border-white/10">
              {project.category}
            </span>

            {project.isConcept && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-brand/90 text-white backdrop-blur-md">
                Concept Work
              </span>
            )}
          </div>

          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 rounded-full bg-electric-500 text-white flex items-center justify-center shadow-lg">
              <Eye className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-charcoal-500 mb-1.5">
            <Tag className="w-3 h-3 text-electric-500" />
            <span>{project.industry}</span>
          </div>

          <h3 className="text-base font-display font-bold text-navy-900 group-hover:text-electric-600 transition-colors line-clamp-1 mb-2">
            {project.title}
          </h3>

          <p className="text-xs text-charcoal-700 line-clamp-2 leading-relaxed mb-4">
            {project.summary}
          </p>

          {/* Services list */}
          <div className="flex flex-wrap gap-1.5">
            {project.servicesProvided &&
              project.servicesProvided.slice(0, 3).map((srv, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-surface-light text-charcoal-600 border border-charcoal-200/50"
                >
                  {srv}
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className="px-5 pb-4 pt-2 border-t border-charcoal-100 flex items-center justify-between text-xs font-semibold text-electric-600 group-hover:text-electric-700">
        <span>View Project Details</span>
        <span className="text-sm">→</span>
      </div>
    </div>
  );
}


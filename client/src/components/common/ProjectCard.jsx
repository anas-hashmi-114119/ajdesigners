import React from 'react';
import { Eye, Tag, Sparkles } from 'lucide-react';

export default function ProjectCard({ project, onSelect }) {
  return (
    <div
      onClick={() => onSelect && onSelect(project)}
      data-cursor-text="PREVIEW"
      className="group bg-[#111116] rounded-3xl overflow-hidden border border-white/[0.08] hover:border-electric-500/50 hover:shadow-glow-blue transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 cursor-pointer"
    >
      <div>
        {/* Media Thumbnail Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-black">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-electric-400 border border-white/10">
              {project.category}
            </span>

            {project.isConcept && (
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-purple-brand/90 text-white backdrop-blur-md">
                Concept Work
              </span>
            )}
          </div>

          <div className="absolute bottom-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-electric-500 to-purple-brand text-white flex items-center justify-center shadow-glow-blue scale-90 group-hover:scale-100 transition-transform">
              <Eye className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 mb-2 font-mono">
            <Tag className="w-3 h-3 text-electric-400" />
            <span>{project.industry}</span>
          </div>

          <h3 className="text-lg font-display font-bold text-white group-hover:text-electric-300 transition-colors line-clamp-1 mb-2">
            {project.title}
          </h3>

          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
            {project.summary}
          </p>

          {/* Services list */}
          <div className="flex flex-wrap gap-1.5">
            {project.servicesProvided &&
              project.servicesProvided.slice(0, 3).map((srv, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-[#181820] text-gray-300 border border-white/[0.06]"
                >
                  {srv}
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-400">
        <span className="font-mono text-[11px] text-gray-500">Global Sprint</span>
        <span className="text-electric-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
          Inspect Case
        </span>
      </div>
    </div>
  );
}

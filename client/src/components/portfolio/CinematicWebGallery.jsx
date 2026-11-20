import React, { useState } from 'react';
import { Eye, ArrowUpRight, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import CinematicBrowserWindow from './CinematicBrowserWindow';
import CinematicCaseStudyModal from './CinematicCaseStudyModal';
import { CINEMATIC_WEBSITES } from './cinematicProjectsData';

export default function CinematicWebGallery() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <div className="space-y-20 lg:space-y-28 py-6">
      {/* Editorial Category Eyebrow */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-mono font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Cinematic Digital Experience Gallery</span>
        </div>

        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
          Websites & Landing Pages <br />
          <span className="gradient-text">Engineered for High-Converting Immersion.</span>
        </h3>

        <p className="text-sm sm:text-base text-gray-400 font-normal leading-relaxed max-w-2xl mx-auto">
          Explore our flagship digital experience concepts. Each preview simulates an authentic live browsing session with smooth auto-scrolling inside realistic browser frames. Click any project to inspect full multi-device case studies.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 4 LARGE CINEMATIC SHOWCASE PROJECTS (VISUALLY DOMINANT)                   */}
      {/* ========================================================================= */}
      <div className="space-y-24 lg:space-y-32">
        {CINEMATIC_WEBSITES.map((project, idx) => {
          const isEven = idx % 2 === 1;

          return (
            <div
              key={project.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Left/Content Column */}
              <div
                className={`space-y-6 ${
                  isEven ? 'lg:col-span-5 lg:order-2' : 'lg:col-span-5 lg:order-1'
                }`}
              >
                {/* Large Serial & Metadata Pill */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl font-display font-black text-gold-400/30">
                    0{idx + 1}
                  </span>
                  <div className="h-4 w-px bg-white/20" />
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181820] text-gold-400 border border-gold-500/30 text-[10px] font-mono uppercase tracking-wider font-bold">
                    <Lock className="w-3 h-3" />
                    <span>{project.domain}</span>
                  </span>
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest hidden sm:inline">
                    {project.year}
                  </span>
                </div>

                {/* Project Title & Industry */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#EAD08C] font-semibold block mb-1">
                    {project.industry}
                  </span>
                  <h4 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
                    {project.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-300 font-medium mt-2 leading-snug">
                    {project.tagline}
                  </p>
                </div>

                {/* Narrative Summary */}
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                  {project.summary}
                </p>

                {/* Metric Strip */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {project.metrics.slice(0, 2).map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3 rounded-xl bg-[#14141E] border border-white/[0.06]"
                    >
                      <div className="text-base sm:text-lg font-display font-extrabold text-gold-300">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-gray-400 font-medium mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action CTA Button */}
                <div className="pt-2">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-extrabold uppercase tracking-widest text-black bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C69341] hover:shadow-glow-gold hover:scale-[1.03] active:scale-[0.98] transition-all shadow-lg"
                  >
                    <Eye className="w-4 h-4 text-black" />
                    <span>Inspect Case Study</span>
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </button>
                </div>
              </div>

              {/* Right/Browser Window Column (Visually Dominant) */}
              <div
                className={`relative ${
                  isEven ? 'lg:col-span-7 lg:order-1' : 'lg:col-span-7 lg:order-2'
                }`}
              >
                {/* Radial Glow Anchor */}
                <div
                  className="absolute inset-0 rounded-3xl blur-3xl opacity-20 pointer-events-none -z-10"
                  style={{
                    backgroundColor: project.accentColor || '#C69341',
                  }}
                />

                {/* Realistic Cinematic Browser Window */}
                <CinematicBrowserWindow
                  project={project}
                  onExplore={setActiveProject}
                  autoScrollSpeed={14 + idx * 3}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE FULL CASE STUDY MODAL                                         */}
      {/* ========================================================================= */}
      <CinematicCaseStudyModal
        project={activeProject}
        isOpen={activeProject !== null}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
}

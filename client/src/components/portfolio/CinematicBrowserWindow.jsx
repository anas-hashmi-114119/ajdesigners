import React, { useState, useEffect, useRef } from 'react';
import { Lock, Eye, Play, Pause, ArrowUpRight, RotateCcw } from 'lucide-react';

export default function CinematicBrowserWindow({
  project,
  onExplore,
  autoScrollSpeed = 16, // seconds for full scroll
  aspectHeight = 'h-[360px] sm:h-[420px] md:h-[460px]',
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);
  const scrollTrackRef = useRef(null);

  // Performance: IntersectionObserver pauses animation when outside viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsPlaying(false);
    }
  }, []);

  const shouldAnimate = isPlaying && isVisible && !isHovered;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl sm:rounded-3xl bg-[#111116] border border-white/[0.1] hover:border-gold-500/50 shadow-2xl transition-all duration-500 overflow-hidden flex flex-col transform-gpu"
    >
      {/* ========================================================================= */}
      {/* 1. REALISTIC BROWSER CHROME HEADER                                       */}
      {/* ========================================================================= */}
      <div className="bg-[#181820] border-b border-white/[0.08] px-4 py-3 flex items-center justify-between gap-4 select-none">
        {/* Left: macOS Traffic Light Window Controls */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/20 shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/20 shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/20 shadow-sm" />
        </div>

        {/* Center: Address Bar with SSL Security & Custom Domain */}
        <div className="flex-1 max-w-sm sm:max-w-md mx-auto">
          <div className="h-7 px-3.5 rounded-full bg-[#0E0E14] border border-white/[0.06] flex items-center justify-center gap-2 text-[11px] font-mono text-gray-400 group-hover:border-gold-500/30 transition-colors">
            <Lock className="w-3 h-3 text-gold-400 shrink-0" />
            <span className="text-gray-300 font-medium truncate">https://{project.domain}</span>
          </div>
        </div>

        {/* Right: Live Interactive Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
            title={isPlaying ? 'Pause Auto-Scroll' : 'Resume Auto-Scroll'}
            className="p-1.5 rounded-md hover:bg-white/[0.08] text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle auto-scroll playback"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-gold-400" />}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. BROWSER VIEWPORT & SMOOTH FULL-PAGE AUTO-SCROLL SIMULATION             */}
      {/* ========================================================================= */}
      <div
        onClick={() => onExplore && onExplore(project)}
        className={`relative ${aspectHeight} w-full overflow-hidden bg-[#0A0A0E] cursor-pointer`}
      >
        {/* Animated Scrolling Track Container */}
        <div
          ref={scrollTrackRef}
          className="w-full flex flex-col"
          style={{
            transform: shouldAnimate ? 'translateY(calc(-100% + 400px))' : undefined,
            transition: shouldAnimate
              ? `transform ${autoScrollSpeed}s cubic-bezier(0.42, 0, 0.58, 1) infinite alternate`
              : 'transform 0.4s ease-out',
          }}
        >
          {/* Complete Multi-Section Website Preview Rendering */}
          <div className="w-full flex flex-col">
            {/* 1. Website Hero Visual */}
            <div className="relative w-full aspect-[16/10] bg-black">
              <img
                src={project.heroImage}
                alt={`${project.title} Hero Viewport`}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E] via-transparent to-transparent opacity-40" />
            </div>

            {/* 2. Middle Section Architecture */}
            {project.sectionScreenshots && project.sectionScreenshots.length > 0 && (
              <div className="w-full space-y-2 p-3 bg-[#0A0A0E]">
                <div className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/[0.05]">
                  <img
                    src={project.sectionScreenshots[1]?.image || project.longScreenshot}
                    alt={`${project.title} Section Preview`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* 3. Footer / Conversion Section */}
                <div className="w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/[0.05]">
                  <img
                    src={project.sectionScreenshots[2]?.image || project.mobileImage}
                    alt={`${project.title} Conversion Section`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Viewport Glass Sheen Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none" />

        {/* Hover Cue: "Explore Case Study" Button Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
          <div className="px-6 py-3 rounded-full text-xs font-mono font-extrabold uppercase tracking-widest text-black bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C69341] shadow-glow-gold flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-4 h-4 text-black" />
            <span>Explore Full Case Study</span>
            <ArrowUpRight className="w-4 h-4 text-black" />
          </div>
        </div>

        {/* Bottom Status Indicator Pill */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider text-gray-300 bg-[#0E0E14]/90 backdrop-blur-md border border-white/10 shadow-lg">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: project.accentColor || '#C69341' }}
            />
            <span>{isHovered ? 'Paused for Inspection' : 'Cinematic Auto-Scroll'}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Lock, Play, Pause, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

/**
 * CinematicBrowserWindow
 * Displays a realistic browser window mockup with multi-picture preview slides
 * that automatically cycle every 2 seconds with smooth transitions and interactive controls.
 * Strictly no modal popups on click - allows direct interaction with the slides.
 */
export default function CinematicBrowserWindow({
  project,
  aspectHeight = 'aspect-[16/10] sm:aspect-[16/9.5] md:aspect-[16/9]',
}) {
  const slides = project?.slides || [];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  // Pause automatic transitions when out of viewport for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2-Second Automatic Slide Progression
  useEffect(() => {
    if (!isPlaying || !isVisible || isHovered || slides.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [isPlaying, isVisible, isHovered, slides.length]);

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const activeSlideData = slides[currentSlide] || slides[0] || {};

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl sm:rounded-3xl bg-[#111116] border border-white/[0.1] hover:border-gold-500/50 shadow-2xl transition-all duration-500 overflow-hidden flex flex-col transform-gpu"
    >
      {/* ========================================================================= */}
      {/* 1. BROWSER CHROME HEADER                                                  */}
      {/* ========================================================================= */}
      <div className="bg-[#181820] border-b border-white/[0.08] px-4 py-3 flex items-center justify-between gap-3 select-none">
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/20 shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/20 shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/20 shadow-sm" />
        </div>

        {/* Title Bar */}
        <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          <div className="h-7 px-3.5 rounded-full bg-[#0E0E14] border border-white/[0.06] flex items-center justify-center gap-2 text-[11px] font-mono text-gray-400 group-hover:border-gold-500/30 transition-colors">
            <Sparkles className="w-3 h-3 text-gold-400 shrink-0" />
            <span className="text-gray-300 font-semibold truncate">AJDesigners • {project.title}</span>
          </div>
        </div>

        {/* Live Controls: Slide Index & Play/Pause */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold text-gray-400 bg-black/40 px-2 py-0.5 rounded-full border border-white/5">
            {currentSlide + 1}/{slides.length}
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause 2s slideshow' : 'Resume 2s slideshow'}
            className="p-1 rounded-md hover:bg-white/[0.08] text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle auto slideshow"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5 text-gold-400" />
            )}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SLIDESHOW VIEWPORT (CROSSFADES EVERY 2 SECONDS)                         */}
      {/* ========================================================================= */}
      <div
        className={`relative ${aspectHeight} w-full overflow-hidden bg-[#0A0A0E] select-none`}
        onClick={handleNext}
        title="Click to view next preview screen"
      >
        {/* Render all slides with smooth crossfade */}
        {slides.map((slide, sIdx) => {
          const isActive = sIdx === currentSlide;
          return (
            <div
              key={sIdx}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={`${project.title} - ${slide.title}`}
                className={`w-full h-full object-cover object-center transition-transform duration-1000 ${
                  isActive ? 'scale-100' : 'scale-105'
                }`}
                loading="lazy"
              />
              {/* Subtle bottom gradient overlay for legibility of captions & progress bar */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0A0A0E]/95 via-[#0A0A0E]/40 to-transparent pointer-events-none" />
            </div>
          );
        })}

        {/* Gloss sheen effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none z-20" />

        {/* Previous / Next Manual Navigation Arrows (Visible on Hover) */}
        <button
          onClick={handlePrev}
          aria-label="Previous preview image"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next preview image"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Bottom Slide Info Overlay */}
        <div className="absolute bottom-4 inset-x-4 z-30 flex flex-col gap-2">
          {/* Active Screen Caption Pill */}
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs shadow-lg max-w-[85%] truncate">
              <Sparkles className="w-3 h-3 text-gold-400 shrink-0" />
              <span className="font-semibold text-gold-200 truncate">
                {activeSlideData.label || activeSlideData.title}
              </span>
              <span className="text-gray-400 hidden sm:inline text-[11px] truncate">
                — {activeSlideData.caption}
              </span>
            </div>

            {/* Hover status hint */}
            <span className="text-[10px] font-mono text-gray-400 hidden md:inline bg-black/60 px-2.5 py-0.5 rounded-full border border-white/5">
              {isHovered ? 'Paused' : 'Auto 2s'}
            </span>
          </div>

          {/* 4-Segment Progress Bar */}
          <div className="grid grid-cols-4 gap-1.5 w-full pt-1">
            {slides.map((_, pIdx) => {
              const isCurrent = pIdx === currentSlide;
              const isPassed = pIdx < currentSlide;
              return (
                <button
                  key={pIdx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(pIdx);
                  }}
                  className="h-1.5 rounded-full bg-white/20 hover:bg-white/40 overflow-hidden transition-all duration-300 relative group/seg"
                  aria-label={`Jump to slide ${pIdx + 1}`}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C69341] w-full shadow-[0_0_8px_rgba(245,215,145,0.8)]'
                        : isPassed
                        ? 'bg-gold-400/80 w-full'
                        : 'w-0'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

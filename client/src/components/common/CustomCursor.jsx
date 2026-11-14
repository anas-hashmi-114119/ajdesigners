import React, { useEffect, useRef, useState } from 'react';

/**
 * Ultra-Fast High-End Gaming Reticle Cursor
 * - Precision zero-lag center tracking point (0.9 lerp)
 * - Snappy cyber HUD outer reticle (0.52 lerp) with crosshair notches & tactical brackets
 * - Color-matched to AJDesigners: Electric Blue (#38BDF8 / #3B82F6), Cyber Cyan (#00F0FF), Neon Violet (#8B5CF6)
 * - Expands into target lock-on on interactive elements and morphs into futuristic HUD pill with contextual text
 */
export default function CustomCursor() {
  const reticleRef = useRef(null);
  const dotRef = useRef(null);
  const glowRef = useRef(null);

  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // High-performance coordinate refs
  const mouse = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const reticlePos = useRef({ x: -100, y: -100 });
  const glowPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Only activate on fine-pointer devices (desktop mouse/trackpad)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Contextual hover listener for scale & tactical label
    const handleElementHover = (e) => {
      const target = e.target.closest(
        'a, button, [role="button"], [data-cursor], [data-cursor-text], input, select, textarea, .interactive-card, .service-row, .bento-cell'
      );
      if (target) {
        setIsHovered(true);
        const text = target.getAttribute('data-cursor-text');
        setCursorText(text || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleElementHover);

    // High-FPS Snappy Gaming Lerp Animation Loop
    const loop = () => {
      // 1. Center precision dot: instantaneous tracking (0.90 factor for razor-sharp response)
      dotPos.current.x += (mouse.current.x - dotPos.current.x) * 0.90;
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * 0.90;

      // 2. Outer tactical gaming reticle: snappy 0.52 factor (smooth yet fast, zero floaty lag)
      reticlePos.current.x += (mouse.current.x - reticlePos.current.x) * 0.52;
      reticlePos.current.y += (mouse.current.y - reticlePos.current.y) * 0.52;

      // 3. Ambient lighting aura: gentle soft follower (0.15 factor)
      glowPos.current.x += (mouse.current.x - glowPos.current.x) * 0.15;
      glowPos.current.y += (mouse.current.y - glowPos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      }

      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${reticlePos.current.x}px, ${reticlePos.current.y}px, 0)`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleElementHover);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
    >
      {/* 1. Ambient Background Glow Aura (Electric Blue & Purple) */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 -ml-28 -mt-28 w-56 h-56 rounded-full pointer-events-none blur-3xl opacity-30 bg-gradient-to-tr from-electric-500/30 via-purple-brand/20 to-transparent transition-opacity duration-300"
        style={{ willChange: 'transform' }}
      />

      {/* 2. Razor-Sharp Precision Center Aim Point (Zero-lag) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center -ml-1 -mt-1"
        style={{ willChange: 'transform' }}
      >
        <span
          className={`block rounded-full transition-transform duration-100 ${
            isClicking
              ? 'w-2 h-2 bg-white shadow-glow-blue scale-125'
              : 'w-1.5 h-1.5 bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]'
          }`}
        />
      </div>

      {/* 3. Outer Gaming HUD Reticle with Crosshairs & Tactical Brackets */}
      <div
        ref={reticleRef}
        className={`fixed top-0 left-0 pointer-events-none flex items-center justify-center transition-all duration-150 ease-out ${
          cursorText
            ? '-ml-12 -mt-5 px-3.5 py-1.5 rounded-full bg-[#0E0E14]/90 border border-electric-400 text-white shadow-glow-blue backdrop-blur-md scale-100'
            : isHovered
            ? '-ml-6 -mt-6 w-12 h-12 rounded-full border border-electric-400/80 bg-electric-500/10 shadow-glow-blue scale-110'
            : isClicking
            ? '-ml-4 -mt-4 w-8 h-8 rounded-full border-2 border-purple-400 bg-purple-500/25 scale-90'
            : '-ml-5 -mt-5 w-10 h-10 rounded-full border border-electric-400/40 bg-white/[0.01]'
        }`}
        style={{ willChange: 'transform' }}
      >
        {/* Contextual Tactical Text Pill */}
        {cursorText ? (
          <span className="text-[10px] font-mono font-black uppercase tracking-widest leading-none select-none text-white whitespace-nowrap flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-400 animate-pulse" />
            <span>{cursorText}</span>
          </span>
        ) : (
          /* Gaming Reticle HUD Crosshair Tick Marks (Top, Bottom, Left, Right) */
          <>
            {/* Top Tick */}
            <span
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-0.5 rounded-full transition-all duration-150 ${
                isHovered ? 'h-2 bg-electric-400 shadow-glow-blue' : 'h-1.5 bg-electric-400/60'
              }`}
            />
            {/* Bottom Tick */}
            <span
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 rounded-full transition-all duration-150 ${
                isHovered ? 'h-2 bg-purple-400 shadow-glow-blue' : 'h-1.5 bg-electric-400/60'
              }`}
            />
            {/* Left Tick */}
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 rounded-full transition-all duration-150 ${
                isHovered ? 'w-2 bg-electric-400 shadow-glow-blue' : 'w-1.5 bg-electric-400/60'
              }`}
            />
            {/* Right Tick */}
            <span
              className={`absolute right-0 top-1/2 -translate-y-1/2 h-0.5 rounded-full transition-all duration-150 ${
                isHovered ? 'w-2 bg-purple-400 shadow-glow-blue' : 'w-1.5 bg-electric-400/60'
              }`}
            />

            {/* Subtle Inner Corner Target Ring on Hover */}
            {isHovered && (
              <span className="absolute inset-1.5 rounded-full border border-purple-400/40 animate-pulse pointer-events-none" />
            )}
          </>
        )}
      </div>
    </div>
  );
}

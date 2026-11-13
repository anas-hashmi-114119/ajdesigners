import React, { useEffect, useRef, useState } from 'react';

/**
 * Non-Intrusive Smooth Halo & Trailing Follower
 * Never hides the system OS cursor, guaranteeing that the user's cursor is ALWAYS visible.
 * Provides a high-end ambient radial glow and smooth spring-damped trailing ring.
 */
export default function CustomCursor() {
  const ringRef = useRef(null);
  const glowRef = useRef(null);

  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  // Smooth lerp coordinates
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const ringPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const glowPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const rafId = useRef(null);

  useEffect(() => {
    // Only run on fine-pointer devices (desktop mouse/trackpad)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!hasMoved) setHasMoved(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Contextual hover listener for scale & label
    const handleElementHover = (e) => {
      const target = e.target.closest('a, button, [data-cursor], [data-cursor-text], .interactive-card, .service-row, .bento-cell');
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
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleElementHover);

    // Spring animation loop
    const loop = () => {
      // Ring lags with smooth spring damping
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.22;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.22;

      // Glow lags gently
      glowPos.current.x += (mouse.current.x - glowPos.current.x) * 0.08;
      glowPos.current.y += (mouse.current.y - glowPos.current.y) * 0.08;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleElementHover);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [hasMoved]);

  // If mouse hasn't moved yet, render hidden initially then stay visible forever
  if (!hasMoved) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
    >
      {/* 1. Ambient Radial Gradient Glow Follower */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 -ml-32 -mt-32 w-64 h-64 rounded-full pointer-events-none blur-3xl opacity-35 bg-gradient-to-tr from-blue-500/25 via-purple-500/20 to-transparent"
        style={{ willChange: 'transform' }}
      />

      {/* 2. Fluid Trailing Halo Ring (Complements OS cursor without hiding it) */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center pointer-events-none transition-all duration-150 ease-out ${
          cursorText
            ? '-ml-9 -mt-4 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-electric-500/90 to-purple-brand/90 text-white shadow-glow-blue border border-white/20 backdrop-blur-md scale-100'
            : isHovered
            ? '-ml-5 -mt-5 w-10 h-10 rounded-full border border-electric-400 bg-electric-500/15 shadow-glow-blue scale-125'
            : isClicking
            ? '-ml-3 -mt-3 w-6 h-6 rounded-full border border-purple-400 bg-purple-500/30 scale-90'
            : '-ml-4 -mt-4 w-8 h-8 rounded-full border border-electric-400/40 bg-white/[0.02]'
        }`}
        style={{ willChange: 'transform' }}
      >
        {cursorText && (
          <span className="text-[9px] font-sans font-extrabold uppercase tracking-widest leading-none select-none text-white whitespace-nowrap">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';

/**
 * Custom Interactive Cursor with Radial Gradient Glow & Dynamic Interactive Adaptation
 * Follows mouse position with spring damping physics and scales up over cards, buttons & interactive rows.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);

  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  // Smooth lerp coordinates
  const mouse = useRef({ x: -200, y: -200 });
  const dotPos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const glowPos = useRef({ x: -200, y: -200 });
  const rafId = useRef(null);

  useEffect(() => {
    // Check if pointer is fine (mouse/trackpad, not touch)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaQuery.matches);

    if (!mediaQuery.matches) return;

    // Add class to body to hide default cursor
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Contextual hover listener
    const handleElementHover = (e) => {
      const target = e.target.closest('a, button, input, select, textarea, [data-cursor], [data-cursor-text], .interactive-card, .service-row, .bento-cell');
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
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleElementHover);

    // Animation Loop (Spring-Damper Lerp)
    const loop = () => {
      // 1. Dot follows immediately with tight lerp
      dotPos.current.x += (mouse.current.x - dotPos.current.x) * 0.8;
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * 0.8;

      // 2. Ring lags with smooth spring damping
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.2;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.2;

      // 3. Ambient radial glow follower lags gently
      glowPos.current.x += (mouse.current.x - glowPos.current.x) * 0.08;
      glowPos.current.y += (mouse.current.y - glowPos.current.y) * 0.08;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      }

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
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleElementHover);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!isFinePointer) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 1. Ambient Radial Gradient Glow Follower */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 -ml-36 -mt-36 w-72 h-72 rounded-full pointer-events-none blur-3xl opacity-40 transition-opacity duration-300 bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-transparent"
        style={{ willChange: 'transform' }}
      />

      {/* 2. Sharp Precision Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1.5 -mt-1.5 w-3 h-3 rounded-full bg-electric-400 pointer-events-none shadow-glow-blue transition-transform duration-75 ease-out"
        style={{ willChange: 'transform' }}
      />

      {/* 3. Fluid Outer Ring & Magnetic Contextual Pill */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center pointer-events-none transition-all duration-200 ease-out ${
          cursorText
            ? '-ml-10 -mt-5 px-4 py-2 rounded-full bg-gradient-to-r from-electric-500 to-purple-brand text-white shadow-glow-blue border border-white/25 backdrop-blur-md scale-100'
            : isHovered
            ? '-ml-7 -mt-7 w-14 h-14 rounded-full border-2 border-electric-400/80 bg-electric-500/10 backdrop-blur-[2px] scale-125 shadow-glow-blue'
            : isClicking
            ? '-ml-3.5 -mt-3.5 w-7 h-7 rounded-full border border-purple-400 bg-purple-500/30 scale-75'
            : '-ml-4 -mt-4 w-8 h-8 rounded-full border border-white/30 bg-white/[0.03]'
        }`}
        style={{ willChange: 'transform' }}
      >
        {cursorText && (
          <span className="text-[10px] font-sans font-bold uppercase tracking-wider leading-none select-none text-white whitespace-nowrap">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}

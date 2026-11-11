import React, { useEffect, useRef, useState } from 'react';

/**
 * Spring-Damped Magnetic Custom Cursor with Contextual Labels and Click Shockwave
 * Modeled after Active Theory's interactive pointer mechanics.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  // Smooth lerp coordinates
  const mouse = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
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
      const target = e.target.closest('a, button, input, select, textarea, [data-cursor], .interactive-card');
      if (target) {
        setIsHovered(true);
        const text = target.getAttribute('data-cursor-text');
        setCursorText(text || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleElementHover);

    // Animation Loop (Spring-Damper Lerp)
    const loop = () => {
      // Dot follows immediately
      dotPos.current.x += (mouse.current.x - dotPos.current.x) * 0.75;
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * 0.75;

      // Ring lags with spring inertia
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
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
      {/* 1. Sharp High-Precision Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-electric-400 pointer-events-none transition-transform duration-75 ease-out shadow-glow-blue"
        style={{ willChange: 'transform' }}
      />

      {/* 2. Fluid Lagging Outer Ring & Magnetic Pill */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center pointer-events-none transition-all duration-200 ease-out ${
          cursorText
            ? '-ml-8 -mt-4 px-3.5 py-1.5 rounded-full bg-electric-500/90 text-white backdrop-blur-md shadow-glow-blue border border-white/20'
            : isHovered
            ? '-ml-6 -mt-6 w-12 h-12 rounded-full border-2 border-electric-400 bg-electric-500/15 backdrop-blur-[2px] scale-110'
            : isClicking
            ? '-ml-4 -mt-4 w-8 h-8 rounded-full border border-purple-400/80 bg-purple-500/20 scale-75'
            : '-ml-4 -mt-4 w-8 h-8 rounded-full border border-white/30 bg-white/[0.02]'
        }`}
        style={{ willChange: 'transform' }}
      >
        {cursorText && (
          <span
            ref={labelRef}
            className="text-[9px] font-mono font-extrabold uppercase tracking-widest leading-none select-none"
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}

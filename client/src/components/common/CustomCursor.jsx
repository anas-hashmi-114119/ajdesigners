import React, { useEffect, useRef, useState } from 'react';

/**
 * Contextual Floating Pill Follower
 * - Trailing blue circle / ring and ambient blue glow completely removed per user request
 * - Preserves native enlarged arrow cursor
 * - Displays a subtle contextual pill (e.g. "EXPAND", "READ", "BOOK CALL") offset next to the arrow only when hovering interactive elements with data-cursor-text
 */
export default function CustomCursor() {
  const badgeRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const mouse = useRef({ x: -100, y: -100 });
  const badgePos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Only activate on fine-pointer desktop devices
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleElementHover = (e) => {
      const target = e.target.closest('[data-cursor-text]');
      if (target) {
        const text = target.getAttribute('data-cursor-text');
        setCursorText(text || '');
      } else {
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleElementHover);

    // Smooth RAF tracking for the contextual text pill
    const loop = () => {
      // Offset slightly to the bottom-right of the arrow tip (x + 16, y + 18)
      badgePos.current.x += (mouse.current.x + 16 - badgePos.current.x) * 0.45;
      badgePos.current.y += (mouse.current.y + 18 - badgePos.current.y) * 0.45;

      if (badgeRef.current) {
        badgeRef.current.style.transform = `translate3d(${badgePos.current.x}px, ${badgePos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleElementHover);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!cursorText) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
    >
      <div
        ref={badgeRef}
        className="fixed top-0 left-0 px-2.5 py-1 rounded-full bg-[#111116]/95 border border-white/20 text-white shadow-xl backdrop-blur-md transition-opacity duration-150"
        style={{ willChange: 'transform' }}
      >
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider leading-none select-none text-electric-400">
          {cursorText}
        </span>
      </div>
    </div>
  );
}

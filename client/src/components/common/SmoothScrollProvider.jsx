import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Check if device supports coarse pointer (touch device)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    // On touch devices, use native hardware momentum for pure 120Hz ProMotion feel
    const lenis = new Lenis({
      duration: 0.85, // Snappy, responsive, zero sluggish drag
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0, // 1:1 direct input, no artificial input latency
      touchMultiplier: 1.0,
      syncTouch: false, // Let native OS handle touch physics
      infinite: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  // Smooth scroll to top on page navigation
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return <div className="smooth-scroll-wrapper">{children}</div>;
}


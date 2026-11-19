import React, { useEffect, useRef } from 'react';

/**
 * High-Performance Interactive Liquid Gradient & Wave Shader Canvas
 * Luxury Artisan Gold (#C69341), Warm Bronze & Champagne
 * Optimized with IntersectionObserver and cached transforms for 120 FPS buttery scrolling.
 */
export default function HeroCanvasShader() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId = null;
    let isVisible = true;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let mouse = { x: width * 0.5, y: height * 0.5, targetX: width * 0.5, targetY: height * 0.5 };
    let time = 0;
    let canvasRect = canvas.getBoundingClientRect();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      canvasRect = canvas.getBoundingClientRect();
    };

    const handleScroll = () => {
      if (isVisible) {
        canvasRect = canvas.getBoundingClientRect();
      }
    };

    const handleMouseMove = (e) => {
      if (!isVisible) return;
      mouse.targetX = e.clientX - canvasRect.left;
      mouse.targetY = e.clientY - canvasRect.top;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Harmonic Plasma Rendering Loop
    const render = () => {
      if (!isVisible) return;

      time += 0.015;

      // Mouse lerp with fast convergence
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Base Obsidian Background
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#070709');
      bgGrad.addColorStop(1, '#0e0d0b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Plasma Orb 1: Artisan Gold (#C69341, reacts to mouse)
      const orb1X = mouse.x + Math.sin(time * 0.7) * 90;
      const orb1Y = mouse.y + Math.cos(time * 0.5) * 70;
      const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 10, orb1X, orb1Y, width * 0.55);
      grad1.addColorStop(0, 'rgba(198, 147, 65, 0.32)');
      grad1.addColorStop(0.5, 'rgba(221, 167, 79, 0.10)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Plasma Orb 2: Warm Burnished Bronze (reacts inversely)
      const orb2X = width - mouse.x * 0.7 + Math.cos(time * 0.6) * 110;
      const orb2Y = height - mouse.y * 0.7 + Math.sin(time * 0.8) * 80;
      const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 20, orb2X, orb2Y, width * 0.5);
      grad2.addColorStop(0, 'rgba(158, 111, 36, 0.28)');
      grad2.addColorStop(0.5, 'rgba(100, 65, 20, 0.08)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Plasma Orb 3: Luminous Champagne Highlight
      const orb3X = width * 0.5 + Math.sin(time * 1.1) * (width * 0.25);
      const orb3Y = height * 0.3 + Math.cos(time * 0.9) * 60;
      const grad3 = ctx.createRadialGradient(orb3X, orb3Y, 0, orb3X, orb3Y, 320);
      grad3.addColorStop(0, 'rgba(245, 215, 145, 0.25)');
      grad3.addColorStop(1, 'transparent');
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, width, height);

      // Sine Wave Grid Lines (Artisan Gold)
      ctx.lineWidth = 1;
      for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        const yOffset = height * 0.45 + j * 70;
        ctx.strokeStyle = `rgba(198, 147, 65, ${0.09 - j * 0.02})`;
        for (let x = 0; x < width; x += 15) {
          const wave = Math.sin(x * 0.005 + time + j) * 35 + Math.cos((x + mouse.x) * 0.003) * 20;
          if (x === 0) ctx.moveTo(x, yOffset + wave);
          else ctx.lineTo(x, yOffset + wave);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // IntersectionObserver to halt rendering loop when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          canvasRect = canvas.getBoundingClientRect();
          if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(render);
          }
        } else {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);

    // Visibility change (pause on background tabs)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      } else if (isVisible && !animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.9, willChange: 'transform' }}
    />
  );
}


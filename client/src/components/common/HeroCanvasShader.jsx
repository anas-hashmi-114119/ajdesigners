import React, { useEffect, useRef } from 'react';

/**
 * High-Performance Interactive Liquid Gradient & Wave Shader Canvas
 * Generates real-time flowing fluid plasma in Electric Blue (#2563EB) & Purple (#7C3AED)
 * reacting smoothly to mouse movement.
 */
export default function HeroCanvasShader() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let mouse = { x: width * 0.5, y: height * 0.5, targetX: width * 0.5, targetY: height * 0.5 };
    let time = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Harmonic Plasma Rendering Loop
    const render = () => {
      time += 0.015;

      // Mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Gradient 1: Deep Navy base
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#0a0f1d');
      bgGrad.addColorStop(1, '#0e172a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Plasma Orb 1: Electric Blue (reacts to mouse)
      const orb1X = mouse.x + Math.sin(time * 0.7) * 90;
      const orb1Y = mouse.y + Math.cos(time * 0.5) * 70;
      const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 10, orb1X, orb1Y, width * 0.55);
      grad1.addColorStop(0, 'rgba(37, 99, 235, 0.35)');
      grad1.addColorStop(0.5, 'rgba(59, 130, 246, 0.12)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Plasma Orb 2: Royal Purple (reacts inversely)
      const orb2X = width - mouse.x * 0.7 + Math.cos(time * 0.6) * 110;
      const orb2Y = height - mouse.y * 0.7 + Math.sin(time * 0.8) * 80;
      const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 20, orb2X, orb2Y, width * 0.5);
      grad2.addColorStop(0, 'rgba(124, 58, 237, 0.3)');
      grad2.addColorStop(0.5, 'rgba(147, 51, 234, 0.08)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Plasma Orb 3: Cyan Highlight
      const orb3X = width * 0.5 + Math.sin(time * 1.1) * (width * 0.25);
      const orb3Y = height * 0.3 + Math.cos(time * 0.9) * 60;
      const grad3 = ctx.createRadialGradient(orb3X, orb3Y, 0, orb3X, orb3Y, 320);
      grad3.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
      grad3.addColorStop(1, 'transparent');
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, width, height);

      // Sine Wave Grid Lines
      ctx.lineWidth = 1;
      for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        const yOffset = height * 0.45 + j * 70;
        ctx.strokeStyle = `rgba(96, 165, 250, ${0.08 - j * 0.02})`;
        for (let x = 0; x < width; x += 15) {
          const wave = Math.sin(x * 0.005 + time + j) * 35 + Math.cos((x + mouse.x) * 0.003) * 20;
          if (x === 0) ctx.moveTo(x, yOffset + wave);
          else ctx.lineTo(x, yOffset + wave);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  );
}

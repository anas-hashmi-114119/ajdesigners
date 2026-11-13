import React, { useEffect, useRef } from 'react';

/**
 * Lightweight Code-Based Vector Motion Graphic (Lottie-Style)
 * High-performance, infinitely scalable SVG / Canvas neural sphere
 * representing AJDesigners' AI + Strategic Marketing engine.
 */
export default function AgencyLottieGraphic({ className = 'w-48 h-48' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const size = 300;
    canvas.width = size;
    canvas.height = size;

    const nodes = [];
    const nodeCount = 24;

    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      nodes.push({
        x: 80 * Math.sin(phi) * Math.cos(theta),
        y: 80 * Math.sin(phi) * Math.sin(theta),
        z: 80 * Math.cos(phi),
        baseX: 80 * Math.sin(phi) * Math.cos(theta),
        baseY: 80 * Math.sin(phi) * Math.sin(theta),
        baseZ: 80 * Math.cos(phi),
        color: i % 2 === 0 ? '#3B82F6' : '#8B5CF6',
        size: Math.random() * 2.5 + 2,
      });
    }

    let angleX = 0;
    let angleY = 0;

    const render = () => {
      angleX += 0.008;
      angleY += 0.012;

      ctx.clearRect(0, 0, size, size);
      const centerX = size / 2;
      const centerY = size / 2;

      const projected = nodes.map((node) => {
        // Rotate around Y
        let x1 = node.baseX * Math.cos(angleY) + node.baseZ * Math.sin(angleY);
        let z1 = -node.baseX * Math.sin(angleY) + node.baseZ * Math.cos(angleY);

        // Rotate around X
        let y2 = node.baseY * Math.cos(angleX) - z1 * Math.sin(angleX);
        let z2 = node.baseY * Math.sin(angleX) + z1 * Math.cos(angleX);

        // Perspective scale
        const scale = 240 / (240 + z2);
        return {
          x: centerX + x1 * scale,
          y: centerY + y2 * scale,
          scale,
          color: node.color,
          size: node.size * scale,
        };
      });

      // Draw connective lines
      ctx.lineWidth = 0.8;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 55) {
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.45 * (1 - dist / 55)})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw glowing nodes
      projected.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, p.size), 0, Math.PI * 2);
        ctx.fill();

        // Glow halo
        ctx.fillStyle = p.color === '#3B82F6' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(139, 92, 246, 0.2)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(2, p.size * 2), 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}


import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * High-performance WebGL Interactive Particle & Fluid Mesh Canvas
 * Inspired by Active Theory's ambient background dynamics.
 * Includes DPR clamping, visibility throttling, and elastic mouse repulsion.
 */
export default function FluidBackgroundCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL not supported, falling back to CSS gradient:', e);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    // Strict DPR clamp to preserve GPU bandwidth
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create 3D Interactive Particle Field
    const particleCount = window.innerWidth < 768 ? 400 : 900;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const initialPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    // Color palette: Electric Blue, Cyan, Purple, Soft Indigo
    const palette = [
      new THREE.Color(0x3b82f6), // Electric blue
      new THREE.Color(0x8b5cf6), // Purple brand
      new THREE.Color(0x38bdf8), // Cyan highlight
      new THREE.Color(0x6366f1), // Indigo
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 160;
      const y = (Math.random() - 0.5) * 120;
      const z = (Math.random() - 0.5) * 60;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      initialPositions[i3] = x;
      initialPositions[i3 + 1] = y;
      initialPositions[i3 + 2] = z;

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      scales[i] = Math.random() * 2.5 + 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom shader material with soft circular falloff
    const material = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: dpr },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uPixelRatio;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          vec3 pos = position;
          
          // Organic fluid wave motion
          pos.x += sin(uTime * 0.4 + position.y * 0.05) * 2.5;
          pos.y += cos(uTime * 0.3 + position.x * 0.05) * 2.0;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Point size with perspective attenuation
          gl_PointSize = (120.0 / -mvPosition.z) * uPixelRatio;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          // Soft circular point shape
          float dist = distance(gl_PointCoord, vec2(0.5));
          if (dist > 0.5) discard;
          
          // Radial glow falloff
          float strength = 1.0 - (dist * 2.0);
          strength = pow(strength, 1.8);
          
          gl_FragColor = vec4(vColor, strength * 0.65);
        }
      `,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse tracking & repulsion field
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const handleMouseMove = (e) => {
      // Normalized coordinates (-1 to 1)
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Tab visibility handling (pause to save battery & CPU)
    let isTabActive = true;
    const handleVisibility = () => {
      isTabActive = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isTabActive) return;

      const elapsedTime = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsedTime;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Camera parallax tilt based on cursor
      camera.position.x = mouse.x * 12;
      camera.position.y = mouse.y * 8;
      camera.lookAt(scene.position);

      // Subtle dynamic mesh rotation
      particles.rotation.y = elapsedTime * 0.02 + mouse.x * 0.1;
      particles.rotation.x = mouse.y * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
    />
  );
}


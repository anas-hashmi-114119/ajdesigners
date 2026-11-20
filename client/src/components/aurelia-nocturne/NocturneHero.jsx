import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Sun,
  Moon,
  RotateCw,
  Compass,
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
} from 'lucide-react';

export default function NocturneHero({
  onOpenAllocation,
  isTritium,
  setIsTritium,
}) {
  const [powerReserve, setPowerReserve] = useState(64); // hours (0 - 72)
  const [isWinding, setIsWinding] = useState(false);
  const [crownRotation, setCrownRotation] = useState(0);
  const containerRef = useRef(null);

  // Mouse tilt calculation
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  // Interactive Virtual Crown Winding
  const handleWindCrown = () => {
    setIsWinding(true);
    setCrownRotation((prev) => prev + 45);
    setPowerReserve((prev) => Math.min(prev + 6, 72));
    setTimeout(() => setIsWinding(false), 200);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative min-h-screen pt-36 pb-24 overflow-hidden transition-colors duration-1000 ${
        isTritium ? 'bg-[#030304]' : 'bg-[#050507]'
      }`}
    >
      {/* ========================================================================= */}
      {/* AMBIENT CELESTIAL BACKGROUND & GYROSCOPIC MERIDIAN                        */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Subtle Ambient Radial Lighting */}
        <div
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[170px] transition-all duration-1000 ${
            isTritium
              ? 'w-[700px] h-[500px] bg-[#18E0B5]/10'
              : 'w-[800px] h-[550px] bg-[#C89B53]/15'
          }`}
        />

        {/* Gyroscopic Meridian Ring SVG */}
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-15 animate-spin"
          style={{ animationDuration: '160s' }}
          viewBox="0 0 1000 1000"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="500" cy="500" r="480" stroke="#C89B53" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="500" cy="500" r="390" stroke="#E8D5B5" strokeWidth="0.8" />
          <circle cx="500" cy="500" r="280" stroke="#636674" strokeWidth="1" strokeDasharray="2 6" />
          <line x1="500" y1="10" x2="500" y2="990" stroke="#C89B53" strokeWidth="0.5" />
          <line x1="10" y1="500" x2="990" y2="500" stroke="#C89B53" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[75vh]">
          {/* ========================================================================= */}
          {/* LEFT: EDITORIAL TYPOGRAPHY & PHILOSOPHY                                  */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Eyebrow Horological Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111116] border border-white/[0.08] text-[10px] font-mono tracking-widest text-[#E8D5B5] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C89B53] animate-ping" />
              <span>Caliber AN-01 • Poinçon de Genève Certified</span>
            </div>

            {/* Monumental Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.08]">
              Mastering the tension between{' '}
              <span className="italic font-normal text-[#E8D5B5]">deep space</span> and{' '}
              <span className="text-[#C89B53]">terrestrial mechanics.</span>
            </h1>

            {/* Refined Horological Prose */}
            <p className="text-sm sm:text-base text-gray-400 font-sans font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              Manufactured in Le Brassus from cold-drawn tantalum and 4.2-billion-year-old Gibeon meteorite alloy. Equipped with an inverted 60-second flying tourbillon and continuous astronomical moonphase accurate for 122 years.
            </p>

            {/* CTAs & Interactive Modes */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenAllocation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest text-black bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C89B53] hover:shadow-[0_0_30px_rgba(200,155,83,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all border border-white/30"
              >
                <span>Request Allocation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#caliber"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-widest text-gray-300 hover:text-white bg-[#111116] hover:bg-[#181820] border border-white/[0.1] hover:border-[#C89B53]/50 transition-all"
              >
                <Layers className="w-4 h-4 text-[#C89B53]" />
                <span>Exploded Caliber (AN-01)</span>
              </a>
            </div>

            {/* Day / Night Tritium Mode Toggle */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-3 text-xs font-mono">
              <span className="text-gray-400 uppercase text-[10px] tracking-wider">Atmosphere Mode:</span>
              <button
                onClick={() => setIsTritium(!isTritium)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all ${
                  isTritium
                    ? 'bg-[#18E0B5]/15 border-[#18E0B5] text-[#18E0B5] shadow-[0_0_20px_rgba(24,224,181,0.3)]'
                    : 'bg-[#111116] border-white/10 hover:border-[#C89B53]/50 text-gray-300 hover:text-white'
                }`}
              >
                {isTritium ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[#18E0B5]" />
                    <span>Midnight Tritium (Active)</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-[#C89B53]" />
                    <span>Switch to Midnight Tritium</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT: INTERACTIVE TIMEPIECE STAGE + VIRTUAL CROWN                        */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            {/* 3D Kinetic Tilt Wrapper */}
            <motion.div
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
              }}
              className="relative w-full max-w-[420px] aspect-square flex items-center justify-center transition-transform duration-200 ease-out"
            >
              {/* Radial Halo Light behind the watch */}
              <div
                className={`absolute inset-4 rounded-full filter blur-3xl transition-all duration-700 pointer-events-none ${
                  isTritium ? 'bg-[#18E0B5]/20' : 'bg-[#C89B53]/25'
                }`}
              />

              {/* Master Timepiece Presentation */}
              <div
                className={`relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] rounded-full p-2 border transition-all duration-700 flex items-center justify-center shadow-2xl ${
                  isTritium
                    ? 'border-[#18E0B5]/50 shadow-[0_0_60px_rgba(24,224,181,0.35)] bg-black'
                    : 'border-[#C89B53]/40 shadow-[0_0_60px_rgba(200,155,83,0.3)] bg-[#0A0A0F]'
                }`}
              >
                {/* Watch Case Image */}
                <img
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85"
                  alt="Aurelia Nocturne Caliber 01 Tourbillon"
                  className={`w-[90%] h-[90%] object-cover rounded-full transition-all duration-700 ${
                    isTritium
                      ? 'contrast-125 brightness-75 invert-[0.15] hue-rotate-[140deg]'
                      : 'contrast-105 brightness-95'
                  }`}
                />

                {/* Tritium Luminescent Overlay Elements (Active in Midnight Mode) */}
                {isTritium && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* Glowing Center Tourbillon Cage */}
                    <div className="w-14 h-14 rounded-full border-2 border-[#18E0B5] animate-spin shadow-[0_0_20px_#18E0B5] flex items-center justify-center" style={{ animationDuration: '6s' }}>
                      <div className="w-1 h-6 bg-[#18E0B5] shadow-[0_0_10px_#18E0B5]" />
                    </div>

                    {/* Glowing Hour Indices Ring */}
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                      <div
                        key={deg}
                        className="absolute w-1.5 h-3 bg-[#18E0B5] rounded-full shadow-[0_0_12px_#18E0B5]"
                        style={{
                          transform: `rotate(${deg}deg) translateY(-145px)`,
                        }}
                      />
                    ))}

                    {/* Luminous Hands */}
                    <div className="absolute w-1 h-28 bg-[#18E0B5] rounded-full -translate-y-12 shadow-[0_0_15px_#18E0B5] origin-bottom transform rotate-45" />
                    <div className="absolute w-1.5 h-20 bg-[#18E0B5] rounded-full -translate-y-8 shadow-[0_0_15px_#18E0B5] origin-bottom transform -rotate-60" />
                  </div>
                )}

                {/* Rotating Tourbillon Pulse Catcher */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-[#E8D5B5] tracking-widest uppercase">
                  <span>60S FLYING TOURBILLON</span>
                </div>
              </div>

              {/* Physical Interactive Winding Crown on the Right */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-4 flex flex-col items-center">
                <button
                  onClick={handleWindCrown}
                  title="Click to Wind Crown"
                  className="group relative flex flex-col items-center focus:outline-none"
                >
                  {/* Knurled Winding Crown Button */}
                  <div
                    className="w-8 h-12 rounded-r-md bg-gradient-to-r from-[#636674] to-[#C89B53] border-y border-r border-[#E8D5B5]/50 shadow-lg cursor-pointer flex items-center justify-center group-hover:brightness-110 active:scale-95 transition-all"
                    style={{
                      transform: `rotate(${crownRotation}deg)`,
                      transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <RotateCw className="w-3.5 h-3.5 text-black" />
                  </div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#C89B53] mt-2 whitespace-nowrap bg-black/80 px-2 py-0.5 rounded border border-[#C89B53]/30">
                    WIND CROWN
                  </span>
                </button>
              </div>
            </motion.div>

            {/* Power Reserve Gauge Strip */}
            <div className="mt-8 w-full max-w-md bg-[#111116] border border-white/[0.08] p-4 rounded-2xl flex items-center justify-between gap-4 shadow-xl">
              <div className="space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-[#C89B53]" />
                  <span>Mainspring Reserve</span>
                </div>
                <div className="text-sm font-display font-bold text-white">
                  {powerReserve}h <span className="text-xs text-gray-400 font-normal">/ 72h Maximum</span>
                </div>
              </div>

              {/* Visual Power Gauge Bar */}
              <div className="flex-1 max-w-[160px] h-2 bg-black rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isTritium ? 'bg-[#18E0B5]' : 'bg-gradient-to-r from-[#C89B53] to-[#E8D5B5]'
                  }`}
                  style={{ width: `${(powerReserve / 72) * 100}%` }}
                />
              </div>

              <div className="text-right">
                <span className="text-[9px] font-mono text-gray-400 uppercase block">Status</span>
                <span className="text-[11px] font-mono font-bold text-[#E8D5B5]">
                  {powerReserve > 60 ? 'OPTIMAL' : 'WINDING ADVISABLE'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* HERO BASE: TECHNICAL HOROLOGICAL TELEMETRY GRID                          */}
        {/* ========================================================================= */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6 text-center lg:text-left">
          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">
              Escapement Mechanism
            </span>
            <div className="text-lg font-serif font-light text-white mt-1">
              Flying Tourbillon (0.284g)
            </div>
            <span className="text-xs text-[#C89B53] font-mono">Titanium Grade 5 Cage</span>
          </div>

          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">
              Balance Frequency
            </span>
            <div className="text-lg font-serif font-light text-white mt-1">
              21,600 VPH (3 Hz)
            </div>
            <span className="text-xs text-[#C89B53] font-mono">Paramagnetic Silicon Hairspring</span>
          </div>

          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">
              Astronomical Moonphase
            </span>
            <div className="text-lg font-serif font-light text-white mt-1">
              122-Year Deviation Engine
            </div>
            <span className="text-xs text-[#C89B53] font-mono">Gibeon Meteorite Disc</span>
          </div>

          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">
              Annual Allocation
            </span>
            <div className="text-lg font-serif font-light text-white mt-1">
              28 / 30 Pieces Committed
            </div>
            <span className="text-xs text-[#E8D5B5] font-mono">Geneva Atelier Registry</span>
          </div>
        </div>
      </div>
    </section>
  );
}

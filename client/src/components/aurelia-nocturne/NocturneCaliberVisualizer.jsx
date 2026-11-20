import React, { useState } from 'react';
import { Layers, ShieldCheck, Compass, Eye, Sparkles, Sliders } from 'lucide-react';

const CALIBER_LAYERS = [
  {
    id: 'dial',
    title: 'Layer 01: Sapphire & Meteorite Dial Plate',
    category: 'ASTRONOMICAL FACE',
    thickness: '0.45 mm',
    components: 18,
    tolerance: '±0.002 mm',
    description:
      'Laser-cut from a 4-billion-year-old slice of the Gibeon meteorite. Etched with 24 hand-inlaid 18k white gold celestial coordinates and coated with an anti-reflective sapphire crystal layer.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'geartrain',
    title: 'Layer 02: Planetary Astronomical Gear Train',
    category: 'CHRONOMETRIC TRANSMISSION',
    thickness: '1.20 mm',
    components: 142,
    tolerance: '±0.001 mm',
    description:
      'Precision-toothed wheels cut with epicycloidal tooth profiles to maximize torque transfer from the mainspring barrel. Pivoted on 47 olive-drilled synthetic ruby bearings set in screwed gold chatons.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tourbillon',
    title: 'Layer 03: 60-Second Flying Tourbillon',
    category: 'GRAVITATIONAL COMPENSATOR',
    thickness: '3.10 mm',
    components: 72,
    tolerance: '±0.0005 mm',
    description:
      'Weighing a mere 0.284 grams, the entire titanium cage rotates once every 60 seconds to counteract positional errors caused by Earth’s gravitational pull. Equipped with a free-sprung variable-inertia balance wheel.',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'rotor',
    title: 'Layer 04: 950 Solid Platinum Micro-Rotor',
    category: 'BIDIRECTIONAL INERTIA WINDING',
    thickness: '1.65 mm',
    components: 24,
    tolerance: '±0.002 mm',
    description:
      'Heavy 950 platinum mass allows the micro-rotor to sit flush inside the movement bridge rather than on top, keeping total caliber thickness to an ultra-slim 4.95mm while providing 72 hours of autonomous power reserve.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
  },
];

export default function NocturneCaliberVisualizer() {
  const [activeLayerIndex, setActiveLayerIndex] = useState(2); // default: Tourbillon
  const [explosionDepth, setExplosionDepth] = useState(65); // 0 to 100%

  const activeLayer = CALIBER_LAYERS[activeLayerIndex];

  return (
    <section id="caliber" className="py-24 lg:py-32 bg-[#050507] relative overflow-hidden border-t border-white/[0.06]">
      {/* Background Starfield Accent */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#C89B53]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111116] border border-white/[0.08] text-[10px] font-mono tracking-widest text-[#C89B53] uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Exploded Caliber Visualizer</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
            Caliber AN-01: <span className="italic text-[#E8D5B5]">Dismantled to Micro-Tolerance.</span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed max-w-2xl mx-auto font-light">
            380 individual components engineered to sub-micron precision. Scrub the explosion depth slider to separate the stacked horological layers along the Z-axis.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE EXPLOSION STAGE & CONTROL SUITE                              */}
        {/* ========================================================================= */}
        <div className="bg-[#0E0E14] border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-10">
          {/* Depth Scrubber Control Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {CALIBER_LAYERS.map((layer, idx) => (
                <button
                  key={layer.id}
                  onClick={() => {
                    setActiveLayerIndex(idx);
                    setExplosionDepth(25 + idx * 25);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeLayerIndex === idx
                      ? 'bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C89B53] text-black font-extrabold shadow-[0_0_15px_rgba(200,155,83,0.3)]'
                      : 'bg-[#14141E] text-gray-400 hover:text-white border border-white/10'
                  }`}
                >
                  {layer.category.split(' ')[0]} (0{idx + 1})
                </button>
              ))}
            </div>

            {/* Z-Axis Depth Scrubber Slider */}
            <div className="flex items-center gap-4 w-full md:w-72">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 whitespace-nowrap">
                Z-Axis Separation:
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={explosionDepth}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setExplosionDepth(val);
                  const idx = Math.min(Math.floor(val / 25.1), 3);
                  setActiveLayerIndex(idx);
                }}
                className="w-full h-1.5 bg-[#1B1B26] rounded-lg appearance-none cursor-pointer accent-[#C89B53]"
              />
              <span className="text-xs font-mono font-bold text-[#E8D5B5] w-10 text-right">
                {explosionDepth}%
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* VISUAL EXPLODED 3D DEPTH STAGE                                           */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: 4-Layer Staggered Isometric Perspective Canvas */}
            <div className="lg:col-span-7 relative h-[360px] sm:h-[420px] rounded-2xl bg-[#070709] border border-white/[0.06] overflow-hidden flex items-center justify-center p-6">
              {/* Layers Rendered with Dynamically Calculated Z-Spacings */}
              <div className="relative w-full max-w-sm h-64 flex items-center justify-center">
                {CALIBER_LAYERS.map((layer, idx) => {
                  const isSelected = activeLayerIndex === idx;
                  const offsetMultiplier = (idx - 1.5) * (explosionDepth * 0.9);

                  return (
                    <div
                      key={layer.id}
                      onClick={() => setActiveLayerIndex(idx)}
                      className={`absolute w-44 sm:w-52 h-44 sm:h-52 rounded-full cursor-pointer transition-all duration-500 transform-gpu ${
                        isSelected
                          ? 'border-2 border-[#C89B53] shadow-[0_0_35px_rgba(200,155,83,0.4)] z-30 scale-105'
                          : 'border border-white/20 opacity-60 hover:opacity-90 z-10'
                      }`}
                      style={{
                        transform: `translateY(${offsetMultiplier}px) scale(${1 - Math.abs(idx - activeLayerIndex) * 0.08})`,
                        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
                      }}
                    >
                      <img
                        src={layer.image}
                        alt={layer.title}
                        className="w-full h-full object-cover rounded-full contrast-110 brightness-90"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* Layer Tag */}
                      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 text-[8px] font-mono text-[#E8D5B5] whitespace-nowrap border border-white/10">
                        {layer.category.split(' ')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Cue */}
              <div className="absolute bottom-3 left-4 text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                Interactive Multi-Axis Exploded View
              </div>
            </div>

            {/* Right: Active Layer Technical Specifications Matrix */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#C89B53]">
                  {activeLayer.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
                  {activeLayer.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                {activeLayer.description}
              </p>

              {/* Micro-Telemetry Specs */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#14141E] border border-white/[0.06]">
                  <span className="text-[9px] font-mono text-gray-400 uppercase block">Components</span>
                  <span className="text-base font-serif font-bold text-white">{activeLayer.components} Pcs</span>
                </div>

                <div className="p-3 rounded-xl bg-[#14141E] border border-white/[0.06]">
                  <span className="text-[9px] font-mono text-gray-400 uppercase block">Thickness</span>
                  <span className="text-base font-serif font-bold text-white">{activeLayer.thickness}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#14141E] border border-white/[0.06]">
                  <span className="text-[9px] font-mono text-gray-400 uppercase block">Tolerance</span>
                  <span className="text-base font-serif font-bold text-[#C89B53]">{activeLayer.tolerance}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

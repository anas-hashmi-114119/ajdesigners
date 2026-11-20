import React, { useState } from 'react';
import { Sparkles, Moon, Compass, Layers, CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react';

const ALCHEMY_MATERIALS = [
  {
    id: 'meteorite',
    name: 'Gibeon Meteorite (Octahedrite)',
    subtitle: '4.2 Billion Years in Interstellar Void',
    description:
      'Harvested from ancient fragments that fell in prehistoric Namibia. When sliced with precision wire-EDM and etched in nitric acid, the characteristic Widmanstätten iron-nickel crystal patterns emerge—a metallurgical structure that cannot be replicated on Earth.',
    specs: ['Origin: Gibeon, Great Namaqualand', 'Composition: 91.8% Fe, 7.7% Ni, 0.5% Co', 'Etching: Sub-zero nitric acid bath', 'Application: Hand-turned dial plate'],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tantalum',
    name: 'Cold-Drawn Pure Tantalum Case',
    subtitle: 'Ultra-Dense Metallic Armor (16.65 g/cm³)',
    description:
      'With a melting point exceeding 3,017°C, tantalum is notoriously difficult to machine. Aurelia Nocturne cold-forges each 41.5mm case using specialized diamond tooling. The resulting alloy exhibits an ethereal, brooding slate-blue sheen that self-heals micro-scratches.',
    specs: ['Melting Point: 3,017°C', 'Density: 16.65 g/cm³ (Heavier than 18k Gold)', 'Corrosion: Impervious to seawater & acids', 'Finish: Satin-brushed with mirror-bevelled lugs'],
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'silicon',
    name: 'Diamond-Coated Silicon (Silicium DLC)',
    subtitle: 'Zero Lubrication • 15,000 Gauss Antimagnetic',
    description:
      'The balance spring, pallet fork, and escape wheel are deep-reactive-ion etched from single-crystal silicon, then vapor-coated in synthetic polycrystalline diamond. Friction is reduced by 85%, eliminating the need for oil and preserving chronometer accuracy indefinitely.',
    specs: ['Friction Coefficient: 0.04 (Dry)', 'Magnetic Resistance: > 15,000 Gauss', 'Weight: 60% lighter than Glucydur', 'Thermal Drift: Temperature-compensating oxide layer'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
  },
];

export default function NocturneExhibition() {
  const [activeMaterial, setActiveMaterial] = useState('meteorite');
  const [lunarDay, setLunarDay] = useState(14.7); // 0 to 29.5 days

  // Lunar Phase Label based on slider
  const getLunarPhaseInfo = (day) => {
    if (day < 2) return { name: 'New Moon (Syzygy)', illumination: '0%', icon: '🌑' };
    if (day < 7) return { name: 'Waxing Crescent', illumination: '25%', icon: '🌒' };
    if (day < 9) return { name: 'First Quarter (Quadrature)', illumination: '50%', icon: '🌓' };
    if (day < 14) return { name: 'Waxing Gibbous', illumination: '80%', icon: '🌔' };
    if (day <= 16) return { name: 'Full Moon (Maximum Lux)', illumination: '100%', icon: '🌕' };
    if (day < 22) return { name: 'Waning Gibbous', illumination: '75%', icon: '🌖' };
    if (day < 24) return { name: 'Third Quarter (Quadrature)', illumination: '50%', icon: '🌗' };
    return { name: 'Waning Crescent', illumination: '15%', icon: '🌘' };
  };

  const currentPhase = getLunarPhaseInfo(lunarDay);
  const activeMatData = ALCHEMY_MATERIALS.find((m) => m.id === activeMaterial) || ALCHEMY_MATERIALS[0];

  return (
    <section id="exhibition" className="py-24 lg:py-32 bg-[#050507] relative overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-28">
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111116] border border-white/[0.08] text-[10px] font-mono tracking-widest text-[#C89B53] uppercase">
            <Sparkles className="w-3 h-3" />
            <span>The Three-Act Mechanical Exhibition</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
            Where Celestial Physics Meets <br className="hidden sm:inline" />
            <span className="italic text-[#E8D5B5]">Hand-Chamfered Mastery.</span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed max-w-2xl mx-auto font-light">
            Each timepiece takes 18 months of chronometric calibration and 420 hours of manual hand-anglage before leaving our Le Brassus atelier.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* ACT I: THE CRUCIBLE (MATERIAL ALCHEMY)                                   */}
        {/* ========================================================================= */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C89B53]">
                ACT I • THE CRUCIBLE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-white mt-1">
                Material Alchemy & Rare Alloys
              </h3>
            </div>

            {/* Material Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {ALCHEMY_MATERIALS.map((mat) => (
                <button
                  key={mat.id}
                  onClick={() => setActiveMaterial(mat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeMaterial === mat.id
                      ? 'bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C89B53] text-black font-extrabold shadow-[0_0_20px_rgba(200,155,83,0.3)]'
                      : 'bg-[#111116] text-gray-400 hover:text-white border border-white/10'
                  }`}
                >
                  {mat.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Material Showcase Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0E0E14] border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-2xl">
            {/* Left: Material Info */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#C89B53]">
                  {activeMatData.subtitle}
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
                  {activeMatData.name}
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                {activeMatData.description}
              </p>

              {/* Technical Specifications Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {activeMatData.specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#161620] border border-white/[0.06] flex items-center gap-2 text-xs text-gray-300 font-mono"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C89B53] shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Macro Metallurgical Photography */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-black">
                <img
                  src={activeMatData.image}
                  alt={activeMatData.name}
                  className="w-full h-full object-cover brightness-95 contrast-110 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E14] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-white tracking-widest uppercase">
                  <span>ATELIER MACRO METALLURGY (10X)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT II: THE COMPLICATION (INTERACTIVE MOONPHASE CALIBRATOR)               */}
        {/* ========================================================================= */}
        <div className="space-y-10">
          <div className="border-b border-white/[0.08] pb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C89B53]">
              ACT II • THE COMPLICATION
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-white mt-1">
              Astronomical Continuous Moonphase (122-Year Calibrator)
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 font-light max-w-2xl">
              Traditional timepieces accumulate a 1-day lunar error every 2.5 years. Caliber AN-01 integrates a 135-tooth planetary wheel driving the Gibeon meteorite moon disc, requiring manual adjustment only once every 122 years and 45 days.
            </p>
          </div>

          <div className="bg-[#0E0E14] border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: Interactive Celestial Dial Visualizer */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-[#050507] rounded-2xl border border-white/[0.06] text-center">
                {/* Visual Celestial Moon Disc */}
                <div className="relative w-44 h-44 rounded-full border-2 border-[#C89B53]/50 flex items-center justify-center shadow-[0_0_40px_rgba(200,155,83,0.2)] bg-black overflow-hidden mb-6">
                  {/* Moon Disc Face */}
                  <div className="text-6xl filter drop-shadow-[0_0_20px_rgba(232,213,181,0.6)]">
                    {currentPhase.icon}
                  </div>
                  {/* Celestial Golden Stars overlay */}
                  <div className="absolute top-4 left-6 w-1 h-1 rounded-full bg-[#E8D5B5] shadow-[0_0_6px_#E8D5B5]" />
                  <div className="absolute bottom-6 right-8 w-1 h-1 rounded-full bg-[#C89B53] shadow-[0_0_6px_#C89B53]" />
                  <div className="absolute top-10 right-10 w-0.5 h-0.5 rounded-full bg-white" />
                </div>

                <div className="text-xl font-serif text-white">{currentPhase.name}</div>
                <div className="text-xs font-mono text-[#C89B53] mt-1">
                  Illumination: {currentPhase.illumination} • Day {lunarDay.toFixed(1)} of 29.53
                </div>
              </div>

              {/* Right: Synodic Month Progress Scrubber & Gear Ratio Telemetry */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-gray-300">
                    <span className="uppercase tracking-wider">Synodic Month Scrubber:</span>
                    <span className="text-[#E8D5B5] font-bold">Day {lunarDay.toFixed(1)} / 29.53</span>
                  </div>

                  {/* Scrubber Range Input */}
                  <input
                    type="range"
                    min="0"
                    max="29.5"
                    step="0.1"
                    value={lunarDay}
                    onChange={(e) => setLunarDay(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#1B1B26] rounded-lg appearance-none cursor-pointer accent-[#C89B53]"
                  />

                  <div className="flex justify-between text-[10px] font-mono text-gray-500 pt-1">
                    <span>Day 0 (New)</span>
                    <span>Day 7 (1st Qtr)</span>
                    <span>Day 14.7 (Full)</span>
                    <span>Day 22 (3rd Qtr)</span>
                    <span>Day 29.5</span>
                  </div>
                </div>

                {/* Complication Telemetry Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#14141E] border border-white/[0.06]">
                    <span className="text-[10px] font-mono text-gray-400 uppercase block">Drive Wheel</span>
                    <span className="text-sm font-serif font-bold text-white">135 Teeth</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#14141E] border border-white/[0.06]">
                    <span className="text-[10px] font-mono text-gray-400 uppercase block">Synodic Error</span>
                    <span className="text-sm font-serif font-bold text-white">1d / 122.1 Years</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#14141E] border border-white/[0.06] col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-mono text-gray-400 uppercase block">Material Disc</span>
                    <span className="text-sm font-serif font-bold text-[#C89B53]">Gibeon Meteorite</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT III: THE FINISSAGE (420 HOURS HAND-ANGLAGE)                           */}
        {/* ========================================================================= */}
        <div className="space-y-10">
          <div className="border-b border-white/[0.08] pb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C89B53]">
              ACT III • THE FINISSAGE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-white mt-1">
              420 Hours of Haute Horlogerie Hand-Finissage
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0E0E14] border border-white/[0.08] space-y-3">
              <div className="text-xs font-mono text-[#C89B53] uppercase font-bold">01 • Hand-Bevelled Anglage</div>
              <h4 className="font-serif text-xl text-white">45° Inward & Outward Angles</h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Using boxwood pegs and diamond paste, our artisans hand-contour the bridges to a flawless mirror bevel without rounded corners.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E0E14] border border-white/[0.08] space-y-3">
              <div className="text-xs font-mono text-[#C89B53] uppercase font-bold">02 • Black Polish (Poli Noir)</div>
              <h4 className="font-serif text-xl text-white">Total Specular Reflection</h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Flat steel surfaces polished on a zinc plate with micro-diamantine until light reflects either blinding white or absolute void-black.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E0E14] border border-white/[0.08] space-y-3">
              <div className="text-xs font-mono text-[#C89B53] uppercase font-bold">03 • Côtes de Genève Rayonnantes</div>
              <h4 className="font-serif text-xl text-white">Radial Stellar Wave Patterns</h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Classic Geneva waves radiating outwards from the center of the tourbillon cage like gravitational lightwaves across deep space.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useMemo } from 'react';
import {
  Calculator,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Target,
  DollarSign,
} from 'lucide-react';

const PLATFORMS = [
  { id: 'meta', name: 'Meta (FB & IG)', roasMultiplier: 3.6, cpaDrop: 52 },
  { id: 'tiktok', name: 'TikTok Ads', roasMultiplier: 3.9, cpaDrop: 64 },
  { id: 'google', name: 'Google & YouTube', roasMultiplier: 3.2, cpaDrop: 44 },
  { id: 'omnichannel', name: 'Omnichannel (All 3)', roasMultiplier: 4.2, cpaDrop: 68 },
];

export default function InteractiveRoiCalculator() {
  const [adSpend, setAdSpend] = useState(7500);
  const [selectedPlatform, setSelectedPlatform] = useState('omnichannel');

  const currentPlatform = PLATFORMS.find((p) => p.id === selectedPlatform) || PLATFORMS[3];

  const calculations = useMemo(() => {
    const projectedRevenue = Math.round(adSpend * currentPlatform.roasMultiplier);
    const netGrowth = projectedRevenue - adSpend;
    const assetsRecommended = Math.max(12, Math.round(adSpend / 300));
    const savedAdWaste = Math.round(adSpend * (currentPlatform.cpaDrop / 100) * 0.45);

    return {
      revenue: projectedRevenue.toLocaleString(),
      netProfit: netGrowth.toLocaleString(),
      assets: assetsRecommended,
      adWasteSaved: savedAdWaste.toLocaleString(),
      roas: currentPlatform.roasMultiplier.toFixed(1),
      cpaReduction: currentPlatform.cpaDrop,
    };
  }, [adSpend, currentPlatform]);

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="rounded-3xl bg-gradient-to-b from-[#111116] to-[#0c0c10] border border-white/[0.08] p-6 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden">
        {/* Ambient Radial Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-electric-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-brand/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>Algorithmic Profit Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Calculate Your Growth Engine ROI.
          </h2>
          <p className="mt-3 text-base text-gray-400">
            Estimate your projected revenue, ad waste eliminated, and ROAS lift by switching to high-velocity AI creative sprints.
          </p>
        </div>

        {/* 2-Column Calculator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Controls Column (Left) */}
          <div className="lg:col-span-7 space-y-8 bg-[#16161f]/70 border border-white/[0.06] p-6 sm:p-8 rounded-2xl">
            {/* 1. Monthly Ad Spend Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="ad-spend-range" className="text-sm font-semibold text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-electric-400" />
                  <span>Current Monthly Ad Spend:</span>
                </label>
                <span className="text-2xl font-display font-extrabold text-white font-mono bg-white/[0.06] px-4 py-1.5 rounded-xl border border-white/10 shadow-inner">
                  ${adSpend.toLocaleString()}
                  <span className="text-xs text-gray-400 font-normal">/mo</span>
                </span>
              </div>

              <input
                id="ad-spend-range"
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full h-2.5 bg-black/60 rounded-lg appearance-none cursor-pointer accent-electric-400 focus:outline-none"
              />

              <div className="flex justify-between text-[11px] font-mono text-gray-500 mt-2">
                <span>$1,000/mo</span>
                <span>$15,000/mo</span>
                <span>$30,000/mo</span>
                <span>$50,000+/mo</span>
              </div>
            </div>

            {/* 2. Platform Selection Buttons */}
            <div>
              <label className="text-sm font-semibold text-white block mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-soft" />
                <span>Primary Advertising Target:</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {PLATFORMS.map((platform) => {
                  const isSelected = selectedPlatform === platform.id;
                  return (
                    <button
                      key={platform.id}
                      onClick={() => setSelectedPlatform(platform.id)}
                      className={`p-3 rounded-xl border text-center transition-all duration-200 ${
                        isSelected
                          ? 'bg-gradient-to-r from-electric-500/20 to-purple-brand/20 border-electric-400 text-white shadow-glow-blue'
                          : 'bg-black/30 border-white/[0.06] text-gray-400 hover:text-gray-200 hover:border-white/10'
                      }`}
                    >
                      <div className="text-xs font-bold truncate">{platform.name}</div>
                      <div className="text-[10px] font-mono text-emerald-400 mt-1">
                        ~{platform.roasMultiplier}x ROAS
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Micro Benchmark Strip */}
            <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400 font-mono">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-electric-400" />
                <span>Benchmarked against 180+ international client accounts</span>
              </span>
              <span className="text-electric-400 font-semibold">90-Day Forecast</span>
            </div>
          </div>

          {/* Results Display Column (Right) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#181822] to-[#121218] border border-white/[0.12] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
            {/* Top Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
                Projected Growth Yield
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{calculations.roas}x ROAS Target</span>
              </span>
            </div>

            {/* Projected Revenue Big Number */}
            <div>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                Estimated Monthly Revenue:
              </span>
              <div className="text-4xl sm:text-5xl font-display font-extrabold text-white mt-1 tracking-tight">
                ${calculations.revenue}
                <span className="text-sm font-normal text-gray-400 font-mono">/mo</span>
              </div>
              <div className="text-xs font-mono text-emerald-400 mt-1 flex items-center gap-1">
                <span>+${calculations.netProfit}/mo net top-line expansion</span>
              </div>
            </div>

            {/* 2-Grid Secondary Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase text-gray-400 block">
                  CPA Reduction
                </span>
                <span className="text-lg font-bold text-white font-mono mt-0.5 block">
                  -{calculations.cpaReduction}%
                </span>
                <span className="text-[10px] text-gray-500">Lower CAC per lead</span>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase text-gray-400 block">
                  Creative Volume
                </span>
                <span className="text-lg font-bold text-white font-mono mt-0.5 block">
                  {calculations.assets} Assets
                </span>
                <span className="text-[10px] text-gray-500">To defeat fatigue</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 border-t border-white/[0.08]">
              <a
                href="#booking-calendar"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-electric-500 via-purple-brand to-cyan-400 text-white font-bold text-sm shadow-glow-blue hover:scale-[1.02] transition-all"
              >
                <span>Lock In This Growth Model</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-[10px] text-gray-500 text-center mt-2.5 font-mono">
                100% Free Strategy Session • 1-on-1 with Yashwa or Aroosa
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

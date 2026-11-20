import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, CheckCircle2, ShieldCheck, X, Eye } from 'lucide-react';

const COLLECTION_PIECES = [
  {
    id: 'ref-01',
    refCode: 'REF. 01 / AN-TR01',
    title: 'Nocturne Tourbillon 01',
    complicationType: 'Sidereal Celestial Tourbillon',
    price: '$185,000 CHF',
    allocationTotal: 30,
    allocationCurrent: 24,
    caseMaterial: 'Cold-Drawn Pure Tantalum & Titanium',
    caseDiameter: '41.5 mm',
    caseThickness: '9.80 mm',
    dialDescription: 'Genuine Gibeon meteorite core slice with hand-guilloché celestial meridian.',
    caliber: 'Manufacture Caliber AN-01 (Manual Wind)',
    powerReserve: '72 Hours Autonomous',
    waterResistance: '30 Meters (3 ATM)',
    certifications: ['Poinçon de Genève (Geneva Seal)', 'COSC Chronometer Certified'],
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'ref-02',
    refCode: 'REF. 02 / AN-QP02',
    title: 'Sideralis Perpetual Moon',
    complicationType: 'Continuous Astronomical Moonphase',
    price: '$142,000 CHF',
    allocationTotal: 50,
    allocationCurrent: 41,
    caseMaterial: '18k Frosted White Gold & Meteorite',
    caseDiameter: '40.0 mm',
    caseThickness: '10.20 mm',
    dialDescription: 'Deep space Aventurine glass with laser-engraved golden stellar constellations.',
    caliber: 'Manufacture Caliber AN-02 (Micro-Rotor Automatic)',
    powerReserve: '68 Hours Autonomous',
    waterResistance: '50 Meters (5 ATM)',
    certifications: ['Poinçon de Genève (Geneva Seal)', 'Chronometric Astronomical Bulletin'],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'ref-03',
    refCode: 'REF. 03 / AN-CH03',
    title: 'Chrono-Crucible Monopusher',
    complicationType: 'High-Frequency Column-Wheel Chronograph',
    price: '$98,000 CHF',
    allocationTotal: 40,
    allocationCurrent: 36,
    caseMaterial: 'Micro-Blasted Grade 5 Titanium & Ceramic',
    caseDiameter: '42.0 mm',
    caseThickness: '11.10 mm',
    dialDescription: 'Smoked transparent sapphire crystal revealing the column-wheel lateral clutch.',
    caliber: 'Manufacture Caliber AN-03 (36,000 VPH / 5 Hz)',
    powerReserve: '55 Hours Autonomous',
    waterResistance: '100 Meters (10 ATM)',
    certifications: ['Besançon Observatory Chronometer Certified'],
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=85',
  },
];

export default function NocturneCollection({ onSelectPieceForAllocation }) {
  const [selectedPiece, setSelectedPiece] = useState(null);

  return (
    <section id="collection" className="py-24 lg:py-32 bg-[#050507] relative overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111116] border border-white/[0.08] text-[10px] font-mono tracking-widest text-[#C89B53] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Current Allocation Cycle (2026/2027)</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
              The Curated Masterpieces
            </h2>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-[#E8D5B5] uppercase block">Global Annual Cap</span>
            <span className="text-sm font-serif text-gray-400">Strictly 120 Numbered Horological Allocations</span>
          </div>
        </div>

        {/* 3-Card Masterpiece Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COLLECTION_PIECES.map((piece) => {
            const allocationPct = (piece.allocationCurrent / piece.allocationTotal) * 100;

            return (
              <div
                key={piece.id}
                className="group relative rounded-3xl bg-[#0E0E14] border border-white/[0.08] hover:border-[#C89B53]/50 transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-2xl hover:shadow-[0_0_40px_rgba(200,155,83,0.2)]"
              >
                {/* Watch Photography Stage */}
                <div className="relative h-72 w-full overflow-hidden bg-black flex items-center justify-center p-6">
                  <img
                    src={piece.image}
                    alt={piece.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E14] via-transparent to-transparent opacity-80" />

                  {/* Ref Code Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-widest text-[#E8D5B5] uppercase">
                    {piece.refCode}
                  </div>

                  {/* Price Tag */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#111116] border border-[#C89B53]/30 text-xs font-serif font-bold text-white shadow-md">
                    {piece.price}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#C89B53] font-semibold">
                      {piece.complicationType}
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-white mt-1 group-hover:text-[#E8D5B5] transition-colors">
                      {piece.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-light mt-2 line-clamp-2 leading-relaxed">
                      {piece.dialDescription}
                    </p>
                  </div>

                  {/* Allocation Status Indicator */}
                  <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
                    <div className="flex justify-between text-[10px] font-mono text-gray-400">
                      <span>ALLOCATION STATUS</span>
                      <span className="text-[#E8D5B5] font-bold">
                        {piece.allocationCurrent} / {piece.allocationTotal} COMMITTED
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#1B1B26] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#C89B53] to-[#E8D5B5] rounded-full"
                        style={{ width: `${allocationPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setSelectedPiece(piece)}
                      className="flex-1 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider text-gray-200 bg-[#161622] hover:bg-[#1E1E2C] border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C89B53]" />
                      <span>Caliber Dossier</span>
                    </button>

                    <button
                      onClick={() => onSelectPieceForAllocation(piece.title)}
                      className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#FFF1D2] to-[#C89B53] hover:shadow-glow-gold transition-all flex items-center justify-center gap-1 shrink-0"
                    >
                      <span>Acquire</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CALIBER SPECIFICATION DOSSIER MODAL                                      */}
      {/* ========================================================================= */}
      {selectedPiece && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0E0E14] border border-[#C89B53]/40 p-6 sm:p-8 shadow-[0_0_60px_rgba(200,155,83,0.3)] space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPiece(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.08] hover:bg-[#C89B53]/20 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C89B53]">
                {selectedPiece.refCode} • TECHNICAL DOSSIER
              </span>
              <h3 className="font-serif text-3xl font-normal text-white mt-1">
                {selectedPiece.title}
              </h3>
              <p className="text-xs text-gray-300 font-light mt-1">
                {selectedPiece.complicationType} • {selectedPiece.price}
              </p>
            </div>

            {/* Specifications Matrix */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#14141E] border border-white/[0.06]">
                <span className="text-[9px] text-gray-400 block uppercase">Case Architecture</span>
                <span className="text-white font-medium">{selectedPiece.caseMaterial}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#14141E] border border-white/[0.06]">
                <span className="text-[9px] text-gray-400 block uppercase">Dimensions</span>
                <span className="text-white font-medium">{selectedPiece.caseDiameter} • {selectedPiece.caseThickness}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#14141E] border border-white/[0.06]">
                <span className="text-[9px] text-gray-400 block uppercase">Caliber Movement</span>
                <span className="text-white font-medium">{selectedPiece.caliber}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#14141E] border border-white/[0.06]">
                <span className="text-[9px] text-gray-400 block uppercase">Autonomous Reserve</span>
                <span className="text-white font-medium">{selectedPiece.powerReserve}</span>
              </div>
            </div>

            {/* Certifications */}
            <div className="p-4 rounded-xl bg-[#14141E] border border-white/[0.06] space-y-2">
              <span className="text-[10px] font-mono text-[#C89B53] uppercase tracking-wider block font-bold">
                Hallmarks & Certifications
              </span>
              {selectedPiece.certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-gray-300 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C89B53]" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>

            {/* Action inside modal */}
            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setSelectedPiece(null)}
                className="px-5 py-2.5 rounded-full text-xs font-mono uppercase text-gray-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const title = selectedPiece.title;
                  setSelectedPiece(null);
                  onSelectPieceForAllocation(title);
                }}
                className="px-6 py-2.5 rounded-full text-xs font-mono font-bold uppercase text-black bg-gradient-to-r from-[#FFF1D2] to-[#C89B53] shadow-glow-gold"
              >
                Request Allocation for {selectedPiece.refCode.split(' ')[0]}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function NocturneFooter({ onOpenAllocation }) {
  return (
    <footer className="bg-[#030304] border-t border-white/[0.08] text-gray-400 font-sans relative overflow-hidden">
      {/* Agency Portfolio Showcase Top Banner */}
      <div className="bg-[#07070B] border-b border-[#C89B53]/25 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#E8D5B5]">
            <span className="w-2 h-2 rounded-full bg-[#C89B53] animate-pulse" />
            <span className="font-bold">AJDESIGNERS FLAGSHIP CASE STUDY</span>
            <span className="text-white/20">•</span>
            <span className="text-gray-400 font-normal">Aurelia Nocturne: Ultra-Luxury Horology Concept</span>
          </div>

          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#111116] border border-white/10 hover:border-[#C89B53]/50 text-white hover:text-[#C89B53] transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Agency Portfolio</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full border border-[#C89B53] flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-[#E8D5B5]" />
              </span>
              <span className="font-serif text-2xl font-light tracking-[0.2em] text-[#E8D5B5]">
                AURELIA NOCTURNE
              </span>
            </div>
            <span className="text-[9px] font-mono tracking-[0.35em] text-[#C89B53] uppercase block">
              MANUFACTURE D'HORLOGERIE CELESTE • LE BRASSUS
            </span>

            <p className="text-xs text-gray-400 font-light max-w-sm leading-relaxed pt-2">
              Architecting astronomical complications and tourbillons from meteoric iron and cold-forged tantalum. Strictly 120 commissions handcrafted annually for international collectors.
            </p>

            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-[#E8D5B5]">
              <ShieldCheck className="w-4 h-4 text-[#C89B53]" />
              <span>Certified Poinçon de Genève (Geneva Seal)</span>
            </div>
          </div>

          {/* Salons Col */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E8D5B5] font-bold block">
              Private Commission Salons
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono text-gray-400">
              <div>
                <span className="text-white block font-medium">GENEVA</span>
                <span className="text-[11px]">18 Rue du Rhône</span>
              </div>
              <div>
                <span className="text-white block font-medium">LONDON</span>
                <span className="text-[11px]">42 New Bond Street</span>
              </div>
              <div>
                <span className="text-white block font-medium">DUBAI</span>
                <span className="text-[11px]">DIFC Gate Precinct 4</span>
              </div>
              <div>
                <span className="text-white block font-medium">ZURICH</span>
                <span className="text-[11px]">Bahnhofstrasse 22</span>
              </div>
            </div>
          </div>

          {/* Navigation / Actions Col */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E8D5B5] font-bold block">
              Atelier Exploration
            </span>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  Current Masterpiece Collection
                </a>
              </li>
              <li>
                <a href="#exhibition" className="hover:text-white transition-colors">
                  The Crucible: Gibeon Meteorite
                </a>
              </li>
              <li>
                <a href="#caliber" className="hover:text-white transition-colors">
                  Caliber AN-01 Exploded Movement
                </a>
              </li>
              <li>
                <a href="#atelier" className="hover:text-white transition-colors">
                  Geneva Provenance Serial Verifier
                </a>
              </li>
            </ul>

            <button
              onClick={onOpenAllocation}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#FFF1D2] to-[#C89B53] shadow-glow-gold hover:scale-[1.02] transition-all"
            >
              <span>Request Allocation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-gray-500">
          <div>
            © {new Date().getFullYear()} Aurelia Nocturne Haute Horlogerie SA. All international rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Valuation Confidentiality</span>
            <span>•</span>
            <span>Swiss Banking Escrow Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

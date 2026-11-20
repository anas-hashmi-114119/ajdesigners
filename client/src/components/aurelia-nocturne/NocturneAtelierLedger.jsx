import React, { useState } from 'react';
import { ShieldCheck, Compass, CheckCircle2, Search, Sparkles, AlertCircle, Award } from 'lucide-react';

const VALID_SERIALS = {
  'AN-2026-0012': {
    piece: 'Nocturne Tourbillon 01 (Piece 12/30)',
    horologist: 'Master Jean-Luc Veyrat',
    date: '14 October 2026',
    hallmark: 'Poinçon de Genève (#PG-88219-CH)',
    chronometry: '+0.4 sec / 24h (Besançon Certified)',
    vaultStatus: 'Allocated • Secured in Le Brassus Atelier Vault',
    owner: 'Private Collector (Zurich, Switzerland)',
  },
  'AN-2026-0042': {
    piece: 'Sideralis Perpetual Moon (Piece 42/50)',
    horologist: 'Master Philippe Aubert',
    date: '02 November 2026',
    hallmark: 'Poinçon de Genève (#PG-90144-CH)',
    chronometry: '+0.6 sec / 24h (Besançon Certified)',
    vaultStatus: 'Allocated • London Mayfair Salon Transit',
    owner: 'Family Office (Mayfair, United Kingdom)',
  },
};

export default function NocturneAtelierLedger() {
  const [serialQuery, setSerialQuery] = useState('AN-2026-0012');
  const [verifying, setVerifying] = useState(false);
  const [verifiedRecord, setVerifiedRecord] = useState(VALID_SERIALS['AN-2026-0012']);
  const [errorMsg, setErrorMsg] = useState('');

  const handleVerify = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setVerifying(true);

    setTimeout(() => {
      setVerifying(false);
      const cleanQuery = serialQuery.trim().toUpperCase();
      if (VALID_SERIALS[cleanQuery]) {
        setVerifiedRecord(VALID_SERIALS[cleanQuery]);
        setErrorMsg('');
      } else {
        setVerifiedRecord(null);
        setErrorMsg(`Serial "${cleanQuery}" is unallocated or unrecognized in the Geneva Ledger. Please verify formatting (e.g., AN-2026-0012).`);
      }
    }, 450);
  };

  return (
    <section id="atelier" className="py-24 lg:py-32 bg-[#050507] relative overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111116] border border-white/[0.08] text-[10px] font-mono tracking-widest text-[#C89B53] uppercase">
            <Compass className="w-3.5 h-3.5" />
            <span>Vallée de Joux Atelier & Provenance</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
            Cryptographic Vault & <br className="hidden sm:inline" />
            <span className="italic text-[#E8D5B5]">Geneva Provenance Ledger.</span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed max-w-2xl mx-auto font-light">
            Every Aurelia Nocturne caliber is permanently logged into our cryptographic provenance registry. Verify any allocated serial number directly against our Le Brassus bench archives.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE VERIFICATION STAGE                                           */}
        {/* ========================================================================= */}
        <div className="max-w-4xl mx-auto bg-[#0E0E14] border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          {/* Input & Search Form */}
          <form onSubmit={handleVerify} className="space-y-4">
            <label className="block text-xs font-mono uppercase tracking-widest text-gray-300 font-bold">
              Enter Caliber Serial Number
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={serialQuery}
                  onChange={(e) => setSerialQuery(e.target.value)}
                  placeholder="e.g. AN-2026-0012"
                  className="w-full px-5 py-3.5 rounded-2xl bg-[#070709] border border-white/10 focus:border-[#C89B53] text-sm font-mono text-white placeholder-gray-600 focus:outline-none transition-colors"
                />
                <Search className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2" />
              </div>

              <button
                type="submit"
                disabled={verifying}
                className="px-7 py-3.5 rounded-2xl text-xs font-mono font-bold uppercase tracking-widest text-black bg-gradient-to-r from-[#FFF1D2] to-[#C89B53] hover:shadow-glow-gold transition-all shrink-0"
              >
                {verifying ? 'Authenticating...' : 'Verify Provenance'}
              </button>
            </div>

            {/* Quick Demo Pre-fills */}
            <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-gray-400">
              <span>Sample Verified Serials:</span>
              <button
                type="button"
                onClick={() => {
                  setSerialQuery('AN-2026-0012');
                  setVerifiedRecord(VALID_SERIALS['AN-2026-0012']);
                  setErrorMsg('');
                }}
                className="text-[#C89B53] hover:underline hover:text-[#E8D5B5]"
              >
                AN-2026-0012
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  setSerialQuery('AN-2026-0042');
                  setVerifiedRecord(VALID_SERIALS['AN-2026-0042']);
                  setErrorMsg('');
                }}
                className="text-[#C89B53] hover:underline hover:text-[#E8D5B5]"
              >
                AN-2026-0042
              </button>
            </div>
          </form>

          {/* ========================================================================= */}
          {/* VERIFIED LEDGER RECORD RESULT                                             */}
          {/* ========================================================================= */}
          {verifiedRecord && (
            <div className="p-6 rounded-2xl bg-[#08080C] border border-[#C89B53]/40 shadow-xl space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2 text-sm font-mono text-[#E8D5B5] font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#C89B53]" />
                  <span>AUTHENTICATED LE BRASSUS RECORD</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18E0B5]/15 border border-[#18E0B5]/30 text-[10px] font-mono text-[#18E0B5]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#18E0B5] animate-ping" />
                  <span>GENUINE ALLOCATION</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-[#111116] border border-white/[0.05]">
                  <span className="text-[9px] text-gray-500 uppercase block">Horological Reference</span>
                  <span className="text-white font-medium text-sm mt-0.5 block">{verifiedRecord.piece}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#111116] border border-white/[0.05]">
                  <span className="text-[9px] text-gray-500 uppercase block">Certified Master Horologist</span>
                  <span className="text-[#E8D5B5] font-medium text-sm mt-0.5 block">{verifiedRecord.horologist}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#111116] border border-white/[0.05]">
                  <span className="text-[9px] text-gray-500 uppercase block">Poinçon de Genève Seal</span>
                  <span className="text-white font-medium text-xs mt-0.5 block">{verifiedRecord.hallmark}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#111116] border border-white/[0.05]">
                  <span className="text-[9px] text-gray-500 uppercase block">Daily Chronometric Rate</span>
                  <span className="text-[#C89B53] font-medium text-xs mt-0.5 block">{verifiedRecord.chronometry}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#111116] border border-white/[0.05] sm:col-span-2">
                  <span className="text-[9px] text-gray-500 uppercase block">Global Custody Status</span>
                  <span className="text-gray-300 font-medium text-xs mt-0.5 block">{verifiedRecord.vaultStatus}</span>
                </div>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 text-xs text-red-300 font-mono flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

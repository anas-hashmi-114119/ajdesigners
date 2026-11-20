import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, Sparkles, Send, Lock, Calendar } from 'lucide-react';

export default function NocturneAllocationModal({ isOpen, onClose, preselectedPiece }) {
  const [formData, setFormData] = useState({
    fullName: '',
    familyOffice: '',
    contactChannel: 'whatsapp',
    contactValue: '',
    selectedPiece: preselectedPiece || 'Nocturne Tourbillon 01 ($185,000 CHF)',
    handoverSalon: 'geneva',
    bespokeNotes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dossierNumber, setDossierNumber] = useState('');

  useEffect(() => {
    if (preselectedPiece) {
      setFormData((prev) => ({ ...prev, selectedPiece: preselectedPiece }));
    }
  }, [preselectedPiece]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full legal or collector name is required.';
    if (!formData.contactValue.trim()) errs.contactValue = 'Direct contact identifier is required.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setDossierNumber(`AN-DOSSIER-${Math.floor(1000 + Math.random() * 9000)}`);
      setIsSuccess(true);
    }, 700);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0E0E14] border border-[#C89B53]/40 p-6 sm:p-10 shadow-[0_0_80px_rgba(200,155,83,0.35)] my-auto">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.08] hover:bg-[#C89B53]/20 text-gray-400 hover:text-white flex items-center justify-center transition-colors focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          /* ========================================================================= */
          /* SUCCESS CERTIFICATE SCREEN                                               */
          /* ========================================================================= */
          <div className="text-center space-y-6 py-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-[#18E0B5]/10 border border-[#18E0B5]/30 text-[#18E0B5] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(24,224,181,0.25)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C89B53]">
                CONFIDENTIAL ALLOCATION CERTIFICATE
              </span>
              <h3 className="font-serif text-3xl font-normal text-white mt-1">
                Dossier Initialized: {dossierNumber}
              </h3>
              <p className="text-xs text-gray-300 font-light max-w-md mx-auto mt-2 leading-relaxed">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. Your private application for the{' '}
                <span className="text-[#E8D5B5] font-serif font-bold">{formData.selectedPiece}</span> has been lodged in our Le Brassus registry.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#08080C] border border-white/[0.08] max-w-md mx-auto text-left text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">ASSIGNED CONCIERGE:</span>
                <span className="text-[#E8D5B5] font-bold">Hélène De Rham (Geneva)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">PREFERRED SALON:</span>
                <span className="text-white capitalize">{formData.handoverSalon}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">PROTOCOL:</span>
                <span className="text-[#18E0B5]">Encrypted Direct Contact within 6 Hours</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-8 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-widest text-black bg-gradient-to-r from-[#FFF1D2] to-[#C89B53] shadow-glow-gold hover:scale-[1.02] transition-all"
            >
              Conclude Session
            </button>
          </div>
        ) : (
          /* ========================================================================= */
          /* LUXURY ALLOCATION APPLICATION FORM                                       */
          /* ========================================================================= */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161622] text-[10px] font-mono text-[#C89B53] uppercase tracking-wider mb-2">
                <Lock className="w-3 h-3" />
                <span>Encrypted Private Client Salon</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-white tracking-tight">
                Request Horological Allocation
              </h3>
              <p className="text-xs text-gray-400 font-light mt-1">
                Direct submission to the Le Brassus Commissioning Board. Strictly confidential.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Legal Name */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-300">
                  Full Legal / Collector Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Lord Alistair Vance"
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#070709] border text-xs text-white placeholder-gray-600 focus:outline-none transition-colors ${
                    errors.fullName ? 'border-red-500' : 'border-white/10 focus:border-[#C89B53]'
                  }`}
                />
                {errors.fullName && <p className="text-[10px] font-mono text-red-400">{errors.fullName}</p>}
              </div>

              {/* Family Office / Entity */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-300">
                  Entity / Family Office (Optional)
                </label>
                <input
                  type="text"
                  value={formData.familyOffice}
                  onChange={(e) => setFormData({ ...formData, familyOffice: e.target.value })}
                  placeholder="e.g. Vance Heritage Trust"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070709] border border-white/10 focus:border-[#C89B53] text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
                />
              </div>

              {/* Selected Reference */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-300">
                  Desired Caliber Reference
                </label>
                <select
                  value={formData.selectedPiece}
                  onChange={(e) => setFormData({ ...formData, selectedPiece: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070709] border border-white/10 focus:border-[#C89B53] text-xs font-mono text-white focus:outline-none transition-colors"
                >
                  <option value="Nocturne Tourbillon 01 ($185,000 CHF)">
                    Ref. 01: Nocturne Tourbillon 01 ($185,000 CHF)
                  </option>
                  <option value="Sideralis Perpetual Moon ($142,000 CHF)">
                    Ref. 02: Sideralis Perpetual Moon ($142,000 CHF)
                  </option>
                  <option value="Chrono-Crucible Monopusher ($98,000 CHF)">
                    Ref. 03: Chrono-Crucible Monopusher ($98,000 CHF)
                  </option>
                  <option value="Bespoke Piece Unique Commission">
                    Bespoke Piece Unique Commission (Consultation)
                  </option>
                </select>
              </div>

              {/* Contact Method & Identifier */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-300">
                  Private Contact Identifier (Signal / WhatsApp / Phone / Email) *
                </label>
                <input
                  type="text"
                  value={formData.contactValue}
                  onChange={(e) => setFormData({ ...formData, contactValue: e.target.value })}
                  placeholder="+41 22 819 0000 or alistair@vance-holdings.ch"
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#070709] border text-xs text-white placeholder-gray-600 focus:outline-none transition-colors ${
                    errors.contactValue ? 'border-red-500' : 'border-white/10 focus:border-[#C89B53]'
                  }`}
                />
                {errors.contactValue && <p className="text-[10px] font-mono text-red-400">{errors.contactValue}</p>}
              </div>

              {/* Handover Salon */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-300">
                  Preferred Delivery Protocol & Salon
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  {[
                    { id: 'geneva', label: 'Geneva Salon' },
                    { id: 'london', label: 'London Mayfair' },
                    { id: 'dubai', label: 'Dubai DIFC' },
                    { id: 'courier', label: 'Diplomatic Courier' },
                  ].map((salon) => (
                    <button
                      key={salon.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, handoverSalon: salon.id })}
                      className={`p-2.5 rounded-xl border text-[11px] transition-all text-center ${
                        formData.handoverSalon === salon.id
                          ? 'bg-[#C89B53]/20 border-[#C89B53] text-[#E8D5B5] font-bold'
                          : 'bg-[#070709] border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      {salon.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bespoke Notes */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-300">
                  Bespoke Hand-Engraving or Custom Celestial Coordinate Notes
                </label>
                <textarea
                  rows="2"
                  value={formData.bespokeNotes}
                  onChange={(e) => setFormData({ ...formData, bespokeNotes: e.target.value })}
                  placeholder="Optional: Custom family crest, astronomical star alignment for date of birth, etc."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070709] border border-white/10 focus:border-[#C89B53] text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[10px] font-mono text-gray-500">
                Encrypted via Swiss Vault Protocol
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-7 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-widest text-black bg-gradient-to-r from-[#FFF1D2] to-[#C89B53] hover:shadow-glow-gold hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {isSubmitting ? 'Transmitting to Le Brassus...' : 'Submit Allocation Dossier'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

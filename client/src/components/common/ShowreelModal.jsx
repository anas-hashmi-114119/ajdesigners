import React from 'react';
import { X, Sparkles, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ShowreelModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/90 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-navy-900 rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-navy-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-electric-500 to-purple-brand flex items-center justify-center text-white text-xs font-bold">
              AJ
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>AJDesigners Agency Showreel 2025</span>
                <span className="text-[10px] font-semibold text-electric-400 bg-electric-500/10 px-2 py-0.5 rounded-full">
                  4K Master Cut
                </span>
              </div>
              <div className="text-[10px] text-charcoal-400">
                Direction by Yashwa & Aroosa • Global Campaign Highlights
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-charcoal-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas / Montage Display */}
        <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80"
            alt="Agency Showreel"
            className="w-full h-full object-cover opacity-80"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-black/40" />

          {/* Central Play Badge */}
          <div className="relative z-10 text-center space-y-4 max-w-lg px-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-electric-500 to-purple-brand text-white flex items-center justify-center mx-auto shadow-glow-blue animate-pulse">
              <Play className="w-7 h-7 ml-1" />
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
              Creative Minds. Digital Growth.
            </h3>
            <p className="text-xs text-charcoal-300 leading-relaxed">
              Serving ambitious brands across USA, UK, Canada, Australia, UAE, and Europe through AI-driven creative workflows and strategic social media leadership.
            </p>
          </div>

          {/* Highlights ticker at bottom */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-navy-900/90 backdrop-blur-md border border-white/10 text-[11px] text-charcoal-300">
            <span className="flex items-center gap-1.5 text-white font-semibold">
              <CheckCircle className="w-3.5 h-3.5 text-electric-400" />
              10 Disciplines Under One Roof
            </span>
            <span className="flex items-center gap-1.5 text-white font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              AI Speed + Human Art Direction
            </span>
            <span className="text-electric-300 font-mono">100% On-Time Delivery</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-white/10 bg-navy-950/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-charcoal-400 text-center sm:text-left">
            Ready to scale your digital presence? Discuss your requirements with our founders.
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-charcoal-300 hover:text-white bg-white/5 border border-white/10"
            >
              Close
            </button>
            <Link
              to="/contact"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-electric-500 to-purple-brand shadow-glow-blue flex items-center gap-2"
            >
              <span>Book Strategy Session</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


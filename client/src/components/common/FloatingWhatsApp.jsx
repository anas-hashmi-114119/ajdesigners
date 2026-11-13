import React, { useState } from 'react';
import { MessageCircle, X, ArrowUpRight, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="mb-3 w-80 bg-[#111116] rounded-3xl p-5 shadow-2xl border border-white/[0.08] backdrop-blur-xl animate-in fade-in duration-200 text-gray-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-electric-500 to-purple-brand text-white flex items-center justify-center font-bold text-xs shadow-glow-blue">
                AJ
              </div>
              <div>
                <div className="text-xs font-bold text-white">AJDesigners Advisory</div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Yashwa & Aroosa Available
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed mb-4">
            Hello! Have a question regarding our AI UGC video ads, social media retainers, or custom enterprise sprint packages?
          </p>

          <div className="space-y-2">
            <a
              href="#booking-calendar"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-electric-500 to-purple-brand shadow-glow-blue flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-transform"
            >
              <span>Schedule a Strategy Session</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://wa.me/923292020295?text=Hi%20Yashwa%20%26%20Aroosa%2C%20I%20would%20like%20to%20learn%20more%20about%20AJDesigners%20creative%20services."
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-gray-300 bg-[#181820] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        data-cursor-text="CHAT"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-electric-500 to-purple-brand text-white shadow-glow-blue hover:scale-110 active:scale-95 transition-all flex items-center justify-center border border-white/20"
        aria-label="Direct WhatsApp Consultation"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}

import React, { useState } from 'react';
import { MessageCircle, X, ArrowUpRight, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl p-5 shadow-2xl border border-charcoal-200/80 animate-fadeIn text-charcoal-900">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-100 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-electric-500 to-purple-brand text-white flex items-center justify-center font-bold text-xs">
                AJ
              </div>
              <div>
                <div className="text-xs font-bold text-navy-900">AJDesigners Advisory</div>
                <div className="text-[10px] text-green-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Available for Inquiries
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-charcoal-400 hover:bg-charcoal-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-charcoal-700 leading-relaxed mb-4">
            Hello! Have a question regarding our social media management, AI video production, or monthly pricing retainers?
          </p>

          <div className="space-y-2">
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-electric-500 to-purple-brand shadow-glow-blue flex items-center justify-center gap-1.5"
            >
              <span>Book a Free Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href="https://wa.me/15550192834?text=Hi%20AJDesigners%20Team%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20digital%20marketing%20services."
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-charcoal-700 bg-surface-light hover:bg-charcoal-100 border border-charcoal-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-green-600" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        data-cursor-text="CHAT"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-electric-500 to-purple-brand text-white flex items-center justify-center shadow-glow-blue hover:scale-105 active:scale-95 transition-all duration-300 group"
        aria-label="Quick contact"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        )}
      </button>
    </div>
  );
}


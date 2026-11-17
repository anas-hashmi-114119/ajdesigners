import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Globe2, ArrowUpRight } from 'lucide-react';
import { InstagramIcon, LinkedinIcon, FacebookIcon } from '../common/SocialIcons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#070709] text-gray-300 border-t border-white/[0.08] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-bronze/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/[0.08]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" data-cursor-text="HOME" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#C69341] via-[#DDA74F] to-[#8A5D20] text-black flex items-center justify-center shadow-glow-gold border border-gold-300/30 group-hover:scale-105 transition-transform duration-300">
                <span className="font-display font-extrabold text-black text-lg tracking-wider">AJ</span>
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white group-hover:text-gold-400 transition-colors">
                AJDesigners<span className="text-[#C69341]">.</span>
              </span>
            </Link>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Creative Minds. Digital Growth. Founded by Yashwa and Aroosa. We partner with ambitious international brands to engineer high-converting AI creative assets, social media management, and performance marketing engines.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                data-cursor-text="INSTAGRAM"
                className="w-10 h-10 rounded-xl bg-[#111116] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:border-gold-500/50 hover:bg-gold-500/10 transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                data-cursor-text="LINKEDIN"
                className="w-10 h-10 rounded-xl bg-[#111116] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:border-gold-500/50 hover:bg-gold-500/10 transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                data-cursor-text="FACEBOOK"
                className="w-10 h-10 rounded-xl bg-[#111116] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:border-gold-500/50 hover:bg-gold-500/10 transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-xs text-gray-400 flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-gold-400 shrink-0" />
              <span>Global Remote Operations • Serving US, UK, Canada, Australia, UAE & Europe</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white font-mono">Navigation</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">All Services</Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-white transition-colors">Industries We Serve</Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio & Work</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">Pricing & Calculator</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Founders</Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white font-mono">Services</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link to="/services/ai-powered-content" className="hover:text-white transition-colors">
                  AI UGC Video Ads
                </Link>
              </li>
              <li>
                <Link to="/services/social-media-management" className="hover:text-white transition-colors">
                  Social Media Management
                </Link>
              </li>
              <li>
                <Link to="/services/digital-advertising" className="hover:text-white transition-colors">
                  Performance Paid Campaigns
                </Link>
              </li>
              <li>
                <Link to="/services/graphic-design-branding" className="hover:text-white transition-colors">
                  Brand & Graphic Design
                </Link>
              </li>
              <li>
                <Link to="/services/short-form-video-reels" className="hover:text-white transition-colors">
                  Short-Form Reels & TikToks
                </Link>
              </li>
              <li>
                <Link to="/services/lead-generation" className="hover:text-white transition-colors">
                  B2B Lead Generation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Remote Operations */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white font-mono">Inquiries</h4>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="mailto:contact@ajdesigners.com" className="text-white hover:text-gold-400 transition-colors font-medium">
                  contact@ajdesigners.com
                </a>
              </div>
              <div className="p-3.5 rounded-xl bg-[#111116] border border-white/[0.08]">
                <span className="text-[11px] font-bold text-gray-200 block mb-1">
                  Global Remote Operations
                </span>
                <span className="text-[11px] text-gray-400 leading-relaxed block">
                  Collaborating with international clients worldwide across all global time zones (UTC-10 to UTC+12).
                </span>
              </div>
              <div>
                <a
                  href="#booking-calendar"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-400 hover:text-gold-300"
                >
                  <span>Book Free Strategy Call</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policy Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {currentYear} AJDesigners. All rights reserved. Founded by Yashwa & Aroosa.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/admin" className="hover:text-white transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Signature: Continuous Kinetic Brandmark Marquee */}
      <div className="w-full overflow-hidden select-none pointer-events-none border-t border-white/[0.04] pt-4 pb-2 relative z-10">
        <div className="animate-marquee flex items-center gap-8 sm:gap-14 whitespace-nowrap will-change-transform">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-8 sm:gap-14 shrink-0">
              <span className="text-[13vw] sm:text-[14vw] lg:text-[15vw] font-display font-black leading-none tracking-tighter uppercase bg-gradient-to-b from-white/20 via-white/[0.05] to-transparent bg-clip-text text-transparent transform translate-y-2">
                AJDESIGNERS<span className="text-gold-400">.</span>
              </span>
              <span className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-gold-400 shadow-glow-gold shrink-0 opacity-80" />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

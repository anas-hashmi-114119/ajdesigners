import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ShieldCheck,
  Globe2,
} from 'lucide-react';
import { InstagramIcon, LinkedinIcon, FacebookIcon } from '../common/SocialIcons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-charcoal-300 border-t border-white/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-brand/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-electric-500 to-purple-brand flex items-center justify-center shadow-glow-blue">
                <span className="font-display font-extrabold text-white text-lg tracking-wider">AJ</span>
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                AJDesigners<span className="text-purple-brand">.</span>
              </span>
            </Link>
            <p className="text-sm text-charcoal-400 max-w-sm leading-relaxed">
              Creative Minds. Digital Growth. We combine strategic marketing, content creation, AI workflows, and digital expertise to help businesses build stronger brands and scalable customer pipelines worldwide.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-navy-800 border border-white/10 flex items-center justify-center text-charcoal-400 hover:text-white hover:bg-electric-500 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-navy-800 border border-white/10 flex items-center justify-center text-charcoal-400 hover:text-white hover:bg-electric-500 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-navy-800 border border-white/10 flex items-center justify-center text-charcoal-400 hover:text-white hover:bg-electric-500 transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-xs text-charcoal-400 flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-electric-400" />
              <span>Serving USA, UK, Canada, Australia, UAE & Europe</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white font-display">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
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
                <Link to="/pricing" className="hover:text-white transition-colors">Pricing Packages</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">Insights & Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white font-display">Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services/social-media-management" className="hover:text-white transition-colors">
                  Social Media Management
                </Link>
              </li>
              <li>
                <Link to="/services/content-creation" className="hover:text-white transition-colors">
                  Content Creation
                </Link>
              </li>
              <li>
                <Link to="/services/ai-powered-content" className="hover:text-white transition-colors">
                  AI-Powered Content
                </Link>
              </li>
              <li>
                <Link to="/services/graphic-design-branding" className="hover:text-white transition-colors">
                  Graphic Design & Branding
                </Link>
              </li>
              <li>
                <Link to="/services/short-form-video-reels" className="hover:text-white transition-colors">
                  Short-Form Video & Reels
                </Link>
              </li>
              <li>
                <Link to="/services/digital-advertising" className="hover:text-white transition-colors">
                  Digital Advertising
                </Link>
              </li>
              <li>
                <Link to="/services/lead-generation" className="hover:text-white transition-colors">
                  B2B Lead Generation
                </Link>
              </li>
              <li>
                <Link to="/services/linkedin-marketing" className="hover:text-white transition-colors">
                  LinkedIn Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white font-display">Inquiries</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-electric-400 mt-1 shrink-0" />
                <a href="mailto:contact@ajdesigners.com" className="hover:text-white transition-colors break-all">
                  contact@ajdesigners.com
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-purple-brand mt-1 shrink-0" />
                <span className="text-xs text-charcoal-400 leading-relaxed">
                  Remote Global Studio Operations. Client consultations scheduled across multiple international timezones.
                </span>
              </div>
            </div>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-electric-400 hover:text-electric-300"
              >
                <span>Request a Custom Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
          <p>© {currentYear} AJDesigners. All rights reserved. Co-Founded by Yashwa & Aroosa.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-charcoal-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-charcoal-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/admin" className="hover:text-charcoal-300 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

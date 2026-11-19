import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  X,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { InstagramIcon, LinkedinIcon, TwitterXIcon } from '../common/SocialIcons';

const TEAM_MEMBERS = [
  {
    id: 'yashwa',
    name: 'YASHWA',
    titleBadge: 'CEO YASHWA',
    designation: 'CHIEF EXECUTIVE OFFICER',
    roleCategory: 'Founder & Performance Architect',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85',
    tagline: 'Scaling brands with quantitative growth architectures & $14M+ ad spend track record.',
    bio: 'Yashwa spearheads agency vision, full-funnel customer acquisition, and algorithmic media buying at AJDesigners. Having deployed over $14M+ in profitable ad spend across North America, Europe, and the Middle East, he architects quantitative conversion engines, high-velocity creative testing matrices, and programmatic retargeting funnels that turn cold traffic into enterprise dealflow.',
    experience: 'Ex-VP Growth • 8+ Years Digital Strategy • 180+ Brands Scaled',
    tags: ['Full-Funnel Paid Ads', 'Growth Architecture', 'Attribution Modeling', 'Conversion Optimization'],
    stats: [
      { label: 'Ad Spend Directed', val: '$14.2M+' },
      { label: 'Avg ROAS Lift', val: '2.8x - 4.1x' },
    ],
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com',
      email: 'yashwa@ajdesigners.com',
    },
  },
  {
    id: 'aroosa',
    name: 'AROOSA',
    titleBadge: 'CCO AROOSA',
    designation: 'CHIEF CREATIVE OFFICER',
    roleCategory: 'Co-Founder & AI Visual Synthesizer',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',
    tagline: 'Engineering high-retention viral storytelling & bespoke luxury visual systems.',
    bio: 'Aroosa directs master brand identity systems, AI video synthesizer modeling, and viral video hook production. Blending haute-couture aesthetic principles with algorithmic consumer psychology, she turns technical B2B solutions and DTC products into scroll-stopping video assets that consistently achieve a verified 94% hook retention rate across Meta, TikTok, and YouTube Shorts.',
    experience: 'Award-Winning Art Director • Haute Visuals Specialist • 450+ Creative Sprints',
    tags: ['AI UGC Production', 'Art Direction', 'Consumer Psychology', 'Visual Brand Systems'],
    stats: [
      { label: 'Hook Retention', val: '94% Avg' },
      { label: 'Assets Shipped', val: '2,400+' },
    ],
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com',
      email: 'aroosa@ajdesigners.com',
    },
  },
  {
    id: 'joshua',
    name: 'JOSHUA VANCE',
    titleBadge: 'HEAD OF AI JOSHUA',
    designation: 'HEAD OF AI & PERFORMANCE MEDIA',
    roleCategory: 'Partner & Synthetic Media Lead',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85',
    tagline: 'Pioneering rapid synthetic creator modeling & multi-market localized ad pipelines.',
    bio: 'Joshua leads programmatic scaling and AI-driven creative automation workflows at AJDesigners. With over a decade of executive experience accelerating Silicon Valley and European SaaS ventures, he designs synthetic creator engines that allow our partners to localize multilingual voice clones, lip-syncs, and 50+ video ad variations in under 48 hours without expensive camera crews.',
    experience: 'Ex-Tech Lead & Silicon Valley Media Partner • 10+ Years Ad Tech',
    tags: ['Synthetic Video', 'Creative Automation', 'Algorithmic Sync', 'Multilingual Ads'],
    stats: [
      { label: 'Sprint Turnaround', val: '48 Hours' },
      { label: 'CPA Reduction', val: '-42% Blended' },
    ],
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com',
      email: 'joshua@ajdesigners.com',
    },
  },
];

export default function MeetTheTeam() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [hoveredMemberId, setHoveredMemberId] = useState(null);

  // Keyboard navigation: Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedMember(null);
      }
    };

    if (selectedMember) {
      document.body.style.overflow = 'hidden';
      if (window.__lenis) window.__lenis.stop();
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      if (window.__lenis) window.__lenis.start();
    }

    return () => {
      document.body.style.overflow = '';
      if (window.__lenis) window.__lenis.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMember]);

  const handleScheduleClick = (e) => {
    e.preventDefault();
    setSelectedMember(null);
    const calendarEl = document.getElementById('booking-calendar');
    if (calendarEl) {
      calendarEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="team" className="py-20 lg:py-28 bg-[#070709] relative overflow-hidden border-t border-white/[0.06]">
      {/* Ambient Gold Radial Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gold-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-gold-700/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>MEET THE TEAM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
            The Architects Behind <br />
            <span className="gradient-text">Your Digital Growth.</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-normal max-w-2xl mx-auto">
            Senior human art direction, algorithmic media buying, and AI engineering united in one high-velocity studio. Click any team member to explore their background.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 3-CARD RESPONSIVE HORIZONTAL GRID (SIDE-BY-SIDE ON DESKTOP) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {TEAM_MEMBERS.map((member) => {
            const isHovered = hoveredMemberId === member.id;

            return (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                onMouseEnter={() => setHoveredMemberId(member.id)}
                onMouseLeave={() => setHoveredMemberId(null)}
                data-cursor-text="VIEW BIO"
                className={`group relative rounded-3xl overflow-hidden cursor-pointer border transition-all duration-500 ease-out h-[480px] sm:h-[520px] flex flex-col justify-end transform-gpu ${
                  isHovered
                    ? 'border-gold-500/50 shadow-glow-gold -translate-y-2'
                    : 'border-white/[0.08] hover:border-gold-500/30 shadow-xl'
                }`}
                style={{
                  borderRadius: '28px', // Matches hero container curved radius
                }}
              >
                {/* Profile Photo: Black and White (grayscale 100%) by default; full color on hover */}
                <div className="absolute inset-0 w-full h-full bg-[#111116] overflow-hidden">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.designation}`}
                    className={`w-full h-full object-cover transition-all duration-700 ease-out transform-gpu ${
                      isHovered
                        ? 'grayscale-0 scale-105 contrast-100 brightness-100'
                        : 'grayscale contrast-[1.08] brightness-90 group-hover:scale-105'
                    }`}
                    loading="lazy"
                  />
                  {/* Subtle Grain & Ambient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/40 to-transparent opacity-90 transition-opacity group-hover:opacity-85" />
                </div>

                {/* Ambient Top Glow Tag */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-gold-300 bg-[#070709]/80 backdrop-blur-md border border-gold-500/30 shadow-md">
                    <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-gold-400 animate-ping' : 'bg-gold-500'}`} />
                    <span>{member.roleCategory}</span>
                  </span>
                </div>

                {/* Interactive Click Cue on Top Right */}
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C69341] text-black flex items-center justify-center shadow-glow-gold scale-90 group-hover:scale-100 transition-transform">
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </div>
                </div>

                {/* Bottom Overlay: Designation and Name in bold high-contrast typography (e.g. CEO JOSHUA) */}
                <div className="relative z-20 p-6 sm:p-7 space-y-1.5 border-t border-white/[0.08] bg-[#070709]/80 backdrop-blur-md transition-colors group-hover:border-gold-500/40">
                  <div className="text-[11px] font-mono font-bold tracking-widest uppercase text-gold-400">
                    {member.designation}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight group-hover:text-gold-200 transition-colors">
                    {member.titleBadge}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed pt-0.5">
                    {member.tagline}
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-[11px] text-gold-400 font-semibold group-hover:text-white transition-colors">
                    <span>Click to view profile & track record</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* EXPANDED DETAIL MODAL / MORPHED VIEW                      */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={() => setSelectedMember(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl overflow-y-auto"
          >
            {/* Modal Card: Covers roughly two-thirds of container width without taking over full screen */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 24 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-3xl bg-[#111116] border border-gold-500/40 shadow-[0_0_60px_-10px_rgba(198,147,65,0.30)] overflow-hidden my-auto"
              style={{
                borderRadius: '28px',
              }}
            >
              {/* Corner Ambient Light */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                aria-label="Close Profile"
                className="absolute top-5 right-5 z-30 w-9 h-9 rounded-full bg-white/[0.08] hover:bg-gold-500/20 text-gray-300 hover:text-white border border-white/10 hover:border-gold-500/40 flex items-center justify-center transition-all focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Expanded Card 2-Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 p-6 sm:p-8 lg:p-10 items-center">
                {/* Left Side: Member Profile Photo in Smaller Portrait Frame */}
                <div className="md:col-span-5 relative">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] w-full border border-gold-500/30 shadow-2xl bg-black">
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-transparent opacity-80" />

                    {/* Active Leadership Badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90 bg-[#070709]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                      <span className="flex items-center gap-1.5 text-gold-300 font-bold">
                        <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                        <span>Verified Executive</span>
                      </span>
                      <span className="text-[10px] text-gray-400">AJDesigners</span>
                    </div>
                  </div>

                  {/* Quick Highlight Stats Strip */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                    {selectedMember.stats.map((s, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-[#181820] border border-white/[0.06]">
                        <div className="text-base font-display font-extrabold text-gold-400">{s.val}</div>
                        <div className="text-[10px] text-gray-400 font-medium">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Designation, Name, Bio & Socials */}
                <div className="md:col-span-7 space-y-5">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                      <Sparkles className="w-3 h-3" />
                      <span>{selectedMember.designation}</span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                      {selectedMember.titleBadge}
                    </h3>

                    <p className="text-xs sm:text-sm text-gold-300/90 font-medium mt-1">
                      {selectedMember.experience}
                    </p>
                  </div>

                  {/* Bio Paragraph */}
                  <div className="space-y-3 text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                    <p>{selectedMember.bio}</p>
                  </div>

                  {/* Expertise Tags */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block font-semibold">
                      Core Disciplines & Superpowers
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMember.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-gray-200 bg-[#181820] border border-white/[0.08]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social Media Handle Icons & Booking Action */}
                  <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* Social Icons Strip */}
                    <div className="flex items-center gap-2">
                      <a
                        href={selectedMember.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor-text="LINKEDIN"
                        className="w-9 h-9 rounded-xl bg-[#181820] border border-white/[0.1] hover:border-gold-500/50 hover:bg-gold-500/10 text-gray-300 hover:text-white flex items-center justify-center transition-all"
                        aria-label={`${selectedMember.name} LinkedIn`}
                      >
                        <LinkedinIcon className="w-4 h-4 text-gold-400" />
                      </a>
                      <a
                        href={selectedMember.socials.twitter}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor-text="TWITTER"
                        className="w-9 h-9 rounded-xl bg-[#181820] border border-white/[0.1] hover:border-gold-500/50 hover:bg-gold-500/10 text-gray-300 hover:text-white flex items-center justify-center transition-all"
                        aria-label={`${selectedMember.name} X / Twitter`}
                      >
                        <TwitterXIcon className="w-3.5 h-3.5 text-gold-400" />
                      </a>
                      <a
                        href={selectedMember.socials.instagram}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor-text="INSTAGRAM"
                        className="w-9 h-9 rounded-xl bg-[#181820] border border-white/[0.1] hover:border-gold-500/50 hover:bg-gold-500/10 text-gray-300 hover:text-white flex items-center justify-center transition-all"
                        aria-label={`${selectedMember.name} Instagram`}
                      >
                        <InstagramIcon className="w-4 h-4 text-gold-400" />
                      </a>
                      <a
                        href={`mailto:${selectedMember.socials.email}`}
                        data-cursor-text="EMAIL"
                        className="w-9 h-9 rounded-xl bg-[#181820] border border-white/[0.1] hover:border-gold-500/50 hover:bg-gold-500/10 text-gray-300 hover:text-white flex items-center justify-center transition-all"
                        aria-label={`Email ${selectedMember.name}`}
                      >
                        <Mail className="w-4 h-4 text-gold-400" />
                      </a>
                    </div>

                    {/* Radiant Scale-Your-Brand Gold Action Button */}
                    <a
                      href="#booking-calendar"
                      onClick={handleScheduleClick}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold text-black bg-gradient-to-r from-[#FFF1D2] via-[#F5D791] to-[#C69341] hover:shadow-glow-gold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shrink-0"
                    >
                      <Calendar className="w-3.5 h-3.5 text-black" />
                      <span>Book Call with {selectedMember.name.split(' ')[0]}</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

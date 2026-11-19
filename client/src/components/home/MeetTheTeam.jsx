import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Mail } from 'lucide-react';
import { InstagramIcon, LinkedinIcon, TwitterXIcon } from '../common/SocialIcons';

const TEAM_MEMBERS = [
  {
    id: 'yashwa',
    name: 'Yashwa',
    designation: 'CEO & Strategy Director',
    designationBadge: 'CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85',
    bio: 'Yashwa spearheads agency vision, digital strategy, and performance media acquisition at AJDesigners. With over 8 years of growth marketing experience, he designs quantitative conversion funnels and ad campaigns that scale international brands profitably.',
    socials: {
      linkedin: 'https://www.linkedin.com/company/ajdesigners',
      twitter: 'https://x.com/ajdesigners',
      instagram: 'https://www.instagram.com/ajdesigners',
      email: 'mailto:yashwa@ajdesigners.com',
    },
  },
  {
    id: 'aroosa',
    name: 'Aroosa',
    designation: 'CCO & Creative Director',
    designationBadge: 'CCO',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',
    bio: 'Aroosa directs creative brand identity, visual storytelling, and high-converting video production at AJDesigners. Blending luxury aesthetic principles with consumer psychology, she leads the studio in crafting scroll-stopping visual assets for high-growth businesses worldwide.',
    socials: {
      linkedin: 'https://www.linkedin.com/company/ajdesigners',
      twitter: 'https://x.com/ajdesigners',
      instagram: 'https://www.instagram.com/ajdesigners',
      email: 'mailto:aroosa@ajdesigners.com',
    },
  },
  {
    id: 'joshua',
    name: 'Joshua Vance',
    designation: 'Head of AI & Performance Media',
    designationBadge: 'Head of AI',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85',
    bio: 'Joshua leads AI-driven creative automation workflows and performance media scaling at AJDesigners. Bringing a decade of ad tech and growth acceleration experience, he designs synthetic media pipelines that allow global partners to scale high-retention video variations rapidly.',
    socials: {
      linkedin: 'https://www.linkedin.com/company/ajdesigners',
      twitter: 'https://x.com/ajdesigners',
      instagram: 'https://www.instagram.com/ajdesigners',
      email: 'mailto:joshua@ajdesigners.com',
    },
  },
];

export default function MeetTheTeam() {
  const [expandedId, setExpandedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const containerRef = useRef(null);

  // Close expansion on outside click or Escape key
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setExpandedId(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setExpandedId(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="team" className="py-16 lg:py-24 bg-[#070709] relative overflow-hidden border-t border-white/[0.06]">
      {/* Subtle Ambient Radial Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>MEET THE TEAM</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold tracking-tight text-white leading-tight">
            The Architects Behind <br className="hidden sm:inline" />
            <span className="gradient-text">Your Digital Growth.</span>
          </h2>
        </div>

        {/* Interactive Responsive Team Row */}
        <div
          ref={containerRef}
          className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-5 max-w-4xl mx-auto"
        >
          {TEAM_MEMBERS.map((member) => {
            const isExpanded = expandedId === member.id;
            const isHovered = hoveredId === member.id;
            const isAnyExpanded = expandedId !== null;

            return (
              <motion.div
                key={member.id}
                layout
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => {
                  if (!isExpanded) toggleExpand(member.id);
                }}
                onMouseEnter={() => setHoveredId(member.id)}
                onMouseLeave={() => setHoveredId(null)}
                data-cursor-text={isExpanded ? '' : 'VIEW'}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 transform-gpu ${
                  isExpanded
                    ? 'w-full md:w-[560px] lg:w-[600px] h-auto md:h-[310px] bg-[#111116] border border-gold-500/40 shadow-[0_0_35px_rgba(198,147,65,0.22)] z-30 cursor-default'
                    : isAnyExpanded
                    ? 'w-full md:w-[170px] lg:w-[185px] h-[280px] md:h-[310px] opacity-45 hover:opacity-85 grayscale scale-[0.98] border border-white/[0.08] hover:border-gold-500/30 cursor-pointer z-10'
                    : 'w-full md:w-[230px] lg:w-[250px] h-[290px] md:h-[310px] border border-white/[0.08] hover:border-gold-500/40 shadow-lg cursor-pointer z-10 hover:-translate-y-1'
                }`}
                style={{
                  borderRadius: '20px',
                }}
              >
                {/* ---------------------------------------------------------------- */}
                {/* EXPANDED STATE (IN-PLACE HORIZONTAL EXPANSION)                   */}
                {/* ---------------------------------------------------------------- */}
                {isExpanded ? (
                  <div className="flex flex-col md:flex-row h-full w-full">
                    {/* Left: Member Portrait Frame */}
                    <div className="w-full md:w-[210px] h-[200px] md:h-full shrink-0 relative bg-black overflow-hidden">
                      <img
                        src={member.image}
                        alt={`${member.name} - ${member.designation}`}
                        className="w-full h-full object-cover grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-transparent opacity-60 md:opacity-0" />
                    </div>

                    {/* Right: Designation, Name, Bio, and Platform Links */}
                    <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between relative bg-[#111116]">
                      {/* Close Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedId(null);
                        }}
                        aria-label="Close details"
                        className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/[0.08] hover:bg-gold-500/20 text-gray-400 hover:text-white border border-white/10 hover:border-gold-500/30 flex items-center justify-center transition-colors focus:outline-none"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      {/* Header: Designation & Name */}
                      <div className="pr-8">
                        <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-gold-400">
                          {member.designation}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight mt-0.5">
                          {member.name}
                        </h3>
                      </div>

                      {/* Bio Paragraph */}
                      <p className="text-xs sm:text-[13px] text-gray-300 leading-relaxed font-normal my-3">
                        {member.bio}
                      </p>

                      {/* Platforms Links */}
                      <div className="pt-2 border-t border-white/[0.08] flex items-center gap-2">
                        <a
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 rounded-lg bg-[#181820] border border-white/[0.1] hover:border-gold-500/50 hover:bg-gold-500/10 text-gray-300 hover:text-white flex items-center justify-center transition-all"
                          aria-label={`${member.name} LinkedIn`}
                          title="LinkedIn"
                        >
                          <LinkedinIcon className="w-3.5 h-3.5 text-gold-400" />
                        </a>
                        <a
                          href={member.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 rounded-lg bg-[#181820] border border-white/[0.1] hover:border-gold-500/50 hover:bg-gold-500/10 text-gray-300 hover:text-white flex items-center justify-center transition-all"
                          aria-label={`${member.name} X / Twitter`}
                          title="X / Twitter"
                        >
                          <TwitterXIcon className="w-3.5 h-3.5 text-gold-400" />
                        </a>
                        <a
                          href={member.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 rounded-lg bg-[#181820] border border-white/[0.1] hover:border-gold-500/50 hover:bg-gold-500/10 text-gray-300 hover:text-white flex items-center justify-center transition-all"
                          aria-label={`${member.name} Instagram`}
                          title="Instagram"
                        >
                          <InstagramIcon className="w-3.5 h-3.5 text-gold-400" />
                        </a>
                        <a
                          href={member.socials.email}
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 rounded-lg bg-[#181820] border border-white/[0.1] hover:border-gold-500/50 hover:bg-gold-500/10 text-gray-300 hover:text-white flex items-center justify-center transition-all"
                          aria-label={`Email ${member.name}`}
                          title="Email"
                        >
                          <Mail className="w-3.5 h-3.5 text-gold-400" />
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ---------------------------------------------------------------- */
                  /* DEFAULT / COMPACT CARD STATE                                    */
                  /* ---------------------------------------------------------------- */
                  <div className="relative w-full h-full bg-[#111116] flex flex-col justify-end">
                    {/* Profile Photo: Grayscale by default, color on hover */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                      <img
                        src={member.image}
                        alt={`${member.name} - ${member.designation}`}
                        className={`w-full h-full object-cover transition-all duration-500 ease-out transform-gpu ${
                          isHovered
                            ? 'grayscale-0 scale-105 contrast-100 brightness-100'
                            : 'grayscale contrast-[1.08] brightness-90'
                        }`}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/40 to-transparent opacity-90" />
                    </div>

                    {/* Bottom Overlay: JUST the Designation & Name */}
                    <div className="relative z-10 p-4 sm:p-5">
                      <div className="text-[11px] font-mono font-bold tracking-widest uppercase text-gold-400">
                        {member.designationBadge}
                      </div>
                      <h3 className="text-base sm:text-lg font-display font-extrabold text-white tracking-tight mt-0.5">
                        {member.name}
                      </h3>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Compass,
  Cpu,
  SlidersHorizontal,
  Rocket,
  Clock,
} from 'lucide-react';

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Audit',
    microCaption: 'Brand & Funnel Deep-Dive',
    timeframe: 'Day 1 – 2',
    icon: Search,
    color: 'from-[#8A5D20] to-[#C69341]',
    iconColor: 'text-gold-400',
    badgeGlow: 'shadow-glow-gold',
  },
  {
    step: '02',
    title: 'Creative Direction',
    microCaption: 'Visual Systems & Hooks',
    timeframe: 'Day 3 – 5',
    icon: Compass,
    color: 'from-[#C69341] to-[#F5D791]',
    iconColor: 'text-champagne',
    badgeGlow: 'shadow-glow-gold',
  },
  {
    step: '03',
    title: 'AI Production',
    microCaption: 'High-Velocity Asset Engine',
    timeframe: 'Day 6 – 10',
    icon: Cpu,
    color: 'from-[#DDA74F] to-[#8A5D20]',
    iconColor: 'text-gold-400',
    badgeGlow: 'shadow-glow-gold',
  },
  {
    step: '04',
    title: 'Review & Polish',
    microCaption: '48h Precision Refinement',
    timeframe: 'Day 11 – 12',
    icon: SlidersHorizontal,
    color: 'from-[#F5D791] to-[#DDA74F]',
    iconColor: 'text-gold-300',
    badgeGlow: 'shadow-glow-gold',
  },
  {
    step: '05',
    title: 'Launch & Scale',
    microCaption: 'Multi-Market ROAS Growth',
    timeframe: 'Ongoing Retainer',
    icon: Rocket,
    color: 'from-[#C69341] to-[#9E6F24]',
    iconColor: 'text-gold-400',
    badgeGlow: 'shadow-glow-gold',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    originX: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function InteractiveWorkflowPipeline() {
  return (
    <section className="py-16 bg-[#09090d] border-y border-white/[0.08] relative overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[250px] bg-gold-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Normalized Font Sizing */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-gold-400" />
            <span>5-Step Frictionless Delivery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
            How It Works.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed">
            A frictionless collaborative framework designed for founders who value velocity, craft, and zero operational drag.
          </p>
        </div>

        {/* 5-Step Visual Icon Pipeline with Fast Automatic Cascade Animation */}
        <div className="relative">
          {/* Horizontal Track Line running behind step icons */}
          <div className="hidden md:block absolute top-[44px] left-[8%] right-[8%] h-[2px] bg-white/[0.08] z-0" />
          <motion.div
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            className="hidden md:block absolute top-[44px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-[#8A5D20] via-[#C69341] to-[#F5D791] shadow-glow-gold z-0"
          />

          {/* 5-Column Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 relative z-10"
          >
            {WORKFLOW_STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.step}
                  variants={cardVariants}
                  className="p-5 rounded-2xl bg-[#111116] border border-white/[0.08] hover:border-gold-500/50 hover:shadow-glow-gold hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between items-center text-center group cursor-default"
                >
                  {/* Top: Glassmorphic Icon Badge + Step Pill */}
                  <div className="flex flex-col items-center mb-4 relative">
                    <div className="w-12 h-12 rounded-2xl bg-[#15151c] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-gold-400/40 group-hover:bg-[#1a1610] transition-all duration-300 shadow-md">
                      <Icon className={`w-5 h-5 ${s.iconColor} transition-transform duration-300 group-hover:rotate-6`} />
                    </div>
                    <span className="mt-2 text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.06] group-hover:text-gold-400 group-hover:border-gold-500/30 transition-colors">
                      Step {s.step}
                    </span>
                  </div>

                  {/* Middle: Title & 3-Word Micro-Caption */}
                  <div className="space-y-1 my-auto">
                    <h3 className="text-base font-display font-bold text-white group-hover:text-gold-300 transition-colors leading-snug">
                      {s.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed">
                      {s.microCaption}
                    </p>
                  </div>

                  {/* Bottom: Micro Timeframe Chip */}
                  <div className="mt-4 pt-3 border-t border-white/[0.06] w-full flex items-center justify-center">
                    <span className="text-[10px] font-mono text-gray-500 group-hover:text-gray-400 transition-colors">
                      {s.timeframe}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

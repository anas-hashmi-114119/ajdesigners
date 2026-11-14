import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  ArrowRight,
  Zap,
  Calendar,
  FileCheck,
} from 'lucide-react';

const WORKFLOW_STEPS = [
  {
    step: '01',
    phase: 'Discovery & Audit',
    title: 'Audit & Growth Strategy',
    timeframe: 'Days 1 – 2',
    clientCommitment: '20 min async onboarding',
    description:
      'We dissect your competitor landscape, uncover creative ad fatigue, analyze winning historical hooks, and architect a 90-day multi-platform growth blueprint.',
    deliverables: [
      'Comprehensive Creative & ROAS Audit',
      'Competitor Ad Angle & Hook Matrix',
      'Private Notion Dashboard & Slack Portal Setup',
      '90-Day Omnichannel Growth Roadmap',
    ],
    tools: ['Notion', 'Slack', 'Meta Ad Library', 'TikTok Creative Center'],
    badge: 'Onboarding Sprint',
  },
  {
    step: '02',
    phase: 'Art Direction',
    title: 'Creative Direction & Scripting',
    timeframe: 'Days 3 – 5',
    clientCommitment: '15 min review & greenlight',
    description:
      'Yashwa & Aroosa develop bespoke visual moodboards, psychology-backed short-form script frameworks, and high-converting storytelling angles tailored to your brand voice.',
    deliverables: [
      'Bespoke Visual Moodboards & Typography Guidelines',
      'High-Retention Video Script Frameworks (3s Hooks)',
      '3D Product Staging & Concept Visual Mockups',
      'Demographic & Creator Persona Profiles',
    ],
    tools: ['Figma', 'Miro', 'Claude / GPT-4', 'Midjourney v6'],
    badge: 'Concept Approval',
  },
  {
    step: '03',
    phase: 'Rapid Production',
    title: 'AI & Senior Human Production',
    timeframe: 'Days 6 – 10',
    clientCommitment: '0 min (100% Agency Handled)',
    description:
      'Our studio pairs generative AI synthesis algorithms with senior human motion designers and 3D animators to craft 30+ conversion-ready assets in rapid 48-hour sprints.',
    deliverables: [
      '30+ AI UGC Video Variations (9:16 & 1:1 ratios)',
      'Multi-Voiceover Accent Dubbing (US, UK, AUS, UAE)',
      'Kinetic Subtitles, B-roll & Sound Design',
      'High-Aesthetic Static Ad Banners & Carousels',
    ],
    tools: ['After Effects', 'Premiere Pro', 'ElevenLabs', 'RunPod GPU'],
    badge: 'High-Velocity Sprint',
  },
  {
    step: '04',
    phase: 'Collaborative Polish',
    title: 'Review, Polish & Approval',
    timeframe: 'Days 11 – 12',
    clientCommitment: '10 min frame-accurate feedback',
    description:
      'Collaborate asynchronously inside your private Notion & Frame.io portal. Request revisions with frame-accurate video timestamps and receive polished updates within 24 hours.',
    deliverables: [
      'Frame-Accurate Video & Graphic Feedback Loop',
      'Frictionless Revisions with 24h Turnaround',
      'Master High-Resolution 4K & Vector Source Files',
      'Full Commercial IP & Usage Rights Transferred',
    ],
    tools: ['Frame.io', 'Notion', 'Google Drive Enterprise'],
    badge: 'Frictionless Polish',
  },
  {
    step: '05',
    phase: 'Scale & ROAS',
    title: 'Launch, Distribute & Scale',
    timeframe: 'Ongoing Sprint Retainer',
    clientCommitment: 'Weekly executive summary check-in',
    description:
      'Scheduled distribution, automated community posting, and live algorithmic ad campaign optimization across US, UK, EU, and UAE target markets to drive maximum ROAS.',
    deliverables: [
      'Automated Multi-Platform Scheduled Publishing',
      'Live Meta & TikTok Paid Campaign Optimization',
      'Weekly ROAS & Customer Acquisition Cost Audits',
      'Dynamic Hook Iteration to Defeat Ad Fatigue',
    ],
    tools: ['Meta Ads Manager', 'TikTok Ads', 'Buffer/Hootsuite', 'Looker Studio'],
    badge: 'Revenue Acceleration',
  },
];

export default function InteractiveWorkflowPipeline() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = WORKFLOW_STEPS[activeStepIndex];

  return (
    <section className="py-24 bg-[#09090d] border-y border-white/[0.08] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-electric-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-electric-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-electric-400" />
            <span>Predictable Global Delivery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            How It Works.
          </h2>
          <p className="mt-3 text-base text-gray-400">
            A frictionless 5-step collaborative workflow designed for founders who value velocity, craft, and zero operational drag.
          </p>
        </div>

        {/* 5-Step Connected Progress Bar / Tabs */}
        <div className="relative mb-12">
          {/* Horizontal Track Line */}
          <div className="hidden md:block absolute top-7 left-12 right-12 h-0.5 bg-white/[0.08] -z-0" />
          <div
            className="hidden md:block absolute top-7 left-12 h-0.5 bg-gradient-to-r from-electric-500 via-purple-brand to-cyan-400 transition-all duration-500 -z-0"
            style={{
              width: `${(activeStepIndex / (WORKFLOW_STEPS.length - 1)) * 88}%`,
            }}
          />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 relative z-10">
            {WORKFLOW_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const isPast = idx < activeStepIndex;

              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 relative group flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#14141c] border-electric-500 shadow-glow-blue scale-[1.02]'
                      : isPast
                      ? 'bg-[#111116] border-white/10 text-gray-300 hover:border-white/20'
                      : 'bg-[#0f0f14] border-white/[0.06] text-gray-400 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-colors ${
                        isActive
                          ? 'bg-gradient-to-r from-electric-500 to-purple-brand text-white shadow-glow-blue'
                          : isPast
                          ? 'bg-electric-500/20 text-electric-400 border border-electric-500/30'
                          : 'bg-white/[0.05] text-gray-400 border border-white/[0.06]'
                      }`}
                    >
                      {step.step}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 hidden sm:inline">
                      {step.timeframe.split(' ')[0]} {step.timeframe.split(' ')[1] || ''}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 block mb-0.5">
                      {step.phase}
                    </span>
                    <h3
                      className={`text-xs sm:text-sm font-bold truncate ${
                        isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}
                    >
                      {step.title.split('&')[0]}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Deep-Dive Inspector Card */}
        <div className="rounded-3xl bg-[#111116] border border-white/[0.1] p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-300">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-electric-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Description & Metadata */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-electric-500/15 text-electric-400 border border-electric-500/30">
                  STEP {activeStep.step} • {activeStep.badge}
                </span>
                <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5 bg-white/[0.04] px-3 py-1 rounded-full border border-white/[0.06]">
                  <Calendar className="w-3.5 h-3.5 text-purple-soft" />
                  <span>Timeline: {activeStep.timeframe}</span>
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Your Time: {activeStep.clientCommitment}</span>
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  {activeStep.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed">
                  {activeStep.description}
                </p>
              </div>

              {/* Tooling Stack Pills */}
              <div>
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-2">
                  Integrated Production Stack:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeStep.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-lg bg-[#181820] border border-white/[0.06] text-xs font-mono text-gray-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Key Deliverables Checklist Box */}
            <div className="lg:col-span-5 bg-[#16161f] border border-white/[0.08] rounded-2xl p-6 sm:p-7 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-electric-400" />
                  <span>Sprint Deliverables</span>
                </span>
                <span className="text-[11px] font-mono text-electric-400 bg-electric-500/10 px-2.5 py-0.5 rounded-full border border-electric-500/20">
                  Guaranteed
                </span>
              </div>

              <div className="space-y-3">
                {activeStep.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] text-gray-400 font-mono">Full Commercial IP</span>
                <a
                  href="#booking-calendar"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-electric-400 hover:text-white transition-colors"
                >
                  <span>Start with Step 01</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Compass, Lightbulb, PenTool, Rocket, BarChart3 } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    {
      step: '01',
      title: 'Discover',
      subtitle: 'Understanding Your Business & Market',
      desc: 'We conduct an in-depth brand audit to understand your current positioning, target customer avatars, competitive landscape, and key business milestones.',
      icon: Compass,
      color: 'from-blue-500 to-electric-500',
    },
    {
      step: '02',
      title: 'Strategize',
      subtitle: 'Custom Digital Roadmap',
      desc: 'We formulate a tailored action plan: platform allocation, content pillar architecture, visual themes, publishing schedules, and campaign budgets.',
      icon: Lightbulb,
      color: 'from-electric-500 to-indigo-500',
    },
    {
      step: '03',
      title: 'Create',
      subtitle: 'Strategic & AI-Assisted Production',
      desc: 'Our creative team designs high-resolution graphics, produces short-form video edits, drafts persuasive captions, and builds high-converting ad assets.',
      icon: PenTool,
      color: 'from-indigo-500 to-purple-brand',
    },
    {
      step: '04',
      title: 'Execute',
      subtitle: 'Publishing & Campaign Launch',
      desc: 'Upon your direct approval, we schedule monthly content across designated platforms, launch paid campaigns, and manage initial audience engagement.',
      icon: Rocket,
      color: 'from-purple-brand to-pink-500',
    },
    {
      step: '05',
      title: 'Optimize',
      subtitle: 'Data Review & Continuous Growth',
      desc: 'We monitor reach, follower engagement, click-through rates, and inbound inquiries, refining future content to compound organic and paid ROI.',
      icon: BarChart3,
      color: 'from-pink-500 to-electric-500',
    },
  ];

  return (
    <section className="py-24 bg-surface-light border-y border-charcoal-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-100 text-electric-600 text-xs font-semibold mb-3">
            <span>Our Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 tracking-tight">
            How We Turn Creative Strategy Into Predictable Growth
          </h2>
          <p className="mt-4 text-base text-charcoal-700 leading-relaxed">
            A structured, collaborative five-step workflow designed to eliminate guesswork and deliver consistent international brand impact.
          </p>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-6 border border-charcoal-200/80 shadow-sm hover:shadow-card-elevated hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-display font-extrabold text-charcoal-300 group-hover:text-electric-500 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-surface-light group-hover:bg-electric-500 flex items-center justify-center text-charcoal-700 group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-display font-bold text-navy-900 group-hover:text-electric-600 transition-colors">
                    {item.title}
                  </h3>
                  <h4 className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider mt-1 mb-3">
                    {item.subtitle}
                  </h4>
                  <p className="text-xs text-charcoal-700 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-charcoal-100 flex items-center gap-2">
                  <div className={`h-1 w-full rounded-full bg-gradient-to-r ${item.color} opacity-80`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


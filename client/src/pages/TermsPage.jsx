import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 bg-[#070709] min-h-screen text-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-[#111116] rounded-3xl p-8 sm:p-12 border border-white/[0.08] shadow-2xl space-y-6">
          <div className="flex items-center gap-3 pb-6 border-b border-white/[0.08]">
            <div className="w-12 h-12 rounded-2xl bg-purple-brand/20 border border-purple-brand/30 text-purple-brand flex items-center justify-center shadow-glow-purple">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                Terms & Conditions
              </h1>
              <p className="text-xs text-gray-400 font-mono">Last updated: 2026 Edition • Co-Founders: Yashwa & Aroosa</p>
            </div>
          </div>

          <div className="text-gray-300 max-w-none space-y-5 leading-relaxed text-xs sm:text-sm">
            <p>
              Welcome to <strong className="text-white">AJDesigners</strong>. By browsing our website, requesting consultations, or contracting our digital marketing and creative services, you agree to adhere to the following terms and operational standards.
            </p>

            <h3 className="text-base font-display font-bold text-white">1. Nature of Services</h3>
            <p>
              AJDesigners provides creative production, social media management, brand identity design, AI-assisted content creation, digital advertising management, and B2B lead generation consulting. All deliverables and monthly scopes are defined in customized client engagement agreements.
            </p>

            <h3 className="text-base font-display font-bold text-white">2. Client Responsibilities & Asset Approvals</h3>
            <p>
              Clients are responsible for supplying timely brand assets, raw video footage, product specifications, and direct feedback. Monthly calendars and campaign creatives are delivered for client review prior to publishing. Delayed approvals may alter monthly publishing schedules.
            </p>

            <h3 className="text-base font-display font-bold text-white">3. Intellectual Property Rights</h3>
            <p>
              Upon receipt of full payment for completed milestones or monthly retainers, ownership of custom final delivered graphics, edited videos, and copywriting transfers to the client, subject to third-party font and stock licensing terms. AJDesigners retains the right to display completed and concept work within promotional agency portfolios unless explicitly restricted by prior non-disclosure agreements.
            </p>

            <h3 className="text-base font-display font-bold text-white">4. Third-Party Platforms & Performance Disclaimers</h3>
            <p>
              While AJDesigners utilizes tested marketing and creative methodologies, social media algorithms, search engine indexing parameters, and third-party advertising policies (Meta, Google, LinkedIn, TikTok) operate outside our direct control. We do not make unsupported claims of guaranteed rankings, viral outcomes, or specific financial returns.
            </p>

            <h3 className="text-base font-display font-bold text-white">5. Invoicing & Retainer Cancellation</h3>
            <p>
              Monthly retainer fees are invoiced in advance of each 30-day production cycle. Retainers may be cancelled or modified by providing 14 days written notice prior to the subsequent billing anniversary.
            </p>

            <h3 className="text-base font-display font-bold text-white">6. Contact for Service Agreements</h3>
            <p>
              For formal client service master agreements or contract questions, reach out to our legal and operations team at{' '}
              <a href="mailto:contact@ajdesigners.com" className="text-electric-400 font-bold hover:underline">
                contact@ajdesigners.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <div className="pt-24 pb-20 bg-surface-light min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-500 hover:text-navy-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-charcoal-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-6 border-b border-charcoal-200">
            <div className="w-12 h-12 rounded-2xl bg-electric-100 text-electric-600 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900">
                Terms & Conditions
              </h1>
              <p className="text-xs text-charcoal-500">Last updated: November 2026</p>
            </div>
          </div>

          <div className="prose prose-sm text-charcoal-700 max-w-none space-y-5 leading-relaxed text-xs sm:text-sm">
            <p>
              Welcome to <strong>AJDesigners</strong>. By browsing our website, requesting consultations, or contracting our digital marketing and creative services, you agree to adhere to the following terms and operational standards.
            </p>

            <h3 className="text-base font-display font-bold text-navy-900">1. Nature of Services</h3>
            <p>
              AJDesigners provides creative production, social media management, brand identity design, AI-assisted content creation, digital advertising management, and B2B lead generation consulting. All deliverables and monthly scopes are defined in customized client engagement agreements.
            </p>

            <h3 className="text-base font-display font-bold text-navy-900">2. Client Responsibilities & Asset Approvals</h3>
            <p>
              Clients are responsible for supplying timely brand assets, raw video footage, product specifications, and direct feedback. Monthly calendars and campaign creatives are delivered for client review prior to publishing. Delayed approvals may alter monthly publishing schedules.
            </p>

            <h3 className="text-base font-display font-bold text-navy-900">3. Intellectual Property Rights</h3>
            <p>
              Upon receipt of full payment for completed milestones or monthly retainers, ownership of custom final delivered graphics, edited videos, and copywriting transfers to the client, subject to third-party font and stock licensing terms. AJDesigners retains the right to display completed and concept work within promotional agency portfolios unless explicitly restricted by prior non-disclosure agreements.
            </p>

            <h3 className="text-base font-display font-bold text-navy-900">4. Third-Party Platforms & Performance Disclaimers</h3>
            <p>
              While AJDesigners utilizes tested marketing and creative methodologies, social media algorithms, search engine indexing parameters, and third-party advertising policies (Meta, Google, LinkedIn, TikTok) operate outside our direct control. We do not make unsupported claims of guaranteed rankings, viral outcomes, or specific financial returns.
            </p>

            <h3 className="text-base font-display font-bold text-navy-900">5. Invoicing & Retainer Cancellation</h3>
            <p>
              Monthly retainer fees are invoiced in advance of each 30-day production cycle. Retainers may be cancelled or modified by providing 14 days written notice prior to the subsequent billing anniversary.
            </p>

            <h3 className="text-base font-display font-bold text-navy-900">6. Contact for Service Agreements</h3>
            <p>
              For formal contracts, master service agreements, or billing inquiries, please contact our legal and administrative team at{' '}
              <a href="mailto:contact@ajdesigners.com" className="text-electric-600 font-bold hover:underline">
                contact@ajdesigners.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


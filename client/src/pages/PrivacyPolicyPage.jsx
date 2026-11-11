import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicyPage() {
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
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900">
                Privacy Policy
              </h1>
              <p className="text-xs text-charcoal-500">Last updated: November 2026</p>
            </div>
          </div>

          <div className="prose prose-sm text-charcoal-700 max-w-none space-y-5 leading-relaxed text-xs sm:text-sm">
            <p>
              At <strong>AJDesigners</strong>, we respect your privacy and are committed to protecting personal data submitted through our website and service interactions. This Privacy Policy outlines our procedures regarding the collection, use, and safeguarding of information when you access our digital portal.
            </p>

            <h3 className="text-base font-display font-bold text-navy-900">1. Information We Collect</h3>
            <p>
              When submitting inquiries through our contact forms or scheduling consultations, we collect information including your full name, business entity name, work email address, country of residence, website URL, estimated budget, and project brief descriptions.
            </p>

            <h3 className="text-base font-display font-bold text-navy-900">2. How We Use Collected Information</h3>
            <p>
              The information you provide is utilized exclusively to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Review your business requirements and prepare customized service recommendations.</li>
              <li>Communicate directly regarding project inquiries, proposals, and scheduling.</li>
              <li>Deliver agreed digital marketing, creative production, and social media deliverables.</li>
              <li>Maintain operational client records and verify invoicing communications.</li>
            </ul>

            <h3 className="text-base font-display font-bold text-navy-900">3. Non-Disclosure & Data Protection</h3>
            <p>
              We do not sell, rent, or trade your contact information or project briefs to third-party advertisers. Information is accessed only by authorized team members directly responsible for managing your campaign or relationship.
            </p>

            <h3 className="text-base font-display font-bold text-navy-900">4. Cookies & Website Analytics</h3>
            <p>
              Our website may utilize essential operational cookies and anonymized performance analytics to assess page traffic speed, ensure responsive rendering, and prevent fraudulent form spam. You can manage or disable cookie preferences via your web browser settings.
            </p>

            <h3 className="text-base font-display font-bold text-navy-900">5. International Data Transfers</h3>
            <p>
              Because AJDesigners serves international clients across the US, UK, Canada, Australia, UAE, and Europe, project communications are processed through secure global cloud infrastructure adhering to international data security best practices.
            </p>

            <h3 className="text-base font-display font-bold text-navy-900">6. Inquiries & Updates</h3>
            <p>
              For questions regarding our privacy practices or to request data modification or removal, contact our data administration team at{' '}
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


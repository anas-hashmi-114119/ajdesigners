import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Globe2,
  MessageSquare,
} from 'lucide-react';
import { inquiryAPI, settingsAPI } from '../services/api';

export default function ContactPage() {
  const [searchParams] = useSearchParams();

  const preselectedService = searchParams.get('service') || '';
  const preselectedType = searchParams.get('type') || 'B2B';
  const preselectedBudget = searchParams.get('budget') || '';
  const preselectedNotes = searchParams.get('notes') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    workEmail: '',
    country: 'United States',
    websiteUrl: '',
    serviceRequired: preselectedService || 'Social Media Management',
    businessType: preselectedType || 'B2B',
    estimatedBudget: preselectedBudget || '$500 - $1,000',
    projectDescription: preselectedNotes || '',
    preferredContactMethod: 'Email',
  });

  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    settingsAPI
      .get()
      .then((res) => {
        if (res.data.success) {
          setSettings(res.data.settings);
        }
      })
      .catch((err) => console.error('Error fetching settings:', err));
  }, []);

  const serviceOptions = [
    'Social Media Management',
    'Content Creation',
    'AI-Powered Creative Production',
    'Graphic Design & Branding',
    'Short-Form Video & Reels Creation',
    'Digital Advertising & Paid Campaigns',
    'B2B Lead Generation',
    'LinkedIn Marketing & Executive Branding',
    'Website & Landing Page Content',
    'SEO & Digital Content Optimization',
    'Custom Marketing Retainer',
    'Standalone Creative Assets',
  ];

  const countries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'United Arab Emirates',
    'Germany',
    'France',
    'Netherlands',
    'Switzerland',
    'Ireland',
    'New Zealand',
    'Singapore',
    'Other International Market',
  ];

  const budgetOptions = [
    '$199 - $399 (Starter / Small Scope)',
    '$399 - $699 (Growth Plan / Standard)',
    '$699 - $1,500 (Pro Retainer)',
    '$1,500 - $3,000 (Multi-Platform / Full Scale)',
    '$3,000+ (Comprehensive Enterprise)',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.businessName.trim()) {
      setErrorMessage('Please enter your business or company name.');
      return;
    }
    if (!formData.workEmail.trim() || !/\S+@\S+\.\S+/.test(formData.workEmail)) {
      setErrorMessage('Please enter a valid work email address.');
      return;
    }
    if (!formData.projectDescription.trim()) {
      setErrorMessage('Please provide a brief description of your project or marketing objectives.');
      return;
    }

    setLoading(true);

    try {
      const res = await inquiryAPI.submit(formData);
      if (res.data.success) {
        setSuccessData({
          referenceId: res.data.referenceId,
          name: formData.fullName,
          email: formData.workEmail,
          service: formData.serviceRequired,
        });
      } else {
        setErrorMessage(res.data.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Inquiry submission error:', err);
      const msg = err.response?.data?.message || 'Unable to connect to the server. Please try again.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24">
      {/* 1. HERO SECTION */}
      <section className="py-20 lg:py-24 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-electric-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-brand/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-electric-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consultation & Project Inquiry</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight">
            Let's Start Your Digital Journey.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-charcoal-300 leading-relaxed">
            Have a project in mind? We would love to understand your requirements and explore how AJDesigners can support your business goals.
          </p>
        </div>
      </section>

      {/* 2. FORM & CONTACT DETAILS */}
      <section className="py-20 bg-surface-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Interactive Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-charcoal-200/80 shadow-card-elevated">
              {successData ? (
                <div className="py-12 text-center space-y-5 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <h3 className="text-2xl font-display font-extrabold text-navy-900">
                    Thank You, {successData.name}!
                  </h3>

                  <p className="text-sm text-charcoal-700 max-w-md mx-auto leading-relaxed">
                    Your inquiry regarding <strong>{successData.service}</strong> has been received by the AJDesigners team.
                  </p>

                  <div className="p-4 rounded-2xl bg-surface-light border border-charcoal-200 max-w-sm mx-auto text-xs text-charcoal-600">
                    <div>Reference ID: <span className="font-mono font-bold text-navy-900">{successData.referenceId}</span></div>
                    <div className="mt-1">Confirmation sent to: <span className="font-medium text-navy-900">{successData.email}</span></div>
                  </div>

                  <p className="text-xs text-charcoal-500 pt-2">
                    Our strategic team will review your requirements and reach out within 24 business hours.
                  </p>

                  <button
                    onClick={() => {
                      setSuccessData(null);
                      setFormData({
                        fullName: '',
                        businessName: '',
                        workEmail: '',
                        country: 'United States',
                        websiteUrl: '',
                        serviceRequired: 'Social Media Management',
                        businessType: 'B2B',
                        estimatedBudget: '$500 - $1,000',
                        projectDescription: '',
                        preferredContactMethod: 'Email',
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold text-navy-900 bg-charcoal-100 hover:bg-charcoal-200 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-xl font-display font-bold text-navy-900">
                      Project Inquiry Details
                    </h2>
                    <p className="text-xs text-charcoal-500 mt-1">
                      Complete the fields below so we can prepare tailored recommendations for your discovery session.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name and Business Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-3 rounded-xl bg-surface-light border border-charcoal-200 text-xs focus:outline-none focus:border-electric-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                        Business Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="e.g. Acme Tech Solutions"
                        className="w-full px-4 py-3 rounded-xl bg-surface-light border border-charcoal-200 text-xs focus:outline-none focus:border-electric-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Work Email & Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                        Work Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleChange}
                        placeholder="name@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-surface-light border border-charcoal-200 text-xs focus:outline-none focus:border-electric-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                        Country / Market <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-surface-light border border-charcoal-200 text-xs focus:outline-none focus:border-electric-500"
                      >
                        {countries.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Website URL & Business Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                        Website or Social Profile <span className="text-charcoal-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="websiteUrl"
                        value={formData.websiteUrl}
                        onChange={handleChange}
                        placeholder="https://yourwebsite.com"
                        className="w-full px-4 py-3 rounded-xl bg-surface-light border border-charcoal-200 text-xs focus:outline-none focus:border-electric-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                        Business Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-surface-light border border-charcoal-200 text-xs focus:outline-none focus:border-electric-500"
                      >
                        <option value="B2B">B2B (Startups, SaaS, Consulting, Enterprise)</option>
                        <option value="B2C">B2C (Fashion, E-commerce, Beauty, Lifestyle)</option>
                        <option value="Other">Other / Personal Brand</option>
                      </select>
                    </div>
                  </div>

                  {/* Service Required & Estimated Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                        Primary Service Required <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="serviceRequired"
                        value={formData.serviceRequired}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-surface-light border border-charcoal-200 text-xs focus:outline-none focus:border-electric-500 font-medium text-navy-900"
                      >
                        {serviceOptions.map((srv) => (
                          <option key={srv} value={srv}>{srv}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                        Estimated Budget <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="estimatedBudget"
                        value={formData.estimatedBudget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-surface-light border border-charcoal-200 text-xs focus:outline-none focus:border-electric-500"
                      >
                        {budgetOptions.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-2">
                      Preferred Communication Method:
                    </label>
                    <div className="flex flex-wrap gap-4 text-xs font-medium text-charcoal-700">
                      {['Email', 'WhatsApp', 'Phone'].map((method) => (
                        <label key={method} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="preferredContactMethod"
                            value={method}
                            checked={formData.preferredContactMethod === method}
                            onChange={handleChange}
                            className="text-electric-600 focus:ring-electric-500"
                          />
                          <span>{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                      Project Description & Business Goals <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="projectDescription"
                      rows={4}
                      value={formData.projectDescription}
                      onChange={handleChange}
                      placeholder="Tell us about your brand, current challenges, timeline, and what you aim to achieve..."
                      className="w-full px-4 py-3 rounded-xl bg-surface-light border border-charcoal-200 text-xs focus:outline-none focus:border-electric-500 leading-relaxed"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-full text-xs font-bold text-white bg-gradient-to-r from-electric-500 to-purple-brand shadow-glow-blue hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>Submitting Your Inquiry...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Your Project Inquiry</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-charcoal-500 text-center mt-3">
                      We respect your privacy. Your information is protected and never shared with third parties.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Contact Details & International Operations */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Info Card */}
              <div className="bg-navy-900 text-white rounded-3xl p-8 border border-white/10 shadow-xl space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-electric-400">
                    Official Communication
                  </span>
                  <h3 className="text-2xl font-display font-extrabold mt-1">
                    Connect With AJDesigners
                  </h3>
                  <p className="text-xs text-charcoal-300 mt-2 leading-relaxed">
                    We collaborate with clients through remote video strategy sessions, shared task boards, and structured weekly deliverables.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <Mail className="w-5 h-5 text-electric-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white">Official Business Email</div>
                      <a href="mailto:contact@ajdesigners.com" className="text-charcoal-300 hover:text-white">
                        contact@ajdesigners.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <MessageSquare className="w-5 h-5 text-purple-brand shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white">WhatsApp Client Support</div>
                      <span className="text-charcoal-300">
                        {settings?.whatsappNumber || '+1 (555) 019-2834 (Official Business WhatsApp)'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <Globe2 className="w-5 h-5 text-electric-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white">Target Regions Served</div>
                      <span className="text-charcoal-300 leading-relaxed block">
                        United States, United Kingdom, Canada, Australia, United Arab Emirates, and Europe.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 text-[11px] text-charcoal-400">
                  <span>Standard Response Time: </span>
                  <span className="text-white font-semibold">Under 24 hours on business days</span>
                </div>
              </div>

              {/* What Happens Next Card */}
              <div className="bg-white rounded-3xl p-8 border border-charcoal-200/80 shadow-sm">
                <h4 className="text-sm font-display font-bold text-navy-900 mb-3">
                  What Happens After You Inquire?
                </h4>
                <div className="space-y-3 text-xs text-charcoal-700">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-electric-100 text-electric-600 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      1
                    </span>
                    <span>We audit your current brand presence and social profiles.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-electric-100 text-electric-600 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      2
                    </span>
                    <span>Our strategy team schedules a 20-minute video discovery consultation.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-electric-100 text-electric-600 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      3
                    </span>
                    <span>We deliver a customized monthly proposal and launch roadmap.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


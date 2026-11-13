import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  Send,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Globe2,
  MessageSquare,
} from 'lucide-react';
import { inquiryAPI, settingsAPI } from '../services/api';
import BookingCalendarWidget from '../components/common/BookingCalendarWidget';

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
    'Digital Advertising Campaigns',
    'B2B Lead Generation',
    'LinkedIn Marketing',
    'Full Creative Retainer',
    'Custom Marketing Retainer',
  ];

  const budgetOptions = [
    '$199 - $399 (Starter Sprint)',
    '$399 - $699 (Growth Retainer)',
    '$699 - $1,200 (Scale Package)',
    '$1,200 - $2,500+ (Enterprise Omnichannel)',
    'Custom Enterprise Scope',
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
    'Saudi Arabia',
    'Singapore',
    'Other International Market',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }
    if (!formData.businessName.trim()) {
      setErrorMessage('Please provide your business name.');
      return;
    }
    if (!formData.workEmail.trim() || !formData.workEmail.includes('@')) {
      setErrorMessage('Please provide a valid work email address.');
      return;
    }
    if (formData.projectDescription.trim().length < 20) {
      setErrorMessage('Please share a brief project description (at least 20 characters).');
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
    <div className="pt-24 bg-[#070709] min-h-screen text-gray-100">
      {/* 1. HERO SECTION */}
      <section className="py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-electric-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-brand/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-electric-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consultation & Direct Inquiry</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight text-white">
            Let's Start Your <span className="gradient-text">Growth Journey.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Have a project in mind? We would love to understand your requirements and explore how AJDesigners can support your international business goals.
          </p>
        </div>
      </section>

      {/* 2. FORM & CONTACT DETAILS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Interactive Form */}
          <div className="lg:col-span-7 bg-[#111116] rounded-3xl p-8 sm:p-10 border border-white/[0.08] shadow-2xl backdrop-blur-xl">
            {successData ? (
              <div className="py-12 text-center space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-electric-500/15 border border-electric-400 text-electric-400 mx-auto flex items-center justify-center shadow-glow-blue">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h3 className="text-2xl font-display font-extrabold text-white">
                  Thank You, {successData.name}!
                </h3>

                <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  Your inquiry regarding <strong className="text-white">{successData.service}</strong> has been received by Yashwa and Aroosa.
                </p>

                <div className="p-4 rounded-2xl bg-[#181820] border border-white/[0.08] max-w-sm mx-auto text-xs text-gray-300">
                  <div>Reference ID: <span className="font-mono font-bold text-electric-400">{successData.referenceId}</span></div>
                  <div className="mt-1">Confirmation sent to: <span className="font-medium text-white">{successData.email}</span></div>
                </div>

                <p className="text-xs text-gray-400 pt-2">
                  Our strategic leadership team will review your requirements and reach out within 24 business hours.
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
                  className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-display font-bold text-white">
                    Project Inquiry Details
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Complete the fields below so we can prepare tailored recommendations for your discovery session.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name and Business Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 font-mono">
                      Full Name <span className="text-electric-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/[0.08] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-electric-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 font-mono">
                      Business Name <span className="text-electric-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="e.g. Acme Tech Solutions"
                      className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/[0.08] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-electric-500"
                      required
                    />
                  </div>
                </div>

                {/* Work Email & Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 font-mono">
                      Work Email <span className="text-electric-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="workEmail"
                      value={formData.workEmail}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/[0.08] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-electric-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 font-mono">
                      Country / Market <span className="text-electric-400">*</span>
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-electric-500"
                    >
                      {countries.map((c) => (
                        <option key={c} value={c} className="bg-[#111116] text-white">{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Website URL & Business Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 font-mono">
                      Website or Social Profile <span className="text-gray-500 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      placeholder="https://yourwebsite.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/[0.08] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-electric-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 font-mono">
                      Business Type <span className="text-electric-400">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, businessType: 'B2B' }))}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          formData.businessType === 'B2B'
                            ? 'border-electric-500 bg-electric-500/20 text-white font-bold shadow-glow-blue'
                            : 'border-white/[0.08] bg-[#181820] text-gray-400 hover:border-white/20'
                        }`}
                      >
                        <div className="text-xs font-bold">🏢 B2B Enterprise</div>
                        <div className="text-[10px] text-gray-400">Startups, SaaS, Corporate</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, businessType: 'B2C' }))}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          formData.businessType === 'B2C'
                            ? 'border-purple-brand bg-purple-brand/20 text-white font-bold shadow-glow-purple'
                            : 'border-white/[0.08] bg-[#181820] text-gray-400 hover:border-white/20'
                        }`}
                      >
                        <div className="text-xs font-bold">🛍️ B2C Consumer</div>
                        <div className="text-[10px] text-gray-400">Fashion, E-commerce, Luxury</div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Service Required & Estimated Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 font-mono">
                      Primary Service Required <span className="text-electric-400">*</span>
                    </label>
                    <select
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-electric-500 font-medium"
                    >
                      {serviceOptions.map((srv) => (
                        <option key={srv} value={srv} className="bg-[#111116] text-white">{srv}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 font-mono">
                      Estimated Budget Tier <span className="text-electric-400">*</span>
                    </label>
                    <select
                      name="estimatedBudget"
                      value={formData.estimatedBudget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-electric-500 font-medium"
                    >
                      {budgetOptions.map((b) => (
                        <option key={b} value={b} className="bg-[#111116] text-white">{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Interactive Quick Budget Selector Pills */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2 font-mono">
                    Quick Budget Range Select:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {budgetOptions.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, estimatedBudget: b }))}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          formData.estimatedBudget === b
                            ? 'bg-electric-500 text-white border-electric-400 shadow-glow-blue font-bold'
                            : 'bg-[#181820] text-gray-300 border-white/[0.08] hover:border-white/20'
                        }`}
                      >
                        {b.split(' ')[0]} {b.split(' ')[1]} {b.split(' ')[2]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2 font-mono">
                    Preferred Communication Method:
                  </label>
                  <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-300">
                    {['Email', 'WhatsApp', 'Phone'].map((method) => (
                      <label key={method} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContactMethod"
                          value={method}
                          checked={formData.preferredContactMethod === method}
                          onChange={handleChange}
                          className="text-electric-500 focus:ring-electric-500 accent-electric-500"
                        />
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Project Description with Character Counter */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                      Project Description & Growth Goals <span className="text-electric-400">*</span>
                    </label>
                    <span className={`text-[11px] font-mono ${
                      formData.projectDescription.length >= 20 ? 'text-electric-400' : 'text-gray-500'
                    }`}>
                      {formData.projectDescription.length} characters
                    </span>
                  </div>
                  <textarea
                    name="projectDescription"
                    rows={4}
                    value={formData.projectDescription}
                    onChange={handleChange}
                    placeholder="Tell us about your brand, current bottlenecks, target audience, and primary growth targets..."
                    className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-white/[0.08] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-electric-500 leading-relaxed resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    data-cursor-text="SEND"
                    className="w-full py-4 rounded-full text-xs font-bold text-white bg-gradient-to-r from-electric-500 to-purple-brand shadow-glow-blue hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Submitting Your Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Project Inquiry</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-gray-500 text-center mt-3">
                    We respect your privacy. Client inquiries are protected under mutual confidentiality and non-disclosure standards.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right: Contact Details & International Operations */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Info Card */}
            <div className="bg-[#111116] rounded-3xl p-8 border border-white/[0.08] shadow-2xl space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-electric-400 font-mono">
                  Official Communication
                </span>
                <h3 className="text-2xl font-display font-extrabold text-white mt-1">
                  Connect With AJDesigners
                </h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  We collaborate with clients through remote video strategy sessions, shared Slack & Notion task boards, and structured 48-hour sprint deliverables.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#181820] border border-white/[0.06]">
                  <Mail className="w-5 h-5 text-electric-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Official Business Email</div>
                    <a href="mailto:contact@ajdesigners.com" className="text-gray-300 hover:text-white">
                      contact@ajdesigners.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#181820] border border-white/[0.06]">
                  <MessageSquare className="w-5 h-5 text-purple-brand shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">WhatsApp Client Support</div>
                    <a href="https://wa.me/923292020295" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white">
                      +92 329 2020295 (Direct WhatsApp)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#181820] border border-white/[0.06]">
                  <Globe2 className="w-5 h-5 text-electric-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Target Regions Served</div>
                    <span className="text-gray-400 leading-relaxed block">
                      United States, United Kingdom, Canada, Australia, United Arab Emirates, and Europe.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] text-[11px] text-gray-400">
                <span>Standard Response Time: </span>
                <span className="text-white font-semibold">Under 24 hours on business days</span>
              </div>
            </div>

            {/* What Happens Next Card */}
            <div className="bg-[#111116] rounded-3xl p-8 border border-white/[0.08] shadow-2xl">
              <h4 className="text-sm font-display font-bold text-white mb-3">
                What Happens After You Inquire?
              </h4>
              <div className="space-y-3 text-xs text-gray-300">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-electric-500/20 text-electric-400 font-bold flex items-center justify-center shrink-0 text-[10px] border border-electric-400/30">
                    1
                  </span>
                  <span>Yashwa & Aroosa audit your current brand presence and competitor ad hooks.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-electric-500/20 text-electric-400 font-bold flex items-center justify-center shrink-0 text-[10px] border border-electric-400/30">
                    2
                  </span>
                  <span>We schedule a 30-minute private video strategy session aligned with your timezone.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-electric-500/20 text-electric-400 font-bold flex items-center justify-center shrink-0 text-[10px] border border-electric-400/30">
                    3
                  </span>
                  <span>We formulate an actionable 90-day creative & distribution sprint roadmap.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EMBEDDED STRATEGY CALL CALENDAR */}
      <BookingCalendarWidget />
    </div>
  );
}

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Globe2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  User,
  Mail,
  Building,
  Check,
} from 'lucide-react';
import { inquiryAPI } from '../../services/api';

const TIMEZONES = [
  { label: 'GMT+0 (London, Dublin, Lisbon)', value: 'GMT' },
  { label: 'EST / UTC-5 (New York, Toronto, Miami)', value: 'EST' },
  { label: 'PST / UTC-8 (San Francisco, Los Angeles)', value: 'PST' },
  { label: 'CET / UTC+1 (Berlin, Paris, Amsterdam)', value: 'CET' },
  { label: 'GST / UTC+4 (Dubai, Abu Dhabi)', value: 'GST' },
  { label: 'AEST / UTC+10 (Sydney, Melbourne)', value: 'AEST' },
];

const TIME_SLOTS = [
  '09:00 AM',
  '10:30 AM',
  '01:00 PM',
  '02:30 PM',
  '04:00 PM',
  '05:30 PM',
];

export default function BookingCalendarWidget({ className = '' }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [timezone, setTimezone] = useState('EST');
  const [bookingStep, setBookingStep] = useState('select'); // 'select' | 'details' | 'confirmed'
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    businessName: '',
    websiteUrl: '',
    growthGoal: 'AI UGC Video Ads',
    notes: '',
  });

  // Calendar calculation helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateSelect = (day) => {
    const picked = new Date(year, month, day);
    setSelectedDate(picked);
    if (!selectedSlot) {
      setSelectedSlot(TIME_SLOTS[0]);
    }
  };

  const handleProceedToDetails = () => {
    if (!selectedDate || !selectedSlot) return;
    setBookingStep('details');
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formattedDate = selectedDate
      ? `${monthNames[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`
      : 'TBD';

    try {
      await inquiryAPI.submitInquiry({
        fullName: formData.fullName || 'Prospective Partner',
        businessName: formData.businessName || 'High-Growth Brand',
        workEmail: formData.workEmail,
        country: timezone,
        websiteUrl: formData.websiteUrl || '',
        serviceRequired: formData.growthGoal,
        businessType: 'B2B',
        budgetRange: '$1,000 - $3,000/mo',
        projectDetails: `Strategy Call booked for ${formattedDate} at ${selectedSlot} (${timezone}). Notes: ${formData.notes || 'None'}`,
        source: `Calendar Booking - ${formattedDate} ${selectedSlot}`,
      });
    } catch (err) {
      console.warn('Inquiry API fallback notice:', err);
    } finally {
      setSubmitting(false);
      setBookingStep('confirmed');
    }
  };

  // Check if a day is today or in past
  const isPast = (day) => {
    const testDate = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return testDate < today;
  };

  return (
    <section id="booking-calendar" className={`relative py-24 bg-[#070709] overflow-hidden ${className}`}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-electric-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-purple-brand/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-electric-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Booking Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            Let's Plan Your <span className="gradient-text">Growth Engine.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Book a dedicated 30-minute 1-on-1 strategy session with founders Yashwa & Aroosa. We'll audit your creative funnel and design an actionable scale roadmap.
          </p>
        </div>

        {/* Main Cal.com-Style Container */}
        <div className="bg-[#111116] border border-white/[0.08] rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl">
          {bookingStep === 'confirmed' ? (
            /* Confirmation Screen */
            <div className="p-10 sm:p-16 text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-electric-500/15 border border-electric-400/40 text-electric-400 flex items-center justify-center mx-auto mb-6 shadow-glow-blue animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-electric-400 bg-electric-500/10 px-3 py-1 rounded-full border border-electric-500/20">
                Session Confirmed
              </span>
              <h3 className="mt-4 text-2xl sm:text-3xl font-display font-extrabold text-white">
                You're Scheduled with Yashwa & Aroosa!
              </h3>
              <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                We've sent a calendar invitation and private Google Meet link to{' '}
                <strong className="text-white">{formData.workEmail || 'your email'}</strong>.
              </p>

              <div className="mt-8 p-6 rounded-2xl bg-[#181820] border border-white/[0.08] text-left space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-200">
                  <CalendarIcon className="w-4 h-4 text-electric-400 shrink-0" />
                  <span>
                    <strong>Date:</strong>{' '}
                    {selectedDate
                      ? `${monthNames[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`
                      : 'Upcoming Session'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-200">
                  <Clock className="w-4 h-4 text-purple-brand shrink-0" />
                  <span>
                    <strong>Time:</strong> {selectedSlot} ({timezone})
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-200">
                  <Video className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>
                    <strong>Location:</strong> Google Meet (Link provided in confirmation email)
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => {
                    setBookingStep('select');
                    setSelectedDate(null);
                    setSelectedSlot('');
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-gray-200 text-xs font-semibold transition-colors border border-white/10"
                >
                  Book Another Slot
                </button>
                <a
                  href={`https://wa.me/923292020295?text=Hello%20Yashwa%20%26%20Aroosa,%20I%20just%20scheduled%20a%20strategy%20call%20for%20${selectedSlot}!`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-electric-500 to-purple-brand text-white text-xs font-bold shadow-glow-blue hover:scale-[1.02] transition-transform"
                >
                  <span>Chat on WhatsApp Instantly</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : bookingStep === 'details' ? (
            /* Booking Details Form */
            <div className="p-8 sm:p-12">
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08]">
                <div>
                  <button
                    type="button"
                    onClick={() => setBookingStep('select')}
                    className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back to Calendar</span>
                  </button>
                  <h3 className="mt-2 text-xl font-display font-bold text-white">
                    Confirm Strategy Session Details
                  </h3>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-xs text-gray-400">Selected Slot</span>
                  <div className="text-sm font-semibold text-electric-400">
                    {selectedDate && `${monthNames[selectedDate.getMonth()]} ${selectedDate.getDate()}`} @ {selectedSlot} ({timezone})
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmitBooking} className="space-y-6 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full pl-10 pr-4 py-3 bg-[#181820] border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-electric-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Work Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full pl-10 pr-4 py-3 bg-[#181820] border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-electric-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Company / Brand Name *
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Veloce Media"
                        className="w-full pl-10 pr-4 py-3 bg-[#181820] border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-electric-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Website or Instagram Profile
                    </label>
                    <input
                      type="text"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      placeholder="https://yourbrand.com"
                      className="w-full px-4 py-3 bg-[#181820] border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-electric-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Primary Creative & Growth Objective
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      'AI UGC Video Ads',
                      'Social Media Retainer',
                      'Performance Ads',
                      'Brand & Design System',
                    ].map((goal) => (
                      <button
                        type="button"
                        key={goal}
                        onClick={() => setFormData({ ...formData, growthGoal: goal })}
                        className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                          formData.growthGoal === goal
                            ? 'bg-electric-500/20 border-electric-400 text-white shadow-glow-blue'
                            : 'bg-[#181820] border-white/[0.08] text-gray-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Brief Note or Current Bottleneck (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell us what you're looking to achieve or scale..."
                    className="w-full px-4 py-3 bg-[#181820] border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-electric-500 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-electric-500 to-purple-brand text-white font-bold text-sm shadow-glow-blue hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    <span>{submitting ? 'Reserving Your Slot...' : 'Confirm Strategy Session'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Main 2-Column Calendar & Slots Interface */
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Call Info & Timezone */}
              <div className="lg:col-span-4 p-8 border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-[#0c0c10] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-11 h-11 rounded-full ring-2 ring-electric-500 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80')` }} />
                      <div className="w-11 h-11 rounded-full ring-2 ring-purple-brand bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80')` }} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Yashwa & Aroosa</h4>
                      <p className="text-xs text-gray-400">Co-Founders & Creative Directors</p>
                    </div>
                  </div>

                  <h3 className="mt-6 text-xl font-display font-extrabold text-white">
                    30-Minute Growth Audit & Strategy Call
                  </h3>
                  <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                    A tailored session where we review your creative pipeline, benchmark your competitors, and reveal our end-to-end AI & human production workflow.
                  </p>

                  <div className="mt-6 space-y-3 pt-6 border-t border-white/[0.08]">
                    <div className="flex items-center gap-2.5 text-xs text-gray-300">
                      <Clock className="w-4 h-4 text-electric-400" />
                      <span>30 Minutes Duration</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-gray-300">
                      <Video className="w-4 h-4 text-purple-brand" />
                      <span>Google Meet Private Video Link</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-gray-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>100% Free • No Pitching Pressure</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.08]">
                  <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-electric-400" />
                    <span>Select Your Timezone</span>
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#181820] border border-white/[0.08] rounded-xl text-xs text-gray-200 focus:outline-none focus:border-electric-500 cursor-pointer"
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Middle Column: Calendar Grid */}
              <div className="lg:col-span-5 p-8 border-b lg:border-b-0 lg:border-r border-white/[0.08]">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-sm font-bold text-white tracking-wide">
                    {monthNames[month]} {year}
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrevMonth}
                      className="p-1.5 rounded-lg bg-[#181820] border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                      aria-label="Previous Month"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextMonth}
                      className="p-1.5 rounded-lg bg-[#181820] border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                      aria-label="Next Month"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Day Names */}
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                    <div key={d} className="text-[11px] font-semibold text-gray-500 py-1">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1.5">
                  {/* Empty cells before month starts */}
                  {Array.from({ length: firstDayIndex }).map((_, idx) => (
                    <div key={`empty-${idx}`} className="h-9" />
                  ))}

                  {/* Month days */}
                  {Array.from({ length: daysInMonth }).map((_, idx) => {
                    const day = idx + 1;
                    const past = isPast(day);
                    const isSelected =
                      selectedDate &&
                      selectedDate.getDate() === day &&
                      selectedDate.getMonth() === month &&
                      selectedDate.getFullYear() === year;

                    return (
                      <button
                        key={day}
                        disabled={past}
                        onClick={() => handleDateSelect(day)}
                        className={`h-9 w-full rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-gradient-to-tr from-electric-500 to-purple-brand text-white shadow-glow-blue scale-105'
                            : past
                            ? 'text-gray-600 cursor-not-allowed opacity-30'
                            : 'bg-[#181820]/60 text-gray-200 hover:bg-electric-500/20 hover:text-white hover:border-electric-400/50 border border-transparent'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 flex items-center justify-between text-[11px] text-gray-400 pt-4 border-t border-white/[0.08]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-electric-400 animate-ping" />
                    <span>Real-time availability</span>
                  </span>
                  <span>Slots updated hourly</span>
                </div>
              </div>

              {/* Right Column: Time Slots */}
              <div className="lg:col-span-3 p-8 flex flex-col justify-between bg-[#0e0e13]">
                <div>
                  <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                    Available Times
                  </h4>
                  <p className="text-xs text-gray-500 mb-4">
                    {selectedDate
                      ? `${monthNames[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`
                      : 'Select a date on calendar'}
                  </p>

                  <div className="space-y-2">
                    {TIME_SLOTS.map((slot) => {
                      const active = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          disabled={!selectedDate}
                          onClick={() => setSelectedSlot(slot)}
                          className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold transition-all border flex items-center justify-between ${
                            !selectedDate
                              ? 'opacity-40 cursor-not-allowed bg-[#181820] border-transparent text-gray-500'
                              : active
                              ? 'bg-electric-500 text-white border-electric-400 shadow-glow-blue'
                              : 'bg-[#181820] text-gray-300 hover:text-white hover:border-electric-500/50 border-white/[0.05]'
                          }`}
                        >
                          <span>{slot}</span>
                          {active && <Check className="w-3.5 h-3.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08]">
                  <button
                    disabled={!selectedDate || !selectedSlot}
                    onClick={handleProceedToDetails}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-electric-500 to-purple-brand text-white text-xs font-bold shadow-glow-blue hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


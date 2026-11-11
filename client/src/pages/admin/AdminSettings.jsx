import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { settingsAPI } from '../../services/api';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    businessName: 'AJDesigners',
    tagline: 'Creative Minds. Digital Growth.',
    officialEmail: 'contact@ajdesigners.com',
    supportEmail: 'hello@ajdesigners.com',
    whatsappNumber: '+1 (555) 019-2834',
    phone: '+1 (555) 019-2834',
    address: 'Remote Global Studio Operations',
    socialLinks: {
      instagram: 'https://instagram.com/ajdesigners',
      facebook: 'https://facebook.com/ajdesigners',
      linkedin: 'https://linkedin.com/company/ajdesigners',
      tiktok: 'https://tiktok.com/@ajdesigners',
      youtube: 'https://youtube.com/@ajdesigners',
    },
    metaDefaults: {
      siteTitle: 'AJDesigners | Creative Minds. Digital Growth.',
      siteDescription: 'AJDesigners is an international digital marketing and creative agency...',
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    settingsAPI
      .get()
      .then((res) => {
        if (res.data.success && res.data.settings) {
          setSettings(res.data.settings);
        }
      })
      .catch((err) => console.error('Error fetching settings:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await settingsAPI.update(settings);
      if (res.data.success) {
        setMessage('Agency configurations successfully saved.');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error saving settings:', err);
      alert('Failed to save settings: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-xs text-charcoal-500">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900">
          Global Agency Settings
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
          Configure business contact details, social profile handles, and default SEO values.
        </p>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-charcoal-200/80 shadow-sm space-y-4">
          <h2 className="text-base font-display font-bold text-navy-900 pb-3 border-b border-charcoal-100 flex items-center gap-2">
            <Mail className="w-4 h-4 text-electric-600" />
            <span>Contact Information</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold uppercase text-charcoal-700 mb-1">Official Business Email</label>
              <input
                type="email"
                name="officialEmail"
                value={settings.officialEmail || ''}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-charcoal-700 mb-1">Support Email</label>
              <input
                type="email"
                name="supportEmail"
                value={settings.supportEmail || ''}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-charcoal-700 mb-1">WhatsApp Contact Number</label>
              <input
                type="text"
                name="whatsappNumber"
                value={settings.whatsappNumber || ''}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-charcoal-700 mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={settings.phone || ''}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold uppercase text-charcoal-700 mb-1">Operations / Studio Note</label>
            <input
              type="text"
              name="address"
              value={settings.address || ''}
              onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-charcoal-200/80 shadow-sm space-y-4">
          <h2 className="text-base font-display font-bold text-navy-900 pb-3 border-b border-charcoal-100 flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-brand" />
            <span>Social Profile URLs</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold uppercase text-charcoal-700 mb-1">Instagram URL</label>
              <input
                type="text"
                name="instagram"
                value={settings.socialLinks?.instagram || ''}
                onChange={handleSocialChange}
                className="w-full px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-charcoal-700 mb-1">LinkedIn Company URL</label>
              <input
                type="text"
                name="linkedin"
                value={settings.socialLinks?.linkedin || ''}
                onChange={handleSocialChange}
                className="w-full px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-charcoal-700 mb-1">Facebook Page URL</label>
              <input
                type="text"
                name="facebook"
                value={settings.socialLinks?.facebook || ''}
                onChange={handleSocialChange}
                className="w-full px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-charcoal-700 mb-1">TikTok URL</label>
              <input
                type="text"
                name="tiktok"
                value={settings.socialLinks?.tiktok || ''}
                onChange={handleSocialChange}
                className="w-full px-3 py-2 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-electric-500 to-purple-brand shadow-glow-blue hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}


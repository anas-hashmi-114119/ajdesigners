import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, Mail, Phone, MapPin, Globe, Lock, ShieldCheck, Key, AlertCircle } from 'lucide-react';
import { settingsAPI, authAPI } from '../../services/api';

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

  // Password state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
    setPasswordError('');
    setPasswordMessage('');
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordMessage('');

    if (!passwordForm.currentPassword) {
      setPasswordError('Please enter your current password.');
      return;
    }
    if (!passwordForm.newPassword || passwordForm.newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    setPasswordSaving(true);
    try {
      const res = await authAPI.updatePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      if (res.data.success) {
        setPasswordMessage('Password updated successfully. Keep your new credentials secure.');
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      console.error('Password update error:', err);
      setPasswordError(err.response?.data?.message || 'Failed to update password.');
    } finally {
      setPasswordSaving(false);
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

      {/* Security & Password Management Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-charcoal-200/80 shadow-sm space-y-6">
        <div>
          <h2 className="text-base font-display font-bold text-navy-900 pb-3 border-b border-charcoal-100 flex items-center gap-2">
            <Key className="w-4 h-4 text-purple-brand" />
            <span>Security & Admin Password Management</span>
          </h2>
          <p className="text-xs text-charcoal-500 mt-2">
            Update your administrative login credentials to maintain maximum portal security.
          </p>
        </div>

        {passwordMessage && (
          <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{passwordMessage}</span>
          </div>
        )}

        {passwordError && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{passwordError}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold uppercase text-charcoal-700 mb-1.5">
                Current Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                placeholder="••••••••••••"
                className="w-full px-3 py-2.5 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none focus:border-purple-brand text-xs font-mono"
                required
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-charcoal-700 mb-1.5">
                New Password (Min. 8 chars) <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                placeholder="••••••••••••"
                className="w-full px-3 py-2.5 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none focus:border-purple-brand text-xs font-mono"
                required
                minLength={8}
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-charcoal-700 mb-1.5">
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="••••••••••••"
                className="w-full px-3 py-2.5 rounded-xl bg-surface-light border border-charcoal-200 focus:outline-none focus:border-purple-brand text-xs font-mono"
                required
                minLength={8}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-charcoal-400">
              Session token will remain active after password update.
            </span>
            <button
              type="submit"
              disabled={passwordSaving}
              className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-navy-900 hover:bg-navy-800 disabled:opacity-50 transition-all flex items-center gap-2 shadow-sm"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{passwordSaving ? 'Updating...' : 'Update Password'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


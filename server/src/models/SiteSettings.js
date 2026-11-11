import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      default: 'AJDesigners',
    },
    tagline: {
      type: String,
      default: 'Creative Minds. Digital Growth.',
    },
    officialEmail: {
      type: String,
      default: 'contact@ajdesigners.com',
    },
    supportEmail: {
      type: String,
      default: 'hello@ajdesigners.com',
    },
    whatsappNumber: {
      type: String,
      default: '+1 (555) 019-2834',
    },
    phone: {
      type: String,
      default: '+1 (555) 019-2834',
    },
    address: {
      type: String,
      default: 'Serving International Clients (Remote Studio Operations: USA, UK, Canada, Australia, UAE, Europe)',
    },
    socialLinks: {
      instagram: { type: String, default: 'https://instagram.com/ajdesigners' },
      facebook: { type: String, default: 'https://facebook.com/ajdesigners' },
      linkedin: { type: String, default: 'https://linkedin.com/company/ajdesigners' },
      tiktok: { type: String, default: 'https://tiktok.com/@ajdesigners' },
      youtube: { type: String, default: 'https://youtube.com/@ajdesigners' },
    },
    metaDefaults: {
      siteTitle: { type: String, default: 'AJDesigners | Creative Minds. Digital Growth.' },
      siteDescription: {
        type: String,
        default: 'AJDesigners is an international digital marketing and creative agency helping B2B and B2C brands grow through creative content, social media management, AI production, and performance marketing.',
      },
    },
  },
  {
    timestamps: true,
  }
);

export const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);


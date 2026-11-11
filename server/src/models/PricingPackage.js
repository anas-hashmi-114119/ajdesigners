import mongoose from 'mongoose';

const pricingPackageSchema = new mongoose.Schema(
  {
    tierKey: {
      type: String,
      required: true,
      unique: true,
      enum: ['starter', 'growth', 'premium'],
    },
    name: {
      type: String,
      required: true,
    },
    planTitle: {
      type: String,
      required: true,
    },
    monthlyPrice: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: '$',
    },
    billingPeriod: {
      type: String,
      default: 'month',
    },
    subtitle: {
      type: String,
      required: true,
    },
    isRecommended: {
      type: Boolean,
      default: false,
    },
    badgeText: {
      type: String,
      default: '',
    },
    deliverables: [
      {
        type: String,
        required: true,
      },
    ],
    idealFor: {
      type: String,
      required: true,
    },
    revisionRounds: {
      type: Number,
      default: 1,
    },
    platformsCount: {
      type: Number,
      default: 1,
    },
    order: {
      type: Number,
      default: 1,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PricingPackage = mongoose.model('PricingPackage', pricingPackageSchema);


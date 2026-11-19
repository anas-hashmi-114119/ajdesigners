import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
      maxlength: 100,
    },
    role: {
      type: String,
      required: [true, 'Role or title is required'],
      trim: true,
      maxlength: 100,
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: 120,
    },
    avatar: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
      default: 5,
    },
    category: {
      type: String,
      enum: ['all', 'ugc', 'performance', 'branding', 'web', 'other'],
      default: 'branding',
    },
    metric: {
      type: String,
      trim: true,
      default: 'Verified Client',
    },
    metricLabel: {
      type: String,
      trim: true,
      default: 'Growth Sprint',
    },
    headline: {
      type: String,
      required: [true, 'Review headline is required'],
      trim: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: [true, 'Review content is required'],
      trim: true,
      maxlength: 1500,
    },
    turnaround: {
      type: String,
      default: '48h Sprint',
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ createdAt: -1 });

export default mongoose.model('Review', reviewSchema);


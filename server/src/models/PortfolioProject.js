import mongoose from 'mongoose';

const portfolioProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Social Media Designs',
        'Branding Projects',
        'AI-Generated Creative Content',
        'Short-Form Videos',
        'Promotional Campaigns',
        'Content Calendars',
        'Website and Landing Page Projects',
      ],
      index: true,
    },
    clientOrConceptName: {
      type: String,
      required: true,
      default: 'Concept Exploration',
    },
    isConcept: {
      type: Boolean,
      default: true,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
    },
    servicesProvided: [
      {
        type: String,
        trim: true,
      },
    ],
    summary: {
      type: String,
      required: true,
      maxlength: 300,
    },
    fullDescription: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    additionalMedia: [
      {
        type: String,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    published: {
      type: Boolean,
      default: true,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

portfolioProjectSchema.index({ category: 1, published: 1, order: 1 });

export const PortfolioProject = mongoose.model('PortfolioProject', portfolioProjectSchema);


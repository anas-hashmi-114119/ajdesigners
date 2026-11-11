import mongoose from 'mongoose';

const internalNoteSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      default: 'Admin',
    },
    note: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const inquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: 120,
    },
    businessName: {
      type: String,
      required: [true, 'Business name is required'],
      trim: true,
      maxlength: 150,
    },
    workEmail: {
      type: String,
      required: [true, 'Work email is required'],
      trim: true,
      lowercase: true,
      index: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
    },
    websiteUrl: {
      type: String,
      trim: true,
      default: '',
    },
    serviceRequired: {
      type: String,
      required: [true, 'Service selection is required'],
      trim: true,
    },
    businessType: {
      type: String,
      enum: ['B2B', 'B2C', 'Other'],
      default: 'B2B',
    },
    estimatedBudget: {
      type: String,
      required: [true, 'Estimated budget is required'],
      trim: true,
    },
    projectDescription: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: 3000,
    },
    preferredContactMethod: {
      type: String,
      enum: ['Email', 'WhatsApp', 'Phone'],
      default: 'Email',
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Converted', 'Closed'],
      default: 'New',
      index: true,
    },
    internalNotes: [internalNoteSchema],
  },
  {
    timestamps: true,
  }
);

// Indexes for searching & filtering
inquirySchema.index({ createdAt: -1 });
inquirySchema.index({ fullName: 'text', businessName: 'text', workEmail: 'text' });

export const Inquiry = mongoose.model('Inquiry', inquirySchema);


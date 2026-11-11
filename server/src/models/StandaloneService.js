import mongoose from 'mongoose';

const standaloneServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    startingPrice: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: '$',
    },
    description: {
      type: String,
      required: true,
    },
    deliverablesSummary: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
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

export const StandaloneService = mongoose.model('StandaloneService', standaloneServiceSchema);


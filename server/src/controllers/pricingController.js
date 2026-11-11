import { PricingPackage } from '../models/PricingPackage.js';
import { StandaloneService } from '../models/StandaloneService.js';

export const getPricing = async (req, res, next) => {
  try {
    const [packages, standalone] = await Promise.all([
      PricingPackage.find({ active: true }).sort({ order: 1 }),
      StandaloneService.find({ active: true }).sort({ order: 1 }),
    ]);

    res.status(200).json({
      success: true,
      packages,
      standalone,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePackage = async (req, res, next) => {
  try {
    const pkg = await PricingPackage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!pkg) {
      return res.status(404).json({
        success: false,
        message: 'Pricing package not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Pricing package updated successfully.',
      package: pkg,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStandaloneService = async (req, res, next) => {
  try {
    const service = await StandaloneService.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Standalone service not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Standalone service updated successfully.',
      service,
    });
  } catch (error) {
    next(error);
  }
};

export const createStandaloneService = async (req, res, next) => {
  try {
    const service = await StandaloneService.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Standalone service created successfully.',
      service,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStandaloneService = async (req, res, next) => {
  try {
    const service = await StandaloneService.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Standalone service not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Standalone service deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};


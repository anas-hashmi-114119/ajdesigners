import { Service } from '../models/Service.js';

export const getServices = async (req, res, next) => {
  try {
    const { all, featured } = req.query;
    const filter = {};

    if (!all) {
      filter.published = true;
    }

    if (featured === 'true') {
      filter.isFeatured = true;
    }

    const services = await Service.find(filter).sort({ order: 1 });

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    next(error);
  }
};

export const getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, published: true });
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service details not found.',
      });
    }

    const otherServices = await Service.find({
      _id: { $ne: service._id },
      published: true,
    })
      .sort({ order: 1 })
      .limit(4)
      .select('number title slug shortDescription iconName');

    res.status(200).json({
      success: true,
      service,
      otherServices,
    });
  } catch (error) {
    next(error);
  }
};

export const createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Service created successfully.',
      service,
    });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service updated successfully.',
      service,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};


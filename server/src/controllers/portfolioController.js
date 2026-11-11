import { PortfolioProject } from '../models/PortfolioProject.js';

export const getProjects = async (req, res, next) => {
  try {
    const { category, featured, all } = req.query;
    const filter = {};

    // Only return published projects for public requests unless admin explicitly asks for all
    if (!all) {
      filter.published = true;
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (featured === 'true') {
      filter.featured = true;
    }

    const projects = await PortfolioProject.find(filter).sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (req, res, next) => {
  try {
    const project = await PortfolioProject.findOne({ slug: req.params.slug, published: true });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio project not found.',
      });
    }

    // Related projects in same category
    const related = await PortfolioProject.find({
      category: project.category,
      _id: { $ne: project._id },
      published: true,
    })
      .limit(3)
      .select('title slug coverImage category industry');

    res.status(200).json({
      success: true,
      project,
      related,
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const {
      title,
      slug,
      category,
      clientOrConceptName,
      isConcept,
      industry,
      servicesProvided,
      summary,
      fullDescription,
      coverImage,
      additionalMedia,
      featured,
      published,
      order,
    } = req.body;

    const finalSlug = (slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const project = await PortfolioProject.create({
      title,
      slug: finalSlug,
      category,
      clientOrConceptName: clientOrConceptName || 'Concept Exploration',
      isConcept: isConcept !== undefined ? isConcept : true,
      industry,
      servicesProvided: Array.isArray(servicesProvided) ? servicesProvided : [servicesProvided].filter(Boolean),
      summary,
      fullDescription,
      coverImage,
      additionalMedia: Array.isArray(additionalMedia) ? additionalMedia : [],
      featured: Boolean(featured),
      published: published !== undefined ? Boolean(published) : true,
      order: Number(order) || 0,
    });

    res.status(201).json({
      success: true,
      message: 'Portfolio project created successfully.',
      project,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await PortfolioProject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio project not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Portfolio project updated successfully.',
      project,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await PortfolioProject.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio project not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Portfolio project deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};


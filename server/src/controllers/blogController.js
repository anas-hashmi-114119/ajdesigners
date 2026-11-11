import { BlogPost } from '../models/BlogPost.js';

export const getPosts = async (req, res, next) => {
  try {
    const { category, search, all, page = 1, limit = 12 } = req.query;
    const filter = {};

    if (!all) {
      filter.published = true;
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [{ title: searchRegex }, { excerpt: searchRegex }, { tags: searchRegex }];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 12;
    const skip = (pageNum - 1) * limitNum;

    const [posts, total] = await Promise.all([
      BlogPost.find(filter).sort({ publishedAt: -1, createdAt: -1 }).skip(skip).limit(limitNum),
      BlogPost.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      posts,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        limit: limitNum,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPostBySlug = async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found.',
      });
    }

    const related = await BlogPost.find({
      category: post.category,
      _id: { $ne: post._id },
      published: true,
    })
      .limit(3)
      .select('title slug coverImage category readTime publishedAt');

    res.status(200).json({
      success: true,
      post,
      related,
    });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category,
      author,
      readTime,
      tags,
      featured,
      published,
      metaTitle,
      metaDescription,
    } = req.body;

    const finalSlug = (slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const post = await BlogPost.create({
      title,
      slug: finalSlug,
      excerpt,
      content,
      coverImage,
      category,
      author: author || {
        name: 'AJDesigners Editorial Team',
        role: 'Digital Strategy & Creative Insights',
      },
      readTime: readTime || '5 min read',
      tags: Array.isArray(tags) ? tags : [tags].filter(Boolean),
      featured: Boolean(featured),
      published: published !== undefined ? Boolean(published) : true,
      publishedAt: new Date(),
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt,
    });

    res.status(201).json({
      success: true,
      message: 'Article published successfully.',
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Article updated successfully.',
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Article deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};


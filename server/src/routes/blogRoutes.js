import express from 'express';
import {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/blogController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getPosts);
router.get('/:slug', getPostBySlug);

// Admin routes
router.post('/', protectAdmin, createPost);
router.put('/:id', protectAdmin, updatePost);
router.delete('/:id', protectAdmin, deletePost);

export default router;


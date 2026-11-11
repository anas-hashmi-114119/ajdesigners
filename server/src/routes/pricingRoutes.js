import express from 'express';
import {
  getPricing,
  updatePackage,
  updateStandaloneService,
  createStandaloneService,
  deleteStandaloneService,
} from '../controllers/pricingController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getPricing);

// Admin routes
router.put('/packages/:id', protectAdmin, updatePackage);
router.post('/standalone', protectAdmin, createStandaloneService);
router.put('/standalone/:id', protectAdmin, updateStandaloneService);
router.delete('/standalone/:id', protectAdmin, deleteStandaloneService);

export default router;


import express from 'express';
import {
  submitInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  addInternalNote,
  deleteInquiry,
  exportInquiriesCsv,
  getInquiryStats,
} from '../controllers/inquiryController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { inquiryLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public route for prospects
router.post('/submit', inquiryLimiter, submitInquiry);

// Admin routes
router.get('/stats', protectAdmin, getInquiryStats);
router.get('/export-csv', protectAdmin, exportInquiriesCsv);
router.get('/', protectAdmin, getAllInquiries);
router.get('/:id', protectAdmin, getInquiryById);
router.patch('/:id/status', protectAdmin, updateInquiryStatus);
router.post('/:id/notes', protectAdmin, addInternalNote);
router.delete('/:id', protectAdmin, deleteInquiry);

export default router;


import express from 'express';
import { uploadFile } from '../controllers/uploadController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', protectAdmin, upload.single('file'), uploadFile);

export default router;


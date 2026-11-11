import express from 'express';
import { login, getMe, logout, updatePassword } from '../controllers/authController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/login', authLimiter, login);
router.post('/logout', logout);
router.get('/me', protectAdmin, getMe);
router.put('/update-password', protectAdmin, updatePassword);

export default router;


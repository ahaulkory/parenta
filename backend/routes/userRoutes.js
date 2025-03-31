import express from 'express';
import { loginUser, registerUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Routes publiques
router.post('/login', loginUser);
router.post('/register', registerUser);

// Routes protégées
router.get('/me', protect, getUserProfile);

export default router;

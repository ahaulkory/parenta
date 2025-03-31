import express from 'express';
import { getGmailAuthUrl, gmailCallback, extractGmailEvents } from '../controllers/emailController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Routes publiques (callback)
router.get('/gmail/callback', gmailCallback);

// Routes protégées
router.get('/gmail/auth', protect, getGmailAuthUrl);
router.get('/gmail/events', protect, extractGmailEvents);

export default router;

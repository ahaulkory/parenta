import express from 'express';
import { getOutlookAuthUrl, outlookCallback, extractOutlookEvents, extractOutlookCalendar } from '../controllers/outlookController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Routes publiques (callback)
router.get('/outlook/callback', outlookCallback);

// Routes protégées
router.get('/outlook/auth', protect, getOutlookAuthUrl);
router.get('/outlook/events', protect, extractOutlookEvents);
router.get('/outlook/calendar', protect, extractOutlookCalendar);

export default router;

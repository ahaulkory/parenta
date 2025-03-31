import express from 'express';
import { getDailyBriefing } from '../controllers/briefingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Toutes les routes sont protégées
router.use(protect);

router.route('/daily')
  .get(getDailyBriefing);

export default router;

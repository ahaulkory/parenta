import express from 'express';
import { getCurrentWeather, getWeatherForecast, getClothingSuggestions } from '../controllers/weatherController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Toutes les routes sont protégées
router.use(protect);

router.route('/current')
  .get(getCurrentWeather);

router.route('/forecast')
  .get(getWeatherForecast);

router.route('/clothing')
  .get(getClothingSuggestions);

export default router;

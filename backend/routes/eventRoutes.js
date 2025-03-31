import express from 'express';
import { getEvents, getDailyEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Toutes les routes sont protégées
router.use(protect);

router.route('/')
  .get(getEvents)
  .post(createEvent);

router.route('/daily')
  .get(getDailyEvents);

router.route('/:id')
  .get(getEventById)
  .put(updateEvent)
  .delete(deleteEvent);

export default router;

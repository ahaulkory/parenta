import express from 'express';
import { getChildren, getChildById, createChild, updateChild, deleteChild } from '../controllers/childController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Toutes les routes sont protégées
router.use(protect);

router.route('/')
  .get(getChildren)
  .post(createChild);

router.route('/:id')
  .get(getChildById)
  .put(updateChild)
  .delete(deleteChild);

export default router;

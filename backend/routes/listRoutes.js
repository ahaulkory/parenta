import express from 'express';
import {
  getLists,
  getListById,
  createList,
  updateList,
  deleteList,
  getListItems,
  addListItem,
  updateListItem,
  deleteListItem,
} from '../controllers/listController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Toutes les routes sont protégées
router.use(protect);

router.route('/')
  .get(getLists)
  .post(createList);

router.route('/:id')
  .get(getListById)
  .put(updateList)
  .delete(deleteList);

router.route('/:id/items')
  .get(getListItems)
  .post(addListItem);

router.route('/:id/items/:itemId')
  .put(updateListItem)
  .delete(deleteListItem);

export default router;

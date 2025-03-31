import asyncHandler from 'express-async-handler';
import List from '../models/List.js';
import ListItem from '../models/ListItem.js';

// @desc    Obtenir toutes les listes d'un utilisateur
// @route   GET /api/lists
// @access  Private
const getLists = asyncHandler(async (req, res) => {
  const lists = await List.find({ userId: req.user._id });
  res.json(lists);
});

// @desc    Obtenir une liste par ID
// @route   GET /api/lists/:id
// @access  Private
const getListById = asyncHandler(async (req, res) => {
  const list = await List.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (list) {
    res.json(list);
  } else {
    res.status(404);
    throw new Error('Liste non trouvée');
  }
});

// @desc    Créer une nouvelle liste
// @route   POST /api/lists
// @access  Private
const createList = asyncHandler(async (req, res) => {
  const { name, type } = req.body;

  const list = await List.create({
    userId: req.user._id,
    name,
    type: type || 'todo',
  });

  if (list) {
    res.status(201).json(list);
  } else {
    res.status(400);
    throw new Error('Données invalides');
  }
});

// @desc    Mettre à jour une liste
// @route   PUT /api/lists/:id
// @access  Private
const updateList = asyncHandler(async (req, res) => {
  const { name, type } = req.body;

  const list = await List.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (list) {
    list.name = name || list.name;
    list.type = type || list.type;

    const updatedList = await list.save();
    res.json(updatedList);
  } else {
    res.status(404);
    throw new Error('Liste non trouvée');
  }
});

// @desc    Supprimer une liste
// @route   DELETE /api/lists/:id
// @access  Private
const deleteList = asyncHandler(async (req, res) => {
  const list = await List.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (list) {
    // Supprimer tous les éléments de la liste
    await ListItem.deleteMany({ listId: list._id });
    
    // Supprimer la liste
    await list.deleteOne();
    res.json({ message: 'Liste supprimée' });
  } else {
    res.status(404);
    throw new Error('Liste non trouvée');
  }
});

// @desc    Obtenir tous les éléments d'une liste
// @route   GET /api/lists/:id/items
// @access  Private
const getListItems = asyncHandler(async (req, res) => {
  // Vérifier que la liste appartient à l'utilisateur
  const list = await List.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!list) {
    res.status(404);
    throw new Error('Liste non trouvée');
  }

  const items = await ListItem.find({ listId: req.params.id });
  res.json(items);
});

// @desc    Ajouter un élément à une liste
// @route   POST /api/lists/:id/items
// @access  Private
const addListItem = asyncHandler(async (req, res) => {
  const { text } = req.body;

  // Vérifier que la liste appartient à l'utilisateur
  const list = await List.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!list) {
    res.status(404);
    throw new Error('Liste non trouvée');
  }

  const item = await ListItem.create({
    listId: req.params.id,
    text,
    completed: false,
  });

  if (item) {
    res.status(201).json(item);
  } else {
    res.status(400);
    throw new Error('Données invalides');
  }
});

// @desc    Mettre à jour un élément de liste
// @route   PUT /api/lists/:id/items/:itemId
// @access  Private
const updateListItem = asyncHandler(async (req, res) => {
  const { text, completed } = req.body;

  // Vérifier que la liste appartient à l'utilisateur
  const list = await List.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!list) {
    res.status(404);
    throw new Error('Liste non trouvée');
  }

  const item = await ListItem.findOne({
    _id: req.params.itemId,
    listId: req.params.id,
  });

  if (item) {
    item.text = text !== undefined ? text : item.text;
    item.completed = completed !== undefined ? completed : item.completed;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } else {
    res.status(404);
    throw new Error('Élément non trouvé');
  }
});

// @desc    Supprimer un élément de liste
// @route   DELETE /api/lists/:id/items/:itemId
// @access  Private
const deleteListItem = asyncHandler(async (req, res) => {
  // Vérifier que la liste appartient à l'utilisateur
  const list = await List.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!list) {
    res.status(404);
    throw new Error('Liste non trouvée');
  }

  const item = await ListItem.findOne({
    _id: req.params.itemId,
    listId: req.params.id,
  });

  if (item) {
    await item.deleteOne();
    res.json({ message: 'Élément supprimé' });
  } else {
    res.status(404);
    throw new Error('Élément non trouvé');
  }
});

export {
  getLists,
  getListById,
  createList,
  updateList,
  deleteList,
  getListItems,
  addListItem,
  updateListItem,
  deleteListItem,
};

import asyncHandler from 'express-async-handler';
import Child from '../models/Child.js';

// @desc    Obtenir tous les enfants d'un utilisateur
// @route   GET /api/children
// @access  Private
const getChildren = asyncHandler(async (req, res) => {
  const children = await Child.find({ userId: req.user._id });
  res.json(children);
});

// @desc    Obtenir un enfant par ID
// @route   GET /api/children/:id
// @access  Private
const getChildById = asyncHandler(async (req, res) => {
  const child = await Child.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (child) {
    res.json(child);
  } else {
    res.status(404);
    throw new Error('Enfant non trouvé');
  }
});

// @desc    Créer un nouvel enfant
// @route   POST /api/children
// @access  Private
const createChild = asyncHandler(async (req, res) => {
  const { firstName, age, preferences } = req.body;

  const child = await Child.create({
    userId: req.user._id,
    firstName,
    age,
    preferences: preferences || {
      clothing: {
        coldWeather: [],
        warmWeather: [],
        rainWeather: [],
      },
    },
  });

  if (child) {
    res.status(201).json(child);
  } else {
    res.status(400);
    throw new Error('Données invalides');
  }
});

// @desc    Mettre à jour un enfant
// @route   PUT /api/children/:id
// @access  Private
const updateChild = asyncHandler(async (req, res) => {
  const { firstName, age, preferences } = req.body;

  const child = await Child.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (child) {
    child.firstName = firstName || child.firstName;
    child.age = age || child.age;
    
    if (preferences) {
      child.preferences = {
        clothing: {
          coldWeather: preferences.clothing?.coldWeather || child.preferences.clothing.coldWeather,
          warmWeather: preferences.clothing?.warmWeather || child.preferences.clothing.warmWeather,
          rainWeather: preferences.clothing?.rainWeather || child.preferences.clothing.rainWeather,
        },
      };
    }

    const updatedChild = await child.save();
    res.json(updatedChild);
  } else {
    res.status(404);
    throw new Error('Enfant non trouvé');
  }
});

// @desc    Supprimer un enfant
// @route   DELETE /api/children/:id
// @access  Private
const deleteChild = asyncHandler(async (req, res) => {
  const child = await Child.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (child) {
    await child.deleteOne();
    res.json({ message: 'Enfant supprimé' });
  } else {
    res.status(404);
    throw new Error('Enfant non trouvé');
  }
});

export { getChildren, getChildById, createChild, updateChild, deleteChild };

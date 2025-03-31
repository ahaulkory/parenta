import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { generateToken } from '../config/auth.js';

// @desc    Authentifier un utilisateur et obtenir un token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Vérifier si l'utilisateur existe
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      integrations: user.integrations,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Email ou mot de passe invalide');
  }
});

// @desc    Enregistrer un nouvel utilisateur
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Vérifier si l'utilisateur existe déjà
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('Utilisateur déjà existant');
  }

  // Créer l'utilisateur
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    integrations: {
      gmail: { connected: false },
      outlook: { connected: false },
      googleCalendar: { connected: false },
    },
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      integrations: user.integrations,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Données utilisateur invalides');
  }
});

// @desc    Obtenir le profil de l'utilisateur
// @route   GET /api/auth/me
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      integrations: user.integrations,
    });
  } else {
    res.status(404);
    throw new Error('Utilisateur non trouvé');
  }
});

export { loginUser, registerUser, getUserProfile };

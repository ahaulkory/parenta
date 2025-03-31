import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { authConfig } from '../config/auth.js';

// Middleware pour protéger les routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Vérifier si le token est présent dans les headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extraire le token du header
      token = req.headers.authorization.split(' ')[1];

      // Vérifier le token
      const decoded = jwt.verify(token, authConfig.jwtSecret);

      // Récupérer l'utilisateur à partir du token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Non autorisé, token invalide');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Non autorisé, pas de token');
  }
});

export { protect };

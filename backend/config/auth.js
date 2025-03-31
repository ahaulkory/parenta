import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Génération d'un token JWT
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'parenta_secret_key', {
    expiresIn: '30d',
  });
};

// Hachage du mot de passe
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Vérification du mot de passe
export const comparePassword = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

// Configuration de l'authentification
export const authConfig = {
  jwtSecret: process.env.JWT_SECRET || 'parenta_secret_key',
  jwtExpire: '30d',
};

export default {
  generateToken,
  hashPassword,
  comparePassword,
  authConfig,
};

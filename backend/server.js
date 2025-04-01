console.log("🟢 Backend Parenta démarrage...");

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import childRoutes from './routes/childRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import listRoutes from './routes/listRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import outlookRoutes from './routes/outlookRoutes.js';
import briefingRoutes from './routes/briefingRoutes.js';

// 🌍 Configuration des variables d'environnement
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// 🔗 Connexion à MongoDB Atlas
connectDB();

// 🛡️ Middleware global
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🚀 Routes de l'application
app.use('/api/auth', userRoutes);
app.use('/api/children', childRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/outlook', outlookRoutes);
app.use('/api/briefing', briefingRoutes);

// 🔍 Route de test santé
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Parenta API fonctionne correctement' });
});

// ❌ Gestion des erreurs
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// 🚀 Lancement du serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Serveur backend démarré sur le port ${PORT}`);
});

export default app;

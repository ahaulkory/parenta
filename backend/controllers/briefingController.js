import asyncHandler from 'express-async-handler';
import Event from '../models/Event.js';
import User from '../models/User.js';
import axios from 'axios';

// @desc    Générer un briefing quotidien
// @route   GET /api/briefing/daily
// @access  Private
const getDailyBriefing = asyncHandler(async (req, res) => {
  const { lat, lon } = req.query;
  
  if (!lat || !lon) {
    res.status(400);
    throw new Error('Latitude et longitude requises');
  }

  try {
    const user = await User.findById(req.user._id);
    
    // Récupérer les événements du jour
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const events = await Event.find({
      userId: req.user._id,
      startDate: { $gte: today, $lt: tomorrow }
    }).sort('startDate').populate('childId', 'firstName');
    
    // Récupérer les données météo
    const apiKey = process.env.OPENWEATHER_API_KEY || 'demo_key';
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${apiKey}`
    );
    
    const weather = weatherResponse.data;
    
    // Générer le briefing
    const briefing = generateBriefing(user, events, weather);
    
    res.json(briefing);
  } catch (error) {
    console.error('Erreur briefing:', error);
    res.status(500);
    throw new Error('Erreur lors de la génération du briefing quotidien');
  }
});

// Fonction utilitaire pour générer le briefing
const generateBriefing = (user, events, weather) => {
  // Formater la date
  const today = new Date();
  const dateStr = today.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  
  // Préparer les sections du briefing
  let greeting = `Bonjour ${user.firstName},`;
  
  let eventsSection = '';
  if (events.length === 0) {
    eventsSection = "Vous n'avez pas d'événements prévus aujourd'hui.";
  } else {
    eventsSection = "Aujourd'hui :\n";
    events.forEach(event => {
      const time = event.startDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      const childName = event.childId ? `${event.childId.firstName} a ` : '';
      eventsSection += `- ${childName}${event.title} à ${time}`;
      
      if (event.location) {
        eventsSection += ` à ${event.location}`;
      }
      
      eventsSection += '\n';
    });
  }
  
  // Préparer la section météo
  const temperature = Math.round(weather.main.temp);
  const conditions = weather.weather[0].description;
  let weatherSection = `Météo: ${temperature}°C, ${conditions}.`;
  
  // Ajouter des conseils vestimentaires basés sur la météo
  let clothingAdvice = '';
  if (temperature < 10) {
    clothingAdvice = 'Prévoyez des vêtements chauds aujourd\'hui.';
  } else if (temperature < 20) {
    clothingAdvice = 'Une veste légère sera utile aujourd\'hui.';
  } else {
    clothingAdvice = 'Temps chaud aujourd\'hui, habillez-vous légèrement.';
  }
  
  if (weather.weather[0].main === 'Rain' || weather.weather[0].main === 'Drizzle') {
    clothingAdvice += ' N\'oubliez pas un parapluie ou un imperméable.';
  }
  
  // Assembler le briefing complet
  const fullBriefing = {
    date: dateStr,
    greeting,
    events: eventsSection,
    weather: weatherSection,
    clothingAdvice,
    fullText: `${greeting}\n\n${eventsSection}\n${weatherSection}\n${clothingAdvice}`
  };
  
  return fullBriefing;
};

export { getDailyBriefing };

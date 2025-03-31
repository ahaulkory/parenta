import axios from 'axios';
import asyncHandler from 'express-async-handler';

// @desc    Obtenir la météo actuelle
// @route   GET /api/weather/current
// @access  Private
const getCurrentWeather = asyncHandler(async (req, res) => {
  const { lat, lon } = req.query;
  
  if (!lat || !lon) {
    res.status(400);
    throw new Error('Latitude et longitude requises');
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY || 'demo_key';
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${apiKey}`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Erreur OpenWeather:', error);
    res.status(500);
    throw new Error('Erreur lors de la récupération des données météo');
  }
});

// @desc    Obtenir les prévisions météo
// @route   GET /api/weather/forecast
// @access  Private
const getWeatherForecast = asyncHandler(async (req, res) => {
  const { lat, lon } = req.query;
  
  if (!lat || !lon) {
    res.status(400);
    throw new Error('Latitude et longitude requises');
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY || 'demo_key';
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${apiKey}`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Erreur OpenWeather:', error);
    res.status(500);
    throw new Error('Erreur lors de la récupération des prévisions météo');
  }
});

// @desc    Obtenir des suggestions vestimentaires basées sur la météo
// @route   GET /api/weather/clothing
// @access  Private
const getClothingSuggestions = asyncHandler(async (req, res) => {
  const { lat, lon, childId } = req.query;
  
  if (!lat || !lon) {
    res.status(400);
    throw new Error('Latitude et longitude requises');
  }

  try {
    // Récupérer les données météo
    const apiKey = process.env.OPENWEATHER_API_KEY || 'demo_key';
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${apiKey}`
    );

    const weather = response.data;
    const temperature = weather.main.temp;
    const conditions = weather.weather[0].main;
    
    // Générer des suggestions vestimentaires basées sur la météo
    let suggestions = [];
    
    if (temperature < 10) {
      // Temps froid
      suggestions = [
        'Manteau chaud',
        'Pull',
        'Pantalon long',
        'Chaussettes chaudes',
        'Bonnet',
        'Gants'
      ];
      
      if (conditions === 'Rain' || conditions === 'Drizzle') {
        suggestions.push('Imperméable');
        suggestions.push('Bottes de pluie');
      }
    } else if (temperature < 20) {
      // Temps frais
      suggestions = [
        'Veste légère ou sweat',
        'T-shirt',
        'Pantalon',
        'Chaussures fermées'
      ];
      
      if (conditions === 'Rain' || conditions === 'Drizzle') {
        suggestions.push('Imperméable');
        suggestions.push('Chaussures imperméables');
      }
    } else {
      // Temps chaud
      suggestions = [
        'T-shirt',
        'Short ou jupe',
        'Chaussures légères',
        'Chapeau'
      ];
      
      if (temperature > 25) {
        suggestions.push('Crème solaire');
        suggestions.push('Lunettes de soleil');
      }
      
      if (conditions === 'Rain' || conditions === 'Drizzle') {
        suggestions.push('Imperméable léger');
      }
    }
    
    res.json({
      weather: {
        temperature,
        conditions: weather.weather[0].description,
        icon: weather.weather[0].icon
      },
      suggestions
    });
  } catch (error) {
    console.error('Erreur OpenWeather:', error);
    res.status(500);
    throw new Error('Erreur lors de la génération des suggestions vestimentaires');
  }
});

export { getCurrentWeather, getWeatherForecast, getClothingSuggestions };

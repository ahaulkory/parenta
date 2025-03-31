import axios from 'axios';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Event from '../models/Event.js';

// Configuration pour Outlook
const outlookConfig = {
  clientId: process.env.OUTLOOK_CLIENT_ID,
  clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
  redirectUri: process.env.OUTLOOK_REDIRECT_URI,
  authority: 'https://login.microsoftonline.com/common',
  scopes: ['Mail.Read', 'Calendars.Read']
};

// @desc    Générer l'URL d'autorisation Outlook
// @route   GET /api/email/outlook/auth
// @access  Private
const getOutlookAuthUrl = asyncHandler(async (req, res) => {
  const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${outlookConfig.clientId}&response_type=code&redirect_uri=${encodeURIComponent(outlookConfig.redirectUri)}&scope=${encodeURIComponent(outlookConfig.scopes.join(' '))}&state=${req.user._id.toString()}`;
  
  res.json({ url: authUrl });
});

// @desc    Callback pour l'autorisation Outlook
// @route   GET /api/email/outlook/callback
// @access  Public
const outlookCallback = asyncHandler(async (req, res) => {
  const { code, state } = req.query;
  
  if (!code || !state) {
    res.status(400);
    throw new Error('Code ou state manquant');
  }

  try {
    // Échanger le code contre un token
    const tokenResponse = await axios.post('https://login.microsoftonline.com/common/oauth2/v2.0/token', 
      new URLSearchParams({
        client_id: outlookConfig.clientId,
        client_secret: outlookConfig.clientSecret,
        code: code,
        redirect_uri: outlookConfig.redirectUri,
        grant_type: 'authorization_code'
      }), 
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    const tokens = tokenResponse.data;
    
    // Mettre à jour l'utilisateur avec les tokens
    const user = await User.findById(state);
    
    if (!user) {
      res.status(404);
      throw new Error('Utilisateur non trouvé');
    }
    
    user.integrations.outlook.connected = true;
    user.integrations.outlook.tokens = {
      access: tokens.access_token,
      refresh: tokens.refresh_token
    };
    
    await user.save();
    
    // Rediriger vers l'application
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/settings?integration=outlook&status=success`);
  } catch (error) {
    console.error('Erreur Outlook callback:', error);
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/settings?integration=outlook&status=error`);
  }
});

// @desc    Extraire les événements des emails Outlook
// @route   GET /api/email/outlook/events
// @access  Private
const extractOutlookEvents = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user.integrations.outlook.connected) {
    res.status(400);
    throw new Error('Outlook non connecté');
  }
  
  try {
    // Récupérer les emails récents liés à l'école, aux rendez-vous, etc.
    const response = await axios.get('https://graph.microsoft.com/v1.0/me/messages', {
      params: {
        $filter: "contains(subject,'école') or contains(subject,'rendez-vous') or contains(subject,'médecin') or contains(subject,'sport') or contains(subject,'activité') or contains(subject,'sortie') or contains(subject,'voyage') or contains(subject,'scolaire')",
        $top: 20
      },
      headers: {
        'Authorization': `Bearer ${user.integrations.outlook.tokens.access}`
      }
    });
    
    const messages = response.data.value || [];
    const events = [];
    
    // Analyser chaque email pour extraire les événements
    for (const message of messages) {
      // Récupérer le contenu complet de l'email
      const emailResponse = await axios.get(`https://graph.microsoft.com/v1.0/me/messages/${message.id}?$select=subject,body,receivedDateTime,from`, {
        headers: {
          'Authorization': `Bearer ${user.integrations.outlook.tokens.access}`
        }
      });
      
      const email = emailResponse.data;
      const subject = email.subject;
      const content = email.body.content.replace(/<[^>]*>/g, ''); // Supprimer les balises HTML
      const date = new Date(email.receivedDateTime);
      
      // Analyser le contenu pour extraire les informations d'événement
      const eventInfo = extractEventInfo(subject, content);
      
      if (eventInfo) {
        // Vérifier si l'événement existe déjà
        const existingEvent = await Event.findOne({
          userId: user._id,
          source: 'outlook',
          sourceId: message.id
        });
        
        if (!existingEvent) {
          // Créer un nouvel événement
          const newEvent = await Event.create({
            userId: user._id,
            title: eventInfo.title || subject,
            description: eventInfo.description || content.substring(0, 200),
            startDate: eventInfo.date || date,
            endDate: eventInfo.endDate || new Date(date.getTime() + 60 * 60 * 1000),
            location: eventInfo.location || '',
            type: determineEventType(subject, content),
            source: 'outlook',
            sourceId: message.id
          });
          
          events.push(newEvent);
        }
      }
    }
    
    res.json(events);
  } catch (error) {
    console.error('Erreur extraction Outlook:', error);
    res.status(500);
    throw new Error('Erreur lors de l\'extraction des événements Outlook');
  }
});

// @desc    Extraire les événements du calendrier Outlook
// @route   GET /api/email/outlook/calendar
// @access  Private
const extractOutlookCalendar = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user.integrations.outlook.connected) {
    res.status(400);
    throw new Error('Outlook non connecté');
  }
  
  try {
    // Récupérer les événements du calendrier pour les 30 prochains jours
    const now = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);
    
    const response = await axios.get('https://graph.microsoft.com/v1.0/me/calendarview', {
      params: {
        startDateTime: now.toISOString(),
        endDateTime: endDate.toISOString()
      },
      headers: {
        'Authorization': `Bearer ${user.integrations.outlook.tokens.access}`
      }
    });
    
    const calendarEvents = response.data.value || [];
    const events = [];
    
    // Traiter chaque événement du calendrier
    for (const calEvent of calendarEvents) {
      // Vérifier si l'événement existe déjà
      const existingEvent = await Event.findOne({
        userId: user._id,
        source: 'outlook',
        sourceId: calEvent.id
      });
      
      if (!existingEvent) {
        // Créer un nouvel événement
        const newEvent = await Event.create({
          userId: user._id,
          title: calEvent.subject,
          description: calEvent.bodyPreview || '',
          startDate: new Date(calEvent.start.dateTime + 'Z'),
          endDate: new Date(calEvent.end.dateTime + 'Z'),
          location: calEvent.location?.displayName || '',
          type: determineEventType(calEvent.subject, calEvent.bodyPreview || ''),
          source: 'outlook',
          sourceId: calEvent.id
        });
        
        events.push(newEvent);
      }
    }
    
    res.json(events);
  } catch (error) {
    console.error('Erreur extraction calendrier Outlook:', error);
    res.status(500);
    throw new Error('Erreur lors de l\'extraction des événements du calendrier Outlook');
  }
});

// Fonction utilitaire pour extraire les informations d'événement
const extractEventInfo = (subject, content) => {
  // Version simplifiée, une version plus robuste utiliserait NLP
  const dateRegex = /(\d{1,2}[\/\.-]\d{1,2}[\/\.-]\d{2,4})|(\d{1,2}\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+\d{2,4})/i;
  const timeRegex = /(\d{1,2}[h:]\d{0,2})/i;
  const locationRegex = /(à|au|lieu\s*:|localisation\s*:|adresse\s*:)\s*([^,\.\n]+)/i;
  
  const dateMatch = content.match(dateRegex) || subject.match(dateRegex);
  const timeMatch = content.match(timeRegex) || subject.match(timeRegex);
  const locationMatch = content.match(locationRegex);
  
  if (!dateMatch && !timeMatch) {
    return null;
  }
  
  let eventDate = new Date();
  if (dateMatch) {
    // Logique simplifiée pour extraire la date
    const dateStr = dateMatch[0];
    // Conversion de la date extraite en objet Date
    // Dans une implémentation réelle, utiliser une bibliothèque comme date-fns
    eventDate = new Date(dateStr);
  }
  
  if (timeMatch) {
    // Logique simplifiée pour extraire l'heure
    const timeStr = timeMatch[0];
    const [hours, minutes] = timeStr.split(/[h:]/);
    eventDate.setHours(parseInt(hours), parseInt(minutes) || 0);
  }
  
  return {
    title: subject,
    description: content.substring(0, 200),
    date: eventDate,
    endDate: new Date(eventDate.getTime() + 60 * 60 * 1000),
    location: locationMatch ? locationMatch[2].trim() : ''
  };
};

// Fonction utilitaire pour déterminer le type d'événement
const determineEventType = (subject, content) => {
  const text = (subject + ' ' + content).toLowerCase();
  
  if (text.includes('école') || text.includes('scolaire') || text.includes('classe')) {
    return 'school';
  } else if (text.includes('médecin') || text.includes('docteur') || text.includes('rendez-vous médical')) {
    return 'doctor';
  } else if (text.includes('anniversaire') || text.includes('fête')) {
    return 'birthday';
  } else if (text.includes('sport') || text.includes('football') || text.includes('soccer') || text.includes('natation')) {
    return 'sport';
  } else {
    return 'other';
  }
};

export { getOutlookAuthUrl, outlookCallback, extractOutlookEvents, extractOutlookCalendar };

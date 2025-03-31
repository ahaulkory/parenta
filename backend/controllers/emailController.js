import { google } from 'googleapis';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Event from '../models/Event.js';

// Configuration OAuth2
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// @desc    Générer l'URL d'autorisation Gmail
// @route   GET /api/email/gmail/auth
// @access  Private
const getGmailAuthUrl = asyncHandler(async (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/calendar.readonly'
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent',
    state: req.user._id.toString()
  });

  res.json({ url });
});

// @desc    Callback pour l'autorisation Gmail
// @route   GET /api/email/gmail/callback
// @access  Public
const gmailCallback = asyncHandler(async (req, res) => {
  const { code, state } = req.query;
  
  if (!code || !state) {
    res.status(400);
    throw new Error('Code ou state manquant');
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    
    // Mettre à jour l'utilisateur avec les tokens
    const user = await User.findById(state);
    
    if (!user) {
      res.status(404);
      throw new Error('Utilisateur non trouvé');
    }
    
    user.integrations.gmail.connected = true;
    user.integrations.gmail.tokens = {
      access: tokens.access_token,
      refresh: tokens.refresh_token
    };
    
    await user.save();
    
    // Rediriger vers l'application
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/settings?integration=gmail&status=success`);
  } catch (error) {
    console.error('Erreur Gmail callback:', error);
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/settings?integration=gmail&status=error`);
  }
});

// @desc    Extraire les événements des emails Gmail
// @route   GET /api/email/gmail/events
// @access  Private
const extractGmailEvents = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user.integrations.gmail.connected) {
    res.status(400);
    throw new Error('Gmail non connecté');
  }
  
  try {
    // Configurer l'authentification avec les tokens de l'utilisateur
    oauth2Client.setCredentials({
      access_token: user.integrations.gmail.tokens.access,
      refresh_token: user.integrations.gmail.tokens.refresh
    });
    
    // Créer le client Gmail
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    
    // Récupérer les emails récents liés à l'école, aux rendez-vous, etc.
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: 'école OR rendez-vous OR médecin OR sport OR activité OR sortie OR voyage OR scolaire',
      maxResults: 20
    });
    
    const messages = response.data.messages || [];
    const events = [];
    
    // Analyser chaque email pour extraire les événements
    for (const message of messages) {
      const email = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
        format: 'full'
      });
      
      const headers = email.data.payload.headers;
      const subject = headers.find(h => h.name === 'Subject')?.value || '';
      const from = headers.find(h => h.name === 'From')?.value || '';
      const date = new Date(parseInt(email.data.internalDate));
      
      // Extraire le contenu de l'email
      let content = '';
      if (email.data.payload.parts && email.data.payload.parts.length > 0) {
        const textPart = email.data.payload.parts.find(part => part.mimeType === 'text/plain');
        if (textPart && textPart.body.data) {
          content = Buffer.from(textPart.body.data, 'base64').toString('utf-8');
        }
      } else if (email.data.payload.body && email.data.payload.body.data) {
        content = Buffer.from(email.data.payload.body.data, 'base64').toString('utf-8');
      }
      
      // Analyser le contenu pour extraire les informations d'événement
      // Ceci est une version simplifiée, une version plus robuste utiliserait NLP
      const eventInfo = extractEventInfo(subject, content);
      
      if (eventInfo) {
        // Vérifier si l'événement existe déjà
        const existingEvent = await Event.findOne({
          userId: user._id,
          source: 'gmail',
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
            source: 'gmail',
            sourceId: message.id
          });
          
          events.push(newEvent);
        }
      }
    }
    
    res.json(events);
  } catch (error) {
    console.error('Erreur extraction Gmail:', error);
    res.status(500);
    throw new Error('Erreur lors de l\'extraction des événements Gmail');
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

export { getGmailAuthUrl, gmailCallback, extractGmailEvents };

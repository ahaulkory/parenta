# Architecture de l'Application Parenta

## Vue d'ensemble

Parenta est une application PWA (Progressive Web App) conçue pour aider les parents à rester organisés avec un minimum d'effort. L'application suit une architecture client-serveur avec un frontend React et un backend Node.js/Express connecté à une base de données MongoDB.

## Architecture Frontend

### Structure des composants

```
frontend/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── icons/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   └── Navigation.js
│   │   ├── dashboard/
│   │   │   ├── DailyBriefing.js
│   │   │   ├── Calendar.js
│   │   │   ├── WeatherWidget.js
│   │   │   └── TodoList.js
│   │   ├── lists/
│   │   │   ├── GroceryList.js
│   │   │   └── ReminderList.js
│   │   ├── calendar/
│   │   │   ├── CalendarView.js
│   │   │   └── EventItem.js
│   │   ├── profile/
│   │   │   ├── ChildProfile.js
│   │   │   └── UserSettings.js
│   │   └── auth/
│   │       ├── Login.js
│   │       └── Register.js
│   ├── pages/
│   │   ├── Dashboard.js
│   │   ├── Calendar.js
│   │   ├── Lists.js
│   │   ├── Profile.js
│   │   └── Auth.js
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── calendar.js
│   │   ├── email.js
│   │   └── weather.js
│   ├── utils/
│   │   ├── dateUtils.js
│   │   └── formatters.js
│   ├── context/
│   │   ├── AuthContext.js
│   │   └── AppContext.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useApi.js
│   ├── styles/
│   │   ├── theme.js
│   │   └── global.css
│   ├── App.js
│   └── index.js
└── package.json
```

### Thème et Style

Palette de couleurs aquarelle évoquant la plage :
- Primaire : #88C0D0 (bleu clair aquatique)
- Secondaire : #EBCB8B (sable doré)
- Accent : #A3BE8C (vert algue)
- Fond : #ECEFF4 (blanc cassé)
- Texte : #4C566A (gris foncé)

## Architecture Backend

### Structure des dossiers

```
backend/
├── config/
│   ├── db.js
│   └── auth.js
├── controllers/
│   ├── userController.js
│   ├── childController.js
│   ├── calendarController.js
│   ├── emailController.js
│   ├── weatherController.js
│   └── listController.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── models/
│   ├── User.js
│   ├── Child.js
│   ├── Event.js
│   ├── List.js
│   └── ListItem.js
├── routes/
│   ├── userRoutes.js
│   ├── childRoutes.js
│   ├── calendarRoutes.js
│   ├── emailRoutes.js
│   ├── weatherRoutes.js
│   └── listRoutes.js
├── services/
│   ├── emailService.js
│   ├── calendarService.js
│   └── weatherService.js
├── utils/
│   ├── dateUtils.js
│   └── formatters.js
├── .env
├── package.json
└── server.js
```

## Modèles de données

### User
```javascript
{
  _id: ObjectId,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Child
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  firstName: String,
  age: Number,
  preferences: {
    clothing: {
      coldWeather: [String],
      warmWeather: [String],
      rainWeather: [String]
    }
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Event
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
  location: String,
  type: String, // school, doctor, birthday, etc.
  childId: ObjectId,
  source: String, // gmail, outlook, manual
  sourceId: String, // ID in the original source
  createdAt: Date,
  updatedAt: Date
}
```

### List
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  name: String,
  type: String, // grocery, todo
  createdAt: Date,
  updatedAt: Date
}
```

### ListItem
```javascript
{
  _id: ObjectId,
  listId: ObjectId,
  text: String,
  completed: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Authentification
- POST /api/auth/register - Inscription
- POST /api/auth/login - Connexion
- GET /api/auth/me - Obtenir l'utilisateur actuel

### Utilisateurs
- GET /api/users/profile - Obtenir le profil
- PUT /api/users/profile - Mettre à jour le profil

### Enfants
- GET /api/children - Obtenir tous les enfants
- POST /api/children - Ajouter un enfant
- GET /api/children/:id - Obtenir un enfant
- PUT /api/children/:id - Mettre à jour un enfant
- DELETE /api/children/:id - Supprimer un enfant

### Calendrier
- GET /api/events - Obtenir tous les événements
- POST /api/events - Ajouter un événement
- GET /api/events/:id - Obtenir un événement
- PUT /api/events/:id - Mettre à jour un événement
- DELETE /api/events/:id - Supprimer un événement
- GET /api/events/daily - Obtenir les événements du jour

### Listes
- GET /api/lists - Obtenir toutes les listes
- POST /api/lists - Créer une liste
- GET /api/lists/:id - Obtenir une liste
- PUT /api/lists/:id - Mettre à jour une liste
- DELETE /api/lists/:id - Supprimer une liste
- GET /api/lists/:id/items - Obtenir les éléments d'une liste
- POST /api/lists/:id/items - Ajouter un élément à une liste
- PUT /api/lists/:id/items/:itemId - Mettre à jour un élément
- DELETE /api/lists/:id/items/:itemId - Supprimer un élément

### Email & Calendrier
- POST /api/email/connect - Connecter un compte email
- GET /api/email/events - Extraire les événements des emails
- POST /api/calendar/connect - Connecter un calendrier
- GET /api/calendar/events - Extraire les événements du calendrier

### Météo
- GET /api/weather/current - Obtenir la météo actuelle
- GET /api/weather/forecast - Obtenir les prévisions météo
- GET /api/weather/clothing - Obtenir des suggestions vestimentaires

## Intégrations externes

### Gmail API
- Authentification OAuth2
- Extraction des emails liés à l'école
- Analyse du contenu pour identifier les événements

### Outlook API
- Authentification OAuth2
- Extraction des emails et événements du calendrier
- Synchronisation avec le calendrier de l'application

### OpenWeatherMap API
- Obtention des données météo actuelles
- Prévisions météo
- Génération de suggestions vestimentaires

### Google Calendar API (optionnel)
- Importation des événements du calendrier
- Synchronisation bidirectionnelle

## Flux de données

1. L'utilisateur se connecte à l'application
2. L'application extrait les données des emails et calendriers
3. Les événements sont analysés et stockés dans la base de données
4. L'application génère un briefing quotidien basé sur les événements du jour et la météo
5. L'utilisateur peut consulter et modifier les événements, listes et profils d'enfants
6. Les modifications sont synchronisées avec la base de données et, si applicable, avec les services externes

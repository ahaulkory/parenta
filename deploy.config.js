// Fichier de configuration pour le déploiement de l'application Parenta
// Ce fichier sera utilisé par les services de déploiement pour configurer l'environnement

module.exports = {
  // Configuration du backend
  backend: {
    // Port sur lequel le serveur doit écouter
    port: process.env.PORT || 5000,
    
    // URL de la base de données MongoDB
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/parenta',
    
    // Secret pour la génération des tokens JWT
    jwtSecret: process.env.JWT_SECRET || 'parenta_secret_key',
    
    // Durée de validité des tokens JWT
    jwtExpire: '30d',
    
    // URL du frontend pour les redirections CORS
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    
    // Configuration des API externes
    apis: {
      // Configuration de l'API Gmail
      gmail: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: process.env.GOOGLE_REDIRECT_URI
      },
      
      // Configuration de l'API Outlook
      outlook: {
        clientId: process.env.OUTLOOK_CLIENT_ID,
        clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
        redirectUri: process.env.OUTLOOK_REDIRECT_URI
      },
      
      // Configuration de l'API OpenWeatherMap
      openWeather: {
        apiKey: process.env.OPENWEATHER_API_KEY
      }
    }
  },
  
  // Configuration du frontend
  frontend: {
    // URL de l'API backend
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    
    // Configuration des API externes côté client
    apis: {
      // Configuration de l'API Gmail côté client
      gmail: {
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID
      }
    },
    
    // Configuration PWA
    pwa: {
      // Nom de l'application
      name: 'Parenta - Assistant Parental Intelligent',
      
      // Nom court de l'application (pour l'écran d'accueil)
      shortName: 'Parenta',
      
      // Couleur du thème
      themeColor: '#88C0D0',
      
      // Couleur de fond
      backgroundColor: '#ECEFF4',
      
      // Mode d'affichage
      display: 'standalone',
      
      // Orientation
      orientation: 'portrait',
      
      // Description
      description: 'Un assistant parental intelligent qui aide les parents à rester organisés avec un minimum d\'effort'
    }
  }
};

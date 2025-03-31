# Parenta - Configuration de déploiement

## Variables d'environnement requises

### Backend
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/parenta
JWT_SECRET=votre_secret_jwt_securise
GOOGLE_CLIENT_ID=votre_client_id_google
GOOGLE_CLIENT_SECRET=votre_client_secret_google
GOOGLE_REDIRECT_URI=https://votre-domaine.com/api/email/gmail/callback
OUTLOOK_CLIENT_ID=votre_client_id_outlook
OUTLOOK_CLIENT_SECRET=votre_client_secret_outlook
OUTLOOK_REDIRECT_URI=https://votre-domaine.com/api/outlook/outlook/callback
OPENWEATHER_API_KEY=votre_cle_api_openweather
FRONTEND_URL=https://votre-domaine-frontend.com
```

### Frontend
```
REACT_APP_API_URL=https://votre-domaine-backend.com/api
REACT_APP_GOOGLE_CLIENT_ID=votre_client_id_google
```

## Instructions de déploiement

### Backend (Node.js)
1. Créer un compte sur un service d'hébergement (Heroku, DigitalOcean, AWS, etc.)
2. Configurer les variables d'environnement sur la plateforme
3. Connecter le dépôt Git ou télécharger les fichiers
4. Démarrer le serveur avec `npm start`

### Frontend (React PWA)
1. Créer un compte sur un service d'hébergement statique (Netlify, Vercel, GitHub Pages, etc.)
2. Exécuter `npm run build` pour générer les fichiers de production
3. Télécharger le dossier `build` sur le service d'hébergement
4. Configurer les redirections pour le routage SPA (toutes les routes vers index.html)
5. Configurer le domaine personnalisé si nécessaire

## Vérification du déploiement
1. Tester l'accès à l'API backend via l'URL de déploiement
2. Vérifier que l'application frontend se charge correctement
3. Tester l'authentification et les fonctionnalités principales
4. Vérifier les fonctionnalités PWA (installation, mode hors ligne)
5. Tester sur différents appareils (desktop, mobile)

# Déploiement de l'application Parenta

Ce script automatise le déploiement de l'application Parenta sur les plateformes de production.

## Instructions d'utilisation

1. Assurez-vous que toutes les variables d'environnement sont configurées
2. Exécutez ce script avec `bash deploy.sh`
3. Suivez les instructions à l'écran

## Processus de déploiement

```bash
#!/bin/bash

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Déploiement de l'application Parenta ===${NC}"
echo "Ce script va déployer l'application Parenta en production."

# Vérification des prérequis
echo -e "\n${YELLOW}Vérification des prérequis...${NC}"

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js n'est pas installé. Veuillez l'installer avant de continuer.${NC}"
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm n'est pas installé. Veuillez l'installer avant de continuer.${NC}"
    exit 1
fi

echo -e "${GREEN}Tous les prérequis sont satisfaits.${NC}"

# Construction du frontend
echo -e "\n${YELLOW}Construction du frontend...${NC}"
cd frontend
npm install
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}Erreur lors de la construction du frontend.${NC}"
    exit 1
fi
echo -e "${GREEN}Frontend construit avec succès.${NC}"

# Construction du backend
echo -e "\n${YELLOW}Préparation du backend...${NC}"
cd ../backend
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}Erreur lors de la préparation du backend.${NC}"
    exit 1
fi
echo -e "${GREEN}Backend préparé avec succès.${NC}"

# Création du package de déploiement
echo -e "\n${YELLOW}Création du package de déploiement...${NC}"
cd ..
mkdir -p deploy
cp -r backend deploy/
cp -r frontend/build deploy/frontend
cp deploy.config.js deploy/
cp deployment.md deploy/README.md

echo -e "${GREEN}Package de déploiement créé avec succès dans le dossier 'deploy'.${NC}"

# Instructions pour le déploiement
echo -e "\n${YELLOW}Instructions pour le déploiement :${NC}"
echo "1. Téléchargez le dossier 'deploy' sur votre serveur."
echo "2. Configurez les variables d'environnement comme indiqué dans le fichier README.md."
echo "3. Démarrez le backend avec 'npm start' dans le dossier backend."
echo "4. Déployez le dossier frontend sur un service d'hébergement statique."

echo -e "\n${GREEN}Préparation du déploiement terminée avec succès !${NC}"
```

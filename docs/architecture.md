# Architecture du Projet

## Vue d'ensemble

Darassa Academy est une application web moderne construite avec une architecture frontend/backend. Cette architecture permet une séparation claire des responsabilités et une meilleure maintenabilité du code.

## Structure du Projet

```
darassa.academy/
├── frontend/           # Application React
│   ├── src/           # Code source
│   ├── public/        # Assets statiques
│   └── dist/          # Build de production
│
└── backend/           # API Node.js
    └── src/           # Code source
```

## Frontend

### Technologies Principales
- **React 18** : Framework UI
- **TypeScript** : Typage statique
- **Vite** : Bundler et serveur de développement
- **Tailwind CSS** : Framework CSS utilitaire
- **Zustand** : Gestion d'état
- **React Router** : Routage
- **Chart.js/Recharts** : Visualisation de données
- **Framer Motion** : Animations

### Architecture Frontend
- **Components** : Composants réutilisables
- **Pages** : Vues principales
- **Store** : État global (Zustand)
- **Services** : Appels API
- **Utils** : Fonctions utilitaires
- **Types** : Définitions TypeScript
- **Hooks** : Hooks personnalisés

## Backend

### Technologies Principales
- **Node.js** : Runtime JavaScript
- **TypeScript** : Typage statique
- **Express** : Framework web
- **MongoDB** : Base de données

### Architecture Backend
- **Controllers** : Logique métier
- **Models** : Schémas de données
- **Routes** : Définition des endpoints
- **Services** : Logique métier complexe
- **Middleware** : Fonctions intermédiaires
- **Utils** : Fonctions utilitaires
- **Config** : Configuration

## Communication Frontend-Backend

- API RESTful
- Format JSON pour les données
- Authentification JWT
- Gestion des erreurs standardisée

## Sécurité

- HTTPS obligatoire
- Protection CSRF
- Validation des entrées
- Rate limiting
- Sanitization des données

## Performance

- Lazy loading des composants
- Code splitting
- Caching
- Optimisation des images
- Compression des assets

## Déploiement

- Frontend : Vercel/Netlify
- Backend : Heroku/DigitalOcean
- Base de données : MongoDB Atlas
- CI/CD : GitHub Actions 
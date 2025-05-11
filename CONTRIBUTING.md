# Guide du Contributeur

## Prérequis

### 1. Outils de développement
- Node.js (v18 ou supérieur)
- npm (v9 ou supérieur)
- Git
- Docker et Docker Compose
- PostgreSQL (v15 ou supérieur)
- Redis (v7 ou supérieur)

### 2. Éditeur de code recommandé
- VS Code avec les extensions suivantes :
  - ESLint
  - Prettier
  - GitLens
  - Docker
  - PostgreSQL

## Installation

### 1. Cloner le projet
```bash
git clone https://github.com/kamsdvd/darassa.academy.git
cd darassa.academy
```

### 2. Installer les dépendances
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Configuration de l'environnement
```bash
# Backend
cp .env.example .env
# Modifier les variables d'environnement selon vos besoins

# Frontend
cp .env.example .env.local
# Modifier les variables d'environnement selon vos besoins
```

### 4. Base de données
```bash
# Démarrer PostgreSQL et Redis avec Docker
docker-compose up -d

# Appliquer les migrations
cd backend
npm run migration:run
```

### 5. Lancer le projet
```bash
# Backend (dans le dossier backend)
npm run start:dev

# Frontend (dans le dossier frontend)
npm run dev
```

## Workflow de développement

### 1. Créer une branche
```bash
git checkout -b feature/nom-de-la-fonctionnalite
```

### 2. Développer
- Suivre les conventions de code
- Écrire des tests
- Documenter le code

### 3. Commiter
```bash
git add .
git commit -m "type(scope): description"
```

### 4. Pousser les changements
```bash
git push origin feature/nom-de-la-fonctionnalite
```

### 5. Créer une Pull Request
- Utiliser le template de PR
- Ajouter les reviewers
- Attendre les reviews

## Conventions de code

### 1. Style de code
- Utiliser ESLint et Prettier
- Suivre les conventions TypeScript
- Documenter les fonctions et classes

### 2. Tests
- Écrire des tests unitaires
- Écrire des tests d'intégration
- Maintenir la couverture de tests

### 3. Documentation
- Documenter les APIs
- Mettre à jour le README
- Commenter le code complexe

## Structure du projet

### 1. Backend
```
src/
├── modules/          # Modules de l'application
├── common/           # Code partagé
├── config/           # Configuration
└── main.ts          # Point d'entrée
```

### 2. Frontend
```
src/
├── components/       # Composants React
├── pages/           # Pages Next.js
├── styles/          # Styles CSS
└── utils/           # Utilitaires
```

## Scripts utiles

### Backend
```bash
# Lancer les tests
npm run test

# Lancer les tests avec couverture
npm run test:cov

# Lancer le linter
npm run lint

# Appliquer les migrations
npm run migration:run

# Générer les migrations
npm run migration:generate
```

### Frontend
```bash
# Lancer les tests
npm run test

# Lancer le linter
npm run lint

# Build pour la production
npm run build
```

## Débogage

### 1. Backend
- Utiliser les logs
- Utiliser le debugger de VS Code
- Vérifier les logs de la base de données

### 2. Frontend
- Utiliser les DevTools
- Utiliser React Developer Tools
- Vérifier les logs du navigateur

## Ressources

### 1. Documentation
- [NestJS](https://docs.nestjs.com/)
- [Next.js](https://nextjs.org/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [PostgreSQL](https://www.postgresql.org/docs/)

### 2. Outils
- [Git](https://git-scm.com/doc)
- [Docker](https://docs.docker.com/)
- [VS Code](https://code.visualstudio.com/docs)

## Support

Pour toute question ou problème :
1. Consulter la documentation
2. Chercher dans les issues existantes
3. Créer une nouvelle issue si nécessaire
4. Contacter l'équipe de développement 
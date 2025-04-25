# Darassa Academy Backend

Ce projet est le backend de l'application Darassa Academy, une plateforme d'apprentissage en ligne.

## Technologies utilisées

- Node.js
- Express.js
- TypeScript
- MongoDB
- JWT pour l'authentification
- Nodemailer pour l'envoi d'emails
- Jest pour les tests

## Prérequis

- Node.js (v14 ou supérieur)
- MongoDB (v4.4 ou supérieur)
- npm ou yarn

## Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/votre-username/darassa-academy.git
cd darassa-academy/backend
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer les variables d'environnement :
```bash
cp .env.example .env
```
Puis modifiez le fichier `.env` avec vos propres valeurs.

4. Compiler le projet :
```bash
npm run build
```

5. Démarrer le serveur :
```bash
npm start
```

Pour le développement, utilisez :
```bash
npm run dev
```

## Structure du projet

```
backend/
├── src/
│   ├── controllers/    # Contrôleurs de l'application
│   ├── middleware/     # Middleware Express
│   ├── models/         # Modèles Mongoose
│   ├── routes/         # Routes de l'API
│   ├── services/       # Services métier
│   ├── templates/      # Templates d'emails
│   ├── tests/          # Tests unitaires et d'intégration
│   ├── types/          # Types TypeScript
│   └── server.ts       # Point d'entrée de l'application
├── .env                # Variables d'environnement
├── .env.example        # Exemple de variables d'environnement
├── .gitignore          # Fichiers ignorés par Git
├── jest.config.js      # Configuration Jest
├── package.json        # Dépendances et scripts
└── tsconfig.json       # Configuration TypeScript
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Inscription d'un nouvel utilisateur
- `POST /api/auth/login` - Connexion d'un utilisateur
- `POST /api/auth/logout` - Déconnexion d'un utilisateur
- `GET /api/auth/me` - Récupérer les informations de l'utilisateur connecté
- `POST /api/auth/forgot-password` - Demande de réinitialisation de mot de passe
- `POST /api/auth/reset-password/:token` - Réinitialisation de mot de passe
- `GET /api/auth/verify-email/:token` - Vérification d'email

## Tests

Pour exécuter les tests :
```bash
npm test
```

Pour exécuter les tests avec couverture :
```bash
npm run test:coverage
```

## Sécurité

- Authentification JWT
- Hachage des mots de passe avec bcrypt
- Protection contre les attaques CSRF
- Rate limiting pour prévenir les attaques par force brute
- Validation des entrées utilisateur
- Journalisation des actions (audit)

## Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add some amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Contact

Votre Nom - [@votre_twitter](https://twitter.com/votre_twitter) - email@example.com

Lien du projet : [https://github.com/votre-username/darassa-academy](https://github.com/votre-username/darassa-academy) 
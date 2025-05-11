# Darassa Academy

![CI](https://github.com/kamsdvd/darassa.academy/actions/workflows/ci.yml/badge.svg)

Une plateforme d'apprentissage moderne construite avec React et Node.js.

## ⚙️ Méthodologie de développement

- Approche modulaire (modules indépendants et cohérents)
- Développement piloté par les tests (TDD)
- Revue de code systématique
- Intégration continue (CI/CD) avec GitHub Actions
- Documentation technique à jour

## 🚀 Technologies

### Frontend
- React 18 avec TypeScript
- Vite comme bundler
- Tailwind CSS pour le styling
- React Router pour la navigation
- Zustand pour la gestion d'état
- Chart.js et Recharts pour les visualisations
- Framer Motion pour les animations
- Support PWA

### Backend
- Node.js avec TypeScript
- API RESTful

## 🛠️ Installation

1. Clonez le repository :
```bash
git clone https://github.com/kamsdvd/darassa.academy.git
cd darassa.academy
```

2. Installez les dépendances du frontend :
```bash
cd frontend
npm install
```

3. Installez les dépendances du backend :
```bash
cd ../backend
npm install
```

## 🏃‍♂️ Démarrage

### Frontend
```bash
cd frontend
npm run dev
```
Le frontend sera accessible à l'adresse : http://localhost:5173

### Backend
```bash
cd backend
npm run dev
```
Le backend sera accessible à l'adresse : http://localhost:3000

## 📝 Scripts Disponibles

### Frontend
- `npm run dev` : Lance le serveur de développement
- `npm run build` : Crée une version de production
- `npm run lint` : Vérifie le code avec ESLint
- `npm run preview` : Prévisualise la version de production

### Backend
- `npm run dev` : Lance le serveur de développement
- `npm run build` : Compile le TypeScript
- `npm start` : Démarre le serveur en production

## 🧪 Tests

Pour exécuter les tests :
```bash
# Frontend
cd frontend
npm test

# Backend
cd backend
npm test
```

## 📚 Documentation

La documentation détaillée est disponible dans le dossier `docs/` :
- [Guide de Contribution](CONTRIBUTING.md)
- [Architecture](docs/architecture.md)
- [API Reference](docs/api.md)

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez notre [guide de contribution](CONTRIBUTING.md) pour plus de détails.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Auteurs

- David Kalambay - Développeur Principal

## 🙏 Remerciements

- Merci à tous les contributeurs qui ont participé au projet
- Merci à la communauté open source pour les outils et bibliothèques utilisés
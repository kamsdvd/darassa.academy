# Documentation Technique - Darassa Academy

## Architecture du Projet

### Structure des Dossiers
```
src/
├── api/              # Services et hooks d'API
├── components/       # Composants React
│   ├── common/      # Composants réutilisables
│   ├── layout/      # Composants de mise en page
│   └── ui/          # Composants du Design System
├── hooks/           # Hooks personnalisés
├── pages/           # Pages Next.js
├── store/           # Configuration Redux
├── styles/          # Styles globaux et thèmes
└── types/           # Types TypeScript
```

### Technologies Utilisées
- **Framework**: Next.js avec TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Tests**: Jest et React Testing Library
- **Linting**: ESLint avec Prettier

## Composants

### Design System
Notre Design System est composé des composants suivants :

1. **Button**
   - Variants: primary, secondary, outline, ghost
   - Tailles: sm, md, lg
   - Support pour les icônes et l'état de chargement

2. **Input**
   - Support pour les labels et les messages d'erreur
   - Icônes gauche et droite
   - Validation intégrée

3. **Select**
   - Options personnalisables
   - Support pour les labels et les erreurs
   - Icônes personnalisables

4. **Badge**
   - Variants: primary, secondary, success, error, warning
   - Tailles: sm, md, lg

5. **Card**
   - Variants: elevated, outlined, filled
   - Composants: Header, Body, Footer
   - Padding personnalisable

### Hooks Personnalisés

1. **useAuth**
```typescript
const { user, login, logout, register } = useAuth();
```
- Gestion de l'authentification
- Persistance de session
- Protection des routes

2. **useCourses**
```typescript
const { courses, loading, error, getCourses, getCourseById } = useCourses();
```
- Récupération des cours
- Filtrage et recherche
- Gestion du cache

## State Management

### Redux Store
```typescript
interface RootState {
  auth: AuthState;
  courses: CoursesState;
  ui: UIState;
}
```

### Slices
1. **authSlice**
   - Gestion de l'état d'authentification
   - Actions: login, logout, register

2. **coursesSlice**
   - Gestion des cours
   - Actions: fetchCourses, filterCourses

3. **uiSlice**
   - Gestion des notifications
   - Actions: showNotification, hideNotification

## API

### Endpoints
```typescript
const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  COURSES: {
    LIST: '/courses',
    DETAIL: '/courses/:id',
    ENROLL: '/courses/:id/enroll',
  },
};
```

### Intercepteurs
- Gestion automatique des tokens
- Gestion des erreurs
- Retry sur échec

## Tests

### Configuration Jest
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
```

### Tests des Composants
```typescript
describe('Button', () => {
  it('renders correctly', () => {
    // Test de rendu
  });

  it('handles click events', () => {
    // Test d'interaction
  });
});
```

## Bonnes Pratiques

### Nommage
- Composants: PascalCase
- Hooks: camelCase avec préfixe 'use'
- Types/Interfaces: PascalCase
- Fichiers: kebab-case

### Imports
```typescript
// Ordre des imports
import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/ui';
import { useAuth } from '@/hooks';
import { login } from '@/store/slices/authSlice';
```

### Documentation des Composants
```typescript
/**
 * @component Button
 * @description Bouton personnalisable avec différentes variantes
 * @param {ButtonProps} props - Propriétés du bouton
 * @returns {JSX.Element} Composant Button
 */
```

## Déploiement

### Environnements
- Development: `http://localhost:3000`
- Staging: `https://staging.darassa.academy`
- Production: `https://darassa.academy`

### Variables d'Environnement
```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_SENTRY_DSN=
```

## Maintenance

### Mises à Jour
- Mise à jour régulière des dépendances
- Tests après chaque mise à jour
- Documentation des changements

### Monitoring
- Sentry pour le suivi des erreurs
- Google Analytics pour les métriques
- Logs personnalisés

## Contribution

### Workflow Git
1. Créer une branche feature
2. Développer et tester
3. Créer une Pull Request
4. Review et merge

### Standards de Code
- ESLint pour le linting
- Prettier pour le formatage
- Tests unitaires obligatoires
- Documentation des composants 
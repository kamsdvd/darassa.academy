# Guide de Développement - Darassa Academy

## Prérequis

### Installation
1. Node.js (v18 ou supérieur)
2. npm ou yarn
3. Git

### Configuration de l'Environnement
```bash
# Cloner le repository
git clone https://github.com/your-org/darassa.academy.git

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local

# Démarrer le serveur de développement
npm run dev
```

## Workflow de Développement

### 1. Création d'une Branche
```bash
# Créer une nouvelle branche
git checkout -b feature/nom-de-la-fonctionnalite

# Ou pour une correction de bug
git checkout -b fix/nom-du-bug
```

### 2. Développement
- Suivre les conventions de code
- Écrire des tests unitaires
- Documenter les composants
- Utiliser les composants du Design System

### 3. Tests
```bash
# Lancer les tests
npm test

# Lancer les tests en mode watch
npm test:watch

# Vérifier la couverture des tests
npm test:coverage
```

### 4. Linting et Formatage
```bash
# Vérifier le code
npm run lint

# Formater le code
npm run format
```

### 5. Commit
```bash
# Ajouter les fichiers
git add .

# Créer un commit
git commit -m "feat: ajout de la fonctionnalité X"
```

### 6. Pull Request
1. Pousser les changements
```bash
git push origin feature/nom-de-la-fonctionnalite
```

2. Créer une Pull Request sur GitHub
   - Description claire des changements
   - Référence aux issues concernées
   - Screenshots si nécessaire

## Conventions de Code

### Nommage
- **Composants**: PascalCase
  ```typescript
  // ✅ Bon
  const UserProfile = () => {};
  
  // ❌ Mauvais
  const userProfile = () => {};
  ```

- **Hooks**: camelCase avec préfixe 'use'
  ```typescript
  // ✅ Bon
  const useAuth = () => {};
  
  // ❌ Mauvais
  const Auth = () => {};
  ```

- **Fichiers**: kebab-case
  ```
  // ✅ Bon
  user-profile.tsx
  auth-service.ts
  
  // ❌ Mauvais
  UserProfile.tsx
  authService.ts
  ```

### Structure des Composants
```typescript
// 1. Imports
import React from 'react';
import { useRouter } from 'next/router';

// 2. Types/Interfaces
interface Props {
  // ...
}

// 3. Composant
export const Component: React.FC<Props> = ({ prop1, prop2 }) => {
  // 4. Hooks
  const router = useRouter();

  // 5. Logique
  const handleClick = () => {
    // ...
  };

  // 6. Rendu
  return (
    // ...
  );
};
```

### Utilisation du Design System
```typescript
import { Button, Input, Card } from '@/components/ui';

// ✅ Bon
<Button variant="primary" size="md">
  Cliquer
</Button>

// ❌ Mauvais
<button className="bg-blue-500 text-white px-4 py-2">
  Cliquer
</button>
```

## Tests

### Structure des Tests
```typescript
describe('Component', () => {
  // Setup
  beforeEach(() => {
    // ...
  });

  // Tests de rendu
  it('should render correctly', () => {
    // ...
  });

  // Tests d'interaction
  it('should handle user interaction', () => {
    // ...
  });

  // Tests d'état
  it('should update state correctly', () => {
    // ...
  });
});
```

### Bonnes Pratiques
1. Tester le comportement, pas l'implémentation
2. Utiliser des données de test réalistes
3. Tester les cas d'erreur
4. Maintenir les tests à jour

## Déploiement

### Environnements
1. **Development**
   ```bash
   npm run dev
   ```

2. **Staging**
   ```bash
   npm run build:staging
   npm run start:staging
   ```

3. **Production**
   ```bash
   npm run build
   npm run start
   ```

### Vérifications Pré-déploiement
1. Tests passent
2. Linting OK
3. Build réussit
4. Documentation à jour

## Ressources

### Documentation
- [Documentation Technique](./technical.md)
- [Design System](./design-system.md)
- [API Documentation](./api.md)

### Outils
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [Jest Documentation](https://jestjs.io/docs)

### Support
- Créer une issue sur GitHub
- Contacter l'équipe de développement
- Consulter la documentation interne 
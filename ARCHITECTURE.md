# Architecture du projet Darassa Academy

Ce projet utilise une architecture modulaire moderne pour le frontend (React + Vite + TypeScript) et le backend (Express + TypeScript + Prisma).

## Frontend

- **features/** : Un dossier par domaine métier (auth, courses, user, etc.), chaque feature contient ses propres composants, hooks, services et types.
- **components/** : Composants UI réutilisables (boutons, cards, etc.).
- **hooks/** : Hooks globaux (useFetch, etc.).
- **pages/** : Pages principales routées.
- **routes/** : Définition des routes (React Router).
- **styles/** : Fichiers CSS/Tailwind globaux.
- **utils/** : Fonctions utilitaires globales.

**Exemple :**
```
src/features/auth/
  components/
    LoginForm.tsx
  hooks/
    useAuth.ts
  services/
    authService.ts
  types.ts
  index.ts
```

## Backend

- **controllers/** : Un contrôleur par ressource (auth, course, user, etc.).
- **routes/** : Un fichier de routes par ressource.
- **services/** : Logique métier par ressource.
- **middlewares/** : Middlewares Express (auth, error, etc.).
- **server.ts** : Point d’entrée principal.

**Exemple :**
```
src/controllers/auth.controller.ts
src/routes/auth.routes.ts
src/services/auth.service.ts
src/middlewares/auth.middleware.ts
```

## Avantages
- **Modularité** : Chaque domaine métier est isolé, facilitant la maintenance et l’évolution.
- **Scalabilité** : Ajout de nouvelles features sans impacter le reste du code.
- **Lisibilité** : Structure claire et prévisible pour tous les développeurs.

--- 
# Changelog

Toutes les modifications notables apportées à ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
et ce projet adhère à [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Refactor
- **Migration des formations vers les cours et utilisation de données statiques :**
  - Renommage de tous les composants, pages, données, hooks et services liés aux "formations" en "cours" dans le frontend.
  - Configuration du frontend pour qu'il utilise les données statiques des cours depuis `frontend/src/data/courses.ts` au lieu de faire des appels API, assurant ainsi l'isolation du frontend pour le MVP.
  - Correction des erreurs `ReferenceError` dans `CourseCategories.tsx`, `CourseHero.tsx`, `CourseBenefits.tsx`, `CourseTestimonials.tsx` et `CourseFAQ.tsx` en alignant les définitions des composants avec leurs exportations par défaut.
  - Intégration de `QueryClientProvider` dans `main.tsx` pour configurer correctement TanStack Query.

### Changed
- **Refactorisation de la terminologie :** Standardisation du projet pour utiliser le terme `course` au lieu de `formation` afin d'assurer la cohérence du code.
  - Mise à jour des composants, types, variables et appels API dans le frontend.
  - Cette modification clarifie la base de code et réduit les ambiguïtés.

---
*Entrées futures à ajouter au-dessus de celle-ci.*

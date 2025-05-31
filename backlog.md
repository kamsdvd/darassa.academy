# Backlog Priorisé – MVP Darassa Academy

Ce backlog liste les issues essentielles à la réalisation du MVP, classées par ordre de priorité. Chaque issue est référencée avec son fichier source pour faciliter le suivi.

---

## 1. Architecture & State Management
- **Issue #1** : Implémentation de Redux Toolkit ([docs/issues/state-management.md](docs/issues/state-management.md))
  - Résultat attendu : Store Redux configuré avec des slices pour chaque domaine fonctionnel
  - Tests de performance validant l'absence de re-rendus inutiles
  - Documentation des patterns d'utilisation

- **Issue #2** : Gestion des Requêtes API avec React Query ([docs/issues/state-management.md](docs/issues/state-management.md))
  - Résultat attendu : Cache automatique des requêtes API
  - Gestion optimisée des états de chargement et d'erreur
  - Mise en place des mutations pour les opérations POST/PUT/DELETE

- **Issue #3** : Refactoring de l'Architecture Frontend ([docs/issues/architecture.md](docs/issues/architecture.md))
  - Résultat attendu : Structure de dossiers claire et cohérente
  - Séparation nette des responsabilités
  - Documentation de l'architecture

- **Issue #4** : Mise en Place des Services API ([docs/issues/architecture.md](docs/issues/architecture.md))
  - Résultat attendu : Services API centralisés et typés
  - Gestion unifiée des erreurs
  - Tests d'intégration des services

## 2. Sécurité & Authentification
- **Issue #9** : Gestion des Tokens ([docs/issues/security.md](docs/issues/security.md))
  - Résultat attendu : Stockage sécurisé des tokens
  - Renouvellement automatique des tokens
  - Gestion des sessions expirées

- **Issue #10** : Protection des Routes ([docs/issues/security.md](docs/issues/security.md))
  - Résultat attendu : Middleware d'authentification fonctionnel
  - Redirection automatique vers login
  - Gestion des rôles et permissions

- **Issue #17** : Problèmes Critiques du Formulaire d'Inscription ([docs/issues/auth.md](docs/issues/auth.md))
  - Résultat attendu : Formulaire 100% fonctionnel
  - Validation robuste des données
  - Messages d'erreur clairs et localisés
  - Tests automatisés passant à 100%

- **Issue #18** : Consolidation des Services d'Authentification ([docs/issues/auth.md](docs/issues/auth.md))
  - Résultat attendu : Service d'auth unifié et documenté
  - Types TypeScript cohérents
  - Gestion des erreurs standardisée

- **Issue #19** : Réorganisation de la Structure Auth ([docs/issues/auth.md](docs/issues/auth.md))
  - Résultat attendu : Structure de dossiers optimisée
  - Documentation complète
  - Tests de sécurité passés

## 3. Fonctionnalités Utilisateur de Base
- **Issue #5** : Implémentation de React Hook Form ([docs/issues/forms-validation.md](docs/issues/forms-validation.md))
  - Résultat attendu : Formulaires performants et accessibles
  - Validation en temps réel
  - Gestion optimisée des états de formulaire

- **Issue #6** : Système de Validation Centralisé ([docs/issues/forms-validation.md](docs/issues/forms-validation.md))
  - Résultat attendu : Schémas de validation réutilisables
  - Messages d'erreur cohérents
  - Tests de validation complets

## 4. Performance
- **Issue #7** : Optimisation des Rendus ([docs/issues/performance.md](docs/issues/performance.md))
  - Résultat attendu : Score Lighthouse > 90
  - Réduction des re-rendus inutiles
  - Métriques de performance documentées

- **Issue #8** : Optimisation du Bundle ([docs/issues/performance.md](docs/issues/performance.md))
  - Résultat attendu : Taille du bundle < 500KB
  - Code splitting efficace
  - Chargement optimisé des assets

## 5. Tests
- **Issue #11** : Tests Unitaires ([docs/issues/testing.md](docs/issues/testing.md))
  - Résultat attendu : Couverture de tests > 80%
  - Tests isolés et maintenables
  - CI/CD configuré

- **Issue #12** : Tests d'Intégration ([docs/issues/testing.md](docs/issues/testing.md))
  - Résultat attendu : Tests E2E critiques
  - Scénarios utilisateur couverts
  - Documentation des tests

## 6. Design System & UI
- **Issue #15** : Création du Design System ([docs/issues/design-system.md](docs/issues/design-system.md))
  - Résultat attendu : Guide de style complet
  - Composants de base documentés
  - Storybook à jour

- **Issue #16** : Composants UI ([docs/issues/design-system.md](docs/issues/design-system.md))
  - Résultat attendu : Composants réutilisables
  - Tests de composants
  - Documentation interactive

## 7. Documentation
- **Issue #13** : Documentation des Composants ([docs/issues/documentation.md](docs/issues/documentation.md))
  - Résultat attendu : Documentation technique complète
  - Exemples d'utilisation
  - API Reference

- **Issue #14** : Documentation API ([docs/issues/documentation.md](docs/issues/documentation.md))
  - Résultat attendu : Swagger/OpenAPI à jour
  - Exemples de requêtes
  - Guide d'intégration

## 8. Module Formation

- **Backend - Définir le modèle de données "Formation"** 
  - Résultat attendu : Modèle de données validé
  - Migrations créées
  - Tests du modèle

- **Backend - Implémenter l'endpoint API GET /api/formations**
  - Résultat attendu : Endpoint fonctionnel et documenté
  - Pagination implémentée
  - Tests d'intégration

- **Backend - Implémenter l'endpoint API GET /api/formations/:id**
  - Résultat attendu : Endpoint fonctionnel
  - Gestion des erreurs
  - Tests unitaires

- **Backend - Implémenter les endpoints API pour CUD Formations**
  - Résultat attendu : Endpoints sécurisés
  - Validation des données
  - Tests d'autorisation

- **Frontend - Créer un service ou hook pour les API de Formation**
  - Résultat attendu : Hook réutilisable
  - Gestion du cache
  - Tests du hook

- **Frontend - Mettre à jour la page Liste des formations**
  - Résultat attendu : Liste dynamique
  - États de chargement/erreur
  - Tests E2E

- **Frontend - Mettre à jour la page Détail de la formation**
  - Résultat attendu : Page détaillée
  - Gestion des erreurs
  - Tests E2E

- **Frontend - Refactoriser les composants**
  - Résultat attendu : Code propre
  - Pas de données en dur
  - Tests à jour

- **Backend - Ajouter le champ `googleMeetLink`**
  - Résultat attendu : Migration créée
  - Tests du modèle
  - Documentation mise à jour

- **Backend - Inclure les détails des Sessions**
  - Résultat attendu : API enrichie
  - Tests d'intégration
  - Documentation mise à jour

- **Frontend - Afficher les sessions en ligne**
  - Résultat attendu : UI intuitive
  - Gestion des liens
  - Tests E2E

- **(Optionnel) Back Office - Créer une interface d'administration**
  - Résultat attendu : Interface admin complète
  - CRUD fonctionnel
  - Tests E2E

---

**Ordre de réalisation** :
1. Architecture & State Management
2. Sécurité & Authentification
3. Fonctionnalités Utilisateur de Base
4. Performance
5. Tests
6. Design System & UI
7. Documentation
8. Module Formation

> Ce backlog doit être suivi pour garantir la livraison rapide et professionnelle du MVP. 
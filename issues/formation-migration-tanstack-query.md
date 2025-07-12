# Organisation des branches MVP

Pour livrer rapidement une version MVP, créez les branches suivantes :

## Modules principaux

- **auth-inscription** : Inscription utilisateur
- **auth-connexion** : Connexion utilisateur
- **auth-session** : Gestion de session (tokens)

- **user-profil-affichage** : Affichage du profil utilisateur
- **user-profil-edition** : Edition du profil utilisateur

- **training-liste** : Liste des formations/cours
- **training-detail** : Détail d’une formation
- **training-inscription** : Inscription à une formation
- **training-progression** : Suivi de progression

- **common-ui** : Composants UI partagés (boutons, inputs, notifications)

## Backend

- **backend-crud** : Endpoints CRUD pour les entités principales
- **backend-validation** : Validation des données reçues
- **backend-erreurs** : Gestion et retour d’erreurs exploitables

## Robustesse & UX

- **frontend-validation** : Validation des formulaires côté frontend
- **frontend-notifications** : Notifications utilisateur (succès/erreur)
- **frontend-permissions** : Gestion des permissions
- **frontend-loaders** : Loaders/spinners pour les chargements
- **frontend-tests** : Tests unitaires et d’intégration de base

---

Repoussez les modules secondaires (blog, jobs, entreprise, centre, évaluations avancées, etc.) à des versions ultérieures.

Organisez le code par module (dossier par domaine) :  
- Components (UI)  
- Services (API)  
- Hooks (logique réutilisable)  
- Types (TypeScript)  
- Utils (fonctions utilitaires)  

Livrez le parcours utilisateur principal de bout en bout, puis ajoutez la robustesse et gardez une structure modulaire pour faciliter l’évolution.

# Issues à traiter pour le module Formation (ajoutées suite à la migration TanStack Query v5)

## Frontend
- [ ] Validation des données côté formulaire avant envoi au backend (types, champs obligatoires, messages d’erreur)
- [ ] Ajout de notifications utilisateur (succès/erreur) lors des opérations CRUD (toasts, alertes)
- [ ] Amélioration de la gestion des erreurs dans les hooks (affichage, logs)
- [ ] Vérification et optimisation du cache/staleTime selon les besoins métier
- [ ] Ajout de loaders/spinners pour les états de chargement
- [ ] Ajout de tests unitaires et d’intégration pour les hooks et helpers de mapping
- [ ] Vérification des permissions et sécurité sur les opérations CRUD

## Backend
- [ ] Vérifier la validation des payloads reçus du frontend
- [ ] S’assurer que les endpoints renvoient des erreurs claires et exploitables

> Ces points sont à prioriser dans le backlog pour garantir la robustesse et l’expérience utilisateur du module Formation.

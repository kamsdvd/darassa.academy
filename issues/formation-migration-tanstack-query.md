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

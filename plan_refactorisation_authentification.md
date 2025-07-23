voici le plan de travail : 
1. Analyser l'API d'authentification existante (backend) et ses endpoints (login, register, logout, refresh, etc.).
2. Vérifier ou créer les services d'appel API côté frontend pour l'authentification (login, register, etc.).
3. Créer ou corriger les hooks React pour l'auth (useAuth, useLogin, etc.) et leur intégration avec le contexte global si besoin.
4. Connecter les formulaires d'authentification frontend (login/register) aux services et hooks, avec gestion des erreurs et des états de chargement.
5. Mettre en place la gestion du token (stockage sécurisé, rafraîchissement, suppression à la déconnexion) côté frontend.
6. Vérifier la gestion des sessions côté backend (JWT, cookies, refresh token, etc.) et la sécurisation des endpoints protégés.
7. Écrire des tests d'intégration pour l'authentification (frontend et backend).
8. Documenter le flux d'authentification (schéma, README, etc.).
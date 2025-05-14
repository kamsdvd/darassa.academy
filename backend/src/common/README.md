# Dossier `common`

Ce dossier centralise les utilitaires, helpers et middlewares génériques partagés dans tout le backend.

## Structure suggérée

```
common/
├── middlewares/      # Middlewares génériques (erreur, logger, etc.)
├── helpers/          # Fonctions utilitaires (formatage, validation, etc.)
└── README.md         # Documentation du dossier
```

## Bonnes pratiques
- Placez ici tout code réutilisable dans plusieurs modules (hors logique métier).
- Documentez chaque utilitaire ou middleware pour faciliter la maintenance.
- Mettez à jour ce README à chaque ajout. 
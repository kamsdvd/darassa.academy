# Convention de Commit

Ce document définit les conventions de commit pour le projet Darassa Academy.

## Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

## Types

- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage, point-virgules manquants, etc.
- `refactor`: Refactoring de code
- `test`: Ajout ou modification de tests
- `chore`: Mise à jour des dépendances, configuration, etc.
- `perf`: Amélioration des performances
- `ci`: Configuration CI
- `build`: Build système ou dépendances externes
- `revert`: Revert d'un commit

## Scope

Le scope est optionnel et représente la section du projet affectée :

- `auth`: Module d'authentification
- `user`: Module utilisateur
- `training`: Module formation
- `center`: Module centre
- `enterprise`: Module entreprise
- `jobs`: Module emploi
- `blog`: Module blog
- `common`: Module commun
- `deps`: Dépendances
- `config`: Configuration
- `docs`: Documentation

## Description

- Utiliser l'impératif présent
- Ne pas capitaliser la première lettre
- Pas de point à la fin
- Maximum 72 caractères

## Exemples

```
feat(auth): ajout de l'authentification JWT
fix(user): correction du bug de validation d'email
docs: mise à jour du README
style: formatage du code selon les standards
refactor(training): simplification de la logique de réservation
test: ajout des tests pour le module center
chore: mise à jour des dépendances
perf: optimisation des requêtes SQL
ci: configuration de GitHub Actions
build: mise à jour de webpack
revert: revert de la fonctionnalité X
```

## Footer

Le footer est optionnel et peut contenir :
- Références aux issues
- Breaking changes
- Autres informations pertinentes

Exemple :
```
feat(auth): ajout de l'authentification JWT

BREAKING CHANGE: La structure de la table users a été modifiée

Closes #123
``` 
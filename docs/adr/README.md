# Architecture Decision Records

Ce dossier contient les décisions techniques importantes prises pendant le développement du projet.

## Format

Chaque ADR suit le format suivant :

```markdown
# ADR-0001: Titre de la décision

## Statut
[Proposé | Accepté | Rejeté | Déprécié | Remplacé par ADR-XXXX]

## Contexte
Description du problème ou de la situation qui a nécessité cette décision.

## Décision
Description de la décision prise.

## Conséquences
Les conséquences positives et négatives de cette décision.

## Alternatives considérées
Les autres options qui ont été envisagées et pourquoi elles ont été rejetées.
```

## Liste des ADRs

### 1. Architecture
- [ADR-0001: Choix de l'architecture microservices](./0001-microservices-architecture.md)
- [ADR-0002: Utilisation de NestJS comme framework backend](./0002-nestjs-framework.md)
- [ADR-0003: Utilisation de Next.js comme framework frontend](./0003-nextjs-framework.md)

### 2. Base de données
- [ADR-0004: Choix de PostgreSQL comme SGBD principal](./0004-postgresql-database.md)
- [ADR-0005: Stratégie de migration de base de données](./0005-database-migration-strategy.md)
- [ADR-0006: Utilisation de Redis pour le cache](./0006-redis-caching.md)

### 3. API
- [ADR-0007: Design de l'API REST](./0007-rest-api-design.md)
- [ADR-0008: Stratégie de versioning de l'API](./0008-api-versioning.md)
- [ADR-0009: Gestion de l'authentification](./0009-authentication-strategy.md)

### 4. Frontend
- [ADR-0010: Gestion d'état avec Redux](./0010-redux-state-management.md)
- [ADR-0011: Stratégie de styling](./0011-styling-strategy.md)
- [ADR-0012: Internationalisation](./0012-internationalization.md)

### 5. DevOps
- [ADR-0013: Stratégie de déploiement](./0013-deployment-strategy.md)
- [ADR-0014: Monitoring et logging](./0014-monitoring-logging.md)
- [ADR-0015: Gestion des secrets](./0015-secrets-management.md)

### 6. Sécurité
- [ADR-0016: Politique de sécurité](./0016-security-policy.md)
- [ADR-0017: Gestion des permissions](./0017-permissions-management.md)
- [ADR-0018: Protection contre les attaques courantes](./0018-security-protection.md)

### 7. Performance
- [ADR-0019: Stratégie de caching](./0019-caching-strategy.md)
- [ADR-0020: Optimisation des performances](./0020-performance-optimization.md)
- [ADR-0021: Gestion des assets statiques](./0021-static-assets-management.md)

## Comment créer une nouvelle ADR

1. Copier le template `template.md`
2. Renommer avec le prochain numéro disponible
3. Remplir les sections
4. Ajouter un lien dans cette liste
5. Soumettre une PR pour review

## Processus de review

1. L'ADR doit être revue par au moins 2 membres de l'équipe
2. Les commentaires doivent être adressés
3. Le statut doit être mis à jour
4. Une fois acceptée, l'ADR ne peut être modifiée que par une nouvelle ADR 
$token = "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"
$headers = @{
    "Authorization" = "token $token"
    "Accept" = "application/vnd.github.v3+json"
}

$issues = @(
    @{
        title = "Issue #1: Implémentation de Redux Toolkit"
        body = @"
## Description
Implémentation de Redux Toolkit pour la gestion d'état de l'application.

## Résultats attendus
- Store Redux configuré avec des slices pour chaque domaine fonctionnel
- Tests de performance validant l'absence de re-rendus inutiles
- Documentation des patterns d'utilisation

## Labels
- enhancement
- state-management
- priority-high

## Fichier source
[docs/issues/state-management.md](docs/issues/state-management.md)
"@
        labels = @("enhancement", "state-management", "priority-high")
    },
    @{
        title = "Issue #2: Gestion des Requêtes API avec React Query"
        body = @"
## Description
Mise en place de React Query pour la gestion optimisée des requêtes API.

## Résultats attendus
- Cache automatique des requêtes API
- Gestion optimisée des états de chargement et d'erreur
- Mise en place des mutations pour les opérations POST/PUT/DELETE

## Labels
- enhancement
- state-management
- priority-high

## Fichier source
[docs/issues/state-management.md](docs/issues/state-management.md)
"@
        labels = @("enhancement", "state-management", "priority-high")
    },
    @{
        title = "Issue #3: Refactoring de l'Architecture Frontend"
        body = @"
## Description
Refactoring de l'architecture frontend pour une meilleure organisation et maintenabilité.

## Résultats attendus
- Structure de dossiers claire et cohérente
- Séparation nette des responsabilités
- Documentation de l'architecture

## Labels
- enhancement
- architecture
- priority-high

## Fichier source
[docs/issues/architecture.md](docs/issues/architecture.md)
"@
        labels = @("enhancement", "architecture", "priority-high")
    },
    @{
        title = "Issue #4: Mise en Place des Services API"
        body = @"
## Description
Mise en place des services API pour une meilleure gestion des requêtes.

## Résultats attendus
- Services API centralisés et typés
- Gestion unifiée des erreurs
- Tests d'intégration des services

## Labels
- enhancement
- architecture
- priority-high

## Fichier source
[docs/issues/architecture.md](docs/issues/architecture.md)
"@
        labels = @("enhancement", "architecture", "priority-high")
    },
    @{
        title = "Issue #9: Gestion des Tokens"
        body = @"
## Description
Mise en place d'une gestion sécurisée des tokens d'authentification.

## Résultats attendus
- Stockage sécurisé des tokens
- Renouvellement automatique des tokens
- Gestion des sessions expirées

## Labels
- enhancement
- security
- priority-high

## Fichier source
[docs/issues/security.md](docs/issues/security.md)
"@
        labels = @("enhancement", "security", "priority-high")
    },
    @{
        title = "Issue #10: Protection des Routes"
        body = @"
## Description
Mise en place de la protection des routes pour sécuriser l'application.

## Résultats attendus
- Middleware d'authentification fonctionnel
- Redirection automatique vers login
- Gestion des rôles et permissions

## Labels
- enhancement
- security
- priority-high

## Fichier source
[docs/issues/security.md](docs/issues/security.md)
"@
        labels = @("enhancement", "security", "priority-high")
    },
    @{
        title = "Issue #17: Problèmes Critiques du Formulaire d'Inscription"
        body = @"
## Description
Correction des problèmes critiques du formulaire d'inscription.

## Résultats attendus
- Formulaire 100% fonctionnel
- Validation robuste des données
- Messages d'erreur clairs et localisés
- Tests automatisés passant à 100%

## Labels
- bug
- auth
- priority-high

## Fichier source
[docs/issues/auth.md](docs/issues/auth.md)
"@
        labels = @("bug", "auth", "priority-high")
    },
    @{
        title = "Issue #18: Consolidation des Services d'Authentification"
        body = @"
## Description
Consolidation et unification des services d'authentification.

## Résultats attendus
- Service d'auth unifié et documenté
- Types TypeScript cohérents
- Gestion des erreurs standardisée

## Labels
- enhancement
- auth
- priority-high

## Fichier source
[docs/issues/auth.md](docs/issues/auth.md)
"@
        labels = @("enhancement", "auth", "priority-high")
    },
    @{
        title = "Issue #19: Réorganisation de la Structure Auth"
        body = @"
## Description
Réorganisation de la structure d'authentification pour une meilleure maintenabilité.

## Résultats attendus
- Structure de dossiers optimisée
- Documentation complète
- Tests de sécurité passés

## Labels
- enhancement
- auth
- priority-high

## Fichier source
[docs/issues/auth.md](docs/issues/auth.md)
"@
        labels = @("enhancement", "auth", "priority-high")
    },
    @{
        title = "Issue #5: Implémentation de React Hook Form"
        body = @"
## Description
Mise en place de React Hook Form pour une meilleure gestion des formulaires.

## Résultats attendus
- Formulaires performants et accessibles
- Validation en temps réel
- Gestion optimisée des états de formulaire

## Labels
- enhancement
- forms
- priority-medium

## Fichier source
[docs/issues/forms-validation.md](docs/issues/forms-validation.md)
"@
        labels = @("enhancement", "forms", "priority-medium")
    },
    @{
        title = "Issue #6: Système de Validation Centralisé"
        body = @"
## Description
Mise en place d'un système de validation centralisé pour les formulaires.

## Résultats attendus
- Schémas de validation réutilisables
- Messages d'erreur cohérents
- Tests de validation complets

## Labels
- enhancement
- forms
- priority-medium

## Fichier source
[docs/issues/forms-validation.md](docs/issues/forms-validation.md)
"@
        labels = @("enhancement", "forms", "priority-medium")
    },
    @{
        title = "Issue #7: Optimisation des Rendus"
        body = @"
## Description
Optimisation des rendus pour améliorer les performances de l'application.

## Résultats attendus
- Score Lighthouse > 90
- Réduction des re-rendus inutiles
- Métriques de performance documentées

## Labels
- enhancement
- performance
- priority-medium

## Fichier source
[docs/issues/performance.md](docs/issues/performance.md)
"@
        labels = @("enhancement", "performance", "priority-medium")
    },
    @{
        title = "Issue #8: Optimisation du Bundle"
        body = @"
## Description
Optimisation de la taille du bundle pour améliorer les performances de chargement.

## Résultats attendus
- Taille du bundle < 500KB
- Code splitting efficace
- Chargement optimisé des assets

## Labels
- enhancement
- performance
- priority-medium

## Fichier source
[docs/issues/performance.md](docs/issues/performance.md)
"@
        labels = @("enhancement", "performance", "priority-medium")
    },
    @{
        title = "Issue #11: Tests Unitaires"
        body = @"
## Description
Mise en place des tests unitaires pour assurer la qualité du code.

## Résultats attendus
- Couverture de tests > 80%
- Tests isolés et maintenables
- CI/CD configuré

## Labels
- enhancement
- testing
- priority-medium

## Fichier source
[docs/issues/testing.md](docs/issues/testing.md)
"@
        labels = @("enhancement", "testing", "priority-medium")
    },
    @{
        title = "Issue #12: Tests d'Intégration"
        body = @"
## Description
Mise en place des tests d'intégration pour valider le fonctionnement global.

## Résultats attendus
- Tests E2E critiques
- Scénarios utilisateur couverts
- Documentation des tests

## Labels
- enhancement
- testing
- priority-medium

## Fichier source
[docs/issues/testing.md](docs/issues/testing.md)
"@
        labels = @("enhancement", "testing", "priority-medium")
    },
    @{
        title = "Issue #15: Création du Design System"
        body = @"
## Description
Création d'un design system cohérent pour l'application.

## Résultats attendus
- Guide de style complet
- Composants de base documentés
- Storybook à jour

## Labels
- enhancement
- design
- priority-medium

## Fichier source
[docs/issues/design-system.md](docs/issues/design-system.md)
"@
        labels = @("enhancement", "design", "priority-medium")
    },
    @{
        title = "Issue #16: Composants UI"
        body = @"
## Description
Développement des composants UI réutilisables.

## Résultats attendus
- Composants réutilisables
- Tests de composants
- Documentation interactive

## Labels
- enhancement
- design
- priority-medium

## Fichier source
[docs/issues/design-system.md](docs/issues/design-system.md)
"@
        labels = @("enhancement", "design", "priority-medium")
    },
    @{
        title = "Issue #13: Documentation des Composants"
        body = @"
## Description
Documentation complète des composants de l'application.

## Résultats attendus
- Documentation technique complète
- Exemples d'utilisation
- API Reference

## Labels
- enhancement
- documentation
- priority-low

## Fichier source
[docs/issues/documentation.md](docs/issues/documentation.md)
"@
        labels = @("enhancement", "documentation", "priority-low")
    },
    @{
        title = "Issue #14: Documentation API"
        body = @"
## Description
Documentation complète de l'API de l'application.

## Résultats attendus
- Swagger/OpenAPI à jour
- Exemples de requêtes
- Guide d'intégration

## Labels
- enhancement
- documentation
- priority-low

## Fichier source
[docs/issues/documentation.md](docs/issues/documentation.md)
"@
        labels = @("enhancement", "documentation", "priority-low")
    }
)

$baseUrl = "https://api.github.com/repos/kamsdvd/darassa.academy/issues"

foreach ($issue in $issues) {
    $body = @{
        title = $issue.title
        body = $issue.body
        labels = $issue.labels
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri $baseUrl -Method Post -Headers $headers -Body $body
    Write-Host "Created issue: $($response.html_url)"
} 
# Référence API

Cette documentation décrit les endpoints disponibles dans l'API de Darassa Academy.

## Base URL

```
https://api.darassa.academy/v1
```

## Authentification

Toutes les requêtes API nécessitent un token JWT dans le header :

```
Authorization: Bearer <votre_token>
```

## Endpoints

### Utilisateurs

#### Inscription
```http
POST /auth/register
```

**Body**
```json
{
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string"
}
```

#### Connexion
```http
POST /auth/login
```

**Body**
```json
{
  "email": "string",
  "password": "string"
}
```

### Cours

#### Liste des cours
```http
GET /courses
```

**Query Parameters**
- `page` (number, optional): Numéro de page
- `limit` (number, optional): Nombre d'éléments par page
- `category` (string, optional): Filtre par catégorie

#### Détails d'un cours
```http
GET /courses/:id
```

### Leçons

#### Liste des leçons d'un cours
```http
GET /courses/:courseId/lessons
```

#### Détails d'une leçon
```http
GET /lessons/:id
```

### Progression

#### Mettre à jour la progression
```http
POST /progress
```

**Body**
```json
{
  "lessonId": "string",
  "completed": boolean
}
```

#### Obtenir la progression
```http
GET /progress
```

## Codes d'erreur

| Code | Description |
|------|-------------|
| 400 | Requête invalide |
| 401 | Non authentifié |
| 403 | Non autorisé |
| 404 | Ressource non trouvée |
| 500 | Erreur serveur |

## Format de réponse

Toutes les réponses suivent le format suivant :

```json
{
  "success": boolean,
  "data": object | array | null,
  "error": {
    "code": string,
    "message": string
  } | null
}
```

## Pagination

Les réponses paginées incluent les métadonnées suivantes :

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": number,
    "limit": number,
    "total": number,
    "pages": number
  }
}
```

## Rate Limiting

- 100 requêtes par minute par IP
- 1000 requêtes par heure par utilisateur authentifié

## Versioning

L'API utilise le versioning dans l'URL. La version actuelle est v1. 
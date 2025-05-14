## Gestion des erreurs dans l'API

L'API centralise la gestion des erreurs via un middleware global. Voici les principaux types d'erreurs gérés et leur format de réponse :

### 1. Erreurs de validation (express-validator, Mongoose)
- **Code HTTP : 400**
- **Format :**
```json
{
  "success": false,
  "message": "Erreur de validation en base de données",
  "errors": [
    { "field": "email", "message": "Email invalide" },
    { "field": "password", "message": "Le mot de passe est trop court" }
  ]
}
```

### 2. Erreurs de duplication (MongoDB, code 11000)
- **Code HTTP : 409**
- **Format :**
```json
{
  "success": false,
  "message": "Conflit de duplication en base de données",
  "fields": ["email"],
  "keyValue": { "email": "exemple@domaine.com" }
}
```

### 3. Erreurs de validation des entrées utilisateur (express-validator)
- **Code HTTP : 400**
- **Format :**
```json
{
  "success": false,
  "message": "Erreur de validation",
  "errors": [
    { "field": "email", "message": "Email invalide" },
    { "field": "password", "message": "Le mot de passe est requis" }
  ]
}
```

### 4. Erreurs HTTP courantes (401, 403, 404, etc.)
- **Code HTTP : selon le cas**
- **Format :**
```json
{
  "success": false,
  "message": "Non autorisé" // ou "Accès interdit", "Route non trouvée", etc.
}
```

### 5. Erreurs serveur (erreur inattendue)
- **Code HTTP : 500**
- **Format :**
```json
{
  "success": false,
  "message": "Erreur interne du serveur"
}
```

> En mode développement, la propriété `stack` est ajoutée à la réponse pour faciliter le debug. 

## Documentation interactive de l'API (Swagger)

L'ensemble des endpoints de l'API sont documentés via Swagger.

- Pour accéder à la documentation interactive en local :

```
GET http://localhost:3000/api/docs
```

- Tous les endpoints utilisateurs, d'authentification, de cours, etc. sont décrits avec exemples de requêtes/réponses.
- Pour contribuer, ajoutez des annotations JSDoc Swagger dans les contrôleurs concernés. 
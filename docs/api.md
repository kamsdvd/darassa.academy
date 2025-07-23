# Documentation de l'API

Ce document décrit les endpoints de l'API pour le projet Darassa Academy.

## Authentification

Le processus d'authentification est basé sur des tokens JWT (Access Token et Refresh Token).

### Endpoints

---

#### 1. Inscription d'un nouvel utilisateur

*   **Méthode :** `POST`
*   **Endpoint :** `/api/auth/register`
*   **Description :** Crée un nouvel utilisateur dans le système.
*   **Payload (Request Body) :**
    ```json
    {
      "email": "user@example.com",
      "password": "a_strong_password",
      "firstName": "John",
      "lastName": "Doe",
      "userType": "student"
    }
    ```
*   **Réponse en cas de succès (201 Created) :**
    ```json
    {
      "data": {
        "user": {
          "id": "clx...",
          "email": "user@example.com",
          "firstName": "John",
          "lastName": "Doe",
          "userType": "student"
        },
        "tokens": {
          "accessToken": "ey...",
          "refreshToken": "ey..."
        }
      }
    }
    ```

---

#### 2. Connexion d'un utilisateur

*   **Méthode :** `POST`
*   **Endpoint :** `/api/auth/login`
*   **Description :** Authentifie un utilisateur et retourne les tokens.
*   **Payload (Request Body) :**
    ```json
    {
      "email": "user@example.com",
      "password": "a_strong_password"
    }
    ```
*   **Réponse en cas de succès (200 OK) :**
    ```json
    {
      "data": {
        "user": {
          "id": "clx...",
          "email": "user@example.com",
          "firstName": "John",
          "lastName": "Doe",
          "userType": "student"
        },
        "tokens": {
          "accessToken": "ey...",
          "refreshToken": "ey..."
        }
      }
    }
    ```

---

#### 3. Récupérer le profil de l'utilisateur connecté

*   **Méthode :** `GET`
*   **Endpoint :** `/api/auth/profile`
*   **Description :** Récupère les informations de l'utilisateur actuellement authentifié grâce à son `accessToken`.
*   **Header d'autorisation :**
    ```
    Authorization: Bearer <accessToken>
    ```
*   **Réponse en cas de succès (200 OK) :**
    ```json
    {
      "data": {
        "user": {
          "id": "clx...",
          "email": "user@example.com",
          "firstName": "John",
          "lastName": "Doe",
          "userType": "student"
        }
      }
    }
    ```

---

#### 4. Déconnexion

*   **Méthode :** `POST`
*   **Endpoint :** `/api/auth/logout`
*   **Description :** Invalide le `refreshToken` de l'utilisateur. (Le frontend se charge de supprimer les tokens du stockage local).
*   **Payload (Request Body) :**
    ```json
    {
      "refreshToken": "ey..."
    }
    ```
*   **Réponse en cas de succès (204 No Content) :**
    *   Pas de contenu dans la réponse.

---

#### 5. Rafraîchir les tokens d'authentification

*   **Méthode :** `POST`
*   **Endpoint :** `/api/auth/refresh`
*   **Description :** Génère une nouvelle paire de tokens (`accessToken`, `refreshToken`) en utilisant un `refreshToken` valide.
*   **Payload (Request Body) :**
    ```json
    {
      "refreshToken": "ey..."
    }
    ```
*   **Réponse en cas de succès (200 OK) :**
    ```json
    {
      "data": {
        "tokens": {
          "accessToken": "ey.new...",
          "refreshToken": "ey.new..."
        }
      }
    }
    ```
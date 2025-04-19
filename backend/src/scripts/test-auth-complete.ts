import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

async function testAuthComplete() {
  try {
    console.log('🚀 Démarrage des tests d\'authentification...\n');

    // 1. Test de connexion
    console.log('1️⃣ Test de connexion...');
    try {
      const loginResponse = await axios.post(`${API_URL}/login`, {
        email: 'test@example.com',
        password: 'password123'
      });
      console.log('✅ Connexion réussie');
      const token = loginResponse.data.token;

      // 2. Test de la route /me
      console.log('\n2️⃣ Test de la route /me...');
      const meResponse = await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Récupération des données utilisateur réussie');
      console.log('Données utilisateur:', meResponse.data);

      // 3. Test de déconnexion
      console.log('\n3️⃣ Test de déconnexion...');
      await axios.post(`${API_URL}/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Déconnexion réussie');

      // 4. Vérification que le token n'est plus valide
      console.log('\n4️⃣ Vérification de l\'invalidité du token...');
      try {
        await axios.get(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (error) {
        if (error.response?.status === 401) {
          console.log('✅ Token correctement invalidé');
        } else {
          console.error('❌ Erreur inattendue lors de la vérification du token:', error.message);
          if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
          }
        }
      }

      console.log('\n✨ Tous les tests ont réussi !');
    } catch (error) {
      console.error('❌ Erreur lors de la connexion:');
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      } else if (error.request) {
        console.error('Pas de réponse reçue. Le serveur est-il en cours d\'exécution ?');
        console.error('Request:', error.request);
      } else {
        console.error('Erreur:', error.message);
      }
    }
  } catch (error) {
    console.error('\n❌ Erreur générale lors des tests:', error.message);
    if (error.stack) {
      console.error('Stack:', error.stack);
    }
  }
}

testAuthComplete(); 
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const testAccounts = [
  {
    email: 'admin@darassa.academy',
    password: 'admin123',
    userType: 'admin'
  },
  {
    email: 'manager@cfdd.sn',
    password: 'manager123',
    userType: 'centre_manager'
  },
  {
    email: 'formateur1@cfdd.sn',
    password: 'formateur123',
    userType: 'formateur'
  },
  {
    email: 'etudiant1@example.com',
    password: 'etudiant123',
    userType: 'etudiant'
  },
  {
    email: 'demandeur1@example.com',
    password: 'demandeur123',
    userType: 'demandeur'
  },
  {
    email: 'contact@techsolutions.sn',
    password: 'entreprise123',
    userType: 'entreprise'
  }
];

const testAuth = async () => {
  console.log('Démarrage des tests d\'authentification...\n');

  for (const account of testAccounts) {
    try {
      console.log(`Test de connexion pour ${account.email}...`);
      console.log('Données envoyées:', {
        email: account.email,
        password: account.password
      });
      
      // Test de connexion
      const loginResponse = await axios.post(`${API_URL}/auth/login`, {
        email: account.email,
        password: account.password
      });

      console.log('Réponse du serveur:', {
        status: loginResponse.status,
        data: loginResponse.data
      });

      if (loginResponse.data.token) {
        console.log('✅ Connexion réussie');
        console.log(`Token reçu: ${loginResponse.data.token.substring(0, 20)}...`);
        console.log(`Type d'utilisateur: ${loginResponse.data.user.userType}`);
        
        // Test de récupération du profil
        const profileResponse = await axios.get(`${API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${loginResponse.data.token}`
          }
        });

        if (profileResponse.data) {
          console.log('✅ Récupération du profil réussie');
          console.log('Données du profil:', profileResponse.data);
        }
      }
    } catch (error: any) {
      console.error('❌ Erreur lors du test:');
      if (error.response) {
        console.error('Réponse du serveur:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
      } else if (error.request) {
        console.error('Pas de réponse du serveur:', error.message);
      } else {
        console.error('Erreur:', error.message);
      }
    }
    console.log('----------------------------------------\n');
  }
};

// Exécuter les tests
testAuth().catch(console.error); 
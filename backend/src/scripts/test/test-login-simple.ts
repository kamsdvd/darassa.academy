import axios from 'axios';

async function testLogin() {
  try {
    console.log('Tentative de connexion...');
    console.log('URL:', 'http://localhost:3000/api/auth/login');
    console.log('Données:', {
      email: 'test@example.com',
      password: 'password123'
    });

    const response = await axios.post('http://localhost:3000/api/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    });
    
    console.log('Réponse reçue:', {
      status: response.status,
      data: response.data
    });
  } catch (error) {
    console.error('Erreur détaillée:', {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status,
      request: error.request ? 'Request sent but no response' : 'Request failed to send'
    });

    if (error.code === 'ECONNREFUSED') {
      console.error('Le serveur n\'est pas accessible. Assurez-vous qu\'il est démarré sur le port 3000.');
    }
  }
}

testLogin(); 
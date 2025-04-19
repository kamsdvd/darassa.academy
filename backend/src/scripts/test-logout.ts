import axios from 'axios';

async function testLogout() {
  try {
    // D'abord, on se connecte pour obtenir le token
    const loginResponse = await axios.post('http://localhost:3000/api/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    });
    
    const token = loginResponse.data.token;
    
    // Ensuite, on utilise le token pour se déconnecter
    const logoutResponse = await axios.post('http://localhost:3000/api/auth/logout', {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('Logout successful:');
    console.log(JSON.stringify(logoutResponse.data, null, 2));
    
    // On essaie d'accéder à /me après la déconnexion pour vérifier que le token n'est plus valide
    try {
      await axios.get('http://localhost:3000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.error('Warning: Still able to access /me after logout!');
    } catch (error: any) {
      console.log('Verification successful: Cannot access /me after logout');
      if (error.response) {
        console.log('Status:', error.response.status);
        console.log('Message:', error.response.data.message);
      }
    }
  } catch (error: any) {
    console.error('Logout failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request was made but no response was received');
      console.error(error.request);
    } else {
      console.error('Error:', error.message);
    }
    console.error('Error config:', error.config);
  }
}

testLogout(); 
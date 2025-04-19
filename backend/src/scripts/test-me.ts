import axios from 'axios';

async function testMe() {
  try {
    // D'abord, on se connecte pour obtenir le token
    const loginResponse = await axios.post('http://localhost:3000/api/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    });
    
    const token = loginResponse.data.token;
    
    // Ensuite, on utilise le token pour accéder à la route /me
    const meResponse = await axios.get('http://localhost:3000/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('GET /me successful:');
    console.log(JSON.stringify(meResponse.data, null, 2));
  } catch (error: any) {
    console.error('GET /me failed:');
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

testMe(); 
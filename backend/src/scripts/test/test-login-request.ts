import axios from 'axios';

async function testLoginRequest() {
  try {
    const credentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    console.log('Attempting login with:', {
      ...credentials,
      password: '***'
    });

    const response = await axios.post('http://localhost:3000/api/auth/login', credentials);
    
    console.log('Login successful!');
    console.log('Response status:', response.status);
    console.log('Response data:', {
      ...response.data,
      token: response.data.token ? '***' : undefined
    });
  } catch (error: any) {
    console.error('Login failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testLoginRequest(); 
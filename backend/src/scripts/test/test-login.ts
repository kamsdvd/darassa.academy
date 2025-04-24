import axios from 'axios';

async function testLogin() {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    });
    
    console.log('Login successful:');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error: any) {
    console.error('Login failed:');
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

testLogin(); 
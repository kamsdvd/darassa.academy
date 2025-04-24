import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = 'http://localhost:5000/api';

async function testNewEnterprise() {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/darassa_academy');
    console.log('Connected to MongoDB');

    // 2. Test login
    console.log('\n=== Testing New Enterprise Login ===');
    try {
      const loginResponse = await axios.post(`${API_URL}/auth/login`, {
        email: 'test.enterprise@example.com',
        password: 'Test123!@#'
      });
      console.log('Login successful:', {
        ...loginResponse.data,
        token: loginResponse.data.token ? '***' : undefined
      });
      
      const authToken = loginResponse.data.token;
      
      // 3. Test get current user
      console.log('\n=== Testing Get Current User ===');
      try {
        const meResponse = await axios.get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        console.log('Get current user successful:', meResponse.data);
      } catch (error: any) {
        console.error('Get current user failed:', error.response?.data || error.message);
      }
      
      // 4. Test logout
      console.log('\n=== Testing Logout ===');
      try {
        const logoutResponse = await axios.post(`${API_URL}/auth/logout`, {}, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        console.log('Logout successful:', logoutResponse.data);
      } catch (error: any) {
        console.error('Logout failed:', error.response?.data || error.message);
      }
    } catch (error: any) {
      console.error('Login failed:', error.response?.data || error.message);
    }

  } catch (error) {
    console.error('Script error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

testNewEnterprise(); 
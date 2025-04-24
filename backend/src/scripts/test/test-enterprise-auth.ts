import axios from 'axios';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.model';

dotenv.config();

const API_URL = 'http://localhost:5000/api';
let authToken = '';

async function testEnterpriseAuth() {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/darassa_academy');
    console.log('Connected to MongoDB');

    // 2. Test registration
    console.log('\n=== Testing Enterprise Registration ===');
    const testEnterprise = {
      name: 'Test Enterprise',
      email: 'test.enterprise@example.com',
      password: 'Test123!@#',
      role: 'entreprise',
      phone: '+243123456789',
      company: 'Test Company',
      position: 'Manager'
    };

    try {
      const registerResponse = await axios.post(`${API_URL}/auth/register`, testEnterprise);
      console.log('Registration successful:', {
        ...registerResponse.data,
        token: registerResponse.data.token ? '***' : undefined
      });
      authToken = registerResponse.data.token;
    } catch (error: any) {
      if (error.response?.status === 400 && error.response?.data?.message?.includes('existe déjà')) {
        console.log('Test enterprise already exists, continuing with login test');
      } else {
        console.error('Registration failed:', error.response?.data || error.message);
      }
    }

    // 3. Test login
    console.log('\n=== Testing Enterprise Login ===');
    try {
      const loginResponse = await axios.post(`${API_URL}/auth/login`, {
        email: testEnterprise.email,
        password: testEnterprise.password
      });
      console.log('Login successful:', {
        ...loginResponse.data,
        token: loginResponse.data.token ? '***' : undefined
      });
      authToken = loginResponse.data.token;
    } catch (error: any) {
      console.error('Login failed:', error.response?.data || error.message);
    }

    // 4. Test get current user
    console.log('\n=== Testing Get Current User ===');
    try {
      const meResponse = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      console.log('Get current user successful:', meResponse.data);
    } catch (error: any) {
      console.error('Get current user failed:', error.response?.data || error.message);
    }

    // 5. Test logout
    console.log('\n=== Testing Logout ===');
    try {
      const logoutResponse = await axios.post(`${API_URL}/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      console.log('Logout successful:', logoutResponse.data);
    } catch (error: any) {
      console.error('Logout failed:', error.response?.data || error.message);
    }

    // 6. Test existing enterprise account
    console.log('\n=== Testing Existing Enterprise Account ===');
    try {
      const existingEnterprise = await User.findOne({ email: 'david.kalambay@darassa.academy' });
      if (existingEnterprise) {
        console.log('Existing enterprise found:', {
          id: existingEnterprise._id,
          email: existingEnterprise.email,
          name: existingEnterprise.name,
          role: existingEnterprise.role
        });

        // Test password comparison directly
        const testPassword = 'Darassa2023!@#';
        const passwordMatch = await existingEnterprise.comparePassword(testPassword);
        console.log('Direct password comparison result:', passwordMatch);

        // Try login through API
        try {
          const loginResponse = await axios.post(`${API_URL}/auth/login`, {
            email: 'david.kalambay@darassa.academy',
            password: testPassword
          });
          console.log('API Login successful:', {
            ...loginResponse.data,
            token: loginResponse.data.token ? '***' : undefined
          });
        } catch (error: any) {
          console.error('API Login failed:', error.response?.data || error.message);
        }
      } else {
        console.log('Existing enterprise not found');
      }
    } catch (error) {
      console.error('Error testing existing enterprise:', error);
    }

  } catch (error) {
    console.error('Script error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

testEnterpriseAuth(); 
import axios from 'axios';
import mongoose from 'mongoose';
import User from '../models/user.model';

async function testLoginDebug() {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/darassa-academy');
    console.log('Connected to MongoDB');

    // 2. Check if test user exists and get their details
    const user = await User.findOne({ email: 'test@example.com' });
    if (user) {
      console.log('Test user found:', {
        id: user._id,
        email: user.email,
        name: user.name,
        hashedPassword: user.password
      });

      // 3. Test password comparison directly
      const testPassword = 'password123';
      const passwordMatch = await user.comparePassword(testPassword);
      console.log('Direct password comparison result:', passwordMatch);

      // 4. Try login through API
      console.log('\nAttempting API login...');
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: 'test@example.com',
          password: testPassword
        });
        
        console.log('API Login successful:');
        console.log(JSON.stringify(response.data, null, 2));
      } catch (apiError: any) {
        console.error('API Login failed:');
        if (apiError.response) {
          console.error('Status:', apiError.response.status);
          console.error('Data:', JSON.stringify(apiError.response.data, null, 2));
        } else if (apiError.request) {
          console.error('Request was made but no response was received');
          console.error(apiError.request);
        } else {
          console.error('Error:', apiError.message);
        }
      }
    } else {
      console.log('Test user not found in database');
    }
  } catch (error) {
    console.error('Script error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

testLoginDebug(); 
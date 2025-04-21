const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
});

const User = mongoose.model('User', userSchema);

async function setupTestUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Create or update test user
    await User.findOneAndUpdate(
      { email: 'test@example.com' },
      {
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'admin'
      },
      { upsert: true }
    );

    console.log('Test user created/updated successfully');
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

setupTestUser(); 
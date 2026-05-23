const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars from root server directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/womenrise';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const adminName = process.env.ADMIN_NAME;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminName || !adminEmail || !adminPassword) {
      console.error('Missing required env vars: ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD');
      process.exit(1);
    }

    const existing = await User.findOne({ email: adminEmail.toLowerCase() });

    if (existing) {
      console.log(`Admin user already exists with email: ${adminEmail}. Skipping.`);
    } else {
      await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      });
      console.log(`Admin user created successfully: ${adminEmail}`);
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Seed admin failed:', error.message);
    process.exit(1);
  }
};

seedAdmin();

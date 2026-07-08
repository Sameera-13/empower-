const mongoose = require('mongoose');
const User = require('../models/User');

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection && mongoose.connection.readyState >= 1) {
    return cachedConnection;
  }

  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/womenrise';
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Auto-seed default admin user
    try {
      const adminEmail = process.env.ADMIN_EMAIL || 'sameera.chauhan.13@gmail.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
      const adminName = process.env.ADMIN_NAME || 'Sameera Chauhan';

      const existingAdmin = await User.findOne({ email: adminEmail }).select('+password');
      if (!existingAdmin) {
        console.log(`Admin user does not exist. Creating default admin account: ${adminEmail}`);
        await User.create({
          name: adminName,
          email: adminEmail,
          password: adminPassword,
          role: 'admin',
        });
        console.log(`Default admin account created successfully.`);
      } else {
        let isModified = false;
        if (existingAdmin.role !== 'admin') {
          existingAdmin.role = 'admin';
          isModified = true;
        }
        const isMatch = await existingAdmin.matchPassword(adminPassword);
        if (!isMatch) {
          existingAdmin.password = adminPassword;
          isModified = true;
        }
        if (isModified) {
          await existingAdmin.save();
          console.log(`Admin user updated to ensure correct credentials/role.`);
        } else {
          console.log(`Admin user already exists and has correct credentials.`);
        }
      }
    } catch (seedErr) {
      console.error('Admin seeding error (non-fatal):', seedErr.message);
    }

    cachedConnection = conn;
    return cachedConnection;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
      throw error;
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;

const mongoose = require('mongoose');
require('dotenv').config();

// Import User model
const User = require('./models/User');

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kyc-platform');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

// Function to unlock all locked accounts
const unlockAllAccounts = async () => {
  try {
    await connectDB();
    
    // Find all locked accounts
    const lockedUsers = await User.find({
      $or: [
        { lockUntil: { $exists: true, $gt: new Date() } },
        { loginAttempts: { $gte: 5 } }
      ]
    });
    
    console.log(`Found ${lockedUsers.length} locked accounts`);
    
    if (lockedUsers.length > 0) {
      // Reset login attempts and remove lock for all users
      const result = await User.updateMany(
        {
          $or: [
            { lockUntil: { $exists: true } },
            { loginAttempts: { $gte: 1 } }
          ]
        },
        {
          $unset: { lockUntil: 1, loginAttempts: 1 }
        }
      );
      
      console.log(`Unlocked ${result.modifiedCount} accounts successfully`);
      
      // List the unlocked accounts
      lockedUsers.forEach(user => {
        console.log(`- Unlocked account: ${user.email}`);
      });
    } else {
      console.log('No locked accounts found');
    }
    
  } catch (error) {
    console.error('Error unlocking accounts:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
};

// Function to unlock a specific account by email
const unlockAccount = async (email) => {
  try {
    await connectDB();
    
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log(`User with email ${email} not found`);
      return;
    }
    
    if (user.isLocked) {
      await user.resetLoginAttempts();
      console.log(`Account ${email} has been unlocked`);
    } else {
      console.log(`Account ${email} is not locked`);
    }
    
  } catch (error) {
    console.error('Error unlocking account:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
};

// Get command line arguments
const args = process.argv.slice(2);
const command = args[0];
const email = args[1];

if (command === 'unlock-all') {
  unlockAllAccounts();
} else if (command === 'unlock' && email) {
  unlockAccount(email);
} else {
  console.log('Usage:');
  console.log('  node unlock-accounts.js unlock-all          # Unlock all locked accounts');
  console.log('  node unlock-accounts.js unlock <email>      # Unlock specific account');
  process.exit(1);
}
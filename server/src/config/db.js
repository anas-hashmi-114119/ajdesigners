import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ajdesigners';
    
    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB connected successfully to:', connStr);
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected.');
    });

    await mongoose.connect(connStr);
  } catch (error) {
    console.error(`❌ Initial MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};


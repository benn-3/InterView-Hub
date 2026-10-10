import mongoose from 'mongoose';

let isConnected = false;

/**
 * Connect to MongoDB Atlas cluster
 */
export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<username>') || uri.includes('your-mongodb-uri')) {
    console.warn('\n⚠️ [Database] MONGODB_URI is not set or contains placeholders.');
    console.warn('👉 Please configure your real MongoDB Atlas connection string in backend/.env');
    console.warn('👉 The server will start, but database operations will wait or fail until configured.\n');
    return false;
  }

  try {
    mongoose.set('strictQuery', true);

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log(`✅ [Database] Successfully connected to MongoDB Atlas: ${conn.connection.host}/${conn.connection.name}`);

    mongoose.connection.on('error', (err) => {
      console.error('❌ [Database] Runtime MongoDB connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      console.warn('⚠️ [Database] MongoDB disconnected.');
    });

    return true;
  } catch (error) {
    isConnected = false;
    console.error('❌ [Database] Failed to connect to MongoDB Atlas:', error.message);
    console.error('👉 Verify your network access IP whitelist (e.g. 0.0.0.0/0 for dev) and database credentials in MongoDB Atlas.\n');
    return false;
  }
}

/**
 * Check if the database connection is currently active
 */
export function isDbConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}

/**
 * Gracefully close database connection on shutdown
 */
export async function closeDatabase() {
  if (isConnected) {
    await mongoose.connection.close();
    isConnected = false;
    console.log('🔌 [Database] MongoDB connection closed safely.');
  }
}

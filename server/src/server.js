import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from backend/.env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { createApp } from './app.js';
import { connectDatabase, closeDatabase } from './config/database.js';

const PORT = process.env.PORT || 5001;

async function startServer() {
  // 1. Attempt connection to MongoDB Atlas
  await connectDatabase();

  // 2. Initialize Express application
  const app = createApp();

  // 3. Start listening
  const server = app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 [Server] Interview Hub Backend running on port ${PORT}`);
    console.log(`🌐 [Server] Health check: http://localhost:${PORT}/api/health`);
    console.log(`🔒 [Server] Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`======================================================\n`);
  });

  // 4. Graceful Shutdown
  const shutdown = async (signal) => {
    console.log(`\n🛑 [Server] Received ${signal}. Shutting down gracefully...`);
    server.close(async () => {
      await closeDatabase();
      console.log('👋 [Server] Process terminated cleanly.');
      process.exit(0);
    });

    // Force close after 10s if hung
    setTimeout(() => {
      console.error('⚠️ [Server] Forced termination after timeout.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

startServer().catch((err) => {
  console.error('💥 [Server] Fatal startup failure:', err);
  process.exit(1);
});

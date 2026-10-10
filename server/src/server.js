import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from server/.env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { createApp } from './app.js';
import { connectDatabase, closeDatabase } from './config/database.js';

const PORT = process.env.PORT || 5001;

// 1. Initialize Express application
const app = createApp();

// 2. Standalone server startup (local development & container environments)
async function startServer() {
  await connectDatabase();

  const server = app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 [Server] Interview Hub Backend running on port ${PORT}`);
    console.log(`🌐 [Server] Health check: http://localhost:${PORT}/api/health`);
    console.log(`🔒 [Server] Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`======================================================\n`);
  });

  const shutdown = async (signal) => {
    console.log(`\n🛑 [Server] Received ${signal}. Shutting down gracefully...`);
    server.close(async () => {
      await closeDatabase();
      console.log('👋 [Server] Process terminated cleanly.');
      process.exit(0);
    });

    setTimeout(() => {
      console.error('⚠️ [Server] Forced termination after timeout.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

// Only listen on port when executed as standalone script (not in tests or Vercel serverless functions)
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  startServer().catch((err) => {
    console.error('💥 [Server] Fatal startup failure:', err);
    process.exit(1);
  });
}

export default app;

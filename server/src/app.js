import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import { isDbConnected, connectDatabase } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import quizRoutes from './routes/quizRoutes.js';

export function createApp() {
  const app = express();
  const isProduction = process.env.NODE_ENV === 'production';

  // 1. Security Headers via Helmet
  app.use(
    helmet({
      contentSecurityPolicy: false, // Managed by Vite/SPA
      crossOriginEmbedderPolicy: false,
    })
  );

  // 2. Logging
  if (!isProduction) {
    app.use(morgan('dev'));
  }

  // 3. CORS Configuration
  const rawOrigins = process.env.ALLOWED_ORIGINS || process.env.CLIENT_URL || process.env.FRONTEND_URL || 'http://localhost:5173,http://localhost:5174';
  const allowedOrigins = rawOrigins.split(',').map((o) => o.trim());

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. same-origin SPA, mobile apps, curl, server-to-server)
        if (
          !origin ||
          allowedOrigins.includes(origin) ||
          (origin && origin.endsWith('.vercel.app')) ||
          (process.env.VERCEL_URL && origin.includes(process.env.VERCEL_URL))
        ) {
          callback(null, true);
        } else {
          callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
  );

  // 4. Rate Limiting
  const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 600, // limit each IP to 600 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: 'Too many requests. Please slow down.' },
  });

  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50, // limit login attempts
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: 'Too many authentication attempts. Please try again later.' },
  });

  app.use('/api', generalLimiter);
  app.use('/api/auth', authLimiter);

  // 5. Body and Cookie Parsers
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(cookieParser());

  // 6. Session Configuration
  const sessionSecret = process.env.SESSION_SECRET || 'dev_fallback_secret_must_replace_in_production_32chars';
  const cookieName = process.env.SESSION_COOKIE_NAME || 'interview_hub_sid';

  let sessionStore;
  const mongoUri = process.env.MONGODB_URI;

  if (mongoUri && !mongoUri.includes('<username>') && !mongoUri.includes('your-mongodb-uri')) {
    sessionStore = MongoStore.create({
      mongoUrl: mongoUri,
      collectionName: 'sessions',
      ttl: 14 * 24 * 60 * 60, // 14 days
      autoRemove: 'native',
    });
  } else {
    // In-memory store fallback for dev before MongoDB Atlas URI is populated
    console.warn('⚠️ [Session] Using MemoryStore fallback. Configure MONGODB_URI for persistent sessions.');
  }

  // If in production behind a proxy (e.g. Render, Heroku, NGINX), trust first proxy
  if (isProduction) {
    app.set('trust proxy', 1);
  }

  app.use(
    session({
      name: cookieName,
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
        path: '/',
      },
    })
  );

  // 7. Health Check Route
  app.get('/api/health', (req, res) => {
    res.status(200).json({
      status: 'ok',
      service: 'interview-guide-backend',
      timestamp: new Date().toISOString(),
      databaseConnected: isDbConnected(),
      environment: process.env.NODE_ENV || 'development',
    });
  });

  // 8. API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/progress', progressRoutes);
  app.use('/api/quizzes', quizRoutes);

  // 9. 404 Handler for API routes
  app.use('/api/*', (req, res) => {
    res.status(404).json({
      success: false,
      error: `API route not found: ${req.method} ${req.originalUrl}`,
    });
  });

  // 10. Centralized Error Handler
  app.use(errorHandler);

  return app;
}

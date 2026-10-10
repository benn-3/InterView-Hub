# Interview Hub — Backend API & Authentication Service

A secure, scalable Node.js + Express backend powering **Interview Hub** with Google Single Sign-On (GIS), session management via HTTP-only cookies, and MongoDB Atlas persistence.

---

## 🌟 Architecture Overview

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB Atlas with Mongoose ODM
- **Authentication**: Google Identity Services (GIS) ID Token verification via official `google-auth-library`
- **Session Store**: `express-session` with `connect-mongo` (HTTP-only secure cookies) with graceful MemoryStore fallback in offline/local environments
- **Security**: Helmet headers, express-rate-limit, CORS credentials validation, express-validator, session regeneration on login

---

## 📁 Directory Structure

```text
server/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection manager with auto-retry and offline resilience
│   ├── controllers/
│   │   ├── authController.js    # Google sign-in, session regeneration, /me check, logout
│   │   ├── progressController.js# Bookmarks, lesson completion, flashcard ratings, full sync
│   │   ├── quizController.js    # Quiz attempt recording with server-side score validation & history
│   │   └── userController.js    # User profile and safe preferences updating
│   ├── middleware/
│   │   ├── errorHandler.js      # Production-safe error response formatter
│   │   └── requireAuth.js       # Strict session-based authentication guard
│   ├── models/
│   │   ├── QuizAttempt.js       # Validated quiz scores and analytics
│   │   ├── StudyActivity.js     # Study session activity logs for heatmaps & streaks
│   │   └── User.js              # Mongoose user model with unique googleSub index
│   ├── routes/
│   │   ├── authRoutes.js        # /api/auth/* endpoints
│   │   ├── progressRoutes.js    # /api/progress/* endpoints
│   │   ├── quizRoutes.js        # /api/quizzes/* endpoints
│   │   └── userRoutes.js        # /api/users/* endpoints
│   ├── services/
│   │   ├── dataService.js       # Database access and fallback layer
│   │   ├── googleAuthService.js # Google ID token signature, audience, issuer verification
│   │   └── streakService.js     # Dynamic timezone-aware study streak calculator
│   ├── validators/
│   │   └── index.js             # express-validator schemas for requests
│   ├── app.js                   # Express application setup, security middleware, sessions
│   └── server.js                # Server entry point with graceful shutdown handling
├── tests/
│   └── auth_and_api.test.js     # Native Node test runner suite
├── .env.example                 # Configuration blueprint with safe placeholders
├── package.json
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and fill in your values:

```env
PORT=5001
NODE_ENV=development

# MongoDB Atlas Connection URI
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/interview_hub?retryWrites=true&w=majority

# Session Cookie Secret (use 32+ cryptographically random characters)
SESSION_SECRET=your_long_cryptographically_secure_session_secret_key_here

# Google OAuth 2.0 Client ID (from Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com

# Frontend URL & Allowed CORS Origins
CLIENT_URL=https://inter-view-hub.vercel.app
FRONTEND_URL=https://inter-view-hub.vercel.app
ALLOWED_ORIGINS=https://inter-view-hub.vercel.app,http://localhost:5173,http://localhost:5174
```

### 3. Run the Backend Server

```bash
# Production mode
npm start

# Development mode (with auto-reload on file changes)
npm run dev
```

The server will listen at `http://localhost:5001`.

### 4. Run Automated Tests

```bash
npm test
```

Or from the project root:

```bash
npm run test:backend
```

---

## 🔑 Setting up Google Single Sign-On (OAuth 2.0)

1. Open the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (e.g., `Interview-Hub-App`).
3. Navigate to **APIs & Services** > **OAuth consent screen**:
   - Choose **External** user type.
   - Enter App Name (`Interview Hub`) and User Support Email.
   - Save and continue.
4. Navigate to **APIs & Services** > **Credentials**:
   - Click **Create Credentials** > **OAuth client ID**.
   - Application type: **Web application**.
   - Name: `Interview Hub Web Client`.
   - Under **Authorized JavaScript origins**, add:
     - `http://localhost:5173`
     - `http://localhost:5174`
     - Your production domain (e.g., `https://interviewhub.yourdomain.com`).
   - Click **Create**.
5. Copy the generated **Client ID** and set it as `GOOGLE_CLIENT_ID` in your backend `.env` and in `index.html` or your frontend environment.

---

## 🍃 Setting up MongoDB Atlas

1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free shared cluster (e.g., M0 Tier).
3. **Database Access**:
   - Navigate to **Security** > **Database Access**.
   - Click **Add New Database User**.
   - Create a user with **Password authentication** and grant **Read and write to any database**.
4. **Network Access**:
   - Navigate to **Security** > **Network Access**.
   - Click **Add IP Address**.
   - For local development, add your current IP address (or `0.0.0.0/0` with careful monitoring).
5. **Connection String**:
   - Click **Database** > **Connect** > **Drivers** (Node.js).
   - Copy the connection string format:
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/interview_hub?retryWrites=true&w=majority
     ```
   - Replace `<username>` and `<password>` with your created database credentials.
   - Set this string in `backend/.env` as `MONGODB_URI`.

---

## 🛡️ Security Features

- **Google ID Token Verification**: Tokens are independently validated server-side for signature integrity, expiration, correct issuer (`accounts.google.com`), and matching audience (`GOOGLE_CLIENT_ID`).
- **Session Fixation Defense**: The server destroys and regenerates session identifiers (`req.session.regenerate`) upon successful authentication.
- **HTTP-Only Cookies**: Application sessions are stored in an encrypted cookie (`interview_hub_sid`) with `HttpOnly: true`, `SameSite: 'lax'` (or `'none'` in cross-site production), and `Secure: true` in production.
- **Helmet Headers**: Configured to restrict frame embedding and protect against XSS and MIME sniffing.
- **Strict Rate Limiting**: Authentication endpoints are rate-limited to prevent brute-force attacks.
- **Data Protection**: Personal profile identifiers are keyed strictly on Google's immutable subject (`googleSub`). One user cannot read or update another user's progress.

---

## 📡 REST API Reference

| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Healthcheck and database status | No |
| `POST` | `/api/auth/google` | Verify Google ID token and create session | No |
| `GET` | `/api/auth/me` | Fetch currently logged-in user profile | No |
| `POST` | `/api/auth/logout` | Destroy session and clear cookie | No |
| `GET` | `/api/users/me` | Retrieve authenticated user details | Yes |
| `PATCH` | `/api/users/me/preferences` | Update theme, email notifications, etc. | Yes |
| `GET` | `/api/progress` | Fetch bookmarks, completed lessons, flashcards | Yes |
| `PUT` | `/api/progress` | Bulk synchronize local/anonymous progress | Yes |
| `POST` | `/api/progress/lessons/:lessonId/complete` | Mark a lesson as completed | Yes |
| `POST` | `/api/progress/lessons/:lessonId/uncomplete` | Unmark lesson completion | Yes |
| `POST` | `/api/progress/bookmarks` | Add a bookmark (question or lesson) | Yes |
| `DELETE` | `/api/progress/bookmarks/:contentId` | Remove a bookmark | Yes |
| `PUT` | `/api/progress/flashcards/:flashcardId` | Update flashcard review confidence status | Yes |
| `GET` | `/api/quizzes/history` | Retrieve paginated quiz history | Yes |
| `POST` | `/api/quizzes/attempts` | Submit and validate quiz results | Yes |

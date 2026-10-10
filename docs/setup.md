# Project Setup & Configuration Guide

A step-by-step guide to installing dependencies, configuring environment secrets, setting up Google OAuth 2.0, connecting MongoDB Atlas, and running the Interview Hub full-stack platform.

---

## 1. Prerequisites

Before getting started, ensure you have:
- **Node.js**: v18.0.0 or higher (`node -v`)
- **npm**: v9.0.0 or higher (`npm -v`)
- **Google Cloud Console account** (to enable Google Single Sign-On)
- **MongoDB Atlas account** (or a local MongoDB instance running on port 27017)
- **Modern Web Browser** with JavaScript and cookies enabled

---

## 2. Quick Start

Run both the server and client simultaneously from the project root:

```bash
# 1. Install root, client, and server dependencies
npm run install:all

# 2. Configure environment variables (see sections below)
cp client/.env.example client/.env
cp server/.env.example server/.env

# 3. Start both client and server in development mode
npm run dev
```

- **Client App**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5001](http://localhost:5001)

> **Note**: Even if `MONGODB_URI` or `GOOGLE_CLIENT_ID` are not immediately configured, the backend starts in resilient offline/local mode with in-memory sessions so the entire application is fully browseable and testable right away.

---

## 3. Environment Configuration

### Client Configuration (`client/.env`)

Copy `client/.env.example` to `client/.env`:

```bash
cp client/.env.example client/.env
```

| Variable | Description | Default / Example |
|---|---|---|
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth 2.0 Web Client ID for GIS button | `your-google-client-id.apps.googleusercontent.com` |
| `VITE_API_BASE_URL` | Base endpoint for API requests | `/api` (uses Vite proxy during local dev) |
| `VITE_BACKEND_URL` | Local proxy destination for Express backend | `http://localhost:5001` |

> **Security Rule**: Never prefix backend secrets (`MONGODB_URI`, `SESSION_SECRET`) with `VITE_`. Vite embeds all `VITE_*` variables into the public JavaScript bundle.

---

### Server Configuration (`server/.env`)

Copy `server/.env.example` to `server/.env`:

```bash
cp server/.env.example server/.env
```

| Variable | Description | Required | Default / Example |
|---|---|:---:|---|
| `PORT` | Express server port | No | `5001` |
| `NODE_ENV` | Application environment mode | No | `development` |
| `MONGODB_URI` | MongoDB Atlas cluster connection URI | Recommended | `mongodb+srv://user:pass@cluster.mongodb.net/interview_guide` |
| `GOOGLE_CLIENT_ID` | Must match `VITE_GOOGLE_CLIENT_ID` | Recommended | `your-client-id.apps.googleusercontent.com` |
| `SESSION_SECRET` | Secret key for signed session cookies (32+ chars) | Recommended | Random 32+ character string |
| `CLIENT_URL` | Client origin for CORS | No | `http://localhost:5173` |
| `ALLOWED_ORIGINS`| Comma-separated CORS origins | No | `http://localhost:5173,http://localhost:5174` |

---

## 4. Google OAuth 2.0 Setup Guide

To enable Google Single Sign-On (GIS):

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one (e.g., `Interview-Guide`).
3. Navigate to **APIs & Services** > **OAuth consent screen**:
   - User Type: **External**
   - App Name: `Interview Hub`
   - User support email & Developer contact email: your email
   - Scopes: `.../auth/userinfo.email`, `.../auth/userinfo.profile`, `openid`
4. Navigate to **APIs & Services** > **Credentials**:
   - Click **Create Credentials** > **OAuth client ID**.
   - Application type: **Web application**.
   - Name: `Interview Hub Web Client`.
   - **Authorized JavaScript origins**:
     - `http://localhost:5173`
     - `http://localhost:5174`
     - *(Your production frontend URL when deploying)*
   - Authorized redirect URIs: Not required for Google Identity Services popup/One Tap flow.
5. Copy the generated **Client ID** (ends with `.apps.googleusercontent.com`).
6. Set this value in both:
   - `client/.env` -> `VITE_GOOGLE_CLIENT_ID`
   - `server/.env` -> `GOOGLE_CLIENT_ID`

---

## 5. MongoDB Atlas Setup Guide

To enable persistent cloud storage for user progress and quiz attempts:

1. Sign in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free shared cluster (M0 sandbox).
3. Under **Security** > **Database Access**:
   - Click **Add New Database User**.
   - Select **Password** authentication and save the credentials.
   - Assign user privileges: `Read and write to any database`.
4. Under **Security** > **Network Access**:
   - Click **Add IP Address**.
   - For development, add `0.0.0.0/0` (Allow Access from Anywhere) or your current IP.
5. Under **Deployment** > **Database**:
   - Click **Connect** on your cluster.
   - Choose **Drivers** (Node.js).
   - Copy the connection string format:
     ```text
     mongodb+srv://<username>:<password>@cluster0.mongodb.net/interview_guide?retryWrites=true&w=majority
     ```
   - Replace `<username>` and `<password>` with your database user credentials.
6. Paste the connection string into `server/.env` as `MONGODB_URI`.

---

## 6. Running Client & Server Independently

You can run each application in its own dedicated terminal:

### Terminal 1 — Frontend Client
```bash
cd client
npm install
npm run dev
```
Starts Vite at `http://localhost:5173`.

### Terminal 2 — Backend Server
```bash
cd server
npm install
npm run dev
```
Starts Express with Node's native file watcher on `http://localhost:5001`.

---

## 7. Available Scripts

### Root Directory
- `npm run dev` — Starts both backend and frontend concurrently with colored log prefixes.
- `npm run dev:client` — Starts only the Vite frontend.
- `npm run dev:server` — Starts only the Express backend.
- `npm run build` — Builds the frontend for production into `client/dist`.
- `npm run test` — Runs the native backend test suite.
- `npm run install:all` — Installs dependencies for both `client/` and `server/`.

### Client Directory (`client/`)
- `npm run dev` — Runs the Vite development server.
- `npm run build` — Compiles and minifies assets into `client/dist`.
- `npm run preview` — Locally previews the production build.

### Server Directory (`server/`)
- `npm start` — Starts the Express API server in standard mode.
- `npm run dev` — Starts the Express API server with automatic reload on changes (`node --watch`).
- `npm test` — Executes the native Node.js test suite (`tests/auth_and_api.test.js`).

---

## 8. Verifying the Setup

1. **Verify Backend Health**:
   ```bash
   curl http://localhost:5001/api/health
   # Response: {"status":"ok","service":"interview-guide-backend",...}
   ```
2. **Run Backend Test Suite**:
   ```bash
   npm run test
   # Should report all 8 tests passing with 0 failures
   ```
3. **Verify Frontend Build**:
   ```bash
   npm run build
   # Should complete cleanly and generate client/dist/
   ```
4. **Verify Frontend-to-Backend Proxy**:
   - Open `http://localhost:5173` in your browser.
   - Open Developer Tools > Network tab.
   - Notice calls to `/api/auth/me` return `200 OK` with unauthenticated status.

---

## 9. Production Deployment

### Frontend (`client/`)
- Build command: `npm run build`
- Output directory: `dist` (within `client/`)
- Hosting platforms: Vercel, Cloudflare Pages, Netlify.
- Set environment variables on your platform:
  - `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth Client ID.
  - `VITE_API_BASE_URL`: Full URL of your deployed backend (e.g., `https://api.yourdomain.com/api`).

### Backend (`server/`)
- Start command: `node src/server.js`
- Hosting platforms: Render, Railway, Fly.io, AWS App Runner.
- Set environment variables on your platform:
  - `NODE_ENV`: `production`
  - `PORT`: (Managed by provider)
  - `MONGODB_URI`: MongoDB Atlas connection URI
  - `GOOGLE_CLIENT_ID`: Google OAuth Client ID
  - `SESSION_SECRET`: Strong 32+ character random secret
  - `CLIENT_URL`: Your deployed frontend URL (e.g., `https://interviewhub.yourdomain.com`)
  - `ALLOWED_ORIGINS`: Comma-separated allowed frontend domains
- **Important**: In production, HTTPS is required for `secure: true` session cookies to function properly across domains.

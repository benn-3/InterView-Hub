# Interview Hub — Full-Stack Technical Interview Preparation Platform

A full-stack, enterprise-grade technical interview preparation platform architected into a dedicated **React + Vite client** and **Node.js + Express backend server**, featuring Google Single Sign-On (GIS), MongoDB Atlas cloud persistence, and a comprehensive curriculum across 15 engineering disciplines.

---

## 📑 Documentation Quick Links

- 🏛️ [**System Architecture & Security Design**](docs/architecture.md) — Architectural diagrams, data models, Google SSO sequence flow, and API contracts.
- 🛠️ [**Setup & Configuration Guide**](docs/setup.md) — Step-by-step credentials setup for Google Cloud Console, MongoDB Atlas, and production deployment.

---

## 🌟 Key Features

- **Decoupled Client & Server Architecture**: Clean separation between React 18 SPA frontend (`client/`) and Node.js REST API (`server/`).
- **Google Single Sign-On (OAuth 2.0 / GIS)**: One-click sign-in with Google Identity Services, verified server-side with `google-auth-library` and secured by HTTP-only session cookies.
- **MongoDB Atlas Cloud Persistence**: Isolated user accounts with synchronized bookmarks, lesson milestones, flashcards, coding practice, and quiz attempts.
- **Resilient Offline / Guest Support**: Full public access to all study materials and practice modules without signing in, with seamless one-click progress migration to MongoDB upon login.
- **15 Curated Technical Disciplines**: Deep, real-world study guides and interview preparation materials covering:
  - Object-Oriented Programming (OOP), Data Structures & Algorithms (DSA), Database Management Systems (DBMS), SQL, Linux & Shell, AWS & Cloud, DevOps, Docker, Kubernetes, Networking, Operating Systems, Web Development, Terraform, DevSecOps, and System Design.
- **Interactive Practice Tools**:
  - **Topic-Wise MCQs**: Timed quizzes with server-verified scoring and review history.
  - **Flashcards**: Active recall practice with confidence tracking and keyboard navigation.
  - **Code Practice & SQL Playground**: Interactive coding and database query practice.
  - **Mock Interview Simulator**: Realistic timed question sequences with evaluation checklists.
- **Production-Grade Security**:
  - Secure, HTTP-only session cookies (`interview_hub_sid`) with session fixation protection.
  - Strict Helmet security headers and CORS protection.
  - API rate-limiting against brute-force attacks.
  - Server-side score validation preventing client-side score manipulation.

---

## 📁 Repository Structure

```text
InterView-Guide/
│
├── client/                      # React 18 + Vite Frontend SPA
│   ├── public/                  # Static assets (favicons, manifest)
│   ├── src/
│   │   ├── assets/              # Static bundled media and icons
│   │   ├── components/          # Reusable presentation components
│   │   │   ├── auth/            # Google login modal & protected route guards
│   │   │   ├── common/          # Badges, progress bars, cards, modals
│   │   │   ├── layout/          # Layout shell and persistent containers
│   │   │   ├── markdown/        # Markdown renderer, code syntax highlighter, TOC
│   │   │   ├── navigation/      # Header, Sidebar, responsive navigation
│   │   │   └── practice/        # MCQ, Flashcard, Coding, & Mock Interview cards
│   │   ├── pages/               # Application view routes
│   │   │   ├── Bookmarks.jsx    # Saved bookmarks collection
│   │   │   ├── Coding.jsx       # Interactive coding challenges
│   │   │   ├── Dashboard.jsx    # Personalized learning dashboard & streaks
│   │   │   ├── Flashcards.jsx   # Spaced repetition flashcards
│   │   │   ├── MCQsPage.jsx     # Topic-wise timed MCQ practice
│   │   │   ├── MockInterview.jsx# Timed mock interview simulation
│   │   │   ├── Practice.jsx     # Practice hub overview
│   │   │   ├── Progress.jsx     # Analytics & learning completion metrics
│   │   │   ├── Questions.jsx    # Categorized interview Q&A repository
│   │   │   ├── Revision.jsx     # Rapid review mode
│   │   │   ├── Search.jsx       # Global instant search across curriculum
│   │   │   ├── Settings.jsx     # User preferences & cloud sync
│   │   │   ├── SQLPractice.jsx  # SQL query challenge arena
│   │   │   ├── StudyMaterial.jsx# Dynamic Markdown lesson viewer
│   │   │   ├── SubjectDetail.jsx# Subject curriculum breakdown & roadmap
│   │   │   └── Subjects.jsx     # 15 core technical subject domains
│   │   ├── content/             # 78+ Curated technical Markdown study guides
│   │   │   ├── aws/             # AWS Cloud architecture, EC2, S3, IAM, VPC
│   │   │   ├── dbms/            # ACID, Normalization, Indexing, Transactions
│   │   │   ├── devops/          # CI/CD, GitHub Actions, SRE metrics, GitOps
│   │   │   ├── devsecops/       # SAST/DAST, Prometheus, Grafana, ELK, Tracing
│   │   │   ├── docker/          # Dockerfile optimization, Compose, Networking
│   │   │   ├── dsa/             # Arrays, Memory, Trees, Graphs, Sorting, DP
│   │   │   ├── kubernetes/      # Pods, Deployments, Services, Architecture
│   │   │   ├── linux/           # Commands, Permissions, Processes, Scripting
│   │   │   ├── networking/      # TCP/IP, OSI, HTTP/TLS, WebSockets, Routing
│   │   │   ├── operating-systems/# CPU Scheduling, Deadlocks, Virtual Memory
│   │   │   ├── programming/     # OOP Principles, Java, Design Patterns
│   │   │   ├── sql/             # Window functions, Joins, Aggregations, Plans
│   │   │   ├── system-design/   # Caching, Sharding, Kafka, Rate Limiting
│   │   │   ├── terraform/       # HCL syntax, State Locking, Modules
│   │   │   └── web-development/ # REST, GraphQL, Sessions, Security, CDNs
│   │   ├── data/                # Canonical datasets (Questions, MCQs, Cards)
│   │   ├── hooks/               # Custom hooks (useAuth, useProgress, useSearch)
│   │   ├── context/             # AuthContext (Google SSO & session state)
│   │   ├── services/            # API clients (api.js, authService.js)
│   │   ├── utils/               # Storage, Markdown parser, Content loader
│   │   ├── styles/              # Global CSS, variables, and responsive design
│   │   ├── App.jsx              # Client router configuration
│   │   └── main.jsx             # Client application mount point
│   ├── index.html               # SPA HTML entrypoint with Google GIS client
│   ├── vite.config.js           # Vite config with dynamic /api proxy
│   ├── package.json             # Frontend dependencies & scripts
│   ├── package-lock.json        # Frontend dependency lockfile
│   ├── .env.example             # Frontend environment variables template
│   └── .gitignore               # Frontend Git ignore rules
│
├── server/                      # Node.js + Express + MongoDB Backend
│   ├── src/
│   │   ├── config/              # MongoDB connection & offline fallback
│   │   ├── controllers/         # Auth, Progress, Quiz, User controllers
│   │   ├── middleware/          # requireAuth, errorHandler, rate-limiting
│   │   ├── models/              # User.js, QuizAttempt.js, StudyActivity.js
│   │   ├── routes/              # /api/auth, /api/progress, /api/quizzes, /api/users
│   │   ├── services/            # Google auth token verifier, streak service
│   │   ├── validators/          # express-validator request schemas
│   │   ├── app.js               # Express application with Helmet & sessions
│   │   └── server.js            # Server entrypoint
│   ├── tests/                   # Native test runner suite (Node.js test)
│   ├── .env                     # Server environment secrets (Git ignored)
│   ├── .env.example             # Server environment variables template
│   ├── .gitignore               # Server Git ignore rules
│   ├── package.json             # Backend dependencies & scripts
│   ├── package-lock.json        # Backend dependency lockfile
│   └── README.md                # Server-specific documentation
│
├── docs/
│   ├── architecture.md          # Comprehensive architecture & security spec
│   └── setup.md                 # Detailed setup & configuration guide
│
├── .gitignore                   # Root repository Git ignore rules
├── package.json                 # Root script orchestration (concurrently)
└── README.md                    # Root project documentation
```

---

## ⚡ Quick Start

### 1. Prerequisites
- **Node.js** v18.0.0+
- **npm** v9.0.0+
- (Optional) **MongoDB Atlas** cluster URI & **Google OAuth 2.0** Web Client ID.

### 2. Install Dependencies
Install dependencies across both client and server from the root:
```bash
npm run install:all
```

### 3. Configure Environment Variables
Copy template files to create local configurations:
```bash
# Client
cp client/.env.example client/.env

# Server
cp server/.env.example server/.env
```

Edit `client/.env`:
```env
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
VITE_API_BASE_URL=/api
```

Edit `server/.env`:
```env
PORT=5001
NODE_ENV=development
MONGODB_URI=your_mongodb_atlas_connection_string
GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
CLIENT_URL=https://inter-view-hub.vercel.app
ALLOWED_ORIGINS=https://inter-view-hub.vercel.app,http://localhost:5173,http://localhost:5174
```

### 4. Run Both Applications Simultaneously
From the project root:
```bash
npm run dev
```
- Frontend starts at **[http://localhost:5173](http://localhost:5173)**
- Backend API starts at **[http://localhost:5001](http://localhost:5001)**
- Requests from the frontend to `/api/*` are automatically reverse-proxied to `http://localhost:5001`!

---

## 🏃 Running Client and Server Independently

### Frontend Client (`client/`)
```bash
cd client
npm install
npm run dev        # Starts Vite dev server (http://localhost:5173)
npm run build      # Produces optimized production bundle in client/dist/
npm run preview    # Locally previews production build
```

### Backend Server (`server/`)
```bash
cd server
npm install
npm run dev        # Starts Express with auto-reload (http://localhost:5001)
npm run test       # Executes native backend test runner suite
npm start          # Starts server in standard Node.js mode
```

---

## 🧪 Testing & Verification

Run the backend test suite from the root:
```bash
npm run test
```
Or from `server/`:
```bash
cd server
npm test
```
All tests use Node.js's native test runner (`node:test`) verifying:
1. Google ID token validation and error handling
2. `/api/health` connectivity
3. `/api/auth/me` guest vs authenticated session resolution
4. Strict 401 rejection on protected routes
5. 404 handling on unknown routes
6. Dynamic streak tracking, same-day deduplication, consecutive day preservation
7. Protected dashboard stats access

---

## 🚢 Production Deployment

### Client (`client/`)
- Platform: **Vercel**, **Cloudflare Pages**, or **Netlify**
- Build Command: `npm run build`
- Output Directory: `dist` (within `client/`)
- Environment Variables:
  - `VITE_GOOGLE_CLIENT_ID`
  - `VITE_API_BASE_URL=https://interview-hub-1-1dah.onrender.com/api`

### Server (`server/`)
- Platform: **Render** ([Live: `https://interview-hub-1-1dah.onrender.com`](https://interview-hub-1-1dah.onrender.com/api/health))
- Build/Start Command: `node src/server.js`
- Environment Variables:
  - `NODE_ENV=production`
  - `MONGODB_URI`
  - `GOOGLE_CLIENT_ID`
  - `SERVER_URL=https://interview-hub-1-1dah.onrender.com`
  - `CLIENT_URL=https://inter-view-hub.vercel.app`
  - `ALLOWED_ORIGINS=https://inter-view-hub.vercel.app,http://localhost:5173,http://localhost:5174`

---

## 📄 License

MIT License — see LICENSE for details.

---
title: Production Dockerfile Optimization and Multi-Stage Builds
subject: Docker
category: DevOps & Cloud
difficulty: medium
importance: high
tags:
  - docker
  - dockerfile
  - multi-stage
  - optimization
  - alpine
  - distroless
---

# Production Dockerfile Optimization and Multi-Stage Builds

Writing efficient Dockerfiles minimizes image size, speeds up CI/CD build caches, and eliminates security vulnerabilities by excluding build tools from runtime containers.

---

## 1. Multi-Stage Build Pattern

Multi-stage builds allow separating the **build environment** (compilers, devDependencies, SDKs) from the **runtime environment** (minimal production runtime).

```dockerfile
# ==========================================
# STAGE 1: Build & Compile
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests first to leverage Docker layer caching
COPY package*.json ./
RUN npm ci

# Copy source code and build production bundle
COPY . .
RUN npm run build && npm prune --production

# ==========================================
# STAGE 2: Minimal Production Image
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

# Security: Run as non-root user
ENV NODE_ENV=production
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only production artifacts and node_modules from builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

USER appuser
EXPOSE 3000

CMD ["node", "dist/server.js"]
```

---

## 2. Dockerfile Optimization Checklist

| Technique | Anti-Pattern | Recommended Practice |
|---|---|---|
| **Layer Caching** | Copying entire directory before installing dependencies | Copy `package.json` / `go.mod` first, run install, then copy source |
| **Chaining Commands** | Multiple `RUN apt-get` commands creating bloated layers | Chain with `&&` and clean apt cache in the same layer (`rm -rf /var/lib/apt/lists/*`) |
| **Base Images** | Using full `ubuntu:latest` (100MB+) | Use minimal bases: `alpine`, `distroless`, or `slim` |
| **User Privileges** | Running container as default `root` | Define non-root user via `USER` directive |
| **Ignoring Files** | Committing `.git`, `node_modules`, `.env` | Use `.dockerignore` file |

---

## 3. Difference between ENTRYPOINT and CMD

Both directives define how a container process begins:

```dockerfile
# Exec form (Recommended):
ENTRYPOINT ["executable", "param1"]
CMD ["default_param2"]
```

- **ENTRYPOINT:** Defines the binary that will *always* be executed.
- **CMD:** Supplies default arguments to the ENTRYPOINT, which can be easily overridden at runtime via `docker run image override_arg`.

---

## 4. Key Terminology & Interview Questions

### Q1: Why is multi-stage building critical for compiled languages like Go or Rust?
A Go compiler image (`golang:1.22`) is over 800 MB. However, Go compiles into a standalone, statically linked binary. With a multi-stage build, the binary can be copied into a `scratch` or `distroless` image, shrinking the final production image to less than 20 MB with zero OS packages or vulnerabilities.

### Q2: What is the purpose of the `.dockerignore` file?
It prevents build contexts from copying unnecessary files (e.g. `.git`, `.env`, build artifacts, `node_modules`) into the Docker daemon, significantly accelerating `docker build` times and preventing accidental credential leakage.

### Q3: Why should you avoid `ADD` in favor of `COPY`?
`COPY` is transparent and only copies local files into the container. `ADD` includes complex behaviors like unpacking tar archives and fetching remote URLs, which can introduce unpredictable security risks and break layer caching.

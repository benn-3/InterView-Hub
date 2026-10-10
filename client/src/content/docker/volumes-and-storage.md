---
title: Docker Volumes, Bind Mounts, and Data Persistence
subject: Docker
category: DevOps & Cloud
difficulty: medium
importance: high
tags:
  - docker
  - volumes
  - storage
  - bind-mounts
  - persistence
---

# Docker Storage: Volumes, Bind Mounts, and Data Persistence

By default, all data written inside a container is stored in its writable container layer and lost when the container is deleted (`docker rm`). Docker provides two main persistence mechanisms: **Named Volumes** and **Bind Mounts**.

---

## 1. Storage Comparison Matrix

```
HOST FILESYSTEM
┌────────────────────────────────────────────────────────┐
│  /var/lib/docker/volumes/  <─── DOCKER NAMED VOLUME     │
│  (Managed entirely by Docker; isolated from host OS)   │
├────────────────────────────────────────────────────────┤
│  /home/user/project/code   <─── BIND MOUNT             │
│  (Direct mount of arbitrary host directory or file)   │
├────────────────────────────────────────────────────────┤
│  Host RAM (tmpfs)          <─── TMPFS MOUNT            │
│  (Non-persistent; stored purely in host memory)       │
└────────────────────────────────────────────────────────┘
```

| Type | Managed By | Path on Host | Best Use Case |
|---|---|---|---|
| **Named Volume** | Docker Daemon | `/var/lib/docker/volumes/` | Databases (Postgres, MySQL), persistent production state |
| **Bind Mount** | Host filesystem | Any host path (e.g., `./src`) | Local dev environments (hot reloading code) |
| **tmpfs Mount** | Host RAM | In-memory | High-speed temporary files, sensitive non-persistent credentials |

---

## 2. Practical Volume Commands

```bash
# Create and inspect a named volume
docker volume create pg_data
docker volume inspect pg_data

# Mount named volume to container
docker run -d \
  --name db \
  -v pg_data:/var/lib/postgresql/data \
  postgres:16-alpine

# Modern --mount syntax (explicit and recommended)
docker run -d \
  --name web \
  --mount type=bind,source="$(pwd)"/src,target=/app/src,readonly \
  node:20-alpine
```

---

## 3. Volume Permissions and UID Matching

A common pitfall with bind mounts is file ownership mismatches:
- The container process running as user ID `1000` writes files to a bind-mounted directory owned by `root` on the host, causing `EACCES: permission denied`.
- **Solution:** Pass host user UID/GID at runtime:
```bash
docker run --user "$(id -u):$(id -g)" -v "$(pwd):/app" node:20 npm test
```

---

## 4. Key Terminology & Interview Questions

### Q1: What happens to a Named Volume when a container is removed with `docker rm -f`?
The named volume remains untouched on the host filesystem. Docker volumes have an independent lifecycle from containers to protect data. To remove unattached volumes, run `docker volume prune`.

### Q2: Why are Named Volumes preferred over Bind Mounts in production?
1. Volumes are managed by Docker and stored in dedicated daemon storage (`/var/lib/docker/volumes/`), eliminating dependencies on host directory layouts.
2. Volume drivers support remote cloud block storage (e.g. AWS EBS, NFS, Ceph) without application changes.
3. Volumes provide better I/O performance on macOS and Windows (Docker Desktop) than bind mounts over virtualized filesystems.

### Q3: What is the difference between `-v` and `--mount`?
`-v` (or `--volume`) is shorter but syntax-ambiguous (if the host path does not exist, Docker silently creates a directory). `--mount` is explicit, fails cleanly with an error if a bind source directory does not exist, and provides clear comma-separated key-value parameters.

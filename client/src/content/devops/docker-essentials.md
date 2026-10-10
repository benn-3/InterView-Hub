---
title: Docker & Container Fundamentals
subject: DevOps
category: Containers
difficulty: medium
importance: high
tags:
  - devops
  - docker
  - containers
  - microservices
---

# Docker & Containerization Essentials

Docker packages applications and their dependencies into portable, isolated containers, solving the *"works on my machine"* dilemma.

---

## 1. Containers vs Virtual Machines

| Aspect | Containers (Docker) | Virtual Machines (VMs) |
| :--- | :--- | :--- |
| **Architecture** | Shares host OS Kernel | Includes full guest OS |
| **Startup Time** | Milliseconds | Minutes |
| **Footprint** | Megabytes | Gigabytes |
| **Isolation** | Process-level (namespaces & cgroups) | Hardware-level hypervisor |

---

## 2. Docker Architecture

- **Docker Client:** CLI interface (`docker build`, `docker run`).
- **Docker Daemon (dockerd):** Background service managing images, containers, networks, and volumes.
- **Docker Registry:** Storage repository for images (Docker Hub, AWS ECR).
- **Dockerfile:** Text document with instructions to build an automated image.

---

## 3. Essential Commands

```bash
# Build an image from Dockerfile in current dir
docker build -t my-app:1.0 .

# Run container with port forwarding and detached mode
docker run -d -p 8080:80 --name web-container my-app:1.0

# View running containers
docker ps

# Inspect logs
docker logs -f web-container

# Clean up dangling images and containers
docker system prune -a
```

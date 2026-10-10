---
title: Docker Networking and Multi-Container Compose
subject: Docker
category: DevOps & Cloud
difficulty: medium
importance: high
tags:
  - docker
  - docker-compose
  - networking
  - bridge
  - dns
---

# Docker Networking and Multi-Container Docker Compose

Docker provides virtual software-defined networks that enable container isolation, port publication, and embedded DNS resolution across services.

---

## 1. Docker Network Drivers

| Network Driver | Behavior | Use Case |
|---|---|---|
| **bridge** (default) | Creates an internal private subnet (`172.17.x.x`) on the host | Standard isolated containers on a single host |
| **host** | Disables network isolation; container shares host network stack directly | High-throughput, latency-critical networking |
| **none** | Disables all networking (only loopback interface `127.0.0.1`) | Isolated batch jobs, security sandboxes |
| **overlay** | Connects containers across multiple Docker hosts (Swarm) | Multi-host container clustering |
| **macvlan** | Assigns a physical MAC address directly to the container | Legacy apps requiring direct connection to physical LAN |

---

## 2. Docker Compose Architecture

Docker Compose orchestrates multi-container applications declaratively using a `compose.yaml` file. By default, Compose creates a custom user-defined **bridge network** where containers can reach each other via their service names using Docker's internal DNS.

```yaml
version: '3.8'

services:
  web-api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=postgres-db
      - DB_PORT=5432
      - REDIS_HOST=cache
    depends_on:
      postgres-db:
        condition: service_healthy
      cache:
        condition: service_started
    networks:
      - backend-net

  postgres-db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: appdb
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secretpassword
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - backend-net

  cache:
    image: redis:7-alpine
    networks:
      - backend-net

volumes:
  db-data:

networks:
  backend-net:
    driver: bridge
```

---

## 3. Port Publishing vs Port Exposure

- **EXPOSE (Dockerfile):** Purely documentation metadata. It signals that the container listens on that port, but does not open or map ports on the host.
- **-p 8080:80 (Publishing):** Tells Docker to configure `iptables` / NAT rules routing host port `8080` to container port `80`.

---

## 4. Key Terminology & Interview Questions

### Q1: How does automatic service discovery work in Docker Compose?
On custom user-defined bridge networks, Docker runs an embedded DNS server at `127.0.0.11`. When container `web-api` queries hostname `postgres-db`, Docker DNS resolves it directly to the internal IP address assigned to the `postgres-db` container.

### Q2: Why should you avoid linking containers on the default `bridge` network?
The default bridge network (`bridge`) does not support automatic DNS service discovery by container name; it requires hardcoded IP addresses or deprecated `--link` flags. User-defined bridge networks provide dynamic DNS resolution and better isolation.

### Q3: What is the purpose of `depends_on` with `condition: service_healthy`?
Simply using `depends_on: [postgres-db]` only waits until the Postgres container process is spawned, not until the database engine is actually ready to accept socket connections. Combining `depends_on` with a health check ensures that dependent services wait until the database responds to `pg_isready`.

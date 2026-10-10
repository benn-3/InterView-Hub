---
title: Horizontal vs Vertical Scaling and Load Balancing
subject: System Design
category: Software Engineering
difficulty: medium
importance: high
tags:
  - system-design
  - scalability
  - load-balancing
  - high-availability
  - architecture
---

# Horizontal vs Vertical Scaling and High Availability Architecture

Designing systems that can scale from thousands to millions of concurrent users requires understanding architectural tradeoffs between scaling out (horizontal) and scaling up (vertical).

---

## 1. Vertical Scaling (Scale-Up) vs Horizontal Scaling (Scale-Out)

```
VERTICAL SCALING (Scale Up)             HORIZONTAL SCALING (Scale Out)
┌─────────────────────────┐             ┌──────┐  ┌──────┐  ┌──────┐
│ Single High-End Server  │             │Server│  │Server│  │Server│
│ (128 vCPUs, 1 TB RAM)   │             │  1   │  │  2   │  │  3   │
│ Single Point of Failure │             └──────┘  └──────┘  └──────┘
│ Hard hardware ceiling   │             Distributed & fault tolerant
└─────────────────────────┘             Requires load balancer & statelessness
```

| Dimension | Vertical Scaling | Horizontal Scaling |
|---|---|---|
| **Cost** | Exponentially high for high-end hardware | Linear; utilizes commodity cloud instances |
| **Downtime** | Usually requires downtime to upgrade RAM/CPU | Zero-downtime rolling additions and teardowns |
| **Complexity** | Simple (no distributed consensus or partitioning) | Higher (requires stateless apps, shared state, LB) |
| **Fault Tolerance** | Single point of failure (SPOF) | Resilient; if 1 instance fails, traffic routes to others |
| **Upper Ceiling** | Hard hardware maximum limits | Theoretically unbounded |

---

## 2. Load Balancing Strategies

Load balancers distribute incoming network traffic across a backend pool of application servers:

```
Clients ──► DNS Round Robin ──► Layer 7 Load Balancer (Reverse Proxy)
                                    ├── Server 1 (Health: Healthy)
                                    ├── Server 2 (Health: Healthy)
                                    └── Server 3 (Health: Degraded ─► Removed from pool)
```

### Common Load Balancing Algorithms:
1. **Round Robin:** Sequentially routes requests to each server in order. Best for servers with identical hardware specs and uniform request lengths.
2. **Least Connections:** Directs traffic to the server currently handling the fewest active connections. Best for long-lived connections (WebSockets, long polling).
3. **IP Hash (Sticky Sessions):** Hashes the client's IP address to route the same client consistently to the same server. Useful for legacy stateful session affinity, though stateful backends are discouraged.
4. **Weighted Round Robin:** Assigns higher request shares to servers with more CPU and RAM.

---

## 3. Designing Stateless Application Tiers

To achieve horizontal elasticity, the application tier must be **completely stateless**:

```
Stateful (Anti-Pattern):
Client A ──► Server 1 [Local Memory: Session Token A]
*If Server 1 crashes, Client A is logged out and loses cart data!*

Stateless (Best Practice):
Client A ──► Any Server (1, 2, or 3)
                   │ Reads/Writes
                   ▼
         Shared State Layer
     [Redis Cache / PostgreSQL]
```

---

## 4. Key Terminology & Interview Questions

### Q1: What is the difference between Layer 4 (L4) and Layer 7 (L7) load balancers?
- **Layer 4 (Transport Layer):** Operates on IP addresses and TCP/UDP ports without inspecting the packet payload. Performs routing via high-speed network packet translation. Fast and lightweight.
- **Layer 7 (Application Layer):** Terminates TLS and inspects HTTP application data (URL path, cookies, request headers). Enables smart routing (e.g. routing `/api/video` to streaming servers and `/api/checkout` to payment servers).

### Q2: How do you eliminate the Load Balancer as a Single Point of Failure?
Deploy two or more load balancers configured in an **Active-Passive** or **Active-Active** topology using:
1. **VRRP / Keepalived (Floating Virtual IP):** If the active load balancer fails health checks, the passive backup takes ownership of the IP within milliseconds.
2. **DNS Anycast / Multi-Region DNS Routing (AWS Route53):** Distributes incoming traffic across geographically distinct load balancer endpoints with automated failover health checks.

### Q3: What is the "Shared-Nothing Architecture"?
An architectural philosophy where each node is independent and self-sufficient. There is no central point of contention such as shared memory or disk. Nodes communicate solely via message passing over network protocols, maximizing horizontal scalability.

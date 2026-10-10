---
title: Rate Limiting Algorithms and the Circuit Breaker Pattern
subject: System Design
category: Software Engineering
difficulty: hard
importance: high
tags:
  - system-design
  - rate-limiting
  - circuit-breaker
  - resilience
  - token-bucket
  - leaky-bucket
---

# Rate Limiting Algorithms & The Circuit Breaker Pattern

Resilient distributed architectures guard against cascading system failures, noisy neighbors, and denial-of-service attacks using **Rate Limiters** and **Circuit Breakers**.

---

## 1. Rate Limiting Algorithms Comparison

```
1. TOKEN BUCKET (Most Popular)
   Tokens added at fixed rate (r/sec) into bucket with capacity (b).
   Incoming request consumes 1 token. If bucket empty, request rejected (HTTP 429).
   *Allows bursts of up to capacity b.*

2. LEAKY BUCKET (Queue-Based)
   Requests enter FIFO queue; leak out and process at a smooth constant rate.
   *Eliminates bursts; smooths traffic spikes.*

3. FIXED WINDOW COUNTER
   Counts requests per 1-minute time bucket (e.g. 100 req/min).
   *Flaw: Traffic burst at boundary (minute 0:59 and 1:01) allows 2x threshold.*

4. SLIDING WINDOW LOG / COUNTER
   Combines weighted counts from previous and current window.
   *Accurate, prevents window edge boundary spikes.*
```

| Algorithm | Handles Bursts? | Memory Complexity | Implementation Difficulty |
|---|---|---|---|
| **Token Bucket** | Yes | Low ($O(1)$ per user: timestamp + count) | Simple |
| **Leaky Bucket** | No (smooths to constant rate) | Moderate (FIFO queue) | Moderate |
| **Fixed Window** | Allows 2x spikes at boundaries | Ultra-Low (single counter) | Simplest |
| **Sliding Window Counter** | Yes, smoothed | Low ($O(1)$) | Moderate |

---

## 2. Distributed Rate Limiting with Redis

In multi-node web tiers, rate limiting counters must be stored centrally in Redis:

```lua
-- Atomic Token Bucket Lua Script in Redis
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local current = tonumber(redis.call('get', key) or "0")

if current + 1 > limit then
    return 0 -- Rejected (HTTP 429)
else
    redis.call("INCRBY", key, 1)
    if current == 0 then
        redis.call("EXPIRE", key, 60) -- 1 minute window
    end
    return 1 -- Allowed
end
```

---

## 3. The Circuit Breaker Pattern

When a downstream dependency (e.g. third-party credit card API) is failing or timing out, callers should fail fast instead of holding threads open and exhausting server thread pools.

```
                  ┌──────────────────────────────┐
                  │                              │
                  ▼                              │ Success count
         ┌──────────────────┐                    │ reaches threshold
         │      CLOSED      │ (Normal operation; │
         │ (Requests flow)  │  all requests pass)│
         └────────┬─────────┘                    │
                  │ Failure threshold exceeded   │
                  │ (e.g. 50% errors over 10s)   │
                  ▼                              │
         ┌──────────────────┐                    │
         │       OPEN       │ (Fails FAST immediately;
         │ (No calls pass)  │  returns fallback cached response)
         └────────┬─────────┘
                  │ Sleep window expires (e.g. 30s)
                  ▼
         ┌──────────────────┐
         │    HALF-OPEN     │ ──Failure──► Returns to OPEN
         │ (Probe 5 calls)  │
         └──────────────────┘
```

---

## 4. Key Terminology & Interview Questions

### Q1: What HTTP response status and headers should a rate limiter return?
- **Status:** `429 Too Many Requests`
- **Standard Headers:**
  - `X-RateLimit-Limit`: Maximum requests permitted per window.
  - `X-RateLimit-Remaining`: Number of requests remaining in current window.
  - `Retry-After`: Number of seconds the client must wait before making another request.

### Q2: What is the risk of doing a naive `GET` and `INCR` in Redis without Lua scripting?
A race condition occurs when concurrent requests arrive at the same millisecond: both execute `GET` simultaneously, observe the count under the limit, increment, and exceed the allowed quota (**Check-Then-Act concurrency bug**). Executing via a **Redis Lua script** or atomic `INCR` guarantees serialization.

### Q3: How does a Circuit Breaker prevent Cascading Failures in Microservices?
Without a circuit breaker, slow responses tie up worker threads and HTTP connection pools on upstream caller services. When those pools are exhausted, the upstream caller fails too, propagating the outage up the dependency chain until the entire application goes down. Circuit breakers cut off the failing service and return instant fallbacks, protecting the rest of the cluster.

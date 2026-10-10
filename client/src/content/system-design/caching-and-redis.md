---
title: Caching Strategies, Eviction Policies, and Redis Architecture
subject: System Design
category: Software Engineering
difficulty: hard
importance: high
tags:
  - system-design
  - caching
  - redis
  - lru
  - cache-patterns
  - distributed-cache
---

# Caching Strategies, Eviction Policies, and Redis Architecture

Accessing data from volatile memory (RAM) is orders of magnitude faster (~100 nanoseconds) than reading from solid-state disks (~100 microseconds) or executing complex relational database queries (~10 milliseconds).

---

## 1. Caching Access Patterns

```
1. CACHE-ASIDE (Lazy Loading - Most Common)
   Application ──1. Read──► Cache (Hit: return data)
       │ (Miss)
       ├──2. Read DB──► Database
       └──3. Write Key──► Cache

2. READ-THROUGH
   Application ──► Cache Library ──(Auto fetches on miss)──► Database

3. WRITE-THROUGH
   Application ──► Cache ──(Synchronously writes)──► Database

4. WRITE-BEHIND (Write-Back)
   Application ──► Cache (Immediate ACK) ──(Async batch flush)──► Database
```

| Pattern | Read Latency | Write Latency | Risk of Data Loss |
|---|---|---|---|
| **Cache-Aside** | High on miss, Low on hit | Normal (direct to DB) | None |
| **Write-Through** | Low (cache always warm) | High (waits for cache + DB) | None |
| **Write-Behind** | Low | Ultra-Low (writes to RAM) | **High** (if cache crashes before flushing to DB) |

---

## 2. Cache Eviction Policies

When cache RAM is full, the system must discard items to accommodate new keys:
- **LRU (Least Recently Used):** Discards keys that have not been read or written for the longest duration. Standard general-purpose policy.
- **LFU (Least Frequently Used):** Tracks access counters and discards keys accessed fewest times.
- **FIFO (First In First Out):** Discards the oldest inserted keys regardless of recent popularity.
- **TTL (Time to Live / Expire):** Evicts keys once their expiration timestamp has passed.

---

## 3. Classic Caching Pitfalls and Mitigations

### 1. Cache Stampede / Thundering Herd
- **Problem:** When an extremely hot key expires, thousands of concurrent requests miss simultaneously and overwhelm the underlying database.
- **Mitigation:** Use **Mutex locking / Singleflight** so only one request queries the database while others wait, or implement probabilistic early recomputation (XFetch).

### 2. Cache Penetration
- **Problem:** Attackers repeatedly query non-existent keys (e.g. `userId = -99999`), bypassing the cache entirely and hitting the DB every time.
- **Mitigation:** Cache `null` values with short TTLs or use a **Bloom Filter** in front of the cache to quickly reject non-existent IDs.

### 3. Cache Avalanche
- **Problem:** Hundreds of thousands of keys are configured with the identical TTL (e.g., 2 hours). When they expire at the same exact second, DB traffic spikes catastrophically.
- **Mitigation:** Add random **TTL Jitter** (e.g. `TTL = base_ttl + rand(0, 300)` seconds).

---

## 4. Key Terminology & Interview Questions

### Q1: Why is Redis single-threaded yet able to process over 100,000 operations per second?
Redis core execution runs on a single event loop because:
1. Operations execute purely in **RAM** with zero disk I/O latency.
2. It uses non-blocking I/O multiplexing (**epoll / kqueue**) to handle thousands of concurrent TCP sockets on a single thread.
3. It completely avoids thread context switching, synchronization locks, and CPU cache invalidation overhead.

### Q2: How does Redis handle data persistence if it is an in-memory database?
Redis supports two persistence mechanisms:
- **RDB (Redis Database Snapshot):** Point-in-time binary snapshot of memory taken at scheduled intervals via background `fork()`. Fast restarts, but risks losing recent data since the last snapshot.
- **AOF (Append Only File):** Logs every single write command to an append-only file on disk. High durability, slower restarts, and larger file sizes.

### Q3: What is the difference between Memcached and Redis?
- **Memcached:** Simple, multi-threaded key-value store optimized for basic string caching.
- **Redis:** Feature-rich data structures store (Strings, Hashes, Lists, Sets, Sorted Sets, Bitmaps, HyperLogLogs, Geospatial, Pub/Sub, Streams) with persistence, clustering, and Lua scripting capabilities.

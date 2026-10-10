---
title: Distributed Databases and Sharding
subject: DBMS
category: Architecture
difficulty: hard
importance: high
tags:
  - dbms
  - distributed
  - cap-theorem
  - sharding
---

# Distributed Databases and Sharding

When data volume and query throughput exceed the vertical scaling capacity of a single physical machine, databases must be distributed across clusters of nodes.

---

## 1. The CAP Theorem and PACELC

Formulated by Eric Brewer, the **CAP Theorem** states that a distributed data store can guarantee at most two of the following three properties during network operations:

- **Consistency (C):** Every read receives the most recent write or an error.
- **Availability (A):** Every non-failing node returns a successful response without guaranteed latest write.
- **Partition Tolerance (P):** The system continues operating despite dropped packets or network partitions between nodes.

> **Crucial Reality:** Physical network partitions ($P$) are inevitable in distributed systems. Therefore, architectures must choose between **CP** (Consistency over Availability, e.g. etcd, Spanner) or **AP** (Availability over Consistency, e.g. Cassandra, CouchDB).

### PACELC Theorem
Extends CAP by considering normal operations without partitions:
- If there is a **P**artition, how do you trade off **A**vailability and **C**onsistency?
- **E**lse (normal state), how do you trade off **L**atency and **C**onsistency?

---

## 2. Horizontal Partitioning (Sharding)

**Sharding** splits a massive database horizontally across multiple independent servers (shards), each holding a subset of rows.

### Common Sharding Strategies:
1. **Range-Based Sharding:** Partition by value ranges (e.g., User IDs 1-1000000 on Shard 1). Downside: Uneven distribution and hot spots on active ranges.
2. **Hash-Based Sharding:** $\text{Shard} = \text{hash}(\text{user\_id}) \pmod N$. Provides uniform distribution, but re-sharding when adding nodes is costly.
3. **Consistent Hashing:** Minimizes data migration to $\frac{K}{N}$ keys during node scaling.

---

## 3. Distributed Transactions (Two-Phase Commit - 2PC)

When a transaction spans multiple physical database shards, standard local ACID guarantees break down. The **Two-Phase Commit (2PC)** protocol coordinates atomic commits:

1. **Prepare Phase:** Coordinator node sends `PREPARE` to all participating shards. Each shard acquires local locks, writes redo/undo logs, and votes `VOTE_COMMIT` or `VOTE_ABORT`.
2. **Commit Phase:** If all shards voted commit, the coordinator sends `GLOBAL_COMMIT`; if any node voted abort, the coordinator broadcasts `GLOBAL_ABORT`.
- **Limitation:** 2PC is a blocking protocol; if the coordinator crashes during the prepare phase, participating shards remain locked indefinitely.

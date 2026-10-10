---
title: Query Optimization and Lock Management
subject: DBMS
category: Core Database Systems
difficulty: medium
importance: high
tags:
  - dbms
  - query-planner
  - locking
  - deadlocks
---

# Query Optimization and Lock Management

Relational databases utilize cost-based query optimizers to transform declarative SQL queries into efficient physical execution plans. Understanding optimizer mechanics and locking behavior prevents production outages.

---

## 1. How Cost-Based Query Optimizers (CBO) Work

When an SQL query is submitted:
1. **Parser & Lexer:** Validates SQL syntax and semantics, generating a Parse Tree.
2. **Query Rewriter:** Applies logical transformations (flattening subqueries, pushing down predicates).
3. **Query Optimizer:** Analyzes table statistics (histograms, row counts, null fractions) collected via `ANALYZE`, evaluates possible physical access paths (Seq Scan vs Index Scan, Nested Loop vs Hash Join), and selects the plan with lowest estimated I/O and CPU cost.
4. **Execution Engine:** Executes the physical operators and streams tuples.

---

## 2. Lock Modes and Granularity

Databases manage concurrency using locks at varying granularity levels:
- **Table Locks:** Coarse-grained; locks entire table during `ALTER TABLE`.
- **Page Locks:** Locks a 16KB disk page.
- **Row Locks:** Fine-grained; locks individual primary key rows (InnoDB `SELECT ... FOR UPDATE`).

### Shared (S) vs Exclusive (X) Locks
- **Shared Lock (S-Lock / Read Lock):** Multiple transactions can hold shared locks on the same row concurrently for reading. Blocks exclusive locks.
- **Exclusive Lock (X-Lock / Write Lock):** Only one transaction can hold an X-lock. Blocks all other S and X locks.

---

## 3. Deadlock Detection and Resolution

A **Deadlock** occurs when two or more transactions hold locks needed by each other and neither can proceed:
- Transaction 1 holds Row A and waits for Row B.
- Transaction 2 holds Row B and waits for Row A.

### Detection & Resolution
- **Wait-For Graph (WFG):** The engine maintains a background directed graph where nodes represent active transactions and edges represent lock wait relationships. It periodically runs cycle detection (e.g., every 1 second).
- **Victim Selection:** When a cycle is detected, the engine picks the transaction with the fewest modified rows (lowest rollback cost) as the victim, rolls it back, and returns error code `1213: Deadlock found when trying to get lock`.

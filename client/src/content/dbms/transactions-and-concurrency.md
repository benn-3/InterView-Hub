---
title: Transactions and Concurrency Control
subject: DBMS
category: Core Database Systems
difficulty: hard
importance: high
tags:
  - dbms
  - acid
  - mvcc
  - isolation-levels
  - concurrency
---

# Transactions and Concurrency Control

A **Transaction** is a logical unit of database processing that includes one or more database access operations (insert, delete, read, update). Managing transactions in high-concurrency environments requires balancing data integrity against system throughput.

---

## 1. The ACID Properties

| Property | Definition | Implementation Mechanism |
| :--- | :--- | :--- |
| **Atomicity** | "All or nothing" execution. | **Undo Logs** & Write-Ahead Logging (WAL). |
| **Consistency** | Database moves only between valid states satisfying all invariants. | Schema constraints, triggers, cascading rules. |
| **Isolation** | Concurrent transactions do not observe intermediate states of each other. | Locks (2PL) and **MVCC (Multi-Version Concurrency Control)**. |
| **Durability** | Committed transactions survive power loss or system crashes. | **Redo Logs** / WAL flushed to disk via fsync. |

---

## 2. Transaction Isolation Levels and Read Anomalies

The ANSI SQL standard defines 4 isolation levels to control concurrency trade-offs:

| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |
| :--- | :--- | :--- | :--- |
| **Read Uncommitted** | Possible | Possible | Possible |
| **Read Committed** | Prevented | Possible | Possible |
| **Repeatable Read** | Prevented | Prevented | Possible (Prevented in InnoDB via Next-Key locks) |
| **Serializable** | Prevented | Prevented | Prevented |

### The Read Anomalies Explained
- **Dirty Read:** Transaction $T_2$ reads data modified by uncommitted transaction $T_1$. If $T_1$ rolls back, $T_2$ acted on phantom data.
- **Non-Repeatable Read:** $T_1$ reads a row. $T_2$ updates that row and commits. $T_1$ re-reads the row and observes changed values.
- **Phantom Read:** $T_1$ reads a range of rows matching a WHERE condition. $T_2$ inserts a new row matching that condition and commits. $T_1$ re-runs the range query and sees a new "phantom" row.

---

## 3. Multi-Version Concurrency Control (MVCC)

Traditional databases used shared locks for readers and exclusive locks for writers, causing severe lock contention. **MVCC** solves this:

> **"Readers never block Writers, and Writers never block Readers."**

### How MVCC Works (Postgres & MySQL InnoDB)
- When a row is updated, the engine does NOT overwrite data in-place.
- Instead, it appends a new row version with creation and deletion transaction timestamps ($T_{\text{min}}, T_{\text{max}}$ in Postgres; `DB_TRX_ID` and `roll_ptr` in InnoDB).
- Each query reads only row versions that were committed before the query\'s snapshot timestamp.
- Outdated row versions ("dead tuples") are cleaned up asynchronously by background purge threads (**VACUUM** in PostgreSQL).

---

## 4. Key Terminology Cheat Sheet

| Term | Definition |
| :--- | :--- |
| **Write-Ahead Log (WAL)** | Log written to disk before modifying actual data pages. |
| **Two-Phase Locking (2PL)**| Protocol with Growing phase (acquire locks) and Shrinking phase (release locks). |
| **Deadlock** | Cycle in Wait-For Graph where two transactions wait for locks held by each other. |
| **Pessimistic vs Optimistic**| Pessimistic locks upfront; Optimistic checks version numbers on commit. |

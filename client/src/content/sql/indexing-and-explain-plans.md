---
title: Query Optimization and EXPLAIN Plans
subject: SQL
category: Performance & Optimization
difficulty: hard
importance: high
tags:
  - sql
  - explain
  - execution-plans
  - sargable
  - indexes
---

# Query Optimization and EXPLAIN Plans

Writing functional SQL is easy; writing SQL that scales to tens of millions of records without locking up the database requires understanding query planner execution plans and writing **SARGable** queries.

---

## 1. What Makes a Query "SARGable"?

**SARGable** stands for **S**earch **ARG**ument **ABLE**. A query is SARGable if the database engine can utilize an index seek rather than resorting to a full table scan.

### The Function Call Anti-Pattern (Non-SARGable)
```sql
-- NON-SARGABLE (Forces Full Table Scan over all 10M rows)
SELECT * FROM orders WHERE YEAR(order_date) = 2024;

-- SARGABLE (Enables logarithmic B+ Tree index seek)
SELECT * FROM orders 
WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01';
```

### The Leading Wildcard Anti-Pattern
```sql
-- NON-SARGABLE (Cannot seek into B+ Tree)
SELECT * FROM users WHERE email LIKE '%@gmail.com';

-- SARGABLE (Can seek prefix)
SELECT * FROM users WHERE email LIKE 'alice%';
```

---

## 2. Reading an EXPLAIN Plan

```sql
EXPLAIN ANALYZE
SELECT u.name, o.total_amount
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.created_at >= '2024-01-01';
```

### Key Terms to Inspect:
1. **Seq Scan (Full Table Scan):** Reads every block on disk. Acceptable only on small lookup tables (< 1,000 rows).
2. **Index Scan:** Seeks into a B+ tree to find matching row pointers, then visits physical table blocks to retrieve non-indexed columns.
3. **Index Only Scan:** Satisfies the query entirely from index leaf nodes without visiting the table heap.
4. **Rows Removed by Filter:** High numbers indicate an index is missing or non-selective.

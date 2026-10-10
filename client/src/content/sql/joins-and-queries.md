---
title: SQL Joins and Query Execution Order
subject: SQL
category: Querying
difficulty: easy
importance: high
tags:
  - sql
  - joins
  - execution-order
  - inner-join
  - outer-join
---

# SQL Joins and Query Execution Order

Relational databases derive their power from joining separate normalized tables together at query time. Understanding join semantics and SQL execution order is mandatory for every data engineer and backend developer.

---

## 1. Complete SQL Joins Taxonomy

```
      Table A                  Table B
    ┌─────────┐              ┌─────────┐
    │ id name │              │ id dept │
    ├─────────┤              ├─────────┤
    │  1  Amy │              │  1  Eng │
    │  2  Bob │              │  3  Ops │
    └─────────┘              └─────────┘
```

### INNER JOIN
Returns only matching records present in both tables.
```sql
SELECT a.name, b.dept
FROM TableA a
INNER JOIN TableB b ON a.id = b.id;
-- Output: Amy | Eng
```

### LEFT (OUTER) JOIN
Returns ALL records from Table A; unmatched columns from Table B are populated with `NULL`.
```sql
SELECT a.name, b.dept
FROM TableA a
LEFT JOIN TableB b ON a.id = b.id;
-- Output:
-- Amy | Eng
-- Bob | NULL
```

### FULL OUTER JOIN
Returns all records from both tables, filling with `NULL` on either side where matches do not exist.

### CROSS JOIN (Cartesian Product)
Pairs every row of Table A with every row of Table B ($M \times N$ total rows). No `ON` condition.

---

## 2. Logical Query Processing Order

SQL is a declarative language, meaning you write what you want rather than how to get it. However, database engines evaluate SQL clauses in a strict logical order that differs fundamentally from written order:

```
1. FROM & JOINs      ──> Locate tables and compute joins
2. WHERE             ──> Filter individual base rows
3. GROUP BY          ──> Group filtered rows into buckets
4. HAVING            ──> Filter aggregated buckets
5. SELECT            ──> Project requested columns & aliases
6. DISTINCT          ──> Remove duplicate rows
7. ORDER BY          ──> Sort the projected results
8. LIMIT / OFFSET    ──> Slice requested page of rows
```

### Why Column Aliases Fail in WHERE Clauses
```sql
-- FAILS with error: column "total_price" does not exist!
SELECT price * quantity AS total_price
FROM orders
WHERE total_price > 100;
```
**Explanation:** Step 2 (`WHERE`) executes BEFORE Step 5 (`SELECT`). The alias `total_price` has not been instantiated yet when the filter evaluates.

---

## 3. Physical Join Algorithms

Under the hood, database optimizers pick one of three physical algorithms:
- **Nested Loop Join:** Outer loop over Table A, inner loop over Table B. Efficient for tiny tables or when the inner table has an index on the join key.
- **Hash Join:** Builds an in-memory hash table on the smaller table, then streams and probes the larger table. Ideal for large, unsorted datasets with equality predicates.
- **Merge Join:** Both tables must be sorted on the join key. Sweeps through both streams simultaneously. Highly efficient when input tables are already ordered by indexes.

---
title: SQL Joins Master Guide
subject: SQL
category: Queries
difficulty: easy
importance: high
tags:
  - sql
  - joins
  - relational
  - interview
---

# SQL Joins: Visual and Query Guide

An SQL **JOIN** clause is used to combine rows from two or more tables based on a related column between them.

---

## 1. Types of SQL Joins

1. **INNER JOIN:** Returns records that have matching values in both tables.
2. **LEFT (OUTER) JOIN:** Returns all records from the left table, and matching records from the right table (NULL if no match).
3. **RIGHT (OUTER) JOIN:** Returns all records from the right table, and matching records from the left table.
4. **FULL (OUTER) JOIN:** Returns all records when there is a match in either left or right table.
5. **CROSS JOIN:** Returns the Cartesian product of rows from both tables.

```
INNER JOIN            LEFT JOIN            FULL OUTER JOIN
  [ A (∩) B ]        [ (A ∩) B ]              [ (A ∪ B) ]
 Matching only      All Left + Right        Everything from both
```

---

## 2. Practical Examples

Given the tables:
```sql
-- Employees Table: id, name, dept_id
-- Departments Table: dept_id, dept_name
```

### INNER JOIN:
```sql
SELECT e.name, d.dept_name
FROM Employees e
INNER JOIN Departments d ON e.dept_id = d.dept_id;
```

### LEFT JOIN: Find Employees without a Department
```sql
SELECT e.name, e.dept_id
FROM Employees e
LEFT JOIN Departments d ON e.dept_id = d.dept_id
WHERE d.dept_id IS NULL;
```

---

## 3. Self Join
A Self Join is a regular join, but the table is joined with itself. Classic use-case: Employee and Manager hierarchy in the same table.

```sql
SELECT 
    e.name AS Employee,
    m.name AS Manager
FROM Employees e
LEFT JOIN Employees m ON e.manager_id = m.id;
```

---

## 4. Performance Considerations
- Ensure columns used in the `ON` condition are **Indexed** (foreign keys should generally have non-clustered indexes).
- Filter rows using `WHERE` before joining large tables or use subqueries/CTEs to reduce table scan volume.

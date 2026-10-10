---
title: Aggregations, Grouping, and Rollups
subject: SQL
category: Querying
difficulty: medium
importance: high
tags:
  - sql
  - group-by
  - having
  - rollup
  - cube
---

# Aggregations, Grouping, and Rollups

Grouping operations collapse individual data rows into summary buckets. Writing correct aggregations requires understanding null handling and the distinction between row filtering (`WHERE`) and group filtering (`HAVING`).

---

## 1. Aggregate Functions and NULL Handling

Standard aggregate functions (`SUM`, `AVG`, `MIN`, `MAX`, `COUNT(column)`) **silently ignore NULL values**:
- `COUNT(*)` counts all rows, including rows containing NULLs.
- `COUNT(salary)` counts only rows where `salary IS NOT NULL`.
- `AVG(bonus)` divides the sum of non-null bonuses by the count of non-null rows (which might inflate the average if you intended nulls to count as 0; use `AVG(COALESCE(bonus, 0))` instead).

---

## 2. GROUP BY and HAVING Mechanics

```sql
SELECT 
    department_id,
    COUNT(*) as num_employees,
    AVG(salary) as avg_salary
FROM employees
WHERE is_active = TRUE         -- 1. Filter out inactive employees first
GROUP BY department_id
HAVING AVG(salary) > 85001;    -- 2. Filter groups by aggregate metric
```

---

## 3. Advanced Grouping: `ROLLUP` and `CUBE`

Used in analytics and data warehousing to generate hierarchical subtotals and grand totals in a single query pass.

```sql
-- ROLLUP generates subtotals by region, country, and grand total
SELECT 
    region, 
    country, 
    SUM(sales) as total_sales
FROM sales_data
GROUP BY ROLLUP (region, country);
```

```sql
-- Output includes:
-- [North America, USA, 100000]
-- [North America, Canada, 50000]
-- [North America, NULL, 150000]   <── Regional Subtotal
-- [NULL, NULL, 450010]             <── Grand Total
```

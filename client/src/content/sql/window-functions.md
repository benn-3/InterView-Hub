---
title: SQL Window Functions Masterclass
subject: SQL
category: Advanced Querying
difficulty: medium
importance: high
tags:
  - sql
  - window-functions
  - row-number
  - rank
  - dense-rank
---

# SQL Window Functions Masterclass

A **Window Function** performs calculations across a set of table rows that are related to the current row, without collapsing individual rows into a single summary output (unlike `GROUP BY`).

---

## 1. Syntax of the `OVER()` Clause

Every window function requires an `OVER` clause:

```sql
FUNCTION_NAME() OVER (
    PARTITION BY partition_column
    ORDER BY sort_column
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
)
```

- **`PARTITION BY`:** Divides rows into logical slices (windows) for independent calculation.
- **`ORDER BY`:** Dictates the calculation order within each window.
- **`ROWS / RANGE`:** Defines the running frame boundary.

---

## 2. Ranking Functions Comparison

Given scores `100, 90, 90, 80`:

| Function | Ties Behavior | Output for (100, 90, 90, 80) | Key Use Case |
| :--- | :--- | :--- | :--- |
| **`ROW_NUMBER()`** | Assigns strictly unique sequence | `1, 2, 3, 4` | Pagination, deduplication |
| **`RANK()`** | Tied rows get same rank; **skips gaps** | `1, 2, 2, 4` | Competitions / Olympiads |
| **`DENSE_RANK()`** | Tied rows get same rank; **no gaps** | `1, 2, 2, 3` | Top-N salaries per department |

```sql
-- Top 3 highest earning employees in each department
WITH RankedEmployees AS (
    SELECT 
        name,
        department_id,
        salary,
        DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank_pos
    FROM employees
)
SELECT name, department_id, salary
FROM RankedEmployees
WHERE rank_pos <= 3;
```

---

## 3. Positional Functions: `LAG()` and `LEAD()`

Used to compare the current row against preceding or succeeding rows without self-joins.

```sql
-- Calculate Day-Over-Day Revenue Growth
SELECT 
    order_date,
    revenue,
    LAG(revenue, 1) OVER (ORDER BY order_date) as prev_day_revenue,
    revenue - LAG(revenue, 1) OVER (ORDER BY order_date) as day_over_day_growth
FROM daily_sales;
```

---

## 4. Running Totals and Moving Averages

```sql
-- 7-Day Moving Average
SELECT 
    sale_date,
    amount,
    AVG(amount) OVER (
        ORDER BY sale_date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as seven_day_moving_avg
FROM sales;
```

---
title: Database Normalization
subject: DBMS
category: Relational Databases
difficulty: medium
importance: high
tags:
  - dbms
  - normalization
  - 1nf
  - 2nf
  - 3nf
  - bcnf
---

# Database Normalization (1NF, 2NF, 3NF, BCNF)

Normalization is the systematic approach of decomposing database tables to minimize data redundancy and avoid anomalies during INSERT, UPDATE, and DELETE operations.

---

## 1. Why Normalize? The Three Anomalies

Without normalization, redundant records create serious inconsistencies:

1. **Insertion Anomaly:** Unable to insert a record for one entity without inserting another unrelated entity (e.g., unable to add a new course without assigning a student).
2. **Update Anomaly:** Modifying a value requires updating multiple rows. Missing any row leads to inconsistent states.
3. **Deletion Anomaly:** Deleting one entity accidentally deletes other vital information (e.g., deleting a student accidentally wipes course details if stored in the same table).

---

## 2. First Normal Form (1NF)

A relation is in **1NF** if and only if:
- All column values are **atomic** (indivisible single values, no comma-separated arrays or composite items).
- Each column contains values of a single data type.
- Each row is unique (enforced by a Primary Key).

### Non-1NF Example:
| EmpID | Name | Skills |
| :--- | :--- | :--- |
| 101 | John | Java, SQL, React |

### 1NF Normalized:
| EmpID | Name | Skill |
| :--- | :--- | :--- |
| 101 | John | Java |
| 101 | John | SQL |
| 101 | John | React |

---

## 3. Second Normal Form (2NF)

A relation is in **2NF** if:
- It is in **1NF**.
- There is **NO Partial Functional Dependency** (all non-prime attributes are fully functionally dependent on the entire composite primary key).

> If a table has a single-column primary key, it is already automatically in 2NF!

---

## 4. Third Normal Form (3NF)

A relation is in **3NF** if:
- It is in **2NF**.
- There is **NO Transitive Dependency** ($X \rightarrow Y$ and $Y \rightarrow Z$ where $Z$ is a non-prime attribute). Non-prime attributes must depend only on candidate keys.

---

## 5. Boyce-Codd Normal Form (BCNF)

A stronger version of 3NF. A relation is in **BCNF** if for every non-trivial functional dependency $X \rightarrow Y$, $X$ must be a **Super Key**.

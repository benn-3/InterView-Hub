---
title: Database Indexing and Storage Engines
subject: DBMS
category: Core Database Systems
difficulty: medium
importance: high
tags:
  - dbms
  - indexing
  - b-plus-tree
  - buffer-pool
---

# Database Indexing and Storage Engines

Indexes are auxiliary data structures created to accelerate data retrieval. Without indexes, database engines must perform costly $O(N)$ Full Table Scans across millions of disk blocks.

---

## 1. Why B+ Trees are the Default Index Structure

Relational databases (MySQL InnoDB, PostgreSQL, Oracle) overwhelmingly choose **B+ Trees** over Binary Search Trees or Hash Tables for general indexing.

```
                  [ 50 | 100 ]            <── Root Node
                 /      |     \
       [ 20 | 35 ]  [ 60 | 80 ]  [ 120 | 150 ]  <── Internal Nodes
        /    \       /    \       /     \
     [Leaf1]───>[Leaf2]───>[Leaf3]───>[Leaf4]   <── Leaf Nodes linked in doubly-linked list
```

### Advantages of B+ Trees for Disk Storage:
1. **High Fan-out (Shallow Depth):** A B+ Tree node matches the disk page size (typically 16KB in InnoDB), storing hundreds of keys per node. A tree with height 3 or 4 can index tens of millions of rows with only 3 to 4 disk I/O seeks.
2. **Sequential Leaf Node Linking:** All actual data/pointers reside in the leaf nodes, which are linked together in a sequential doubly-linked list. This enables lightning-fast **Range Queries** (`WHERE age BETWEEN 20 AND 30`) via sequential read.
3. **Predictable Lookup Performance:** Every key lookup traverses exactly the same root-to-leaf depth.

---

## 2. Clustered vs Non-Clustered (Secondary) Indexes

| Feature | Clustered Index | Non-Clustered (Secondary) Index |
| :--- | :--- | :--- |
| **Physical Storage** | Dictates the physical order of rows on disk | Stored in separate B+ tree structure |
| **Number per Table** | Exactly **1** (usually Primary Key) | Multiple allowed |
| **Leaf Node Content** | Contains the **actual complete data row** | Contains index column value + **Primary Key pointer** |
| **Secondary Lookup Penalty**| Instant direct access | Requires a second lookup (Bookmark Lookup) into the Clustered Index |

### The Covering Index Optimization
If a secondary index contains all columns requested by a query (`SELECT user_id, email FROM users WHERE user_id = 10`), the engine satisfies the query directly from the secondary index leaves without touching the clustered index. This is known as an **Index-Only Scan**.

---

## 3. Buffer Pool and Disk Flushing Architecture

Disk I/O is the primary bottleneck of relational databases.
- **Buffer Pool:** A dedicated region of RAM that caches data and index pages.
- **Dirty Page:** A memory page in the buffer pool modified by an update that has not yet been written back to physical disk.
- **WAL Flush:** Rather than flushing heavy 16KB dirty pages immediately, the database writes a compact sequential log entry to the Write-Ahead Log (WAL) on disk. Checkpointing threads flush dirty pages to disk in the background.

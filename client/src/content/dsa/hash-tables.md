---
title: Hash Tables and Collision Resolution
subject: DSA
category: Core Data Structures
difficulty: medium
importance: high
tags:
  - dsa
  - hashing
  - hash-map
  - collisions
---

# Hash Tables and Collision Resolution

A **Hash Table** (or Hash Map) is an associative data structure that stores key-value pairs and offers average $O(1)$ time complexity for search, insertion, and deletion. In system design and coding interviews, hash tables are the most frequently tested data structure.

---

## 1. How Hashing Works

A hash table maps arbitrary keys (strings, objects) to fixed table indices:

```
Key ("alice") ──> Hash Function ──> Hash Code (32-bit int) ──> Compression (hash % N) ──> Bucket Index [4]
```

```java
// Java HashMap index calculation
int hash = (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16); // High-bit spreading
int index = (tableCapacity - 1) & hash; // Fast modulo when capacity is power of 2
```

---

## 2. Collision Resolution Techniques

Because the universe of possible keys is vastly larger than the table size, collisions ($\text{hash}(K_1) = \text{hash}(K_2)$) are mathematically inevitable by the **Pigeonhole Principle**.

### 1. Separate Chaining
Each table index points to a linked list (or self-balancing tree) of entries.
- **Java 8+ HashMap Optimization (Treeification):** When a bucket chain exceeds **TREEIFY_THRESHOLD = 8** and total capacity $\ge 64$, the linked list converts into a **Red-Black Tree**, reducing worst-case search from $O(N)$ down to $O(\log N)$.

```
Bucket 0: [ null ]
Bucket 1: [ "cat": 2 ] ──> [ "dog": 5 ] ──> [ "bat": 1 ]
Bucket 2: [ null ]
```

### 2. Open Addressing
All entries reside directly within the array table. If a collision occurs, probe for the next empty slot.
- **Linear Probing:** $\text{probe}(k, i) = (\text{hash}(k) + i) \pmod N$. Causes **Primary Clustering** (long continuous blocks of occupied slots).
- **Quadratic Probing:** $\text{probe}(k, i) = (\text{hash}(k) + c_1 i + c_2 i^2) \pmod N$. Mitigates primary clustering.
- **Double Hashing:** $\text{probe}(k, i) = (\text{hash}_1(k) + i \cdot \text{hash}_2(k)) \pmod N$. Provides uniform distribution.

---

## 3. Load Factor and Dynamic Rehashing

The **Load Factor** ($\alpha$) measures how full the hash table is:

$$\alpha = \frac{\text{Number of Stored Entries } (N)}{\text{Total Number of Buckets } (M)}$$

- In Java `HashMap`, default initial capacity is 16 and default load factor is **0.75**.
- When $N > M \times 0.75$, the table doubles capacity ($M \to 2M$) and rehashes all existing entries into the new bucket array ($O(N)$ work).

---

## 4. Key Terminology Cheat Sheet

| Term | Definition |
| :--- | :--- |
| **Hash Code** | An integer digest computed from an object\'s attributes. |
| **Load Factor** | The ratio of items to buckets triggering table resizing. |
| **Treeification** | Converting a collision linked list into a balanced Red-Black Tree. |
| **Hash Flooding** | A DoS attack sending engineered keys with identical hashes. |

---

## 5. Common Interview Mistakes

1. **Overriding `equals()` without overriding `hashCode()`:** If two objects are equal by `equals()`, their `hashCode()` MUST be identical. Violating this causes `map.get(key)` to fail and return `null`!
2. **Mutating Key Objects after Insertion:** If a key object is mutated, its hash code changes, making it unfindable in its original bucket (causing memory leaks). Always use immutable keys (`String`, `Integer`).

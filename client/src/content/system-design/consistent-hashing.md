---
title: Consistent Hashing and Distributed Partitioning
subject: System Design
category: Software Engineering
difficulty: hard
importance: high
tags:
  - system-design
  - consistent-hashing
  - distributed-systems
  - sharding
  - ring-topology
---

# Consistent Hashing and Distributed Partitioning

In distributed storage systems (DynamoDB, Cassandra, Memcached clusters), partitioning data across $N$ servers requires an algorithm that minimizes rehashing when nodes are added or removed.

---

## 1. The Naive Modulo Hashing Problem

Traditional hash partitioning uses the modulo operator:

$$\text{server} = \text{hash}(\text{key}) \pmod N$$

### Why Modulo Fails at Scale:
- If a cluster has $N = 4$ servers and 1 server crashes ($N = 3$), almost **every single key's destination changes**:
  - A key with $\text{hash} = 10$: $10 \pmod 4 = 2$, but $10 \pmod 3 = 1$.
- **Result:** $75\%$ or more of the cached keys are instantly invalidated, resulting in a massive cache stampede that crashes backend databases.

---

## 2. Consistent Hashing Ring Topology

Consistent hashing maps both **Servers** and **Data Keys** to points on an abstract circular range (the **Hash Ring**, e.g., $0$ to $2^{32}-1$ using SHA-1 or MD5):

```
                   Node A (hash: 100)
                     /           \
                    /             \
                   /               \
         Key 3 (850)               Key 1 (250)
                 /                   \
                /                     \
       Node C (700) ─────────────── Node B (500)
                 \                   /
                  \                 /
                   \── Key 2 (600)─/
```

### Assignment Rule:
To find which server owns a key, hash the key, locate it on the ring, and walk **clockwise** until encountering the first server node.
- Key 1 (250) $\to$ Walks clockwise to **Node B** (500).
- Key 2 (600) $\to$ Walks clockwise to **Node C** (700).
- Key 3 (850) $\to$ Wraps around clockwise to **Node A** (100).

### Adding or Removing Nodes:
- When a server is removed, only the keys that mapped to that specific server need to be reassigned to the next clockwise neighbor.
- On average, adding or removing a node requires remapping only $k/N$ keys (where $k$ is the total number of keys and $N$ is the number of nodes).

---

## 3. Hotspots and Virtual Nodes (vnodes)

### The Non-Uniform Distribution Problem:
Randomly placing a small number of physical nodes (e.g. 3 servers) on the ring can create highly unequal segment sizes, overloading one server while leaving another idle.

### The Virtual Nodes Solution:
Instead of mapping each physical server to a single point on the ring, map each server to **hundreds of virtual nodes** (e.g., `NodeA#1`, `NodeA#2`, `NodeA#100`):

```
Physical Node A ──► [NodeA#1 (12), NodeA#2 (850), NodeA#3 (4200)...]
Physical Node B ──► [NodeB#1 (94), NodeB#2 (1200), NodeB#3 (6100)...]
```

- Spreads keys evenly and uniformly across all physical machines.
- Allows weighting machines according to hardware capacity (e.g. a server with double the RAM gets double the virtual nodes).

---

## 4. Key Terminology & Interview Questions

### Q1: What is the primary advantage of Consistent Hashing over traditional modulo hashing?
When a cluster expands or shrinks, consistent hashing remaps only $k/N$ keys on average, whereas naive modulo hashing remaps almost $100\%$ of keys, triggering massive network overhead and cache stampedes.

### Q2: How does consistent hashing support data replication for High Availability?
In distributed databases like Amazon DynamoDB or Apache Cassandra:
- To achieve a replication factor of $R=3$, locate the primary coordinator node clockwise on the ring, and then replicate the key onto the **next 2 distinct physical nodes** encountered clockwise on the ring.

### Q3: What is the time complexity to find the owner node for a key in consistent hashing?
If there are $M$ virtual nodes on the ring, the sorted node hash values can be stored in an array or balanced binary search tree (Red-Black tree / TreeMap). Finding the clockwise successor node takes:
- Binary search: $O(\log M)$ time complexity.

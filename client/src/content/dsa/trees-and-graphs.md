---
title: Trees and Graph Algorithms
subject: DSA
category: Non-Linear Data Structures
difficulty: medium
importance: high
tags:
  - dsa
  - bst
  - graphs
  - bfs
  - dfs
---

# Trees and Graph Algorithms

Hierarchical and network data structures form the backbone of modern computer science, from relational database indexes (B+ Trees) and filesystem hierarchies to social networks and routing protocols.

---

## 1. Binary Search Trees (BST) & Self-Balancing Trees

A **Binary Search Tree** is a binary tree where for each node $X$:
- All nodes in $X$\'s left subtree have keys $< X.\text{key}$.
- All nodes in $X$\'s right subtree have keys $> X.\text{key}$.

```
        8
       / \
      3   10
     / \    \
    1   6    14
```

### The Degradation Trap
A standard BST can degenerate into a linked list of height $O(N)$ when values are inserted in sorted order (e.g. `1, 2, 3, 4, 5`).
- **AVL Tree:** Strictly balanced. The balance factor $(\text{height}(L) - \text{height}(R))$ for every node is within $\{-1, 0, 1\}$. Faster lookups.
- **Red-Black Tree:** Balanced via node colors (Red/Black) and rotation rules. Slightly less rigid than AVL, resulting in faster insertions and deletions (used in C++ `std::map` and Java `TreeMap`).

---

## 2. Graph Representations

A graph $G = (V, E)$ consists of vertices $V$ and edges $E$.

| Representation | Space | Check Edge (u, v) | Iterate Neighbors of u |
| :--- | :--- | :--- | :--- |
| **Adjacency Matrix** (`int[V][V]`) | $O(V^2)$ | $O(1)$ | $O(V)$ |
| **Adjacency List** (`Map<Integer, List<Integer>>`) | $O(V + E)$ | $O(\text{deg}(u))$ | $O(\text{deg}(u))$ |

In interviews, **Adjacency Lists** are almost universally preferred for sparse graphs where $E \ll V^2$.

---

## 3. Graph Traversal: BFS vs DFS

### Breadth-First Search (BFS)
Traverses layer-by-layer using a **Queue (FIFO)**. Guarantees finding the **shortest path** in unweighted graphs.

```java
public void bfs(int start, Map<Integer, List<Integer>> graph) {
    Queue<Integer> queue = new LinkedList<>();
    Set<Integer> visited = new HashSet<>();
    
    queue.offer(start);
    visited.add(start);
    
    while (!queue.isEmpty()) {
        int node = queue.poll();
        System.out.print(node + " ");
        
        for (int neighbor : graph.getOrDefault(node, Collections.emptyList())) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                queue.offer(neighbor);
            }
        }
    }
}
```

### Depth-First Search (DFS)
Explores as deep as possible before backtracking using a **Stack / Recursion**. Used for cycle detection, topological sorting, and connected components.

```java
// Topological Sort via DFS (for Directed Acyclic Graphs - DAGs)
public void dfsTopo(int node, Map<Integer, List<Integer>> graph, Set<Integer> visited, Stack<Integer> stack) {
    visited.add(node);
    for (int neighbor : graph.getOrDefault(node, Collections.emptyList())) {
        if (!visited.contains(neighbor)) {
            dfsTopo(neighbor, graph, visited, stack);
        }
    }
    stack.push(node); // Post-order push
}
```

---

## 4. One-Day Rapid Revision Notes

- In-order traversal of a BST visits nodes in strictly sorted order ($O(N)$).
- Self-balancing trees guarantee $O(\log N)$ search, insert, and delete.
- BFS uses a Queue and finds shortest unweighted paths.
- DFS uses a Stack/Recursion and detects cycles or builds topological order.
- Time complexity of both BFS and DFS is $O(V + E)$.

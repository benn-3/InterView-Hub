---
title: Dynamic Programming Patterns
subject: DSA
category: Algorithms
difficulty: hard
importance: high
tags:
  - dsa
  - dynamic-programming
  - memoization
  - tabulation
---

# Dynamic Programming Patterns

Dynamic Programming (DP) is an algorithmic optimization technique that solves complex problems by breaking them down into simpler subproblems and storing the results of subproblems to avoid redundant computation.

---

## 1. When Can You Apply Dynamic Programming?

A problem can be solved with DP if and only if it exhibits both:
1. **Optimal Substructure:** An optimal solution to the problem contains optimal solutions to its subproblems.
2. **Overlapping Subproblems:** The recursive solution visits the exact same subproblems repeatedly rather than creating new subproblems.

```
                    fib(5)
                   /      \
               fib(4)      fib(3)  <── Recomputed!
              /     \      /     \
          fib(3)   fib(2) fib(2) fib(1)
```

Without DP, naive Fibonacci takes $O(2^N)$ exponential time. With DP, it drops to $O(N)$ linear time.

---

## 2. Top-Down (Memoization) vs Bottom-Up (Tabulation)

| Feature | Memoization (Top-Down) | Tabulation (Bottom-Up) |
| :--- | :--- | :--- |
| **Approach** | Starts from original problem, recurses down | Starts from base cases, iterates up |
| **Structure** | Recursion + Lookup Cache | Iterative Table (1D or 2D array) |
| **Overhead** | Call stack frame overhead | Zero recursion overhead |
| **Subproblem Scope**| Computes only visited subproblems | Computes all subproblems in table |

---

## 3. Classic DP Pattern: 0/1 Knapsack Problem

Given $N$ items with weights and values, find the maximum value that fits in a knapsack of capacity $W$.

### State Transition Relation
Let $\text{dp}[i][w]$ be the maximum value considering the first $i$ items with weight limit $w$:

$$\text{dp}[i][w] = \max(\text{dp}[i-1][w], \text{val}[i-1] + \text{dp}[i-1][w - \text{wt}[i-1]])$$

```java
public int knapsack(int W, int[] wt, int[] val, int n) {
    int[][] dp = new int[n + 1][W + 1];

    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (wt[i - 1] <= w) {
                // Choice: take or leave item i
                dp[i][w] = Math.max(dp[i - 1][w], val[i - 1] + dp[i - 1][w - wt[i - 1]]);
            } else {
                dp[i][w] = dp[i - 1][w]; // Cannot take item i
            }
        }
    }
    return dp[n][W];
}
```

---

## 4. One-Day Rapid Revision Notes

- Identify DP by checking for overlapping subproblems and optimization goals (min, max, count ways).
- Top-down uses recursion and a memo map; bottom-up fills an iterative matrix.
- Space optimization: Many 2D DP problems only reference the previous row ($i-1$) and can be compressed to $O(W)$ space using a 1D rolling array.

---
title: Arrays and Memory Architecture
subject: DSA
category: Core Data Structures
difficulty: easy
importance: high
tags:
  - dsa
  - arrays
  - memory
  - two-pointer
  - sliding-window
---

# Arrays and Physical Memory Architecture

An **Array** is a linear data structure that stores a collection of elements of the same data type in contiguous memory locations. Understanding how arrays interact with the CPU memory hierarchy (L1/L2/L3 caches and RAM) is fundamental to writing high-performance software and succeeding in technical interviews.

---

## 1. Physical Memory Layout & O(1) Access Arithmetic

In memory, an array occupies a continuous segment of bytes. Because elements are placed back-to-back, computing the memory address of the $i$-th element does not require traversing intermediate nodes:

$$\text{Address}(A[i]) = \text{Base Address} + (i \times \text{Size of Element})$$

```
Base: 0x1000   (4-byte integers)
Index:       0         1         2         3
Address: 0x1000    0x1004    0x1008    0x100C
Values:  [  42  ]  [  19  ]  [  88  ]  [   7  ]
```

### Why Arrays Outperform Linked Lists (Cache Locality)
CPUs do not read memory byte-by-byte from RAM; hardware prefetchers load fixed **Cache Lines** (typically 64 bytes) into ultra-fast L1/L2 caches.
- **Arrays (Spatial Locality):** Reading `A[0]` brings `A[1]`, `A[2]`, ... `A[15]` into L1 cache simultaneously. Sequential traversal triggers near-zero cache misses.
- **Linked Lists (Pointer Chasing):** Each node is dynamically allocated at arbitrary heap locations. Traversing a list causes repeated L1/L2 cache misses, stalling the CPU pipeline for hundreds of clock cycles per dereference.

---

## 2. Dynamic Arrays (ArrayList / Vector) Resizing Mechanics

Unlike static arrays (C/C++ fixed arrays), dynamic arrays (Java `ArrayList`, C++ `std::vector`, Python `list`) grow dynamically when capacity is exceeded.

```java
// Java ArrayList Capacity Growth Simulation
int newCapacity = oldCapacity + (oldCapacity >> 1); // 1.5x growth in Java
```

### Amortized O(1) Time Analysis
When capacity fills:
1. Allocate a new contiguous memory block of size $2N$ (or $1.5N$).
2. Copy all $N$ existing elements to the new block ($O(N)$ work).
3. Deallocate the old block and update base pointer.

Although an individual resizing insertion costs $O(N)$, doubling capacity guarantees that $N$ resizing steps occur only after $N$ cheap $O(1)$ insertions. Over $K$ insertions, total copying is at most:

$$1 + 2 + 4 + 8 + \dots + K \approx 2K \implies \frac{2K}{K} = O(1) \text{ Amortized}$$

---

## 3. High-Frequency Interview Algorithmic Patterns

### Pattern A: Two-Pointer Technique (Sorted Arrays)
Used to find pairs, partition elements, or reverse collections in-place in $O(N)$ time and $O(1)$ auxiliary space.

```java
// Problem: Find two numbers in a sorted array that sum to target
public int[] twoSumSorted(int[] numbers, int target) {
    int left = 0;
    int right = numbers.length - 1;
    
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) {
            return new int[]{left + 1, right + 1};
        } else if (sum < target) {
            left++; // Need larger sum
        } else {
            right--; // Need smaller sum
        }
    }
    return new int[]{-1, -1};
}
```

### Pattern B: Sliding Window (Dynamic Contiguous Subarrays)
Maintains a window $[L, R]$ over an array to compute running state (max sum, longest substring) without re-computing from scratch.

```java
// Problem: Maximum sum subarray of fixed size K
public int maxSubArraySum(int[] nums, int k) {
    int maxSum = 0, windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += nums[i];
    maxSum = windowSum;

    for (int i = k; i < nums.length; i++) {
        windowSum += nums[i] - nums[i - k]; // Slide window: add new, subtract old
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}
```

---

## 4. Key Terminology Cheat Sheet

| Term | Definition |
| :--- | :--- |
| **Base Address** | Physical RAM location where index 0 begins. |
| **Spatial Locality** | Accessing one memory location makes adjacent locations fast to access. |
| **Amortized Time** | Average time per operation over a long sequence of operations. |
| **In-Place** | Algorithm that uses $O(1)$ extra space beyond input storage. |

---

## 5. Common Interview Mistakes

1. **Forgetting Off-By-One Boundary Conditions:** Iterating `i <= nums.length` instead of `i < nums.length`, causing an `ArrayIndexOutOfBoundsException`.
2. **Confusing Subarray vs Subsequence:** Subarrays must be contiguous; subsequences maintain relative order but can skip intermediate elements.
3. **Assuming Default Capacity Shrinking:** Dynamic arrays automatically grow on write, but typically do NOT automatically shrink when elements are removed unless `trimToSize()` is explicitly called.

---

## 6. One-Day Rapid Revision Notes

- Array access is $O(1)$ strictly because of contiguous address arithmetic.
- Dynamic array insertion is $O(1)$ amortized; worst-case insertion during resizing is $O(N)$.
- Prefer Two-Pointers when input array is sorted.
- Prefer Sliding Window for subarray substring calculations.

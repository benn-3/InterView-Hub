---
title: Sorting and Searching Algorithms
subject: DSA
category: Algorithms
difficulty: medium
importance: high
tags:
  - dsa
  - sorting
  - binary-search
  - quicksort
  - mergesort
---

# Sorting and Searching Algorithms

Sorting and searching are the cornerstone algorithmic problems in software engineering. Mastering the trade-offs between stability, in-place behavior, and algorithmic bounds is critical for technical interviews.

---

## 1. Sorting Algorithms Comparison

| Algorithm | Best Time | Average Time | Worst Time | Space | Stable? | In-Place? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **QuickSort** | $O(N \log N)$ | $O(N \log N)$ | $O(N^2)$ | $O(\log N)$ | No | Yes |
| **MergeSort** | $O(N \log N)$ | $O(N \log N)$ | $O(N \log N)$ | $O(N)$ | Yes | No |
| **HeapSort** | $O(N \log N)$ | $O(N \log N)$ | $O(N \log N)$ | $O(1)$ | No | Yes |
| **Insertion Sort**| $O(N)$ | $O(N^2)$ | $O(N^2)$ | $O(1)$ | Yes | Yes |

### Stability in Sorting
A sorting algorithm is **Stable** if it preserves the relative order of elements with equal keys.
- Example: Sorting `[(Alice, 90), (Bob, 90)]` by score must keep Alice before Bob if Alice appeared first in the original array.
- **MergeSort** is stable; **QuickSort** and **HeapSort** are unstable.

---

## 2. QuickSort Deep Dive

QuickSort uses a Divide-and-Conquer strategy:
1. Select a pivot element.
2. Partition the array so all elements $\le \text{pivot}$ are on the left and all elements $> \text{pivot}$ are on the right.
3. Recursively sort the sub-arrays.

```java
// Lomuto Partitioning Scheme
public int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
        }
    }
    int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
    return i + 1;
}
```

---

## 3. Binary Search and Its Invariant

Binary Search finds the index of a target value within a sorted array in $O(\log N)$ time.

### The Integer Overflow Trap
```java
// WRONG: can cause integer overflow when left + right > Integer.MAX_VALUE
int mid = (left + right) / 2;

// CORRECT: safe against 32-bit integer overflow
int mid = left + (right - left) / 2;
```

```java
public int binarySearch(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
```

---

## 4. Key Terminology Cheat Sheet

| Term | Definition |
| :--- | :--- |
| **Stability** | Retaining original relative order of equivalent elements. |
| **In-Place** | Requiring $O(1)$ auxiliary space beyond input arrays. |
| **Divide and Conquer** | Breaking problems into independent subproblems, solving recursively, and combining results. |
| **Dual-Pivot QuickSort**| Modern variant used in Java `Arrays.sort()` for primitives. |

---
title: Arrays & Memory in Java
subject: Java
category: Core Java
difficulty: easy
importance: high
tags:
  - java
  - arrays
  - memory
  - dsa
---

# Java Arrays & Internal Memory Representation

An array in Java is a dynamically created object that contains elements of a single type (homogeneous data). Arrays have a fixed size defined at the time of allocation.

---

## 1. Array Declaration & Initialization

In Java, arrays are allocated on the **Heap**, regardless of whether they hold primitive types or object references.

```java
// Declaration (stack reference created)
int[] numbers;

// Allocation on Heap (default values initialized to 0)
numbers = new int[5];

// Combined declaration & literal initialization
String[] frameworks = {"React", "Spring Boot", "Express", "Django"};
```

---

## 2. Memory Allocation in Heap vs Stack

- The array reference variable (`numbers`) resides in the **Stack frame** of the invoking method.
- The actual continuous memory block of 5 integers is allocated on the **Heap**.
- When arrays store objects (e.g., `String[]` or `Employee[]`), the array holds references (pointers) to individual objects residing elsewhere in the Heap.

```
Stack                      Heap
+---------+         +-------------------------------+
| numbers | ------> | [0] | [1] | [2] | [3] | [4]   |
+---------+         |  10 |  20 |  30 |  40 |  50   |
                    +-------------------------------+
```

---

## 3. Important Characteristics

1. **Fixed Length:** Once initialized, the length attribute `numbers.length` is immutable.
2. **Bounds Checking:** Index out of bounds throws `ArrayIndexOutOfBoundsException` at runtime.
3. **Contiguous Memory:** Elements occupy contiguous memory locations, making index lookup $O(1)$.

---

## 4. Common Operations & Complexity

| Operation | Time Complexity | Space Complexity |
| :--- | :--- | :--- |
| **Access by Index** | $O(1)$ | $O(1)$ |
| **Search (Unsorted)** | $O(n)$ | $O(1)$ |
| **Search (Sorted - Binary)**| $O(\log n)$ | $O(1)$ |
| **Insertion at End** | $O(1)$ (if capacity exists)| $O(1)$ |
| **Insertion at Middle**| $O(n)$ | $O(1)$ |

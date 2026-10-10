---
title: Concurrency, Synchronization, and Deadlocks
subject: OS
category: Core Operating Systems
difficulty: hard
importance: high
tags:
  - os
  - concurrency
  - mutex
  - semaphore
  - deadlocks
---

# Concurrency, Synchronization, and Deadlocks

When multiple concurrent processes or threads share resources (variables, memory, disk files), the OS must guarantee thread safety without deadlocking.

---

## 1. Race Conditions & Critical Sections

A **Race Condition** occurs when multiple threads access and mutate shared data concurrently, and the final outcome depends on the non-deterministic interleaving of CPU instructions.

A **Critical Section** is the block of code where shared resources are accessed. A valid synchronization solution must satisfy three requirements:
1. **Mutual Exclusion:** At most one process in critical section at any time.
2. **Progress:** Processes not in critical section cannot prevent others from entering.
3. **Bounded Waiting:** A process requesting entry must not wait indefinitely.

---

## 2. Mutex vs Semaphore

| Feature | Mutex (Mutual Exclusion) | Semaphore (Counting) |
| :--- | :--- | :--- |
| **Concept** | Locking mechanism with **Ownership** | Signaling mechanism with **Integer Counter** |
| **Who can unlock?** | ONLY the thread that acquired the lock | **ANY thread** can call `post()` / `signal()` |
| **Typical Use** | Protecting a shared data structure | Producer-Consumer buffer synchronization |

---

## 3. The 4 Coffman Conditions for Deadlock

A Deadlock can occur if and only if all 4 conditions hold simultaneously:
1. **Mutual Exclusion:** Resources cannot be shared concurrently.
2. **Hold and Wait:** A process holding a resource is waiting to acquire additional resources.
3. **No Preemption:** Resources cannot be forcibly taken away.
4. **Circular Wait:** A closed chain of processes exists where each waits for a resource held by the next.

### Prevention:
Break Circular Wait by enforcing a **Strict Global Resource Hierarchy**: all threads must acquire locks in strictly ascending numerical resource ID order.

---
title: CPU Scheduling Algorithms
subject: OS
category: Core Operating Systems
difficulty: medium
importance: high
tags:
  - os
  - scheduling
  - round-robin
  - sjf
  - mlfq
---

# CPU Scheduling Algorithms

CPU Scheduling is the process by which the operating system decides which runnable process in the Ready Queue is allocated CPU core time.

---

## 1. Scheduling Metrics

- **Turnaround Time:** Total time from submission to process completion ($\text{Finish} - \text{Arrival}$).
- **Waiting Time:** Total time a process spends waiting in the ready queue.
- **Response Time:** Time from submission until first CPU response is produced (crucial for interactive systems).
- **Throughput:** Number of completed processes per unit time.

---

## 2. Core Scheduling Algorithms

### 1. Shortest Job First (SJF) / Shortest Remaining Time First (SRTF)
Schedules the job with the shortest CPU burst length.
- **Mathematical Guarantee:** Produces the lowest possible average waiting time.
- **Disadvantage:** Impossible for the OS to know future burst lengths; long jobs suffer from **Starvation**.

### 2. Round Robin (RR)
Preemptive algorithm where each process receives a fixed slice of CPU time called a **Time Quantum** (typically 10-100ms).
- If Quantum is too large $\to$ degenerates into FIFO.
- If Quantum is too small $\to$ excessive context switch overhead degrades CPU throughput.

### 3. Multi-Level Feedback Queue (MLFQ)
The gold standard for modern general-purpose operating systems (Linux, macOS, Windows):
- Multiple priority queues, each with different time quantums.
- New processes start in the highest priority queue (assuming short burst).
- If a process exhausts its quantum (CPU-bound), it is demoted to a lower queue with a longer quantum.
- If a process yields CPU before quantum expires (I/O-bound), it stays at high priority.
- Periodic **Priority Boost** resets all jobs to top queue to prevent starvation.

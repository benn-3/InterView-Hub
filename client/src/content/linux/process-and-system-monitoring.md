---
title: Process Management, Signals, and System Monitoring
subject: Linux
category: Systems & Administration
difficulty: medium
importance: high
tags:
  - linux
  - processes
  - signals
  - top
  - load-average
  - oom-killer
---

# Process Management, Signals, and System Monitoring

Diagnosing system bottlenecks and managing background processes is a day-to-day requirement in production Linux systems.

---

## 1. Process States and Commands

- `ps aux`: Displays complete snapshot of all running processes.
- `ps -ef --forest`: Renders hierarchical process tree showing parent-child relationships.
- `top` / `htop`: Real-time interactive CPU, memory, and process monitor.

### Process States:
- **R (Running / Runnable):** Executing on CPU or waiting in CPU run queue.
- **S (Interruptible Sleep):** Waiting for an event or signal (e.g. user input).
- **D (Uninterruptible Sleep):** Waiting for hardware I/O (disk read/write). Cannot be killed by `kill -9`!
- **Z (Zombie):** Process terminated, but parent has not yet called `wait()` to read exit status.

---

## 2. Essential Linux Signals

```bash
kill -<SIGNAL> <PID>
```

| Signal | Number | Can be Caught? | Purpose |
| :--- | :--- | :--- | :--- |
| **SIGHUP** | 1 | Yes | Hangup; reload daemon configuration without restart (`kill -1 <pid>`). |
| **SIGINT** | 2 | Yes | Interrupt from keyboard (`Ctrl + C`). |
| **SIGKILL** | 9 | **NO (Kernel enforced)** | Immediate termination; process destroyed instantly without cleanup. |
| **SIGTERM** | 15 | Yes | Default graceful termination request (`kill <pid>`). |

---

## 3. Interpreting Load Average & The OOM Killer

- **Load Average (1, 5, 15 min):** Average number of processes in states `R` (runnable) + `D` (uninterruptible I/O wait). Normalize by dividing by `nproc` (CPU cores).
- **OOM (Out-Of-Memory) Killer:** When physical RAM and swap are exhausted, the kernel calculates an `oom_score` (0-1000) for every process based on memory footprint and kills the highest scoring process with SIGKILL. Inspect via `dmesg -T | grep -i oom`.

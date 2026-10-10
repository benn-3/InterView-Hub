---
title: Process Management and Threading
subject: OS
category: Core Operating Systems
difficulty: medium
importance: high
tags:
  - os
  - processes
  - threads
  - context-switch
  - system-calls
---

# Process Management and Threading

The Operating System manages hardware CPU and memory resources by scheduling independent execution contexts called **Processes** and **Threads**.

---

## 1. Process vs Thread Architecture

```
PROCESS ADDRESS SPACE (Virtual Memory)
┌──────────────────────────────────────┐
│ Text Segment (Compiled Code)         │
├──────────────────────────────────────┤
│ Data / BSS (Global & Static Vars)    │
├──────────────────────────────────────┤
│ Heap (Dynamic malloc/new allocation) │
│   ↓ grows downward                   │
├──────────────────────────────────────┤
│   ↑ grows upward                     │
│ Thread 1 Stack │ Thread 2 Stack      │
└──────────────────────────────────────┘
```

- **Process:** An independent address space. Communicating across processes requires Inter-Process Communication (IPC: pipes, sockets, shared memory).
- **Thread:** Shares the parent process heap, global data, and open file descriptors, but maintains its own private Stack, Program Counter, and CPU registers.

---

## 2. Context Switching Overhead

A **Context Switch** is the procedure of saving the state of the currently executing process or thread so that execution can resume from the same point later, and restoring the state of a new process.

### Why Process Switches are Slower than Thread Switches:
1. **CPU Registers & Stack Pointer:** Saved and restored in both.
2. **Memory Management Unit (MMU) Page Table Reload:** Process switches require swapping the page table base pointer (CR3 register on x86).
3. **Translation Lookaside Buffer (TLB) Flush:** Swapping address spaces invalidates the CPU\'s hardware virtual-to-physical address cache (TLB), causing hundreds of memory stalls until the cache warms up again.

---

## 3. System Calls and CPU Privilege Modes

Hardware CPUs enforce security via privilege rings (Ring 0 = Kernel Mode, Ring 3 = User Mode).
When user code calls `read()`, `write()`, or `fork()`:
1. The application invokes a software trap (`syscall` instruction).
2. The CPU mode bit changes from 3 to 0.
3. Execution switches to the kernel stack and dispatches through the kernel system call table.
4. The kernel validates security bounds, executes the hardware routine, and returns to user mode via `sysret`.

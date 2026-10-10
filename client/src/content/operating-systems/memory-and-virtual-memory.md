---
title: Memory Management and Virtual Memory
subject: OS
category: Core Operating Systems
difficulty: hard
importance: high
tags:
  - os
  - virtual-memory
  - paging
  - page-fault
  - tlb
---

# Memory Management and Virtual Memory

Virtual Memory decouples a process\'s logical address space from physical RAM, providing process memory isolation and allowing execution of programs larger than physical memory.

---

## 1. Paging Architecture

Memory is partitioned into fixed-size blocks:
- **Virtual Pages:** Typically 4KB logical blocks in the virtual address space.
- **Physical Page Frames:** Matching 4KB blocks in physical RAM.

```
Virtual Address (32-bit):
┌─────────────────────────┬───────────────────────┐
│ Page Number (20 bits)   │ Page Offset (12 bits) │
└─────────────────────────┴───────────────────────┘
            │
      [Page Table] ──> Physical Frame Base + Offset ──> Physical RAM
```

---

## 2. Page Fault Handling Sequence

When a process references an address not currently in physical RAM:
1. MMU detects the **Valid Bit = 0** in the page table entry.
2. MMU raises a hardware interrupt (**Page Fault Trap**) to the OS kernel.
3. The kernel pauses the process and verifies if the virtual address is valid.
4. The kernel searches for an empty physical frame in RAM.
   - If RAM is full, it invokes a Page Replacement Algorithm (LRU, Clock) to evict a victim page. If the victim page is "dirty", it is written to swap space.
5. The kernel reads the requested 4KB page from disk into the allocated frame.
6. The kernel updates the Page Table entry with the physical frame address and sets Valid Bit = 1.
7. The kernel restarts the interrupted CPU instruction.

---

## 3. Translation Lookaside Buffer (TLB) and Thrashing

- **TLB (Translation Lookaside Buffer):** A high-speed hardware associative cache on the CPU chip that stores recent Virtual-to-Physical page translations. TLB hit = 1 CPU cycle; TLB miss = multi-cycle memory walk.
- **Thrashing:** When total working set size of all active processes exceeds physical RAM. The CPU spends nearly 100% of its time servicing page faults and disk swapping rather than executing instructions.

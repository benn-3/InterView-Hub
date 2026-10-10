---
title: File Systems and I/O Architecture
subject: OS
category: Core Operating Systems
difficulty: medium
importance: high
tags:
  - os
  - filesystems
  - inodes
  - file-descriptors
  - io
---

# File Systems and I/O Architecture

File systems provide persistent storage abstraction over physical non-volatile block devices (SSDs and hard drives).

---

## 1. The Inode Structure (Unix/Linux)

An **Inode** (index node) represents a physical file or directory on disk.
- It stores: File size, permissions (`rwxrwxrwx`), owner UID, group GID, timestamps (atime, mtime, ctime), link count, and block pointers.
- It does **NOT** store the filename or file contents.
- Directories are special files containing a table mapping human-readable filenames to Inode numbers.

---

## 2. Hard Links vs Symbolic (Soft) Links

```
           Directory Entry "file.txt" ──┐
                                        ├──> [ Inode #1052 ] ──> Data Blocks on Disk
           Directory Entry "link.txt" ──┘
```

- **Hard Link:** An additional directory entry pointing directly to the existing Inode. Has identical inode number and permissions. The file data is preserved until all hard links are deleted (`link_count == 0`). Cannot cross filesystems.
- **Soft Link (Symlink):** A distinct file with its own Inode containing a text path string to the target file. Breaks ("dangling link") if target is deleted. Can span filesystems.

---

## 3. Standard File Descriptors

Every Unix process is initialized with 3 default open file descriptors:
- `0`: Standard Input (`stdin`)
- `1`: Standard Output (`stdout`)
- `2`: Standard Error (`stderr`)

When an application calls `open("data.txt")`, the kernel assigns the lowest available integer file descriptor from the process file descriptor table.

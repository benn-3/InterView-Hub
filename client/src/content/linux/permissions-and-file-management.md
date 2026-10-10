---
title: Linux Permissions, Ownership, and File Hierarchy
subject: Linux
category: Systems & Administration
difficulty: easy
importance: high
tags:
  - linux
  - permissions
  - chmod
  - chown
  - suid
---

# Linux Permissions, Ownership, and File Hierarchy

Linux enforces multi-user access security via fine-grained permission bits and ownership metadata associated with every filesystem object.

---

## 1. Permission Matrix & Octal Notation

Every file displays a 10-character permission string: `-rwxr-xr--`
- Char 1: File type (`-` regular file, `d` directory, `l` symlink).
- Chars 2-4: **Owner (User)** permissions (`rwx`).
- Chars 5-7: **Group** permissions (`r-x`).
- Chars 8-10: **Others (World)** permissions (`r--`).

### Octal Calculation:
- **Read ($r$) = 4**
- **Write ($w$) = 2**
- **Execute ($x$) = 1**

```bash
chmod 755 script.sh   # Owner: rwx (7), Group: r-x (5), Others: r-x (5)
chmod 600 id_rsa      # Owner: rw- (6), Group: --- (0), Others: --- (0) (SSH private key)
chown user:group file # Modify owner and group
```

### Directories Execute Bit
On a directory, the **Execute ($x$)** bit controls traversal permission: you cannot `cd` into a directory or access files inside it without the execute bit!

---

## 2. Special Permissions: SUID, SGID, and Sticky Bit

| Bit | Octal | Applies To | Behavior | Example |
| :--- | :--- | :--- | :--- | :--- |
| **SUID** | 4000 | Binary Executables | Runs with privileges of file **Owner** (not caller). | `/usr/bin/passwd` |
| **SGID** | 2000 | Directories | New files inherit the directory\'s **Group** automatically. | Shared team folders |
| **Sticky Bit** | 1000 | Directories | Only file **owner or root** can delete or rename files. | `/tmp` |

```bash
chmod +t /shared_tmp          # Set sticky bit
chmod u+s /usr/local/bin/tool # Set SUID
```

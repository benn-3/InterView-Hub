---
title: Linux Administration & Commands
subject: Linux
category: Operating Systems
difficulty: easy
importance: high
tags:
  - linux
  - terminal
  - bash
  - cli
  - sysadmin
---

# Linux Administration & CLI Cheatsheet

Understanding Linux commands is essential for developer and DevOps interview rounds.

---

## 1. Process & Memory Management

- `top` / `htop`: Interactive real-time process monitor.
- `ps aux`: Detailed snapshot of all running processes.
- `kill -9 <PID>`: Force kill a process by ID.
- `free -h`: Show available and used system memory (RAM & Swap) in human-readable format.
- `df -h`: Show disk filesystem usage and available space.

---

## 2. File Searching & Text Processing

- `grep -rnw "text" .`: Recursively search for matching string in current directory.
- `find /var/log -name "*.log" -mtime -7`: Find files matching pattern modified in the last 7 days.
- `awk '{print $1, $3}' file.txt`: Extract specific columns from delimiter-separated lines.
- `sed -i 's/old/new/g' config.env`: In-place stream find and replace.

---

## 3. Networking & Diagnostics

- `netstat -tulnp` or `ss -tulnp`: List open listening TCP/UDP ports and owning processes.
- `curl -I https://example.com`: Inspect HTTP response headers.
- `traceroute <host>`: Trace network packet route and latency hops.

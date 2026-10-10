---
title: Docker Architecture and Container Internals
subject: Docker
category: DevOps & Cloud
difficulty: medium
importance: high
tags:
  - docker
  - containers
  - namespaces
  - cgroups
  - containerd
  - runc
---

# Docker Architecture and Linux Container Internals

Containers are not lightweight virtual machines; they are isolated Linux user processes constrained by kernel primitives: **Namespaces**, **Control Groups (cgroups)**, and **Union File Systems**.

---

## 1. Container vs Virtual Machine Architecture

```
VIRTUAL MACHINE (Hypervisor)           CONTAINER (OS Level Isolation)
┌─────────────────────────────────┐   ┌─────────────────────────────────┐
│ App 1 (Bins/Libs) │ App 2 (...) │   │ App 1 (Bins/Libs) │ App 2 (...) │
├─────────────────────────────────┤   ├─────────────────────────────────┤
│ Guest OS 1        │ Guest OS 2  │   │ Container Runtime (runc/Docker) │
├─────────────────────────────────┤   ├─────────────────────────────────┤
│ Hypervisor (Type 1 / Type 2)    │   │ Host Linux Kernel               │
├─────────────────────────────────┤   ├─────────────────────────────────┤
│ Physical Hardware               │   │ Physical Hardware               │
└─────────────────────────────────┘   └─────────────────────────────────┘
```

---

## 2. Linux Kernel Primitives Behind Containers

1. **Namespaces (Isolation):** Isolate what a process can *see*:
   - `pid`: Process tree isolation (Container process thinks it is PID 1).
   - `net`: Virtual network devices, loopback, routing tables, and port bindings.
   - `mnt`: Independent mount points and filesystem root.
   - `ipc`: Inter-process communication and shared memory isolation.
   - `uts`: Independent hostname and domain name.
   - `user`: Maps non-root user inside container to unprivileged UID on host.

2. **Control Groups (cgroups v1/v2 - Resource Limiting):** Constrain what a process can *use*:
   - Limits CPU shares, cores, and throttling quotas.
   - Caps RAM usage and triggers OOM (Out Of Memory) killer on spikes.
   - Enforces disk I/O and block device read/write limits.

3. **Union Filesystems (OverlayFS / Storage Drivers):**
   - Composes read-only image layers into a single unified filesystem hierarchy with a thin read-write top layer (**Copy-on-Write**).

---

## 3. The Docker Engine Daemon & OCI Ecosystem

```
Docker CLI (`docker run`)
     │ (gRPC / UNIX Socket)
     ▼
Docker Daemon (`dockerd`) ──► Image building & high-level API
     │
     ▼
containerd ──► Manages image pull, storage, and container lifecycle
     │
     ▼
runc ──► OCI-compliant runtime interacting directly with kernel (fork/clone)
```

---

## 4. Key Terminology & Interview Questions

### Q1: What is the difference between a Container and an Image?
- **Image:** An immutable, read-only package containing application binaries, libraries, configuration, and dependencies composed of stacked filesystem layers.
- **Container:** A running, stateful instantiation of an image consisting of the read-only image layers plus a writable **Container Layer** managed in an isolated Linux process context.

### Q2: What happens when a container exceeds its memory limit?
When a container attempts to allocate memory beyond its cgroup threshold (`--memory=512m`), the Linux kernel **OOM (Out-of-Memory) Killer** terminates the process with exit code **137** (`SIGKILL` = 128 + 9).

### Q3: What is Copy-on-Write (CoW)?
In Docker's UnionFS (Overlay2), files residing in lower read-only image layers are shared across all running containers. When a container modifies an existing file, the file is copied up to the container's top writable layer before changes are written, leaving the underlying image layer untouched.

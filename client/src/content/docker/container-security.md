---
title: Container Security, Hardening, and Best Practices
subject: Docker
category: DevOps & Cloud
difficulty: hard
importance: high
tags:
  - docker
  - security
  - hardening
  - non-root
  - seccomp
  - capabilities
---

# Container Security, Hardening, and Best Practices

Containers share the host operating system kernel. A security flaw or misconfiguration can allow attackers to escape the container and compromise the entire host.

---

## 1. Top Container Security Vulnerabilities

```
HOST COMPROMISE VECTORS
├── 1. Running as root (UID 0) inside container
│      If an attacker exploits a RCE, they have root access to any mounted volume.
├── 2. Privileged flag (`--privileged`)
│      Grants container access to all host devices and disables kernel capabilities security.
├── 3. Docker daemon socket exposure (`/var/run/docker.sock`)
│      Mounted inside container allows container to control the host Docker daemon.
└── 4. Unscanned, vulnerable base images
       High CVE vulnerabilities in outdated system libraries (glibc, OpenSSL).
```

---

## 2. Hardening Checklist

### 1. Drop Unnecessary Linux Capabilities
Linux breaks root privileges into distinct capabilities. By default, Docker grants ~14 capabilities. A hardened container drops all capabilities and adds back only what is strictly necessary:
```bash
docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE nginx:alpine
```

### 2. Make the Root Filesystem Read-Only
Prevent attackers from downloading scripts or modifying binaries:
```bash
docker run --read-only --tmpfs /tmp --tmpfs /var/run my-app:v1
```

### 3. Implement Non-Root Users
In Dockerfile:
```dockerfile
# Create unprivileged system user
RUN addgroup --system --gid 1001 appgroup && \
    adduser --system --uid 1001 --ingroup appgroup appuser

USER 1001:1001
```

---

## 3. Vulnerability Scanning with Trivy

In modern CI/CD, every image is automatically scanned for Common Vulnerabilities and Exposures (CVEs):
```bash
# Scan image for High and Critical vulnerabilities
trivy image --severity HIGH,CRITICAL --exit-code 1 my-company/api:latest
```

---

## 4. Key Terminology & Interview Questions

### Q1: Why is mounting `/var/run/docker.sock` considered a critical security vulnerability?
Access to `/var/run/docker.sock` allows any process inside the container to communicate with the host's Docker daemon. An attacker can run `docker run -v /:/host_root alpine chroot /host_root` to gain immediate, unrestricted root access to the entire host filesystem.

### Q2: What is the risk of using `--privileged`?
`--privileged` disables all AppArmor/SELinux profiles, seccomp filters, and grants access to all devices in `/dev`. It effectively destroys container boundaries, allowing near-trivial container escapes to the host kernel.

### Q3: What is the difference between Seccomp and AppArmor?
- **Seccomp (Secure Computing Mode):** Filters and restricts which **system calls** (e.g., `ptrace`, `reboot`, `sys_admin`) a process is permitted to make to the Linux kernel.
- **AppArmor / SELinux:** Mandatory Access Control (MAC) systems that restrict what specific **files, capabilities, and network resources** a program can access based on security profiles.

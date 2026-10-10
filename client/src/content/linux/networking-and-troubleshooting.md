---
title: Linux Networking and Production Troubleshooting
subject: Linux
category: Systems & Tools
difficulty: hard
importance: high
tags:
  - linux
  - networking
  - troubleshooting
  - netstat
  - curl
  - ss
  - tcpdump
---

# Linux Networking & Production Troubleshooting

System debugging requires understanding how the Linux kernel handles socket connections, network interfaces, DNS resolution, and TCP connection state transitions.

---

## 1. Network Diagnostics Toolkit

| Tool | Modern Replacement | Primary Use Case |
|---|---|---|
| `ifconfig` | `ip addr` / `ip link` | Inspecting IP addresses and interface states |
| `route` | `ip route` | Viewing default gateways and routing tables |
| `netstat` | `ss -tulpn` | Checking listening ports and socket connections |
| `nslookup` | `dig` or `drill` | DNS lookup and record debugging |
| `traceroute` | `tracepath` / `mtr` | Diagnosing packet loss and hop latency |

---

## 2. Essential Troubleshooting Commands

### Inspecting Listening Ports & Sockets
```bash
# -t (TCP), -u (UDP), -l (Listening), -p (Process/PID), -n (Numeric ports/IPs)
ss -tulpn | grep 8080

# Check socket state summary (TIME_WAIT, ESTABLISHED)
ss -s
```

### Checking Connectivity & Latency
```bash
# Test TCP handshake and latency against a remote host/port
nc -zv api.internal.company.com 443

# Comprehensive curl request breakdown with timing
curl -w "\nDNS: %{time_namelookup}s\nConnect: %{time_connect}s\nTLS: %{time_appconnect}s\nTTFB: %{time_starttransfer}s\nTotal: %{time_total}s\n" \
     -o /dev/null -s https://api.internal.company.com/health
```

### Packet Capture with tcpdump
```bash
# Capture 100 packets on eth0 for port 443 and save to pcap
sudo tcpdump -i eth0 -n -s 0 -c 100 port 443 -w /tmp/capture.pcap

# Inspect live HTTP/TCP traffic readable in ASCII
sudo tcpdump -i any -A -s 0 'tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12:2]&0xf0)>>2)) != 0)'
```

---

## 3. Systematic Troubleshooting Methodology

When an application instance stops responding in production, follow the 4-layer triage:

```
Step 1: Is the process alive?
        ps aux | grep app_name
        systemctl status app.service

Step 2: Are host resources exhausted?
        CPU/Memory: top, htop, vmstat 1
        Disk space: df -h, df -i (inodes)
        Open file descriptors: lsof -p <PID> | wc -l

Step 3: Is it bound and listening on the network?
        ss -tulpn | grep <PORT>
        curl -I http://127.0.0.1:<PORT>/health

Step 4: Can external traffic reach it?
        iptables -L -n -v
        ufw status
        Security Group / Firewall rules
```

---

## 4. Key Terminology & Interview Questions

### Q1: What causes a `Connection Refused` error vs a `Connection Timed Out` error?
- **Connection Refused (`ECONNREFUSED`):** The remote host was reached, but no process was listening on the requested port, or a firewall explicitly returned a TCP `RST` (Reset) packet.
- **Connection Timed Out (`ETIMEDOUT`):** Packets were dropped silently along the way without an acknowledgment or reset packet, often due to an aggressive network firewall, security group misconfiguration, or blackholed route.

### Q2: What is the `TIME_WAIT` socket state, and why is it necessary?
When a TCP endpoint initiates an active close, it enters the `TIME_WAIT` state for `2 * MSL` (Maximum Segment Lifetime, usually 60 seconds). This ensures:
1. Delayed in-flight packets from the old connection do not corrupt a newly opened connection reusing the same 4-tuple `(src IP, src port, dst IP, dst port)`.
2. The final `ACK` is reliably retransmitted if the remote end retransmits its `FIN`.

### Q3: How do you fix "Too many open files" errors?
In Linux, sockets are file descriptors. Check the per-process and system limits:
- Per-process soft and hard limit: `ulimit -n`
- Adjust in `/etc/security/limits.conf`: `nofile 65535`
- Kernel global limit: `sysctl fs.file-max`

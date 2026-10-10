---
title: Network Security, Firewalls, and DDoS Mitigation
subject: Networks
category: Security
difficulty: medium
importance: high
tags:
  - networks
  - security
  - firewalls
  - ddos
  - vpn
---

# Network Security, Firewalls, and DDoS Mitigation

Modern network architectures protect infrastructure through layered defense, perimeter packet filtering, and cryptographic encapsulation.

---

## 1. Firewalls: Packet Filtering vs Stateful vs WAF

| Firewall Type | Layer | Inspection Capability | Example |
| :--- | :--- | :--- | :--- |
| **Stateless Packet Filter** | Layer 3/4 | Inspects source/dest IP and port numbers only. Fast; no connection memory. | AWS Network ACLs |
| **Stateful Firewall** | Layer 4 | Tracks TCP handshake state table; automatically permits response return traffic. | AWS Security Groups, iptables |
| **Web Application Firewall (WAF)**| Layer 7 | Inspects HTTP payload, JSON bodies, SQL injection signatures, and XSS attacks. | AWS WAF, Cloudflare WAF |

---

## 2. Distributed Denial of Service (DDoS) Attacks & Mitigations

### 1. SYN Flood Attack (Layer 4)
Attacker sends a flood of `SYN` packets with spoofed source IPs without sending final `ACK` packets. The server exhausts its connection backlog queue (SYN queue).
- **Mitigation: SYN Cookies.** The server encodes sequence numbers cryptographically and does NOT allocate memory until the final `ACK` returns.

### 2. DNS / NTP Amplification (UDP Reflection)
Attacker sends small requests with spoofed victim source IPs to open UDP resolvers. The resolvers respond with large amplification replies (e.g. 50x payload) directed at the victim.
- **Mitigation:** BCP 38 ingress filtering (blocking spoofed outbound IPs) and rate limiting.

### 3. HTTP Flood (Layer 7)
Flooding expensive endpoints (e.g. `/search?query=...`) with legitimate-looking HTTP requests.
- **Mitigation:** Rate limiting (Token Bucket), CAPTCHA challenges (Cloudflare Turnstile), and CDN caching.

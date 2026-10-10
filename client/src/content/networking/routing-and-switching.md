---
title: IP Routing, Subnetting, and Switching
subject: Networks
category: Network Layer
difficulty: medium
importance: high
tags:
  - networks
  - routing
  - cidr
  - subnetting
  - nat
---

# IP Routing, Subnetting, and Switching

At Layer 2 and Layer 3, network devices route packets across global networks using MAC addresses, IP prefixes, and routing tables.

---

## 1. CIDR Notation & Subnet Calculation

In Classless Inter-Domain Routing (CIDR), an IP address is paired with a prefix length (e.g. `10.0.0.0/24`):
- The prefix specifies how many bits represent the **Network ID**.
- The remaining bits ($32 - \text{prefix}$) represent the **Host ID**.

$$\text{Usable Hosts} = 2^{(32 - \text{prefix})} - 2$$
*(Minus 2 accounts for the Network Address .0 and the Broadcast Address .255).*

```
/24: 2^8  - 2 = 254 usable hosts
/26: 2^6  - 2 = 62 usable hosts
/28: 2^4  - 2 = 14 usable hosts
/30: 2^2  - 2 = 2 usable hosts (Point-to-Point router link)
```

---

## 2. Address Resolution Protocol (ARP)

Routers and switches use **ARP** to bridge Layer 3 (IP addresses) to Layer 2 (physical 48-bit Ethernet MAC addresses).
- Host broadcasts: *"Who has IP 192.168.1.1? Tell 192.168.1.50."*
- Target unicasts: *"192.168.1.1 is at MAC aa:bb:cc:dd:ee:ff."*
- Result cached in the host\'s **ARP Table**.

---

## 3. Network Address Translation (NAT)

Because IPv4 addresses are exhausted (only $\approx 4.3$ billion addresses), private networks use RFC 1918 addresses:
- `10.0.0.0/8`
- `172.16.0.0/12`
- `192.168.0.0/16`

**NAT (Network Address Translation / PAT)**: A border router maps thousands of internal private IP:port pairs to a single external public IP by rewriting packet headers and tracking state in a NAT Translation Table.

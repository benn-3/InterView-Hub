---
title: TCP/IP Model and OSI 7-Layer Architecture
subject: Networks
category: Core Computer Networks
difficulty: medium
importance: high
tags:
  - networks
  - osi-model
  - tcp
  - udp
  - transport-layer
---

# TCP/IP Model and OSI 7-Layer Architecture

Network communication across the Internet is governed by layered protocols that abstract physical electromagnetic signals into reliable application data streams.

---

## 1. The OSI 7-Layer vs TCP/IP 4-Layer Model

| Layer # | OSI Layer | TCP/IP Layer | Protocol Data Unit (PDU) | Protocols | Hardware / Devices |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **7** | **Application** | Application | Data | HTTP, DNS, SSH, SMTP | Gateways, Proxies |
| **6** | **Presentation**| Application | Data | TLS/SSL, JSON, JPEG | Software |
| **5** | **Session** | Application | Data | Sockets, RPC | Software |
| **4** | **Transport** | Transport | **Segment** (TCP) / **Datagram** (UDP) | TCP, UDP, QUIC | Firewalls, L4 Balancers |
| **3** | **Network** | Internet | **Packet** | IPv4, IPv6, ICMP, BGP | **Routers**, L3 Switches |
| **2** | **Data Link** | Network Access | **Frame** | Ethernet (802.3), Wi-Fi (802.11) | **Switches**, Bridges |
| **1** | **Physical** | Network Access | **Bits** | Cables, Radio waves, Fiber | Hubs, Repeaters |

---

## 2. TCP vs UDP Comparison

```
              TCP                                       UDP
    ┌───────────────────────┐                 ┌───────────────────────┐
    │ Connection-Oriented   │                 │ Connectionless        │
    │ Reliable (Retransmits)│                 │ Unreliable (Fire & Fgt)│
    │ In-Order Delivery     │                 │ Out-of-Order Possible │
    │ Flow & Congestion Ctrl│                 │ No Throttling         │
    │ 20-60 Byte Header     │                 │ 8 Byte Minimal Header │
    └───────────────────────┘                 └───────────────────────┘
```

---

## 3. TCP Three-Way Handshake & Teardown

### Handshake:
1. **Client $\to$ Server:** `SYN` (seq = $x$)
2. **Server $\to$ Client:** `SYN-ACK` (seq = $y$, ack = $x + 1$)
3. **Client $\to$ Server:** `ACK` (seq = $x + 1$, ack = $y + 1$)

### Teardown & The TIME_WAIT State:
1. Client sends `FIN`; Server replies `ACK`. Server enters `CLOSE_WAIT`.
2. Server finishes sending remaining data and sends `FIN`.
3. Client replies `ACK` and enters `TIME_WAIT` for **2MSL (Maximum Segment Lifetime)** before closing to ensure the final ACK arrived and duplicate packets dissipate.

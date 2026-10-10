---
title: HTTP Evolution, TLS 1.3, and DNS
subject: Networks
category: Application Layer
difficulty: hard
importance: high
tags:
  - networks
  - http
  - tls
  - dns
  - https
---

# HTTP Evolution, TLS 1.3, and DNS

Modern web applications depend on the evolution of HTTP transport protocols, cryptographically secure TLS channels, and distributed DNS name resolution.

---

## 1. HTTP/1.1 vs HTTP/2 vs HTTP/3

| Feature | HTTP/1.1 | HTTP/2 | HTTP/3 |
| :--- | :--- | :--- | :--- |
| **Format** | Plain Text | Binary Framing | Binary |
| **Transport** | TCP | TCP | **QUIC (UDP)** |
| **Multiplexing** | No (HOL blocking) | Yes (over single TCP socket)| Yes (independent streams) |
| **TCP HOL Blocking?**| Yes | **Yes** (a dropped packet halts all streams)| **No** (packet loss affects only that stream) |
| **Header Compression**| None | HPACK | QPACK |

---

## 2. TLS 1.3 Handshake (1-RTT)

TLS 1.3 streamlines cryptography down to a single round-trip:

```
Client                                                 Server
  │                                                      │
  │─── ClientHello (Key Share: Client DH public key) ────>
  │                                                      │
  │<── ServerHello (Key Share: Server DH public key) ────│
  │<── EncryptedExtensions & Certificate ────────────────│
  │<── Finished (HMAC Integrity check) ──────────────────│
  │                                                      │
  │─── Finished (Session is Encrypted & Active!) ────────>
```

- **Perfect Forward Secrecy (PFS):** Ephemeral Diffie-Hellman keys ensure that even if the server\'s private key is leaked in the future, past recorded traffic cannot be decrypted.

---

## 3. The DNS Resolution Hierarchy

```
Root DNS (.) ──> TLD Nameserver (.com) ──> Authoritative Nameserver (example.com) ──> A Record (IP)
```

1. **Browser & OS Cache:** Checked first.
2. **Recursive Resolver:** Query forwarded to ISP or Anycast resolver (1.1.1.1).
3. **Root Server:** Directs resolver to Top-Level Domain (TLD) servers.
4. **Authoritative Nameserver:** Holds definitive DNS records (`A`, `AAAA`, `CNAME`, `MX`) with a Time-To-Live (TTL).

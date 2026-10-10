---
title: WebSockets and Real-Time Communication
subject: Networks
category: Application Layer
difficulty: easy
importance: high
tags:
  - networks
  - websockets
  - sse
  - real-time
---

# WebSockets and Real-Time Communication

Traditional HTTP is a request-response protocol driven solely by the client. Building real-time interactive apps (collaborative editors, stock feeds, chat) requires specialized communication channels.

---

## 1. Comparing Real-Time Technologies

| Protocol | Direction | Transport | Framing Overhead | Best Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Long Polling** | Half-Duplex | Repeated HTTP requests | Large (headers on every message) | Legacy browser fallback |
| **Server-Sent Events (SSE)**| Unidirectional (Server $\to$ Client) | Persistent HTTP/2 stream | Tiny (text stream) | Stock tickers, live sports scores |
| **WebSockets** | **Full-Duplex** (Bi-directional) | Persistent TCP connection | Minimal (2 to 10 bytes framing) | Chat apps, multiplayer games |

---

## 2. The WebSocket Upgrade Handshake

A WebSocket connection begins its life as an HTTP request:

```http
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
```

Server responds with **HTTP 101 Switching Protocols**:

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

Once established, the HTTP protocol ceases, and both parties exchange lightweight, bi-directional binary or text frames directly over the underlying TCP socket without HTTP headers.

---
title: Web Caching and Content Delivery Networks
subject: WebDev
category: Performance & Optimization
difficulty: medium
importance: high
tags:
  - webdev
  - caching
  - cdn
  - http-headers
---

# Web Caching and Content Delivery Networks

Web performance optimization hinges on caching assets close to the end-user, minimizing Round-Trip Time (RTT) and origin server load.

---

## 1. HTTP Caching Headers

### `Cache-Control` Directives
- `max-age=31536000, immutable`: Used for static hashed assets (`app-a8f3.js`). Browser caches for 1 year and never revalidates.
- `no-cache`: Must revalidate with origin server before using cached copy.
- `no-store`: Prohibits all caching anywhere (for sensitive banking data).
- `stale-while-revalidate=60`: Serves cached stale response immediately while asynchronously fetching the fresh copy in the background.

### Conditional Revalidation: ETag and Last-Modified
```http
-- Request
GET /api/profile HTTP/1.1
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"

-- Response (Unchanged!)
HTTP/1.1 304 Not Modified
-- (No response body transferred; saves bandwidth!)
```

---

## 2. Content Delivery Networks (CDNs)

A **CDN** is a globally distributed network of edge reverse proxies (Cloudflare, Fastly, AWS CloudFront).
- **Edge Termination:** Terminates the TCP and TLS handshakes within milliseconds of the user\'s physical location.
- **Cache Invalidation:** Purging CDN caches on release (via API or path invalidation).
- **Origin Shield:** Intermediary cache between edge locations and the origin server, preventing cache stampedes.

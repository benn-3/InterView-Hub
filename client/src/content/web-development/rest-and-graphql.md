---
title: RESTful API Design and GraphQL
subject: WebDev
category: Software Engineering
difficulty: medium
importance: high
tags:
  - webdev
  - rest
  - graphql
  - apis
  - idempotency
---

# RESTful API Design and GraphQL

Building robust distributed web services requires choosing the appropriate communication paradigm between resource-oriented REST and graph-queryable GraphQL.

---

## 1. The 6 Constraints of REST (Representational State Transfer)

Defined by Roy Fielding in 2000:
1. **Client-Server:** Decoupled UI clients from backend data storage.
2. **Stateless:** Each request contains all information needed to process it; no server-side conversation state.
3. **Cacheable:** Responses must explicitly declare cacheability headers.
4. **Uniform Interface:** Resource identification (URIs), representation manipulation (JSON), self-descriptive messages, and HATEOAS.
5. **Layered System:** Clients cannot determine whether they connect directly to an origin server or an intermediary load balancer/CDN.
6. **Code on Demand (Optional):** Transfer of client-executable scripts (JS).

### HTTP Method Idempotency
An HTTP method is **Idempotent** if making multiple identical requests has the same side-effect on the server as making a single request:
- **Idempotent:** `GET`, `PUT` (full replacement), `DELETE`, `HEAD`, `OPTIONS`.
- **Non-Idempotent:** `POST` (submits new entity; multiple runs create duplicates), `PATCH` (partial modification depending on existing state).

---

## 2. REST vs GraphQL

| Feature | REST | GraphQL |
| :--- | :--- | :--- |
| **Endpoint Architecture** | Multiple resource URIs (`/users`, `/orders`) | Single endpoint (`POST /graphql`) |
| **Data Fetching** | Fixed server-defined payloads | Client specifies exact requested fields |
| **Network Efficiency** | Prone to Over-fetching and Under-fetching | Eliminates Over-fetching; single query roundtrip |
| **HTTP Caching** | Trivially cached via standard HTTP headers (`ETag`, `Cache-Control`) | Complex; all queries are POST to identical URL |

```graphql
# GraphQL Query Example
query GetUserAndRecentOrders {
  user(id: "102") {
    name
    email
    orders(limit: 3) {
      id
      totalAmount
      status
    }
  }
}
```

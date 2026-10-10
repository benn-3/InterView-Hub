---
title: Authentication: JWT vs Session Cookies and OAuth2
subject: WebDev
category: Software Engineering
difficulty: medium
importance: high
tags:
  - webdev
  - auth
  - jwt
  - sessions
  - oauth2
---

# Authentication: JWT vs Session Cookies and OAuth2

Managing authenticated user state across stateless HTTP requires choosing between centralized server sessions and cryptographic tokens.

---

## 1. Server-Side Sessions vs JSON Web Tokens (JWT)

| Feature | Server-Side Session Cookies | JSON Web Tokens (JWT) |
| :--- | :--- | :--- |
| **State Location** | Stored on server (Redis / DB) | Stateless; stored in client token payload |
| **Verification** | DB / Cache lookup on every request | Cryptographic signature verification |
| **Revocation** | **Instantaneous** (delete session key) | Complex; requires distributed blacklists |
| **Payload Size** | Tiny (32-byte opaque session ID) | Large (hundreds of bytes sent on each header) |
| **Scalability** | Requires distributed Redis cluster | Horizontally scalable across microservices |

```
JWT Structure:
[Base64 Header].[Base64 Payload Claims].[HMAC SHA256 Signature]
```

### Production Best Practice: Short-lived Access Token + Refresh Token
- **Access Token:** Short lifespan (e.g. 15 minutes) kept in memory or secure cookie.
- **Refresh Token:** Long lifespan (e.g. 7 days) stored in an `HttpOnly` cookie and used to mint new access tokens. Enables rapid revocation upon compromise.

---

## 2. OAuth 2.0 Authorization Code Flow with PKCE

Used when third-party applications need delegated access without learning the user\'s credentials (e.g., "Log in with Google"):

```
1. Client generates Code Verifier & Code Challenge (PKCE).
2. Browser redirects to Authorization Server with Code Challenge.
3. User authenticates and grants consent.
4. Auth Server redirects to Client redirect_uri with an Authorization Code.
5. Client exchanges Authorization Code + Code Verifier directly with Auth Server for Access Token.
```

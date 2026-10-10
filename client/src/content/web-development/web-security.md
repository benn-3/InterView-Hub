---
title: Web Security: XSS, CSRF, and Defense-in-Depth
subject: WebDev
category: Security
difficulty: hard
importance: high
tags:
  - webdev
  - security
  - xss
  - csrf
  - csp
  - cors
---

# Web Security: XSS, CSRF, and Defense-in-Depth

Securing browser applications requires defending against attacks that exploit browser trust, cookie storage, and cross-origin communications.

---

## 1. Cross-Site Scripting (XSS)

XSS occurs when an attacker tricks an application into executing malicious JavaScript inside a victim\'s browser session.
- **Stored XSS:** Malicious payload permanently stored in the database (e.g., in a comment field) and served to all viewers.
- **Reflected XSS:** Payload injected in URL query parameters and reflected immediately in server HTML output.
- **DOM-based XSS:** Client-side JavaScript unsafely reads from `location.hash` and writes into `element.innerHTML`.

### Defenses:
1. Context-aware output encoding (escaping HTML entities).
2. Never store authentication tokens in `localStorage`; store in `HttpOnly` cookies.
3. Enforce **Content Security Policy (CSP)**:
```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://trustedscripts.com;
```

---

## 2. Cross-Site Request Forgery (CSRF)

CSRF exploits the browser\'s default behavior of automatically attaching cookies to cross-origin requests. An attacker tricks an authenticated user into clicking an evil link that submits a form to `bank.com/transfer`.

### Defenses:
1. **`SameSite` Cookie Attribute:**
   - `SameSite=Strict`: Cookie never sent in cross-origin requests.
   - `SameSite=Lax`: Cookie sent on top-level GET navigations (default).
2. **Anti-CSRF Synchronizer Tokens:** Server embeds a cryptographically random token in form fields and verifies it in request headers.

---

## 3. Essential Security Response Headers

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
```

---
title: Application Security Testing — SAST, DAST, and SCA
subject: DevSecOps
category: DevOps & Cloud
difficulty: medium
importance: high
tags:
  - devsecops
  - sast
  - dast
  - sca
  - security
  - shift-left
---

# Application Security Testing: SAST, DAST, and SCA

Integrating security throughout the Continuous Delivery pipeline requires testing source code, open-source dependencies, and running applications at different phases of the lifecycle.

---

## 1. The Security Testing Triangle

```
                         ┌─────────────────────────┐
                         │   APPLICATION SECURITY   │
                         └────────────┬────────────┘
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         ▼                            ▼                            ▼
┌──────────────────┐        ┌──────────────────┐        ┌──────────────────┐
│       SAST       │        │       SCA        │        │       DAST       │
│ Static App Sec   │        │ Software Comp.   │        │ Dynamic App Sec  │
│ Testing          │        │ Analysis         │        │ Testing          │
├──────────────────┤        ├──────────────────┤        ├──────────────────┤
│ White-box        │        │ Dependency Audit │        │ Black-box        │
│ Source Code      │        │ Known CVEs in OSS│        │ Running HTTP app │
│ Inside CI build  │        │ npm/mvn/pip scan │        │ Staging / Pre-prod│
└──────────────────┘        └──────────────────┘        └──────────────────┘
```

---

## 2. Comparison Breakdown

| Feature | SAST (e.g. SonarQube, Semgrep) | SCA (e.g. Snyk, Dependabot, Trivy) | DAST (e.g. OWASP ZAP, Burp Suite) |
|---|---|---|---|
| **Approach** | White-box (reads code without running) | Component manifest analysis | Black-box (external attack simulator) |
| **Analyzes** | Proprietary source code & syntax trees | Third-party libraries (`package.json`) | Live HTTP endpoints & responses |
| **Detects** | Hardcoded secrets, SQL injection, XSS logic | Outdated packages, known CVEs, license issues | Broken auth, SSL misconfigs, runtime CORS |
| **Phase** | Code commit / Pull Request | Pre-build & repository scanning | Deployed staging / QA environment |
| **Pros** | Pinpoints exact file and line number | Fast, automated patch suggestions | Zero false positives regarding reachable code |
| **Cons** | High false-positive rate; no runtime context | Misses proprietary business logic flaws | Slow; doesn't locate line numbers in source |

---

## 3. Integrating Security in CI/CD

```yaml
# GitHub Actions snippet for automated SAST & SCA
jobs:
  security-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # 1. SCA: Dependency check
      - name: Run Trivy FS & Dependency Scan
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          severity: 'CRITICAL,HIGH'
          exit-code: '1'

      # 2. SAST: Static code analysis
      - name: Run Semgrep SAST Scan
        uses: returntocorp/semgrep-action@v1
        with:
          config: >-
            p/security-audit
            p/secrets
```

---

## 4. Key Terminology & Interview Questions

### Q1: What is a Software Bill of Materials (SBOM)?
An SBOM is a comprehensive, structured inventory of all open-source libraries, modules, licenses, and metadata incorporated into an application build. Formats like **CycloneDX** and **SPDX** enable organizations to instantly query whether their software is vulnerable when a zero-day CVE (such as Log4j) is disclosed.

### Q2: Why is SAST alone not sufficient for modern application security?
SAST scans static source code without execution context. It cannot detect runtime environmental issues such as TLS configuration errors, web server misconfigurations, insecure cookie attributes, or authentication bypass flaws caused by API gateways and reverse proxies.

### Q3: What is IAST (Interactive Application Security Testing)?
IAST combines aspects of SAST and DAST. An agent or sensor is installed inside the running application server (like an APM agent). While functional or QA tests are executed, the agent monitors internal memory execution and data flows in real-time, delivering high accuracy with low false positives.

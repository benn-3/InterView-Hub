---
title: CI/CD Pipelines and Automated Delivery
subject: DevOps
category: DevOps & Cloud
difficulty: medium
importance: high
tags:
  - devops
  - cicd
  - github-actions
  - automation
  - testing
  - delivery
---

# CI/CD Pipelines: Continuous Integration and Delivery

**Continuous Integration (CI)** and **Continuous Deployment/Delivery (CD)** automate the journey of software from code commit to production release, minimizing human error and shortening time-to-market.

---

## 1. CI vs CD Pipeline Stages

```
   ┌───────────────────────┐
   │ Developer Git Commit  │
   └───────────┬───────────┘
               ▼
┌─────────────────────────────────┐
│     CONTINUOUS INTEGRATION      │
│  ├── Linting & Formatting       │
│  ├── Unit & Integration Tests   │
│  ├── SAST Security Scan         │
│  └── Artifact Build (Docker)    │
└──────────────┬──────────────────┘
               ▼
┌─────────────────────────────────┐
│       CONTINUOUS DELIVERY       │
│  ├── Push to Image Registry     │
│  ├── Deploy to Staging Cluster  │
│  └── End-to-End Smoke Tests     │
└──────────────┬──────────────────┘
               ▼
┌─────────────────────────────────┐
│      CONTINUOUS DEPLOYMENT      │
│  (Automated or 1-Click approval)│
│  └── Production Blue/Green Roll │
└─────────────────────────────────┘
```

---

## 2. Production GitHub Actions Workflow

```yaml
name: Production CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage

  build-and-push:
    needs: test
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Login to Amazon ECR
        uses: aws-actions/amazon-ecr-login@v2
      - name: Build, tag, and push image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/api-service:$IMAGE_TAG .
          docker push $ECR_REGISTRY/api-service:$IMAGE_TAG
```

---

## 3. Best Practices in Modern Pipelines

1. **Shift Left:** Run security scanners (Trivy, SonarQube) and unit tests earliest in the workflow so developers receive instant feedback.
2. **Immutable Artifacts:** Build your binary or Docker image exactly once per commit. Deploy that exact identical SHA image through Dev, Staging, and Production.
3. **Fail Fast:** Configure short timeouts and execute parallel jobs.
4. **Environment Isolation:** Use short-lived OIDC (OpenID Connect) tokens rather than static long-lived AWS keys in CI secrets.

---

## 4. Key Terminology & Interview Questions

### Q1: What is the difference between Continuous Delivery and Continuous Deployment?
- **Continuous Delivery:** Software changes are automatically tested and built into release-ready artifacts, and deployed automatically to staging. Deployment to production requires a human approval gate.
- **Continuous Deployment:** Every change that passes automated tests and stages is automatically deployed directly to production with zero manual human intervention.

### Q2: Why should you avoid storing long-lived credentials in CI runners?
Long-lived secrets stored in repository settings are vulnerable to leakage through pull request scripts or compromised dependencies. **OIDC (OpenID Connect)** allows the runner (e.g. GitHub Actions) to request temporary AWS/GCP credentials on-demand with claims-based role policies.

### Q3: What is "Shift-Left" testing?
Shift-left refers to moving testing, security vulnerability scans, and compliance audits to the earliest possible phases of the software development lifecycle (during local development and initial PR commits) rather than waiting for QA or post-deployment testing.

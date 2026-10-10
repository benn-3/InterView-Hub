---
title: SRE Fundamentals and DORA Metrics
subject: DevOps
category: DevOps & Cloud
difficulty: medium
importance: high
tags:
  - devops
  - sre
  - dora-metrics
  - sli-slo-sla
  - reliability
---

# Site Reliability Engineering (SRE) & DORA Metrics

Site Reliability Engineering treats operations as a software problem. The Google SRE framework balances rapid product velocity against system availability using **SLIs, SLOs, and Error Budgets**.

---

## 1. SLI vs SLO vs SLA

```
┌─────────────────────────────────────────────────────────────┐
│ SLI (Service Level Indicator): What you actually measure     │
│ Formula: (Good Events / Total Valid Events) * 100           │
│ Example: 99.94% of HTTP requests returned 2xx within 200ms   │
└──────────────────────────────┬──────────────────────────────┘
                               │ Compared against
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ SLO (Service Level Objective): Internal target agreed upon  │
│ Target: 99.9% availability measured over rolling 30 days    │
└──────────────────────────────┬──────────────────────────────┘
                               │ Guardrails customer contract
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ SLA (Service Level Agreement): Contractual promise with     │
│ legal/financial penalties (e.g. credits issued if < 99.5%) │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Error Budgets and Velocity

An **Error Budget** is simply `100% - SLO`.
- If an application has an SLO of **99.9%**, its monthly error budget is **0.1%** (approx. 43 minutes of downtime per month).
- **Rule:** If the error budget is healthy (> 0), developers can ship fast and release experimental features.
- If the error budget is exhausted (< 0), new feature launches are halted, and engineering shifts 100% focus to stability, bug fixing, and resilience.

---

## 3. The 4 DORA Metrics

The DevOps Research and Assessment (DORA) framework identifies four key metrics that differentiate high-performing engineering teams:

```
VELOCITY / THROUGHPUT
├── 1. Deployment Frequency: How often code is successfully deployed to production
│      (Elite: Multiple times per day)
└── 2. Lead Time for Changes: Time from code commit to running in production
       (Elite: Less than 1 hour)

STABILITY / QUALITY
├── 3. Change Failure Rate: Percentage of deployments causing production outages/bugs
│      (Elite: 0% - 15%)
└── 4. Time to Restore Service (MTTR): Time required to recover from a production outage
       (Elite: Less than 1 hour)
```

---

## 4. Key Terminology & Interview Questions

### Q1: What is "Toil" in SRE terminology?
Toil is operational work tied to running a production service that is repetitive, manual, tactical, lacks enduring value, and scales linearly as a service grows (e.g., manually restarting servers, resetting passwords). SRE teams aim to cap toil at **below 50%** of their engineering time, spending the rest on automation and software development.

### Q2: Why is 100% availability an anti-pattern in modern software?
Demanding 100% uptime is exponentially expensive and stifles innovation. The user's own network connection or device rarely achieves 100% availability. Therefore, setting an SLO between 99.9% and 99.99% leaves an error budget that enables rapid feature delivery and iterative releases.

### Q3: How do you measure Mean Time to Detect (MTTD) vs Mean Time to Resolve (MTTR)?
- **MTTD:** Time elapsed between a defect occurring in production and automated alerting paging an on-call engineer.
- **MTTR:** Time elapsed from incident declaration until the service is restored to normal operational parameters.

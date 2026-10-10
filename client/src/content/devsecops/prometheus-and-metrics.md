---
title: Infrastructure Monitoring with Prometheus and Grafana
subject: DevSecOps
category: DevOps & Cloud
difficulty: medium
importance: high
tags:
  - devsecops
  - prometheus
  - grafana
  - promql
  - metrics
  - monitoring
---

# Infrastructure Monitoring with Prometheus and Grafana

Prometheus is the CNCF standard for cloud-native metrics collection and alerting. It uses a **pull-based** time-series model paired with **PromQL** for mathematical querying.

---

## 1. Prometheus Architecture

```
┌─────────────────────────────────┐
│ Target Services / Exporters     │ (Expose HTTP /metrics endpoint)
│  ├── Node Exporter (OS stats)   │
│  └── App Microservice (/metrics)│
└──────────────▲──────────────────┘
               │ Pull (Scrapes every 15s)
┌──────────────┴──────────────────┐
│ Prometheus Server               │
│  ├── Service Discovery (K8s)    │
│  ├── Retrieval Engine (Scraper) │
│  └── TSDB (Time Series Database)│
└──────────────┬──────────────────┘
               │ PromQL Queries
         ┌─────┴─────┐
         ▼           ▼
┌─────────────┐ ┌──────────────┐
│ Alertmanager│ │ Grafana      │
│ (Slack/Pager) │ (Dashboards) │
└─────────────┘ └──────────────┘
```

---

## 2. Core Metric Types

1. **Counter:** A monotonically increasing value that only resets to zero on restart (e.g., `http_requests_total`). Always evaluated using `rate()` or `increase()`.
2. **Gauge:** A numerical value that can move up and down freely (e.g., `memory_usage_bytes`, `cpu_temperature`, `active_threads`).
3. **Histogram:** Samples observations (usually request durations or response sizes) and counts them in configurable buckets (`le` label), calculating cumulative frequencies.
4. **Summary:** Calculates configurable client-side streaming quantiles (e.g., $\phi = 0.50, 0.90, 0.99$) over a sliding time window.

---

## 3. Essential PromQL Expressions

```promql
# 1. Per-second rate of HTTP 5xx errors averaged over 5 minutes
rate(http_requests_total{status=~"5.."}[5m])

# 2. 99th percentile request latency across services
histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))

# 3. CPU utilization percentage per node
100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# 4. Error rate percentage
(sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m]))) * 100
```

---

## 4. Key Terminology & Interview Questions

### Q1: Why does Prometheus use a Pull model rather than a Push model?
1. **Centralized Health Detection:** If a monitored target goes down or stops responding, Prometheus immediately detects target unavailability (`up == 0`). In a push model, silence can be mistaken for zero errors.
2. **Backpressure Protection:** Prometheus controls scraping rates and resource consumption, preventing an avalanche of target metrics from overwhelming the monitoring server.
3. **Target Discovery:** Integrates natively with Kubernetes service discovery to find pods dynamically without manual registration.

### Q2: What is the difference between `rate()` and `irate()`?
- **`rate()`:** Computes the per-second average rate of increase across the entire specified time window (e.g. `[5m]`). Smooths out sharp spikes and is recommended for alerting rules.
- **`irate()`:** Computes the instantaneous per-second rate of increase based solely on the last two data points within the window. Highly responsive to quick bursts; ideal for live dashboard graphs.

### Q3: What is the RED method in observability?
A monitoring philosophy for request-driven microservices:
- **Rate:** The number of requests per second receiving traffic.
- **Errors:** The number of requests failing per second.
- **Duration:** The amount of time requests take to complete (latency distribution).

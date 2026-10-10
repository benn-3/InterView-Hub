---
title: Centralized Logging and the ELK / EFK Stack
subject: DevSecOps
category: DevOps & Cloud
difficulty: medium
importance: high
tags:
  - devsecops
  - logging
  - elk
  - elasticsearch
  - fluentd
  - logstash
  - kibana
---

# Centralized Logging and the ELK / EFK Stack

In distributed systems, SSHing into individual servers to `grep` application logs is inefficient and unscalable. **Centralized Logging** aggregates, indexes, and visualizes logs across hundreds of nodes in real-time.

---

## 1. Centralized Log Pipeline Architecture

```
EDGE NODES                         BUFFER / INGESTION             STORAGE & UI
┌─────────────────────────┐        ┌──────────────┐              ┌───────────────┐
│ Pod / VM: /var/log/*.log│        │ Kafka or     │              │ Elasticsearch │
│                         │ ────►  │ Redis Buffer │ ──Logstash──►│ or OpenSearch │
│ FluentBit / Filebeat    │        │ (Backpressure│   (Parse/    │ (Inverted     │
│ (Lightweight shipper)   │        │  protection) │    Enrich)   │  Index TSDB)  │
└─────────────────────────┘        └──────────────┘              └───────┬───────┘
                                                                         │
                                                                         ▼
                                                                 ┌───────────────┐
                                                                 │ Kibana        │
                                                                 │ (Dashboards)  │
                                                                 └───────────────┘
```

---

## 2. Structured Logging in JSON

Unstructured plain text logs (`"User logged in from 10.0.1.2 at 12:00"`) require expensive regular expression parsing. **Structured JSON logging** allows search engines to index fields automatically for high-speed sub-millisecond filtering:

```json
{
  "timestamp": "2026-10-09T14:30:15.123Z",
  "level": "ERROR",
  "service": "billing-service",
  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "span_id": "00f067aa0ba902b7",
  "user_id": "usr_99812",
  "message": "Payment gateway timeout",
  "error": {
    "code": "GATEWAY_TIMEOUT",
    "http_status": 504,
    "retry_attempt": 3
  }
}
```

---

## 3. Log Ingestion Tools: Filebeat vs FluentBit vs Logstash

| Tool | Footprint | Primary Role |
|---|---|---|
| **Filebeat** | Ultra-lightweight (Go, ~10MB RAM) | Simple, fast log forwarding from edge disks directly to Logstash/Elasticsearch |
| **FluentBit** | Micro-footprint (C, ~5MB RAM) | Standard edge log processor & forwarder for Kubernetes daemonsets |
| **Logstash** | Heavyweight (JVM, ~1GB RAM) | Complex centralized transformations, grok regex parsing, enrichments, and multi-destination routing |

---

## 4. Key Terminology & Interview Questions

### Q1: How does Elasticsearch index and search through terabytes of logs efficiently?
Elasticsearch builds an **Inverted Index** (powered by Apache Lucene). Instead of scanning log lines sequentially, it maps unique terms and words directly to the list of document IDs where they appear:
```
Term: "GATEWAY_TIMEOUT" ──► Found in Documents: [Doc #102, Doc #5084, Doc #9281]
```
This enables full-text searches across billions of records in milliseconds.

### Q2: Why is a message broker (like Apache Kafka) commonly placed in front of Logstash?
During production traffic surges or major outages, applications generate millions of error logs per second. If Logstash or Elasticsearch experiences high load, they can slow down or crash. A Kafka buffer acts as a shock absorber (**backpressure valve**), safely storing logs on disk until consumers catch up without dropping log messages.

### Q3: What is Log Rotation and why is it necessary?
Log rotation (e.g., via `logrotate`) compresses, archives, and deletes old log files once they reach a specific file size (e.g. 100 MB) or age (e.g. daily). Without log rotation, high-volume application logs will fill the host filesystem, triggering kernel out-of-disk errors (`ENOSPC`) and halting system processes.

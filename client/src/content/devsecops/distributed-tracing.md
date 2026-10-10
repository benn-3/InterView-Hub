---
title: Distributed Tracing and OpenTelemetry
subject: DevSecOps
category: DevOps & Cloud
difficulty: hard
importance: high
tags:
  - devsecops
  - tracing
  - opentelemetry
  - jaeger
  - apm
  - context-propagation
---

# Distributed Tracing and OpenTelemetry

In microservice architectures, a single end-user interaction may traverse dozens of asynchronous network boundaries and database queries. **Distributed Tracing** tracks the lifecycle of requests end-to-end.

---

## 1. Traces, Spans, and Context Propagation

```
TRACE (Total request journey: HTTP GET /checkout)
┌─────────────────────────────────────────────────────────────┐
│ SPAN 1: API Gateway (Duration: 240ms)                       │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ SPAN 2: Auth Service (Duration: 40ms)                   │ │
│ └─────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ SPAN 3: Order Service (Duration: 180ms)                 │ │
│ │ ┌───────────────────────────┐ ┌───────────────────────┐ │ │
│ │ │ SPAN 4: PostgreSQL Query  │ │ SPAN 5: Payment RPC   │ │ │
│ │ │ (Duration: 35ms)          │ │ (Duration: 120ms)     │ │ │
│ │ └───────────────────────────┘ └───────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

- **Trace:** Represents the entire end-to-end directed acyclic graph (DAG) of a request through the system. Identified by a unique **TraceID**.
- **Span:** Represents an individual unit of contiguous work (e.g., an HTTP client call, an SQL query, or an internal function execution). Contains a **SpanID**, start timestamp, duration, status, tags, and logs.
- **Context Propagation:** Passing metadata (TraceID and SpanID) across process boundaries via HTTP headers (W3C `traceparent`).

---

## 2. W3C Trace Context Standard

Services propagate distributed context across network boundaries using the standardized HTTP header:

```
traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01
              │  └──────────────┬───────────────┘ └───────┬────────┘ └─┬─┘
           Version          Trace ID                   Parent Span ID  Flags
```

---

## 3. The OpenTelemetry (OTel) Ecosystem

OpenTelemetry provides vendor-neutral SDKs, APIs, and tooling to generate, collect, and export telemetry data:

```
App (OTel SDK) ──► OTel Collector (Filter / Batch / Sample) ──► Backend (Jaeger / Tempo / Datadog)
```

### Trace Sampling Strategies
Collecting 100% of traces at high traffic volumes (e.g. 100,000 requests/second) generates excessive storage and network costs:
1. **Head-Based Sampling:** The decision to trace is made at the ingress root span before the request executes (e.g., sample 5% of requests). Fast and lightweight, but may discard rare 500 error traces.
2. **Tail-Based Sampling:** The OTel collector buffers all spans for a trace until completion. If any span within the trace exhibits an HTTP 500 or exceeds a 2-second latency threshold, 100% of that trace is retained.

---

## 4. Key Terminology & Interview Questions

### Q1: What is the difference between Logs, Metrics, and Traces (The 3 Pillars of Observability)?
- **Metrics:** Numeric aggregated data points over time (CPU %, request count). Excellent for alerting and detecting anomalies.
- **Logs:** Discrete timestamped text events detailing specific logic execution. Excellent for local root-cause inspection.
- **Traces:** Request-scoped graphs illustrating end-to-end causality, latency breakdowns, and distributed bottlenecks across network hops.

### Q2: What causes "Trace Context Loss" in an asynchronous application?
Context loss occurs when a developer dispatches an asynchronous background task (e.g. `thread_pool.submit()`, a Kafka message, or an event emitter) without explicitly propagating the parent trace context into the new execution thread or message payload headers.

### Q3: Why is OpenTelemetry preferred over vendor-specific APM agents?
OpenTelemetry provides open standards and vendor-neutral instrumentation. Engineering teams can switch backends (from Jaeger to Datadog, Dynatrace, or AWS X-Ray) simply by updating collector exporter configuration in YAML, without rewriting any application code.

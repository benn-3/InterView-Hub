---
title: Model Serving, Drift Detection, and LLMOps Monitoring
subject: MLOps and AI Engineering
category: Artificial Intelligence & Data
difficulty: hard
importance: high
tags:
  - mlops
  - model-serving
  - triton
  - vllm
  - data-drift
  - concept-drift
  - evidently-ai
  - llmops
---

# Model Serving, Drift Detection, and LLMOps Monitoring

Deploying models to production requires scalable inference servers, real-time drift detection, and observability over both predictive and generative workloads.

---

## 1. Model Serving Patterns & Inference Engines

- **Batch Inference**: Scheduled jobs (e.g., Apache Spark or Ray) running over millions of rows offline, writing predictions back to a database for cached lookup.
- **Online Real-Time Serving**: Synchronous REST / gRPC endpoint for low-latency scoring ($< 50\text{ms}$).
  - **Triton Inference Server**: Multi-framework engine (PyTorch, ONNX, TensorRT) with dynamic batching, concurrent model execution, and GPU memory management.
  - **vLLM (PagedAttention)**: State-of-the-art LLM serving engine that partitions KV cache into virtual memory pages, achieving 2–4x higher throughput and near-zero memory fragmentation compared to standard Hugging Face inference.

```python
# FastAPI Real-time Inference Server with Pydantic validation
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import numpy as np

app = FastAPI(title="Credit Risk Scoring Inference Service")

class ScoringPayload(BaseModel):
    annual_income: float = Field(..., gt=0)
    debt_to_income_ratio: float = Field(..., ge=0, le=5)
    credit_score: int = Field(..., ge=300, le=850)
    inquiries_last_6m: int = Field(..., ge=0)

@app.post("/predict")
async def predict_risk(payload: ScoringPayload):
    # Features vector assembly
    features = np.array([[
        payload.annual_income,
        payload.debt_to_income_ratio,
        payload.credit_score,
        payload.inquiries_last_6m
    ]])
    # Simulate scoring via runtime engine
    default_prob = float(1.0 / (1.0 + np.exp(-(0.00001 * payload.annual_income - 0.01 * payload.credit_score + 1.2))))
    return {
        "default_probability": round(default_prob, 4),
        "decision": "DECLINE" if default_prob > 0.35 else "APPROVE"
    }
```

---

## 2. Drift Detection: Data Drift vs. Concept Drift

Production models degrade silently over time without throwing code exceptions because the underlying world changes.

```
1. Data Drift (Covariate Shift):
   P(X) changes while P(Y | X) remains constant.
   Example: An e-commerce app redesign changes the user demographic or input feature distributions.
   Detection:
   • Kolmogorov-Smirnov (K-S) test for continuous features.
   • Population Stability Index (PSI):
       PSI = Σ (Actual% - Expected%) × ln(Actual% / Expected%)
       (PSI < 0.1: No change; PSI 0.1–0.2: Moderate drift; PSI > 0.2: Significant drift -> trigger retraining).

2. Concept Drift:
   P(Y | X) changes while P(X) might stay identical.
   Example: Macroeconomic inflation makes previously creditworthy debt-to-income ratios default at 3x higher rates.
   Detection:
   • Monitoring actual ground-truth label performance metrics (F1, MAE) as labels arrive asynchronously.
```

---

## 3. LLMOps and Generative AI Observability

Generative AI workloads introduce new failure modes distinct from classification accuracy:

- **Telemetry & Tracing (OpenTelemetry, Langfuse, Arize Phoenix)**: Tracks latency breakdowns across prompt formatting, retrieval vector search, reranking, time-to-first-token (TTFT), and generation tokens per second.
- **Cost & Token Budgets**: Tracks prompt and completion token counts per user, cached prompt hit rates, and model routing economics (e.g. routing simple queries to smaller models).
- **Quality Guardrails & LLM-as-a-Judge**: Evaluates conversational safety, prompt injection attempts, toxic outputs, and context hallucination continuously on sampled production logs.

---

## 4. Deployment Strategies: Shadow vs. Canary

- **Shadow Deployment**: Incoming production traffic is mirrored asynchronously to the new candidate model. Predictions are logged and compared against the current production model without being returned to end users. Zero user-facing risk.
- **Canary Deployment**: 5% of live traffic is routed to the new version. If error rates, latency p99, or PSI remain stable over 2 hours, traffic ramps up incrementally ($10\% \rightarrow 25\% \rightarrow 50\% \rightarrow 100\%$).
- **Instant Rollback**: Utilizing blue-green DNS or Kubernetes service selectors to instantly revert to the previous container image within seconds if alerts trigger.

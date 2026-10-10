---
title: Deployment Strategies — Rolling, Blue-Green, and Canary
subject: DevOps
category: DevOps & Cloud
difficulty: medium
importance: high
tags:
  - devops
  - deployments
  - blue-green
  - canary
  - zero-downtime
---

# Modern Deployment Strategies for Zero-Downtime Releases

Releasing updates into production requires strategies that balance speed, risk, resource overhead, and instant rollback capabilities.

---

## 1. Overview of Deployment Strategies

```
1. ROLLING UPDATE (Default Kubernetes)
   v1 v1 v1 v1  ──►  v1 v1 v2 v2  ──►  v2 v2 v2 v2
   (Gradually replaces instances; lowest resource overhead; mixed versions co-exist)

2. BLUE / GREEN DEPLOYMENT
   [Router] ──► [Blue: v1 (Active 100%)]
                [Green: v2 (Idle/Testing 0%)]
   *Switch router traffic instantaneously once Green is verified*

3. CANARY DEPLOYMENT
   [Router] ──► 90% traffic to v1 (Stable baseline)
            ──► 10% traffic to v2 (Canary evaluating error rates & APM telemetry)
```

---

## 2. Comparison Matrix

| Strategy | Downtime | Risk | Extra Cost | Rollback Speed |
|---|---|---|---|---|
| **Recreate** | Yes (brief) | High | None | Slow (redeploy old version) |
| **Rolling Update** | Zero | Moderate | Minimal (temporary extra pods) | Moderate (roll back replica sets) |
| **Blue/Green** | Zero | Low | High (2x full environment) | Instant (router switch back) |
| **Canary** | Zero | Lowest | Low-Moderate | Fast (drain canary traffic) |

---

## 3. Canary Releases with Service Meshes (Istio/Argo Rollouts)

Canary deployments often leverage traffic-routing rules defined in service meshes or ingress controllers:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: checkout-service
spec:
  replicas: 10
  strategy:
    canary:
      steps:
        - setWeight: 10
        - pause: { duration: 15m }  # Evaluate Prometheus error rate
        - setWeight: 50
        - pause: { duration: 30m }
        - setWeight: 100
```

---

## 4. Key Terminology & Interview Questions

### Q1: What database migration challenges arise during Rolling or Canary releases?
Because version 1 and version 2 run concurrently during the rollout, database schema changes must be backward-compatible (the **Expand and Contract pattern**):
1. **Expand:** Add new columns without deleting or modifying old columns.
2. **Transition:** Deploy new code that writes to both old and new columns, reading from the new.
3. **Contract:** Once all instances run the new code, drop old columns and constraints.

### Q2: When is Blue/Green preferable over Canary?
When business requirements demand instantaneous switchover across an entire transactional boundary, or when backwards compatibility between client and backend versions cannot be maintained across mixed running instances.

### Q3: What is "Shadow / Dark Launching"?
Production traffic is mirrored (duplicated) using an ingress or service mesh to send a copy of real incoming requests to the new service version without returning its response to the user. This tests load capacity and latency on real production workloads with zero user impact.

---
title: Kubernetes Troubleshooting and Autoscaling (HPA & VPA)
subject: Kubernetes
category: DevOps & Cloud
difficulty: hard
importance: high
tags:
  - kubernetes
  - troubleshooting
  - hpa
  - vpa
  - autoscaling
  - crashloopbackoff
---

# Kubernetes Production Troubleshooting and Autoscaling

Operating Kubernetes in production requires deep familiarity with common Pod failure states, diagnostic commands, and automated elasticity via the **Horizontal Pod Autoscaler (HPA)**.

---

## 1. Common Pod Error States and Fixes

```
┌─────────────────────────┬───────────────────────────────┬──────────────────────────────────┐
│ Status                  │ Root Cause                    │ Diagnostic Command               │
├─────────────────────────┼───────────────────────────────┼──────────────────────────────────┤
│ `CrashLoopBackOff`      │ App exits with non-zero code  │ `kubectl logs <pod> --previous`  │
│ `ImagePullBackOff`      │ Image name typo / bad secret  │ `kubectl describe pod <pod>`     │
│ `Pending`               │ Insufficient CPU/Memory/Nodes │ `kubectl describe pod <pod>`     │
│ `OOMKilled` (Exit 137)  │ Exceeded container RAM limit  │ `kubectl get pod <pod> -o yaml`  │
│ `CreateContainerConfig` │ Missing ConfigMap or Secret   │ `kubectl describe pod <pod>`     │
└─────────────────────────┴───────────────────────────────┴──────────────────────────────────┘
```

### Essential Diagnostic Commands
```bash
# View recent events in a namespace (critical for scheduling & crash issues)
kubectl get events --sort-by='.metadata.creationTimestamp' -n production

# View pod logs with timestamps and follow output
kubectl logs -f deployment/order-service -n production --tail=100 --timestamps

# Execute interactive shell inside running container
kubectl exec -it <pod-name> -n production -- /bin/sh

# Port-forward directly to a pod or service for local debugging
kubectl port-forward svc/order-service 8080:80 -n production
```

---

## 2. Horizontal Pod Autoscaling (HPA)

The **Horizontal Pod Autoscaler (HPA)** automatically scales the number of Pod replicas in a deployment based on observed CPU utilization, memory, or custom metrics (e.g., SQS queue depth).

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: order-service-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: order-service
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 75
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300 # Prevent flapping
```

---

## 3. Cluster Autoscaler & Karpenter

When HPA spawns new pods that cannot fit on existing worker nodes (Pods enter `Pending` state), node autoscalers add physical/virtual EC2 nodes to the cluster:
- **Cluster Autoscaler:** Reconciles node groups based on pending pods.
- **Karpenter:** Modern open-source node autoscaler designed for AWS that provisions right-sized EC2 compute instances within seconds without rigid node groups.

---

## 4. Key Terminology & Interview Questions

### Q1: What causes a `CrashLoopBackOff` error and how do you debug it?
`CrashLoopBackOff` indicates that the container started, failed/exited, and Kubernetes attempted to restart it with an exponential backoff delay.
- Run `kubectl describe pod <pod>` to inspect exit codes and events.
- Run `kubectl logs <pod> --previous` to see the log output produced right before the container crashed (often a syntax error, failed DB connection, or uncaught exception).

### Q2: Why is the Metrics Server required for HPA to function?
HPA queries the Kubernetes Metrics API (`metrics.k8s.io`) to retrieve current CPU and memory consumption. Without the **Metrics Server** running in the cluster, HPA has no metric data and cannot evaluate scaling thresholds.

### Q3: What is "Flapping" (or Thrashing) in autoscaling, and how is it prevented?
Flapping occurs when an autoscaler rapidly scales pods up, utilization drops, scales them down, utilization spikes, and repeats in an unstable cycle. Kubernetes mitigates this using a **stabilization window** (default 5 minutes for scale-down) to ensure metrics remain sustained before destroying replicas.

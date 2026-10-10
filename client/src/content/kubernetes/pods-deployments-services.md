---
title: Pods, Deployments, and Services in Kubernetes
subject: Kubernetes
category: DevOps & Cloud
difficulty: medium
importance: high
tags:
  - kubernetes
  - pods
  - deployments
  - services
  - clusterip
  - nodeport
---

# Pods, Deployments, and Services in Kubernetes

Understanding how workloads are packaged into **Pods**, managed declaratively via **Deployments**, and exposed through **Services** forms the core of Kubernetes application engineering.

---

## 1. Object Hierarchy

```
DEPLOYMENT (Manages declarative updates and rollbacks)
    │
    ▼
REPLICASET (Ensures exact count of pod replicas are running)
    │
    ▼
PODS (Smallest deployable unit; shares network namespace & IP)
    ├── Container 1 (Primary app container)
    └── Container 2 (Sidecar logger / proxy)
```

---

## 2. Production Deployment Manifest

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
  namespace: production
  labels:
    app: order-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: order-service
  template:
    metadata:
      labels:
        app: order-service
    spec:
      containers:
        - name: order-app
          image: order-service:v2.1.0
          ports:
            - containerPort: 8080
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
          readinessProbe:
            httpGet:
              path: /health/ready
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /health/live
              port: 8080
            initialDelaySeconds: 15
            periodSeconds: 20
```

---

## 3. Kubernetes Service Types

A **Service** provides a stable virtual IP (VIP) and DNS name that load-balances traffic across ephemeral pods matching specific labels:

| Service Type | Scope & Routing | Common Use Case |
|---|---|---|
| **ClusterIP** (Default) | Internal-only VIP reachable only within the Kubernetes cluster | Backend microservices, internal databases |
| **NodePort** | Opens a static port on each worker node (`30000-32767`) | Development or legacy direct external access |
| **LoadBalancer** | Provisions a cloud provider load balancer (AWS NLB, GCP LB) | Direct external ingress for production services |
| **ExternalName** | Maps service DNS to an external CNAME (e.g. `db.aws.com`) | Referencing external third-party services |

```yaml
apiVersion: v1
kind: Service
metadata:
  name: order-service
spec:
  type: ClusterIP
  selector:
    app: order-service
  ports:
    - port: 80
      targetPort: 8080
```

---

## 4. Key Terminology & Interview Questions

### Q1: What is the difference between a Liveness Probe and a Readiness Probe?
- **Liveness Probe:** Checks if the container process is alive and healthy. If it fails, `kubelet` terminates and **restarts** the container.
- **Readiness Probe:** Checks if the container is ready to accept incoming user traffic. If it fails, the pod is temporarily removed from the Service's Endpoints pool (no traffic is routed to it), but the container is **not** restarted.

### Q2: Why should you never deploy a bare Pod directly in production?
Bare Pods (created with `kind: Pod`) are not managed by a controller. If the worker node hosting a bare pod crashes, or the node runs out of memory, the pod dies permanently and will never be rescheduled onto another node. Deployments and ReplicaSets guarantee resilience and auto-replacement.

### Q3: What is the difference between Resource Requests and Limits?
- **Requests:** Guaranteed minimum compute resources reserved by `kube-scheduler` when choosing a node to place the pod.
- **Limits:** Hard ceiling enforced by Linux cgroups. If a container exceeds its CPU limit, it is throttled. If it exceeds its Memory limit, it is killed with an OOM error.

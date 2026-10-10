---
title: Kubernetes Architecture and Control Plane Internals
subject: Kubernetes
category: DevOps & Cloud
difficulty: hard
importance: high
tags:
  - kubernetes
  - k8s
  - control-plane
  - etcd
  - apiserver
  - scheduler
---

# Kubernetes Architecture and Control Plane Internals

Kubernetes is a declarative container orchestration platform. A cluster consists of a **Control Plane** (managing cluster state) and **Worker Nodes** (running containerized workloads).

---

## 1. High-Level Cluster Architecture

```
CONTROL PLANE (Master Nodes)
┌─────────────────────────────────────────────────────────────┐
│  API Server (`kube-apiserver`)  ◄── [kubectl / Clients]     │
│       ▲           ▲           ▲                             │
│       │           │           │                             │
│  ┌────▼────┐ ┌────▼────┐ ┌────▼─────────────┐               │
│  │  etcd   │ │Scheduler│ │Controller-Manager│               │
│  │ (Raft DB)││         │ │ (Reconciliation) │               │
│  └─────────┘ └─────────┘ └──────────────────┘               │
└──────────────────────┬──────────────────────────────────────┘
                       │ gRPC / TLS
                       ▼
WORKER NODES
┌─────────────────────────────────────────────────────────────┐
│ Node 1                                                      │
│  ├── `kubelet` (Node agent ensuring Pods run as spec'd)     │
│  ├── `kube-proxy` (Maintains iptables/IPVS network rules)   │
│  └── Container Runtime (containerd / CRI-O)                 │
│        └── Pod A [Container 1] │ Pod B [Container 2]        │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Control Plane Components

1. **`kube-apiserver`:** The single front-door to the cluster. Exposes the Kubernetes REST API, handles authentication, authorization (RBAC), and schema validation. The ONLY component that directly communicates with `etcd`.
2. **`etcd`:** Highly available, distributed key-value store using the **Raft consensus algorithm**. Stores the complete single source of truth for all cluster objects.
3. **`kube-scheduler`:** Watches for newly created Pods with no assigned node (`spec.nodeName == ""`) and selects the optimal node based on resource requests, taints/tolerations, affinity, and topology.
4. **`kube-controller-manager`:** Runs continuous control loops (Node Controller, ReplicaSet Controller, Deployment Controller) comparing actual state against desired state (**Reconciliation Loop**).

---

## 3. Worker Node Components

1. **`kubelet`:** The primary node agent. Watches PodSpecs assigned to its node and instructs the container runtime (via CRI) to launch or restart containers, monitoring their liveness and readiness probes.
2. **`kube-proxy`:** Manages network packet routing to Pod IPs by synchronizing host Linux kernel `iptables` or `IPVS` rules whenever Services or Endpoints change.
3. **Container Runtime Interface (CRI):** Modern Kubernetes uses `containerd` or `CRI-O` (Docker shim was removed in Kubernetes v1.24).

---

## 4. Key Terminology & Interview Questions

### Q1: What happens if `etcd` goes down or loses quorum?
If `etcd` loses quorum (e.g. 2 nodes fail in a 3-node cluster), the control plane becomes read-only and will reject any modifications or new pod creation requests. However, **existing running pods continue to operate normally** on the worker nodes because the kubelet and container runtime maintain their current local execution state.

### Q2: Why is the Kubernetes API server the only component that accesses `etcd`?
Restricting all database queries through `kube-apiserver` guarantees that every state transition passes through authentication, authorization (RBAC), admission webhooks, and schema validation, maintaining strict data integrity and consistency.

### Q3: What is the Reconciliation Loop?
The fundamental control design pattern in Kubernetes:
```
while true:
    desired_state = get_desired_state_from_etcd()
    actual_state = observe_actual_cluster_state()
    difference = calculate_diff(desired_state, actual_state)
    if difference:
        execute_actions_to_reconcile(difference)
```
Controllers continually drive the actual state toward the declared desired state.

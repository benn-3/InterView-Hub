---
title: Kubernetes Ingress, Network Policies, and CNI
subject: Kubernetes
category: DevOps & Cloud
difficulty: hard
importance: high
tags:
  - kubernetes
  - ingress
  - cni
  - network-policy
  - calico
  - cilium
---

# Kubernetes Ingress, Network Policies, and CNI

Kubernetes networking guarantees that every Pod receives its own unique IP address and can communicate with every other Pod in the cluster without Network Address Translation (NAT).

---

## 1. The Container Network Interface (CNI)

Kubernetes offloads network plumbing to third-party CNI plugins (e.g., Calico, Flannel, AWS VPC CNI, Cilium):
- Assigns IP addresses (IPAM) to Pod network namespaces.
- Configures virtual ethernet pairs (`veth`) connecting Pods to host network bridges or eBPF programs.
- Implements packet encapsulation (VXLAN, Geneve) or native VPC routing.

---

## 2. Ingress Controllers and Layer 7 Routing

Rather than provisioning an expensive cloud LoadBalancer for every single microservice, an **Ingress Controller** (e.g., Ingress-NGINX, Traefik) provides a single reverse proxy entry point routing HTTP/HTTPS traffic based on Host and Path rules.

```
Internet (https://api.example.com/users)
     │
     ▼
[Cloud LoadBalancer / Public IP]
     │
     ▼
[Ingress Controller (NGINX Pods)]
     ├── /users ──► User Service (ClusterIP) ──► [Pod 1] [Pod 2]
     └── /orders ──► Order Service (ClusterIP) ──► [Pod 3] [Pod 4]
```

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-ingress
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - api.example.com
      secretName: api-tls-cert
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /users
            pathType: Prefix
            backend:
              service:
                name: user-service
                port:
                  number: 80
```

---

## 3. Zero-Trust Security with NetworkPolicies

By default, Kubernetes pods are non-isolated and can send/receive traffic to/from any other pod in the cluster. A **NetworkPolicy** acts as a stateful firewall:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-only-api-to-db
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: postgres-db
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: user-service
      ports:
        - protocol: TCP
          port: 5432
```

---

## 4. Key Terminology & Interview Questions

### Q1: What is the difference between an Ingress and a Service of type LoadBalancer?
- **Service (LoadBalancer):** Operates at Layer 4 (TCP/UDP). Provisions a distinct cloud load balancer per service, which becomes expensive and does not support URL path routing or TLS termination.
- **Ingress:** Operates at Layer 7 (HTTP/HTTPS). Routes traffic from a single public IP/LB across dozens of internal backend services using path/host rules, custom SSL certificates, and middleware.

### Q2: Why might NetworkPolicies fail to enforce restrictions even when configured correctly?
NetworkPolicies are declarative API resources that require a CNI plugin with NetworkPolicy support (such as **Calico**, **Cilium**, or **Weave**). If a cluster runs a basic CNI like Flannel without a policy engine, NetworkPolicy manifests are silently ignored by the cluster.

### Q3: How does Cilium differ from standard iptables-based networking?
Cilium uses Linux **eBPF (Extended Berkeley Packet Filter)** in the kernel rather than evaluating thousands of linear `iptables` rules. eBPF provides $O(1)$ packet filtering, significantly lower latency, granular Layer 7 network observability, and transparent encryption.

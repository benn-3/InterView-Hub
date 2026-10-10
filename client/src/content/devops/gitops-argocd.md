---
title: GitOps Principles and ArgoCD
subject: DevOps
category: DevOps & Cloud
difficulty: hard
importance: high
tags:
  - devops
  - gitops
  - argocd
  - kubernetes
  - declarative
---

# GitOps Principles and Continuous Delivery with ArgoCD

**GitOps** is an operating model for cloud-native applications where Git repositories serve as the single source of truth for declared infrastructure and application states.

---

## 1. Core Principles of GitOps

```
┌─────────────────────────────────┐
│ Git Repository                  │
│ (Declarative YAML / Helm / Kustomize)
└──────────────┬──────────────────┘
               │ 1. Code Review (Pull Request)
               │ 2. Merge to Main
               ▼
┌─────────────────────────────────┐
│ ArgoCD Controller               │
│ (Reconciler inside K8s cluster) │
└──────────────┬──────────────────┘
               │ Pull-based sync
               ▼
┌─────────────────────────────────┐
│ Target Kubernetes Cluster       │
│ Desired State == Actual State   │
└─────────────────────────────────┘
```

1. **Declarative Descriptions:** The entire desired state of the system is described declaratively (e.g., Kubernetes YAML, Helm charts).
2. **Version Controlled & Immutable:** The desired state is stored in Git, giving full audit logs, cryptographic signatures, and instant revert capabilities.
3. **Automated Pull Reconciliation:** Software agents run inside the cluster to continually compare actual state against declared Git state.
4. **Self-Healing:** If someone makes manual changes to the live cluster (`kubectl edit`), the GitOps operator detects drift and restores the Git-defined configuration.

---

## 2. Push-Based vs Pull-Based CD

| Dimension | Push-Based CD (Jenkins, GitLab CI) | Pull-Based GitOps (ArgoCD, Flux) |
|---|---|---|
| **Cluster Access** | CI runner must possess cluster admin credentials | No outside access needed; Agent lives inside cluster |
| **Firewall** | Inbound firewall ports must be open to CI | Only outbound HTTPS access to Git repo is needed |
| **Drift Detection** | None (only acts on commits) | Continuous background monitoring and auto-healing |
| **Security Risk** | High blast radius if CI server is breached | Lower blast radius; no external write permissions |

---

## 3. ArgoCD Application Manifest Example

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: payments-microservice
  namespace: argocd
spec:
  project: default
  source:
    repoURL: 'https://github.com/organization/gitops-deployments.git'
    targetRevision: HEAD
    path: environments/production/payments
  destination:
    server: 'https://kubernetes.default.svc'
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
```

---

## 4. Key Terminology & Interview Questions

### Q1: What happens in ArgoCD if an engineer manually edits a deployment using `kubectl`?
If `selfHeal: true` is enabled in the Application's `syncPolicy`, ArgoCD immediately flags an **OutOfSync** drift event and resets the cluster deployment back to the declarative state committed in Git.

### Q2: What is the purpose of `prune: true` in GitOps sync policies?
By default, deleting a manifest from Git might leave the corresponding Kubernetes resource running in the cluster. Setting `prune: true` instructs the operator to automatically garbage-collect and delete live cluster resources when their YAML declarations are removed from the repository.

### Q3: How do you handle secrets safely in a GitOps workflow?
Never commit plaintext secrets to Git. Standard solutions include:
- **HashiCorp Vault / External Secrets Operator (ESO):** Commit `ExternalSecret` manifests that fetch values dynamically from Vault or AWS Secrets Manager into native Kubernetes secrets.
- **Sealed Secrets:** Asymmetric encryption allowing developers to commit encrypted secrets safe for public Git that only the cluster controller can decrypt.


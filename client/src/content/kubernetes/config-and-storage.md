---
title: Kubernetes Storage and Configuration — PV, PVC, and Secrets
subject: Kubernetes
category: DevOps & Cloud
difficulty: medium
importance: high
tags:
  - kubernetes
  - storage
  - pv
  - pvc
  - configmap
  - secrets
  - storageclass
---

# Kubernetes Storage and Configuration: PV, PVC, and Secrets

Stateless applications scale effortlessly, but stateful workloads (databases, message queues) require decoupled configuration and persistent disk storage surviving pod restarts.

---

## 1. Decoupled Storage Architecture

Kubernetes separates storage requests from storage provisioning using a two-tier abstraction:

```
STORAGE ADMINISTRATOR              DEVELOPER / WORKLOAD
┌─────────────────────────┐        ┌─────────────────────────┐
│ StorageClass            │        │ PersistentVolumeClaim   │
│ (e.g. AWS gp3 / EBS CSI)│        │ (PVC: "I need 50Gi SSD")│
└───────────┬─────────────┘        └───────────┬─────────────┘
            │                                  │
            ▼                                  ▼
   [Dynamic Provisioning] ────────────► [Binds PV to PVC]
            │
            ▼
┌─────────────────────────┐
│ PersistentVolume (PV)   │ ◄── Mounted to Pod via VolumeMount
│ (Actual disk volume)    │
└─────────────────────────┘
```

---

## 2. Dynamic Volume Provisioning Manifest

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
  namespace: production
spec:
  accessModes:
    - ReadWriteOnce   # Mounted as read-write by a single node
  storageClassName: gp3
  resources:
    requests:
      storage: 20Gi
```

### Access Modes:
- **ReadWriteOnce (RWO):** Volume can be mounted as read-write by a single node. Standard for block storage (EBS, Google Persistent Disk).
- **ReadOnlyMany (ROX):** Volume can be mounted as read-only by multiple nodes.
- **ReadWriteMany (RWX):** Volume can be mounted as read-write by multiple nodes simultaneously. Requires distributed network filesystems (NFS, AWS EFS, Ceph).

---

## 3. ConfigMaps and Secrets

Configuration and sensitive credentials must never be baked into container images:

```yaml
# ConfigMap for non-sensitive environment variables
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_ENV: "production"
  LOG_LEVEL: "info"
---
# Secret for sensitive credentials (Base64 encoded)
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
data:
  # Base64 encoded: echo -n "secret123" | base64
  DB_PASSWORD: c2VjcmV0MTIz
```

### Pod Consuming Configuration:
```yaml
envFrom:
  - configMapRef:
      name: app-config
  - secretRef:
      name: db-credentials
```

---

## 4. Key Terminology & Interview Questions

### Q1: What is the difference between a PersistentVolume (PV) and a PersistentVolumeClaim (PVC)?
- **PV (Persistent Volume):** A physical or cloud storage resource provisioned in the cluster (like an AWS EBS volume or NFS share).
- **PVC (Persistent Volume Claim):** A developer's request for storage with specific capacity and access modes. Kubernetes matches and binds the PVC to a suitable PV.

### Q2: Why are standard Kubernetes Secrets NOT secure by default?
Standard Kubernetes secrets are merely Base64-encoded plain text, not encrypted. Anyone with `get secrets` RBAC access can decode them (`echo <val> | base64 -d`). To secure secrets in production, you must:
1. Enable **Encryption at Rest** in `etcd` with KMS providers.
2. Integrate with external vaults via the **Secrets Store CSI Driver** or HashiCorp Vault.

### Q3: What happens to a PV when its PVC is deleted?
The outcome is determined by the **Reclaim Policy** (`persistentVolumeReclaimPolicy`):
- **Retain:** The PV remains intact; data is preserved for manual recovery by an administrator.
- **Delete:** The PV and the underlying cloud disk (e.g. AWS EBS volume) are automatically deleted.

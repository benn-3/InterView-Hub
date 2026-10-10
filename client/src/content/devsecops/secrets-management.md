---
title: Enterprise Secrets Management and HashiCorp Vault
subject: DevSecOps
category: DevOps & Cloud
difficulty: hard
importance: high
tags:
  - devsecops
  - secrets
  - vault
  - encryption
  - rotation
  - zero-trust
---

# Enterprise Secrets Management and HashiCorp Vault

Hardcoded credentials in repositories, configuration files, and container environments remain one of the most common vectors for cloud data breaches.

---

## 1. Secrets Management Lifecycle

```
             ┌─────────────────────────┐
             │       GENERATION        │ (Cryptographically strong entropy)
             └────────────┬────────────┘
                          ▼
             ┌─────────────────────────┐
             │   STORAGE & ENCRYPTION  │ (AES-256 GCM in Vault / KMS)
             └────────────┬────────────┘
                          ▼
             ┌─────────────────────────┐
             │  AUTHORIZATION & ACCESS │ (Identity-based, temporary leases)
             └────────────┬────────────┘
                          ▼
             ┌─────────────────────────┐
             │  AUTOMATED ROTATION     │ (Dynamic database credentials)
             └────────────┬────────────┘
                          ▼
             ┌─────────────────────────┐
             │  REVOCATION & AUDIT     │ (Instant lease cancellation)
             └─────────────────────────┘
```

---

## 2. Dynamic Secrets with HashiCorp Vault

Unlike static passwords that linger unchanged for years, HashiCorp Vault generates **Dynamic Secrets** on-demand with short lifespans (Time-To-Live, TTL):

```
Application ──► 1. Authenticates to Vault with K8s ServiceAccount token
            ──► 2. Requests PostgreSQL credentials for `readonly_role`
            │
Vault       ──► 3. Connects to Postgres: `CREATE USER v_token_1234 WITH PASSWORD 'xyz';`
            ──► 4. Returns temporary credentials to App with 1-hour TTL
            │
(1 Hour Passes)
Vault       ──► 5. Automatically runs: `DROP USER v_token_1234;` in Postgres
```

---

## 3. Detecting Secrets in Git Repositories

### Pre-commit Hooks with GitLeaks
Run secret scanning automatically before commits are added to Git history:
```bash
# Scan repository locally
gitleaks detect --source . -v

# Pre-commit configuration (.pre-commit-config.yaml)
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.0
    hooks:
      - id: gitleaks
```

---

## 4. Key Terminology & Interview Questions

### Q1: What should you do if an AWS secret key is accidentally committed to a public Git repository?
1. **Immediately revoke / deactivate** the exposed access key in the AWS IAM Console or CLI.
2. Check **AWS CloudTrail** logs for unauthorized API activity originating from the compromised credential.
3. Generate and deploy a new credential.
4. **Rewrite Git history** using `git-filter-repo` or BFG Repo-Cleaner (simply deleting the file in a subsequent commit leaves the secret accessible in Git commit history).

### Q2: What is the concept of "Secret Zero"?
"Secret Zero" is the fundamental initial bootstrapping secret or identity token that an application needs in order to authenticate to a central secrets vault (e.g. Vault, AWS Secrets Manager). Modern systems solve Secret Zero using **IAM Roles for EC2/ECS** or **Kubernetes Service Account Token Volume Projection**, eliminating hardcoded bootstrap tokens.

### Q3: How does Envelope Encryption work?
Envelope encryption uses a two-tier key model:
1. Data is encrypted using a **Data Encryption Key (DEK)** via symmetric AES-256.
2. The DEK is then encrypted using a **Key Encryption Key (KEK)** managed in a secure Hardware Security Module (HSM) or cloud KMS.
3. Only the encrypted DEK and ciphertext are stored, minimizing communication with the central KMS.

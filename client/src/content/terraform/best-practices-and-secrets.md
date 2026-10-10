---
title: Terraform Enterprise Best Practices and Secrets Management
subject: Terraform
category: DevOps & Cloud
difficulty: hard
importance: high
tags:
  - terraform
  - secrets
  - security
  - tfsec
  - tflint
  - best-practices
---

# Terraform Enterprise Best Practices and Secrets Management

Operating Infrastructure as Code at enterprise scale requires rigorous linting, static analysis, secrets isolation, and workspace separation.

---

## 1. Secrets Management Patterns

Never hardcode database passwords, private API keys, or certificates into `.tf` files or unencrypted variable files.

### Recommended Approaches:
```
1. AWS Secrets Manager / HashiCorp Vault (Dynamic Resolution)
   Terraform fetches secret at apply-time; no credentials in code.

2. Environment Variables (`TF_VAR_name`)
   Set in secure CI/CD runners (GitHub Actions Secrets).

3. Sensitive Variables Flag
   Marks variables as sensitive so values are masked in CLI logs.
```

```hcl
variable "db_password" {
  type        = string
  sensitive   = true # Suppresses output in terraform plan and console logs
}

# Reading directly from AWS Secrets Manager
data "aws_secretsmanager_secret_version" "db_creds" {
  secret_id = "production/rds/credentials"
}

locals {
  db_creds = jsondecode(data.aws_secretsmanager_secret_version.db_creds.secret_string)
}

resource "aws_db_instance" "prod_db" {
  allocated_storage = 20
  engine            = "postgres"
  username          = local.db_creds.username
  password          = local.db_creds.password
}
```

---

## 2. Directory Layout: Workspaces vs Directory Separation

While Terraform provides built-in `terraform workspace` commands, enterprise architectures strongly recommend **Directory-based environment separation**:

```
terraform/
├── environments/
│   ├── dev/
│   │   ├── main.tf        (Backend: key = "dev/terraform.tfstate")
│   │   └── terraform.tfvars
│   ├── staging/
│   │   ├── main.tf
│   │   └── terraform.tfvars
│   └── prod/
│       ├── main.tf        (Backend: key = "prod/terraform.tfstate", separate AWS account)
│       └── terraform.tfvars
└── modules/
    ├── vpc/
    └── eks/
```

### Why Directory Separation is Superior:
- Eliminates the risk of running `terraform destroy` in prod while assuming you were in dev.
- Allows completely independent state files, cloud accounts, and IAM permissions per environment.

---

## 3. Static Code Analysis & Policy as Code

1. **`tflint`:** Catches provider-specific deprecations, invalid EC2 instance types, and missing tags before `plan`.
2. **`tfsec` / Trivy:** Scans for security misconfigurations (open security groups `0.0.0.0/0`, unencrypted S3 buckets).
3. **OPA (Open Policy Agent) / Sentinel:** Enforces organization-wide guardrails (e.g. "Reject any EBS volume without KMS encryption").

---

## 4. Key Terminology & Interview Questions

### Q1: Does marking a variable `sensitive = true` encrypt it in the `.tfstate` file?
**No!** Setting `sensitive = true` only prevents the variable from being rendered in plain text within console logs and `terraform plan` output. The raw unencrypted value **is still written to the `terraform.tfstate` JSON file**. Therefore, encrypting the state backend (S3 bucket KMS encryption and restricted IAM policies) is mandatory.

### Q2: What is the purpose of Terraform Workspaces and when should you avoid them?
Workspaces allow multiple states within the same backend configuration. They are suitable for testing temporary feature branches, but are discouraged for production environment isolation (dev vs staging vs prod) because they share identical backend credentials and single-line typos can target production.

### Q3: What is the benefit of using Terragrunt?
Terragrunt is a thin wrapper for Terraform that provides extra tools for keeping configurations DRY, managing remote state backends across dozens of modules automatically, and orchestrating dependency execution across multiple decoupled Terraform states.

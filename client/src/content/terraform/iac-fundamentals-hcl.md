---
title: Terraform Fundamentals and HashiCorp Configuration Language (HCL)
subject: Terraform
category: DevOps & Cloud
difficulty: medium
importance: high
tags:
  - terraform
  - iac
  - hcl
  - providers
  - resources
  - variables
---

# Terraform Fundamentals and HCL Syntax

Terraform is an open-source **Infrastructure as Code (IaC)** tool that codifies cloud APIs into declarative configuration files, enabling versioned, repeatable, and automated cloud provisioning.

---

## 1. Core Terraform Workflow

```
   ┌───────────────────────┐
   │ 1. Write HCL Code     │ (main.tf, variables.tf)
   └───────────┬───────────┘
               ▼
   ┌───────────────────────┐
   │ 2. `terraform init`   │ (Downloads provider plugins & modules)
   └───────────┬───────────┘
               ▼
   ┌───────────────────────┐
   │ 3. `terraform plan`   │ (Dry-run: compares code vs state vs cloud)
   └───────────┬───────────┘
               ▼
   ┌───────────────────────┐
   │ 4. `terraform apply`  │ (Provisions infrastructure via cloud APIs)
   └───────────────────────┘
```

---

## 2. HCL Syntax and Core Blocks

Terraform configurations are written in **HashiCorp Configuration Language (HCL)**.

```hcl
# 1. Terraform Settings & Required Providers
terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# 2. Provider Block
provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# 3. Variable Definitions
variable "aws_region" {
  type        = string
  description = "The target AWS region"
  default     = "us-east-1"
}

variable "environment" {
  type        = string
  description = "Deployment environment"
  default     = "production"
}

# 4. Resource Block
resource "aws_s3_bucket" "artifacts" {
  bucket        = "company-${var.environment}-artifacts-bucket"
  force_destroy = false
}

# 5. Output Block
output "bucket_arn" {
  description = "ARN of the provisioned S3 bucket"
  value       = aws_s3_bucket.artifacts.arn
}
```

---

## 3. Data Sources vs Resources

- **`resource` Block:** Instructs Terraform to **create, manage, and destroy** an infrastructure component (e.g. `resource "aws_vpc" "main"`).
- **`data` Block:** Allows Terraform to **read information from existing resources** created outside of this configuration (e.g., querying the latest Amazon Linux AMI ID):

```hcl
data "aws_ami" "ubuntu" {
  most_recent = true
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
  owners = ["099720109477"] # Canonical
}
```

---

## 4. Key Terminology & Interview Questions

### Q1: What is the difference between Declarative and Imperative Infrastructure as Code?
- **Declarative (Terraform, CloudFormation, Kubernetes):** You declare the **desired end state** (e.g. "I want 3 EC2 instances"). The tool calculates the current state and computes the delta needed to reach the desired state.
- **Imperative (Ansible, Bash, Python scripts):** You write explicit procedural step-by-step instructions (e.g. "Create instance, install package, start service"). If run multiple times, imperative scripts can cause drift unless explicitly written to be idempotent.

### Q2: What happens during `terraform init`?
`terraform init` initializes the working directory by:
1. Reading configuration files to discover provider requirements (`hashicorp/aws`).
2. Downloading provider binaries into the `.terraform/providers` directory.
3. Downloading remote child modules.
4. Initializing the remote backend state connection (e.g., S3 bucket and DynamoDB table).

### Q3: What is the purpose of the `.terraform.lock.hcl` file?
The lock file records the exact version and cryptographic checksums of provider plugins used. Committing this file to version control ensures that every team member and CI runner downloads the exact identical provider binaries, preventing breaking changes caused by unpinned provider updates.

---
title: Terraform Modules, Structure, and Reusability
subject: Terraform
category: DevOps & Cloud
difficulty: medium
importance: high
tags:
  - terraform
  - modules
  - dry
  - reusability
  - variables
---

# Terraform Modules, Structure, and Reusable Architecture

**Modules** are containers for multiple resources that are used together. They allow infrastructure developers to adhere to the DRY (Don't Repeat Yourself) principle and standardize enterprise cloud architectures.

---

## 1. Standard Module File Structure

A production Terraform module follows a clean, standardized structure:

```
modules/aws-vpc/
├── main.tf        # Core resource definitions (VPC, subnets, IGW, route tables)
├── variables.tf   # Input variables accepted by the module
├── outputs.tf     # Return values exported for calling configurations
├── versions.tf    # Required Terraform and provider version constraints
└── README.md      # Documentation, inputs, outputs, and examples
```

---

## 2. Writing a Reusable Child Module

### `modules/aws-vpc/variables.tf`:
```hcl
variable "vpc_cidr" {
  type        = string
  description = "CIDR block for the VPC"
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  type        = list(string)
  description = "List of CIDR blocks for public subnets"
}

variable "environment" {
  type        = string
  description = "Deployment environment name (dev, staging, prod)"
}
```

### `modules/aws-vpc/main.tf`:
```hcl
resource "aws_vpc" "this" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "${var.environment}-vpc"
    Environment = var.environment
  }
}

resource "aws_subnet" "public" {
  count                   = length(var.public_subnet_cidrs)
  vpc_id                  = aws_vpc.this.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.environment}-public-${count.index + 1}"
  }
}
```

### `modules/aws-vpc/outputs.tf`:
```hcl
output "vpc_id" {
  description = "ID of the created VPC"
  value       = aws_vpc.this.id
}

output "public_subnet_ids" {
  description = "List of public subnet IDs"
  value       = aws_subnet.public[*].id
}
```

---

## 3. Calling the Module from Root Configuration

```hcl
module "production_vpc" {
  source = "./modules/aws-vpc"

  vpc_cidr            = "10.100.0.0/16"
  public_subnet_cidrs = ["10.100.1.0/24", "10.100.2.0/24"]
  environment         = "production"
}

# Consuming module output:
resource "aws_security_group" "web_sg" {
  name   = "production-web-sg"
  vpc_id = module.production_vpc.vpc_id
}
```

---

## 4. Key Terminology & Interview Questions

### Q1: What is the difference between a Root Module and a Child Module?
- **Root Module:** The working directory containing the top-level `.tf` files where `terraform apply` is executed.
- **Child Module:** Any module invoked from within another configuration via a `module "name" { source = "..." }` block.

### Q2: Why should you version external module sources?
When referencing modules from the Terraform Registry or Git (e.g., `source = "git::https://github.com/.../vpc.git?ref=v2.4.0"`), pinning the exact version tag guarantees that upstream breaking changes or security regressions do not unexpectedly modify production infrastructure during subsequent applies.

### Q3: When should you use `count` vs `for_each` in Terraform modules?
- **`count`:** Best for creating simple duplicates. However, if an item in the middle of a list is removed, `count` re-indexes and forces destruction and recreation of subsequent resources.
- **`for_each`:** Best for resources keyed by unique names (maps or sets). Adding, deleting, or reordering elements affects only the targeted resource without disturbing others.

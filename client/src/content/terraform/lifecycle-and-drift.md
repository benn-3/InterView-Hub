---
title: Resource Lifecycle Rules and Infrastructure Drift
subject: Terraform
category: DevOps & Cloud
difficulty: hard
importance: high
tags:
  - terraform
  - lifecycle
  - create-before-destroy
  - prevent-destroy
  - drift
  - ignore-changes
---

# Terraform Resource Lifecycle and Drift Detection

By default, Terraform destroys a resource before creating its replacement when an immutable attribute is modified. Terraform **Lifecycle Meta-Arguments** provide precise control over this behavior.

---

## 1. Lifecycle Meta-Arguments

Lifecycle blocks sit inside `resource` definitions to override default create/destroy mechanics.

```hcl
resource "aws_instance" "web_server" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.medium"

  lifecycle {
    # 1. Create the new replacement instance before terminating the old one (Zero downtime)
    create_before_destroy = true

    # 2. Prevent accidental destruction of mission-critical production resources
    prevent_destroy = false

    # 3. Ignore changes made by external systems (e.g. Auto-scaling, tags added by AWS)
    ignore_changes = [
      tags["LastScannedBy"],
      user_data
    ]
  }
}
```

### Critical Rules:
1. **`create_before_destroy = true`:** Prevents downtime during updates that force replacement. *Caveat: The cloud provider must allow both old and new resource names to exist simultaneously.*
2. **`prevent_destroy = true`:** Terraform will immediately abort `terraform apply` with an error if the plan would destroy the resource (essential protection for production RDS databases).
3. **`ignore_changes`:** Disregards out-of-band updates, preventing endless drift reconciliations.

---

## 2. Infrastructure Drift Detection and Remediation

**Infrastructure Drift** happens when live cloud resources diverge from declared Terraform state, caused by:
- Emergency manual changes in the AWS Console.
- Outside automation or autoscalers modifying instance counts.
- Uncoordinated changes from another team.

```
TERRAFORM CODE             TERRAFORM STATE            LIVE CLOUD
[EC2: t3.medium]    ──►    [EC2: t3.medium]   vs    [EC2: t3.large] (Manual change!)
                                                           │
                                                           ▼
                                                DRIFT DETECTED IN PLAN
```

### Remediation Workflow:
```bash
# 1. Detect drift in read-only mode without making changes
terraform plan -refresh-only

# 2. Reconcile state with live cloud (if manual changes are accepted)
terraform apply -refresh-only

# 3. Overwrite manual changes and restore code configuration
terraform apply
```

---

## 3. Key Terminology & Interview Questions

### Q1: What happens if you run `terraform apply` after someone manually deletes an EC2 instance in the AWS Console?
During state refresh, Terraform queries AWS, discovers that the EC2 instance ID returns `NotFound`, marks the resource as destroyed in memory, and plans to **re-create the instance** to match the desired code definition.

### Q2: Why can `create_before_destroy = true` fail on resources with unique name constraints?
If a resource has a hardcoded unique name (e.g. `name = "my-unique-bucket"`), Terraform tries to create the new resource with the identical name *before* destroying the old one. The cloud provider rejects the creation request with an `AlreadyExists` error.
- **Solution:** Use `name_prefix` instead of static `name`.

### Q3: How do automated CI/CD pipelines prevent configuration drift in enterprise environments?
Enterprises run scheduled cron jobs (e.g., daily at 2:00 AM) that execute `terraform plan -detailed-exitcode`. If exit code `2` is returned (meaning changes or drift are present), an alert is sent to Slack or an issue is created for investigation.

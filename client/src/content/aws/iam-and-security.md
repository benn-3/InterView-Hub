---
title: AWS Identity and Access Management (IAM) & Security
subject: AWS
category: Cloud & Infrastructure
difficulty: medium
importance: high
tags:
  - aws
  - iam
  - security
  - roles
  - policies
  - principle-of-least-privilege
---

# AWS IAM and Cloud Security Principles

AWS Identity and Access Management (IAM) provides fine-grained authorization and access control across all AWS resources adhering to the **Principle of Least Privilege**.

---

## 1. IAM Building Blocks

```
┌────────────────────────────────────────────────────────┐
│                        IAM USER                        │
│   (Long-term credentials: Console Password + Access Key)│
└────────────────────────────────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│                       IAM GROUP                        │
│   (Collection of Users inheriting policies)            │
└────────────────────────────────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│                       IAM ROLE                         │
│   (Short-term temporary credentials via AWS STS)       │
│   Assumed by: EC2 Instances, Lambdas, Cross-account    │
└────────────────────────────────────────────────────────┘
```

---

## 2. Policy Evaluation Logic

IAM policies are written in JSON. When a request arrives, AWS evaluates permissions using a strict order of precedence:

```
              ┌──────────────────────────┐
              │ Is there an EXPLICIT     │
              │         DENY?            │
              └────────────┬─────────────┘
                     YES   │     NO
            ┌──────────────┘     └──────────────┐
            ▼                                   ▼
┌───────────────────────┐           ┌────────────────────────┐
│   REQUEST IS DENIED   │           │ Is there an EXPLICIT   │
│ (Deny always overrides│           │        ALLOW?          │
│        allow)         │           └───────────┬────────────┘
└───────────────────────┘                  YES  │     NO
                                   ┌────────────┘     └────────────┐
                                   ▼                               ▼
                       ┌───────────────────────┐       ┌───────────────────────┐
                       │   REQUEST IS ALLOWED  │       │  DEFAULT DENY (DENIED)│
                       └───────────────────────┘       └───────────────────────┘
```

### Example Policy: Scoped S3 Access
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowListAndReadSpecificBucket",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::my-production-artifacts",
        "arn:aws:s3:::my-production-artifacts/*"
      ],
      "Condition": {
        "Bool": {
          "aws:SecureTransport": "true"
        }
      }
    }
  ]
}
```

---

## 3. Best Security Practices

1. **Lock Root Account:** Enable hardware Multi-Factor Authentication (MFA) and delete root access keys.
2. **Never Hardcode Credentials:** Use **IAM Roles** for EC2 (Instance Profiles) and ECS/Lambda tasks.
3. **Rotate Secrets Automatically:** Use AWS Secrets Manager for database passwords and API tokens.
4. **Audit and Monitor:** Enable **AWS CloudTrail** for API activity logging and **AWS Config** for resource compliance tracking.

---

## 4. Key Terminology & Interview Questions

### Q1: What is the difference between an IAM User and an IAM Role?
- **IAM User:** Represents a specific human or system requiring permanent long-term credentials (access keys and password).
- **IAM Role:** Has no permanent credentials; instead, an entity (EC2 instance, Lambda function, or federated external user) assumes the role via **AWS STS (Security Token Service)** to receive temporary, auto-expiring access keys.

### Q2: What is an AWS Service Control Policy (SCP)?
In **AWS Organizations**, an SCP defines the maximum permissions guardrail for member accounts. An SCP does not grant permissions directly; rather, it sets boundary limits. If an SCP denies `s3:*`, even the member account's root user cannot access S3.

### Q3: What is the purpose of the `aws:SecureTransport` condition in S3 bucket policies?
It enforces that requests must use TLS/HTTPS encryption in transit. If an HTTP request is made (`aws:SecureTransport: false`), the request is rejected immediately.

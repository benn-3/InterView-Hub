---
title: AWS Compute Services — EC2, ECS, and Serverless Lambda
subject: AWS
category: Cloud & Infrastructure
difficulty: medium
importance: high
tags:
  - aws
  - ec2
  - lambda
  - serverless
  - ecs
  - compute
---

# AWS Compute Services: EC2, ECS, and Lambda

Modern cloud architectures select compute models based on elasticity, cold-start tolerance, cost profiles, and operating overhead.

---

## 1. Compute Spectrum Comparison

```
MANAGEMENT RESPONSIBILITY ─────────────────────────────────────────►
Low (AWS managed)                                  High (User managed)
┌────────────────┬───────────────────┬───────────────────────────────┐
│ AWS Lambda     │ AWS ECS (Fargate) │ Amazon EC2                    │
├────────────────┼───────────────────┼───────────────────────────────┤
│ Serverless     │ Container-as-a-   │ Virtual Machine (IaaS)        │
│ Event-driven   │ Service           │ Full OS & Kernel control      │
│ Max 15m run    │ Long-running jobs │ Continuous workloads          │
│ Pay per ms invocation │ Pay per vCPU/GB RAM │ Pay per hour/second running │
└────────────────┴───────────────────┴───────────────────────────────┘
```

---

## 2. Amazon EC2 Deep-Dive

### Purchasing Options
1. **On-Demand:** Maximum flexibility, no long-term commitment. Ideal for short, spiky, or unpredictable workloads.
2. **Reserved Instances (RI) / Savings Plans:** 1 to 3-year commitment offering up to 72% discount. Best for steady-state baseline traffic.
3. **Spot Instances:** Bid on spare AWS capacity at up to 90% discount. AWS can reclaim instances with a 2-minute warning. Ideal for stateless batch processing, CI/CD runners, and fault-tolerant big data clusters.

### Auto Scaling Groups (ASG) & Elastic Load Balancing (ELB)
```
Internet ──► Application Load Balancer (ALB)
                 ├── Target Group 1: EC2 Instance (AZ-a)
                 ├── Target Group 1: EC2 Instance (AZ-b)
                 └── ASG dynamically adds/removes instances based on CPU / Request Count
```

---

## 3. Serverless Execution with AWS Lambda

Lambda runs stateless code in response to events (API Gateway, S3 ObjectCreated, SQS message, DynamoDB Streams).

### Lambda Execution Lifecycle
```
Event Triggered
  │
  ├─► [Cold Start]: Download code ──► Start MicroVM (Firecracker) ──► Run init code (outside handler)
  │
  └─► [Warm Invocation]: Reuse execution environment ──► Invoke Handler Function
```

### Best Practices:
- Keep initialization logic (database connections, SDK clients) outside the handler function to reuse them across warm invocations.
- Minimize deployment package size to reduce cold-start latency.
- Use **Provisioned Concurrency** for critical APIs requiring consistent sub-10ms response times.

---

## 4. Key Terminology & Interview Questions

### Q1: How do you handle database connection pooling in AWS Lambda?
Because Lambda scales horizontally by spawning concurrent execution environments, a traffic surge can exhaust PostgreSQL/MySQL connection pools.
- **Solution:** Use **AWS RDS Proxy**, an intermediate managed proxy that pools and multiplexes database connections, keeping them open while serverless functions scale up and down.

### Q2: What is the difference between an ALB (Application Load Balancer) and NLB (Network Load Balancer)?
- **ALB (Layer 7):** Inspects HTTP/HTTPS headers, paths (`/api/v1`), host routing, and integrates natively with WebSockets and gRPC.
- **NLB (Layer 4):** Operates at the TCP/UDP transport layer, handles millions of requests per second with ultra-low latency, and provides static IP addresses per Availability Zone.

### Q3: When should you NOT use AWS Lambda?
- Workloads requiring execution times longer than 15 minutes.
- Stateful applications requiring in-memory persistence between calls.
- High-throughput steady-state applications running 24/7 where reserved EC2/Fargate instances are significantly more cost-effective.

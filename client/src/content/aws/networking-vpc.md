---
title: AWS Virtual Private Cloud (VPC) & Networking
subject: AWS
category: Cloud & Infrastructure
difficulty: hard
importance: high
tags:
  - aws
  - vpc
  - subnets
  - nat-gateway
  - security-groups
  - nacl
---

# AWS Virtual Private Cloud (VPC) Architecture

An Amazon **VPC (Virtual Private Cloud)** is a logically isolated virtual network dedicated to your AWS account, providing granular control over IP addressing, subnets, routing tables, and network gateways.

---

## 1. VPC Architecture Diagram

```
AWS REGION
┌────────────────────────────────────────────────────────────────────────┐
│ VPC (CIDR: 10.0.0.0/16)                                                │
│                                                                        │
│   Internet Gateway (IGW) ◄── (Public Internet)                         │
│         ▲                                                              │
│         │ Route 0.0.0.0/0                                              │
│   ┌─────┴────────────────────────┐                                     │
│   │ Public Subnet (10.0.1.0/24)  │                                     │
│   │  [ALB / Bastion Host]        │                                     │
│   │  [NAT Gateway (Elastic IP)]  │ ──► Outbound traffic to internet     │
│   └──────────────▲───────────────┘                                     │
│                  │ Route 0.0.0.0/0                                     │
│   ┌──────────────┴───────────────┐                                     │
│   │ Private Subnet (10.0.2.0/24) │                                     │
│   │  [App Backend / Microservice]│ (No direct public inbound access)   │
│   └──────────────▲───────────────┘                                     │
│                  │                                                     │
│   ┌──────────────┴───────────────┐                                     │
│   │ Isolated Subnet (10.0.3.0/24)│                                     │
│   │  [RDS Database Cluster]      │ (No internet access at all)         │
│   └──────────────────────────────┘                                     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Security Groups vs Network ACLs (NACLs)

| Feature | Security Groups (SG) | Network Access Control Lists (NACL) |
|---|---|---|
| **Level** | Instance / Elastic Network Interface (ENI) | Subnet boundary |
| **Statefulness** | **Stateful:** If inbound traffic is allowed, outbound response is automatically allowed | **Stateless:** Both inbound and outbound traffic must be explicitly permitted |
| **Rule Evaluation** | All rules evaluated together; default deny all inbound | Rules evaluated sequentially by lowest rule number first |
| **Deny Rules** | Cannot create explicit `DENY` rules (only `ALLOW`) | Supports explicit `ALLOW` and `DENY` rules |

---

## 3. Connecting VPCs and Hybrid Environments

1. **VPC Peering:** Connects two VPCs using private IP routing. Non-transitive (VPC A peering with B, and B with C, does NOT allow A to talk to C).
2. **AWS Transit Gateway (TGW):** A central regional hub that connects hundreds of VPCs and on-premises VPNs in a hub-and-spoke model with transitive routing.
3. **VPC Endpoints (AWS PrivateLink):** Access AWS services (like S3, DynamoDB, SQS) privately from within your VPC without traversing the public internet or requiring an internet gateway.

---

## 4. Key Terminology & Interview Questions

### Q1: What is the difference between a NAT Gateway and an Internet Gateway (IGW)?
- **Internet Gateway (IGW):** Horizontally scalable, highly available VPC component that enables bidirectional communication between instances in public subnets and the internet (supports 1-to-1 NAT for public IPs).
- **NAT Gateway:** Managed service placed in a **public subnet** that allows instances in **private subnets** to initiate outbound traffic to the internet (e.g., for software updates) while preventing inbound connections from the internet.

### Q2: How many IP addresses does AWS reserve in every VPC subnet?
In every subnet, AWS reserves **5 IP addresses**:
- `.0`: Network address.
- `.1`: VPC router address.
- `.2`: AWS DNS server address.
- `.3`: Reserved for future AWS use.
- `.255`: Network broadcast address (broadcast is not supported in VPC, but address is reserved).
*Therefore, a `/24` subnet has `256 - 5 = 251` usable IPs.*

### Q3: When should you use a VPC Interface Endpoint vs a VPC Gateway Endpoint?
- **Gateway Endpoints:** Free, configured via route tables, support only **Amazon S3** and **DynamoDB**.
- **Interface Endpoints (PrivateLink):** Elastic Network Interfaces with private IP addresses in your subnet, support almost all AWS services and third-party SaaS, bill per hour + per GB processed.

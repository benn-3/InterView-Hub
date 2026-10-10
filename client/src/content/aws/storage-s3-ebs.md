---
title: AWS Storage Architectures — S3, EBS, and EFS
subject: AWS
category: Cloud & Infrastructure
difficulty: medium
importance: high
tags:
  - aws
  - s3
  - ebs
  - efs
  - storage
  - cloud
---

# AWS Storage Architectures: S3, EBS, and EFS

Cloud architectures rely on three primary storage paradigms: **Object Storage (S3)**, **Block Storage (EBS)**, and **Network File Systems (EFS)**.

---

## 1. Storage Comparison Matrix

| Feature | Amazon S3 | Amazon EBS | Amazon EFS |
|---|---|---|---|
| **Type** | Object Storage | Block Storage | Network File System (NFS) |
| **Protocol** | HTTP / REST API | Direct NVMe / SCSI attachment | NFSv4 |
| **Scope** | Global / Regional bucket | Single Availability Zone (AZ) | Multi-AZ within a VPC |
| **Concurrency**| Unlimited concurrent HTTP clients | 1 EC2 instance (Multi-Attach for io2) | Thousands of EC2/Lambda instances |
| **Max Size** | Unlimited (5 TB per object) | 64 TB per volume | Petabytes (elastic) |
| **Durability** | 99.999999999% (11 9s) | 99.8% - 99.999% | 99.999999999% (11 9s) |

---

## 2. Amazon S3 Storage Classes & Lifecycle

To optimize cloud costs, objects can automatically transition across tiers using **S3 Lifecycle Policies**:

```
S3 Standard (Hot, active access)
   │ (30 days)
   ▼
S3 Standard-Infrequent Access (S3 Standard-IA) (Low access, instant retrieval)
   │ (90 days)
   ▼
S3 Glacier Flexible Retrieval (Archives, retrieval takes 1 min - 5 hours)
   │ (180 days)
   ▼
S3 Glacier Deep Archive (Lowest cost, archival retrieval in 12 - 48 hours)
```

### S3 Strong Consistency
Since December 2020, Amazon S3 provides **strong read-after-write consistency** for `PUT` and `DELETE` requests of objects in all AWS regions with no performance penalty.

---

## 3. Amazon EBS Volume Types

EBS volumes are virtual hard drives attached to EC2 instances within a single Availability Zone.

1. **General Purpose SSD (`gp3`):** Default baseline storage. Provides independent scaling of IOPS (baseline 3,000) and Throughput (125 MB/s) decoupled from storage volume size.
2. **Provisioned IOPS SSD (`io2` Block Express):** Mission-critical, I/O-intensive workloads (large Oracle, MS SQL Server, or SAP HANA databases). Up to 256,000 IOPS and sub-millisecond latency.
3. **Throughput Optimized HDD (`st1`):** Low-cost HDD for big data, data warehousing, and log processing.

---

## 4. Key Terminology & Interview Questions

### Q1: How do you securely share private S3 files without making the bucket public?
Use **S3 Pre-signed URLs**. A backend application with IAM permissions generates a cryptographically signed URL containing an expiration timestamp (e.g., valid for 15 minutes). Any client with this URL can upload or download the specific object directly from S3 without passing credentials.

### Q2: Can an EBS volume be attached to two EC2 instances at the same time?
Generally, no. EBS is bound to a single EC2 instance in a single AZ. However, `io1` and `io2` volumes support **EBS Multi-Attach**, which allows attaching a single volume to up to 16 Nitro-based EC2 instances within the same AZ, requiring a cluster-aware filesystem (e.g., GFS2).

### Q3: How do you back up EBS volumes and recover across regions?
Create **EBS Snapshots**, which are point-in-time incremental backups stored durably in Amazon S3. Snapshots can then be copied to other AWS regions or accounts for disaster recovery (DR).

---
title: Data Warehousing, Delta Lakehouses, Data Modeling, and Governance
subject: Data Engineering
category: Data & Analytics
difficulty: hard
importance: high
tags:
  - data-engineering
  - data-warehousing
  - dimensional-modeling
  - star-schema
  - snowflake
  - bigquery
  - databricks
  - delta-lake
  - data-governance
---

# Data Warehousing, Delta Lakehouses, Data Modeling, and Governance

Enterprise data platforms combine scalable analytical storage engines with disciplined dimensional schema modeling and strict data governance.

---

## 1. Dimensional Modeling: Star vs. Snowflake Schema

Dimensional modeling (Kimball methodology) structures data to maximize analytical query speed and business intelligibility.

### Star Schema
- A central **Fact Table** (containing numeric measures and business transaction foreign keys, e.g., `fact_orders`) connected directly to flat **Dimension Tables** (e.g., `dim_customer`, `dim_product`, `dim_date`).
- **Denormalized**: Dimensions contain redundant attributes to avoid multi-hop table joins.
- **Fastest OLAP query execution**: Simple single-join plans with minimal compute overhead.

### Snowflake Schema
- Fully or partially **normalized** dimension tables (e.g., `dim_product` joins to `dim_subcategory`, which joins to `dim_category`).
- Saves physical storage and guarantees 3NF referential integrity, but incurs significantly higher query join latency on large-scale analytical engines.

```sql
-- Star Schema Dimensional Query Example
SELECT 
    d.year,
    d.quarter,
    p.category_name,
    SUM(f.sales_amount) AS total_revenue,
    COUNT(DISTINCT f.order_id) AS total_orders
FROM fact_sales f
JOIN dim_date d ON f.date_key = d.date_key
JOIN dim_product p ON f.product_key = p.product_key
JOIN dim_customer c ON f.customer_key = c.customer_key
WHERE c.country = 'United States'
GROUP BY d.year, d.quarter, p.category_name
ORDER BY d.year DESC, total_revenue DESC;
```

---

## 2. Slowly Changing Dimensions (SCD)

Handling dimension changes over time:
- **SCD Type 1 (Overwrite)**: Old attribute is permanently overwritten. No historical tracking (e.g., fixing a typo in customer surname).
- **SCD Type 2 (Add New Row with Validity Timestamps)**: Retains full historical lineage by creating a new dimension record with `effective_start_date`, `effective_end_date`, and `is_current` boolean flag.
- **SCD Type 3 (Add Previous Value Column)**: Adds an `original_city` or `previous_tier` column to track only the immediate preceding state.

---

## 3. Data Lakehouse Architecture (Delta Lake & Apache Iceberg)

Traditional data lakes (raw S3/GCS object stores) suffered from lack of ACID transactions, dirty reads, and poor metadata management (the "Data Swamp" problem). 

Modern **Lakehouse** table formats (Delta Lake, Apache Iceberg, Apache Hudi) overlay a serialized transaction log over Parquet columnar files:

1. **ACID Transactions**: Concurrent writes succeed atomically via optimistic concurrency control (OCC).
2. **Time Travel & Rollback**: Query snapshots at specific version IDs or timestamps (`RESTORE TABLE orders TO VERSION AS OF 14`).
3. **Schema Enforcement & Evolution**: Rejects writes that violate expected types, while supporting safe schema evolution.
4. **Z-Ordering & Data Compaction (OPTIMIZE)**: Groups multidimensional data into contiguous columnar blocks and merges small files into ideal 512MB–1GB chunks.

```python
# Databricks / Delta Lake PySpark upsert (MERGE INTO)
from delta.tables import DeltaTable
from pyspark.sql.functions import col

delta_target = DeltaTable.forPath(spark, "s3://production-lakehouse/curated/customers")
incoming_df = spark.read.parquet("s3://production-lakehouse/landing/cdc_updates")

# Atomic Lakehouse Upsert
delta_target.alias("target").merge(
    source=incoming_df.alias("source"),
    condition="target.customer_id = source.customer_id"
).whenMatchedUpdate(
    condition="source.updated_at > target.updated_at",
    set={
        "email": col("source.email"),
        "tier": col("source.tier"),
        "updated_at": col("source.updated_at")
    }
).whenNotMatchedInsert(
    values={
        "customer_id": col("source.customer_id"),
        "email": col("source.email"),
        "tier": col("source.tier"),
        "created_at": col("source.updated_at"),
        "updated_at": col("source.updated_at")
    }
).execute()
```

---

## 4. Modern Cloud Data Warehouses: Snowflake vs. BigQuery vs. Redshift

| Feature | Snowflake | Google BigQuery | Amazon Redshift Serverless |
| :--- | :--- | :--- | :--- |
| **Architecture** | Multi-cluster shared data (Compute isolated from S3/Blob storage) | Fully serverless Dremel engine over Capacitor columnar storage | Managed or serverless RA3 instances with Redshift Managed Storage |
| **Scaling** | Virtual Warehouses (T-shirt sizing XS to 4XL) suspend/resume in seconds | Dynamic on-demand slots or slot reservations per organization | Managed concurrency scaling with automatic workgroup sizing |
| **Optimization** | Micro-partitions, clustering keys, zero-copy cloning | Automatic partitioning (by ingestion time/column) and clustering | Distribution keys (`KEY`, `ALL`, `EVEN`), sort keys (`COMPOUND`, `INTERLEAVED`) |
| **Semi-Structured**| Native `VARIANT` data type with dot-notation query syntax | Native `JSON` type with fast scalar functions | Native `SUPER` type with PartiQL syntax |

---

## 5. Pipeline Idempotency & Failure Recovery

In robust data engineering systems, a pipeline step must be **idempotent**: running the pipeline multiple times with the same input must produce the exact same final state without duplicate records.

Strategies:
- **Write to Staging + Atomic Partition Swap**: Write job results to temporary partition `dt=2026-10-10_tmp`, validate row count and schema, then swap/rename atomically into the live table path.
- **Deduplication via Watermarking and UPSERT**: Use unique primary surrogate keys (`hash(user_id, event_timestamp)`) and execute idempotent merge statements.
- **Dead Letter Queues (DLQ)**: Malformed JSON records that fail schema validation are routed to a quarantine bucket for alerting and post-mortem analysis rather than aborting batch jobs.

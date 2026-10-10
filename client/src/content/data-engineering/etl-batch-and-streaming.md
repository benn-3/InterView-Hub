---
title: Data Engineering: ETL vs. ELT, Apache Spark, and Kafka Streaming
subject: Data Engineering
category: Data & Analytics
difficulty: hard
importance: high
tags:
  - data-engineering
  - etl
  - elt
  - apache-spark
  - pyspark
  - apache-kafka
  - distributed-computing
---

# Data Engineering: ETL vs. ELT, Apache Spark, and Kafka Streaming

Data engineering designs resilient, idempotent infrastructure that ingests, transforms, cleanses, and serves terabytes to petabytes of structured and semi-structured data.

---

## 1. ETL vs. ELT Architectural Paradigms

```
ETL (Extract -> Transform -> Load)
Sources ──► Extract ──► Heavy Compute Engine (Transform) ──► Load Clean Data into Warehouse
• Used with legacy on-premises databases where storage and compute were constrained.
• Enforces strict data quality and privacy masking before landing.

ELT (Extract -> Load -> Transform)
Sources ──► Extract ──► Direct Ingestion ──► Modern Cloud Warehouse / Lake (Snowflake/BigQuery)
                                                   └──► In-Database SQL / dbt Transformation
• Enabled by separation of cloud compute and storage with elastic parallel scalability.
• Retains raw immutable data history; transformations can be re-run historically.
```

---

## 2. Apache Spark and PySpark Distributed Processing

Apache Spark achieves $100\times$ faster speeds than traditional MapReduce by caching data in-memory across a cluster of nodes.

### Spark Architecture
```
[ Driver Program ] (SparkContext, DAGScheduler, TaskScheduler)
       │
       ▼ (Cluster Manager: YARN / Kubernetes / Standalone)
 ┌─────────────┴─────────────┐
 ▼                           ▼
[ Worker Node 1 ]          [ Worker Node 2 ]
(Executor -> Tasks)       (Executor -> Tasks)
```

### Key Spark Concepts
- **RDD (Resilient Distributed Dataset):** Immutable, partitioned collection of records evaluated lazily.
- **Transformations (Lazy):** Define an execution graph without computing results immediately:
  - *Narrow Transformations:* Data in each partition depends on only one parent partition (e.g., `map()`, `filter()`, `flatMap()`). No network shuffle!
  - *Wide Transformations:* Require cross-network data movement across multiple nodes (e.g., `groupBy()`, `join()`, `reduceByKey()`, `repartition()`). Causes expensive **shuffles**!
- **Actions (Eager):** Trigger execution of the accumulated DAG plan (e.g., `count()`, `collect()`, `save()`, `show()`).
- **Catalyst Optimizer:** Analyzes DataFrame SQL queries, performs predicate pushdown, projection pruning, and generates optimized JVM bytecode.

### PySpark Production Pipeline Example

```python
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, to_timestamp, when, count, avg

def process_clickstream_pipeline():
    spark = SparkSession.builder \
        .appName("ClickstreamAggregator") \
        .config("spark.sql.shuffle.partitions", "200") \
        .getOrCreate()

    # Read raw parquet data from object storage (S3/GCS/Azure Data Lake)
    raw_df = spark.read.parquet("s3a://data-lake-raw/events/year=2026/month=10/")

    # Cleanse, filter, and apply business transformations
    cleaned_df = raw_df \
        .filter(col("user_id").isNotNull()) \
        .withColumn("timestamp", to_timestamp(col("event_time"), "yyyy-MM-dd HH:mm:ss")) \
        .withColumn("is_conversion", when(col("action") == "purchase", 1).otherwise(0))

    # Aggregations using broadcast join optimization when possible
    aggregated_df = cleaned_df \
        .groupBy("category_id", "date") \
        .agg(
            count("user_id").alias("total_events"),
            avg("is_conversion").alias("conversion_rate")
        )

    # Write idempotently with partitioning for query speedup
    aggregated_df.write \
        .mode("overwrite") \
        .partitionBy("date") \
        .parquet("s3a://data-lake-gold/kpis/")

    spark.stop()
```

---

## 3. Apache Kafka: Event Streaming Architecture

Kafka is a horizontally scalable, fault-tolerant distributed event log.

### Core Primitives
- **Topic:** Category/stream feed to which records are published.
- **Partition:** Fundamental unit of parallelism. Topics are split into ordered, immutable logs appended sequentially.
- **Consumer Group:** Set of consumers that cooperatively consume a topic. Each partition is consumed by exactly one consumer within a group.
- **Offset:** Sequential integer ID assigned to each record within a partition that tracks consumer position.

### Delivery Guarantees
1. **At-Most-Once:** Offsets committed before processing. Data can be lost on consumer failure, but never duplicated.
2. **At-Least-Once (Standard):** Offsets committed after record processing. Zero data loss, but duplicate processing on crash. Requires **Idempotent** downstream consumers!
3. **Exactly-Once (EOS):** Kafka transactional API + idempotent producers (`enable.idempotence=true`) guarantees end-to-end atomic state transitions across read-process-write streams.

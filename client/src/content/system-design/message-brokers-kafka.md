---
title: Message Brokers and Event-Driven Architecture with Apache Kafka
subject: System Design
category: Software Engineering
difficulty: hard
importance: high
tags:
  - system-design
  - kafka
  - message-queues
  - event-driven
  - pubsub
  - stream-processing
---

# Message Brokers & Event-Driven Architecture: Kafka and RabbitMQ

Decoupling synchronous request-response microservices using asynchronous message brokers improves resilience, allows horizontal consumer scaling, and provides backpressure buffering.

---

## 1. Message Queue (RabbitMQ) vs Distributed Log (Kafka)

```
RABBITMQ (Smart Broker, Dumb Consumer)
Producer ──► [Exchange] ──► [Queue] ──► Consumer (Pops & deletes message upon ACK)

KAFKA (Dumb Broker, Smart Consumer)
Producer ──► [Partition 0 (Append-Only Commit Log on Disk)] ──► Consumer reads via Offset
             [Partition 1 (Append-Only Commit Log on Disk)] ──► Messages are immutable & retained
```

| Dimension | RabbitMQ | Apache Kafka |
|---|---|---|
| **Paradigm** | Traditional Message Broker (AMQP) | Distributed Streaming Event Log |
| **Storage Model** | Transient: deleted immediately after consumer ACK | Persistent: append-only immutable disk log with time retention (e.g. 7 days) |
| **Consumer Tracking** | Broker tracks message state per consumer | Consumer tracks its own pointer (**Offset**) |
| **Replayability** | No (once consumed, message is gone) | **Yes** (consumers can rewind offsets to re-read history) |
| **Throughput** | Tens of thousands of msgs/sec | Millions of msgs/sec |
| **Routing** | Complex routing keys, topic/fanout exchanges | Partition key routing (hash of key) |

---

## 2. Kafka Topic, Partitions, and Consumer Groups

```
TOPIC: "payment-events"
┌─────────────────────────────────────────────────────────────┐
│ Partition 0: [Offset 0][Offset 1][Offset 2][Offset 3]...     │ ◄── Consumer A
├─────────────────────────────────────────────────────────────┤
│ Partition 1: [Offset 0][Offset 1][Offset 2][Offset 3]...     │ ◄── Consumer B
├─────────────────────────────────────────────────────────────┤
│ Partition 2: [Offset 0][Offset 1][Offset 2][Offset 3]...     │ ◄── Consumer C
└─────────────────────────────────────────────────────────────┘
  (Partitions are the unit of parallelism in Apache Kafka)
```

### Partitioning Rules:
- **Order Guarantee:** Kafka guarantees strict message ordering **within a single partition**, but **not across different partitions**.
- **Message Key:** Messages with the same key (e.g. `userId = 42`) are consistently hashed to the same partition, guaranteeing strict ordered processing for that specific user.
- **Consumer Group Constraint:** In a consumer group, each partition is consumed by exactly one consumer at any time. If you have 3 partitions and 4 consumers, the 4th consumer remains idle.

---

## 3. Delivery Semantics

1. **At-Most-Once:** Message is dispatched; consumer updates offset before processing. If consumer crashes mid-processing, message is lost. Zero duplicates, but possible data loss.
2. **At-Least-Once (Standard):** Consumer processes message and commits offset *afterwards*. If consumer crashes before committing offset, the message is reprocessed. No data loss, but duplicate processing is possible (requires **idempotent consumers**).
3. **Exactly-Once (EOS):** Requires transactional producers and consumers (`isolation.level = read_committed`).

---

## 4. Key Terminology & Interview Questions

### Q1: Why is Kafka so fast despite persisting all messages to disk?
Kafka achieves million-record throughput through 4 key architectural decisions:
1. **Sequential Disk I/O:** Appending to the end of a log file on disk is as fast as random RAM access.
2. **Zero-Copy Optimization:** Uses Linux `sendfile()` system call to stream data directly from OS Page Cache to the network socket, bypassing user-space CPU memory copying.
3. **OS Page Cache:** Heavy reliance on kernel memory buffers instead of managing large JVM heap caches (avoiding GC pauses).
4. **Batching:** Producers and consumers batch records together to minimize network syscall overhead.

### Q2: What happens during a Consumer Group Rebalance?
When a consumer crashes, leaves, or a new consumer joins the group, the group coordinator initiates a **Rebalance**, reassigning partition ownership across active group members. Modern Kafka uses Cooperative Sticky Assignors to rebalance incrementally with minimal downtime.

### Q3: How do you design an Idempotent Consumer?
Because At-Least-Once delivery can deliver duplicate messages:
- Producers attach a unique `message_id` or `uuid` to every payload.
- When consuming, the worker checks an atomic storage (Redis `SETNX` or an `INSERT INTO processed_events(id) ON CONFLICT DO NOTHING`). If the ID already exists, the event is safely acknowledged and discarded.

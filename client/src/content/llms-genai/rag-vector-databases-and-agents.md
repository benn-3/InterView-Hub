---
title: Retrieval-Augmented Generation (RAG), Vector Databases, and LLM Agents
subject: LLMs and Generative AI
category: Artificial Intelligence & Data
difficulty: hard
importance: high
tags:
  - llms
  - rag
  - vector-databases
  - embeddings
  - hybrid-search
  - agents
  - mcp
  - langchain
  - llamaindex
---

# Retrieval-Augmented Generation (RAG), Vector Databases, and LLM Agents

Production GenAI systems integrate external non-parametric retrieval memory and agentic autonomous tool-execution loops with generative LLMs.

---

## 1. Production RAG Architecture

Naïve RAG (simple top-$k$ cosine similarity on raw text chunks) frequently suffers from lost context, irrelevant retrieval noise, and hallucinated answers.

```
Ingestion Pipeline:
Documents ──► Semantic/Recursive Chunking ──► Embedding Model (e.g. text-embedding-3) ──► Vector DB + Metadata Index

Query Execution:
User Query ──► Query Transformation / Hypothetical Document (HyDE)
                     │
                     ▼
         Hybrid Retrieval: Dense (HNSW / Cosine) + Sparse (BM25 Lexical Keyword)
                     │
                     ▼
            Cross-Encoder Reranker (e.g., Cohere Rerank / BGE-Reranker-Large)
                     │
                     ▼ (Top 3-5 Chunks)
        LLM Prompt Assembly with Strict System Guardrails ──► Grounded Response + Citations
```

---

## 2. Advanced Chunking and Retrieval Strategies

1. **Chunking Strategies**:
   - **Recursive Character Splitting**: Respects markdown headings, paragraphs, and sentence boundaries with 10–20% token overlap.
   - **Parent-Document Retrieval**: Embeds small, precise 128-token chunks for dense matching, but retrieves the broader 1024-token parent document context for the LLM prompt.
   - **Semantic Chunking**: Computes cosine distance between consecutive sentences and places split boundaries wherever the semantic similarity drops sharply.
2. **Hybrid Search & Reciprocal Rank Fusion (RRF)**:
   Vector embeddings struggle with exact keywords, part numbers, and acronyms, while BM25 excels. Hybrid search combines rank positions:
   $$\text{RRF Score}(d) = \sum_{m \in \{\text{dense, sparse}\}} \frac{1}{60 + \text{rank}_m(d)}$$
3. **Cross-Encoder Reranking**:
   Bi-encoders compute vector embeddings independently ($O(1)$ search). A cross-encoder takes `(query, document)` jointly into full transformer self-attention, re-scoring top-25 candidate passages with much higher semantic precision.

---

## 3. Vector Indexing: HNSW vs. IVF-PQ

- **HNSW (Hierarchical Navigable Small World)**:
  Multi-layer graph architecture where upper layers enable fast exploratory jumps and bottom layers execute precise nearest-neighbor greedy routing. Provides highest recall and lowest query latency, at the cost of higher RAM usage.
- **IVF-PQ (Inverted File with Product Quantization)**:
  Partitions vector space into Voronoi cells (IVF) and compresses vectors into compact byte codes (PQ). Drastically reduces memory footprint for billion-scale vector indexes.

---

## 4. LLM Agents, Function Calling, and MCP (Model Context Protocol)

An LLM Agent executes multi-step reasoning by interleaving thought generation and environmental tool invocation:

- **ReAct Framework**: Reasoning step $\rightarrow$ Action step (tool call) $\rightarrow$ Observation (tool response) $\rightarrow$ Final Answer.
- **Model Context Protocol (MCP)**: An open architectural standard enabling LLMs to connect securely to local filesystem, database tools, GitHub, Slack, and cloud APIs via standard client-server JSON-RPC interfaces without custom hardcoded wrappers.

```python
# Structured Function Calling with Pydantic and LangChain / OpenAI
from pydantic import BaseModel, Field

class OrderLookupTool(BaseModel):
    """Retrieve detailed shipping and payment status for an e-commerce order."""
    order_id: str = Field(description="The alphanumeric order identifier, e.g. ORD-98124")
    include_tracking_events: bool = Field(default=True, description="Whether to fetch historical transit checkpoints")

# Example Tool Call Handling Schema
tools = [
    {
        "type": "function",
        "function": {
            "name": "lookup_order",
            "description": "Fetch real-time order status and shipping courier telemetry.",
            "parameters": OrderLookupTool.model_json_schema()
        }
    }
]
```

---

## 5. RAG Evaluation Metrics (Ragas Framework)

1. **Faithfulness**: Are all claims in the generated response strictly grounded in the retrieved context? (Measures hallucination rate).
2. **Answer Relevance**: Does the generated answer directly address the user's question without extraneous filler?
3. **Context Recall**: Did the retrieval engine fetch all necessary ground-truth facts required to formulate the answer?
4. **Context Precision**: Are the most relevant retrieved chunks positioned at the top of the context window? (Counteracts "Lost in the Middle" syndrome).

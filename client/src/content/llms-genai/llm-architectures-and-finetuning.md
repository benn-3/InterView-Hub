---
title: LLM Architectures, Pretraining, Instruction Tuning, LoRA, and Quantization
subject: LLMs and Generative AI
category: Artificial Intelligence & Data
difficulty: hard
importance: high
tags:
  - llms
  - generative-ai
  - transformers
  - lora
  - qlora
  - instruction-tuning
  - quantization
  - huggingface
---

# LLM Architectures, Pretraining, Instruction Tuning, LoRA, and Quantization

Modern Large Language Models (LLMs) are auto-regressive decoder-only Transformers trained on trillions of tokens and adapted via Parameter-Efficient Fine-Tuning (PEFT).

---

## 1. Auto-Regressive Decoder Architectures

Modern LLMs (LLaMA, Mistral, GPT-4, Gemma) utilize causal decoder architectures:

- **Rotary Position Embeddings (RoPE)**: Encodes absolute positional information via a rotation matrix applied to Query and Key projections, providing natural relative position decay and context-length extrapolation.
- **RMSNorm**: Replaces standard LayerNorm by normalizing inputs only by root mean square, eliminating mean computation for higher GPU throughput.
- **SwiGLU Activation**: Swish Gated Linear Unit replaces standard ReLU/GELU in feed-forward layers, consistently improving perplexity.
- **Grouped-Query Attention (GQA)**: Shares a single Key and Value head across multiple Query heads (e.g., 8 Q heads per 1 KV head), dramatically reducing the memory footprint of the Key-Value (KV) cache during autoregressive generation.

```
Multi-Head Attention (MHA):     [Q1 Q2 Q3 Q4 Q5 Q6 Q7 Q8] [K1 K2 K3 K4 K5 K6 K7 K8] [V1 V2 V3 V4 V5 V6 V7 V8]
Grouped-Query Attention (GQA):   [Q1 Q2 Q3 Q4] [Q5 Q6 Q7 Q8]       [K1]        [K2]         [V1]        [V2]
Multi-Query Attention (MQA):     [Q1 Q2 Q3 Q4 Q5 Q6 Q7 Q8]              [K1]                     [V1]
```

---

## 2. The Training Pipeline: Pretraining, SFT, and Alignment

1. **Self-Supervised Pretraining**: Next-token prediction cross-entropy loss over web-scale text (trillions of tokens). Yields raw base models with world knowledge and token completion capabilities.
2. **Supervised Fine-Tuning (SFT)**: High-quality prompt-response pairs curated for instruction following, multi-turn dialogue, reasoning, and tool formatting.
3. **Alignment (RLHF & DPO)**:
   - **RLHF (Reinforcement Learning from Human Feedback)**: Train a Reward Model from pairwise preference rankings, then optimize the policy using PPO (Proximal Policy Optimization) with a KL-divergence penalty against the reference model.
   - **DPO (Direct Preference Optimization)**: Bypasses explicit reward model training and reinforcement learning loops. Derives an exact analytical loss function that directly optimizes preference probabilities over chosen ($y_w$) and rejected ($y_l$) completions:
     $$\mathcal{L}_{\text{DPO}}(\pi_\theta; \pi_{\text{ref}}) = -\mathbb{E}_{(x, y_w, y_l)}\left[\log \sigma\left(\beta \log \frac{\pi_\theta(y_w|x)}{\pi_{\text{ref}}(y_w|x)} - \beta \log \frac{\pi_\theta(y_l|x)}{\pi_{\text{ref}}(y_l|x)}\right)\right]$$

---

## 3. Parameter-Efficient Fine-Tuning: LoRA & QLoRA

Full fine-tuning of a 70B parameter model in FP16 requires over 500GB of VRAM (weights + optimizer states + activations). **LoRA (Low-Rank Adaptation)** freezes the pretrained weights $W_0 \in \mathbb{R}^{d \times k}$ and injects trainable rank-decomposition matrices:

$$W = W_0 + \Delta W = W_0 + \frac{\alpha}{r} (B \cdot A)$$

where $A \in \mathbb{R}^{r \times k}$ is initialized from a Gaussian distribution, $B \in \mathbb{R}^{d \times r}$ is initialized to zero, and rank $r \ll \min(d, k)$ (typically $r \in [8, 64]$).

### QLoRA (Quantized LoRA)
- Quantizes the base model down to 4-bit NormalFloat (NF4).
- Uses **Double Quantization (DQ)** to quantize quantization constants, saving 0.37 bits per parameter.
- Employs **Paged Optimizers** using CPU-RAM paging to prevent out-of-memory spikes during gradient checkpointing. Enables fine-tuning 70B models on two consumer 24GB GPUs.

```python
# PEFT LoRA Configuration in Hugging Face Transformers
from peft import LoraConfig, get_peft_model, TaskType
from transformers import AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3-8B-Instruct")

lora_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=16,
    lora_alpha=32,
    lora_dropout=0.05,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"]
)

peft_model = get_peft_model(model, lora_config)
peft_model.print_trainable_parameters()
# Output: trainable params: 41,943,040 || all params: 8,072,204,288 || trainable%: 0.5196%
```

---

## 4. Model Quantization Formats: GGUF, AWQ, and GPTQ

- **Post-Training Quantization (PTQ)**: Compresses existing weights without retraining.
- **GPTQ**: Second-order Taylor series error minimization layer-by-layer; fast GPU execution.
- **AWQ (Activation-aware Weight Quantization)**: Identifies that only 1% of salient weights protect generation quality; protects salient channels in FP16 while quantizing the remaining 99% to INT4.
- **GGUF (llama.cpp)**: CPU-friendly unified file format supporting mixed quantization (k-quants) and Apple Silicon Metal acceleration.

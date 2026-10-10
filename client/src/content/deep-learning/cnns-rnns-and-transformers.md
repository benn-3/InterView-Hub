---
title: CNNs, Recurrent Models (LSTMs/GRUs), and the Transformer Attention Mechanism
subject: Deep Learning
category: Artificial Intelligence & Data
difficulty: hard
importance: high
tags:
  - deep-learning
  - cnn
  - rnn
  - lstm
  - gru
  - attention
  - transformers
  - computer-vision
---

# CNNs, Recurrent Models (LSTMs/GRUs), and the Transformer Attention Mechanism

Modern deep learning architectures evolved from spatial feature extractors (CNNs) and sequential recurrent recurrence (LSTMs) into self-attentive parallelized Transformers.

---

## 1. Convolutional Neural Networks (CNNs)

CNNs exploit two fundamental spatial inductive biases: **local receptive fields** and **spatial translation invariance**.

- **Convolution Kernel**: Sliding $K \times K$ filter that calculates dot products over receptive patches.
- **Output Dimension Formula**:
  $$O = \left\lfloor \frac{W - K + 2P}{S} \right\rfloor + 1$$
  *(where $W$ is input size, $K$ kernel size, $P$ padding, $S$ stride).*
- **Pooling**: Max-pooling or average-pooling provides spatial downsampling and minor translation robustness.
- **Residual Connections (ResNet)**: Introduces identity skip connections $y = \mathcal{F}(x, \{W_i\}) + x$, enabling gradient flow directly across 50–152+ layers without vanishing gradients.

```python
import torch
import torch.nn as nn

class ResidualBlock(nn.Module):
    def __init__(self, channels):
        super().__init__()
        self.conv1 = nn.Conv2d(channels, channels, kernel_size=3, padding=1, bias=False)
        self.bn1 = nn.BatchNorm2d(channels)
        self.relu = nn.ReLU(inplace=True)
        self.conv2 = nn.Conv2d(channels, channels, kernel_size=3, padding=1, bias=False)
        self.bn2 = nn.BatchNorm2d(channels)

    def forward(self, x):
        residual = x
        out = self.relu(self.bn1(self.conv1(x)))
        out = self.bn2(self.conv2(out))
        out += residual  # Skip connection
        return self.relu(out)
```

---

## 2. Sequential Modeling: RNNs vs. LSTMs vs. GRUs

Traditional Vanilla RNNs suffer from exponential vanishing or exploding gradients over long temporal sequences due to repeated multiplication by $W_{hh}^T$.

### LSTM (Long Short-Term Memory)
LSTMs resolve vanishing gradients by maintaining an uninterrupted **Cell State ($C_t$)** regulated by three sigmoid-gated mechanisms:
1. **Forget Gate**: $f_t = \sigma(W_f \cdot [h_{t-1}, x_t] + b_f)$ (What to drop from memory).
2. **Input Gate & Candidate**: $i_t = \sigma(W_i \cdot [h_{t-1}, x_t] + b_i)$, $\tilde{C}_t = \tanh(W_c \cdot [h_{t-1}, x_t] + b_c)$.
3. **Cell State Update**: $C_t = f_t \odot C_{t-1} + i_t \odot \tilde{C}_t$ (Linear additive update avoids vanishing gradients).
4. **Output Gate**: $o_t = \sigma(W_o \cdot [h_{t-1}, x_t] + b_o)$, $h_t = o_t \odot \tanh(C_t)$.

### GRU (Gated Recurrent Unit)
Combines cell state and hidden state into a single vector using only two gates: **Reset Gate** and **Update Gate**, offering faster training with comparable performance.

---

## 3. The Transformer: Scaled Dot-Product and Multi-Head Attention

Transformers discard recurrent sequential loops entirely, enabling full $O(1)$ sequential parallelization during training.

### Scaled Dot-Product Attention
$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{Q K^T}{\sqrt{d_k}}\right) V$$
- $Q$ (Query), $K$ (Key), $V$ (Value) projections of dimension $d_k$.
- Scaling by $\frac{1}{\sqrt{d_k}}$ prevents large dot-product magnitudes from pushing softmax into saturation regions where gradients vanish.

### Multi-Head Attention (MHA)
Allows the model to jointly attend to information from different representation subspaces at different positions:
$$\text{MHA}(Q, K, V) = \text{Concat}(\text{head}_1, \dots, \text{head}_h) W^O$$
$$\text{where } \text{head}_i = \text{Attention}(Q W_i^Q, K W_i^K, V W_i^V)$$

```python
import math
import torch
import torch.nn as nn
import torch.nn.functional as F

class ScaledDotProductAttention(nn.Module):
    def __init__(self, d_k):
        super().__init__()
        self.scale = 1.0 / math.sqrt(d_k)

    def forward(self, q, k, v, mask=None):
        # q, k, v shape: (batch_size, num_heads, seq_len, d_k)
        scores = torch.matmul(q, k.transpose(-2, -1)) * self.scale
        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9)
        attn_weights = F.softmax(scores, dim=-1)
        output = torch.matmul(attn_weights, v)
        return output, attn_weights
```

---

## 4. Architectural Comparison

| Dimension | CNN | LSTM / RNN | Transformer |
| :--- | :--- | :--- | :--- |
| **Inductive Bias** | Strong (spatial locality, translation invariance) | Strong (sequential order, temporal Markovian property) | Weak (relies on self-attention and positional embeddings) |
| **Computational Complexity** | $O(K^2 \cdot N)$ per layer | $O(N)$ sequential steps | $O(N^2 \cdot d)$ full sequence attention ($N$ = sequence length) |
| **Parallelizability** | High (across pixels & batches) | Low (step $t$ requires step $t-1$) | High (all tokens processed simultaneously in matrix ops) |
| **Long-range Dependency** | Logarithmic with depth | Decays with sequence length | Direct $O(1)$ token-to-token connections |

---
title: Neural Networks, Activation Functions, Loss Functions, and Backpropagation
subject: Deep Learning
category: Artificial Intelligence & Data
difficulty: medium
importance: high
tags:
  - deep-learning
  - neural-networks
  - perceptron
  - backpropagation
  - gradient-descent
  - activation-functions
  - optimizers
  - pytorch
---

# Neural Networks, Activation Functions, Loss Functions, and Backpropagation

Deep learning models represent complex non-linear functions by stacking hierarchical representation layers parameterized by learnable weights and biases.

---

## 1. The Perceptron and Non-Linearity

A single artificial neuron computes an affine linear transformation followed by a non-linear activation function:

$$z = \sum_{i=1}^{n} w_i x_i + b = \mathbf{w}^T \mathbf{x} + b$$
$$a = \sigma(z)$$

Without non-linear activation functions, stacking $L$ linear dense layers collapses into a single matrix multiplication $\mathbf{W}_{\text{eff}} = \mathbf{W}_L \dots \mathbf{W}_1$, rendering deep architectures unable to solve non-linear problems like XOR.

### Key Activation Functions

| Activation | Formula | Derivative | Pros & Cons |
| :--- | :--- | :--- | :--- |
| **Sigmoid** | $\sigma(z) = \frac{1}{1 + e^{-z}}$ | $\sigma'(z) = \sigma(z)(1 - \sigma(z))$ | Outputs $[0, 1]$ (good for binary probabilities). Severe **vanishing gradient** when $|z| > 4$; not zero-centered. |
| **Tanh** | $\tanh(z) = \frac{e^z - e^{-z}}{e^z + e^{-z}}$ | $1 - \tanh^2(z)$ | Zero-centered $[-1, 1]$. Still suffers from vanishing gradients at extremes. |
| **ReLU** | $\max(0, z)$ | $1$ if $z > 0$ else $0$ | Computationally efficient; eliminates vanishing gradient for positive inputs. Suffers from **Dying ReLU** (neurons get stuck at $0$). |
| **Leaky ReLU / GELU** | $\max(\alpha z, z)$ or $z \cdot \Phi(z)$ | Non-zero for $z < 0$ | Solves Dying ReLU. GELU is standard in modern Transformers (BERT, GPT). |

---

## 2. Forward Propagation and Backpropagation (Computational Graph)

Backpropagation applies the multivariate calculus **chain rule** backwards through the computational graph from loss $L$ to every weight parameter:

$$\frac{\partial L}{\partial w_{ij}^{(l)}} = \frac{\partial L}{\partial z_i^{(l)}} \cdot \frac{\partial z_i^{(l)}}{\partial w_{ij}^{(l)}} = \delta_i^{(l)} \cdot a_j^{(l-1)}$$

where the local error $\delta_i^{(l)}$ is computed recursively:
$$\delta^{(l)} = ((\mathbf{W}^{(l+1)})^T \delta^{(l+1)}) \odot \sigma'(z^{(l)})$$

```
Forward Pass:  x ──► [W1, b1] ──► z1 ──► [ReLU] ──► a1 ──► [W2, b2] ──► z2 ──► [Softmax] ──► y_hat ──► Loss(y, y_hat)
                                                                                                           │
Backward Pass: dW1 ◄── dz1 ◄── [dReLU] ◄── da1 ◄── dW2 ◄── dz2 ◄── [dSoftmax] ◄───────────────────────────┘
```

---

## 3. Weight Initialization: Xavier vs. He Initialization

Improper weight initialization causes signal explosion (exploding gradients) or signal collapse to 0 (vanishing gradients) in early training.

- **Xavier / Glorot Initialization** (designed for Tanh/Sigmoid):
  $$W \sim \mathcal{N}\left(0, \frac{2}{n_{\text{in}} + n_{\text{out}}}\right)$$
- **He / Kaiming Initialization** (designed for ReLU/GELU):
  $$W \sim \mathcal{N}\left(0, \frac{2}{n_{\text{in}}}\right)$$

---

## 4. Modern Optimizers: SGD to AdamW

1. **Stochastic Gradient Descent (SGD) with Momentum**:
   Accumulates exponentially decaying velocity vector $v_t = \beta v_{t-1} + (1-\beta) g_t$ to accelerate down shallow ravines and dampen oscillations.
2. **RMSprop**:
   Scales learning rate by the moving average of squared gradients, helping parameters with frequent large gradients slow down.
3. **Adam (Adaptive Moment Estimation)**:
   Combines first-order momentum with second-order squared gradient scaling.
4. **AdamW (Decoupled Weight Decay)**:
   In standard Adam, $L_2$ regularization decays weights incorrectly through the adaptive moving variance. AdamW decouples weight decay directly from gradient updates ($w \leftarrow w(1 - \lambda \eta) - \eta \frac{\hat{m}}{\sqrt{\hat{v}} + \epsilon}$), proving essential for Transformers and LLMs.

---

## 5. PyTorch Implementation

```python
import torch
import torch.nn as nn
import torch.optim as optim

class DeepClassifier(nn.Module):
    def __init__(self, input_dim=64, hidden_dim=128, num_classes=10):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.BatchNorm1d(hidden_dim),
            nn.ReLU(),
            nn.Dropout(p=0.3),
            nn.Linear(hidden_dim, hidden_dim // 2),
            nn.BatchNorm1d(hidden_dim // 2),
            nn.ReLU(),
            nn.Linear(hidden_dim // 2, num_classes)
        )
        self._init_weights()

    def _init_weights(self):
        for m in self.modules():
            if isinstance(m, nn.Linear):
                nn.init.kaiming_normal_(m.weight, nonlinearity='relu')
                nn.init.zeros_(m.bias)

    def forward(self, x):
        return self.network(x)

# Training loop step
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = DeepClassifier().to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-2)

# Synthetic batch forward-backward step
inputs = torch.randn(32, 64).to(device)
labels = torch.randint(0, 10, (32,)).to(device)

optimizer.zero_grad()
outputs = model(inputs)
loss = criterion(outputs, labels)
loss.backward()
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)  # prevent exploding gradients
optimizer.step()

print(f"Step Loss: {loss.item():.4f}")
```

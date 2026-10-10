---
title: Supervised Learning, Linear Regression, and Regularization (L1 & L2)
subject: Machine Learning
category: AI & Machine Learning
difficulty: medium
importance: high
tags:
  - ml
  - machine-learning
  - linear-regression
  - logistic-regression
  - regularization
  - gradient-descent
---

# Supervised Learning, Linear Regression, and Regularization (L1 & L2)

Supervised machine learning algorithms learn a mapping function $f: X \to Y$ from labeled input-output pairs.

---

## 1. Linear Regression and the Normal Equation

Linear regression predicts continuous target $y$ as a linear combination of input features $x$:
$$\hat{y} = \theta_0 + \theta_1 x_1 + \theta_2 x_2 + \dots + \theta_d x_d = \theta^T x$$

### Mean Squared Error (MSE) Cost Function
$$J(\theta) = \frac{1}{2m} \sum_{i=1}^{m} (\hat{y}^{(i)} - y^{(i)})^2 = \frac{1}{2m} \|X\theta - y\|_2^2$$

### Closed-Form Solution (Normal Equation)
Setting the gradient $\nabla_\theta J(\theta) = 0$ yields:
$$\theta^* = (X^T X)^{-1} X^T y$$
- **Computational Complexity:** $O(d^3)$ matrix inversion time, impractical when feature count $d > 10,000$.
- **Collinearity:** If features are linearly dependent, $X^T X$ is singular (non-invertible).

---

## 2. Gradient Descent Optimization

When closed-form inversion is computationally infeasible, iterative gradient descent updates weights in the direction of steepest descent:
$$\theta := \theta - \alpha \nabla_\theta J(\theta) = \theta - \frac{\alpha}{m} X^T (X\theta - y)$$
where $\alpha$ is the learning rate.

| Variant | Batch Size | Pros | Cons |
|---|---|---|---|
| **Batch Gradient Descent (BGD)** | Entire dataset $m$ | Stable, deterministic convergence | Slow, memory intensive for big data |
| **Stochastic Gradient Descent (SGD)** | 1 sample per step | Ultra fast, escapes local minima | High variance, noisy loss trajectory |
| **Mini-Batch Gradient Descent** | 32, 64, 128, 256 | GPU vectorized parallelism, smooth loss | Requires tuning batch size hyperparameter |

---

## 3. Regularization: Ridge (L2) vs. Lasso (L1) vs. ElasticNet

Regularization penalizes large parameter magnitudes to reduce model variance and prevent overfitting.

### Ridge Regression (L2 Penalty)
$$J_{\text{Ridge}}(\theta) = \text{MSE}(\theta) + \lambda \sum_{j=1}^{d} \theta_j^2 = \text{MSE}(\theta) + \lambda \|\theta\|_2^2$$
- Shrinks weights toward zero proportionally.
- Analytical solution: $\theta^* = (X^T X + \lambda I)^{-1} X^T y$ (always invertible even with multicollinear features).
- Does **not** set weights strictly to zero.

### Lasso Regression (L1 Penalty)
$$J_{\text{Lasso}}(\theta) = \text{MSE}(\theta) + \lambda \sum_{j=1}^{d} |\theta_j| = \text{MSE}(\theta) + \lambda \|\theta\|_1$$
- Drives unimportant feature weights **exactly to zero** at non-differentiable diamond vertices.
- Performs intrinsic **feature selection** producing sparse models.

### ElasticNet
Combines L1 and L2 penalties with mixing parameter $r \in [0, 1]$:
$$J_{\text{Elastic}}(\theta) = \text{MSE}(\theta) + r \lambda \|\theta\|_1 + \frac{1 - r}{2} \lambda \|\theta\|_2^2$$

### Python Implementation with Scikit-Learn

```python
import numpy as np
from sklearn.linear_model import Ridge, Lasso, ElasticNet
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

def build_regularized_model(model_type='ridge', alpha=1.0):
    """
    Constructs a regularized regression pipeline with automated feature scaling.
    Always scale features before L1/L2 regularization to prevent scale distortion!
    """
    scaler = StandardScaler()

    if model_type == 'ridge':
        regressor = Ridge(alpha=alpha, solver='auto')
    elif model_type == 'lasso':
        regressor = Lasso(alpha=alpha, max_iter=5000)
    elif model_type == 'elastic':
        regressor = ElasticNet(alpha=alpha, l1_ratio=0.5)
    else:
        raise ValueError(f"Unknown model_type: {model_type}")

    pipeline = Pipeline([
        ('scaler', scaler),
        ('model', regressor)
    ])
    return pipeline
```

---

## 4. Logistic Regression for Binary Classification

Logistic regression passes the linear combination through the non-linear Sigmoid (logistic) function:
$$\sigma(z) = \frac{1}{1 + e^{-z}}, \quad P(y=1|x) = \sigma(\theta^T x)$$

### Binary Cross-Entropy (Log-Loss)
$$J(\theta) = -\frac{1}{m} \sum_{i=1}^{m} \left[ y^{(i)} \log(\hat{p}^{(i)}) + (1 - y^{(i)}) \log(1 - \hat{p}^{(i)}) \right]$$
- Convex loss function guaranteed to converge to a global minimum via gradient descent.
- Decision boundary is linear: $\theta^T x = 0$ corresponds to probability $\hat{p} = 0.5$.

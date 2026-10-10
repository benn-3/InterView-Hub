---
title: Decision Trees, Ensemble Methods (Random Forest, XGBoost), and Clustering
subject: Machine Learning
category: AI & Machine Learning
difficulty: hard
importance: high
tags:
  - ml
  - decision-trees
  - random-forest
  - xgboost
  - gradient-boosting
  - k-means
  - pca
---

# Decision Trees, Ensemble Methods (Random Forest, XGBoost), and Clustering

---

## 1. Decision Trees: Splitting Criteria and Pruning

Decision trees recursively partition feature space into axis-aligned hyper-rectangles:
- **Gini Impurity (CART Algorithm):**
  $$Gini(S) = 1 - \sum_{k=1}^{K} p_k^2$$
- **Information Gain / Entropy (ID3 / C4.5):**
  $$H(S) = -\sum_{k=1}^{K} p_k \log_2(p_k), \quad IG(S, A) = H(S) - \sum_{v \in Values(A)} \frac{|S_v|}{|S|} H(S_v)$$
- **Variance Reduction (Regression):** Minimizes sum of squared errors $\sum (y_i - \bar{y})^2$ in child partitions.

### Overfitting Controls
- **Pre-pruning:** Stop early using `max_depth`, `min_samples_split`, `min_samples_leaf`, `max_features`.
- **Post-pruning (Cost Complexity Pruning):** Minimizes cost function $R_\alpha(T) = R(T) + \alpha |T|$ where $|T|$ is number of terminal leaves.

---

## 2. Bagging vs. Boosting Ensemble Paradigms

```
                  ENSEMBLE LEARNING
                     /          \
            BAGGING              BOOSTING
    (Bootstrap Aggregating)   (Sequential Error Correction)
         /           \             /              \
Random Forest     ExtraTrees    AdaBoost       Gradient Boosting / XGBoost
(Parallel trees,               (Weights sample  (Fits pseudo-residuals
 reduces variance)              difficulties)    reduces bias)
```

### Random Forest (Bagging)
1. **Bootstrap Sampling:** Draw $m$ samples with replacement from training dataset of size $m$ (leaving ~36.8% out-of-bag samples for validation).
2. **Feature Subsampling:** At each node split, consider only a random subset $k = \sqrt{d}$ (classification) or $k = d/3$ (regression) features to decorrelate individual trees.
3. **Aggregation:** Final prediction is majority vote or mean average. Dramatically suppresses model **variance**.

### Gradient Boosting & XGBoost (Boosting)
Instead of averaging independent trees, boosting builds trees **sequentially** where each tree $T_t$ fits the negative gradient (residuals) of the pseudo-loss function:
$$r_{i, t} = -\left[ \frac{\partial L(y_i, F(x_i))}{\partial F(x_i)} \right]_{F = F_{t-1}}$$

### Why XGBoost Dominates Structured Tabular Data:
1. **Second-Order Taylor Approximation:** Uses both 1st-order gradients ($g_i$) and 2nd-order hessians ($h_i$) for accurate leaf weight derivation:
   $$w_j^* = -\frac{\sum_{i \in I_j} g_i}{\sum_{i \in I_j} h_i + \lambda}$$
2. **Built-in Regularization:** Penalizes tree complexity via L1 ($\alpha$) and L2 ($\lambda$) weights plus leaf penalty $\gamma$.
3. **Hardware Optimization:** Out-of-core computing, block compression, cache-aware data access, and parallel histogram building.

---

## 3. Unsupervised Learning: K-Means Clustering and PCA

### K-Means Clustering
Partitions $m$ data points into $K$ clusters minimizing within-cluster sum of squares (WCSS / Inertia):
$$J = \sum_{j=1}^{K} \sum_{x \in S_j} \|x - \mu_j\|^2$$
- **Algorithm (Lloyd's):**
  1. Initialize $K$ cluster centroids (use **K-Means++** to maximize distance between initial centroids).
  2. Assign each point $x_i$ to nearest centroid $\mu_k$.
  3. Recompute centroid locations as mean of assigned points.
  4. Repeat until convergence.
- **Finding Optimal K:** Elbow method (WCSS curve bend) and Silhouette score ($s \in [-1, 1]$).

### Principal Component Analysis (PCA)
Linear dimensionality reduction technique that projects high-dimensional data onto orthogonal axes of maximum variance:
1. Mean-center feature matrix $X$ and scale to unit variance.
2. Compute $d \times d$ covariance matrix $\Sigma = \frac{1}{m} X^T X$.
3. Compute eigenvectors and eigenvalues via Singular Value Decomposition (SVD): $X = U \Sigma V^T$.
4. Select top $k$ eigenvectors corresponding to largest eigenvalues (retaining 95%+ explained variance ratio).

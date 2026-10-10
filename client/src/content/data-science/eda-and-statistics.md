---
title: Exploratory Data Analysis (EDA), Inferential Statistics, and A/B Testing
subject: Data Science
category: Data & Analytics
difficulty: medium
importance: high
tags:
  - data-science
  - statistics
  - hypothesis-testing
  - eda
  - ab-testing
  - p-value
---

# Exploratory Data Analysis (EDA), Inferential Statistics, and A/B Testing

Data science bridges business domain intuition, descriptive and inferential statistics, and machine learning modeling.

---

## 1. Descriptive vs. Inferential Statistics

- **Descriptive Statistics:** Summarizes sample data through central tendencies (Mean, Median, Mode) and dispersion (Variance, Standard Deviation, Interquartile Range IQR).
- **Inferential Statistics:** Draws conclusions about population parameters from sample observations using probability distributions and hypothesis tests.

### Parametric vs. Non-Parametric Assumptions
- **Central Limit Theorem (CLT):** The sampling distribution of the sample mean approaches a Normal Gaussian distribution ($N(\mu, \sigma^2/n)$) as sample size $n \ge 30$, regardless of the underlying population shape.
- **Skewness & Kurtosis:**
  - Positive skew (Right-tailed): $\text{Mean} > \text{Median} > \text{Mode}$.
  - Negative skew (Left-tailed): $\text{Mode} > \text{Median} > \text{Mean}$.
  - Mitigation: Apply log transform ($\log(1+x)$) or Box-Cox transformation to normalize distributions.

---

## 2. Hypothesis Testing Framework

```
Hypothesis Testing Workflow:
1. Null Hypothesis (H_0): No effect or difference (Default baseline).
2. Alternative Hypothesis (H_1): Measurable effect exists.
3. Significance Level (\alpha): Probability of rejecting true H_0 (Typically 0.05 or 0.01).
4. Compute Test Statistic: (e.g. t, z, F, \chi^2).
5. p-value: Probability of observing data at least as extreme under H_0.
6. Decision: If p < \alpha, reject H_0 in favor of H_1.
```

### Errors in Hypothesis Testing
- **Type I Error ($\alpha$):** False Positive — Rejecting $H_0$ when it was actually true.
- **Type II Error ($\beta$):** False Negative — Failing to reject $H_0$ when $H_1$ was true.
- **Statistical Power ($1 - \beta$):** Probability of correctly detecting a real effect when it exists (Standard target: 80% or 0.80).

### Key Statistical Tests Table

| Test Name | Conditions / Use Case | Assumptions |
|---|---|---|
| **Two-Sample Student's t-test** | Compare means of 2 independent groups | Continuous, normally distributed, equal variance |
| **Welch's t-test** | Compare means of 2 groups with **unequal** variances | Continuous, normal, relaxes homoscedasticity |
| **Paired t-test** | Compare before-and-after on the same subjects | Continuous dependent differences normally distributed |
| **ANOVA (One-Way)** | Compare means across 3+ independent groups | Continuous, normality, homogeneity of variance |
| **Chi-Square ($\chi^2$) Test** | Test independence or goodness-of-fit for categorical data | Counts $\ge 5$ in each contingency table cell |
| **Mann-Whitney U Test** | Non-parametric alternative to independent t-test | Ordinal or non-normal continuous data |

---

## 3. End-to-End A/B Testing Architecture

A/B testing is randomized controlled experimentation used to validate product and algorithmic modifications.

```
A/B Test Lifecycle:
Hypothesis ──► Sample Size Calculation ──► Random Assignment ──► Experiment Run ──► Statistical Evaluation ──► Ship / Kill
```

### Sample Size Determination (Power Analysis)
Sample size per variant $n$ depends on:
$$n = \frac{2 (Z_{\alpha/2} + Z_\beta)^2 \cdot \sigma^2}{\text{MDE}^2}$$
- **MDE (Minimum Detectable Effect):** Smallest relative uplift with business significance. Smaller MDE requires exponentially larger sample sizes.
- **Significance Level $\alpha$ (False Positive Rate):** Usually 5% ($Z_{0.025} = 1.96$).
- **Statistical Power $1 - \beta$:** Usually 80% ($Z_{0.2} = 0.84$).

### Common A/B Testing Pitfalls
1. **Peeking Problem:** Checking p-values continuously and stopping when $p < 0.05$ artificially inflates false positive rate up to 30%+. Use fixed-horizon testing or Sequential Testing (e.g., SPRT).
2. **Network Effects (Interference):** Violation of SUTVA (Stable Unit Treatment Value Assumption) in marketplace apps (e.g., Uber, Airbnb). Mitigated via cluster randomization or synthetic controls.
3. **Novelty & Primacy Effects:** Users either react favorably out of curiosity or unfavorably out of habit disruption. Run tests for multiple full business cycles (minimum 2 weeks) to let behavior normalize.

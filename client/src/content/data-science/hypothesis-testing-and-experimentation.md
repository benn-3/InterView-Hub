---
title: Data Science: Hypothesis Testing, A/B Testing, and Business Metrics
subject: Data Science
category: Data & Analytics
difficulty: medium
importance: high
tags:
  - data-science
  - statistics
  - hypothesis-testing
  - ab-testing
  - p-value
  - p-hacking
  - sample-size
  - metrics
---

# Data Science: Hypothesis Testing, A/B Testing, and Business Metrics

Data science bridges technical statistical rigor and strategic business decision-making through experimentation, causal inference, and metrics engineering.

---

## 1. Fundamentals of Hypothesis Testing

Hypothesis testing provides a framework to determine whether observed differences in metrics are statistically significant or attributable to random sampling noise.

- **Null Hypothesis ($H_0$)**: There is no true difference between the control and treatment groups ($\mu_{\text{treatment}} - \mu_{\text{control}} = 0$).
- **Alternative Hypothesis ($H_1$)**: There is a genuine nonzero difference ($\mu_{\text{treatment}} \ne \mu_{\text{control}}$ for two-tailed, or $\mu_{\text{treatment}} > \mu_{\text{control}}$ for one-tailed).
- **p-value**: The probability of obtaining test results at least as extreme as the observed data, assuming $H_0$ is true. If $p < \alpha$ (commonly $\alpha = 0.05$), we reject the null hypothesis.

### Type I vs. Type II Errors

| Reality \ Decision | Fail to Reject $H_0$ | Reject $H_0$ |
| :--- | :--- | :--- |
| **$H_0$ is True** | Correct Decision ($1 - \alpha$) | **Type I Error ($\alpha$)**: False Positive (Ship a feature that actually had no effect) |
| **$H_0$ is False** | **Type II Error ($\beta$)**: False Negative (Miss a winning feature) | **Statistical Power ($1 - \beta$)**: True Positive (Correctly detect true effect) |

---

## 2. Statistical Tests Decision Guide

```
Continuous Metric (e.g., Average Order Value, Session Duration)
  ├── 2 Groups Normal (Sample size > 30): Two-Sample Independent Student's t-test (or Welch's t-test if variances differ)
  ├── 2 Groups Non-Normal / Skewed: Mann-Whitney U test (Wilcoxon rank-sum)
  └── >2 Groups: One-Way ANOVA (followed by Tukey's HSD post-hoc test)

Discrete / Proportion Metric (e.g., Conversion Rate, Click-Through Rate)
  ├── 2 Groups: Two-proportion Z-test or Chi-Square Test of Independence
  └── Small Counts (Cells < 5): Fisher's Exact Test
```

---

## 3. End-to-End A/B Experimentation Pipeline

### Step 1: Power Analysis & Minimum Detectable Effect (MDE)
Before launching an experiment, compute the sample size needed to detect an MDE at chosen significance $\alpha = 0.05$ and power $1 - \beta = 0.80$:

```python
import numpy as np
import scipy.stats as stats
import statsmodels.stats.api as sms

# Power analysis for conversion rate
baseline_cvr = 0.12  # 12% baseline conversion
mde_relative = 0.05  # want to detect a 5% relative lift (0.12 -> 0.126)
target_cvr = baseline_cvr * (1 + mde_relative)

effect_size = sms.proportion_effectsize(baseline_cvr, target_cvr)
required_sample_per_variant = sms.NormalIndPower().solve_power(
    effect_size=effect_size,
    power=0.80,
    alpha=0.05,
    ratio=1.0
)

print(f"Required samples per variant: {int(np.ceil(required_sample_per_variant)):,}")
```

### Step 2: Guardrails against Pitfalls
1. **Peeking Problem (Repeated Testing)**: Stopping an experiment as soon as $p < 0.05$ dramatically inflates Type I error up to 30%+. Use fixed-horizon testing or Sequential Testing (SPRT - Sequential Probability Ratio Test).
2. **Network Effects & Interference**: In two-sided marketplaces (e.g., Uber or Airbnb), treating drivers in a city affects control drivers. Solved by **cluster randomization** (randomizing by city/geography) or **switchback experiments** (alternating treatment by time windows).
3. **Novelty and Primacy Effects**: Users initially click new UI buttons out of curiosity (novelty effect) or resist layout shifts (primacy effect). Allow a burn-in period before calculating final metrics.

---

## 4. North Star Metrics, Driver Trees, and Counter-Metrics

A robust metric framework prevents local optimization at the expense of organizational health:

- **North Star Metric (NSM)**: The core measure of value delivered to customers (e.g., Spotify: "Time spent listening to music"; Airbnb: "Nights booked").
- **Input / Driver Metrics**: Actionable levers that directly influence the North Star (e.g., Search-to-Listing Conversion Rate, Onboarding Completion Rate).
- **Counter-Metrics (Guardrail Metrics)**: Safety metrics that ensure short-term gains do not destroy retention or system stability (e.g., Email Unsubscribe Rate, App Crash Rate, Page Load Latency p95).

```python
# Welch's t-test calculation in Python
control_revenue = np.array([45.2, 52.1, 0.0, 110.5, 34.0, 78.2, 0.0, 95.4])
treatment_revenue = np.array([55.0, 64.2, 22.1, 130.0, 48.3, 85.0, 12.0, 102.1])

t_stat, p_val = stats.ttest_ind(treatment_revenue, control_revenue, equal_var=False)
print(f"Welch's t-stat: {t_stat:.3f}, p-value: {p_val:.4f}")
```

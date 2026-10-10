---
title: MLOps: Experiment Tracking, Data Versioning, and Automated ML CI/CD Pipelines
subject: MLOps and AI Engineering
category: Artificial Intelligence & Data
difficulty: hard
importance: high
tags:
  - mlops
  - ai-engineering
  - mlflow
  - dvc
  - model-registry
  - cicd
  - feature-store
  - kubeflow
---

# MLOps: Experiment Tracking, Data Versioning, and Automated ML CI/CD Pipelines

MLOps (Machine Learning Operations) applies DevOps disciplines, automated CI/CD validation, and data versioning to the machine learning lifecycle.

---

## 1. The MLOps Maturity Spectrum

Traditional software engineering tests deterministic code logic (`Code -> Artifact`). Machine learning incorporates stochastic data dynamics (`Code + Data + Hyperparameters -> Probabilistic Model Artifact`).

- **Level 0: Manual Process**: Ad-hoc Jupyter notebooks, manual model export as `.pkl` files shared over Slack/S3, no experiment lineage, script-based deployments.
- **Level 1: Automated ML Pipelines**: Automated model training triggered on new data availability, continuous validation against test splits, metadata tracking.
- **Level 2: End-to-End CI/CD Automation**: Automated pipeline testing, shadow deployment with canary release, automatic rollback on performance degradation or drift.

---

## 2. Experiment Tracking & Model Registries (MLflow & Weights & Biases)

An experiment tracker captures all training metadata to guarantee reproducibility:

```python
import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import f1_score, roc_auc_score

mlflow.set_experiment("fraud_detection_production")

with mlflow.start_run(run_name="rf_trees_300_depth_12"):
    params = {"n_estimators": 300, "max_depth": 12, "class_weight": "balanced"}
    mlflow.log_params(params)

    clf = RandomForestClassifier(**params)
    clf.fit(X_train, y_train)

    preds = clf.predict(X_test)
    probs = clf.predict_proba(X_test)[:, 1]

    f1 = f1_score(y_test, preds)
    auc = roc_auc_score(y_test, probs)

    mlflow.log_metrics({"test_f1": f1, "test_auc": auc})
    mlflow.sklearn.log_model(
        sk_model=clf,
        artifact_path="model",
        registered_model_name="fraud_detection_service"
    )
```

### Model Registry Lifecycle Stages
A centralized registry stores immutable versions with governance metadata:
- `Development` $\rightarrow$ `Staging` $\rightarrow$ `Production` $\rightarrow$ `Archived`.
- Automated GitHub Actions verify that a new model candidate outperforms the current production baseline on golden holdout evaluation sets before promoting stages.

---

## 3. Data & Feature Versioning: DVC and Feast Feature Store

### DVC (Data Version Control)
Git cannot efficiently store multi-gigabyte datasets and weights. DVC stores small `.dvc` metadata hash pointer files in Git while syncing large dataset blobs to S3/GCS buckets:
```bash
dvc add data/raw_clickstream.parquet
git add data/raw_clickstream.parquet.dvc .gitignore
git commit -m "chore: update clickstream training split to v2.4"
dvc push
```

### Feature Stores (Feast / Hopsworks)
Prevents **training-serving skew** (calculating features differently during batch training vs. real-time low-latency inference):
- **Offline Store (Snowflake / BigQuery / Parquet)**: Computes historical point-in-time features with time-travel joins to prevent future data leakage.
- **Online Store (Redis / DynamoDB)**: Key-value store providing sub-10ms feature retrieval (`get_online_features(entity_keys=[user_id])`) at prediction time.

---

## 4. ML CI/CD Pipeline Architecture

```
GitHub PR Triggered:
  ├── Linting & Unit Tests (pytest, flake8)
  ├── Data Quality Validation (Great Expectations: assert null_pct < 0.01)
  ├── Pipeline Test Run (Kubeflow / Airflow / GitHub Action on mini dataset)
  └── Model Performance Gate:
        candidate_f1 >= baseline_production_f1 + 0.01 AND latency_p95 <= 45ms
        ├── Pass ──► Register in Staging & trigger automated Canary Deployment
        └── Fail ──► Reject PR and post failure metric report to PR comments
```

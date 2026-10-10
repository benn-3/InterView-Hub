// 105 Memory-Recall Flashcards (15 per subject) for the 7 new technical subjects

export const aiCurriculumFlashcards = [
  // ==================== 1. ARTIFICIAL INTELLIGENCE (15 Flashcards) ====================
  {
    id: 'ai_fc_1',
    subject: 'Artificial Intelligence',
    front: 'What are the four components of the PEAS agent framework?',
    back: '• Performance Measure: Objective metric of success\n• Environment: External context the agent operates in\n• Actuators: Mechanisms used to perform actions\n• Sensors: Inputs used to perceive the environment',
    category: 'Agent Foundations'
  },
  {
    id: 'ai_fc_2',
    subject: 'Artificial Intelligence',
    front: 'What is the A* Search evaluation function, and what makes a heuristic admissible?',
    back: '• f(n) = g(n) + h(n), where g(n) is path cost so far and h(n) is heuristic estimate to goal.\n• Admissibility: h(n) never overestimates the true cost to reach the goal (0 <= h(n) <= h*(n)). Guarantees optimal path in tree search.',
    category: 'Search Algorithms'
  },
  {
    id: 'ai_fc_3',
    subject: 'Artificial Intelligence',
    front: 'What is the pruning condition in Alpha-Beta adversarial search?',
    back: 'Prune when α >= β.\n• α: Best score MAX is guaranteed along path (initially -∞).\n• β: Best score MIN is guaranteed along path (initially +∞).',
    category: 'Adversarial Search'
  },
  {
    id: 'ai_fc_4',
    subject: 'Artificial Intelligence',
    front: 'What does the AC-3 algorithm do in Constraint Satisfaction Problems?',
    back: 'Enforces Arc Consistency on binary constraints. For every pair (Xi, Xj), it prunes values from Domain(Xi) that have no satisfying match in Domain(Xj), reducing the search space before backtracking.',
    category: 'Constraint Satisfaction'
  },
  {
    id: 'ai_fc_5',
    subject: 'Artificial Intelligence',
    front: 'How does Simulated Annealing escape local optima?',
    back: 'It accepts worse moves probabilistically with probability P = exp(ΔE / T). High initial temperature T promotes broad exploration; as T cools toward 0, it behaves like greedy hill climbing.',
    category: 'Local Search'
  },
  {
    id: 'ai_fc_6',
    subject: 'Artificial Intelligence',
    front: 'What is Resolution Refutation in First-Order Logic?',
    back: 'An automated proof method operating on Conjunctive Normal Form (CNF). Negate the goal sentence, add it to the knowledge base, and resolve complementary literals until deriving the empty clause (contradiction).',
    category: 'Knowledge & Logic'
  },
  {
    id: 'ai_fc_7',
    subject: 'Artificial Intelligence',
    front: 'What are the three components of a PDDL / STRIPS planning action?',
    back: '1. Preconditions: Fluents that must be TRUE to execute action.\n2. Add Effects: Fluents made TRUE by the action.\n3. Delete Effects: Fluents made FALSE by the action.',
    category: 'Automated Planning'
  },
  {
    id: 'ai_fc_8',
    subject: 'Artificial Intelligence',
    front: 'What is the difference between Forward Chaining and Backward Chaining?',
    back: '• Forward Chaining: Data-driven. Starts with known facts and fires rules to deduce new conclusions.\n• Backward Chaining: Goal-driven. Starts with hypothesis and searches backwards to find supporting rules.',
    category: 'Expert Systems'
  },
  {
    id: 'ai_fc_9',
    subject: 'Artificial Intelligence',
    front: 'State the Bellman Optimality Equation for state value V*(s).',
    back: 'V*(s) = max_a Σ_{s\'} P(s\' | s, a) [ R(s, a, s\') + γ V*(s\') ]\nBalances immediate reward with discounted future return γ.',
    category: 'Markov Decision Processes'
  },
  {
    id: 'ai_fc_10',
    subject: 'Artificial Intelligence',
    front: 'In a Bayesian Network, what happens at a Collider node (A -> B <- C) when B is observed?',
    back: 'Observing the collider B (or its descendants) makes previously independent parents A and C conditionally DEPENDENT (the "explaining away" effect).',
    category: 'Probabilistic Reasoning'
  },
  {
    id: 'ai_fc_11',
    subject: 'Artificial Intelligence',
    front: 'What is the MRV heuristic in CSP backtracking search?',
    back: 'Minimum Remaining Values ("Fail-First"). Chooses the unassigned variable with the fewest legal values left in its domain, pruning branches that are doomed to fail early.',
    category: 'Constraint Satisfaction'
  },
  {
    id: 'ai_fc_12',
    subject: 'Artificial Intelligence',
    front: 'What is a Nash Equilibrium in multi-agent game theory?',
    back: 'A profile of strategies where no player has an incentive to unilaterally deviate while other players maintain their chosen strategies.',
    category: 'Game Theory'
  },
  {
    id: 'ai_fc_13',
    subject: 'Artificial Intelligence',
    front: 'What is the difference between Demographic Parity and Equalized Odds in AI ethics?',
    back: '• Demographic Parity: Acceptance rates are equal across protected groups P(Ŷ=1 | A=0) = P(Ŷ=1 | A=1).\n• Equalized Odds: True positive and false positive rates are equal across groups conditioning on true outcome Y.',
    category: 'AI Ethics'
  },
  {
    id: 'ai_fc_14',
    subject: 'Artificial Intelligence',
    front: 'Why is Iterative Deepening DFS (IDDFS) optimal for large unweighted search spaces?',
    back: 'Combines the linear memory efficiency of DFS (O(bd)) with the completeness and shallow-path optimality of BFS (O(b^d)), with minimal overhead on repeated early levels.',
    category: 'Search Algorithms'
  },
  {
    id: 'ai_fc_15',
    subject: 'Artificial Intelligence',
    front: 'What is the Frame Problem in classical AI?',
    back: 'The computational challenge of representing everything that DOES NOT change when an action occurs without enumerating millions of non-effects in logical state representations.',
    category: 'Knowledge Representation'
  },

  // ==================== 2. MACHINE LEARNING (15 Flashcards) ====================
  {
    id: 'ml_fc_1',
    subject: 'Machine Learning',
    front: 'What is the Bias-Variance Decomposition formula for MSE?',
    back: 'MSE(x) = Bias[f̂(x)]² + Var(f̂(x)) + σ²\n• High Bias: Underfitting (model too simple)\n• High Variance: Overfitting (model too sensitive to training noise)\n• σ²: Irreducible noise',
    category: 'Core Theory'
  },
  {
    id: 'ml_fc_2',
    subject: 'Machine Learning',
    front: 'Why does L1 Lasso regularization produce sparse models while L2 Ridge does not?',
    back: '• L1 has diamond-shaped constraints with sharp corners at axes (w_i=0), forcing coefficients to exactly 0.\n• L2 has spherical circular constraints, shrinking weights toward zero proportionally without setting them to 0.',
    category: 'Regularization'
  },
  {
    id: 'ml_fc_3',
    subject: 'Machine Learning',
    front: 'When should PR-AUC be chosen over ROC-AUC?',
    back: 'In severe class imbalance (e.g. fraud < 0.5%). ROC-AUC uses False Positive Rate which includes True Negatives, masking huge false positive spikes. PR-AUC focuses exclusively on the minority positive class.',
    category: 'Evaluation Metrics'
  },
  {
    id: 'ml_fc_4',
    subject: 'Machine Learning',
    front: 'What is the core difference between Random Forests (Bagging) and XGBoost (Boosting)?',
    back: '• Random Forest: Trains independent deep trees in parallel on bootstrap samples, reducing VARIANCE.\n• XGBoost: Trains shallow trees sequentially to fit the negative gradients of previous trees, reducing BIAS.',
    category: 'Ensemble Learning'
  },
  {
    id: 'ml_fc_5',
    subject: 'Machine Learning',
    front: 'What is the Kernel Trick in Support Vector Machines (SVM)?',
    back: 'Computes inner products in high-dimensional feature space directly in input space K(x, z) = ⟨Φ(x), Φ(z)⟩ without explicitly computing high-dimensional coordinates Φ(x).',
    category: 'Support Vector Machines'
  },
  {
    id: 'ml_fc_6',
    subject: 'Machine Learning',
    front: 'How does K-Means++ improve centroid initialization over standard K-Means?',
    back: 'Picks the first centroid randomly, then chooses subsequent centroids with probability proportional to their squared distance D(x)² from the closest existing centroid, ensuring O(log k) competitive optimality.',
    category: 'Clustering'
  },
  {
    id: 'ml_fc_7',
    subject: 'Machine Learning',
    front: 'Why must features be standardized before applying PCA?',
    back: 'PCA projects along directions of maximum variance. Features with large numerical scales will dominate covariance calculations regardless of informational value.',
    category: 'Dimensionality Reduction'
  },
  {
    id: 'ml_fc_8',
    subject: 'Machine Learning',
    front: 'How does SMOTE generate synthetic minority samples?',
    back: 'For a minority instance, it finds its k-nearest minority neighbors and synthesizes new points along the connecting line segment: x_new = x_i + λ * (x_neighbor - x_i) where λ ∈ [0, 1].',
    category: 'Class Imbalance'
  },
  {
    id: 'ml_fc_9',
    subject: 'Machine Learning',
    front: 'What is Target Leakage in target encoding, and how is it prevented?',
    back: 'Using the ground-truth target label to calculate categorical means leaks labels into training features. Prevented via Out-Of-Fold (OOF) encoding, smoothing priors, and adding noise.',
    category: 'Feature Engineering'
  },
  {
    id: 'ml_fc_10',
    subject: 'Machine Learning',
    front: 'Why is standard K-Fold invalid for time-series data, and what is the fix?',
    back: 'Standard K-Fold randomly shuffles data, leaking future observations into past training folds. Fix: Use TimeSeriesSplit (rolling/expanding window forward splits).',
    category: 'Cross-Validation'
  },
  {
    id: 'ml_fc_11',
    subject: 'Machine Learning',
    front: 'Compare Gini Impurity and Entropy in decision trees.',
    back: '• Gini: 1 - Σ p_i² (computationally faster, no logarithms)\n• Entropy: -Σ p_i log2(p_i) (penalizes mixed classes slightly more)\nBoth yield nearly identical trees in practice.',
    category: 'Decision Trees'
  },
  {
    id: 'ml_fc_12',
    subject: 'Machine Learning',
    front: 'How does DBSCAN classify data points into three types?',
    back: '• Core Point: Has >= MinPts within radius ε.\n• Border Point: Within ε of a core point but has < MinPts.\n• Noise: Neither core nor border point (treated as outlier).',
    category: 'Clustering'
  },
  {
    id: 'ml_fc_13',
    subject: 'Machine Learning',
    front: 'What is the log-odds (logit) formulation in Logistic Regression?',
    back: 'ln(p / (1 - p)) = w^T x\nInverting yields p = 1 / (1 + exp(-w^T x)), squashing unbounded linear outputs into the range (0, 1).',
    category: 'Classification'
  },
  {
    id: 'ml_fc_14',
    subject: 'Machine Learning',
    front: 'What are SHAP values and what does the Efficiency property state?',
    back: 'Game-theoretic feature attribution based on Shapley values. Efficiency ensures feature contributions sum up exactly to the difference between prediction and baseline: f(x) = E[f(x)] + Σ φ_i.',
    category: 'Explainability'
  },
  {
    id: 'ml_fc_15',
    subject: 'Machine Learning',
    front: 'What speedup techniques does LightGBM introduce over XGBoost?',
    back: '1. Histogram Binning (bins continuous features into 256 discrete bins)\n2. GOSS (Gradient-based One-Side Sampling of instances)\n3. Leaf-wise (best-first) tree growth.',
    category: 'Boosting'
  },

  // ==================== 3. DATA SCIENCE (15 Flashcards) ====================
  {
    id: 'ds_fc_1',
    subject: 'Data Science',
    front: 'What does the Central Limit Theorem (CLT) state?',
    back: 'Given independent and identically distributed (i.i.d.) random variables with finite mean μ and variance σ², the sample mean x̄ approaches a Normal distribution N(μ, σ²/n) as sample size n grows (n >= 30).',
    category: 'Inferential Statistics'
  },
  {
    id: 'ds_fc_2',
    subject: 'Data Science',
    front: 'What is a p-value and what is p-hacking?',
    back: '• p-value: Probability of obtaining test results at least as extreme as observed, assuming H0 is true.\n• p-hacking: Running multiple tests on subsets or variables until p < 0.05 without statistical correction.',
    category: 'Hypothesis Testing'
  },
  {
    id: 'ds_fc_3',
    subject: 'Data Science',
    front: 'What four parameters determine the required sample size in an A/B test?',
    back: '1. Baseline conversion rate (p1)\n2. Minimum Detectable Effect (MDE / Δ)\n3. Significance level α (Type I error, e.g. 0.05)\n4. Statistical Power 1 - β (Type II error, e.g. 0.80)',
    category: 'Experimentation'
  },
  {
    id: 'ds_fc_4',
    subject: 'Data Science',
    front: 'What is Sample Ratio Mismatch (SRM) and how is it detected?',
    back: 'When observed traffic splits (e.g. 48,000 vs 52,000) deviate significantly from planned ratios (50:50). Detected using a Chi-Square Goodness-of-Fit test; invalidates experiment results.',
    category: 'A/B Testing'
  },
  {
    id: 'ds_fc_5',
    subject: 'Data Science',
    front: 'What is Simpson’s Paradox?',
    back: 'A statistical phenomenon where a trend observed in aggregate data disappears or completely reverses when the data is separated into subgroups due to confounding variables.',
    category: 'Statistical Pitfalls'
  },
  {
    id: 'ds_fc_6',
    subject: 'Data Science',
    front: 'Compare Pearson Correlation and Spearman Rank Correlation.',
    back: '• Pearson: Evaluates linear relationships between continuous variables; sensitive to outliers.\n• Spearman: Evaluates monotonic relationships using ranked values; robust to non-linearity and outliers.',
    category: 'Correlation'
  },
  {
    id: 'ds_fc_7',
    subject: 'Data Science',
    front: 'What are the Tukey outlier thresholds on a Box Plot?',
    back: '• IQR = Q3 - Q1\n• Lower Outlier Boundary: Q1 - 1.5 * IQR\n• Upper Outlier Boundary: Q3 + 1.5 * IQR\nPoints outside these fences are plotted as outliers.',
    category: 'Exploratory Data Analysis'
  },
  {
    id: 'ds_fc_8',
    subject: 'Data Science',
    front: 'What is the difference between MCAR, MAR, and MNAR missing data?',
    back: '• MCAR: Missing completely at random (deletion is safe).\n• MAR: Missingness depends on observed data (modelable via MICE).\n• MNAR: Missingness depends on the unobserved value itself (e.g. high earners omitting salary).',
    category: 'Data Cleaning'
  },
  {
    id: 'ds_fc_9',
    subject: 'Data Science',
    front: 'When should Welch’s t-test be used over Student’s t-test?',
    back: 'When group variances are unequal (heteroscedasticity) or sample sizes differ. Welch’s t-test drops the equal variance assumption and should be the default two-sample test.',
    category: 'Hypothesis Testing'
  },
  {
    id: 'ds_fc_10',
    subject: 'Data Science',
    front: 'What is the Parallel Trends assumption in Difference-in-Differences (DiD)?',
    back: 'Assumes that in the absence of treatment, the treatment group’s outcome trajectory would have followed the exact same slope as the control group over time.',
    category: 'Causal Inference'
  },
  {
    id: 'ds_fc_11',
    subject: 'Data Science',
    front: 'What does a Variance Inflation Factor (VIF) > 5 to 10 indicate?',
    back: 'Severe multicollinearity between independent features in regression. The feature’s coefficient will have high variance and instability; consider removing it or applying regularization.',
    category: 'Regression Diagnostics'
  },
  {
    id: 'ds_fc_12',
    subject: 'Data Science',
    front: 'What is Customer Lifetime Value (LTV) and how is it calculated in subscription models?',
    back: 'LTV = (ARPU * Gross Margin %) / Churn Rate\nA healthy enterprise SaaS metric target is an LTV:CAC ratio of approximately 3:1.',
    category: 'Business Metrics'
  },
  {
    id: 'ds_fc_13',
    subject: 'Data Science',
    front: 'What is SUTVA and why does it fail in ride-sharing A/B tests?',
    back: 'Stable Unit Treatment Value Assumption: An individual’s treatment does not affect others. In ride-sharing, treating rider A affects driver supply for control rider B, violating SUTVA (network interference).',
    category: 'Experimentation'
  },
  {
    id: 'ds_fc_14',
    subject: 'Data Science',
    front: 'What are SQL Window Function frames: ROWS vs RANGE?',
    back: '• ROWS: Defines frame by physical row offsets (e.g. `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`).\n• RANGE: Defines frame by logical value/date offsets (e.g. `RANGE BETWEEN INTERVAL \'7 DAYS\' PRECEDING AND CURRENT ROW`).',
    category: 'SQL for Analytics'
  },
  {
    id: 'ds_fc_15',
    subject: 'Data Science',
    front: 'What is the Base Rate Fallacy in rare event probability?',
    back: 'Ignoring the prior probability of an event. Even with a 99% accurate test, if a disease has 0.1% prevalence, the majority of positive results will still be false positives.',
    category: 'Probability'
  },

  // ==================== 4. DATA ENGINEERING (15 Flashcards) ====================
  {
    id: 'de_fc_1',
    subject: 'Data Engineering',
    front: 'Compare ETL and ELT architectures.',
    back: '• ETL: Extract -> Transform in dedicated pipeline engine -> Load into warehouse. (Traditional on-prem).\n• ELT: Extract -> Load raw data directly into cloud warehouse/lake -> Transform in-database with SQL/dbt. Enabled by cheap storage and scalable cloud MPP compute.',
    category: 'Architecture'
  },
  {
    id: 'de_fc_2',
    subject: 'Data Engineering',
    front: 'In Apache Spark, what is the difference between Narrow and Wide Transformations?',
    back: '• Narrow: Output partition depends only on one input partition (map, filter). Executes in-memory with zero network shuffle.\n• Wide: Output partition requires data from multiple input partitions (join, groupByKey). Causes a cluster network SHUFFLE and creates a new Stage.',
    category: 'Apache Spark'
  },
  {
    id: 'de_fc_3',
    subject: 'Data Engineering',
    front: 'How does Apache Kafka guarantee high throughput and message ordering?',
    back: '1. Zero-copy OS sendfile syscall and sequential append-only disk logging.\n2. Total message ordering is strictly guaranteed ONLY within an individual partition, not across the whole topic.',
    category: 'Apache Kafka'
  },
  {
    id: 'de_fc_4',
    subject: 'Data Engineering',
    front: 'Why is Apache Parquet preferred over CSV for analytical queries?',
    back: 'Parquet is a columnar binary format with Snappy/ZSTD compression. Supports Projection Pushdown (reading only required columns) and Predicate Pushdown (skipping row groups using min/max stats).',
    category: 'File Formats'
  },
  {
    id: 'de_fc_5',
    subject: 'Data Engineering',
    front: 'What is Slowly Changing Dimension Type 2 (SCD Type 2)?',
    back: 'Preserves complete historical record changes by inserting a new dimension row with effective start date, effective end date, and an is_current flag, rather than overwriting historical values.',
    category: 'Dimensional Modeling'
  },
  {
    id: 'de_fc_6',
    subject: 'Data Engineering',
    front: 'What problems do Lakehouse table formats (Delta Lake, Apache Iceberg) solve?',
    back: '1. Provide ACID transactions over raw cloud object storage via serialized transaction logs.\n2. Support Time Travel, schema evolution, and row-level UPSERTs.\n3. Solve the S3 object listing metadata bottleneck.',
    category: 'Lakehouse'
  },
  {
    id: 'de_fc_7',
    subject: 'Data Engineering',
    front: 'What is a Broadcast Hash Join in PySpark and when is it used?',
    back: 'Replicates a small table (e.g. <10MB default) to all worker nodes in memory (`broadcast(small_df)`), performing local lookups and completely eliminating expensive shuffles of the large table.',
    category: 'Spark Optimization'
  },
  {
    id: 'de_fc_8',
    subject: 'Data Engineering',
    front: 'What is pipeline Idempotency and how do you achieve it?',
    back: 'Rerunning a pipeline with identical inputs produces the identical final state. Achieved via partition-level overwrites (`INSERT OVERWRITE`), staging atomic swaps, or unique-key upserts.',
    category: 'Pipeline Reliability'
  },
  {
    id: 'de_fc_9',
    subject: 'Data Engineering',
    front: 'Why is Log-Based CDC (Debezium) superior to Query Polling?',
    back: 'Reads database Write-Ahead Logs (WAL/binlog) directly: captures every intermediate row change and hard DELETE with zero query execution overhead on the production database.',
    category: 'Change Data Capture'
  },
  {
    id: 'de_fc_10',
    subject: 'Data Engineering',
    front: 'How does Zero-Copy Cloning work in Snowflake?',
    back: 'Duplicates metadata pointers to existing immutable micro-partitions without copying physical storage bytes. Takes seconds and incurs zero extra storage cost until modifications are made.',
    category: 'Cloud Warehouses'
  },
  {
    id: 'de_fc_11',
    subject: 'Data Engineering',
    front: 'In Apache Airflow, what mode should long-running Sensors use?',
    back: '`mode=\'reschedule\'`. If criteria are not met, the sensor task releases its worker execution slot and sleeps, preventing worker thread pool exhaustion and deadlocks.',
    category: 'Orchestration'
  },
  {
    id: 'de_fc_12',
    subject: 'Data Engineering',
    front: 'What is an Event Time Watermark in stream processing (Flink / Spark)?',
    back: 'A progress metric asserting that no further events with timestamp < W will arrive. When a watermark advances past a window end boundary, the window calculation is finalized and emitted.',
    category: 'Stream Processing'
  },
  {
    id: 'de_fc_13',
    subject: 'Data Engineering',
    front: 'How does Key Salting resolve Data Skew in distributed joins?',
    back: 'Appends random integers (0 to N-1) to the skewed key on table A and replicates table B rows across all N keys, distributing the skewed partition evenly across N parallel tasks.',
    category: 'Spark Optimization'
  },
  {
    id: 'de_fc_14',
    subject: 'Data Engineering',
    front: 'What is the "Small Files Problem" and how is it resolved?',
    back: 'Millions of tiny files overwhelm metadata catalogs and create task scheduling bottlenecks. Resolved by Compaction jobs (Delta OPTIMIZE) that merge small files into 128MB–1GB columnar blocks.',
    category: 'Storage Management'
  },
  {
    id: 'de_fc_15',
    subject: 'Data Engineering',
    front: 'Compare BigQuery Partitioning and Clustering.',
    back: '• Partitioning: Physically divides table segments by date/range, enabling partition pruning.\n• Clustering: Sorts data within partitions on up to 4 columns, co-locating related records to minimize scanned bytes.',
    category: 'BigQuery'
  },

  // ==================== 5. DEEP LEARNING (15 Flashcards) ====================
  {
    id: 'dl_fc_1',
    subject: 'Deep Learning',
    front: 'What causes the Vanishing Gradient problem and how do ResNet skip connections fix it?',
    back: 'Repeated chain rule multiplication of derivatives < 0.25 (Sigmoid/Tanh) shrinks early gradients to zero. ResNet skip connections a_{l+1} = F(a_l) + a_l introduce an additive +1 term, allowing gradients to propagate directly without decay.',
    category: 'Gradients & Optimization'
  },
  {
    id: 'dl_fc_2',
    subject: 'Deep Learning',
    front: 'How does AdamW improve on standard Adam with L2 weight decay?',
    back: 'AdamW decouples weight decay directly from gradient updates. In standard Adam, L2 penalties are divided by adaptive moving variance √v, which erroneously reduces decay for weights with large gradients.',
    category: 'Optimizers'
  },
  {
    id: 'dl_fc_3',
    subject: 'Deep Learning',
    front: 'What is He (Kaiming) initialization and why is it used with ReLU?',
    back: 'Sets Var(W) = 2 / n_in. Doubles the variance compared to Xavier to compensate for the fact that ReLU zeroes out negative inputs (50% of activations), preventing signal collapse across deep layers.',
    category: 'Weight Initialization'
  },
  {
    id: 'dl_fc_4',
    subject: 'Deep Learning',
    front: 'What is the Scaled Dot-Product Attention formula and why divide by √d_k?',
    back: 'Attention(Q, K, V) = softmax((Q K^T) / √d_k) V.\nDividing by √d_k normalizes dot product variance back to 1, preventing large magnitudes from saturating the softmax into near-zero gradient regions.',
    category: 'Attention Mechanism'
  },
  {
    id: 'dl_fc_5',
    subject: 'Deep Learning',
    front: 'Why is Layer Normalization preferred over Batch Normalization in Transformers?',
    back: 'LayerNorm normalizes across feature dimensions for each sequence token independently without depending on other batch items. It handles variable-length sequences and works identically during streaming batch=1 inference.',
    category: 'Normalization'
  },
  {
    id: 'dl_fc_6',
    subject: 'Deep Learning',
    front: 'What does Inverted Dropout do during training?',
    back: 'Multiplies active neurons by 1 / (1 - p) during the training forward pass. This preserves the expected value, allowing inference forward passes to run at full scale with no scaling or code changes.',
    category: 'Regularization'
  },
  {
    id: 'dl_fc_7',
    subject: 'Deep Learning',
    front: 'What is the formula for the spatial output size of a 2D convolution?',
    back: 'Output size = floor((W - K + 2P) / S) + 1\n(where W is input size, K is kernel size, P is padding, and S is stride).',
    category: 'Computer Vision'
  },
  {
    id: 'dl_fc_8',
    subject: 'Deep Learning',
    front: 'How do Vision Transformers (ViT) process images?',
    back: 'Splits 2D image into non-overlapping PxP patches (e.g. 16x16), flattens each patch, linearly projects them into 1D token embeddings, adds 1D positional encodings, and passes them to standard Transformer encoders.',
    category: 'Computer Vision'
  },
  {
    id: 'dl_fc_9',
    subject: 'Deep Learning',
    front: 'Why is Cross-Entropy Loss preferred over MSE for multi-class classification?',
    back: 'Combined with Softmax, the gradient simplifies to (p_i - y_i). Large errors produce large gradients driving rapid correction, whereas MSE includes a p_i(1 - p_i) term that stalls learning when the model is wrong.',
    category: 'Loss Functions'
  },
  {
    id: 'dl_fc_10',
    subject: 'Deep Learning',
    front: 'What are the three gates and memory mechanism in an LSTM?',
    back: '• Forget Gate: decides what to drop from memory\n• Input Gate: decides what new info to add\n• Output Gate: decides hidden state output\n• Additive Cell State: enables linear gradient flow without vanishing.',
    category: 'Recurrent Models'
  },
  {
    id: 'dl_fc_11',
    subject: 'Deep Learning',
    front: 'What is "Dark Knowledge" in Knowledge Distillation?',
    back: 'The relative probability information a trained Teacher assigns to incorrect classes (e.g. an image is 85% BMW, 14% Audi, 0.01% Truck). Softening logits via temperature T exposes this knowledge to the Student.',
    category: 'Model Compression'
  },
  {
    id: 'dl_fc_12',
    subject: 'Deep Learning',
    front: 'Compare Tensor Parallelism and Pipeline Parallelism.',
    back: '• Tensor Parallelism: Splits individual weight matrices across GPUs intra-node via high-speed NVLink.\n• Pipeline Parallelism: Partitions sequential model layers across GPUs inter-node using micro-batching.',
    category: 'Distributed Training'
  },
  {
    id: 'dl_fc_13',
    subject: 'Deep Learning',
    front: 'How does Contrastive Learning (SimCLR / InfoNCE) learn without labels?',
    back: 'Pulls representations of two augmented views of the same image close together while pushing representations of all other batch images apart using InfoNCE loss.',
    category: 'Self-Supervised'
  },
  {
    id: 'dl_fc_14',
    subject: 'Deep Learning',
    front: 'Why call `model.eval()` before validation in PyTorch?',
    back: 'Disables Dropout (p=0) and switches BatchNorm layers to use accumulated population mean and variance instead of current mini-batch statistics.',
    category: 'PyTorch'
  },
  {
    id: 'dl_fc_15',
    subject: 'Deep Learning',
    front: 'Why is learning rate Warmup critical when training deep Transformers?',
    back: 'In early steps, weights are unaligned and Adam momentum estimates have high variance. Warmup ramps the learning rate slowly, allowing momentum statistics to stabilize before applying large updates.',
    category: 'Training Schedules'
  },

  // ==================== 6. LLMS AND GENERATIVE AI (15 Flashcards) ====================
  {
    id: 'llm_fc_1',
    subject: 'LLMs and Generative AI',
    front: 'What is Grouped-Query Attention (GQA) and why is it used in LLaMA-2/3?',
    back: 'Groups Query heads into groups (e.g. 8 Q heads share 1 KV head). Bridges Multi-Head Attention and Multi-Query Attention, preserving quality while drastically reducing the KV cache memory footprint.',
    category: 'Architectures'
  },
  {
    id: 'llm_fc_2',
    subject: 'LLMs and Generative AI',
    front: 'How does LoRA (Low-Rank Adaptation) parameterize weight updates?',
    back: 'Freezes base weights W_0 and updates via ΔW = (α/r) * (B · A), where A and B are low-rank matrices (rank r ≪ d). Reduces trainable parameters by >99% and merges back into weights with zero inference latency overhead.',
    category: 'Fine-Tuning'
  },
  {
    id: 'llm_fc_3',
    subject: 'LLMs and Generative AI',
    front: 'How does Direct Preference Optimization (DPO) simplify alignment?',
    back: 'Derives an exact analytical loss directly over chosen and rejected response pairs. Eliminates training a separate reward model and avoids unstable PPO reinforcement learning loops.',
    category: 'Alignment'
  },
  {
    id: 'llm_fc_4',
    subject: 'LLMs and Generative AI',
    front: 'What is Reciprocal Rank Fusion (RRF) in Hybrid RAG Search?',
    back: 'Combines rankings from dense vector retrieval and sparse BM25 keyword search: RRF(d) = Σ 1 / (60 + rank(d)). Provides balanced lexical and semantic retrieval without needing score normalization.',
    category: 'RAG'
  },
  {
    id: 'llm_fc_5',
    subject: 'LLMs and Generative AI',
    front: 'What is Rotary Position Embedding (RoPE)?',
    back: 'Encodes positional information by rotating Query and Key vectors in 2D planes. The inner product preserves relative token distance (m - n), enabling natural context length extrapolation (YaRN).',
    category: 'Positional Embeddings'
  },
  {
    id: 'llm_fc_6',
    subject: 'LLMs and Generative AI',
    front: 'Compare Temperature and Top-p (Nucleus) sampling.',
    back: '• Temperature: Scales logit sharpness before softmax. T→0 is deterministic/factual; higher T increases randomness.\n• Top-p: Truncates tail by dynamically keeping the smallest token set with cumulative probability >= p.',
    category: 'Sampling'
  },
  {
    id: 'llm_fc_7',
    subject: 'LLMs and Generative AI',
    front: 'What is the Model Context Protocol (MCP)?',
    back: 'An open JSON-RPC standard that enables AI models and IDEs to securely connect to tools, local files, prompts, and remote resources via standardized client-server interfaces.',
    category: 'Agent Standards'
  },
  {
    id: 'llm_fc_8',
    subject: 'LLMs and Generative AI',
    front: 'How does the HNSW graph index achieve logarithmic vector search?',
    back: 'Constructs a multi-layer geometric graph (like a Skip List). Top layers execute fast long-range hops; bottom layers perform fine-grained nearest neighbor greedy routing in O(log N) time.',
    category: 'Vector Databases'
  },
  {
    id: 'llm_fc_9',
    subject: 'LLMs and Generative AI',
    front: 'How does PagedAttention (vLLM) resolve GPU memory fragmentation?',
    back: 'Manages the Key-Value (KV) cache like virtual memory pages, allocating non-contiguous physical blocks dynamically. Reduces memory waste from 70% to <4%, doubling serving concurrency.',
    category: 'Serving Optimization'
  },
  {
    id: 'llm_fc_10',
    subject: 'LLMs and Generative AI',
    front: 'What is Faithfulness in the Ragas evaluation framework?',
    back: 'Measures whether claims in the generated response can be directly inferred from retrieved context, serving as a quantifiable measure of the LLM hallucination rate.',
    category: 'Evaluation'
  },
  {
    id: 'llm_fc_11',
    subject: 'LLMs and Generative AI',
    front: 'What is Indirect Prompt Injection?',
    back: 'An attack where untrusted third-party content (e.g. web page or email retrieved via RAG) contains hidden adversarial instructions that hijack the LLM’s execution flow.',
    category: 'Security'
  },
  {
    id: 'llm_fc_12',
    subject: 'LLMs and Generative AI',
    front: 'How does Constrained Decoding guarantee valid JSON outputs?',
    back: 'Compiles the target schema into a Finite State Machine (FSM). At every step, tokens that violate the grammar are masked out in the logits vector before softmax, guaranteeing 100% valid syntax.',
    category: 'Structured Outputs'
  },
  {
    id: 'llm_fc_13',
    subject: 'LLMs and Generative AI',
    front: 'What is the core discovery behind AWQ (Activation-aware Weight Quantization)?',
    back: 'Only ~1% of weights (salient channels with large activation magnitudes) protect model quality. Keeping this 1% in higher precision allows the remaining 99% to be quantized to INT4 safely.',
    category: 'Quantization'
  },
  {
    id: 'llm_fc_14',
    subject: 'LLMs and Generative AI',
    front: 'What is the ReAct loop in LLM agents?',
    back: 'Thought -> Action (Tool Call) -> Observation (Tool Output) -> Reflection/Final Answer. Interleaves reasoning with environmental feedback.',
    category: 'Agent Systems'
  },
  {
    id: 'llm_fc_15',
    subject: 'LLMs and Generative AI',
    front: 'How does Speculative Decoding speed up generation latency?',
    back: 'A fast draft model proposes K candidate tokens quickly; the large target model validates all K candidates simultaneously in a single forward pass, providing 2–3x wall-clock speedups.',
    category: 'Latency Optimization'
  },

  // ==================== 7. MLOPS AND AI ENGINEERING (15 Flashcards) ====================
  {
    id: 'mlops_fc_1',
    subject: 'MLOps and AI Engineering',
    front: 'Differentiate Data Drift vs. Concept Drift.',
    back: '• Data Drift (Covariate Shift): Input distribution P(X) changes while P(Y|X) remains constant.\n• Concept Drift: The relationship P(Y|X) between inputs and targets changes over time.',
    category: 'Monitoring'
  },
  {
    id: 'mlops_fc_2',
    subject: 'MLOps and AI Engineering',
    front: 'What Population Stability Index (PSI) values indicate drift?',
    back: '• PSI < 0.1: No significant shift\n• PSI 0.1 – 0.2: Moderate shift (monitor closely)\n• PSI > 0.2: Significant shift (triggers automated retraining alert)',
    category: 'Drift Metrics'
  },
  {
    id: 'mlops_fc_3',
    subject: 'MLOps and AI Engineering',
    front: 'How does a Feature Store prevent Training-Serving Skew?',
    back: 'Provides single source of feature definitions. Offline store creates point-in-time training sets without leakage; online store (Redis) serves identical feature values to inference APIs in <10ms.',
    category: 'Feature Stores'
  },
  {
    id: 'mlops_fc_4',
    subject: 'MLOps and AI Engineering',
    front: 'What is Shadow Deployment in ML systems?',
    back: 'Incoming production traffic is mirrored asynchronously to the new candidate model. Predictions are logged and benchmarked against the active model without returning outputs to users (zero risk).',
    category: 'Deployment'
  },
  {
    id: 'mlops_fc_5',
    subject: 'MLOps and AI Engineering',
    front: 'What is Dynamic Batching in NVIDIA Triton?',
    back: 'Buffers incoming asynchronous requests for a configurable window (e.g. 5ms) to assemble a parallel GPU tensor batch, maximizing tensor core utilization and throughput.',
    category: 'Model Serving'
  },
  {
    id: 'mlops_fc_6',
    subject: 'MLOps and AI Engineering',
    front: 'How does DVC integrate with Git for large dataset versioning?',
    back: 'Computes MD5 hashes of large datasets and writes tiny `.dvc` pointer files tracked in Git, while syncing actual binary data to cloud storage buckets (S3/GCS) via `dvc push/pull`.',
    category: 'Data Versioning'
  },
  {
    id: 'mlops_fc_7',
    subject: 'MLOps and AI Engineering',
    front: 'Why are Python Pickle files dangerous for model serialization?',
    back: 'Pickle deserialization allows objects to execute arbitrary code via the `__reduce__` method, enabling attackers to inject operating system commands or remote shells into model files.',
    category: 'Security'
  },
  {
    id: 'mlops_fc_8',
    subject: 'MLOps and AI Engineering',
    front: 'What is the Safetensors format and what are its advantages?',
    back: 'A pure tensor storage format by Hugging Face containing only numeric bytes with zero executable code (immune to code execution attacks) and supporting instant zero-copy mmap loading.',
    category: 'Model Serialization'
  },
  {
    id: 'mlops_fc_9',
    subject: 'MLOps and AI Engineering',
    front: 'What is NVIDIA MIG (Multi-Instance GPU)?',
    back: 'Partitions an A100 or H100 GPU into up to 7 hardware-isolated instances with dedicated memory and compute cores, enabling predictable multi-tenant workloads without interference.',
    category: 'Hardware Management'
  },
  {
    id: 'mlops_fc_10',
    subject: 'MLOps and AI Engineering',
    front: 'What is TTFT (Time to First Token) in LLMOps?',
    back: 'The latency from request submission until the first output token streams back to the client. Critical for perceived responsiveness in streaming conversational applications.',
    category: 'LLMOps'
  },
  {
    id: 'mlops_fc_11',
    subject: 'MLOps and AI Engineering',
    front: 'How does Semantic Caching work for LLM APIs?',
    back: 'Embeds user queries and performs vector similarity search on cached questions. If cosine similarity >= threshold (e.g. 0.96), returns cached answer in <20ms at zero API token cost.',
    category: 'Cost Optimization'
  },
  {
    id: 'mlops_fc_12',
    subject: 'MLOps and AI Engineering',
    front: 'What is Kubeflow Pipelines (KFP)?',
    back: 'A cloud-native ML orchestrator on Kubernetes and Argo Workflows where each pipeline step runs in an isolated container with specific GPU/CPU resource limits and artifact lineage tracking.',
    category: 'Orchestration'
  },
  {
    id: 'mlops_fc_13',
    subject: 'MLOps and AI Engineering',
    front: 'What is an Invariance Test in the CheckList ML testing framework?',
    back: 'Applies perturbations to inputs that should NOT change the model output (e.g. changing names, typos, or locations in text classification).',
    category: 'Testing'
  },
  {
    id: 'mlops_fc_14',
    subject: 'MLOps and AI Engineering',
    front: 'What is Layer & Kernel Fusion in TensorRT?',
    back: 'Fuses adjacent operations (e.g. Convolution + Bias + ReLU) into a single optimized GPU CUDA kernel, eliminating expensive round-trip memory transfers between GPU VRAM and registers.',
    category: 'Model Compilation'
  },
  {
    id: 'mlops_fc_15',
    subject: 'MLOps and AI Engineering',
    front: 'What are the four lifecycle stages in MLflow Model Registry?',
    back: '1. None / Development\n2. Staging (undergoing automated testing/shadow evaluation)\n3. Production (handling live production traffic)\n4. Archived (deprecated past versions)',
    category: 'Model Governance'
  }
];

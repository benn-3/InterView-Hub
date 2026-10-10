// 105 Multiple Choice Questions (15 per subject) for the 7 new technical subjects
// Accurate 4 options, verified answer indices (0-3), and detailed explanations.

export const aiCurriculumMcqs = [
  // ==================== 1. ARTIFICIAL INTELLIGENCE (15 MCQs) ====================
  {
    id: 'ai_mcq_1',
    subject: 'Artificial Intelligence',
    question: 'In the A* search algorithm, what property must the heuristic function h(n) satisfy to guarantee that Tree Search finds an optimal path?',
    options: ['Monotonicity', 'Admissibility', 'Completeness', 'Dominance'],
    answer: 1, // Admissibility
    explanation: 'For Tree Search, A* is guaranteed to be optimal if the heuristic h(n) is admissible, meaning it never overestimates the true remaining cost to reach the goal (0 <= h(n) <= h*(n)).',
    difficulty: 'medium',
    tags: ['ai', 'a-star', 'heuristics']
  },
  {
    id: 'ai_mcq_2',
    subject: 'Artificial Intelligence',
    question: 'In Alpha-Beta pruning, when is a branch pruned during adversarial game search?',
    options: ['When α < β', 'When α >= β', 'When α == 0', 'When β == -∞'],
    answer: 1, // When α >= β
    explanation: 'Alpha is the best value MAX can guarantee, and Beta is the best value MIN can guarantee. When α >= β, MIN would never choose this branch (or MAX already has a better alternative), so the branch is pruned.',
    difficulty: 'medium',
    tags: ['ai', 'minimax', 'alpha-beta']
  },
  {
    id: 'ai_mcq_3',
    subject: 'Artificial Intelligence',
    question: 'Which unguided search algorithm combines the space efficiency of Depth-First Search with the completeness and optimality of Breadth-First Search?',
    options: ['Bidirectional Search', 'Uniform Cost Search', 'Iterative Deepening DFS (IDDFS)', 'Greedy Best-First Search'],
    answer: 2, // IDDFS
    explanation: 'Iterative Deepening DFS (IDDFS) repeatedly runs depth-limited search with increasing depth bounds, preserving linear space complexity O(bd) while guaranteeing completeness and optimality for uniform step costs.',
    difficulty: 'easy',
    tags: ['ai', 'search', 'iddfs']
  },
  {
    id: 'ai_mcq_4',
    subject: 'Artificial Intelligence',
    question: 'In Constraint Satisfaction Problems (CSPs), what does the AC-3 algorithm enforce?',
    options: ['Node Consistency', 'Arc Consistency', 'Path Consistency', 'Global Consistency'],
    answer: 1, // Arc Consistency
    explanation: 'AC-3 (Arc Consistency Algorithm #3) checks binary constraints between pairs of variables, pruning values from domain D(Xi) that have no satisfying match in D(Xj).',
    difficulty: 'medium',
    tags: ['ai', 'csp', 'ac-3']
  },
  {
    id: 'ai_mcq_5',
    subject: 'Artificial Intelligence',
    question: 'In Simulated Annealing, what happens to the probability of accepting a worse move as the temperature T approaches zero?',
    options: ['It approaches 1.0', 'It approaches 0.0', 'It oscillates randomly', 'It remains constant at 0.5'],
    answer: 1, // It approaches 0.0
    explanation: 'The probability of accepting a worse move is P = exp(ΔE / T). As T approaches 0, exp(-c / T) approaches 0, meaning the algorithm behaves purely as greedy Hill Climbing.',
    difficulty: 'easy',
    tags: ['ai', 'simulated-annealing', 'optimization']
  },
  {
    id: 'ai_mcq_6',
    subject: 'Artificial Intelligence',
    question: 'In CSP backtracking search, which heuristic selects the unassigned variable with the fewest remaining legal values?',
    options: ['Degree Heuristic', 'Least Constraining Value', 'Minimum Remaining Values (MRV)', 'Forward Checking'],
    answer: 2, // MRV
    explanation: 'The MRV heuristic (also known as "most constrained variable" or "fail-first") chooses the variable with the smallest domain size to detect failures as early as possible.',
    difficulty: 'easy',
    tags: ['ai', 'csp', 'heuristics']
  },
  {
    id: 'ai_mcq_7',
    subject: 'Artificial Intelligence',
    question: 'In First-Order Logic, what inference rule forms the foundation of automated refutation-based theorem provers?',
    options: ['Modus Ponens', 'Resolution', 'Universal Instantiation', 'Existential Elimination'],
    answer: 1, // Resolution
    explanation: 'Resolution refutation is sound and complete for First-Order Logic in Conjunctive Normal Form (CNF), proving a statement by demonstrating that negating it produces an empty clause (contradiction).',
    difficulty: 'medium',
    tags: ['ai', 'logic', 'resolution']
  },
  {
    id: 'ai_mcq_8',
    subject: 'Artificial Intelligence',
    question: 'What is the main challenge addressed by the "Frame Problem" in classical AI planning?',
    options: [
      'Finding the shortest path in continuous state spaces',
      'Representing what does NOT change when an action occurs',
      'Calculating heuristic bounds in adversarial games',
      'Converting first-order sentences into Horn clauses'
    ],
    answer: 1, // Representing what does NOT change
    explanation: 'The Frame Problem describes the difficulty of representing the countless facts that remain unchanged when an action is executed without explicitly enumerating them all in every state.',
    difficulty: 'hard',
    tags: ['ai', 'planning', 'knowledge-representation']
  },
  {
    id: 'ai_mcq_9',
    subject: 'Artificial Intelligence',
    question: 'In a Bayesian Network, what structure exhibits the "explaining away" phenomenon when the common effect is observed?',
    options: ['Chain (A -> B -> C)', 'Fork (A <- B -> C)', 'Collider / V-structure (A -> B <- C)', 'Cycle (A -> B -> A)'],
    answer: 2, // Collider
    explanation: 'In a collider (A -> B <- C), variables A and C are marginally independent. However, once B (or any descendant of B) is observed, A and C become conditionally dependent ("explaining away").',
    difficulty: 'hard',
    tags: ['ai', 'bayesian-networks', 'd-separation']
  },
  {
    id: 'ai_mcq_10',
    subject: 'Artificial Intelligence',
    question: 'In game theory, what is a state where no player can improve their payoff by unilaterally changing their strategy?',
    options: ['Pareto Optimum', 'Minimax Point', 'Nash Equilibrium', 'Dominant Equilibrium'],
    answer: 2, // Nash Equilibrium
    explanation: 'A Nash Equilibrium is a profile of strategies where each player’s choice is an optimal response to the other players’ choices, so no player has an incentive to deviate unilaterally.',
    difficulty: 'easy',
    tags: ['ai', 'game-theory', 'nash-equilibrium']
  },
  {
    id: 'ai_mcq_11',
    subject: 'Artificial Intelligence',
    question: 'In STRIPS / PDDL planning, what components define an action operator?',
    options: [
      'States, Actions, and Rewards',
      'Preconditions, Add Effects, and Delete Effects',
      'Transitions, Policies, and Heuristics',
      'Variables, Domains, and Constraints'
    ],
    answer: 1, // Preconditions, Add Effects, and Delete Effects
    explanation: 'In STRIPS/PDDL, an action specifies Preconditions that must hold for the action to be applicable, an Add List of fluents made true, and a Delete List of fluents made false.',
    difficulty: 'medium',
    tags: ['ai', 'planning', 'strips']
  },
  {
    id: 'ai_mcq_12',
    subject: 'Artificial Intelligence',
    question: 'Which of the following describes an agent whose environment is fully observable, deterministic, sequential, static, discrete, and single-agent?',
    options: ['Chess with a clock', 'Crossword puzzle', 'Self-driving car', 'Poker tournament'],
    answer: 1, // Crossword puzzle
    explanation: 'A crossword puzzle environment is fully observable (entire board visible), deterministic (letters stay as written), sequential, static (board does not change while thinking), discrete, and single-agent.',
    difficulty: 'medium',
    tags: ['ai', 'peas', 'environment-types']
  },
  {
    id: 'ai_mcq_13',
    subject: 'Artificial Intelligence',
    question: 'What fairness criterion requires that the prediction Ŷ is independent of protected attribute A given true outcome Y (P(Ŷ=1 | A=0, Y=1) = P(Ŷ=1 | A=1, Y=1))?',
    options: ['Demographic Parity', 'Equalized Odds', 'Disparate Impact', 'Individual Fairness'],
    answer: 1, // Equalized Odds
    explanation: 'Equalized Odds requires equal true positive rates and equal false positive rates across protected demographic groups, conditioning on actual ground truth outcomes.',
    difficulty: 'hard',
    tags: ['ai', 'ethics', 'fairness']
  },
  {
    id: 'ai_mcq_14',
    subject: 'Artificial Intelligence',
    question: 'What search algorithm updates values using the Bellman backup operator V(s) = max_a Σ P(s\'|s,a)[R + γ V(s\')]?',
    options: ['Policy Iteration', 'Value Iteration', 'Q-Learning', 'SARSA'],
    answer: 1, // Value Iteration
    explanation: 'Value Iteration directly updates state values iteratively using the Bellman optimality equation until values converge within a small threshold ε.',
    difficulty: 'medium',
    tags: ['ai', 'mdp', 'bellman']
  },
  {
    id: 'ai_mcq_15',
    subject: 'Artificial Intelligence',
    question: 'What is the branching factor complexity reduction achieved by Alpha-Beta pruning in the best-case move ordering compared to standard Minimax O(b^d)?',
    options: ['O(b * d)', 'O(b^(d/2))', 'O(d * log b)', 'O(b / 2)^d'],
    answer: 1, // O(b^(d/2))
    explanation: 'With optimal move ordering (evaluating best moves first), Alpha-Beta pruning reduces the effective branching factor from b to √b, resulting in time complexity O(b^(d/2)) and effectively doubling the searchable depth.',
    difficulty: 'hard',
    tags: ['ai', 'minimax', 'complexity']
  },

  // ==================== 2. MACHINE LEARNING (15 MCQs) ====================
  {
    id: 'ml_mcq_1',
    subject: 'Machine Learning',
    question: 'Which regularization technique adds a penalty proportional to the absolute values of the coefficients, leading to sparse models?',
    options: ['L2 Ridge Regularization', 'L1 Lasso Regularization', 'ElasticNet with l1_ratio=0', 'Dropout'],
    answer: 1, // L1 Lasso
    explanation: 'L1 regularization (Lasso) penalizes the sum of absolute values λΣ|w_i|. Its diamond-shaped constraint boundary forces non-informative coefficients to exactly zero, performing feature selection.',
    difficulty: 'easy',
    tags: ['ml', 'regularization', 'lasso']
  },
  {
    id: 'ml_mcq_2',
    subject: 'Machine Learning',
    question: 'In an extreme class imbalance scenario (0.1% fraud), which evaluation metric is the most trustworthy?',
    options: ['Accuracy', 'ROC-AUC', 'Precision-Recall AUC (PR-AUC)', 'Specificity'],
    answer: 2, // PR-AUC
    explanation: 'ROC-AUC includes True Negatives in the FPR denominator, masking huge increases in false positives when negatives dominate. PR-AUC focuses exclusively on the minority positive class.',
    difficulty: 'medium',
    tags: ['ml', 'metrics', 'imbalance']
  },
  {
    id: 'ml_mcq_3',
    subject: 'Machine Learning',
    question: 'What is the primary mechanism by which Random Forests reduce generalization error compared to individual decision trees?',
    options: [
      'Sequentially correcting residual errors to reduce bias',
      'Averaging predictions of uncorrelated trees to reduce variance',
      'Pruning shallow nodes using Gini impurity',
      'Applying gradient descent on leaf weights'
    ],
    answer: 1, // Averaging uncorrelated trees to reduce variance
    explanation: 'Random Forest uses bagging and random feature subsets to train deep, low-bias trees that are weakly correlated. Averaging their predictions significantly reduces ensemble variance without inflating bias.',
    difficulty: 'medium',
    tags: ['ml', 'random-forest', 'variance-reduction']
  },
  {
    id: 'ml_mcq_4',
    subject: 'Machine Learning',
    question: 'What mathematical theorem dictates that a kernel function K(x, z) corresponds to an inner product in some feature space if and only if its Gram matrix is positive semi-definite?',
    options: ['Bayes\' Theorem', 'Mercer’s Theorem', 'Gauss-Markov Theorem', 'Central Limit Theorem'],
    answer: 1, // Mercer's Theorem
    explanation: 'Mercer’s Theorem establishes the mathematical conditions under which a symmetric function can be decomposed into an inner product in a Hilbert space, validating the SVM Kernel Trick.',
    difficulty: 'hard',
    tags: ['ml', 'svm', 'mercer-theorem']
  },
  {
    id: 'ml_mcq_5',
    subject: 'Machine Learning',
    question: 'How does K-Means++ improve upon standard random centroid initialization in K-Means?',
    options: [
      'It assigns centroids deterministically along the first principal component',
      'It selects subsequent centroids with probability proportional to their squared distance to the nearest existing centroid',
      'It uses hierarchical clustering to pre-group points',
      'It places all k centroids at the global dataset mean'
    ],
    answer: 1, // Probability proportional to squared distance
    explanation: 'K-Means++ samples subsequent centroids with probability D(x)² / Σ D(x)², spreading initial centers across the feature space and guaranteeing an O(log k) competitive ratio against optimal clustering.',
    difficulty: 'medium',
    tags: ['ml', 'kmeans', 'unsupervised']
  },
  {
    id: 'ml_mcq_6',
    subject: 'Machine Learning',
    question: 'Why must continuous features be standardized (mean=0, variance=1) prior to applying Principal Component Analysis (PCA)?',
    options: [
      'PCA algorithms crash if data contains negative values',
      'Features with large numerical scales will dominate covariance calculations and distort principal axes',
      'Standardization converts non-linear relationships into linear ones',
      'PCA requires inputs to strictly follow a uniform distribution'
    ],
    answer: 1, // Large scales dominate covariance
    explanation: 'PCA maximizes variance. If one feature has scale [1, 1,000,000] and another has [0, 1], the large feature will dominate the calculated covariance matrix regardless of informational relevance.',
    difficulty: 'medium',
    tags: ['ml', 'pca', 'feature-scaling']
  },
  {
    id: 'ml_mcq_7',
    subject: 'Machine Learning',
    question: 'In time-series machine learning, why is standard K-Fold cross-validation invalid?',
    options: [
      'It cannot calculate classification metrics',
      'It randomly shuffles records, leaking future information into past training folds (look-ahead bias)',
      'Time-series data cannot be converted into numpy arrays',
      'It creates unequal fold sizes'
    ],
    answer: 1, // Leaks future information (look-ahead bias)
    explanation: 'Standard K-Fold randomly assigns temporal steps across folds. Training on future time steps to predict past time steps introduces look-ahead bias and yields artificially inflated, unviable scores.',
    difficulty: 'easy',
    tags: ['ml', 'time-series', 'cross-validation']
  },
  {
    id: 'ml_mcq_8',
    subject: 'Machine Learning',
    question: 'Which tree boosting library introduced Histogram-based binning and Gradient-based One-Side Sampling (GOSS) for massive training speedups?',
    options: ['XGBoost', 'LightGBM', 'CatBoost', 'AdaBoost'],
    answer: 1, // LightGBM
    explanation: 'LightGBM bins continuous features into 256 discrete histogram bins and uses GOSS to retain instances with large gradients while downsampling small gradients, achieving order-of-magnitude speedups.',
    difficulty: 'medium',
    tags: ['ml', 'lightgbm', 'gradient-boosting']
  },
  {
    id: 'ml_mcq_9',
    subject: 'Machine Learning',
    question: 'What is the "Curse of Dimensionality" in distance-based algorithms like K-Nearest Neighbors (KNN)?',
    options: [
      'Features become collinear and cause matrix non-invertibility',
      'Volume of feature space grows exponentially, causing all points to become approximately equidistant',
      'Gradient descent steps become too small to converge',
      'Memory consumption increases logarithmically'
    ],
    answer: 1, // Points become approximately equidistant
    explanation: 'In high dimensions, the volume of space expands exponentially and points become sparse and roughly equidistant (max distance ≈ min distance), making the concept of "nearest" neighborhood meaningless.',
    difficulty: 'medium',
    tags: ['ml', 'knn', 'curse-of-dimensionality']
  },
  {
    id: 'ml_mcq_10',
    subject: 'Machine Learning',
    question: 'What does a high Variance Inflation Factor (VIF > 10) for a feature in Linear Regression signify?',
    options: [
      'The feature has high non-linear interaction with target',
      'Severe multicollinearity with other independent features',
      'The feature is homoscedastic',
      'The feature is completely uninformative and has zero correlation with target'
    ],
    answer: 1, // Severe multicollinearity
    explanation: 'VIF measures how much the variance of an estimated regression coefficient increases due to collinearity. A VIF > 10 indicates that more than 90% of the feature’s variance is explained by other predictors.',
    difficulty: 'medium',
    tags: ['ml', 'linear-regression', 'vif']
  },
  {
    id: 'ml_mcq_11',
    subject: 'Machine Learning',
    question: 'In SHAP (SHapley Additive exPlanations), what property ensures that the sum of feature attributions equals the difference between model output and expected baseline output?',
    options: ['Symmetry', 'Dummy / Null player', 'Local Accuracy / Efficiency', 'Additivity'],
    answer: 2, // Local Accuracy / Efficiency
    explanation: 'The Efficiency (Local Accuracy) property of Shapley values guarantees that f(x) = E[f(x)] + Σ φ_i, meaning feature attributions sum up exactly to explain the model\'s prediction shift.',
    difficulty: 'hard',
    tags: ['ml', 'shap', 'interpretability']
  },
  {
    id: 'ml_mcq_12',
    subject: 'Machine Learning',
    question: 'What problem does Laplace smoothing (additive smoothing) resolve in Naive Bayes text classification?',
    options: [
      'High dimensionality of the vocabulary',
      'Zero probability assignment when a word never appeared with a given class in training',
      'Violation of feature conditional independence',
      'Slow inference latency on long documents'
    ],
    answer: 1, // Zero probability problem
    explanation: 'Because Naive Bayes multiplies conditional probabilities, if a word was unseen with class y, P(word | y) = 0, multiplying the entire product to 0. Laplace smoothing adds a pseudocount α=1 to prevent zero probability.',
    difficulty: 'easy',
    tags: ['ml', 'naive-bayes', 'smoothing']
  },
  {
    id: 'ml_mcq_13',
    subject: 'Machine Learning',
    question: 'Which clustering algorithm identifies clusters of arbitrary shapes and isolates noise points without requiring pre-specification of k?',
    options: ['K-Means', 'Gaussian Mixture Models', 'DBSCAN', 'Agglomerative Ward Clustering'],
    answer: 2, // DBSCAN
    explanation: 'DBSCAN uses density parameters (ε radius and MinPts) to discover dense clusters of arbitrary non-spherical shapes while flagging points in low-density regions as noise/outliers.',
    difficulty: 'easy',
    tags: ['ml', 'dbscan', 'clustering']
  },
  {
    id: 'ml_mcq_14',
    subject: 'Machine Learning',
    question: 'In Gradient Boosted Decision Trees (GBDT), what does each successive tree fit to?',
    options: [
      'The original ground truth labels y',
      'The negative gradient (pseudo-residuals) of the loss function with respect to current predictions',
      'Bootstrap samples of the original dataset',
      'The classification error rates of previous misclassified samples'
    ],
    answer: 1, // Negative gradient (pseudo-residuals)
    explanation: 'Unlike AdaBoost which re-weights data points, Gradient Boosting fits each new tree to the negative gradient (pseudo-residuals) of the differentiable loss function, performing gradient descent in function space.',
    difficulty: 'hard',
    tags: ['ml', 'gbdt', 'boosting']
  },
  {
    id: 'ml_mcq_15',
    subject: 'Machine Learning',
    question: 'What is the effect of setting a high value for hyperparameter `gamma` in an SVM with RBF kernel?',
    options: [
      'Model becomes simpler and approaches a linear hyperplane',
      'Decision boundary becomes highly complex and sensitive to individual training points (overfitting)',
      'Margin becomes wider and tolerates more classification errors',
      'Training converges in fewer iterations'
    ],
    answer: 1, // Overfitting / complex decision boundary
    explanation: 'In RBF kernel K(x, z) = exp(-γ ||x - z||²), a large γ means the radius of influence of support vectors is very small, creating tight, complex boundaries around training points and causing severe overfitting.',
    difficulty: 'medium',
    tags: ['ml', 'svm', 'hyperparameters']
  },

  // ==================== 3. DATA SCIENCE (15 MCQs) ====================
  {
    id: 'ds_mcq_1',
    subject: 'Data Science',
    question: 'What is a Type I error in statistical hypothesis testing?',
    options: [
      'Failing to reject a false null hypothesis (False Negative)',
      'Rejecting a true null hypothesis (False Positive)',
      'Incorrect calculation of sample standard deviation',
      'Selecting a sample size that is too small'
    ],
    answer: 1, // Rejecting a true null hypothesis
    explanation: 'A Type I error (probability α, usually set to 0.05) occurs when the test rejects a null hypothesis that is actually true (e.g. declaring a feature effective when it had no real impact).',
    difficulty: 'easy',
    tags: ['data-science', 'statistics', 'hypothesis-testing']
  },
  {
    id: 'ds_mcq_2',
    subject: 'Data Science',
    question: 'In an A/B test, what occurs when you continuously inspect p-values and stop the experiment as soon as p < 0.05 ("peeking problem")?',
    options: [
      'Statistical power increases to 99%',
      'Type I error rate dramatically inflates above 0.05',
      'Sample ratio mismatch is eliminated',
      'The Minimum Detectable Effect decreases'
    ],
    answer: 1, // Type I error rate inflates
    explanation: 'Repeatedly testing intermediate results on accumulating data without correction ("peeking") dramatically inflates the false positive rate (often up to 30%+), invalidating the nominal 5% significance level.',
    difficulty: 'medium',
    tags: ['data-science', 'ab-testing', 'peeking']
  },
  {
    id: 'ds_mcq_3',
    subject: 'Data Science',
    question: 'Which test should be used to detect Sample Ratio Mismatch (SRM) between observed and expected visitor allocations in an A/B test?',
    options: ['Student’s t-test', 'Chi-Square Goodness-of-Fit test', 'Mann-Whitney U test', 'One-way ANOVA'],
    answer: 1, // Chi-Square Goodness-of-Fit
    explanation: 'A Chi-Square Goodness-of-Fit test compares observed sample counts in Control and Treatment against the expected ratio (e.g., 50:50). A significant p-value (< 0.001) signals that randomization is compromised.',
    difficulty: 'medium',
    tags: ['data-science', 'ab-testing', 'srm']
  },
  {
    id: 'ds_mcq_4',
    subject: 'Data Science',
    question: 'In Tukey’s box plot method, what defines an outlier point beyond the upper whisker?',
    options: ['Value > Mean + 2 * StdDev', 'Value > Q3 + 1.5 * IQR', 'Value > Q3 + 3.0 * StdDev', 'Value > 95th Percentile'],
    answer: 1, // Value > Q3 + 1.5 * IQR
    explanation: 'In Tukey’s schematic box plot, outliers are defined as points exceeding Q3 + 1.5 * IQR (upper fence) or below Q1 - 1.5 * IQR (lower fence), where IQR = Q3 - Q1.',
    difficulty: 'easy',
    tags: ['data-science', 'eda', 'outliers']
  },
  {
    id: 'ds_mcq_5',
    subject: 'Data Science',
    question: 'What statistical phenomenon describes a situation where a trend appears in multiple subgroups but disappears or reverses when aggregated?',
    options: ['Berkson’s Fallacy', 'Simpson’s Paradox', 'Gambler’s Fallacy', 'Hawthorne Effect'],
    answer: 1, // Simpson's Paradox
    explanation: 'Simpson’s Paradox occurs when an apparent relationship in combined data reverses when stratified by a confounding variable that affects subgroup distribution.',
    difficulty: 'medium',
    tags: ['data-science', 'statistics', 'simpsons-paradox']
  },
  {
    id: 'ds_mcq_6',
    subject: 'Data Science',
    question: 'Which correlation coefficient evaluates whether a monotonic relationship exists between two variables without requiring linearity?',
    options: ['Pearson correlation', 'Spearman rank correlation', 'Cosine similarity', 'Mahalanobis correlation'],
    answer: 1, // Spearman rank correlation
    explanation: 'Spearman rank correlation calculates Pearson correlation on the ranks of variables, assessing monotonic relationships and remaining resilient to non-linear trends and extreme outliers.',
    difficulty: 'easy',
    tags: ['data-science', 'statistics', 'correlation']
  },
  {
    id: 'ds_mcq_7',
    subject: 'Data Science',
    question: 'In Pandas, which data type should be used for string columns with repeated low-cardinality values to reduce memory consumption by up to 90%?',
    options: ['object', 'category', 'string[pyarrow]', 'unicode'],
    answer: 1, // category
    explanation: 'Converting low-cardinality string columns to Pandas `category` type replaces repeated string allocations with small integer codes and an internal lookup table, reducing memory usage by 80–90%.',
    difficulty: 'easy',
    tags: ['data-science', 'pandas', 'optimization']
  },
  {
    id: 'ds_mcq_8',
    subject: 'Data Science',
    question: 'When comparing continuous metrics between two groups where distributions are heavily skewed and sample sizes are small, which non-parametric test is appropriate?',
    options: ['Two-sample Welch’s t-test', 'Mann-Whitney U test', 'Chi-Square test of independence', 'Z-test for proportions'],
    answer: 1, // Mann-Whitney U test
    explanation: 'The Mann-Whitney U test (Wilcoxon rank-sum) evaluates whether one distribution is stochastically larger than another based on ranks, requiring no normality assumptions.',
    difficulty: 'medium',
    tags: ['data-science', 'statistics', 'non-parametric']
  },
  {
    id: 'ds_mcq_9',
    subject: 'Data Science',
    question: 'What missing data mechanism applies when the probability of a value being missing depends directly on the unobserved value itself (e.g., high earners omitting salary)?',
    options: ['Missing Completely at Random (MCAR)', 'Missing at Random (MAR)', 'Missing Not at Random (MNAR)', 'Missing Structurally (MS)'],
    answer: 2, // Missing Not at Random (MNAR)
    explanation: 'Under MNAR, missingness is related to the unobserved value itself. Deleting rows or using simple mean imputation introduces severe systematic bias.',
    difficulty: 'medium',
    tags: ['data-science', 'missing-data', 'mnar']
  },
  {
    id: 'ds_mcq_10',
    subject: 'Data Science',
    question: 'What is the key assumption of Difference-in-Differences (DiD) causal estimation?',
    options: [
      'Normal distribution of residuals across treatment',
      'Parallel Trends assumption (treatment and control follow identical trends in absence of intervention)',
      'Absence of multicollinearity among covariates',
      'Equal group sample sizes between control and treatment'
    ],
    answer: 1, // Parallel Trends assumption
    explanation: 'DiD relies on the Parallel Trends assumption: without treatment, the treatment group’s outcome would have changed at the exact same rate as the control group over time.',
    difficulty: 'hard',
    tags: ['data-science', 'causal-inference', 'did']
  },
  {
    id: 'ds_mcq_11',
    subject: 'Data Science',
    question: 'Which SQL window function clause computes an aggregate using a sliding window of exactly the current row and preceding 6 rows?',
    options: [
      'RANGE BETWEEN 6 PRECEDING AND CURRENT ROW',
      'ROWS BETWEEN 6 PRECEDING AND CURRENT ROW',
      'WINDOW SIZE = 7',
      'PARTITION BY 7 ROWS'
    ],
    answer: 1, // ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    explanation: '`ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` specifies an exact physical 7-row frame relative to the current position, ideal for 7-day rolling window computations without date gaps.',
    difficulty: 'medium',
    tags: ['data-science', 'sql', 'window-functions']
  },
  {
    id: 'ds_mcq_12',
    subject: 'Data Science',
    question: 'What continuous probability distribution is characterized by the "memoryless property"?',
    options: ['Normal Distribution', 'Exponential Distribution', 'Gamma Distribution', 'Student’s t-Distribution'],
    answer: 1, // Exponential Distribution
    explanation: 'The Exponential distribution models the time between Poisson events and satisfies P(T > s + t | T > s) = P(T > t). Future waiting time is independent of how much time has already passed.',
    difficulty: 'medium',
    tags: ['data-science', 'probability', 'exponential-distribution']
  },
  {
    id: 'ds_mcq_13',
    subject: 'Data Science',
    question: 'What is the formula for Customer Lifetime Value (LTV) in a subscription business with recurring revenue?',
    options: [
      'LTV = CAC * Churn Rate',
      'LTV = (ARPU * Gross Margin %) / Churn Rate',
      'LTV = Revenue / Total Customers',
      'LTV = ARPU * Retention Period²'
    ],
    answer: 1, // (ARPU * Gross Margin) / Churn
    explanation: 'In subscription business economics, LTV represents the cumulative gross margin generated over customer tenure: (ARPU * Gross Margin %) / Churn Rate.',
    difficulty: 'easy',
    tags: ['data-science', 'business-metrics', 'ltv']
  },
  {
    id: 'ds_mcq_14',
    subject: 'Data Science',
    question: 'When testing multiple hypotheses simultaneously, which correction method controls the False Discovery Rate (FDR) with higher statistical power than Bonferroni?',
    options: ['Tukey’s HSD', 'Benjamini-Hochberg procedure', 'Scheffé test', 'Welch–Satterthwaite approximation'],
    answer: 1, // Benjamini-Hochberg
    explanation: 'The Benjamini-Hochberg procedure controls the False Discovery Rate (proportion of false positives among rejected nulls) rather than family-wise error rate, offering much higher statistical power than conservative Bonferroni correction.',
    difficulty: 'hard',
    tags: ['data-science', 'statistics', 'multiple-testing']
  },
  {
    id: 'ds_mcq_15',
    subject: 'Data Science',
    question: 'In two-sided ride-sharing or marketplace experiments where supply is shared, why does standard user-level A/B randomization fail?',
    options: [
      'Lack of adequate sample size',
      'Violation of SUTVA (Stable Unit Treatment Value Assumption) due to network interference',
      'High conversion rate volatility',
      'Inability to compute confidence intervals'
    ],
    answer: 1, // Violation of SUTVA
    explanation: 'Shared supply causes interference: discounts given to treatment riders tie up drivers, reducing driver availability and increasing wait times for control riders, violating SUTVA.',
    difficulty: 'hard',
    tags: ['data-science', 'ab-testing', 'sutva']
  },

  // ==================== 4. DATA ENGINEERING (15 MCQs) ====================
  {
    id: 'de_mcq_1',
    subject: 'Data Engineering',
    category: 'Architecture',
    question: 'In Apache Spark, what distinction separates Narrow Transformations from Wide Transformations?',
    options: [
      'Narrow operates on integers; Wide operates on strings',
      'Narrow requires no data shuffle across partitions; Wide requires a cluster-wide shuffle',
      'Narrow creates multiple DAG stages; Wide executes in one stage',
      'Narrow requires disk persistence; Wide runs in GPU memory'
    ],
    answer: 1, // No data shuffle vs cluster-wide shuffle
    explanation: 'Narrow transformations (e.g. map, filter) compute outputs using only data from a single input partition. Wide transformations (e.g. groupByKey, join) require shuffling data across partitions over the network, defining Stage boundaries.',
    difficulty: 'medium',
    tags: ['data-engineering', 'spark', 'transformations']
  },
  {
    id: 'de_mcq_2',
    subject: 'Data Engineering',
    category: 'Streaming',
    question: 'In Apache Kafka, within what boundary is total message ordering strictly guaranteed?',
    options: ['Across the entire cluster', 'Across all partitions of a topic', 'Within an individual partition', 'Across all consumer groups'],
    answer: 2, // Within an individual partition
    explanation: 'Kafka guarantees total FIFO message order ONLY within an individual partition. Messages published with the same partition key land in the same partition and preserve strict chronological ordering.',
    difficulty: 'easy',
    tags: ['data-engineering', 'kafka', 'partitioning']
  },
  {
    id: 'de_mcq_3',
    subject: 'Data Engineering',
    category: 'Storage',
    question: 'Why is Apache Parquet significantly faster than CSV for analytical OLAP queries selecting a subset of columns?',
    options: [
      'Parquet uses JSON encoding',
      'Parquet is a columnar format supporting projection pushdown and dictionary compression',
      'Parquet files cannot exceed 10MB in size',
      'Parquet is stored in JVM heap memory'
    ],
    answer: 1, // Columnar with projection pushdown
    explanation: 'Parquet stores data by columns rather than rows. Queries reading 3 columns out of 100 read only the relevant columnar bytes (projection pushdown) and skip reading unneeded row data entirely.',
    difficulty: 'easy',
    tags: ['data-engineering', 'parquet', 'columnar']
  },
  {
    id: 'de_mcq_4',
    subject: 'Data Engineering',
    category: 'Data Modeling',
    question: 'What is a Slowly Changing Dimension Type 2 (SCD Type 2)?',
    options: [
      'Overwrites existing attribute with new value without tracking history',
      'Adds a new column for the previous value',
      'Inserts a new record with effective start/end timestamps to preserve complete historical lineage',
      'Deletes historical records older than 90 days'
    ],
    answer: 2, // Inserts new record with timestamps
    explanation: 'SCD Type 2 tracks historical changes by creating a new dimension record with `effective_start_date`, `effective_end_date`, and an `is_current` boolean flag, preserving accurate historical attribution.',
    difficulty: 'medium',
    tags: ['data-engineering', 'dimensional-modeling', 'scd']
  },
  {
    id: 'de_mcq_5',
    subject: 'Data Engineering',
    category: 'Lakehouse',
    question: 'What foundational mechanism enables ACID transactions and Time Travel in Delta Lake and Apache Iceberg?',
    options: [
      'Distributed ZooKeeper locks on every parquet row',
      'An immutable serialized transaction log (Delta Log / Iceberg metadata snapshots) with Optimistic Concurrency Control',
      'Storing data in relational B-trees inside S3 buckets',
      'Converting all writes into Cassandra mutations'
    ],
    answer: 1, // Transaction log with OCC
    explanation: 'Lakehouse formats overlay Parquet files with an immutable serialized transaction log tracking valid table versions. Concurrent writers use Optimistic Concurrency Control (OCC) to guarantee atomicity and time travel.',
    difficulty: 'hard',
    tags: ['data-engineering', 'lakehouse', 'acid']
  },
  {
    id: 'de_mcq_6',
    subject: 'Data Engineering',
    category: 'Data Modeling',
    question: 'In dimensional modeling (Kimball), what is the key structural difference between a Star Schema and a Snowflake Schema?',
    options: [
      'Star has multiple fact tables; Snowflake has only one',
      'Star has denormalized dimension tables; Snowflake normalizes dimensions into hierarchies',
      'Star is for streaming; Snowflake is for batch',
      'Star stores only numeric values; Snowflake stores semi-structured text'
    ],
    answer: 1, // Star denormalizes; Snowflake normalizes
    explanation: 'In a Star Schema, dimension tables are completely denormalized to minimize joins. In a Snowflake Schema, dimensions are normalized into third normal form (3NF) sub-tables, saving storage but adding multi-hop joins.',
    difficulty: 'medium',
    tags: ['data-engineering', 'dimensional-modeling', 'star-schema']
  },
  {
    id: 'de_mcq_7',
    subject: 'Data Engineering',
    category: 'Optimization',
    question: 'In PySpark, what join strategy avoids expensive network shuffling when joining a large 1TB table with a small 15MB lookup table?',
    options: ['Sort-Merge Join', 'Broadcast Hash Join', 'Shuffle Hash Join', 'Cartesian Product Join'],
    answer: 1, // Broadcast Hash Join
    explanation: 'A Broadcast Hash Join copies the small table to memory on all executor worker nodes (`broadcast(small_df)`), allowing local in-memory lookups without shuffling the 1TB table across the network.',
    difficulty: 'medium',
    tags: ['data-engineering', 'pyspark', 'broadcast-join']
  },
  {
    id: 'de_mcq_8',
    subject: 'Data Engineering',
    category: 'Pipeline Design',
    question: 'What design principle guarantees that retrying a failed pipeline step produces the exact same final state without generating duplicate records?',
    options: ['Fault Tolerance', 'Idempotency', 'Concurrency', 'Linearizability'],
    answer: 1, // Idempotency
    explanation: 'Idempotency ensures that executing a pipeline multiple times with the same input yields identical results. Achieved via partition overwrites, staging atomic swaps, or unique key upserts.',
    difficulty: 'easy',
    tags: ['data-engineering', 'idempotency', 'pipeline-design']
  },
  {
    id: 'de_mcq_9',
    subject: 'Data Engineering',
    category: 'Change Data Capture',
    question: 'Why is log-based Change Data Capture (Debezium reading PostgreSQL WAL) superior to polling via `WHERE updated_at > timestamp`?',
    options: [
      'It requires zero network connectivity',
      'It captures row deletes and intermediate updates with zero query load on the database engine',
      'It converts relational tables into Parquet files automatically',
      'It eliminates the need for primary keys'
    ],
    answer: 1, // Captures deletes and intermediate updates with no query load
    explanation: 'Log-based CDC reads low-level write-ahead logs (WAL/binlog). It captures every row change (including hard deletes that vanish from polling queries) in real time without executing SQL queries on production tables.',
    difficulty: 'hard',
    tags: ['data-engineering', 'cdc', 'debezium']
  },
  {
    id: 'de_mcq_10',
    subject: 'Data Engineering',
    category: 'Cloud Warehousing',
    question: 'In Snowflake architecture, how does Zero-Copy Cloning work?',
    options: [
      'It compresses data using gzip into a secondary database',
      'It duplicates metadata pointers to existing micro-partitions without copying underlying physical files',
      'It downloads data to local SSD caches',
      'It executes an asynchronous background copy over S3'
    ],
    answer: 1, // Duplicates metadata pointers without copying data
    explanation: 'Zero-Copy Cloning duplicates metadata pointers to the source table’s immutable micro-partitions. It completes in seconds with zero extra storage cost until modifications write new micro-partitions.',
    difficulty: 'medium',
    tags: ['data-engineering', 'snowflake', 'zero-copy-clone']
  },
  {
    id: 'de_mcq_11',
    subject: 'Data Engineering',
    category: 'Orchestration',
    question: 'In Apache Airflow, what mode should long-running Sensors use to avoid occupying worker task slots while waiting?',
    options: ['mode=\'poke\'', 'mode=\'reschedule\'', 'mode=\'block\'', 'mode=\'spin\''],
    answer: 1, // mode='reschedule'
    explanation: 'In `reschedule` mode, if the criteria are not met on a poke, the sensor task releases its worker slot and sleeps, freeing the worker for other tasks and preventing slot deadlocks.',
    difficulty: 'medium',
    tags: ['data-engineering', 'airflow', 'sensors']
  },
  {
    id: 'de_mcq_12',
    subject: 'Data Engineering',
    category: 'Stream Processing',
    question: 'In stream processing (Apache Flink), what mechanism tracks progress of event time to handle late-arriving records?',
    options: ['Checkpoints', 'Watermarks', 'Savepoints', 'Barriers'],
    answer: 1, // Watermarks
    explanation: 'A Watermark with timestamp T asserts that the system assumes no further events with event time < T will arrive. When a watermark passes a window end time, the window is evaluated.',
    difficulty: 'hard',
    tags: ['data-engineering', 'flink', 'watermarks']
  },
  {
    id: 'de_mcq_13',
    subject: 'Data Engineering',
    category: 'Optimization',
    question: 'What technique mitigates severe Data Skew during a Spark join where one specific merchant key contains 90% of all rows?',
    options: [
      'Decreasing spark.sql.shuffle.partitions to 1',
      'Salting the join key with random integers to distribute skewed rows across multiple partitions',
      'Converting the join to a cross-join',
      'Persisting the DataFrame with MEMORY_ONLY'
    ],
    answer: 1, // Salting join key
    explanation: 'Key Salting appends a random integer (e.g. 0 to N-1) to the skewed key in table A and replicates rows in table B across all N keys, spreading the skewed key across N tasks to prevent straggler bottlenecks.',
    difficulty: 'hard',
    tags: ['data-engineering', 'spark', 'skew-salting']
  },
  {
    id: 'de_mcq_14',
    subject: 'Data Engineering',
    category: 'Optimization',
    question: 'What is the "Small Files Problem" in distributed data lakes, and what operation resolves it?',
    options: [
      'Files smaller than 1KB cause CRC errors; resolved by renaming',
      'Millions of tiny files exhaust metadata systems and create high task overhead; resolved by Compaction',
      'Small files cannot be encrypted; resolved by KMS keys',
      'Cloud storage bans files under 5MB; resolved by zip archiving'
    ],
    answer: 1, // Exhausts metadata; resolved by Compaction
    explanation: 'Thousands of small files create high metadata listing latency and cause Spark to spawn excessive short tasks. Compaction jobs merge small files into optimal 128MB–1GB columnar blocks.',
    difficulty: 'medium',
    tags: ['data-engineering', 'lakehouse', 'compaction']
  },
  {
    id: 'de_mcq_15',
    subject: 'Data Engineering',
    category: 'Data Governance',
    question: 'What open metadata standard enables end-to-end lineage collection from Airflow, Spark, and dbt to track data origins and transformations?',
    options: ['OpenTelemetry', 'OpenLineage', 'Prometheus', 'GraphQL'],
    answer: 1, // OpenLineage
    explanation: 'OpenLineage defines an open extensible standard for collecting dataset lineage metadata events during pipeline runs, enabling automated provenance and impact analysis.',
    difficulty: 'medium',
    tags: ['data-engineering', 'governance', 'openlineage']
  },

  // ==================== 5. DEEP LEARNING (15 MCQs) ====================
  {
    id: 'dl_mcq_1',
    subject: 'Deep Learning',
    category: 'Activations',
    question: 'Why does the standard Sigmoid activation function cause vanishing gradients when used across many layers in deep neural networks?',
    options: [
      'Its output is unbounded, leading to overflow',
      'Its maximum derivative is 0.25, and approaches zero rapidly when inputs move away from zero',
      'It cannot be differentiated',
      'It produces non-deterministic values on GPUs'
    ],
    answer: 1, // Max derivative is 0.25 and approaches 0
    explanation: 'The derivative of Sigmoid is σ(z)(1 - σ(z)), which maxes out at 0.25 at z=0 and drops to near zero for |z| > 4. Repeated chain rule multiplications cause gradients in early layers to vanish.',
    difficulty: 'easy',
    tags: ['deep-learning', 'activations', 'sigmoid']
  },
  {
    id: 'dl_mcq_2',
    subject: 'Deep Learning',
    category: 'Architectures',
    question: 'How do Residual connections (ResNet) solve the degradation problem in training very deep networks (100+ layers)?',
    options: [
      'By doubling the number of convolutional kernels at every layer',
      'By adding an identity skip connection a_{l+1} = F(a_l) + a_l whose gradient includes an additive +1 term',
      'By replacing backpropagation with genetic algorithms',
      'By converting 2D convolutions into separable 1D convolutions'
    ],
    answer: 1, // Identity skip connection with +1 gradient term
    explanation: 'The skip connection formulation ensures ∂a_{l+1}/∂a_l = ∂F/∂a_l + 1. The additive +1 acts as an uninterrupted gradient highway, allowing signals to flow back directly through layers.',
    difficulty: 'medium',
    tags: ['deep-learning', 'resnet', 'skip-connections']
  },
  {
    id: 'dl_mcq_3',
    subject: 'Deep Learning',
    category: 'Weight Initialization',
    question: 'Which weight initialization strategy is specifically derived for layers using ReLU or Leaky ReLU activations?',
    options: ['Xavier / Glorot Initialization', 'He / Kaiming Initialization', 'Zero Initialization', 'LeCun Normal Initialization'],
    answer: 1, // He / Kaiming Initialization
    explanation: 'He (Kaiming) initialization sets Var(W) = 2 / n_in, doubling the variance compared to Xavier to compensate for the fact that ReLU zeroes out roughly 50% of activations in each layer.',
    difficulty: 'medium',
    tags: ['deep-learning', 'initialization', 'kaiming']
  },
  {
    id: 'dl_mcq_4',
    subject: 'Deep Learning',
    category: 'Optimizers',
    question: 'How does AdamW fundamentally differ from the standard Adam optimizer when L2 regularization is configured?',
    options: [
      'AdamW multiplies gradients by a constant factor',
      'AdamW decouples weight decay directly from gradient updates rather than decaying through adaptive moving moments',
      'AdamW eliminates momentum entirely',
      'AdamW works only on CPU architectures'
    ],
    answer: 1, // Decoupled weight decay
    explanation: 'In standard Adam, L2 regularization is added directly to gradients, which distorts decay through adaptive moving moments. AdamW decouples weight decay directly, applying it directly to parameters.',
    difficulty: 'hard',
    tags: ['deep-learning', 'optimizers', 'adamw']
  },
  {
    id: 'dl_mcq_5',
    subject: 'Deep Learning',
    category: 'Attention',
    question: 'What is the purpose of dividing the dot product Q·K^T by √d_k in Scaled Dot-Product Attention?',
    options: [
      'To make the matrix square',
      'To prevent large dot product magnitudes from pushing the softmax into regions with vanishing gradients',
      'To reduce memory consumption of attention weights',
      'To eliminate the need for value projections'
    ],
    answer: 1, // Prevent softmax saturation
    explanation: 'The variance of the dot product of two vectors of dimension d_k is d_k. Scaling by √d_k normalizes the variance back to 1, preventing large values from saturating the softmax into near-zero gradient regions.',
    difficulty: 'medium',
    tags: ['deep-learning', 'transformers', 'attention']
  },
  {
    id: 'dl_mcq_6',
    subject: 'Deep Learning',
    category: 'Normalization',
    question: 'Why is Layer Normalization preferred over Batch Normalization in Transformers and sequence processing models?',
    options: [
      'Layer Normalization requires zero floating-point operations',
      'Layer Normalization normalizes across features independently for each sequence token without batch dependency',
      'Layer Normalization eliminates the need for activation functions',
      'Batch Normalization cannot be computed on GPUs'
    ],
    answer: 1, // Normalizes across features independently per sample
    explanation: 'Batch Normalization depends on batch statistics and struggles with variable sequence lengths and small batch sizes. Layer Normalization operates along feature dimensions per token independently.',
    difficulty: 'medium',
    tags: ['deep-learning', 'layernorm', 'transformers']
  },
  {
    id: 'dl_mcq_7',
    subject: 'Deep Learning',
    category: 'Regularization',
    question: 'What does Inverted Dropout do during the training phase to eliminate test-time adjustments?',
    options: [
      'Applies dropout to weights rather than activations',
      'Scales active neuron outputs by 1 / (1 - p) during training so test-time forward pass requires no modification',
      'Randomly flips activation signs from positive to negative',
      'Freezes gradients in odd-numbered layers'
    ],
    answer: 1, // Scales by 1 / (1 - p) during training
    explanation: 'Inverted Dropout divides active activations by (1 - p) during training forward passes. This preserves expected values, allowing inference to run at full scale without test-time weight multiplication.',
    difficulty: 'easy',
    tags: ['deep-learning', 'regularization', 'dropout']
  },
  {
    id: 'dl_mcq_8',
    subject: 'Deep Learning',
    category: 'Computer Vision',
    question: 'Given an input feature map of size 32x32, convolution kernel size 5x5, padding 2, and stride 2, what is the output spatial size?',
    options: ['16x16', '14x14', '15x15', '32x32'],
    answer: 0, // 16x16
    explanation: 'Output size O = floor((W - K + 2P) / S) + 1 = floor((32 - 5 + 4) / 2) + 1 = floor(31 / 2) + 1 = 15 + 1 = 16.',
    difficulty: 'medium',
    tags: ['deep-learning', 'cnn', 'convolution-math']
  },
  {
    id: 'dl_mcq_9',
    subject: 'Deep Learning',
    category: 'Vision Transformers',
    question: 'In Vision Transformers (ViT), how are 2D images converted into input sequences suitable for standard Transformer encoders?',
    options: [
      'By computing Fourier transforms over pixel values',
      'By dividing the image into non-overlapping patches (e.g. 16x16) and linearly projecting them into 1D embeddings',
      'By converting pixel values into ASCII characters',
      'By running a 50-layer ResNet backbone on every pixel'
    ],
    answer: 1, // Dividing into patches and linearly projecting
    explanation: 'ViT partitions an image into non-overlapping PxP patches (e.g. 16x16), flattens each patch into a vector, and linearly projects them to create an input sequence analogous to word tokens.',
    difficulty: 'medium',
    tags: ['deep-learning', 'vit', 'computer-vision']
  },
  {
    id: 'dl_mcq_10',
    subject: 'Deep Learning',
    category: 'Loss Functions',
    question: 'Why is Cross-Entropy Loss combined with Softmax preferred over Mean Squared Error (MSE) for multi-class classification?',
    options: [
      'MSE cannot compute gradients for probabilities',
      'The gradient of Cross-Entropy with Softmax is simply (p_i - y_i), preventing vanishing gradients when predictions are wrong',
      'Cross-Entropy produces lower GPU memory usage',
      'Softmax outputs cannot be subtracted'
    ],
    answer: 1, // Gradient is (p_i - y_i)
    explanation: 'When combined with Softmax, Cross-Entropy has gradient ∂L/∂z_i = p_i - y_i, which scales directly with error. In contrast, MSE includes a p_i(1 - p_i) term that stalls learning when the model is wrong.',
    difficulty: 'hard',
    tags: ['deep-learning', 'loss-functions', 'cross-entropy']
  },
  {
    id: 'dl_mcq_11',
    subject: 'Deep Learning',
    category: 'Recurrent Models',
    question: 'Which gate in an LSTM determines what proportion of the previous cell state C_{t-1} is retained or erased?',
    options: ['Input Gate', 'Output Gate', 'Forget Gate', 'Reset Gate'],
    answer: 2, // Forget Gate
    explanation: 'The Forget Gate f_t = σ(W_f [h_{t-1}, x_t] + b_f) produces values between 0 and 1, where 0 means "completely discard" and 1 means "completely retain" the previous memory state.',
    difficulty: 'easy',
    tags: ['deep-learning', 'lstm', 'forget-gate']
  },
  {
    id: 'dl_mcq_12',
    subject: 'Deep Learning',
    category: 'Model Compression',
    question: 'In Knowledge Distillation, what is the role of the Temperature parameter T when softening teacher logits?',
    options: [
      'Prevents GPU overheating during training',
      'Exposes relative probabilities assigned to incorrect classes ("dark knowledge") by smoothing the distribution',
      'Forces student weights to match teacher weights exactly',
      'Converts floating point weights to integers'
    ],
    answer: 1, // Exposes dark knowledge by smoothing distribution
    explanation: 'Higher temperature T softens the softmax output, revealing relative relationships and correlations between incorrect classes (dark knowledge) that are otherwise masked by one-hot outputs.',
    difficulty: 'medium',
    tags: ['deep-learning', 'knowledge-distillation', 'temperature']
  },
  {
    id: 'dl_mcq_13',
    subject: 'Deep Learning',
    category: 'Distributed Training',
    question: 'Which distributed training strategy splits individual weight matrices across multiple GPUs over high-speed NVLink connections?',
    options: ['Distributed Data Parallel (DDP)', 'Tensor Parallelism (Megatron-LM)', 'Pipeline Parallelism', 'Zero Redundancy Optimizer Stage 1'],
    answer: 1, // Tensor Parallelism
    explanation: 'Tensor Parallelism partitions large matrix multiplications (e.g. self-attention QKV projections and MLP layers) intra-node across GPUs, requiring ultra-high NVLink interconnect bandwidth.',
    difficulty: 'hard',
    tags: ['deep-learning', 'distributed-training', 'tensor-parallelism']
  },
  {
    id: 'dl_mcq_14',
    subject: 'Deep Learning',
    category: 'Self-Supervised Learning',
    question: 'What loss function is widely used in Contrastive Learning (SimCLR) to maximize agreement between differently augmented views of the same image?',
    options: ['Hinge Loss', 'InfoNCE (NT-Xent) Loss', 'Mean Absolute Error', 'Focal Loss'],
    answer: 1, // InfoNCE Loss
    explanation: 'The InfoNCE (Normalized Temperature-scaled Cross Entropy) loss pulls representations of augmented positive pairs together while pushing representations of all other negative batch items apart.',
    difficulty: 'hard',
    tags: ['deep-learning', 'contrastive-learning', 'infonce']
  },
  {
    id: 'dl_mcq_15',
    subject: 'Deep Learning',
    category: 'PyTorch Internals',
    question: 'In PyTorch, why should you call `model.eval()` before running validation or inference on a trained model?',
    options: [
      'It compiles the model to C++ binaries',
      'It disables dropout layers and switches batch normalization to use running population statistics',
      'It clears all stored gradients from memory',
      'It moves model tensors from CPU to GPU'
    ],
    answer: 1, // Disables dropout and switches batchnorm
    explanation: '`model.eval()` toggles evaluation mode: Dropout stops dropping activations (p=0), and BatchNorm uses accumulated running mean and variance instead of batch statistics.',
    difficulty: 'easy',
    tags: ['deep-learning', 'pytorch', 'model-eval']
  },

  // ==================== 6. LLMS AND GENERATIVE AI (15 MCQs) ====================
  {
    id: 'llm_mcq_1',
    subject: 'LLMs and Generative AI',
    category: 'Architectures',
    question: 'What attention variant groups multiple Query heads to share a single Key and Value head, reducing KV cache memory while preserving quality?',
    options: ['Multi-Head Attention (MHA)', 'Multi-Query Attention (MQA)', 'Grouped-Query Attention (GQA)', 'FlashAttention-1'],
    answer: 2, // Grouped-Query Attention (GQA)
    explanation: 'Grouped-Query Attention (GQA) groups query heads (e.g. 8 queries per 1 KV head). It bridges MHA and MQA, delivering near-MQA inference memory speed with near-MHA accuracy.',
    difficulty: 'medium',
    tags: ['llms', 'gqa', 'kv-cache']
  },
  {
    id: 'llm_mcq_2',
    subject: 'LLMs and Generative AI',
    category: 'Fine-Tuning',
    question: 'In LoRA (Low-Rank Adaptation), how are weight updates parameterized for a frozen weight matrix W_0 of shape d x k?',
    options: [
      'By training a sparse binary mask',
      'By low-rank matrix decomposition ΔW = (α/r) * (B · A) where A has shape r x k and B has shape d x r',
      'By quantizing weights to 2 bits',
      'By reinitializing only the bias vectors'
    ],
    answer: 1, // ΔW = (α/r) * (B · A)
    explanation: 'LoRA freezes W_0 and trains two low-rank matrices A and B where rank r ≪ min(d, k). This reduces trainable parameters by >99% and merges back into W_0 with zero inference latency overhead.',
    difficulty: 'medium',
    tags: ['llms', 'lora', 'peft']
  },
  {
    id: 'llm_mcq_3',
    subject: 'LLMs and Generative AI',
    category: 'Alignment',
    question: 'How does Direct Preference Optimization (DPO) eliminate the traditional RLHF complexity?',
    options: [
      'It eliminates human feedback entirely',
      'It analytically maps rewards to policies, training directly on chosen/rejected pairs with cross-entropy without an explicit reward model or RL loop',
      'It trains on synthetic data only',
      'It replaces prompt engineering with grid search'
    ],
    answer: 1, // Analytically maps rewards to policies
    explanation: 'DPO shows that the language model itself can implicitly define the reward function. It directly optimizes a classification loss on preference pairs without fitting a separate reward model or tuning PPO.',
    difficulty: 'hard',
    tags: ['llms', 'dpo', 'alignment']
  },
  {
    id: 'llm_mcq_4',
    subject: 'LLMs and Generative AI',
    category: 'RAG Architecture',
    question: 'In Advanced RAG pipelines, what algorithm effectively combines ranked results from dense vector retrieval and sparse BM25 lexical search?',
    options: ['Linear Regression', 'Reciprocal Rank Fusion (RRF)', 'K-Means clustering', 'PCA projection'],
    answer: 1, // Reciprocal Rank Fusion (RRF)
    explanation: 'Reciprocal Rank Fusion (RRF) scores items by summing 1 / (60 + rank_i) across dense and sparse retrievals, enabling effective hybrid search without requiring calibrated score normalization.',
    difficulty: 'medium',
    tags: ['llms', 'rag', 'hybrid-search']
  },
  {
    id: 'llm_mcq_5',
    subject: 'LLMs and Generative AI',
    category: 'Positional Embeddings',
    question: 'What is the key mathematical property of Rotary Position Embeddings (RoPE)?',
    options: [
      'It assigns static integers to absolute token indexes',
      'It applies orthogonal rotation matrices to Query and Key projections such that their inner product depends only on relative token distance',
      'It removes positional encodings from attention',
      'It compresses token sequences into single embeddings'
    ],
    answer: 1, // Orthogonal rotation preserving relative distance
    explanation: 'RoPE rotates Query and Key representations in 2D chunks. The inner product ⟨R_m q, R_n k⟩ decays smoothly as relative distance (m - n) grows, facilitating context-length extrapolation.',
    difficulty: 'hard',
    tags: ['llms', 'rope', 'transformers']
  },
  {
    id: 'llm_mcq_6',
    subject: 'LLMs and Generative AI',
    category: 'Sampling',
    question: 'What sampling strategy dynamically selects the smallest set of tokens whose cumulative probability exceeds threshold p?',
    options: ['Top-k sampling', 'Greedy decoding', 'Nucleus / Top-p sampling', 'Beam search'],
    answer: 2, // Nucleus / Top-p sampling
    explanation: 'Top-p (Nucleus) sampling truncates the tail of the probability distribution by keeping the smallest subset of candidate tokens whose cumulative probability exceeds p (e.g. 0.90), dynamically adapting pool size.',
    difficulty: 'easy',
    tags: ['llms', 'sampling', 'top-p']
  },
  {
    id: 'llm_mcq_7',
    subject: 'LLMs and Generative AI',
    category: 'Protocols & Agents',
    question: 'What is the Model Context Protocol (MCP) introduced to standardize in generative AI applications?',
    options: [
      'GPU hardware driver interfaces for PyTorch',
      'An open standard protocol for connecting AI assistants and LLMs to local files, tools, and remote resources via JSON-RPC',
      'A tokenization scheme for multimodal vision models',
      'A benchmarking dataset for mathematical reasoning'
    ],
    answer: 1, // Open protocol connecting LLMs to tools/context via JSON-RPC
    explanation: 'MCP is an open protocol standardizing how LLMs interface with resources, prompts, and tools via JSON-RPC, replacing proprietary glue code with reusable integrations.',
    difficulty: 'easy',
    tags: ['llms', 'mcp', 'agents']
  },
  {
    id: 'llm_mcq_8',
    subject: 'LLMs and Generative AI',
    category: 'Vector Search',
    question: 'What graph-based indexing algorithm delivers sub-millisecond approximate nearest neighbor retrieval in vector databases?',
    options: ['B-Tree Index', 'Inverted Full-Text Index', 'Hierarchical Navigable Small World (HNSW)', 'R-Tree Spatial Index'],
    answer: 2, // HNSW
    explanation: 'HNSW builds a multi-layer geometric graph structure inspired by Skip Lists, providing logarithmic search time O(log N) with high recall for high-dimensional vector similarity.',
    difficulty: 'medium',
    tags: ['llms', 'hnsw', 'vector-databases']
  },
  {
    id: 'llm_mcq_9',
    subject: 'LLMs and Generative AI',
    category: 'Serving Optimization',
    question: 'How does PagedAttention (vLLM) resolve the major bottleneck in high-throughput LLM serving?',
    options: [
      'By quantizing models to 1 bit',
      'By allocating KV cache into non-contiguous virtual memory blocks, eliminating memory fragmentation',
      'By deleting all past conversational context',
      'By converting Python code to C++'
    ],
    answer: 1, // Allocating KV cache into non-contiguous memory blocks
    explanation: 'PagedAttention applies operating system paging principles to the KV cache, allocating memory in fixed-size blocks dynamically. It reduces memory waste from 60–80% to under 4%, doubling serving throughput.',
    difficulty: 'hard',
    tags: ['llms', 'vllm', 'pagedattention']
  },
  {
    id: 'llm_mcq_10',
    subject: 'LLMs and Generative AI',
    category: 'Evaluation',
    question: 'In the Ragas evaluation framework, what metric measures whether claims made in generated text are grounded in retrieved context?',
    options: ['Answer Relevance', 'Context Recall', 'Faithfulness', 'Context Precision'],
    answer: 2, // Faithfulness
    explanation: 'Faithfulness evaluates factual consistency between the generated answer and retrieved context chunks, directly measuring the hallucination rate of a RAG pipeline.',
    difficulty: 'medium',
    tags: ['llms', 'ragas', 'evaluation']
  },
  {
    id: 'llm_mcq_11',
    subject: 'LLMs and Generative AI',
    category: 'Security',
    question: 'What security attack occurs when an attacker hides malicious instructions in a third-party document retrieved by an LLM via RAG?',
    options: ['Direct Jailbreaking', 'Indirect Prompt Injection', 'Model Inversion', 'DDoS Token Flooding'],
    answer: 1, // Indirect Prompt Injection
    explanation: 'Indirect prompt injection occurs when external untrusted content processed by an LLM (e.g. web pages, emails, indexed PDFs) contains adversarial prompts that hijack the model’s execution flow.',
    difficulty: 'medium',
    tags: ['llms', 'security', 'prompt-injection']
  },
  {
    id: 'llm_mcq_12',
    subject: 'LLMs and Generative AI',
    category: 'Structured Outputs',
    question: 'How do Constrained Decoding frameworks (Outlines / Guidance) ensure 100% valid JSON matching a Pydantic schema?',
    options: [
      'By prompting the model repeatedly until the output parses successfully',
      'By masking invalid tokens with -∞ logits at each generation step according to a Finite State Machine (FSM)',
      'By running a regex replace on the generated string post-hoc',
      'By training a specialized parser transformer'
    ],
    answer: 1, // Masking invalid tokens via FSM
    explanation: 'Constrained decoding compiles schemas into a Finite State Machine (FSM). At every step, tokens that would violate the grammar are masked out in the logits vector before softmax, guaranteeing validity.',
    difficulty: 'hard',
    tags: ['llms', 'structured-outputs', 'constrained-decoding']
  },
  {
    id: 'llm_mcq_13',
    subject: 'LLMs and Generative AI',
    category: 'Quantization',
    question: 'Which post-training quantization method identifies that preserving only 1% of salient weights in FP16 allows quantizing 99% of weights to INT4 with zero quality loss?',
    options: ['GPTQ', 'AWQ (Activation-aware Weight Quantization)', 'GGUF Q4_K_M', 'NF4'],
    answer: 1, // AWQ
    explanation: 'AWQ demonstrates that weights with large activation magnitudes protect model performance. Protecting this top 1% salient channel in higher precision allows the remaining 99% to be quantized to INT4 safely.',
    difficulty: 'hard',
    tags: ['llms', 'quantization', 'awq']
  },
  {
    id: 'llm_mcq_14',
    subject: 'LLMs and Generative AI',
    category: 'Agent Architecture',
    question: 'What prompt reasoning paradigm alternates between generating thoughts, calling external tools, and observing outcomes?',
    options: ['Chain-of-Thought (CoT)', 'ReAct (Reasoning + Acting)', 'Few-Shot Exemplar', 'Skeleton-of-Thought'],
    answer: 1, // ReAct
    explanation: 'ReAct explicitly interleaves reasoning traces (Thought) and task-specific actions (Action / Tool Call), receiving external Observations before synthesizing conclusions.',
    difficulty: 'easy',
    tags: ['llms', 'agents', 'react']
  },
  {
    id: 'llm_mcq_15',
    subject: 'LLMs and Generative AI',
    category: 'Latency Optimization',
    question: 'What technique uses a small draft model to generate candidate tokens which are verified in parallel by a larger target model in a single forward pass?',
    options: ['Beam Search', 'Speculative Decoding', 'PagedAttention', 'LoRA Merging'],
    answer: 1, // Speculative Decoding
    explanation: 'Speculative decoding employs an efficient draft model to propose K candidate tokens quickly. The large target model validates all K candidates simultaneously in a single forward pass, providing 2–3x latency speedups.',
    difficulty: 'medium',
    tags: ['llms', 'latency', 'speculative-decoding']
  },

  // ==================== 7. MLOPS AND AI ENGINEERING (15 MCQs) ====================
  {
    id: 'mlops_mcq_1',
    subject: 'MLOps and AI Engineering',
    category: 'Core Concepts',
    question: 'What is the primary difference between Data Drift and Concept Drift in production ML monitoring?',
    options: [
      'Data drift affects training; concept drift affects validation',
      'Data drift is a shift in input distribution P(X); Concept drift is a change in relationship P(Y | X)',
      'Data drift is detected via F1 score; Concept drift is detected via latency',
      'Data drift occurs only in computer vision models'
    ],
    answer: 1, // Shift in P(X) vs change in P(Y|X)
    explanation: 'Data drift (covariate shift) means the input feature distribution P(X) changes while the ground-truth relationship stays constant. Concept drift means the underlying relationship P(Y | X) itself has changed.',
    difficulty: 'medium',
    tags: ['mlops', 'drift', 'covariate-shift']
  },
  {
    id: 'mlops_mcq_2',
    subject: 'MLOps and AI Engineering',
    category: 'Drift Metrics',
    question: 'What value of the Population Stability Index (PSI) generally triggers an automated model retraining pipeline?',
    options: ['PSI < 0.05', 'PSI between 0.05 and 0.1', 'PSI > 0.2', 'PSI = 0.0'],
    answer: 2, // PSI > 0.2
    explanation: 'Standard PSI guidelines: PSI < 0.1 indicates no significant shift; 0.1 <= PSI <= 0.2 indicates moderate change requiring monitoring; PSI > 0.2 represents significant distribution drift requiring retraining.',
    difficulty: 'easy',
    tags: ['mlops', 'psi', 'monitoring']
  },
  {
    id: 'mlops_mcq_3',
    subject: 'MLOps and AI Engineering',
    category: 'Feature Stores',
    question: 'How does a Feature Store (such as Feast) prevent Training-Serving Skew?',
    options: [
      'By automatically retraining models every hour',
      'By providing unified feature definitions with point-in-time joins for training and low-latency key-value lookups for inference',
      'By compressing datasets into parquet files',
      'By running gradient descent on the database server'
    ],
    answer: 1, // Unified feature definitions with point-in-time joins
    explanation: 'Feature stores ensure feature computation logic is defined once. The offline store creates point-in-time historical datasets without leakage, while the online store (Redis) serves identical feature values to inference APIs.',
    difficulty: 'medium',
    tags: ['mlops', 'feature-store', 'training-serving-skew']
  },
  {
    id: 'mlops_mcq_4',
    subject: 'MLOps and AI Engineering',
    category: 'Deployment',
    question: 'What deployment strategy mirrors production traffic asynchronously to a candidate model without returning candidate outputs to users?',
    options: ['Canary Deployment', 'Shadow Deployment', 'Blue/Green Deployment', 'A/B Test'],
    answer: 1, // Shadow Deployment
    explanation: 'In shadow deployment, real-world live requests are copied to the candidate model to measure latency, stability, and score distributions without impacting user experience or operational safety.',
    difficulty: 'easy',
    tags: ['mlops', 'deployment', 'shadow-deployment']
  },
  {
    id: 'mlops_mcq_5',
    subject: 'MLOps and AI Engineering',
    category: 'Serving Runtimes',
    question: 'What feature in NVIDIA Triton Inference Server buffers incoming asynchronous requests for a configurable time window to execute parallel GPU batches?',
    options: ['Model Pipelining', 'Dynamic Batching', 'Multi-Instance GPU', 'Kernel Profiling'],
    answer: 1, // Dynamic Batching
    explanation: 'Dynamic Batching buffers client requests over a micro-window (e.g. 5ms), forming a contiguous batch that fully saturates GPU tensor cores and multiplies throughput by 5–10x.',
    difficulty: 'medium',
    tags: ['mlops', 'triton', 'dynamic-batching']
  },
  {
    id: 'mlops_mcq_6',
    subject: 'MLOps and AI Engineering',
    category: 'Data Versioning',
    question: 'How does DVC (Data Version Control) enable Git repositories to track multi-gigabyte datasets without repository bloat?',
    options: [
      'By converting images into text files',
      'By storing lightweight .dvc hash pointer files in Git while syncing actual binary data to cloud object stores',
      'By deleting historical data versions automatically',
      'By using WebSockets for streaming data'
    ],
    answer: 1, // Lightweight .dvc hash files in Git
    explanation: 'DVC computes hashes of large files/directories and writes tiny `.dvc` metadata files that are committed to Git, while syncing actual binary payloads to remote S3/GCS buckets via `dvc push/pull`.',
    difficulty: 'easy',
    tags: ['mlops', 'dvc', 'versioning']
  },
  {
    id: 'mlops_mcq_7',
    subject: 'MLOps and AI Engineering',
    category: 'Security',
    question: 'Why is loading untrusted model files with Python’s standard `pickle.load()` dangerous?',
    options: [
      'Pickle files are limited to 2GB in size',
      'Pickle deserialization can execute arbitrary operating system code injected via `__reduce__`',
      'Pickle files cannot run on GPU architectures',
      'Pickle alters model floating point precision'
    ],
    answer: 1, // Arbitrary code execution via __reduce__
    explanation: 'Pickle deserialization allows objects to define executable initialization routines (`__reduce__`), enabling malicious actors to inject arbitrary system commands or reverse shells into model files.',
    difficulty: 'medium',
    tags: ['mlops', 'security', 'pickle']
  },
  {
    id: 'mlops_mcq_8',
    subject: 'MLOps and AI Engineering',
    category: 'Model Serialization',
    question: 'What safe tensor serialization format developed by Hugging Face prevents arbitrary code execution and supports instant zero-copy loading?',
    options: ['ONNX', 'Pickle', 'Safetensors', 'HDF5'],
    answer: 2, // Safetensors
    explanation: '`safetensors` contains only raw tensor buffers and a header with zero executable code, eliminating code execution vulnerabilities while enabling zero-copy memory mapping (`mmap`) for instant load times.',
    difficulty: 'easy',
    tags: ['mlops', 'safetensors', 'security']
  },
  {
    id: 'mlops_mcq_9',
    subject: 'MLOps and AI Engineering',
    category: 'Hardware Management',
    question: 'What NVIDIA technology allows partitioning an A100 or H100 GPU into up to 7 isolated hardware instances with dedicated memory and compute cores?',
    options: ['SLI (Scalable Link Interface)', 'MIG (Multi-Instance GPU)', 'CUDA Streams', 'NVLink'],
    answer: 1, // Multi-Instance GPU (MIG)
    explanation: 'MIG partitions a physical GPU into up to 7 hardware-isolated instances with dedicated memory, crossbars, and compute cores, providing predictable QoS and isolation for multi-tenant workloads.',
    difficulty: 'medium',
    tags: ['mlops', 'gpu', 'mig']
  },
  {
    id: 'mlops_mcq_10',
    subject: 'MLOps and AI Engineering',
    category: 'LLMOps Monitoring',
    question: 'In LLMOps monitoring, what metric measures the delay from request submission until the first generated token is streamed back to the client?',
    options: ['Inter-Token Latency (ITL)', 'Time to First Token (TTFT)', 'Tokens Per Second (TPS)', 'Perplexity'],
    answer: 1, // Time to First Token (TTFT)
    explanation: 'TTFT measures the time required for prompt ingestion, embedding, retrieval, and generating token #1. It is the critical latency metric determining user perception of responsiveness in conversational apps.',
    difficulty: 'easy',
    tags: ['mlops', 'llmops', 'ttft']
  },
  {
    id: 'mlops_mcq_11',
    subject: 'MLOps and AI Engineering',
    category: 'Caching',
    question: 'How does Semantic Caching differ from standard exact-match HTTP/Redis caching for LLM APIs?',
    options: [
      'It stores tokens in GPU SRAM',
      'It embeds queries and returns cached responses when cosine similarity exceeds a high threshold (e.g. 0.96), even if prompt wording differs',
      'It deletes responses after 5 minutes',
      'It works only for image generation models'
    ],
    answer: 1, // Embeds queries and evaluates cosine similarity
    explanation: 'Semantic caching uses vector embeddings to match queries with semantically equivalent meanings ("What is the capital of France?" vs "Tell me France\'s capital city"), delivering sub-20ms hits at zero LLM cost.',
    difficulty: 'medium',
    tags: ['mlops', 'caching', 'semantic-cache']
  },
  {
    id: 'mlops_mcq_12',
    subject: 'MLOps and AI Engineering',
    category: 'Pipeline Orchestration',
    question: 'Which orchestrator runs each machine learning pipeline step as an isolated container natively on Kubernetes with built-in artifact tracking?',
    options: ['Celery', 'Cron', 'Kubeflow Pipelines (KFP)', 'RabbitMQ'],
    answer: 2, // Kubeflow Pipelines (KFP)
    explanation: 'Kubeflow Pipelines uses Kubernetes and Argo Workflows to execute each step in a dedicated container with fine-grained CPU/GPU specifications and native artifact lineage logging.',
    difficulty: 'medium',
    tags: ['mlops', 'kubeflow', 'orchestration']
  },
  {
    id: 'mlops_mcq_13',
    subject: 'MLOps and AI Engineering',
    category: 'Testing',
    question: 'In the CheckList testing framework for ML, what type of test perturbs an input in a way that should produce identical model output (e.g. changing names in sentiment analysis)?',
    options: ['Minimum Functionality Test (MFT)', 'Invariance Test (INV)', 'Directional Expectation Test (DIR)', 'Stress Test'],
    answer: 1, // Invariance Test (INV)
    explanation: 'Invariance tests verify that introducing task-irrelevant variations (e.g. replacing person names, locations, or typos) does not change the model’s prediction.',
    difficulty: 'medium',
    tags: ['mlops', 'testing', 'checklist']
  },
  {
    id: 'mlops_mcq_14',
    subject: 'MLOps and AI Engineering',
    category: 'Model Compilation',
    question: 'What optimization does TensorRT perform to reduce GPU memory bandwidth round-trips when deploying neural networks?',
    options: [
      'Layer & Tensor Kernel Fusion (e.g. combining Conv + Bias + ReLU into a single GPU kernel)',
      'Training on float64 double precision',
      'Converting models to Python scripts',
      'Running models across multiple cloud regions'
    ],
    answer: 0, // Layer & Tensor Kernel Fusion
    explanation: 'TensorRT fuses adjacent layers (e.g., Convolution + Bias + Activation) into a single optimized CUDA kernel, eliminating intermediate write/read rounds to GPU VRAM and speeding up execution.',
    difficulty: 'hard',
    tags: ['mlops', 'tensorrt', 'kernel-fusion']
  },
  {
    id: 'mlops_mcq_15',
    subject: 'MLOps and AI Engineering',
    category: 'Governance & Registries',
    question: 'What are the four standardized stages a model version transitions through in an enterprise MLflow Model Registry?',
    options: [
      'Alpha, Beta, RC, Gold',
      'None/Development, Staging, Production, Archived',
      'Draft, Review, Published, Deleted',
      'Local, Docker, Kubernetes, Cloud'
    ],
    answer: 1, // None/Development, Staging, Production, Archived
    explanation: 'The standard MLflow model lifecycle stages are Development (None), Staging (undergoing automated testing/shadow evaluation), Production (handling live traffic), and Archived (superseded versions).',
    difficulty: 'easy',
    tags: ['mlops', 'mlflow', 'model-registry']
  }
];

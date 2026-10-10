---
title: Knowledge Representation, Expert Systems, and Constraint Satisfaction
subject: Artificial Intelligence
category: AI & Machine Learning
difficulty: hard
importance: high
tags:
  - ai
  - knowledge-representation
  - first-order-logic
  - expert-systems
  - csp
  - automated-planning
---

# Knowledge Representation, Expert Systems, and Constraint Satisfaction

Classical AI relies on structured formalisms to store assertions about the world and infer new truths algorithmically.

---

## 1. Propositional Logic vs. First-Order Logic (FOL)

- **Propositional Logic:** Operates on atomic boolean propositions ($P, Q, R$) connected by logical operators ($\land, \lor, \neg, \implies, \iff$). Incapable of expressing generalized statements over objects.
- **First-Order Logic (Predicate Logic):** Models worlds consisting of **Objects** (e.g., Alice, NodeA), **Relations/Predicates** (e.g., ParentOf, ConnectedTo), and **Functions** (e.g., BestFriendOf).
  - Existential Quantifier ($\exists$): True if assertion holds for at least one object.
  - Universal Quantifier ($\forall$): True if assertion holds for all objects in domain.

### Inference Algorithms
1. **Forward Chaining (Data-Driven):** Starts with known atomic facts in knowledge base and applies modus ponens ($P \land (P \implies Q) \implies Q$) to infer new facts until the query goal is derived.
2. **Backward Chaining (Goal-Driven):** Starts with query hypothesis and searches backwards through implications to verify supporting premise facts.
3. **Resolution Refutation:** Converts formulas to Conjunctive Normal Form (CNF) and derives empty clause (contradiction) from $KB \land \neg Query$.

---

## 2. Constraint Satisfaction Problems (CSPs)

A CSP is formally defined by three components:
- **Variables $X$:** $\{X_1, X_2, \dots, X_n\}$
- **Domains $D$:** $\{D_1, D_2, \dots, D_n\}$ where $D_i$ is set of allowable values for $X_i$.
- **Constraints $C$:** Allowable combinations of values across subset of variables.

### Classical Examples
- **Map Coloring:** Assign colors to regions such that adjacent regions have different colors.
- **N-Queens Problem:** Place $N$ queens on an $N \times N$ chessboard such that no two attack each other.
- **Sudoku:** 81 variables, domain $\{1..9\}$, all-different constraints on rows, columns, and $3 \times 3$ boxes.

### Solving CSPs: Backtracking + Arc Consistency (AC-3)
1. **Backtracking Search:** Depth-first search that assigns one variable at a time, backtracking on dead ends.
2. **MRV Heuristic (Minimum Remaining Values):** Pick variable with fewest legal values remaining ("fail-first").
3. **Degree Heuristic:** Pick variable with most constraints on unassigned variables.
4. **LCV (Least Constraining Value):** Pick value that rules out the fewest choices for neighboring variables.
5. **AC-3 (Arc Consistency):** Enforces for every pair $(X_i, X_j)$ that for every $x \in D_i$, there exists legal $y \in D_j$.

```python
def ac3(variables, domains, constraints):
    """
    AC-3 algorithm for constraint propagation.
    Ensures directional arc consistency across all binary constraints.
    """
    from collections import deque
    queue = deque([(xi, xj) for xi in variables for xj in neighbors(xi)])

    while queue:
        xi, xj = queue.popleft()
        if revise(domains, xi, xj, constraints):
            if len(domains[xi]) == 0:
                return False # Inconsistent CSP, domain wipeout
            for xk in neighbors(xi):
                if xk != xj:
                    queue.append((xk, xi))
    return True
```

---

## 3. Automated Planning: STRIPS and PDDL

In classical planning, state transitions are represented explicitly rather than via black-box code:
- **State:** Conjunction of positive ground literals (e.g., $At(Robot, Lab) \land Has(Robot, Key)$).
- **Actions (Operators):**
  - **Action Name & Parameters:** e.g., $Move(from, to)$
  - **Preconditions:** What must be true to execute (e.g., $At(Robot, from)$).
  - **Effects:** What becomes true (**Add List**) and false (**Delete List**).

Planning algorithms (e.g., FastForward, Graphplan) construct plans by searching through state space or plan space using domain-independent heuristic graphs.

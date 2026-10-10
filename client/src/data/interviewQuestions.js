// Centralized Master Technical Interview Questions Dataset
// Contains comprehensive technical interview questions across core CS, Cloud/DevOps, and AI/Data subjects.

import { aiCurriculumQuestions } from './aiCurriculumQuestions.js';

const baseInterviewQuestionsData = [
  // ==================== 1. OOP ====================
  {
    id: 'mock_1',
    subject: 'OOP',
    category: 'Polymorphism',
    difficulty: 'medium',
    interviewerPrompt: 'What is the exact technical difference between method overloading and method overriding in Object-Oriented Programming?',
    idealAnswer: 'Method Overloading occurs at compile-time within the same class where two or more methods share the exact same name but differ in parameter count, parameter types, or parameter order. Return types may differ, but return type alone cannot distinguish overloaded methods.\n\nMethod Overriding occurs at runtime across inheritance boundaries when a child subclass provides a specialized definition of an inherited parent method. The overridden method must retain the same name, same parameter list, and a covariant return type, and must not have more restrictive access modifiers.',
    keyPoints: [
      'Compile-time (static) vs Runtime (dynamic) resolution',
      'Same class vs Subclass (inheritance boundary)',
      'Parameter signature must change for overloading, must remain identical for overriding',
      'Access modifier restrictions (cannot reduce visibility in overriding)',
      'Static methods cannot be overridden (method hiding instead)'
    ],
    expectedConcepts: ['Dynamic Method Dispatch', 'Method Signature', 'Polymorphism', 'Inheritance'],
    relatedTopicId: 'oop_polymorphism'
  },
  {
    id: 'oop_q2',
    subject: 'OOP',
    category: 'Core Principles',
    difficulty: 'easy',
    interviewerPrompt: 'What is Encapsulation, and how does it fundamentally differ from Abstraction?',
    idealAnswer: 'Encapsulation is the bundling of data (fields) and the methods that operate on that data into a single unit (class), while restricting direct access to internal state using private modifiers and controlled getters/setters (data hiding).\n\nAbstraction is the process of hiding implementation complexity and exposing only essential interfaces to the consumer (e.g. abstract classes and interfaces).\n\nKey distinction: Encapsulation is about IMPLEMENTATION PROTECTION ("How do I protect internal state?"), whereas Abstraction is about INTERFACE DESIGN ("What does this entity do without showing how it works?").',
    keyPoints: [
      'Encapsulation = Data Hiding + Bundling + Validation',
      'Abstraction = Hiding internal complexity, exposing contract',
      'Getters/Setters allow invariant checking',
      'Interfaces and Abstract classes implement Abstraction'
    ],
    expectedConcepts: ['Data Hiding', 'Getters and Setters', 'Contract', 'Abstraction Boundary'],
    relatedTopicId: 'oop_oop-interview-study-material'
  },
  {
    id: 'oop_q3',
    subject: 'OOP',
    category: 'Inheritance',
    difficulty: 'medium',
    interviewerPrompt: 'Why does Java disallow multiple inheritance with classes, and what is the Diamond Problem?',
    idealAnswer: 'Java disallows multiple inheritance of classes to prevent ambiguity known as the Diamond Problem. If class D extends both class B and class C, and both B and C override a method show() from class A, the compiler and runtime cannot unambiguously resolve which implementation D should inherit.\n\nJava avoids this ambiguity for state/constructors by permitting only single class inheritance. However, Java allows multiple inheritance of TYPE and BEHAVIOR through interfaces. In Java 8+, if two interfaces provide conflicting default methods, the implementing class must explicitly override and resolve the conflict (e.g., InterfaceA.super.method()).',
    keyPoints: [
      'Diamond Problem ambiguity in method resolution',
      'Conflicting state (fields) initialization order',
      'Solved via single class inheritance + multiple interface implementation',
      'Java 8 default methods explicit conflict resolution'
    ],
    expectedConcepts: ['Diamond Problem', 'Multiple Inheritance', 'Default Methods', 'Ambiguity Resolution'],
    relatedTopicId: 'oop_oop-interview-study-material'
  },
  {
    id: 'oop_q4',
    subject: 'OOP',
    category: 'Abstraction',
    difficulty: 'medium',
    interviewerPrompt: 'Compare Abstract Classes and Interfaces in modern Java/C++. When should you choose one over the other?',
    idealAnswer: '1. State & Fields: Abstract classes can have instance variables and state; Interfaces can only hold public static final constants.\n2. Constructors: Abstract classes have constructors called during subclass instantiation; Interfaces cannot have constructors.\n3. Multiple Inheritance: A class can extend only ONE abstract class, but can implement MULTIPLE interfaces.\n4. Design Guideline: Use an Abstract Class when modeling a tight IS-A relationship sharing code and non-static state (e.g., AbstractVehicle -> Car, Truck). Use an Interface when defining a capability or behavioral contract across unrelated hierarchies (e.g., Comparable, Serializable, PaymentProcessor).',
    keyPoints: [
      'Abstract class: IS-A relationship, instance state, constructors',
      'Interface: CAN-DO / capability contract, multiple implementation',
      'Default and static methods in Java 8+ interfaces',
      'Private interface methods in Java 9+'
    ],
    expectedConcepts: ['Contract', 'IS-A vs CAN-DO', 'Instance State', 'Interface Segregation'],
    relatedTopicId: 'oop_oop-interview-study-material'
  },
  {
    id: 'oop_q5',
    subject: 'OOP',
    category: 'SOLID Principles',
    difficulty: 'hard',
    interviewerPrompt: 'Explain each of the SOLID principles with a concise practical violation and solution.',
    idealAnswer: '• S - Single Responsibility: A class should have only one reason to change. Violation: An Invoice class generating invoices AND sending email alerts. Fix: Split into Invoice and InvoiceEmailService.\n• O - Open/Closed: Open for extension, closed for modification. Violation: Using if-else chains on type to calculate discount. Fix: Strategy pattern with DiscountStrategy interface.\n• L - Liskov Substitution: Subtypes must be substitutable for base types without breaking correctness. Violation: Square extending Rectangle where setWidth() mutates height. Fix: Separate Shape hierarchy.\n• I - Interface Segregation: Clients should not depend on methods they do not use. Violation: A Worker interface with work() and eat() forced on RobotWorker. Fix: Separate Workable and Eatable.\n• D - Dependency Inversion: High-level modules should depend on abstractions, not concretions. Fix: Inject IPaymentGateway into OrderService rather than instantiating PayPalService directly.',
    keyPoints: [
      'Single reason to change (SRP)',
      'Polymorphic extension over code mutation (OCP)',
      'Behavioral subtyping preservation (LSP)',
      'Lean, cohesive interfaces (ISP)',
      'Inversion of Control and Dependency Injection (DIP)'
    ],
    expectedConcepts: ['Single Responsibility', 'Open-Closed', 'Liskov Substitution', 'Interface Segregation', 'Dependency Inversion'],
    relatedTopicId: 'oop_oop-interview-study-material'
  },
  {
    id: 'oop_q6',
    subject: 'OOP',
    category: 'Design Patterns',
    difficulty: 'medium',
    interviewerPrompt: 'How do you implement a thread-safe Singleton pattern in Java, and why is double-checked locking required?',
    idealAnswer: 'The Double-Checked Locking (DCL) singleton minimizes synchronization overhead. It checks whether the instance is null before acquiring a synchronized lock, and checks again inside the lock before instantiating.\n\nCrucially, the instance variable MUST be marked "volatile". Without volatile, JVM instruction reordering can allow thread B to see a non-null reference before the object constructor has finished executing in thread A, resulting in a partially initialized object.\n\nAlternative best practice: Bill Pugh Initialization-on-demand holder idiom or Enum Singleton.',
    keyPoints: [
      'Private constructor to prevent external instantiation',
      'Double null check prevents synchronization on every read',
      'volatile keyword prevents CPU instruction reordering',
      'Enum singleton provides serialization & reflection immunity'
    ],
    expectedConcepts: ['Double-Checked Locking', 'Volatile Keyword', 'Instruction Reordering', 'Bill Pugh Holder'],
    relatedTopicId: 'oop_oop-interview-study-material'
  },
  {
    id: 'oop_q7',
    subject: 'OOP',
    category: 'Relationships',
    difficulty: 'medium',
    interviewerPrompt: 'What is the distinction between Association, Aggregation, and Composition in OOP?',
    idealAnswer: '• Association: A generic relationship where objects use each other (HAS-A or USES). E.g., Teacher and Student.\n• Aggregation: A weak HAS-A relationship where child objects can exist independently of the parent. E.g., Department and Teacher. If Department closes, Teachers still exist.\n• Composition: A strong HAS-A relationship with shared lifecycle ownership. The child object cannot exist without the parent. E.g., House and Room, or Order and OrderLineItem. If the Order is deleted, its LineItems are destroyed with it.',
    keyPoints: [
      'Association: Generic connection',
      'Aggregation: Weak HAS-A, independent lifetimes',
      'Composition: Strong HAS-A, cascading lifecycle destruction',
      'Prefer composition over class inheritance for flexibility'
    ],
    expectedConcepts: ['Aggregation', 'Composition', 'Lifecycle Ownership', 'HAS-A relationship'],
    relatedTopicId: 'oop_oop-interview-study-material'
  },
  {
    id: 'oop_q8',
    subject: 'OOP',
    category: 'Keywords & Modifiers',
    difficulty: 'hard',
    interviewerPrompt: 'Can static methods access non-static variables or call "super"? Why or why not?',
    idealAnswer: 'No. Static methods belong to the class template loaded into the JVM Method Area / Metaspace, not to any individual heap object instance. Instance variables and the "super" / "this" references require an active object context (an allocated "this" pointer). When a static method executes, no specific instance is implied, so referencing instance members or calling "super" results in a compile-time error.',
    keyPoints: [
      'Static belongs to Class / Metaspace',
      'Instance members require "this" reference in Heap',
      'super references the parent object instance',
      'Static method hiding vs dynamic dispatch'
    ],
    expectedConcepts: ['Metaspace', 'Heap Allocation', 'this pointer', 'Method Hiding'],
    relatedTopicId: 'oop_oop-interview-study-material'
  },

  // ==================== 2. DSA ====================
  {
    id: 'dsa_q1',
    subject: 'DSA',
    category: 'Arrays & Memory',
    difficulty: 'easy',
    interviewerPrompt: 'Why are Arrays faster than Linked Lists for sequential traversal and random access?',
    idealAnswer: '1. Random Access: Arrays occupy contiguous blocks in physical memory. Accessing element at index i takes O(1) via base_address + (i * element_size). Linked Lists require O(N) pointer chasing.\n2. Cache Locality (Spatial Locality): Because array elements sit side-by-side, CPU hardware prefetchers load full cache lines (typically 64 bytes) containing multiple adjacent elements into L1/L2 cache. Linked List nodes are scattered across the heap, causing frequent CPU cache misses and pointer overhead (8 bytes per node pointer on 64-bit systems).',
    keyPoints: [
      'O(1) memory address offset arithmetic',
      'Spatial cache locality and CPU cache lines',
      'Pointer overhead in Linked List nodes',
      'Cache miss penalty during pointer dereferencing'
    ],
    expectedConcepts: ['Spatial Locality', 'L1/L2 Cache', 'Contiguous Memory', 'Pointer Chasing'],
    relatedTopicId: 'dsa_arrays-and-memory'
  },
  {
    id: 'dsa_q2',
    subject: 'DSA',
    category: 'Hashing',
    difficulty: 'medium',
    interviewerPrompt: 'How does a Hash Table handle collisions, and what is the difference between Chaining and Open Addressing?',
    idealAnswer: 'Collisions occur when two distinct keys yield the same hash bucket index.\n• Separate Chaining: Each bucket stores a pointer to a linked list (or self-balancing tree like Red-Black tree in Java 8+ HashMap when bucket size exceeds 8). Deletions and high load factors (> 1.0) are handled gracefully.\n• Open Addressing: All elements reside directly within the array table. Upon collision, the algorithm probes for the next available slot using Linear Probing, Quadratic Probing, or Double Hashing. Open addressing degrades severely at load factors > 0.7 and requires tombstone markers for deletions.',
    keyPoints: [
      'Hash function uniformity and compression',
      'Separate chaining with Linked List / Red-Black Tree',
      'Open addressing with Linear Probing / Double Hashing',
      'Load factor threshold and dynamic resizing O(N)'
    ],
    expectedConcepts: ['Separate Chaining', 'Open Addressing', 'Load Factor', 'Treeification', 'Probing'],
    relatedTopicId: 'dsa_hash-tables'
  },
  {
    id: 'dsa_q3',
    subject: 'DSA',
    category: 'Trees & Search',
    difficulty: 'medium',
    interviewerPrompt: 'When would you choose a Self-Balancing Binary Search Tree (AVL / Red-Black Tree) over a Hash Map?',
    idealAnswer: 'While Hash Maps provide average O(1) lookups, Self-Balancing BSTs (AVL / Red-Black) provide guaranteed O(log N) worst-case time and crucial capabilities that Hash Maps cannot:\n1. In-order sorted traversal in O(N) time.\n2. Range queries (e.g., find all keys between 100 and 500) in O(log N + K).\n3. Floor, Ceiling, Min, and Max queries in O(log N).\n4. Resistance to Hash Flooding denial-of-service attacks caused by engineered hash collisions.',
    keyPoints: [
      'Guaranteed worst-case O(log N) vs Hash Map worst-case O(N)',
      'Ordered iteration and range scans',
      'Predecessor / Successor / Min / Max operations',
      'AVL is more rigidly balanced (faster lookups), Red-Black is faster for insertions/deletions'
    ],
    expectedConcepts: ['AVL Tree', 'Red-Black Tree', 'Range Queries', 'Hash Flooding'],
    relatedTopicId: 'dsa_trees-and-graphs'
  },
  {
    id: 'dsa_q4',
    subject: 'DSA',
    category: 'Dynamic Programming',
    difficulty: 'hard',
    interviewerPrompt: 'What are the two core criteria that indicate a problem can be solved using Dynamic Programming?',
    idealAnswer: '1. Optimal Substructure: An optimal solution to the problem contains within it optimal solutions to its subproblems. (e.g. Shortest path from A to C via B requires shortest path from A to B and B to C).\n2. Overlapping Subproblems: The recursive formulation visits the exact same subproblems repeatedly rather than generating new subproblems at every branch (unlike Divide & Conquer, which divides into disjoint subproblems).\n\nApproaches: Top-Down with Memoization (recursion + cache) or Bottom-Up Tabulation (iterative state transition table).',
    keyPoints: [
      'Optimal Substructure criterion',
      'Overlapping Subproblems vs Disjoint (Divide & Conquer)',
      'Memoization (Top-down) vs Tabulation (Bottom-up)',
      'State transition equation formulation'
    ],
    expectedConcepts: ['Optimal Substructure', 'Overlapping Subproblems', 'Memoization', 'Tabulation'],
    relatedTopicId: 'dsa_dynamic-programming'
  },
  {
    id: 'dsa_q5',
    subject: 'DSA',
    category: 'Sorting Algorithms',
    difficulty: 'medium',
    interviewerPrompt: 'Explain the difference between QuickSort and MergeSort. Why is QuickSort often preferred for arrays while MergeSort is preferred for Linked Lists?',
    idealAnswer: '• QuickSort: In-place O(1) auxiliary space, average O(N log N), worst-case O(N²) with poor pivot choice. Excellent cache locality for arrays.\n• MergeSort: Stable sort, guaranteed O(N log N) in all cases, but requires O(N) extra memory for arrays.\n\nArrays: QuickSort is preferred because it sorts in-place without memory allocation, maximizing CPU cache efficiency.\nLinked Lists: MergeSort is preferred because linked lists can be merged and split in O(1) extra space without copying elements, and MergeSort avoids the pointer access penalties of random pivot indexing.',
    keyPoints: [
      'MergeSort guaranteed O(N log N), stable, O(N) space for arrays',
      'QuickSort average O(N log N), O(1) space, cache-friendly',
      'Linked lists can merge in O(1) space with pointer swaps',
      'Dual-Pivot QuickSort in standard library runtimes'
    ],
    expectedConcepts: ['Stability', 'In-Place Sorting', 'Cache Locality', 'Divide and Conquer'],
    relatedTopicId: 'dsa_sorting-and-searching'
  },
  {
    id: 'dsa_q6',
    subject: 'DSA',
    category: 'Graph Algorithms',
    difficulty: 'medium',
    interviewerPrompt: 'How do Breadth-First Search (BFS) and Depth-First Search (DFS) differ in terms of data structures and application use-cases?',
    idealAnswer: '• BFS uses a Queue (FIFO). Explores neighbors layer-by-layer. Use cases: Finding the SHORTEST path in unweighted graphs, level-order traversal, social network degrees of separation.\n• DFS uses a Stack (LIFO) or recursion call stack. Explores as deep as possible before backtracking. Use cases: Topological sorting, cycle detection in directed graphs, maze solving, connected components, strongly connected components (Tarjan/Kosaraju).',
    keyPoints: [
      'BFS: Queue, shortest path in unweighted graph, space O(V)',
      'DFS: Stack/Recursion, topological sort, cycle detection',
      'Time complexity for both: O(V + E)',
      'Handling cycles requires a visited set'
    ],
    expectedConcepts: ['Queue vs Stack', 'Shortest Path', 'Topological Sort', 'Cycle Detection'],
    relatedTopicId: 'dsa_trees-and-graphs'
  },
  {
    id: 'dsa_q7',
    subject: 'DSA',
    category: 'Heaps & Priority Queues',
    difficulty: 'medium',
    interviewerPrompt: 'How does a Binary Heap maintain its properties during insert and delete-min operations?',
    idealAnswer: 'A Binary Heap is a Complete Binary Tree represented compactly as an array where parent at index i has children at 2i+1 and 2i+2.\n• Insert (O(log N)): Append the new element to the end of the array, then perform "Heapify-Up" (bubble up) comparing with its parent until heap invariant is satisfied.\n• Delete-Min / Extract (O(log N)): Replace the root with the last element of the array, shrink size by 1, and perform "Heapify-Down" (sift down) swapping with the smaller child until order is restored.\nBuilding a heap from raw array takes O(N) using bottom-up heap construction.',
    keyPoints: [
      'Array representation without pointer overhead',
      'Heapify-Up on insertion O(log N)',
      'Heapify-Down on extract O(log N)',
      'Build Heap is O(N), not O(N log N)'
    ],
    expectedConcepts: ['Complete Binary Tree', 'Heapify-Up', 'Heapify-Down', 'Priority Queue'],
    relatedTopicId: 'dsa_trees-and-graphs'
  },
  {
    id: 'dsa_q8',
    subject: 'DSA',
    category: 'Algorithmic Patterns',
    difficulty: 'easy',
    interviewerPrompt: 'Explain the Two-Pointer and Sliding Window techniques with examples.',
    idealAnswer: '• Two-Pointer: Uses two reference indices converging toward each other or moving in tandem across a sorted sequence. Example: Two Sum on sorted array, removing duplicates in-place, detecting cycle in linked list (Floyd\'s Tortoise and Hare). Reduces O(N²) to O(N).\n• Sliding Window: Maintains a dynamic or fixed subarray boundary [left, right] to track a window state (e.g. sum, character frequency). Example: Longest Substring Without Repeating Characters, Maximum Sum Subarray of size K. The right pointer expands the window, while the left pointer shrinks it when constraints are violated.',
    keyPoints: [
      'Reduces nested loop O(N²) to linear O(N)',
      'Converging pointers on sorted collections',
      'Fast/Slow pointers for cycle detection',
      'Expand right, contract left invariant in sliding window'
    ],
    expectedConcepts: ['Two-Pointer', 'Sliding Window', 'Floyd Cycle Finding', 'Subarray State'],
    relatedTopicId: 'dsa_arrays-and-memory'
  },

  // ==================== 3. DBMS ====================
  {
    id: 'mock_3',
    subject: 'DBMS',
    category: 'Normalization',
    difficulty: 'medium',
    interviewerPrompt: 'Can you explain the differences between 1NF, 2NF, 3NF, and BCNF, and why normalization is necessary?',
    idealAnswer: 'Database Normalization minimizes data redundancy and avoids insertion, update, and deletion anomalies:\n\n• 1NF: Every column holds atomic (indivisible) values, each record is unique, and no repeating groups exist.\n• 2NF: Must be in 1NF and all non-key attributes must be fully functionally dependent on the entire primary key (no partial dependencies).\n• 3NF: Must be in 2NF and have no transitive functional dependencies (non-prime attributes depending on other non-prime attributes).\n• BCNF (Boyce-Codd): A stricter version of 3NF where for every functional dependency X -> Y, X must be a super key.',
    keyPoints: [
      'Atomicity in 1NF (no multi-valued attributes)',
      'Elimination of Partial Dependencies in 2NF',
      'Elimination of Transitive Dependencies in 3NF',
      'Every determinant must be a Candidate Key in BCNF',
      'Prevention of insertion/deletion/update anomalies'
    ],
    expectedConcepts: ['Functional Dependency', 'Candidate Key', 'Transitive Dependency', 'Anomalies'],
    relatedTopicId: 'dbms_normalization'
  },
  {
    id: 'dbms_q2',
    subject: 'DBMS',
    category: 'Transactions & ACID',
    difficulty: 'medium',
    interviewerPrompt: 'Explain the ACID properties of database transactions and how the database engine guarantees each.',
    idealAnswer: '• Atomicity: All operations succeed or all are rolled back. Engine uses Undo Logs / Write-Ahead Logging (WAL).\n• Consistency: Database transitions only between valid states adhering to constraints (foreign keys, uniqueness).\n• Isolation: Concurrent transactions do not interfere. Engine uses concurrency control (Locking, MVCC - Multi-Version Concurrency Control) across isolation levels.\n• Durability: Once committed, updates survive system crashes. Engine uses Redo Logs / Write-Ahead Logging flushed to disk prior to buffer pool write.',
    keyPoints: [
      'Write-Ahead Logging (WAL) for Atomicity & Durability',
      'Multi-Version Concurrency Control (MVCC) for Isolation',
      'Schema constraints enforce Consistency',
      'Two-Phase Locking (2PL) protocol'
    ],
    expectedConcepts: ['ACID', 'Write-Ahead Log', 'MVCC', 'Two-Phase Locking'],
    relatedTopicId: 'dbms_transactions-and-concurrency'
  },
  {
    id: 'dbms_q3',
    subject: 'DBMS',
    category: 'Transaction Isolation',
    difficulty: 'hard',
    interviewerPrompt: 'What are the 4 standard SQL Transaction Isolation levels, and what read phenomena do they prevent?',
    idealAnswer: '1. Read Uncommitted: Transactions can read dirty (uncommitted) data. Vulnerable to Dirty Read, Non-Repeatable Read, Phantom Read.\n2. Read Committed: Only committed changes are visible. Prevents Dirty Reads; vulnerable to Non-Repeatable Reads and Phantom Reads.\n3. Repeatable Read: Re-reading identical query within same transaction produces identical values. Prevents Dirty and Non-Repeatable reads; vulnerable to Phantom Reads (MySQL InnoDB prevents phantom reads here using Next-Key Locks).\n4. Serializable: Strict serial execution order simulated via range locks or strict 2PL. Prevents all anomalies at the cost of high concurrency contention.',
    keyPoints: [
      'Dirty Read: Reading uncommitted changes',
      'Non-Repeatable Read: Row value modified between two reads',
      'Phantom Read: New rows inserted matching where predicate',
      'MVCC snapshot isolation vs Locking protocols'
    ],
    expectedConcepts: ['Isolation Levels', 'Dirty Read', 'Phantom Read', 'Repeatable Read', 'Next-Key Lock'],
    relatedTopicId: 'dbms_transactions-and-concurrency'
  },
  {
    id: 'dbms_q4',
    subject: 'DBMS',
    category: 'Indexing',
    difficulty: 'medium',
    interviewerPrompt: 'What is the structural difference between a Clustered Index and a Non-Clustered (Secondary) Index?',
    idealAnswer: '• Clustered Index: Dictates the physical storage order of table data rows on disk. The leaf nodes of the B+ Tree contain the actual data rows. A table can have only ONE clustered index (typically the Primary Key).\n• Non-Clustered Index: Maintained in a separate B+ tree structure. The leaf nodes contain the index key values along with a row locator (in InnoDB, this row locator is the Primary Key value; in heap tables, it is a physical RID/RowID). A table can have multiple non-clustered indexes.\nSecondary index lookups require a second lookup ("bookmark lookup" / "index hop") unless the index covers all requested query columns.',
    keyPoints: [
      'Clustered index leaf nodes hold actual data rows',
      'Only one clustered index per table',
      'Secondary index leaf nodes hold row locator / primary key',
      'Covering index eliminates secondary bookmark lookup'
    ],
    expectedConcepts: ['Clustered Index', 'Non-Clustered Index', 'B+ Tree Leaf Node', 'Covering Index'],
    relatedTopicId: 'dbms_indexing-and-storage'
  },
  {
    id: 'dbms_q5',
    subject: 'DBMS',
    category: 'Concurrency Control',
    difficulty: 'hard',
    interviewerPrompt: 'How does Multi-Version Concurrency Control (MVCC) eliminate read-write contention in PostgreSQL and MySQL InnoDB?',
    idealAnswer: 'Traditional locking systems use Shared (Read) and Exclusive (Write) locks where Readers block Writers and Writers block Readers. MVCC avoids this by keeping multiple versions of rows simultaneously.\n\nWhen a row is updated, the engine writes a new tuple with a transaction ID (xmin/xmax in Postgres, DB_TRX_ID/roll_ptr in InnoDB) rather than mutating in-place. Each reader sees a consistent point-in-time snapshot of the database corresponding to its transaction start time.\n\nResult: "Readers never block Writers, and Writers never block Readers." Old tuple versions are later reclaimed by vacuuming (Postgres VACUUM) or InnoDB Undo Purge threads.',
    keyPoints: [
      'Non-blocking reads during active write transactions',
      'Tuple versioning with transaction timestamps',
      'Undo log reconstruction in InnoDB',
      'Vacuuming / Purging of dead tuples'
    ],
    expectedConcepts: ['MVCC', 'Snapshot Isolation', 'Undo Log', 'Vacuuming', 'Non-blocking Reads'],
    relatedTopicId: 'dbms_transactions-and-concurrency'
  },
  {
    id: 'dbms_q6',
    subject: 'DBMS',
    category: 'Distributed Databases',
    difficulty: 'hard',
    interviewerPrompt: 'What is the CAP Theorem, and why cannot a distributed database provide Consistency, Availability, and Partition Tolerance simultaneously?',
    idealAnswer: 'The CAP theorem states that in a distributed data store experiencing a Network Partition (P), the system can guarantee either Consistency (C) or Availability (A), but never both.\n• Consistency (Linearizability): Every read receives the most recent write or an error.\n• Availability: Every non-failing node returns a non-error response, without guarantee of latest write.\n• Partition Tolerance: The system functions despite arbitrary packet drops or network splits.\n\nSince physical networks will inevitably partition (cables break, switches fail), a distributed system MUST choose between CP (rejecting writes to protect consistency) or AP (accepting writes on both partitions, risking stale reads and split-brain).',
    keyPoints: [
      'Network partitions are inevitable in real hardware',
      'CP systems: Reject writes/reads to prevent stale state (ZooKeeper, Spanner, etcd)',
      'AP systems: Return available data with eventual consistency (Cassandra, DynamoDB)',
      'PACELC theorem extends CAP for latency trade-offs'
    ],
    expectedConcepts: ['CAP Theorem', 'Linearizability', 'Eventual Consistency', 'Network Partition'],
    relatedTopicId: 'dbms_distributed-databases'
  },
  {
    id: 'dbms_q7',
    subject: 'DBMS',
    category: 'Deadlocks',
    difficulty: 'medium',
    interviewerPrompt: 'How does a relational database detect and resolve deadlocks during transaction execution?',
    idealAnswer: 'A deadlock occurs when Transaction T1 holds lock L1 and waits for L2 (held by T2), while T2 holds L2 and waits for L1. Neither can proceed.\n\nDetection:\n1. Wait-For Graph (WFG): The database engine maintains a directed graph where nodes represent transactions and edges represent lock waits. Background threads run cycle-detection algorithms (e.g. Tarjan\'s) at configured intervals.\n2. Lock Timeout: A transaction aborts if it fails to acquire a lock within a designated threshold.\n\nResolution:\nThe engine picks a "victim transaction" (typically the one with fewest changes / lowest rollback cost), rolls it back, releases its locks, and throws a Serialization Failure / Deadlock error to the application client for retry.',
    keyPoints: [
      'Wait-For Graph cycle detection',
      'Deadlock victim selection based on rollback cost',
      'Application client retry logic',
      'Prevention: Lock rows in consistent global order'
    ],
    expectedConcepts: ['Wait-For Graph', 'Victim Transaction', 'Rollback Cost', 'Deadlock Detection'],
    relatedTopicId: 'dbms_transactions-and-concurrency'
  },
  {
    id: 'dbms_q8',
    subject: 'DBMS',
    category: 'Architecture',
    difficulty: 'medium',
    interviewerPrompt: 'What is the purpose of the Database Buffer Pool and the Write-Ahead Log (WAL)?',
    idealAnswer: 'Disk I/O is orders of magnitude slower than RAM. The Buffer Pool caches frequently accessed data and index pages in memory to satisfy queries without disk seeks.\n\nWhen a transaction updates data, modifying disk data files immediately (random I/O) would destroy throughput. Instead, the update is logged sequentially to the Write-Ahead Log (WAL) on disk, and the page in the Buffer Pool is marked "dirty".\n\nWAL Principle: Log records MUST be flushed to persistent disk BEFORE the corresponding dirty page is written to data files. Upon power failure, unwritten dirty pages are reconstructed by replaying WAL redo entries.',
    keyPoints: [
      'Buffer pool caches disk pages in RAM',
      'Sequential write to WAL vs Random write to data pages',
      'Dirty page flushing and checkpointing',
      'Crash recovery via WAL Redo and Undo phases'
    ],
    expectedConcepts: ['Buffer Pool', 'Write-Ahead Log (WAL)', 'Dirty Pages', 'Checkpoints'],
    relatedTopicId: 'dbms_indexing-and-storage'
  },

  // ==================== 4. SQL ====================
  {
    id: 'mock_4',
    subject: 'SQL',
    category: 'Indexing & Performance',
    difficulty: 'hard',
    interviewerPrompt: 'How does an index improve SQL query performance, and under what circumstances can adding an index actually degrade performance?',
    idealAnswer: 'An index creates an ordered data structure (most commonly a B+ Tree) that allows the SQL query engine to perform logarithmic seeks O(log N) rather than doing a full table scan O(N) when evaluating WHERE, JOIN, and ORDER BY clauses.\n\nHowever, indexes can degrade performance when:\n1. The table undergoes frequent INSERT, UPDATE, or DELETE operations, as every index tree must be updated in sync.\n2. Low-cardinality columns (e.g., boolean or gender) are indexed, where the query planner still favors full scans.\n3. Excessive indexes consume significant disk and buffer pool memory.\n4. Small tables where index traversal overhead exceeds sequential read time.',
    keyPoints: [
      'B+ Tree structure and logarithmic binary search vs Full Table Scan',
      'Write overhead on INSERT/UPDATE/DELETE transactions',
      'Column cardinality and selectivity',
      'Buffer pool RAM consumption'
    ],
    expectedConcepts: ['B+ Tree', 'Full Table Scan', 'Cardinality', 'Write Penalty', 'Execution Plan'],
    relatedTopicId: 'sql_joins-and-queries'
  },
  {
    id: 'sql_q2',
    subject: 'SQL',
    category: 'Joins',
    difficulty: 'easy',
    interviewerPrompt: 'Explain the technical differences between INNER JOIN, LEFT JOIN, FULL OUTER JOIN, and CROSS JOIN.',
    idealAnswer: '• INNER JOIN: Returns only rows where the join predicate matches in both tables.\n• LEFT (OUTER) JOIN: Returns all rows from the left table; matching rows from the right table are populated, and unmatched columns are filled with NULLs.\n• FULL OUTER JOIN: Returns all rows from both tables, filling with NULL on either side where matches do not exist.\n• CROSS JOIN: Computes the Cartesian Product, pairing every row of the first table with every row of the second table (M * N total rows).',
    keyPoints: [
      'Inner join intersection vs Outer join null preservation',
      'Left join retains all rows of primary table',
      'Cross join produces Cartesian product (M * N)',
      'Join algorithms: Nested Loop, Hash Join, Merge Join'
    ],
    expectedConcepts: ['Cartesian Product', 'NULL Padding', 'Join Predicate', 'Hash Join'],
    relatedTopicId: 'sql_joins-and-queries'
  },
  {
    id: 'sql_q3',
    subject: 'SQL',
    category: 'Window Functions',
    difficulty: 'medium',
    interviewerPrompt: 'What is the difference between ROW_NUMBER(), RANK(), and DENSE_RANK() in SQL window functions?',
    idealAnswer: 'Given tied values (e.g. scores: 100, 90, 90, 80):\n• ROW_NUMBER(): Assigns unique sequential integers to every row regardless of ties: 1, 2, 3, 4.\n• RANK(): Assigns the same rank to ties, but leaves gaps in the numbering sequence: 1, 2, 2, 4 (skips rank 3).\n• DENSE_RANK(): Assigns the same rank to ties WITHOUT leaving any gaps: 1, 2, 2, 3.\n\nAll three require an OVER (PARTITION BY ... ORDER BY ...) clause.',
    keyPoints: [
      'ROW_NUMBER assigns strictly sequential unique numbers',
      'RANK leaves gaps after tied values',
      'DENSE_RANK produces continuous rankings without skips',
      'Used for Top-N per group queries'
    ],
    expectedConcepts: ['Window Functions', 'OVER clause', 'PARTITION BY', 'Ranking Gaps'],
    relatedTopicId: 'sql_window-functions'
  },
  {
    id: 'sql_q4',
    subject: 'SQL',
    category: 'Filtering',
    difficulty: 'easy',
    interviewerPrompt: 'Why can you not use aggregate functions inside a WHERE clause, and what is the exact execution order of SQL clauses?',
    idealAnswer: 'A WHERE clause filters individual physical table rows BEFORE grouping and aggregation occur. Because aggregate functions (SUM, COUNT, AVG) calculate over sets of grouped rows, their values do not exist yet when WHERE evaluates.\n\nHAVING was introduced to filter groups AFTER aggregation.\n\nLogical SQL Execution Order:\n1. FROM & JOINs\n2. WHERE\n3. GROUP BY\n4. HAVING\n5. SELECT\n6. DISTINCT\n7. ORDER BY\n8. LIMIT / OFFSET',
    keyPoints: [
      'WHERE executes before GROUP BY; HAVING executes after',
      'Aggregate values do not exist during WHERE filtering',
      'Column aliases created in SELECT cannot be used in WHERE',
      'Logical query execution order memorization'
    ],
    expectedConcepts: ['Execution Order', 'HAVING vs WHERE', 'Aggregation', 'Grouping'],
    relatedTopicId: 'sql_joins-and-queries'
  },
  {
    id: 'sql_q5',
    subject: 'SQL',
    category: 'Subqueries & CTEs',
    difficulty: 'medium',
    interviewerPrompt: 'What is a Common Table Expression (CTE) and what is the difference between a CTE and a Temporary Table?',
    idealAnswer: 'A CTE is defined using the WITH clause and acts as a named, temporary result set valid only within the execution scope of a single query.\n\nDifferences:\n• Scope: CTE exists only for the single query statement; Temporary Tables persist across the database connection session.\n• Storage & Indexing: Standard CTEs are transient inline queries (or virtual inline views). Temporary Tables are materialized physical tables in tempdb/pg_temp that can have indexes, statistics, and multiple queries run against them.\n• Recursion: CTEs support RECURSIVE syntax for tree/graph traversal (e.g., organizational hierarchies).',
    keyPoints: [
      'WITH syntax for readability and modularity',
      'Session-level persistence of Temporary Tables vs statement-level CTE',
      'Indexes can be added to Temporary Tables',
      'Recursive CTEs for hierarchical tree traversal'
    ],
    expectedConcepts: ['Common Table Expression (CTE)', 'WITH RECURSIVE', 'Temporary Table', 'Tempdb'],
    relatedTopicId: 'sql_window-functions'
  },
  {
    id: 'sql_q6',
    subject: 'SQL',
    category: 'Subqueries',
    difficulty: 'medium',
    interviewerPrompt: 'What is a Correlated Subquery and why can it present performance bottlenecks?',
    idealAnswer: 'In a regular subquery, the inner query executes once and passes its static result to the outer query.\n\nIn a Correlated Subquery, the inner query references columns from the outer query row. Consequently, the inner query MUST execute repeatedly for EVERY candidate row processed by the outer query, leading to an O(M * N) nested loop execution unless the query optimizer can decorrelate it into a JOIN or Window Function.',
    keyPoints: [
      'Inner query depends on outer query row context',
      'Evaluates once per outer row (O(M * N))',
      'Can often be rewritten with JOIN or Window Function for O(N log N) speed',
      'EXISTS vs IN evaluation semantics'
    ],
    expectedConcepts: ['Correlated Subquery', 'Query Decorrelation', 'Nested Loop Evaluation'],
    relatedTopicId: 'sql_joins-and-queries'
  },
  {
    id: 'sql_q7',
    subject: 'SQL',
    category: 'NULL Semantics',
    difficulty: 'medium',
    interviewerPrompt: 'How does Three-Valued Logic (3VL) work in SQL with NULL values?',
    idealAnswer: 'In SQL, NULL represents an unknown value, not zero or an empty string. Comparisons with NULL result in UNKNOWN rather than TRUE or FALSE:\n• 5 = NULL -> UNKNOWN\n• NULL = NULL -> UNKNOWN (cannot test with =; must use IS NULL)\n• NOT (UNKNOWN) -> UNKNOWN\n\nWHERE filters discard any row where the condition does not evaluate strictly to TRUE. Additionally, aggregate functions (except COUNT(*)) silently ignore NULLs, and IN (..., NULL) conditions can cause empty results when negated with NOT IN.',
    keyPoints: [
      'Three-Valued Logic: TRUE, FALSE, UNKNOWN',
      'Must use IS NULL and IS NOT NULL',
      'Aggregates (SUM, AVG) ignore NULL entries',
      'NOT IN with subquery returning NULL yields 0 rows'
    ],
    expectedConcepts: ['Three-Valued Logic', 'IS NULL', 'Unknown Truth Value', 'NOT IN Trap'],
    relatedTopicId: 'sql_joins-and-queries'
  },
  {
    id: 'sql_q8',
    subject: 'SQL',
    category: 'Optimization',
    difficulty: 'hard',
    interviewerPrompt: 'What is EXPLAIN / EXPLAIN ANALYZE, and what key metrics do you look for in an Execution Plan?',
    idealAnswer: 'EXPLAIN displays the optimizer\'s predicted query plan without executing; EXPLAIN ANALYZE actually executes the query and reports real runtime statistics.\n\nKey plan metrics:\n1. Scan Type: "Seq Scan" / "Full Table Scan" (costly on large tables) vs "Index Scan" vs "Index Only Scan" (fastest).\n2. Estimated vs Actual Rows: A large mismatch indicates stale statistics; requires ANALYZE/VACUUM.\n3. Join Type: Nested Loop (good for small datasets), Hash Join (good for large unindexed sets), or Merge Join (optimal when both inputs are pre-sorted).\n4. Buffers & Memory: "Buffers: shared hit vs read", and whether Sort operations spilled to disk.',
    keyPoints: [
      'EXPLAIN vs EXPLAIN ANALYZE (actual execution)',
      'Sequential Scan vs Index Scan vs Index Only Scan',
      'Row estimation discrepancies indicate stale optimizer stats',
      'Join algorithms and temporary disk spilling'
    ],
    expectedConcepts: ['EXPLAIN ANALYZE', 'Index Only Scan', 'Query Planner', 'Cost Estimation'],
    relatedTopicId: 'sql_joins-and-queries'
  },

  // ==================== 5. OS ====================
  {
    id: 'os_q1',
    subject: 'OS',
    category: 'Processes & Threads',
    difficulty: 'easy',
    interviewerPrompt: 'What is the fundamental technical difference between a Process and a Thread?',
    idealAnswer: '• Process: An independent program execution unit with its own private virtual memory address space (text, data, heap, stack), file descriptors, and security tokens. Inter-process communication requires IPC (pipes, sockets, shared memory). Process context switches are expensive due to MMU page table reloading and TLB cache flushes.\n• Thread: A lightweight execution unit within a process. Threads of the same process share the heap, global variables, and open files, but maintain their own private Program Counter (PC), CPU registers, and Stack. Context switching between threads of the same process is much faster.',
    keyPoints: [
      'Isolated memory address space (Process) vs Shared memory (Thread)',
      'Private stack and registers per thread',
      'TLB flush penalty during process context switch',
      'Thread crash can corrupt parent process memory'
    ],
    expectedConcepts: ['Virtual Memory', 'Address Space', 'TLB Flush', 'Context Switch', 'Shared Heap'],
    relatedTopicId: 'os_process-management'
  },
  {
    id: 'os_q2',
    subject: 'OS',
    category: 'Synchronization',
    difficulty: 'medium',
    interviewerPrompt: 'What is the difference between a Mutex and a Semaphore? Can a Mutex be unlocked by a different thread?',
    idealAnswer: '• Mutex (Mutual Exclusion): A locking mechanism with OWNING semantics. Only the specific thread that locked the mutex is permitted to unlock it. Used for exclusive critical section access.\n• Semaphore: A signaling mechanism with an integer counter (Counting Semaphore) or 0/1 (Binary Semaphore). Any thread can signal (post / release) the semaphore to wake waiting threads. Used for synchronization and resource pool limits.\n\nA Mutex cannot and must not be unlocked by a different thread; doing so breaks ownership invariants and triggers undefined behavior.',
    keyPoints: [
      'Mutex has thread ownership; Semaphore has counter signaling',
      'Binary Semaphore vs Mutex',
      'Priority Inversion problem with Mutexes',
      'Producer-Consumer pattern naturally uses Semaphores'
    ],
    expectedConcepts: ['Mutex', 'Counting Semaphore', 'Ownership Semantics', 'Critical Section'],
    relatedTopicId: 'os_concurrency-and-deadlocks'
  },
  {
    id: 'os_q3',
    subject: 'OS',
    category: 'Deadlocks',
    difficulty: 'medium',
    interviewerPrompt: 'What are the 4 Coffman Conditions necessary for a Deadlock to occur, and how do you prevent them?',
    idealAnswer: 'All 4 conditions must hold simultaneously for a deadlock to exist:\n1. Mutual Exclusion: Resources cannot be shared simultaneously.\n2. Hold and Wait: A process holding at least one resource is actively waiting to acquire others.\n3. No Preemption: Resources cannot be forcibly taken away; they must be released voluntarily.\n4. Circular Wait: A closed chain of processes P0 -> P1 -> ... -> Pn exists where each waits for resource held by the next.\n\nPrevention breaks at least one condition: Eliminate Circular Wait by imposing a strict global ordering on resource acquisition IDs.',
    keyPoints: [
      'Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait',
      'Breaking Circular Wait via resource hierarchical ordering',
      'Banker\'s Algorithm for dynamic deadlock avoidance',
      'Preemption of resources'
    ],
    expectedConcepts: ['Coffman Conditions', 'Circular Wait', 'Banker\'s Algorithm', 'Deadlock Prevention'],
    relatedTopicId: 'os_concurrency-and-deadlocks'
  },
  {
    id: 'os_q4',
    subject: 'OS',
    category: 'Memory Management',
    difficulty: 'hard',
    interviewerPrompt: 'Explain Virtual Memory, Paging, and what happens step-by-step during a Page Fault.',
    idealAnswer: 'Virtual Memory decouples a process\'s logical addresses from physical RAM, providing isolation and allowing processes larger than physical memory to execute.\n\nMemory is divided into fixed-size Pages (typically 4KB) mapped to physical Page Frames via a Page Table.\n\nPage Fault Sequence:\n1. CPU attempts to access a virtual address. MMU checks Page Table.\n2. The "Valid" bit is 0 (page is not in physical RAM).\n3. MMU raises a hardware interrupt (Page Fault Trap) to the OS kernel.\n4. OS pauses the process, checks address validity.\n5. OS finds an empty physical frame (or evicts a victim page using LRU algorithm, writing to swap if dirty).\n6. OS reads the requested page from disk (swap/binary) into the frame.\n7. OS updates Page Table with frame address, sets valid bit = 1.\n8. OS restarts the faulting instruction.',
    keyPoints: [
      'Virtual-to-Physical translation via MMU and Page Tables',
      'Page Fault interrupt trap mechanism',
      'Page eviction via LRU and dirty bit handling',
      'Translation Lookaside Buffer (TLB) caching'
    ],
    expectedConcepts: ['Virtual Memory', 'Page Fault Trap', 'MMU', 'Page Replacement (LRU)', 'Swap Space'],
    relatedTopicId: 'os_memory-and-virtual-memory'
  },
  {
    id: 'os_q5',
    subject: 'OS',
    category: 'Memory Management',
    difficulty: 'medium',
    interviewerPrompt: 'What is Thrashing in an operating system, and how does the kernel resolve it?',
    idealAnswer: 'Thrashing occurs when the system spends more time swapping pages in and out of disk than executing instructions. This happens when the cumulative working sets of all running processes exceed available physical RAM.\n\nResolution & Mitigation:\n1. Working Set Model: Allocate each process enough frames to hold its active working set (locality model).\n2. Page Fault Frequency (PFF): Track fault rate; if high, grant frames; if low, reclaim.\n3. Suspend / Swap out low-priority processes to free physical memory completely for active jobs.',
    keyPoints: [
      'High page fault rate causing continuous disk swap I/O',
      'CPU utilization drops to near zero during thrashing',
      'Working Set Model based on locality of reference',
      'Process suspension to restore memory headroom'
    ],
    expectedConcepts: ['Thrashing', 'Working Set Model', 'Page Fault Frequency', 'Locality of Reference'],
    relatedTopicId: 'os_memory-and-virtual-memory'
  },
  {
    id: 'os_q6',
    subject: 'OS',
    category: 'CPU Scheduling',
    difficulty: 'easy',
    interviewerPrompt: 'Compare Round Robin, Shortest Job First (SJF), and Multi-Level Feedback Queue (MLFQ) scheduling.',
    idealAnswer: '• Shortest Job First (SJF): Schedules the job with smallest CPU burst. Mathematically provable minimum average waiting time. Downside: Impossible to know burst times in advance; starvation for long jobs.\n• Round Robin (RR): Preemptive scheduling where every process gets a fixed time quantum (slice). Fair, responsive for interactive systems, but high quantum causes FIFO behavior while small quantum causes excessive context switch overhead.\n• Multi-Level Feedback Queue (MLFQ): Multiple queues with varying priorities and quantums. New processes start at high priority. CPU-bound jobs drop to lower queues with larger quantums; I/O-bound jobs remain at high priority. Prevents starvation via periodic priority boosts.',
    keyPoints: [
      'SJF optimal waiting time but causes starvation',
      'Round Robin time quantum selection trade-offs',
      'MLFQ dynamically separates I/O-bound vs CPU-bound',
      'Preemptive vs Non-preemptive scheduling'
    ],
    expectedConcepts: ['Round Robin', 'Shortest Job First', 'MLFQ', 'Time Quantum', 'Starvation'],
    relatedTopicId: 'os_process-management'
  },
  {
    id: 'os_q7',
    subject: 'OS',
    category: 'System Calls',
    difficulty: 'medium',
    interviewerPrompt: 'What happens during a System Call, and why is the User Mode vs Kernel Mode boundary enforced by hardware?',
    idealAnswer: 'Hardware CPU operates in privilege rings (Ring 3 = User Mode, Ring 0 = Kernel Mode).\n• User Mode: Cannot execute privileged instructions (modifying MMU, direct hardware access, disabling interrupts).\n• Kernel Mode: Full unrestricted CPU and memory access.\n\nWhen an application calls read() or fork():\n1. Parameters placed in registers.\n2. Software interrupt (e.g. syscall / int 0x80) triggers CPU privilege escalation to Ring 0.\n3. CPU switches to kernel stack and jumps to the System Call Dispatch Table entry.\n4. Kernel executes the routine, checks security boundaries, and returns to Ring 3 via sysret.',
    keyPoints: [
      'CPU rings: Ring 0 (Kernel) vs Ring 3 (User)',
      'Prevents malicious user apps from corrupting OS memory',
      'Trap instruction switches CPU mode bit',
      'System call dispatch table lookups'
    ],
    expectedConcepts: ['Ring 0 vs Ring 3', 'System Call Trap', 'Mode Switch', 'Privileged Instructions'],
    relatedTopicId: 'os_process-management'
  },
  {
    id: 'os_q8',
    subject: 'OS',
    category: 'Storage & I/O',
    difficulty: 'medium',
    interviewerPrompt: 'What is an Inode in Unix/Linux file systems, and what metadata does it store?',
    idealAnswer: 'An Inode (index node) is a data structure on disk that represents a filesystem object (file or directory). Crucially, the Inode does NOT store the filename or the actual file content.\n\nAn Inode stores:\n1. File type and permissions (rwxrwxrwx)\n2. Owner UID and Group GID\n3. File size in bytes\n4. Timestamps (atime, mtime, ctime)\n5. Hard link count\n6. Pointers to disk blocks (Direct blocks, Indirect blocks, Double indirect blocks).\n\nThe directory file is merely a table mapping human-readable filenames to Inode numbers.',
    keyPoints: [
      'Inode contains metadata and block pointers, NOT filename',
      'Directory entries link filenames to Inode numbers',
      'Hard links increment inode link count',
      'Direct, Indirect, and Extent-based block pointers'
    ],
    expectedConcepts: ['Inode', 'Hard Link', 'Block Pointers', 'Directory Entry (dentry)'],
    relatedTopicId: 'os_memory-and-virtual-memory'
  },

  // ==================== 6. NETWORKS ====================
  {
    id: 'net_q1',
    subject: 'Networks',
    category: 'Transport Layer',
    difficulty: 'medium',
    interviewerPrompt: 'Explain the TCP Three-Way Handshake and Four-Way Termination with sequence and acknowledgement numbers.',
    idealAnswer: 'Handshake (Connection Establishment):\n1. Client -> Server: SYN (seq = x)\n2. Server -> Client: SYN-ACK (seq = y, ack = x + 1)\n3. Client -> Server: ACK (seq = x + 1, ack = y + 1)\nConnection is now ESTABLISHED.\n\nTermination (Connection Tear-down):\n1. Client -> Server: FIN (seq = u)\n2. Server -> Client: ACK (ack = u + 1) -> Server enters CLOSE_WAIT; Client enters FIN_WAIT_2.\n3. Server -> Client: FIN (seq = v)\n4. Client -> Server: ACK (ack = v + 1) -> Client enters TIME_WAIT (2MSL duration to ensure duplicate packets dissipate); Server closes.',
    keyPoints: [
      'SYN, SYN-ACK, ACK sequence transitions',
      'Sequence number synchronization prevents stale packet collisions',
      'FIN, ACK, FIN, ACK asymmetric teardown',
      'TIME_WAIT 2MSL timer rationale'
    ],
    expectedConcepts: ['Three-Way Handshake', 'TIME_WAIT', 'SYN Flood', 'CLOSE_WAIT', 'Sequence Numbers'],
    relatedTopicId: 'networks_tcp-ip-and-osi'
  },
  {
    id: 'net_q2',
    subject: 'Networks',
    category: 'Transport Layer',
    difficulty: 'easy',
    interviewerPrompt: 'What are the technical differences between TCP and UDP? When is UDP strictly preferred?',
    idealAnswer: '• TCP: Connection-oriented, reliable in-order byte stream, checksum error verification, automatic retransmissions (ARQ), flow control (sliding window), congestion control (AIMD/Cubic). High header overhead (20-60 bytes).\n• UDP: Connectionless, unreliable datagram delivery, no ordering guarantees, minimal header overhead (8 bytes), no congestion throttling.\n\nUDP is preferred when LOW LATENCY and REAL-TIME delivery matter more than 100% reliability: Video conferencing (Zoom), online gaming, DNS queries, VoIP, and modern protocols like QUIC (HTTP/3) which implement reliability at user space.',
    keyPoints: [
      'Reliable byte stream (TCP) vs Unreliable datagram (UDP)',
      'Flow control & Congestion control in TCP',
      '8-byte header (UDP) vs 20-byte header (TCP)',
      'QUIC builds reliability over UDP'
    ],
    expectedConcepts: ['Flow Control', 'Congestion Control', 'Datagram', 'QUIC / HTTP/3'],
    relatedTopicId: 'networks_tcp-ip-and-osi'
  },
  {
    id: 'net_q3',
    subject: 'Networks',
    category: 'Security & TLS',
    difficulty: 'hard',
    interviewerPrompt: 'What happens during a TLS 1.3 Handshake when you connect to an HTTPS website?',
    idealAnswer: 'TLS 1.3 reduces handshake latency to 1-RTT (or 0-RTT for resumed sessions):\n1. ClientHello: Client sends supported cipher suites, random nonce, and Key Share (Diffie-Hellman public key parameters).\n2. ServerHello: Server chooses cipher suite, sends its own DH Key Share, and immediately derives the symmetric encryption keys.\n3. Encrypted Extensions & Certificate: Server sends its digital certificate and CertificateVerify signature (all encrypted).\n4. Finished: Server and Client verify message integrity. The secure symmetric session (AES-GCM or ChaCha20) begins in just 1 round trip.',
    keyPoints: [
      '1-RTT handshake (reduced from 2-RTT in TLS 1.2)',
      'Ephemeral Diffie-Hellman provides Perfect Forward Secrecy',
      'CA signature validation on certificate chain',
      'Transition to symmetric encryption for payload throughput'
    ],
    expectedConcepts: ['TLS 1.3', 'Ephemeral Diffie-Hellman', 'Perfect Forward Secrecy', 'Certificate Authority'],
    relatedTopicId: 'networks_http-and-tls'
  },
  {
    id: 'net_q4',
    subject: 'Networks',
    category: 'DNS & Application Layer',
    difficulty: 'medium',
    interviewerPrompt: 'Explain the complete step-by-step resolution flow when a user queries a domain name like "example.com".',
    idealAnswer: '1. Local Cache: Browser checks browser DNS cache -> OS hosts file / DNS cache.\n2. Recursive Resolver: Query sent to ISP / 1.1.1.1 recursive resolver.\n3. Root DNS Server: Root server responds with the TLD name server (.com).\n4. TLD Server: .com TLD server points to Authoritative Name Servers for example.com.\n5. Authoritative Name Server: Resolves "example.com" to its A record (IPv4 address e.g. 93.184.216.34) or AAAA record (IPv6).\n6. Cache & Return: Recursive resolver caches with TTL and returns IP to browser.',
    keyPoints: [
      'Browser cache -> OS cache -> Recursive Resolver',
      'Root (.) -> TLD (.com) -> Authoritative Nameserver hierarchy',
      'A record (IPv4), AAAA (IPv6), CNAME (alias), MX (mail)',
      'Time-To-Live (TTL) cache invalidation'
    ],
    expectedConcepts: ['Recursive Resolver', 'Authoritative Nameserver', 'Root DNS', 'TTL', 'A Record'],
    relatedTopicId: 'networks_http-and-tls'
  },
  {
    id: 'net_q5',
    subject: 'Networks',
    category: 'Application Layer',
    difficulty: 'medium',
    interviewerPrompt: 'How do HTTP/1.1, HTTP/2, and HTTP/3 differ in multiplexing and head-of-line blocking?',
    idealAnswer: '• HTTP/1.1: Text-based. Head-of-line (HOL) blocking at application level: each TCP connection can process only one request/response at a time (browsers open 6 TCP connections per domain to mitigate).\n• HTTP/2: Binary protocol with Multiplexing over a single TCP connection via interleaved frames and streams. Fixes HTTP HOL blocking, but suffers from TCP-level HOL blocking: a single lost TCP packet stalls ALL streams.\n• HTTP/3: Runs over QUIC (built on UDP). Streams are completely independent at transport level. A lost packet only stalls its individual stream, eliminating Head-of-Line blocking entirely.',
    keyPoints: [
      'HTTP/1.1 connection pipelining and domain sharding',
      'HTTP/2 binary framing and stream multiplexing',
      'HTTP/2 TCP head-of-line blocking limitation',
      'HTTP/3 QUIC over UDP eliminates packet-level HOL blocking'
    ],
    expectedConcepts: ['Head-of-Line (HOL) Blocking', 'Multiplexing', 'Binary Framing', 'QUIC', 'Streams'],
    relatedTopicId: 'networks_http-and-tls'
  },
  {
    id: 'net_q6',
    subject: 'Networks',
    category: 'Web Architecture',
    difficulty: 'easy',
    interviewerPrompt: 'Compare WebSockets, Server-Sent Events (SSE), and Long Polling for real-time bidirectional communication.',
    idealAnswer: '• Long Polling: Client opens HTTP request; server holds connection open until new data arrives, then responds and closes. High HTTP header overhead and latency.\n• Server-Sent Events (SSE): Unidirectional (Server -> Client) over standard HTTP. Built-in reconnection, UTF-8 text only. Ideal for stock tickers, notification feeds.\n• WebSockets: Full-duplex bidirectional persistent TCP connection established via HTTP 101 Switching Protocols upgrade. Low framing overhead (2-10 bytes). Ideal for chat applications, collaborative whiteboards, multiplayer gaming.',
    keyPoints: [
      'Full-duplex (WebSockets) vs Server-to-Client only (SSE)',
      'HTTP Upgrade header 101 Switching Protocols',
      'SSE works over standard HTTP/2 naturally',
      'Framing overhead comparison'
    ],
    expectedConcepts: ['WebSockets', 'Server-Sent Events (SSE)', 'Full-Duplex', 'HTTP Upgrade 101'],
    relatedTopicId: 'networks_http-and-tls'
  },
  {
    id: 'net_q7',
    subject: 'Networks',
    category: 'Security',
    difficulty: 'medium',
    interviewerPrompt: 'What is CORS (Cross-Origin Resource Sharing) and what triggers a CORS Preflight OPTIONS request?',
    idealAnswer: 'CORS is a browser security mechanism enforcing the Same-Origin Policy (SOP). It prevents malicious scripts on one origin from accessing sensitive data on another origin unless the server explicitly grants permission via response headers.\n\nPreflight Request (OPTIONS):\nThe browser automatically sends an HTTP OPTIONS preflight request before executing requests that are not "Simple Requests". Triggered when:\n1. HTTP method is PUT, DELETE, PATCH.\n2. Custom request headers are sent (e.g., Authorization, Content-Type: application/json).\nServer must respond with Access-Control-Allow-Origin, Access-Control-Allow-Methods, and Access-Control-Allow-Headers.',
    keyPoints: [
      'Same-Origin Policy (Scheme, Host, Port must match)',
      'Preflight OPTIONS request triggers',
      'Access-Control-Allow-Origin headers',
      'CORS is a browser enforcement, not a server firewall'
    ],
    expectedConcepts: ['Same-Origin Policy', 'Preflight OPTIONS', 'Access-Control-Allow-Origin', 'Simple Requests'],
    relatedTopicId: 'networks_http-and-tls'
  },
  {
    id: 'net_q8',
    subject: 'Networks',
    category: 'Network Layer',
    difficulty: 'medium',
    interviewerPrompt: 'What is CIDR notation and how does Subnet Masking divide network and host addresses?',
    idealAnswer: 'Classless Inter-Domain Routing (CIDR) replaces rigid legacy classes (A, B, C) with variable-length prefix routing (e.g. 192.168.1.0/24).\n\nThe "/24" indicates that the first 24 bits of the 32-bit IPv4 address identify the Network Prefix, leaving 32 - 24 = 8 bits for Host addresses (2^8 = 256 total IP addresses, minus 2 for Network Address (.0) and Broadcast Address (.255), giving 254 usable hosts).\n\nA bitwise AND between an IP address and its Subnet Mask (255.255.255.0) isolates the Network ID for routers.',
    keyPoints: [
      'Prefix length indicates network bits',
      'Usable hosts formula: 2^(32 - prefix) - 2',
      'Bitwise AND with subnet mask reveals network ID',
      'Private IP ranges (RFC 1918): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16'
    ],
    expectedConcepts: ['CIDR Notation', 'Subnet Mask', 'Network ID vs Host ID', 'Broadcast Address'],
    relatedTopicId: 'networks_tcp-ip-and-osi'
  },

  // ==================== 7. WEBDEV ====================
  {
    id: 'web_q1',
    subject: 'WebDev',
    category: 'REST Architecture',
    difficulty: 'medium',
    interviewerPrompt: 'What are the 6 architectural constraints of REST, and what makes an API truly RESTful?',
    idealAnswer: '1. Client-Server Architecture: Separation of UI concerns from data storage.\n2. Statelessness: Each request from client must contain all context needed; no session stored on server.\n3. Cacheability: Responses must implicitly or explicitly declare themselves cacheable or non-cacheable.\n4. Layered System: Client cannot tell whether it is connected directly to end server or an intermediate proxy/load balancer.\n5. Uniform Interface: Identification of resources (URIs), manipulation through representations (JSON), self-descriptive messages, and HATEOAS (Hypermedia as the Engine of Application State).\n6. Code on Demand (Optional): Server can temporarily extend client functionality by transferring executable scripts.',
    keyPoints: [
      'Statelessness ensures horizontal scalability',
      'Uniform Interface and idempotent HTTP methods',
      'HATEOAS hypermedia links in responses',
      'Idempotent methods: GET, PUT, DELETE, HEAD, OPTIONS'
    ],
    expectedConcepts: ['Statelessness', 'Uniform Interface', 'HATEOAS', 'Idempotency', 'Cache-Control'],
    relatedTopicId: 'webdev_rest-and-graphql'
  },
  {
    id: 'web_q2',
    subject: 'WebDev',
    category: 'API Design',
    difficulty: 'easy',
    interviewerPrompt: 'Compare REST APIs and GraphQL. What are Over-fetching and Under-fetching?',
    idealAnswer: '• REST: Multiple endpoints organized around resources (e.g. /users/1, /users/1/orders). Standard HTTP caching (ETag, Cache-Control).\n- Over-fetching: Receiving more data fields than the client needs (e.g. requesting /users/1 returns 40 fields when only user.name is required).\n- Under-fetching: An endpoint returns insufficient data, requiring N+1 sequential roundtrips to fetch related resources.\n• GraphQL: Single endpoint (/graphql). Client sends a declarative query specifying exact requested fields and nested relations in a single roundtrip. Downside: Complex caching, query parsing overhead, vulnerability to recursive denial-of-service queries.',
    keyPoints: [
      'Over-fetching wastes client bandwidth and CPU',
      'Under-fetching causes N+1 network request waterfalls',
      'Single endpoint POST /graphql vs REST resource URIs',
      'HTTP caching is trivial in REST, non-trivial in GraphQL'
    ],
    expectedConcepts: ['Over-fetching', 'Under-fetching', 'Schema Definition Language (SDL)', 'N+1 Query Problem'],
    relatedTopicId: 'webdev_rest-and-graphql'
  },
  {
    id: 'web_q3',
    subject: 'WebDev',
    category: 'JavaScript Runtime',
    difficulty: 'hard',
    interviewerPrompt: 'Explain the JavaScript Event Loop, Call Stack, Microtask Queue, and Macrotask Queue execution order.',
    idealAnswer: 'JavaScript is single-threaded with an event-driven runtime:\n1. Call Stack: Synchronous code executes first.\n2. Microtask Queue: Promise callbacks (.then, .catch, .finally), async/await continuations, MutationObserver, queueMicrotask().\n3. Macrotask (Task) Queue: setTimeout, setInterval, setImmediate, I/O callbacks, UI rendering.\n\nExecution Order:\nAfter the Call Stack clears, the Event Loop executes ALL pending microtasks until the Microtask Queue is completely empty before picking ONE task from the Macrotask Queue. Render updates happen between task cycles if needed.',
    keyPoints: [
      'Synchronous code runs first',
      'Microtask queue drained completely before next macrotask',
      'Promises are microtasks; setTimeout is a macrotask',
      'Starvation of rendering if microtasks recursively enqueue'
    ],
    expectedConcepts: ['Event Loop', 'Call Stack', 'Microtask Queue', 'Macrotask Queue', 'Promise Resolution'],
    relatedTopicId: 'webdev_frontend-architecture'
  },
  {
    id: 'web_q4',
    subject: 'WebDev',
    category: 'Authentication',
    difficulty: 'medium',
    interviewerPrompt: 'Compare JWT (JSON Web Tokens) and Server-Side Session Cookies for web authentication.',
    idealAnswer: '• Session Cookies: Server creates session record in database/Redis and sets an HttpOnly encrypted cookie with session ID. Pros: Immediate server-side revocation on logout/compromise. Cons: Requires stateful session lookup on every request; cross-region scaling overhead.\n• JWT: Stateless token signed cryptographically (HMAC SHA256 / RSA) containing payload claims. Server verifies signature without DB lookup. Pros: Fast, horizontally scalable across microservices. Cons: Cannot easily revoke before expiration unless maintaining a distributed blocklist; larger payload sent on every request.',
    keyPoints: [
      'Stateful session store (Redis) vs Stateless signature verification',
      'Instant revocation capability with sessions',
      'JWT revocation challenge (short TTL + refresh token rotation)',
      'Security: Store in HttpOnly Secure SameSite cookies, not LocalStorage'
    ],
    expectedConcepts: ['JSON Web Token (JWT)', 'Session ID', 'HttpOnly Cookie', 'Token Revocation', 'Refresh Token'],
    relatedTopicId: 'webdev_web-security'
  },
  {
    id: 'web_q5',
    subject: 'WebDev',
    category: 'Web Security',
    difficulty: 'hard',
    interviewerPrompt: 'What are Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF), and how do you protect against each?',
    idealAnswer: '• XSS (Cross-Site Scripting): Attacker injects malicious JavaScript into a trusted website (Stored, Reflected, or DOM-based).\n- Mitigation: Context-aware HTML escaping, Content Security Policy (CSP) headers, avoiding dangerouslySetInnerHTML/eval, storing sensitive tokens in HttpOnly cookies so JavaScript cannot read document.cookie.\n• CSRF (Cross-Site Request Forgery): Malicious website tricks authenticated user\'s browser into executing an unauthorized action on a target site where user has active session cookies.\n- Mitigation: SameSite cookie attribute (Strict/Lax), Anti-CSRF Synchronizer Tokens in headers/forms, verifying Origin and Referer headers.',
    keyPoints: [
      'XSS executes untrusted JS in victim browser',
      'CSRF exploits automatic browser cookie transmission',
      'Content Security Policy (CSP) defends against XSS',
      'SameSite cookies and Anti-CSRF tokens defend against CSRF'
    ],
    expectedConcepts: ['XSS', 'CSRF', 'Content Security Policy (CSP)', 'SameSite Cookie', 'HttpOnly'],
    relatedTopicId: 'webdev_web-security'
  },
  {
    id: 'web_q6',
    subject: 'WebDev',
    category: 'Performance',
    difficulty: 'medium',
    interviewerPrompt: 'Explain the Critical Rendering Path and the difference between DOMContentLoaded and the window.onload event.',
    idealAnswer: 'Critical Rendering Path:\n1. Parse HTML -> DOM Tree\n2. Parse CSS -> CSSOM Tree\n3. Combine DOM + CSSOM -> Render Tree\n4. Layout (Reflow): Calculate exact positions and geometry.\n5. Paint: Rasterize pixels to screen.\n6. Composite: GPU layer blending.\n\nEvents:\n• DOMContentLoaded: Fires when HTML document is fully parsed and DOM tree is built (scripts have executed). Stylesheets, images, and iframes may still be loading.\n• window.onload: Fires only when the entire page including all images, stylesheets, fonts, and sub-resources has finished downloading.',
    keyPoints: [
      'DOM + CSSOM = Render Tree',
      'Layout (Reflow) calculates dimensions; Paint rasterizes pixels',
      'CSS is render-blocking; JS is parser-blocking by default',
      'async vs defer attributes on script tags'
    ],
    expectedConcepts: ['Critical Rendering Path', 'DOM vs CSSOM', 'Reflow and Repaint', 'DOMContentLoaded'],
    relatedTopicId: 'webdev_frontend-architecture'
  },
  {
    id: 'web_q7',
    subject: 'WebDev',
    category: 'HTTP Caching',
    difficulty: 'medium',
    interviewerPrompt: 'How do Cache-Control headers, ETag, and Last-Modified enable HTTP caching?',
    idealAnswer: '• Freshness (Cache-Control):\n- max-age=N: Resource valid for N seconds without revalidation.\n- no-cache: Must validate with origin server before using cached copy.\n- no-store: Disallows all caching (used for sensitive financial/PII data).\n• Conditional Revalidation:\n- ETag: Cryptographic hash of content sent by server. Client subsequent requests send "If-None-Match: <hash>". Server responds with 304 Not Modified if unchanged, skipping body transfer.\n- Last-Modified: Timestamp validated via "If-Modified-Since". Less precise than ETag (1-second granularity).',
    keyPoints: [
      'Freshness checking (max-age) vs Validation (ETag)',
      '304 Not Modified status code saves bandwidth',
      'no-cache vs no-store semantic differences',
      'Immutable flag for static hashed asset bundles'
    ],
    expectedConcepts: ['Cache-Control', 'ETag', '304 Not Modified', 'Conditional Requests', 'Revalidation'],
    relatedTopicId: 'webdev_frontend-architecture'
  },
  {
    id: 'web_q8',
    subject: 'WebDev',
    category: 'Frontend Architecture',
    difficulty: 'medium',
    interviewerPrompt: 'What is the Virtual DOM in React and how does the Reconciliation diffing algorithm operate in O(N) time?',
    idealAnswer: 'The Virtual DOM is an in-memory lightweight JavaScript object tree mirroring the actual browser DOM. Direct browser DOM manipulations are expensive due to layout recalculations and repaints.\n\nGeneric tree diffing takes O(N³). React achieves O(N) heuristic diffing using two assumptions:\n1. Two elements of different types (e.g. <div> to <span>) tear down the old tree and build a completely new one.\n2. Elements in lists are matched across renders using stable "key" props. Keys allow React to detect moves, insertions, and deletions without re-rendering entire lists.',
    keyPoints: [
      'In-memory JS object representation of DOM',
      'O(N) heuristic diffing instead of O(N³)',
      'Element type change triggers unmount and remount',
      'Keys maintain element identity across renders'
    ],
    expectedConcepts: ['Virtual DOM', 'Reconciliation', 'Diffing Algorithm', 'Stable Keys'],
    relatedTopicId: 'webdev_frontend-architecture'
  },

  // ==================== 8. LINUX ====================
  {
    id: 'linux_q1',
    subject: 'Linux',
    category: 'Process Management',
    difficulty: 'medium',
    interviewerPrompt: 'What is the technical difference between SIGTERM (15) and SIGKILL (9) signals in Linux?',
    idealAnswer: '• SIGTERM (Signal 15): The standard termination request signal. It CAN be caught, handled, or ignored by the target process. It gives the application opportunity to execute graceful shutdown logic (closing DB connections, completing ongoing requests, flushing disk buffers, removing temp files).\n• SIGKILL (Signal 9): The immediate kill signal. It is handled directly by the Linux Kernel and CANNOT be caught, blocked, or ignored by the process. The kernel immediately destroys the process table entry and reclaims memory, risking file corruption or orphaned transactions.',
    keyPoints: [
      'SIGTERM allows graceful shutdown hooks and cleanup',
      'SIGKILL cannot be trapped or ignored; kernel destroys process immediately',
      'Best practice: Send SIGTERM, wait grace period (e.g. 30s), then send SIGKILL',
      'Signals list: SIGINT (2), SIGHUP (1), SIGSEGV (11)'
    ],
    expectedConcepts: ['SIGTERM', 'SIGKILL', 'Graceful Shutdown', 'Kernel Signal Handling'],
    relatedTopicId: 'linux_process-and-system-monitoring'
  },
  {
    id: 'linux_q2',
    subject: 'Linux',
    category: 'File Permissions',
    difficulty: 'easy',
    interviewerPrompt: 'Explain how the octal permission notation (e.g. chmod 755 or 644) maps to binary bits and user roles.',
    idealAnswer: 'Permissions are represented across 3 roles: Owner (User), Group, and Others.\nEach role has 3 permission bits: Read (r=4, binary 100), Write (w=2, binary 010), Execute (x=1, binary 001).\nSumming the values produces the octal digit:\n• 7 = 4 + 2 + 1 (rwx)\n• 6 = 4 + 2 (rw-)\n• 5 = 4 + 1 (r-x)\n• 4 = 4 (r--)\n\nExample 755:\n- Owner: 7 (Read, Write, Execute)\n- Group: 5 (Read, Execute)\n- Others: 5 (Read, Execute)\n\nFor directories, "Execute" permission is required to cd into the directory or list files.',
    keyPoints: [
      'Read = 4, Write = 2, Execute = 1',
      'Triplets: Owner, Group, Others',
      'Directory execute bit controls traversal (cd)',
      'Special permissions: SUID (4000), SGID (2000), Sticky Bit (1000)'
    ],
    expectedConcepts: ['Octal Notation', 'chmod / chown', 'rwx Bitmask', 'Sticky Bit'],
    relatedTopicId: 'linux_permissions-and-file-management'
  },
  {
    id: 'linux_q3',
    subject: 'Linux',
    category: 'System Diagnostics',
    difficulty: 'medium',
    interviewerPrompt: 'How do you interpret the three "Load Average" numbers displayed in top/uptime, and when is a system overloaded?',
    idealAnswer: 'The three numbers represent the exponential moving average of system load over 1, 5, and 15 minutes.\nLoad Average counts the number of processes currently executing on CPU + runnable processes waiting in the CPU run queue + processes in Uninterruptible Sleep (D state, typically waiting on disk I/O).\n\nEvaluation:\nDivide the load average by the number of CPU cores (lscpu / nproc):\n• Load < 1.0 per core: System has spare capacity.\n• Load = 1.0 per core: 100% capacity utilization.\n• Load > 1.0 per core: Processes are queueing up, indicating saturation.\nIf CPU utilization is low but Load Average is high, the bottleneck is disk I/O wait (iowait).',
    keyPoints: [
      '1, 5, and 15-minute averages',
      'Includes active CPU tasks + D-state I/O wait tasks',
      'Must normalize against CPU core count (nproc)',
      'Distinguishing CPU-bound vs I/O-bound load'
    ],
    expectedConcepts: ['Load Average', 'Uninterruptible Sleep (D state)', 'Run Queue', 'iowait'],
    relatedTopicId: 'linux_process-and-system-monitoring'
  },
  {
    id: 'linux_q4',
    subject: 'Linux',
    category: 'Filesystems',
    difficulty: 'medium',
    interviewerPrompt: 'What is the technical difference between a Hard Link and a Soft (Symbolic) Link in Linux?',
    idealAnswer: '• Hard Link: An additional directory entry pointing directly to the EXISTING Inode on disk. Has the exact same Inode number and file permissions. If the original filename is deleted, the data remains accessible through the hard link until the inode link count drops to zero. Limitations: Cannot cross filesystem partitions; cannot link directories.\n• Soft Link (Symlink): A distinct file with its own unique Inode whose content is the text path string of the target file. If the target file is moved or deleted, the symlink breaks ("dangling symlink"). Can span across different filesystems and link directories.',
    keyPoints: [
      'Hard link shares same Inode; Symlink creates new Inode holding path string',
      'Inode link count must reach 0 before disk blocks are freed',
      'Hard links cannot span filesystems; Symlinks can',
      'ln target link (Hard) vs ln -s target link (Soft)'
    ],
    expectedConcepts: ['Hard Link', 'Symbolic Link (Symlink)', 'Inode Link Count', 'Dangling Symlink'],
    relatedTopicId: 'linux_permissions-and-file-management'
  },
  {
    id: 'linux_q5',
    subject: 'Linux',
    category: 'Text Processing',
    difficulty: 'easy',
    interviewerPrompt: 'Explain how Pipes (|) and Redirection (>, >>, 2>) function in Linux command execution.',
    idealAnswer: 'Every Linux process opens three standard file descriptors: 0 (stdin), 1 (stdout), 2 (stderr).\n• Pipe (|): Connects the stdout (fd 1) of the left process directly into the stdin (fd 0) of the right process via an in-memory kernel buffer without writing to disk.\n• Output Redirection (>): Redirects stdout to a file, overwriting existing contents.\n• Append Redirection (>>): Appends stdout to the end of a file.\n• Error Redirection (2>): Redirects stderr to a file.\n• 2>&1: Merges stderr into stdout.',
    keyPoints: [
      'File descriptors: 0 (stdin), 1 (stdout), 2 (stderr)',
      'Pipe streams data between processes in memory',
      '> overwrites vs >> appends',
      '2>&1 redirects standard error into standard output'
    ],
    expectedConcepts: ['Pipes', 'Standard I/O Streams', 'File Descriptors', 'Stream Redirection'],
    relatedTopicId: 'linux_shell-scripting-and-automation'
  },
  {
    id: 'linux_q6',
    subject: 'Linux',
    category: 'Networking Tools',
    difficulty: 'medium',
    interviewerPrompt: 'Which commands do you use to inspect listening network ports, active sockets, and established connections?',
    idealAnswer: '• ss -tulpn: The modern, fast replacement for netstat. Displays TCP (-t), UDP (-u), Listening (-l), Numeric ports (-n), with Process name & PID (-p).\n• netstat -tulnp: Traditional socket inspection tool.\n• lsof -i :8080: Shows the exact process and PID holding open port 8080.\n• ip a / ip route: Inspects network interface IP assignments and routing tables.\n• curl -Iv / nc -zv <host> <port>: Tests TCP port reachability and handshake latency.',
    keyPoints: [
      'ss command uses kernel netlink socket (faster than /proc netstat)',
      'Flag breakdown: -t (TCP), -u (UDP), -l (Listening), -p (Process), -n (Numeric)',
      'lsof -i checks socket binding by port number',
      'nc (netcat) tests raw port connectivity'
    ],
    expectedConcepts: ['ss tool', 'netstat', 'lsof -i', 'Socket Inspection'],
    relatedTopicId: 'linux_process-and-system-monitoring'
  },
  {
    id: 'linux_q7',
    subject: 'Linux',
    category: 'Init & System Services',
    difficulty: 'medium',
    interviewerPrompt: 'What is Systemd and how do systemctl and journalctl manage background daemon services?',
    idealAnswer: 'Systemd is the modern Linux init system (PID 1) responsible for bootstrapping user space and supervising services in parallel using Unit files (.service).\n• systemctl start/stop/restart/status <service>: Controls service runtime state.\n• systemctl enable/disable <service>: Creates/removes symlinks in /etc/systemd/system/multi-user.target.wants to toggle boot startup.\n• journalctl -u <service> -f: Streams live structured logs directly from systemd-journald.\n• journalctl -u <service> --since "1 hour ago": Filters logs by time.',
    keyPoints: [
      'Systemd PID 1 process supervision',
      'Unit file configuration ([Unit], [Service], [Install])',
      'enable creates symlinks for automatic boot startup',
      'journalctl structured binary logging'
    ],
    expectedConcepts: ['Systemd', 'PID 1', 'systemctl', 'journalctl', 'Unit Files'],
    relatedTopicId: 'linux_shell-scripting-and-automation'
  },
  {
    id: 'linux_q8',
    subject: 'Linux',
    category: 'Memory & OOM Killer',
    difficulty: 'hard',
    interviewerPrompt: 'What is the Linux Out-Of-Memory (OOM) Killer and how does it determine which process to terminate?',
    idealAnswer: 'The Linux kernel overcommits virtual memory under the assumption that processes do not consume all allocated space immediately. When physical RAM and swap are exhausted, the kernel invokes the OOM Killer to avoid system kernel panic.\n\nScoring Algorithm:\nThe kernel computes an oom_score (0 to 1000) for every process based on:\n1. Total physical RAM (RSS) consumed.\n2. Root-owned vs user-owned processes.\n3. oom_score_adj adjustment parameter (-1000 to +1000).\n\nThe process with the highest score is sent SIGKILL (9). Critical services (e.g. database engines) can set oom_score_adj to -1000 to become immune.',
    keyPoints: [
      'Memory overcommit triggers OOM killer during physical exhaustion',
      'Calculates oom_score based on RSS memory footprint',
      'oom_score_adj allows protecting critical processes (-1000)',
      'dmesg | grep -i oom displays termination event logs'
    ],
    expectedConcepts: ['OOM Killer', 'oom_score', 'oom_score_adj', 'Memory Overcommit'],
    relatedTopicId: 'linux_process-and-system-monitoring'
  },

  // ==================== 9. AWS ====================
  {
    id: 'aws_q1',
    subject: 'AWS',
    category: 'Compute',
    difficulty: 'easy',
    interviewerPrompt: 'Compare Amazon EC2 and AWS Lambda in terms of architecture, cost structure, and ideal use cases.',
    idealAnswer: '• Amazon EC2: Infrastructure as a Service (IaaS). Full OS virtual machine with persistent memory, configurable networking, persistent disk (EBS). Billed per second while running regardless of utilization. Ideal for long-running batch jobs, legacy applications, stateful WebSockets, high-throughput microservices.\n• AWS Lambda: Serverless Function as a Service (FaaS). Event-driven code execution with ephemeral environment. Automatically scales from 0 to thousands of concurrent executions. Billed strictly per millisecond of compute time and memory allocated. Subject to cold starts and 15-minute execution limit. Ideal for asynchronous background processing, API gateways, webhooks, S3 event triggers.',
    keyPoints: [
      'IaaS VM (EC2) vs Serverless event-driven (Lambda)',
      'Always-on billing vs per-millisecond execution billing',
      'Cold start latency in Lambda',
      '15-minute maximum execution timeout in Lambda'
    ],
    expectedConcepts: ['EC2', 'Lambda', 'Serverless', 'Cold Start', 'Event-Driven Architecture'],
    relatedTopicId: 'aws_core-compute-and-storage'
  },
  {
    id: 'aws_q2',
    subject: 'AWS',
    category: 'Storage',
    difficulty: 'medium',
    interviewerPrompt: 'Explain the Amazon S3 storage classes and how S3 Lifecycle Policies optimize storage costs.',
    idealAnswer: '• S3 Standard: High durability (99.999999999% - 11 9s), low latency access for frequently accessed data.\n• S3 Intelligent-Tiering: Automatically moves objects between frequent and infrequent tiers based on access patterns without retrieval fees.\n• S3 Standard-IA: Lower storage cost for long-lived, infrequently accessed data; incurs retrieval fees per GB.\n• S3 Glacier Flexible Recovery: Archive storage with retrieval times from minutes to hours.\n• S3 Glacier Deep Archive: Lowest cost storage in AWS (approx $0.00099/GB/month) with 12-48 hour retrieval.\n\nS3 Lifecycle Policies define automated rules to transition objects down tiers (e.g., Standard -> IA after 30 days -> Glacier after 90 days -> Expire/Delete after 365 days).',
    keyPoints: [
      '11 9s durability across multiple Availability Zones',
      'Storage cost vs Retrieval fee trade-offs',
      'Intelligent-Tiering eliminates manual analysis',
      'Lifecycle transition and expiration rules'
    ],
    expectedConcepts: ['S3 Standard', 'S3 Glacier', 'Lifecycle Rules', 'Intelligent-Tiering', 'Durability vs Availability'],
    relatedTopicId: 'aws_core-compute-and-storage'
  },
  {
    id: 'aws_q3',
    subject: 'AWS',
    category: 'Identity & Access Management (IAM)',
    difficulty: 'medium',
    interviewerPrompt: 'What is the difference between an IAM Role, IAM User, and IAM Policy? Why should EC2 instances use IAM Roles?',
    idealAnswer: '• IAM User: An identity with permanent long-term credentials (password, access key ID + secret access key) for human or legacy application use.\n• IAM Policy: A JSON document explicitly declaring Allow or Deny permissions on AWS resources (Effect, Action, Resource, Condition).\n• IAM Role: An identity with NO permanent credentials that can be assumed by trusted entities (EC2 instances, Lambda, cross-account users) to obtain temporary, automatically rotated STS security tokens.\n\nEC2 instances must use IAM Roles via an Instance Profile. This eliminates storing hardcoded credentials on disk or in source code, preventing credential leakage.',
    keyPoints: [
      'Permanent credentials (User) vs Ephemeral STS tokens (Role)',
      'JSON Policy grammar: Effect, Action, Resource, Condition',
      'EC2 Instance Profiles automatically rotate short-lived credentials',
      'Principle of Least Privilege'
    ],
    expectedConcepts: ['IAM Role', 'IAM Policy', 'Security Token Service (STS)', 'Instance Profile'],
    relatedTopicId: 'aws_iam-and-security'
  },
  {
    id: 'aws_q4',
    subject: 'AWS',
    category: 'Networking & VPC',
    difficulty: 'hard',
    interviewerPrompt: 'What components are required to configure a secure VPC with Public and Private Subnets in AWS?',
    idealAnswer: '1. VPC CIDR block (e.g. 10.0.0.0/16).\n2. Public Subnet: Has a Route Table entry routing 0.0.0.0/0 to an Internet Gateway (IGW). Instances receive Public IPs.\n3. Private Subnet: Route Table routes 0.0.0.0/0 to a NAT Gateway deployed in the Public Subnet. Allows backend instances (DBs, workers) to download outbound patches without being reachable from the public internet.\n4. Security Groups: Stateful virtual firewall at instance ENI level (return traffic automatically permitted).\n5. Network ACLs (NACLs): Stateless subnet-level firewall evaluating numbered allow/deny rules in order.',
    keyPoints: [
      'Internet Gateway (IGW) for public routing',
      'NAT Gateway deployed in public subnet enables private outbound internet',
      'Stateful Security Groups vs Stateless NACLs',
      'Multi-AZ subnet distribution for high availability'
    ],
    expectedConcepts: ['VPC', 'Internet Gateway (IGW)', 'NAT Gateway', 'Security Groups vs NACLs'],
    relatedTopicId: 'aws_networking-and-vpc'
  },
  {
    id: 'aws_q5',
    subject: 'AWS',
    category: 'Databases',
    difficulty: 'medium',
    interviewerPrompt: 'Compare Amazon RDS Multi-AZ deployments with Read Replicas.',
    idealAnswer: '• Multi-AZ Deployment: HIGH AVAILABILITY & DISASTER RECOVERY.\nSynchronously replicates primary database to a standby instance in a different Availability Zone. The standby cannot serve read traffic. Upon primary failure, AWS performs automatic DNS failover in 60-120 seconds with zero data loss.\n• Read Replicas: SCALABILITY & PERFORMANCE.\nAsynchronously replicates data to up to 15 read-only instances (can be cross-region). Serves read-heavy query traffic to offload the primary writer. Subject to replication lag. Requires manual or application-driven promotion during failover.',
    keyPoints: [
      'Multi-AZ is synchronous replication for HA/DR (standby not queryable)',
      'Read Replicas use asynchronous replication for read scalability',
      'Automatic DNS failover in Multi-AZ',
      'Cross-region read replica capabilities'
    ],
    expectedConcepts: ['Multi-AZ', 'Read Replicas', 'Synchronous vs Asynchronous', 'Failover'],
    relatedTopicId: 'aws_databases-rds-and-dynamodb'
  },
  {
    id: 'aws_q6',
    subject: 'AWS',
    category: 'NoSQL Databases',
    difficulty: 'hard',
    interviewerPrompt: 'How does Amazon DynamoDB achieve single-digit millisecond latency at scale, and what is the difference between a Partition Key and a Sort Key?',
    idealAnswer: 'DynamoDB partitions data across SSD storage nodes using internal consistent hashing.\n• Partition Key (PK / Hash Key): DynamoDB feeds the PK into an internal hash function to determine the exact physical storage partition. Lookups by PK take O(1).\n• Sort Key (SK / Range Key): When defined (Composite Primary Key), items with the same PK are stored physically contiguous in sorted order by SK on the partition node. Enables efficient range queries (begins_with, between, <, >) within that partition.\n\nGlobal Secondary Indexes (GSI) and Local Secondary Indexes (LSI) enable querying alternate attributes.',
    keyPoints: [
      'Internal consistent hashing determines storage partition node',
      'Composite Primary Key: Partition Key (Hash) + Sort Key (Range)',
      'Hot partition throttling risk if PK lacks cardinality',
      'GSI has separate partition key and asynchronous replication'
    ],
    expectedConcepts: ['DynamoDB', 'Partition Key', 'Sort Key', 'Global Secondary Index (GSI)', 'Hot Partition'],
    relatedTopicId: 'aws_databases-rds-and-dynamodb'
  },
  {
    id: 'aws_q7',
    subject: 'AWS',
    category: 'High Availability & Scaling',
    difficulty: 'medium',
    interviewerPrompt: 'How do Application Load Balancers (ALB) and Auto Scaling Groups (ASG) work together during traffic spikes?',
    idealAnswer: '1. Traffic arrives at ALB, which distributes requests across healthy EC2 targets in Target Groups across multiple AZs.\n2. CloudWatch collects metrics (e.g., TargetResponseTime, RequestCountPerTarget, CPUUtilization).\n3. Auto Scaling Group policies (Target Tracking, Step Scaling) trigger when thresholds are breached.\n4. ASG launches new EC2 instances from a Launch Template in parallel AZs.\n5. Once instance health checks pass, ASG registers them with the ALB Target Group.\n6. ALB begins routing traffic to new instances, preserving latency.',
    keyPoints: [
      'Target Tracking scaling policy maintains metric target',
      'Health check integration between ALB and ASG',
      'Launch Templates define instance AMI, size, and user-data',
      'Cooldown periods prevent thrashing and rapid over-provisioning'
    ],
    expectedConcepts: ['Application Load Balancer (ALB)', 'Auto Scaling Group', 'Target Tracking', 'Launch Template'],
    relatedTopicId: 'aws_networking-and-vpc'
  },
  {
    id: 'aws_q8',
    subject: 'AWS',
    category: 'Content Delivery',
    difficulty: 'easy',
    interviewerPrompt: 'What is Amazon CloudFront, and what is the difference between CloudFront Edge Locations and Regional Edge Caches?',
    idealAnswer: 'Amazon CloudFront is a globally distributed Content Delivery Network (CDN) that accelerates delivery of static and dynamic web content.\n• Edge Locations: Over 600+ Points of Presence (PoPs) closest to end-users worldwide. Caches content and terminates TLS connections near the client, drastically cutting Round-Trip Time (RTT).\n• Regional Edge Caches: Sits between CloudFront Edge Locations and the Origin server (S3 / ALB). Has larger cache storage. When an Edge Location experiences a cache miss, it checks the Regional Edge Cache before fetching from the origin, reducing load on your origin.',
    keyPoints: [
      'Reduces latency via proximity caching and edge TLS termination',
      'Edge Locations vs Regional Edge Caches hierarchy',
      'Origin Shield adds an extra caching layer for popular assets',
      'Cache invalidation strategies'
    ],
    expectedConcepts: ['CloudFront', 'Edge Locations', 'CDN', 'Origin Server', 'Cache Invalidation'],
    relatedTopicId: 'aws_networking-and-vpc'
  },

  // ==================== 10. DEVOPS ====================
  {
    id: 'mock_5',
    subject: 'DevOps',
    category: 'CI/CD & Containers',
    difficulty: 'easy',
    interviewerPrompt: 'Explain the difference between Continuous Integration (CI), Continuous Delivery (CD), and Continuous Deployment.',
    idealAnswer: '• Continuous Integration (CI): Developers regularly merge code changes into a central repository, triggering automated builds and test suites to catch integration errors early.\n• Continuous Delivery (CD): Automated pipeline packages and tests releases, ensuring the codebase is always in a deployable state. Deployment to production requires a manual approval trigger.\n• Continuous Deployment: An extension of Continuous Delivery where every change that passes all automated tests and quality gates is automatically deployed directly to production without manual intervention.',
    keyPoints: [
      'Automated build and test runs on code commit (CI)',
      'Automated release preparation ready for deploy (CD delivery)',
      'Manual approval gate vs Fully automated deployment to production',
      'Fast feedback loop and reduced deployment risk'
    ],
    expectedConcepts: ['Build Pipeline', 'Automated Testing', 'Release Artifacts', 'Production Deployment'],
    relatedTopicId: 'devops_cicd-pipelines'
  },
  {
    id: 'devops_q2',
    subject: 'DevOps',
    category: 'Deployment Strategies',
    difficulty: 'medium',
    interviewerPrompt: 'Compare Blue/Green, Canary, and Rolling deployment strategies. What are the trade-offs of each?',
    idealAnswer: '• Rolling Deployment: Gradually updates instances in batches (e.g. 25% at a time). Pros: No duplicate hardware cost. Cons: Mixed versions running simultaneously; slow rollbacks.\n• Blue/Green Deployment: Two identical production environments. "Blue" is live; "Green" runs the new release. After validating Green, traffic is switched instantly at the router/load balancer. Pros: Instant zero-downtime rollback by switching router back. Cons: 2x infrastructure cost during deployment.\n• Canary Deployment: Routes a tiny fraction of user traffic (e.g. 2% -> 10% -> 50% -> 100%) to the new release while monitoring error rates and SRE metrics. Pros: Limits blast radius of bugs. Cons: Complex routing and telemetry required.',
    keyPoints: [
      'Blast radius reduction with Canary',
      'Instant rollback with Blue/Green',
      'Resource cost trade-off (2x for Blue/Green)',
      'Database schema migration challenges in mixed version deployments'
    ],
    expectedConcepts: ['Blue/Green Deployment', 'Canary Release', 'Rolling Update', 'Blast Radius'],
    relatedTopicId: 'devops_cicd-pipelines'
  },
  {
    id: 'devops_q3',
    subject: 'DevOps',
    category: 'Version Control',
    difficulty: 'easy',
    interviewerPrompt: 'Compare GitFlow and Trunk-Based Development. Why has modern DevOps shifted toward Trunk-Based Development?',
    idealAnswer: '• GitFlow: Uses long-lived branches (master, develop, release, hotfix, feature branches). Feature branches live for weeks before complex merges. Pros: Strict release control. Cons: "Merge Hell", delayed integration feedback, impedes continuous deployment.\n• Trunk-Based Development: All developers commit small, frequent changes directly to a single shared branch ("trunk" or "main") multiple times a day. Features are hidden behind Feature Flags (Toggles). Automated CI tests validate every commit. Pros: Eliminates merge conflicts, enables true CI/CD, faster time-to-market.',
    keyPoints: [
      'Short-lived feature branches (< 1 day) in Trunk-based',
      'Feature flags decouple code deployment from feature release',
      'Merge conflicts eliminated through frequent integration',
      'DORA metrics correlate trunk-based dev with high performance'
    ],
    expectedConcepts: ['Trunk-Based Development', 'GitFlow', 'Feature Flags', 'Merge Hell'],
    relatedTopicId: 'devops_gitops-and-culture'
  },
  {
    id: 'devops_q4',
    subject: 'DevOps',
    category: 'Infrastructure',
    difficulty: 'medium',
    interviewerPrompt: 'What is Immutable Infrastructure and how does it prevent Configuration Drift?',
    idealAnswer: 'In Mutable Infrastructure, servers are updated in-place via SSH or scripts (patching OS, editing configs). Over time, small undocumented manual changes accumulate across servers, causing Configuration Drift (environments no longer match).\n\nIn Immutable Infrastructure, servers/containers are NEVER modified after deployment. If an update is required, an entirely new machine image (AMI / Container) is built from scratch, tested, deployed, and the old server is terminated. Benefits: Deterministic, reproducible environments; zero configuration drift; trivial rollbacks to previous image.',
    keyPoints: [
      'Servers never patched in-place; replaced with new image',
      'Eliminates configuration drift between Dev, Staging, and Prod',
      'Golden Images built via Packer or Docker',
      'Enables rapid auto-scaling with predictable state'
    ],
    expectedConcepts: ['Immutable Infrastructure', 'Configuration Drift', 'Golden Image', 'Packer'],
    relatedTopicId: 'devops_gitops-and-culture'
  },
  {
    id: 'devops_q5',
    subject: 'DevOps',
    category: 'GitOps',
    difficulty: 'hard',
    interviewerPrompt: 'What is GitOps and how does an operator like ArgoCD reconcile application state?',
    idealAnswer: 'GitOps is an operational framework where a Git repository serves as the SINGLE SOURCE OF TRUTH for desired infrastructure and application state.\n\nReconciliation Loop (Pull Model):\n1. Developers push declarative Kubernetes manifests (Helm/Kustomize) to Git.\n2. ArgoCD runs an in-cluster agent that continuously compares the DESIRED state in Git with the ACTUAL live state in the Kubernetes cluster.\n3. If drift is detected, ArgoCD automatically syncs (applies) the changes to match Git, or raises alerts.\nSecurity benefit: Cluster credentials never leave the cluster (no CI runner needs admin kubectl access).',
    keyPoints: [
      'Git as single source of truth for declarative state',
      'In-cluster pull operator (ArgoCD / Flux) vs push from CI',
      'Continuous drift detection and automated remediation',
      'Audit log and instant rollback via git revert'
    ],
    expectedConcepts: ['GitOps', 'ArgoCD', 'Reconciliation Loop', 'Drift Detection', 'Declarative State'],
    relatedTopicId: 'devops_gitops-and-culture'
  },
  {
    id: 'devops_q6',
    subject: 'DevOps',
    category: 'Metrics & SRE',
    difficulty: 'medium',
    interviewerPrompt: 'What are the 4 DORA Metrics and how are they used to evaluate engineering team velocity and stability?',
    idealAnswer: 'DevOps Research and Assessment (DORA) identified 4 key metrics that balance speed and reliability:\n1. Deployment Frequency: How often code is successfully deployed to production (Elite: multiple times per day).\n2. Lead Time for Changes: Time from code commit to running in production (Elite: < 1 hour).\n3. Change Failure Rate: Percentage of deployments causing production failures/incidents (Elite: 0-15%).\n4. Mean Time to Recovery (MTTR) / Time to Restore Service: Time taken to resolve a production incident (Elite: < 1 hour).\n\nVelocity (1 & 2) and Stability (3 & 4) must improve together.',
    keyPoints: [
      'Velocity: Deployment Frequency & Lead Time for Changes',
      'Stability: Change Failure Rate & Time to Restore Service (MTTR)',
      'Benchmark tiers: Low, Medium, High, Elite performers',
      'Prevents false tradeoffs between speed and software quality'
    ],
    expectedConcepts: ['DORA Metrics', 'Deployment Frequency', 'Lead Time', 'MTTR', 'Change Failure Rate'],
    relatedTopicId: 'devops_cicd-pipelines'
  },
  {
    id: 'devops_q7',
    subject: 'DevOps',
    category: 'CI/CD Pipelines',
    difficulty: 'easy',
    interviewerPrompt: 'How do you design a secure, caching-optimized GitHub Actions workflow for a containerized application?',
    idealAnswer: '1. Triggers: On pull_request and push to main.\n2. Dependency Caching: Use actions/cache or setup-node with cache: "npm" to avoid downloading node_modules every run.\n3. Multi-Stage Pipeline: Lint -> Unit Test -> SAST Security Scan -> Build Container -> Integration Test.\n4. Docker Layer Cache: Use docker/build-push-action with type=gha (GitHub Actions cache) to reuse unchanged Docker layers.\n5. Security: Secrets stored in GitHub Secrets; least-privilege GITHUB_TOKEN permissions; pin Actions to commit SHAs rather than mutable tags.',
    keyPoints: [
      'Dependency and Docker layer caching speed up builds',
      'Failing fast with parallel lint and unit test stages',
      'Pinning action commit SHAs protects against supply chain attacks',
      'Least-privilege token permissions'
    ],
    expectedConcepts: ['GitHub Actions', 'Layer Caching', 'Workflow Triggers', 'Supply Chain Security'],
    relatedTopicId: 'devops_cicd-pipelines'
  },
  {
    id: 'devops_q8',
    subject: 'DevOps',
    category: 'Artifact Management',
    difficulty: 'medium',
    interviewerPrompt: 'Why should build artifacts and container images be built once and promoted through environments instead of rebuilt per environment?',
    idealAnswer: '"Build Once, Deploy Many" is a core continuous delivery principle.\nIf you rebuild the Docker image or JAR artifact for Staging and then rebuild again for Production, you cannot guarantee that the binary running in production is byte-for-byte identical to the one tested in staging (upstream dependencies or base images might have updated in between).\n\nInstead: Build the immutable artifact once in CI, assign a unique version/digest tag, push to an artifact registry (Nexus/ECR), and promote the EXACT SAME binary through Dev -> QA -> Prod, injecting environment-specific configuration via environment variables/ConfigMaps.',
    keyPoints: [
      'Guarantees tested binary matches production binary exactly',
      'Prevents dependency version drift between environments',
      'Configuration injected externally, not baked into artifact',
      'Artifact signing and provenance verification'
    ],
    expectedConcepts: ['Build Once Deploy Many', 'Immutable Artifact', 'Container Registry', 'Config Injection'],
    relatedTopicId: 'devops_cicd-pipelines'
  },

  // ==================== 11. DOCKER ====================
  {
    id: 'doc_q1',
    subject: 'Docker',
    category: 'Architecture',
    difficulty: 'easy',
    interviewerPrompt: 'What is the exact technical difference between a Docker Container and a Virtual Machine?',
    idealAnswer: '• Virtual Machine: Hardware-level virtualization managed by a Hypervisor (Type 1 or 2). Each VM contains a complete Guest OS kernel, device drivers, and binaries, consuming gigabytes of RAM and taking minutes to boot.\n• Docker Container: Operating system-level virtualization. Containers share the HOST OS kernel directly. Isolation is enforced through Linux Kernel Namespaces (PID, Mount, Net, IPC, UTS, User) for visibility isolation, and cgroups (Control Groups) for resource constraints (CPU, RAM, I/O limits). Boot time is milliseconds with megabyte-sized footprints.',
    keyPoints: [
      'Containers share the host kernel; VMs have separate guest kernels',
      'Linux Namespaces provide process and network isolation',
      'cgroups enforce CPU and memory limits',
      'Hypervisor overhead vs Container runtime efficiency'
    ],
    expectedConcepts: ['Namespaces', 'Control Groups (cgroups)', 'Hypervisor', 'Guest OS', 'Kernel Sharing'],
    relatedTopicId: 'docker_docker-architecture-and-internals'
  },
  {
    id: 'doc_q2',
    subject: 'Docker',
    category: 'Dockerfile Optimization',
    difficulty: 'medium',
    interviewerPrompt: 'Why are Multi-Stage builds essential in Docker, and how do they reduce image size and attack surface?',
    idealAnswer: 'Compiling software requires heavy tools (compilers, SDKs, dev dependencies, header files) that are unnecessary at runtime and bloat image size while introducing CVE vulnerabilities.\n\nA Multi-Stage Dockerfile defines multiple FROM instructions:\n- Stage 1 ("builder"): Installs build tools, fetches dependencies, and compiles the source code into an executable/artifact.\n- Stage 2 ("runtime"): Starts from a minimal base image (e.g. alpine or distroless), and uses "COPY --from=builder" to copy ONLY the compiled artifact.\nResult: An image that shrinks from 1.2 GB to 40 MB, leaving zero build tools or package managers for attackers to exploit.',
    keyPoints: [
      'Separation of build environment from runtime environment',
      'COPY --from=builder copies only final binaries',
      'Reduces image size by up to 90+%',
      'Eliminates security attack surface and CVE vulnerabilities'
    ],
    expectedConcepts: ['Multi-Stage Build', 'Distroless Image', 'Alpine', 'Attack Surface Reduction'],
    relatedTopicId: 'docker_dockerfile-best-practices'
  },
  {
    id: 'doc_q3',
    subject: 'Docker',
    category: 'Layer Caching',
    difficulty: 'easy',
    interviewerPrompt: 'How does Docker Layer Caching work, and why should you copy dependency manifests before source code?',
    idealAnswer: 'Each instruction in a Dockerfile (FROM, RUN, COPY) generates an immutable, read-only layer in the image union filesystem (OverlayFS).\n\nWhen rebuilding an image, Docker checks whether the instruction and its inputs have changed. If unchanged, it reuses the cached layer.\n\nBest Practice:\n`COPY package*.json ./` followed by `RUN npm install` BEFORE `COPY . .`\nSince dependency manifests change rarely compared to application code, Docker caches the heavy `RUN npm install` layer. Changing your code invalidates cache ONLY from the `COPY . .` step onward, cutting build times from minutes to seconds.',
    keyPoints: [
      'Each Dockerfile instruction creates a filesystem layer',
      'Cache invalidation cascades to all subsequent steps',
      'Order instructions from least frequently changed to most frequent',
      'OverlayFS union filesystem under the hood'
    ],
    expectedConcepts: ['Layer Caching', 'Cache Invalidation', 'OverlayFS', 'Build Optimization'],
    relatedTopicId: 'docker_dockerfile-best-practices'
  },
  {
    id: 'doc_q4',
    subject: 'Docker',
    category: 'Storage',
    difficulty: 'medium',
    interviewerPrompt: 'What is the difference between a Docker Volume, a Bind Mount, and tmpfs?',
    idealAnswer: '• Volume: Managed completely by Docker in host storage (/var/lib/docker/volumes/). Best practice for database persistence across container lifecycles. Independent of host directory structure, can be shared, and easily backed up.\n• Bind Mount: Mounts an arbitrary file or directory from the host filesystem directly into the container (e.g., -v $(pwd):/app). Dependent on host OS directory layout. Ideal for local dev environments with live code reloading.\n• tmpfs Mount: Stored entirely in host system memory (RAM), never written to disk. Ideal for sensitive secrets or high-speed temporary caching.',
    keyPoints: [
      'Volumes managed by Docker engine (/var/lib/docker/volumes)',
      'Bind mounts map host file path directly',
      'tmpfs resides purely in RAM (ephemeral, secure)',
      'Data in container writable layer is lost on container removal'
    ],
    expectedConcepts: ['Named Volumes', 'Bind Mounts', 'tmpfs', 'Data Persistence'],
    relatedTopicId: 'docker_volumes-and-storage'
  },
  {
    id: 'doc_q5',
    subject: 'Docker',
    category: 'Networking',
    difficulty: 'medium',
    interviewerPrompt: 'Explain Docker network drivers: Bridge, Host, Overlay, and None.',
    idealAnswer: '• Bridge: Default network driver. Creates a private virtual software bridge (docker0) on the host. Containers get private IP addresses and communicate via port mapping (-p host:container) using iptables NAT rules.\n• Host: Removes network isolation; container shares host\'s network namespace directly. Zero NAT overhead, but port conflicts can occur.\n• Overlay: Enables multi-host container networking across a Docker Swarm or distributed hosts using VXLAN encapsulation.\n• None: Disables all container networking; only loopback interface exists.',
    keyPoints: [
      'Bridge is default with internal subnet and NAT port forwarding',
      'Host driver eliminates NAT overhead for max network performance',
      'Overlay driver connects containers across multiple hosts via VXLAN',
      'User-defined bridge provides automatic DNS name resolution'
    ],
    expectedConcepts: ['Bridge Network', 'Host Network', 'Overlay Network', 'VXLAN', 'iptables NAT'],
    relatedTopicId: 'docker_networking-and-compose'
  },
  {
    id: 'doc_q6',
    subject: 'Docker',
    category: 'Dockerfile Syntax',
    difficulty: 'easy',
    interviewerPrompt: 'What is the difference between ENTRYPOINT and CMD in a Dockerfile?',
    idealAnswer: '• ENTRYPOINT: Configures the core executable that will ALWAYS run when the container starts. It is not overridden by default when passing arguments to `docker run`.\n• CMD: Provides default arguments for the ENTRYPOINT (or default command if ENTRYPOINT is omitted). Arguments passed to `docker run` completely override the CMD.\n\nRecommended Pattern (Exec Form):\n```dockerfile\nENTRYPOINT ["python", "app.py"]\nCMD ["--port", "8080"]\n```\nRunning `docker run myimage --port 9090` overrides only the CMD arguments, keeping the python entrypoint intact.',
    keyPoints: [
      'ENTRYPOINT defines the fixed executable',
      'CMD defines default arguments that can be overridden at runtime',
      'Exec form ["arg1", "arg2"] vs Shell form (spawns /bin/sh -c)',
      'Combining both for flexible CLI container design'
    ],
    expectedConcepts: ['ENTRYPOINT', 'CMD', 'Exec Form vs Shell Form', 'Argument Override'],
    relatedTopicId: 'docker_dockerfile-best-practices'
  },
  {
    id: 'doc_q7',
    subject: 'Docker',
    category: 'Security',
    difficulty: 'hard',
    interviewerPrompt: 'Why is running containers as the "root" user dangerous, and how do you remediate it?',
    idealAnswer: 'By default, the root user inside a container has UID 0, which corresponds to UID 0 (root) on the host kernel! If an attacker achieves a container escape vulnerability, they gain full root privileges over the host machine.\n\nRemediation:\n1. Non-root user in Dockerfile:\n```dockerfile\nRUN addgroup -S appgroup && adduser -S appuser -G appgroup\nUSER appuser\n```\n2. User Namespaces: Enable user namespace remapping in daemon.json, mapping container UID 0 to an unprivileged high UID on host.\n3. Drop Linux Capabilities: Run containers with `--cap-drop=ALL --cap-add=NET_BIND_SERVICE`.\n4. Read-only filesystem: Run with `--read-only`.',
    keyPoints: [
      'Container UID 0 is host UID 0 without user namespace remapping',
      'Creating and switching to unprivileged USER in Dockerfile',
      'Dropping Linux capabilities (--cap-drop=ALL)',
      'Read-only root filesystem prevents writing malicious binaries'
    ],
    expectedConcepts: ['Non-Root User', 'User Namespaces', 'Linux Capabilities', 'Container Escape'],
    relatedTopicId: 'docker_dockerfile-best-practices'
  },
  {
    id: 'doc_q8',
    subject: 'Docker',
    category: 'Internals',
    difficulty: 'hard',
    interviewerPrompt: 'What is the role of containerd and runc in the modern container ecosystem?',
    idealAnswer: 'Historically, Docker was a monolithic daemon. Today, it adheres to the Open Container Initiative (OCI) standards:\n• Docker CLI / Engine: High-level developer interface handling image builds, user commands, and compose.\n• containerd: Core container runtime daemon managing container lifecycle, image transfers, and storage. Used directly by Kubernetes via CRI (Container Runtime Interface).\n• runc: The lightweight, low-level OCI reference implementation. It actually invokes Linux kernel syscalls (clone, unshare, setns, cgroups) to spawn the container process, then exits.',
    keyPoints: [
      'OCI standards decouple engine from low-level execution',
      'containerd acts as the industry-standard runtime manager',
      'runc is the low-level CLI tool interacting with kernel namespaces',
      'Kubernetes removed dockershim to interact directly with containerd'
    ],
    expectedConcepts: ['containerd', 'runc', 'Open Container Initiative (OCI)', 'Container Runtime Interface (CRI)'],
    relatedTopicId: 'docker_docker-architecture-and-internals'
  },

  // ==================== 12. KUBERNETES ====================
  {
    id: 'k8s_q1',
    subject: 'Kubernetes',
    category: 'Architecture',
    difficulty: 'medium',
    interviewerPrompt: 'Explain the core components of the Kubernetes Control Plane and Worker Nodes.',
    idealAnswer: 'Control Plane (Master Node):\n• kube-apiserver: Central gateway exposing the REST API; validates and configures object manifests.\n• etcd: Consistent, highly available distributed key-value store holding the complete cluster state.\n• kube-scheduler: Watches for unassigned pods and selects optimal worker nodes based on resources, taints, and affinity.\n• kube-controller-manager: Runs core controllers (Node, Deployment, ReplicaSet, Endpoints) to reconcile desired vs actual state.\n\nWorker Nodes:\n• kubelet: Agent running on each node ensuring containers described in PodSpecs are running and healthy.\n• kube-proxy: Maintains network routing rules (iptables / IPVS) on nodes to enable Service communication.\n• Container Runtime: (e.g. containerd) pulls images and runs containers.',
    keyPoints: [
      'kube-apiserver is the only component that communicates with etcd',
      'etcd Raft consensus stores all cluster state',
      'kube-scheduler assigns pods to nodes',
      'kubelet and kube-proxy on worker nodes'
    ],
    expectedConcepts: ['kube-apiserver', 'etcd', 'kube-scheduler', 'kubelet', 'kube-proxy'],
    relatedTopicId: 'kubernetes_architecture-and-control-plane'
  },
  {
    id: 'k8s_q2',
    subject: 'Kubernetes',
    category: 'Workloads',
    difficulty: 'easy',
    interviewerPrompt: 'What is a Pod, and why does Kubernetes deploy Pods rather than individual containers directly?',
    idealAnswer: 'A Pod is the smallest deployable computing unit in Kubernetes. It encapsulates one or more tightly coupled containers that share:\n1. Network Namespace: Single IP address and port space (containers communicate via localhost).\n2. IPC Namespace: Shared memory and inter-process communication.\n3. Storage Volumes: Shared disk volumes mounted into multiple containers.\n\nKubernetes deploys Pods to support helper container patterns (Sidecars for log forwarding, Proxies for service mesh like Envoy, Init Containers for database migrations) where containers must be scheduled on the exact same physical node.',
    keyPoints: [
      'Smallest deployable unit in Kubernetes',
      'Shared IP address and port space (localhost communication)',
      'Sidecar and Init Container patterns',
      'Shared volume storage mounts'
    ],
    expectedConcepts: ['Pod', 'Sidecar Pattern', 'Shared Network Namespace', 'Init Container'],
    relatedTopicId: 'kubernetes_pods-and-deployments'
  },
  {
    id: 'k8s_q3',
    subject: 'Kubernetes',
    category: 'Networking',
    difficulty: 'medium',
    interviewerPrompt: 'Compare ClusterIP, NodePort, LoadBalancer, and Ingress in Kubernetes.',
    idealAnswer: '• ClusterIP: Default Service type. Exposes the service on a cluster-internal IP address. Reachable ONLY within the cluster.\n• NodePort: Exposes the service on each node\'s IP at a static port (range 30000-32767). Accessible externally via <NodeIP>:<NodePort>.\n• LoadBalancer: Provisions a cloud provider\'s native load balancer (e.g. AWS NLB/ALB) pointing to the NodePort automatically. Costly if used for every service.\n• Ingress: An application-level (Layer 7) reverse proxy and router (e.g. NGINX, Traefik). Provides path-based routing (/api, /auth), SSL/TLS termination, and name-based virtual hosting behind a single external IP.',
    keyPoints: [
      'ClusterIP: Internal only',
      'NodePort: High port range 30000-32767 on all nodes',
      'LoadBalancer: Cloud provider native L4 load balancer',
      'Ingress: L7 routing, path dispatch, and SSL termination'
    ],
    expectedConcepts: ['ClusterIP', 'NodePort', 'LoadBalancer Service', 'Ingress Controller'],
    relatedTopicId: 'kubernetes_services-and-networking'
  },
  {
    id: 'k8s_q4',
    subject: 'Kubernetes',
    category: 'Health Checks',
    difficulty: 'medium',
    interviewerPrompt: 'What is the difference between Liveness, Readiness, and Startup probes in Kubernetes?',
    idealAnswer: '• Liveness Probe: Checks if the application is running. If it fails, kubelet KILLS and restarts the container (fixes deadlocks/crashes).\n• Readiness Probe: Checks if the application is ready to accept incoming network traffic. If it fails, the pod\'s IP is REMOVED from the Service Endpoints list (no traffic routed). It is NOT restarted.\n• Startup Probe: Runs on boot for legacy applications with slow startup times. Disables Liveness and Readiness probes until the Startup probe succeeds, preventing premature restart loops.',
    keyPoints: [
      'Liveness failure triggers container restart',
      'Readiness failure removes Pod from Service traffic endpoints',
      'Startup probe shields slow-booting applications from premature restarts',
      'Probe types: HTTP GET, TCP Socket, Exec command'
    ],
    expectedConcepts: ['Liveness Probe', 'Readiness Probe', 'Startup Probe', 'Service Endpoints'],
    relatedTopicId: 'kubernetes_pods-and-deployments'
  },
  {
    id: 'k8s_q5',
    subject: 'Kubernetes',
    category: 'Configuration',
    difficulty: 'easy',
    interviewerPrompt: 'How do ConfigMaps and Secrets differ, and how are Secrets encoded by default in Kubernetes?',
    idealAnswer: '• ConfigMap: Stores non-confidential configuration data in key-value pairs (app settings, feature flags). Injected as environment variables or mounted as config files.\n• Secret: Stores sensitive information (passwords, TLS certificates, API tokens).\n\nSecurity Caveat:\nBy default, Kubernetes Secrets are merely BASE64 ENCODED, NOT ENCRYPTED! Anyone with RBAC access to the namespace or etcd disk access can decode them.\n\nBest Practices:\n1. Enable Encryption at Rest in etcd with KMS keys.\n2. Use external secret stores (HashiCorp Vault, AWS Secrets Manager via External Secrets Operator).',
    keyPoints: [
      'ConfigMap for non-confidential config; Secret for sensitive credentials',
      'Secrets are base64 encoded by default (not encrypted!)',
      'etcd encryption at rest with KMS providers',
      'External Secrets Operator integration'
    ],
    expectedConcepts: ['ConfigMap', 'Secret', 'Base64 Encoding', 'Encryption at Rest', 'External Secrets'],
    relatedTopicId: 'kubernetes_configuration-and-storage'
  },
  {
    id: 'k8s_q6',
    subject: 'Kubernetes',
    category: 'Autoscaling',
    difficulty: 'medium',
    interviewerPrompt: 'How does the Horizontal Pod Autoscaler (HPA) scale workloads based on metrics?',
    idealAnswer: 'The Horizontal Pod Autoscaler (HPA) automatically adjusts the number of replica pods in a Deployment or ReplicaSet based on observed CPU utilization, memory, or custom metrics (e.g. SQS queue length).\n\nMechanism:\n1. Metrics Server collects pod resource usage via kubelet cAdvisor.\n2. HPA controller queries Metrics Server every 15 seconds (default).\n3. Algorithm: `desiredReplicas = ceil[currentReplicas * (currentMetricValue / targetMetricValue)]`\n4. Updates the replicas field on the Deployment.\nCrucial requirement: Pod containers MUST define resource `requests` (e.g. cpu: 200m) for percentage calculations.',
    keyPoints: [
      'Metrics Server and cAdvisor integration',
      'Formula: currentReplicas * (currentMetric / targetMetric)',
      'Requires resource requests defined in PodSpec',
      'KEDA (Kubernetes Event-driven Autoscaling) for event-based scaling'
    ],
    expectedConcepts: ['Horizontal Pod Autoscaler (HPA)', 'Metrics Server', 'Resource Requests', 'cAdvisor'],
    relatedTopicId: 'kubernetes_scaling-and-troubleshooting'
  },
  {
    id: 'k8s_q7',
    subject: 'Kubernetes',
    category: 'Scheduling',
    difficulty: 'hard',
    interviewerPrompt: 'Explain Taints, Tolerations, Node Affinity, and Pod Anti-Affinity in Kubernetes scheduling.',
    idealAnswer: '• Taints and Tolerations: Taints are applied to NODES to repel pods. Pods with matching Tolerations are allowed (but not forced) to schedule on tainted nodes. Example: Dedicating GPU nodes to machine learning jobs.\n• Node Affinity: Applied to PODS to attract them to specific nodes based on node labels (requiredDuringScheduling vs preferredDuringScheduling).\n• Pod Anti-Affinity: Prevents pods of the same service from co-locating on the same physical node or availability zone (e.g., ensuring 3 replicas of an API run on 3 different physical hosts for high availability).',
    keyPoints: [
      'Taints repel pods; Tolerations allow pods to schedule',
      'Node Affinity attracts pods to labeled nodes',
      'Pod Anti-Affinity prevents single-point-of-failure co-location',
      'Hard (required) vs Soft (preferred) affinity rules'
    ],
    expectedConcepts: ['Taints and Tolerations', 'Node Affinity', 'Pod Anti-Affinity', 'Topology Spread Constraints'],
    relatedTopicId: 'kubernetes_architecture-and-control-plane'
  },
  {
    id: 'k8s_q8',
    subject: 'Kubernetes',
    category: 'Troubleshooting',
    difficulty: 'medium',
    interviewerPrompt: 'What steps and kubectl commands do you execute to debug a Pod stuck in CrashLoopBackOff?',
    idealAnswer: 'CrashLoopBackOff means the pod\'s container starts, crashes, and Kubernetes restarts it with exponential backoff delay.\n\nTroubleshooting Runbook:\n1. `kubectl describe pod <pod-name>`: Inspect the "Events" section at the bottom for OOMKilled (Exit Code 137), failed mounts, or missing config.\n2. `kubectl logs <pod-name>`: Inspect application error logs and stack traces.\n3. `kubectl logs <pod-name> --previous`: Crucial command to inspect logs from the PREVIOUS instance that crashed before restarting.\n4. Check exit codes:\n- Exit Code 137: Out of Memory (OOMKilled by kernel cgroups).\n- Exit Code 1: Application exception (unhandled error, missing DB connection).\n- Exit Code 126/127: Command not found or permission denied.',
    keyPoints: [
      'kubectl describe shows lifecycle events and exit codes',
      'kubectl logs --previous retrieves crash logs before reboot',
      'Exit Code 137 indicates OOMKilled by cgroups',
      'Exit Code 1 indicates application-level crash'
    ],
    expectedConcepts: ['CrashLoopBackOff', 'kubectl describe', 'kubectl logs --previous', 'OOMKilled (Exit Code 137)'],
    relatedTopicId: 'kubernetes_scaling-and-troubleshooting'
  },

  // ==================== 13. TERRAFORM ====================
  {
    id: 'tf_q1',
    subject: 'Terraform',
    category: 'Fundamentals',
    difficulty: 'easy',
    interviewerPrompt: 'What is Declarative Infrastructure as Code, and how does it differ from Imperative tools like Bash or Ansible?',
    idealAnswer: '• Declarative (Terraform): You specify the DESIRED END STATE of the infrastructure (e.g. "I want 3 EC2 instances in VPC A"). Terraform calculates the delta between current state and desired state, generating the exact execution steps to reach it. Re-running the code is naturally idempotent.\n• Imperative (Bash / procedural scripts): You specify the exact STEP-BY-STEP COMMANDS to execute (e.g. "Create VPC, then create Subnet, then launch instance"). Re-running an imperative script without custom checks often creates duplicate resources or errors out.',
    keyPoints: [
      'Declarative declares the "WHAT"; Imperative declares the "HOW"',
      'Terraform determines dependencies and delta execution graph',
      'Idempotency guarantee in declarative models',
      'State tracking enables precise drift detection'
    ],
    expectedConcepts: ['Declarative vs Imperative', 'Idempotency', 'Desired State', 'Execution Graph'],
    relatedTopicId: 'terraform_iac-fundamentals-and-hcl'
  },
  {
    id: 'tf_q2',
    subject: 'Terraform',
    category: 'State Management',
    difficulty: 'hard',
    interviewerPrompt: 'What is the purpose of the Terraform State file (terraform.tfstate), and why is Remote State with Locking required in team environments?',
    idealAnswer: 'Terraform State maps your declarative HCL configuration to real-world cloud resource IDs and attributes, and tracks metadata and resource dependencies.\n\nTeam Risks with Local State:\n1. State Desynchronization: Teammates working with local state files will overwrite or duplicate resources.\n2. Concurrent Collisions: Two engineers running terraform apply simultaneously can corrupt state or create race conditions.\n3. Sensitive Data Exposure: State contains plaintext passwords, private keys, and connection strings.\n\nSolution: Remote Backend (e.g., Amazon S3 for state storage + DynamoDB for State Locking, or Terraform Cloud). DynamoDB locks the state during `terraform plan/apply`, preventing concurrent runs.',
    keyPoints: [
      'Maps HCL resources to cloud resource IDs',
      'Remote backend stores state centrally (S3 / GCS)',
      'State Locking (DynamoDB) prevents concurrent run corruption',
      'State encryption at rest protects sensitive attributes'
    ],
    expectedConcepts: ['terraform.tfstate', 'Remote Backend', 'State Locking (DynamoDB)', 'Race Conditions'],
    relatedTopicId: 'terraform_state-management'
  },
  {
    id: 'tf_q3',
    subject: 'Terraform',
    category: 'Workflow',
    difficulty: 'medium',
    interviewerPrompt: 'Explain the Terraform lifecycle workflow: init, plan, apply, and destroy.',
    idealAnswer: '1. terraform init: Initializes working directory, downloads required provider plugins (AWS, Azure, Kubernetes) into .terraform/, and configures the backend.\n2. terraform plan: Refreshes state against actual cloud APIs, compares desired configuration, and generates an execution plan showing resources to add (+), modify (~), or destroy (-).\n3. terraform apply: Executes the planned changes against the cloud provider APIs and updates terraform.tfstate.\n4. terraform destroy: Deletes all resources managed by the current configuration state in reverse dependency order.',
    keyPoints: [
      'init downloads provider binaries and configures backend',
      'plan creates speculative execution delta without modifying infrastructure',
      'apply executes changes and updates state',
      'plan file can be saved (`-out=tfplan`) for deterministic CI/CD execution'
    ],
    expectedConcepts: ['terraform init', 'terraform plan', 'terraform apply', 'Provider Plugins'],
    relatedTopicId: 'terraform_iac-fundamentals-and-hcl'
  },
  {
    id: 'tf_q4',
    subject: 'Terraform',
    category: 'Modules',
    difficulty: 'medium',
    interviewerPrompt: 'What are Terraform Modules and how do they promote DRY (Don\'t Repeat Yourself) infrastructure?',
    idealAnswer: 'A Terraform Module is a container for multiple resources that are used together. Any folder with .tf files is a module.\n• Root Module: The main working directory where terraform commands run.\n• Child Module: A reusable, parameterized module invoked from the root module using the `module` block.\n\nModules promote DRY principles by encapsulating architectural best practices (e.g., standard VPC with security groups, tags, and logging). Teams instantiate the module multiple times across environments (dev, staging, prod) by passing input variables, receiving outputs, without copy-pasting resource definitions.',
    keyPoints: [
      'Reusable, parameterized infrastructure blueprints',
      'Root module vs Child module hierarchy',
      'Encapsulates inputs (variables), resources, and outputs',
      'Versioning modules via Git tags or Terraform Registry'
    ],
    expectedConcepts: ['Terraform Modules', 'DRY Principle', 'Input Variables', 'Module Outputs'],
    relatedTopicId: 'terraform_modules-and-best-practices'
  },
  {
    id: 'tf_q5',
    subject: 'Terraform',
    category: 'Drift & Refresh',
    difficulty: 'medium',
    interviewerPrompt: 'What is Configuration Drift in Terraform and how does Terraform detect and reconcile it?',
    idealAnswer: 'Configuration Drift occurs when resources in the real cloud environment are modified outside of Terraform (e.g. an engineer manually changes a security group rule in the AWS Console).\n\nReconciliation:\nDuring `terraform plan`, Terraform performs a "Refresh" phase: it queries the cloud provider APIs for the live state of all managed resources, updates its in-memory view, and compares it against your HCL code.\n\nIf drift exists, `terraform plan` shows the delta required to overwrite manual changes and restore infrastructure back to the code definition. Running `terraform apply` overwrites the manual changes.',
    keyPoints: [
      'Manual out-of-band cloud changes cause drift',
      'terraform plan automatically refreshes live state via cloud APIs',
      'apply overwrites drift to restore code definition',
      'terraform plan -refresh-only updates state without applying changes'
    ],
    expectedConcepts: ['Configuration Drift', 'State Refresh', 'Out-of-Band Changes', 'Reconciliation'],
    relatedTopicId: 'terraform_state-management'
  },
  {
    id: 'tf_q6',
    subject: 'Terraform',
    category: 'Variables',
    difficulty: 'easy',
    interviewerPrompt: 'What is the precedence order of variables in Terraform?',
    idealAnswer: 'Terraform loads variable values in order of increasing priority (highest takes precedence):\n1. Environment variables (`TF_VAR_name`)\n2. `terraform.tfvars` file\n3. `terraform.tfvars.json` file\n4. `*.auto.tfvars` or `*.auto.tfvars.json` files (processed alphabetically)\n5. Command-line `-var` and `-var-file` flags (highest precedence, overrides all others).',
    keyPoints: [
      'Command-line `-var` flags override all files',
      'auto.tfvars takes precedence over standard terraform.tfvars',
      'TF_VAR_ environment variables are lowest precedence',
      'Marking variables as sensitive: true prevents output log leakage'
    ],
    expectedConcepts: ['Variable Precedence', 'terraform.tfvars', '-var flag', 'Sensitive Variables'],
    relatedTopicId: 'terraform_iac-fundamentals-and-hcl'
  },
  {
    id: 'tf_q7',
    subject: 'Terraform',
    category: 'Troubleshooting & Advanced',
    difficulty: 'hard',
    interviewerPrompt: 'What are "terraform taint" (replace) and "terraform import", and when do you use them?',
    idealAnswer: '• terraform apply -replace="resource" (formerly terraform taint): Marks a specific resource for recreation. On the next apply, Terraform destroys and recreates the resource. Useful when a server is corrupted, misconfigured, or needs a fresh re-provisioning without touching other resources.\n• terraform import: Brings existing cloud resources created manually or by legacy tools under Terraform management. It imports the live resource attributes into the terraform.tfstate file. The engineer must write the matching HCL resource block so future plans show zero delta.',
    keyPoints: [
      '-replace flag recreates specific resource on next apply',
      'terraform import imports existing cloud resources into state',
      'Does not generate HCL code automatically (requires manual or generate-config)',
      'terraform state rm removes resource from state without destroying cloud resource'
    ],
    expectedConcepts: ['terraform taint / -replace', 'terraform import', 'State Manipulation', 'terraform state rm'],
    relatedTopicId: 'terraform_state-management'
  },
  {
    id: 'tf_q8',
    subject: 'Terraform',
    category: 'Best Practices',
    difficulty: 'medium',
    interviewerPrompt: 'Why should you avoid using Terraform provisioners (local-exec, remote-exec) whenever possible?',
    idealAnswer: 'Provisioners (local-exec, remote-exec) execute arbitrary shell scripts inside Terraform, breaking the core benefits of declarative IaC:\n1. Non-Idempotent: Shell scripts are often not naturally idempotent and fail on re-runs.\n2. Fragile State Tracking: Terraform cannot know if the shell script succeeded, failed, or partially configured software.\n3. Network Dependencies: remote-exec requires open SSH/WinRM ports, bastion hosts, and credentials.\n\nBest Practice Alternatives: Use Cloud-Init (User Data) for instance startup scripts, Packer to pre-bake AMIs, or configuration managers (Ansible) triggered after infrastructure provisioning.',
    keyPoints: [
      'Provisioners are a "last resort" anti-pattern',
      'Breaks declarative idempotency guarantees',
      'Requires SSH/WinRM open firewall holes',
      'Prefer Cloud-Init, User Data, or Packer pre-baked images'
    ],
    expectedConcepts: ['local-exec', 'remote-exec', 'Cloud-Init / User Data', 'Packer Golden Images'],
    relatedTopicId: 'terraform_modules-and-best-practices'
  },

  // ==================== 14. DEVSECOPS ====================
  {
    id: 'sec_q1',
    subject: 'DevSecOps',
    category: 'Security Testing',
    difficulty: 'easy',
    interviewerPrompt: 'What are SAST, DAST, and SCA in DevSecOps pipelines?',
    idealAnswer: '• SAST (Static Application Security Testing): "White-box" testing that analyzes source code, bytecode, or binaries without running the application (e.g. SonarQube, Semgrep). Detects SQL injection, hardcoded secrets, and buffer overflows early in CI.\n• DAST (Dynamic Application Security Testing): "Black-box" testing that attacks the running application from the outside through HTTP endpoints (e.g. OWASP ZAP). Detects runtime issues, authentication flaws, and misconfigured headers.\n• SCA (Software Composition Analysis): Scans open-source third-party dependencies and libraries for known vulnerabilities (CVEs) and license compliance (e.g. Snyk, Trivy, Dependabot).',
    keyPoints: [
      'SAST: White-box static source code analysis',
      'DAST: Black-box dynamic runtime attacking',
      'SCA: Third-party dependency vulnerability scanning (CVEs)',
      'Shift-Left philosophy: catching flaws before production deployment'
    ],
    expectedConcepts: ['SAST', 'DAST', 'SCA', 'CVE Vulnerabilities', 'Shift-Left Security'],
    relatedTopicId: 'devsecops_security-testing-sast-dast'
  },
  {
    id: 'sec_q2',
    subject: 'DevSecOps',
    category: 'Secrets Management',
    difficulty: 'medium',
    interviewerPrompt: 'How do you prevent hardcoded secrets from leaking into Git repositories, and what tools enforce this?',
    idealAnswer: '1. Pre-commit hooks: Run tools like `gitleaks` or `trufflehog` on the developer\'s machine to block commits containing API keys, private keys, or passwords.\n2. CI Pipeline Scans: Run automated secret detection in pull requests to reject merges if secrets are found.\n3. Centralized Secret Stores: Applications retrieve credentials at runtime from dynamic secret managers (HashiCorp Vault, AWS Secrets Manager) using IAM roles or short-lived tokens.\n4. Remediation if leaked: Assume the secret is compromised immediately: Revoke/Rotate the credential first, then purge the Git history using `git-filter-repo` (never just commit a deletion).',
    keyPoints: [
      'Pre-commit hooks (Gitleaks) catch secrets before push',
      'Dynamic runtime secret injection over static environment variables',
      'Credential rotation must precede git history cleanup',
      'git-filter-repo to rewrite contaminated commit history'
    ],
    expectedConcepts: ['Gitleaks', 'TruffleHog', 'HashiCorp Vault', 'Secret Rotation', 'Pre-commit Hooks'],
    relatedTopicId: 'devsecops_security-testing-sast-dast'
  },
  {
    id: 'sec_q3',
    subject: 'DevSecOps',
    category: 'Observability & Metrics',
    difficulty: 'medium',
    interviewerPrompt: 'Explain how Prometheus collects metrics using a Pull model, and compare it with Push models.',
    idealAnswer: 'Prometheus operates on a PULL-based architecture:\n• Mechanism: Prometheus server periodically scrapes HTTP `/metrics` endpoints exposed by target applications or exporters (Node Exporter) at a configured scrape_interval.\n• Data Format: Multi-dimensional time-series data with metric names and key-value labels (e.g. `http_requests_total{method="POST", status="500"}`).\n\nTrade-offs:\n- Pull Model: Central server controls scrape rate, protecting itself from overwhelming traffic during incident floods. Easy to detect if a service is down (scrape fails = target down).\n- Push Model: Applications push metrics to an aggregator (StatsD / Datadog). Needed for ephemeral, short-lived batch jobs (Prometheus handles this via Pushgateway).',
    keyPoints: [
      'Pull model scrapes HTTP /metrics endpoints periodically',
      'Dimensional time-series data with labels for PromQL filtering',
      'Server-controlled ingestion rate prevents DDoS during incidents',
      'Pushgateway used for short-lived batch jobs'
    ],
    expectedConcepts: ['Prometheus Pull Model', 'Time-Series Data', 'PromQL', 'Pushgateway', 'Exporters'],
    relatedTopicId: 'devsecops_observability-and-monitoring'
  },
  {
    id: 'sec_q4',
    subject: 'DevSecOps',
    category: 'Observability',
    difficulty: 'medium',
    interviewerPrompt: 'What are the Three Pillars of Observability and what purpose does each serve?',
    idealAnswer: '1. Metrics: Numerically aggregatable time-series data (counters, gauges, histograms). Low storage cost. Answers: "Is there a problem and where?" (e.g. CPU at 95%, 5xx error rate spiking).\n2. Logs: Structured, timestamped textual records of discrete events (e.g. JSON logs). High fidelity, higher storage cost. Answers: "Why did the problem happen?" (e.g. NullPointerException stack trace).\n3. Distributed Traces: Records the complete end-to-end journey of a single request propagating through microservices. Traces contain a Trace ID and child Spans with timing data. Answers: "Where did latency or failures occur along the call graph?"',
    keyPoints: [
      'Metrics: Aggregated numerical indicators (cheap, high level)',
      'Logs: Detailed contextual event records',
      'Traces: End-to-end distributed request journey (Trace ID & Spans)',
      'Correlating all three via Trace ID'
    ],
    expectedConcepts: ['Metrics', 'Logs', 'Distributed Tracing', 'Trace ID & Span ID', 'OpenTelemetry'],
    relatedTopicId: 'devsecops_observability-and-monitoring'
  },
  {
    id: 'sec_q5',
    subject: 'DevSecOps',
    category: 'SRE Practices',
    difficulty: 'easy',
    interviewerPrompt: 'What are the 4 Google SRE Golden Signals of monitoring?',
    idealAnswer: '1. Latency: The time it takes to service a request. Differentiate successful request latency from error latency (fast failures can mask slow success).\n2. Traffic: A measure of demand placed on the system (e.g. HTTP requests per second, network I/O throughput).\n3. Errors: The rate of requests that fail (explicit 5xx errors, implicit failures like wrong content, or policy violations).\n4. Saturation: How "full" the system is. Measures the most constrained resource (CPU, memory, disk I/O, database connection pool capacity). Emphasizes that systems degrade non-linearly before reaching 100%.',
    keyPoints: [
      'Latency, Traffic, Errors, Saturation',
      'Differentiating latency between 200s and 500s',
      'Saturation measures resource headroom before degradation',
      'Foundation for Service Level Objectives (SLOs)'
    ],
    expectedConcepts: ['Golden Signals', 'Latency', 'Traffic', 'Errors', 'Saturation'],
    relatedTopicId: 'devsecops_observability-and-monitoring'
  },
  {
    id: 'sec_q6',
    subject: 'DevSecOps',
    category: 'SRE Reliability',
    difficulty: 'medium',
    interviewerPrompt: 'Explain SLI, SLO, SLA, and the concept of an Error Budget.',
    idealAnswer: '• SLI (Service Level Indicator): A carefully defined quantitative metric of service performance (e.g., % of requests returning 200 OK within 200ms).\n• SLO (Service Level Objective): A target reliability goal set internally by engineering and product (e.g., 99.9% of requests meet SLI over 30 days).\n• SLA (Service Level Agreement): A legal contract with paying customers including financial penalties or credits if SLO is breached (typically set lower than SLO, e.g. 99.5%).\n• Error Budget: The inverse of the SLO (`100% - SLO`). For a 99.9% SLO, the error budget is 0.1% (approx 43 minutes of downtime per month). If budget is intact, teams ship new features aggressively; if exhausted, feature releases halt to focus on reliability.',
    keyPoints: [
      'SLI measures reality; SLO is internal target; SLA is legal contract',
      'Error Budget = 100% - SLO',
      'Balances feature velocity against system stability',
      'Burn Rate alerts warn before entire error budget is spent'
    ],
    expectedConcepts: ['Service Level Indicator (SLI)', 'Service Level Objective (SLO)', 'Error Budget', 'SLA'],
    relatedTopicId: 'devsecops_observability-and-monitoring'
  },
  {
    id: 'sec_q7',
    subject: 'DevSecOps',
    category: 'Centralized Logging',
    difficulty: 'medium',
    interviewerPrompt: 'How does an ELK/EFK stack work for centralized log aggregation?',
    idealAnswer: 'The stack decouples log shipping, indexing, and visualization:\n1. Shipper (Fluentd / Fluent Bit / Logstash / Filebeat): Lightweight daemon running on each host or container pod (DaemonSet) that tails log files, parses JSON formats, and forwards them to the pipeline.\n2. Ingestion/Buffer (Logstash / Kafka): Filters, enriches (GeoIP, user agents), and buffers log streams during spikes.\n3. Storage & Search (Elasticsearch / OpenSearch): Distributed, Lucene-based search and analytics engine that indexes full-text logs for sub-second search.\n4. Visualization (Kibana / OpenSearch Dashboards): Web UI for searching logs, building charts, and troubleshooting incidents.',
    keyPoints: [
      'Shipper (Filebeat/Fluentbit) -> Buffer/Processor -> Elasticsearch -> Kibana',
      'Decoupled architecture scales with high ingestion volume',
      'Full-text indexing with inverted indexes',
      'Retention policies and index lifecycle management (ILM)'
    ],
    expectedConcepts: ['ELK Stack', 'Elasticsearch', 'Fluentd / Fluent Bit', 'Kibana', 'Inverted Index'],
    relatedTopicId: 'devsecops_observability-and-monitoring'
  },
  {
    id: 'sec_q8',
    subject: 'DevSecOps',
    category: 'Container Security',
    difficulty: 'easy',
    interviewerPrompt: 'How do you integrate container image vulnerability scanning into a CI/CD pipeline using Trivy?',
    idealAnswer: 'Trivy is an open-source security scanner for container images, filesystems, and Git repositories.\n\nCI/CD Integration:\n1. CI builds the Docker image: `docker build -t app:${{ github.sha }} .`\n2. Run Trivy scan step against the built image tag:\n`trivy image --exit-code 1 --severity CRITICAL,HIGH app:${{ github.sha }}`\n3. The `--exit-code 1` flag forces the CI pipeline to FAIL if any unpatched CRITICAL or HIGH CVE vulnerabilities are detected, preventing the image from being pushed to the container registry.\n4. Output formatted as SARIF (Security Analysis Results Interchange Format) to display annotations directly in GitHub Security tab.',
    keyPoints: [
      'Automated vulnerability gating before container push',
      'Severity thresholds (--severity HIGH,CRITICAL)',
      'Exit code 1 breaks pipeline on compliance failure',
      'SARIF format integration with GitHub code scanning'
    ],
    expectedConcepts: ['Trivy', 'Vulnerability Scanning', 'CVE Database', 'SARIF Format', 'Pipeline Gating'],
    relatedTopicId: 'devsecops_security-testing-sast-dast'
  },

  // ==================== 15. SYSTEM DESIGN ====================
  {
    id: 'sys_q1',
    subject: 'System Design',
    category: 'Scaling & Architecture',
    difficulty: 'easy',
    interviewerPrompt: 'Compare Vertical Scaling (Scaling Up) and Horizontal Scaling (Scaling Out). What are the limits of each?',
    idealAnswer: '• Vertical Scaling: Adding more resources (CPU, RAM, NVMe SSDs) to a single machine.\n- Pros: Simple, no code changes, no distributed data consistency or network partitioning issues.\n- Cons: Hard physical hardware ceiling (maximum RAM/socket limits); expensive; single point of failure; requires downtime to upgrade.\n• Horizontal Scaling: Adding more commodity nodes/servers to a distributed cluster behind a load balancer.\n- Pros: Infinite theoretical scaling; high availability (node failure does not take down service); cost-effective.\n- Cons: High architectural complexity (stateless app servers, distributed data stores, network latency, data consistency, CAP theorem trade-offs).',
    keyPoints: [
      'Hardware ceiling and single point of failure in Vertical scaling',
      'Stateless application servers required for Horizontal scaling',
      'Cost efficiency of commodity hardware clusters',
      'Distributed systems challenges in horizontal architectures'
    ],
    expectedConcepts: ['Vertical Scaling', 'Horizontal Scaling', 'Single Point of Failure', 'Stateless Architecture'],
    relatedTopicId: 'system-design_scalability-and-load-balancing'
  },
  {
    id: 'sys_q2',
    subject: 'System Design',
    category: 'Caching Strategies',
    difficulty: 'medium',
    interviewerPrompt: 'Compare Cache-Aside (Lazy Loading), Write-Through, and Write-Back caching strategies.',
    idealAnswer: '• Cache-Aside (Lazy Loading): Application reads from cache. On cache miss, it reads from the DB, writes the result to cache, and returns. Writes go directly to DB; cache is invalidated. Pros: Caches only requested data; resilient to cache failure. Cons: Cache miss latency penalty; risk of stale data.\n• Write-Through: Application writes to cache first; cache synchronously writes to the DB before acknowledging. Pros: Cache is always up-to-date; no stale reads. Cons: Higher write latency; cache holds data that may never be read.\n• Write-Back (Write-Behind): Application writes to cache, which acknowledges immediately. Cache asynchronously flushes writes to DB in batches. Pros: Ultra-low write latency; handles extreme write spikes. Cons: Risk of permanent data loss if cache node crashes before flushing to disk.',
    keyPoints: [
      'Cache-Aside handles read-heavy workloads with lazy caching',
      'Write-Through guarantees strict cache-DB consistency',
      'Write-Back provides highest write throughput at risk of data loss',
      'TTL and eviction policies (LRU, LFU)'
    ],
    expectedConcepts: ['Cache-Aside', 'Write-Through', 'Write-Back', 'Cache Invalidation', 'LRU Eviction'],
    relatedTopicId: 'system-design_caching-and-databases'
  },
  {
    id: 'sys_q3',
    subject: 'System Design',
    category: 'Data Partitioning',
    difficulty: 'hard',
    interviewerPrompt: 'What is Consistent Hashing and why is it preferred over simple modulo hashing (hash(key) % N) in distributed systems?',
    idealAnswer: 'In simple modulo hashing `hash(key) % N`, every key is mapped to one of N server nodes. If a server is added or crashes (N changes to N+1 or N-1), almost ALL existing keys map to completely different servers (`hash(key) % (N+1)`), causing a catastrophic cache miss flood that crashes the primary database.\n\nConsistent Hashing solves this:\n1. Keys and Servers are both hashed onto a conceptual circular ring (0 to 2³² - 1).\n2. A key is assigned to the first server encountered moving clockwise on the ring.\n3. Adding or removing a server affects ONLY `K / N` keys on average (the keys between the new server and its predecessor).\n4. Virtual Nodes: Each physical node is hashed to multiple points on the ring (e.g. 100 virtual nodes), ensuring uniform load distribution and avoiding hot spots.',
    keyPoints: [
      'Modulo hashing remaps nearly 100% of keys when N changes',
      'Consistent hashing remaps only K/N keys',
      'Circular hash ring (0 to 2³² - 1) with clockwise assignment',
      'Virtual nodes balance load and prevent data skew'
    ],
    expectedConcepts: ['Consistent Hashing', 'Virtual Nodes', 'Hash Ring', 'Cache Stampede Prevention'],
    relatedTopicId: 'system-design_caching-and-databases'
  },
  {
    id: 'sys_q4',
    subject: 'System Design',
    category: 'Messaging & Async',
    difficulty: 'medium',
    interviewerPrompt: 'Compare Apache Kafka and RabbitMQ in terms of message delivery models, durability, and use cases.',
    idealAnswer: '• RabbitMQ: Traditional Message Broker. Push-based architecture based on AMQP. Messages are stored in queues and DELETED once consumed and acknowledged. Rich routing (Direct, Fanout, Topic, Headers exchanges). Ideal for complex transactional task queues, background workers, and low-latency point-to-point delivery.\n• Apache Kafka: Distributed Event Streaming Platform. Pull-based append-only commit log. Messages are RETAINED on disk for a configured retention period (e.g. 7 days) regardless of consumption. Consumers track their own Offset pointer and can replay historical events. High throughput (millions of events/sec) via sequential disk I/O and zero-copy OS transfers. Ideal for event sourcing, telemetry pipelines, and stream processing.',
    keyPoints: [
      'RabbitMQ deletes messages after consumer ACK; Kafka retains log on disk',
      'Push model (RabbitMQ) vs Pull model (Kafka)',
      'Consumer offsets enable replayability in Kafka',
      'Sequential disk I/O and sendfile zero-copy in Kafka'
    ],
    expectedConcepts: ['RabbitMQ', 'Apache Kafka', 'Append-Only Log', 'Consumer Offsets', 'Event Sourcing'],
    relatedTopicId: 'system-design_microservices-and-messaging'
  },
  {
    id: 'sys_q5',
    subject: 'System Design',
    category: 'Rate Limiting',
    difficulty: 'medium',
    interviewerPrompt: 'How do the Token Bucket and Leaky Bucket algorithms work for API rate limiting?',
    idealAnswer: '• Token Bucket: A bucket has a maximum capacity of N tokens. Tokens are added at a constant fill rate (e.g. 10 tokens/sec). Each API request consumes 1 token. If the bucket is empty, the request is rejected with HTTP 429 Too Many Requests. Pros: Allows temporary traffic BURSTS up to bucket capacity while enforcing long-term rate limits.\n• Leaky Bucket: Requests enter a queue (bucket) of fixed capacity and are processed (leak out) at a strictly constant rate (FIFO). If requests arrive faster than the leak rate and the queue fills, incoming requests overflow and are dropped. Pros: Completely smooths out traffic into a steady stream; prevents bursts.',
    keyPoints: [
      'Token Bucket permits traffic bursts up to maximum capacity',
      'Leaky Bucket strictly smooths traffic into constant output rate',
      'Redis implementation using atomic Lua scripts or Sliding Window log',
      'HTTP 429 Too Many Requests and Retry-After header'
    ],
    expectedConcepts: ['Token Bucket', 'Leaky Bucket', 'HTTP 429', 'Sliding Window Counter', 'Redis Lua Scripts'],
    relatedTopicId: 'system-design_scalability-and-load-balancing'
  },
  {
    id: 'sys_q6',
    subject: 'System Design',
    category: 'Database Partitioning',
    difficulty: 'hard',
    interviewerPrompt: 'What is Database Sharding, and what challenges does it introduce for application architecture?',
    idealAnswer: 'Database Sharding horizontally partitions a massive database across multiple physical database instances by assigning rows according to a Shard Key (e.g., hash(user_id) % num_shards).\n\nChallenges:\n1. Cross-Shard Joins: Joining data residing on different physical servers is prohibitively slow or impossible; requires denormalizing data.\n2. Cross-Shard Transactions: Multi-shard ACID guarantees require complex Two-Phase Commit (2PC) protocols, killing throughput.\n3. Re-sharding & Data Migration: When a shard becomes full or a hot-spot occurs, splitting shards and migrating terabytes of data without downtime is extremely complex.\n4. Hot-Spot Problem: High-volume users (e.g. celebrity account) overload a single shard.',
    keyPoints: [
      'Horizontal data partitioning across distinct database servers',
      'Shard key selection determines distribution uniformity',
      'Cross-shard joins require denormalization or application-level joins',
      'Two-Phase Commit (2PC) performance penalty'
    ],
    expectedConcepts: ['Database Sharding', 'Shard Key', 'Cross-Shard Joins', 'Two-Phase Commit (2PC)', 'Hot Spot'],
    relatedTopicId: 'system-design_caching-and-databases'
  },
  {
    id: 'sys_q7',
    subject: 'System Design',
    category: 'Resilience',
    difficulty: 'medium',
    interviewerPrompt: 'What is the Circuit Breaker pattern and how does it prevent cascading failures in microservices?',
    idealAnswer: 'In distributed microservices, if Service A calls failing Service B synchronously, threads in Service A will block waiting for timeouts, exhausting thread pools and cascading failure across the entire system.\n\nThe Circuit Breaker acts as an automatic switch with 3 states:\n1. Closed: Normal operation; requests pass through. Tracks failure rate.\n2. Open: If the failure rate exceeds a threshold (e.g. 50% errors over 10s), the circuit trips OPEN. Requests fail IMMEDIATELY with a fallback response without calling Service B, protecting downstream resources.\n3. Half-Open: After a reset timeout (e.g. 30s), the circuit permits a trial fraction of requests through. If successful, it transitions back to Closed; if it fails, it trips Open again.',
    keyPoints: [
      'Prevents thread exhaustion and cascading system crashes',
      'States: Closed, Open, Half-Open',
      'Immediate fallback responses when Open',
      'Libraries: Resilience4j, Netflix Hystrix, Envoy proxy'
    ],
    expectedConcepts: ['Circuit Breaker Pattern', 'Cascading Failure', 'Half-Open State', 'Fallback Mechanism'],
    relatedTopicId: 'system-design_microservices-and-messaging'
  },
  {
    id: 'sys_q8',
    subject: 'System Design',
    category: 'Load Balancing',
    difficulty: 'easy',
    interviewerPrompt: 'Compare Layer 4 (Transport) and Layer 7 (Application) Load Balancing.',
    idealAnswer: '• Layer 4 Load Balancing: Operates at the Transport layer (TCP/UDP). Makes routing decisions based strictly on IP addresses and TCP/UDP ports without inspecting packet payloads. Cannot inspect HTTP headers, cookies, or URLs. Ultra-fast, low CPU overhead (e.g. AWS Network Load Balancer, Linux LVS/IPVS).\n• Layer 7 Load Balancing: Operates at the Application layer (HTTP/HTTPS). Terminates the TCP connection, decrypts TLS, and inspects full HTTP request headers, URLs, cookies, and JSON payloads. Enables intelligent path routing (/api -> API cluster, /images -> S3), sticky sessions via cookies, and authentication checks. Incurs higher CPU overhead (e.g. AWS ALB, NGINX, HAProxy).',
    keyPoints: [
      'Layer 4 routes by IP/Port without inspecting payload (ultra-fast)',
      'Layer 7 inspects HTTP headers, cookies, and URLs for smart routing',
      'L7 terminates TLS and enables path-based routing',
      'AWS NLB (L4) vs AWS ALB (L7)'
    ],
    expectedConcepts: ['Layer 4 vs Layer 7', 'Path-Based Routing', 'TLS Termination', 'Sticky Sessions'],
    relatedTopicId: 'system-design_scalability-and-load-balancing'
  }
];

export const interviewQuestionsData = [
  ...baseInterviewQuestionsData,
  ...aiCurriculumQuestions
];
